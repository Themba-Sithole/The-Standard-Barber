import type { Booking } from './bookings';

const SHOP_NAME = 'The Standard Barber Co.';
const SHOP_ADDRESS = '14 Kloof Street, Gardens, Cape Town, 8001';
const TZ = 'Africa/Johannesburg';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function toIcsLocal(date: string, time: string): string {
  const [y, mo, d] = date.split('-').map(Number);
  const [h, m] = time.split(':').map(Number);
  return `${y}${pad(mo)}${pad(d)}T${pad(h)}${pad(m)}00`;
}

function addMinutes(time: string, minutes: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + minutes;
  return `${pad(Math.floor(total / 60))}:${pad(total % 60)}`;
}

export function googleCalendarUrl(booking: Booking): string {
  const endTime = addMinutes(booking.time, booking.service_duration);
  const start = toIcsLocal(booking.date, booking.time);
  const end = toIcsLocal(booking.date, endTime);

  const title = `[Pending] ${booking.service_name} at ${SHOP_NAME}`;
  const details = [
    'PENDING BOOKING REQUEST — awaiting confirmation from the shop.',
    '',
    `Service: ${booking.service_name}`,
    `Barber: ${booking.barber_name}`,
    `Duration: ${booking.service_duration} minutes`,
    '',
    'Please arrive 5 minutes before your appointment.',
    'Questions? Call us: +27 21 424 5678',
  ].join('\n');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${start}/${end}`,
    details,
    location: SHOP_ADDRESS,
    ctz: TZ,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function generateIcs(booking: Booking): string {
  const start = toIcsLocal(booking.date, booking.time);
  const end = toIcsLocal(booking.date, addMinutes(booking.time, booking.service_duration));
  const nowDate = new Date();
  const nowStr = toIcsLocal(
    nowDate.toISOString().split('T')[0],
    `${pad(nowDate.getHours())}:${pad(nowDate.getMinutes())}`
  );

  const description = [
    'PENDING BOOKING REQUEST -- awaiting confirmation from the shop.',
    '',
    `Service: ${booking.service_name}`,
    `Barber: ${booking.barber_name}`,
    `Duration: ${booking.service_duration} minutes`,
    '',
    'Please arrive 5 minutes before your appointment.',
    'Questions? Call +27 21 424 5678 or email hello@thestandardbarberco.co.za',
  ].join('\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//The Standard Barber Co.//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VTIMEZONE',
    `TZID:${TZ}`,
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0200',
    'TZNAME:SAST',
    'END:STANDARD',
    'END:VTIMEZONE',
    'BEGIN:VEVENT',
    `UID:${booking.id}@thestandardbarberco.co.za`,
    `DTSTAMP:${nowStr}Z`,
    `DTSTART;TZID=${TZ}:${start}`,
    `DTEND;TZID=${TZ}:${end}`,
    `SUMMARY:[Pending] ${booking.service_name} at ${SHOP_NAME}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${SHOP_ADDRESS.replace(/,/g, '\\,')}`,
    'STATUS:TENTATIVE',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

export function downloadIcs(booking: Booking): void {
  const content = generateIcs(booking);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `standard-barber-co-${booking.date}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

export function formatBookingDate(dateStr: string): string {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-ZA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatTime(time: string): string {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  return `${displayH}:${pad(m)} ${ampm}`;
}
