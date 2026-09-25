const FORMSPREE_URL = 'https://formspree.io/f/myezddbw';

export interface BookingPayload {
  service_id: string;
  service_name: string;
  service_duration: number;
  service_price: number;
  barber_id: string;
  barber_name: string;
  date: string;
  time: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
}

export interface Booking extends BookingPayload {
  id: string;
}

export type BookingResult =
  | { success: true; booking: Booking }
  | { success: false; error: string };

export async function createBooking(payload: BookingPayload): Promise<BookingResult> {
  const body = {
    name: payload.customer_name,
    email: payload.customer_email,
    phone: payload.customer_phone,
    service: payload.service_name,
    barber: payload.barber_name,
    appointment_date: payload.date,
    appointment_time: payload.time,
    duration_minutes: payload.service_duration,
    price: `R${payload.service_price}`,
    timezone: 'Africa/Johannesburg',
  };

  let response: Response;
  try {
    response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch {
    return { success: false, error: 'Network error — please check your connection and try again.' };
  }

  if (response.ok) {
    const id = `fs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    return { success: true, booking: { ...payload, id } };
  }

  let message = 'Submission failed. Please try again.';
  try {
    const json = await response.json();
    if (json?.errors?.length) {
      message = json.errors.map((e: { message: string }) => e.message).join(' ');
    }
  } catch {
    // ignore parse errors
  }
  return { success: false, error: message };
}
