export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number; // minutes
  description: string;
  detail: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  experience: string;
  speciality: string;
  bio: string;
  photo: string;
}

export const SERVICES: Service[] = [
  {
    id: 'classic-cut',
    name: 'Classic Cut',
    price: 200,
    duration: 45,
    description: 'Precision scissor-work shaped to your natural growth pattern.',
    detail: 'A timeless cut executed with care. We assess your hair texture, growth direction, and face shape before a single snip. Includes a hot-towel finish and hand-styled finish with your preferred product.',
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    price: 250,
    duration: 60,
    description: 'A seamless taper from skin to length — our most requested cut.',
    detail: 'Faded to skin at the sides and back, blended up to your chosen length on top. Clean, sharp, and long-lasting. Includes neck shave and hot-towel close.',
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim',
    price: 150,
    duration: 30,
    description: 'Shape, define, and detail with a straight-razor line-up.',
    detail: 'We shape your beard to suit your face, trim to your preferred length, and finish with a straight-razor edge and a hot-towel treatment to soften the skin.',
  },
  {
    id: 'cut-beard',
    name: 'Cut & Beard Package',
    price: 350,
    duration: 90,
    description: 'The full experience — cut plus beard, our best value.',
    detail: 'Your choice of cut paired with our full beard service. One sitting, complete transformation. Includes hot-towel treatment at both stages and a complimentary beard oil application.',
  },
  {
    id: 'kids-cut',
    name: "Kids' Cut",
    price: 150,
    duration: 30,
    description: 'A confident cut for children under 12. Patient and fun.',
    detail: 'We make sure small clients feel comfortable before we start. Patient, friendly, and precise — we deliver a proper cut (not just a trim) that parents and kids both love.',
  },
];

export const BARBERS: Barber[] = [
  {
    id: 'sipho',
    name: 'Sipho Dlamini',
    role: 'Head Barber & Co-Founder',
    experience: '8 years',
    speciality: 'Skin fades, textured hair',
    bio: 'Sipho grew up in Khayelitsha and honed his craft on Long Street before spending two years in London sharpening his technique. He returned to Cape Town with a singular vision: a shop that takes the craft as seriously as it takes its clients. His architectural fades and deep knowledge of coily and textured hair have built him a loyal following across the City Bowl.',
    photo: 'https://images.unsplash.com/photo-1614023342667-6f060e9d1e04?w=480&h=600&fit=crop&auto=format&q=80',
  },
  {
    id: 'kwame',
    name: 'Kwame Asante',
    role: 'Senior Barber',
    experience: '6 years',
    speciality: 'Beard sculpting, classic cuts',
    bio: 'Kwame trained in Accra before settling in Cape Town, where his calm precision and exceptional beard work quickly earned him a dedicated clientele. He has a sculptor\'s eye for proportion and a patient manner that puts even the most anxious client at ease. Ask him about the hot-towel shave — clients call it a ritual.',
    photo: 'https://images.unsplash.com/photo-1605602517387-ec78b947335e?w=480&h=600&fit=crop&auto=format&q=80',
  },
  {
    id: 'lunga',
    name: 'Lunga Ntuli',
    role: 'Barber',
    experience: '3 years',
    speciality: "Kids' cuts, scissor work",
    bio: 'Lunga completed his barbering qualification at the Cape Town College of Hair Design before joining The Standard as an apprentice. Precise, patient, and genuinely brilliant with children, he makes nervous first-timers feel immediately at home. His scissor technique is exceptional for clients who prefer a softer, more natural finish.',
    photo: 'https://images.unsplash.com/photo-1616805765352-beedbad46b2a?w=480&h=600&fit=crop&auto=format&q=80',
  },
];

export const HOURS = [
  { day: 'Monday – Friday', hours: '9:00 AM – 6:00 PM', open: true },
  { day: 'Saturday', hours: '8:00 AM – 5:00 PM', open: true },
  { day: 'Sunday', hours: 'Closed', open: false },
];

export const CONTACT = {
  address: '14 Kloof Street, Gardens, Cape Town, 8001',
  phone: '+27 21 424 5678',
  email: 'hello@thestandardbarberco.co.za',
  instagram: null,
  facebook: null,
};

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
}

export function formatPrice(price: number): string {
  return `R${price}`;
}
