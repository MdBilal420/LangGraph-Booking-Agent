export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  rating: number;
  reviews: number;
  priceLevel: '$' | '$$' | '$$$' | '$$$$';
  imageColor: string;
  tags: string[];
  temperature: number;
  saved?: boolean;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  status: 'cheapest' | 'fastest' | 'recommended' | null;
  saved?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  rating: number;
  reviews: number;
  imageColor: string;
  saved?: boolean;
}

export interface ItineraryDay {
  day: number;
  date: string;
  activities: ItineraryActivity[];
}

export interface ItineraryActivity {
  time: string;
  title: string;
  location: string;
  type: 'flight' | 'hotel' | 'activity' | 'food' | 'transport';
  description?: string;
}

export const mockDestinations: Destination[] = [
  {
    id: 'dest-1',
    name: 'Santorini',
    country: 'Greece',
    description: 'Iconic white-washed buildings, stunning sunsets, and crystal-clear waters make this Aegean gem unforgettable.',
    rating: 4.8,
    reviews: 12450,
    priceLevel: '$$$',
    imageColor: 'from-blue-400 to-cyan-300',
    tags: ['Beach', 'Romance', 'History'],
    temperature: 28,
    saved: false,
  },
  {
    id: 'dest-2',
    name: 'Kyoto',
    country: 'Japan',
    description: 'Ancient temples, serene bamboo forests, and traditional tea houses in Japan\'s cultural heart.',
    rating: 4.9,
    reviews: 8930,
    priceLevel: '$$',
    imageColor: 'from-pink-400 to-rose-300',
    tags: ['Culture', 'Nature', 'Food'],
    temperature: 22,
    saved: true,
  },
  {
    id: 'dest-3',
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'The legendary Incan citadel set high in the Andes Mountains, a bucket-list adventure destination.',
    rating: 4.7,
    reviews: 15600,
    priceLevel: '$$',
    imageColor: 'from-emerald-500 to-teal-400',
    tags: ['Adventure', 'History', 'Hiking'],
    temperature: 18,
    saved: false,
  },
];

export const mockFlights: Flight[] = [
  {
    id: 'flight-1',
    airline: 'SkyWings',
    flightNumber: 'SW2847',
    origin: 'New York (JFK)',
    destination: 'Paris (CDG)',
    departureTime: '10:30 AM',
    arrivalTime: '11:45 PM',
    duration: '7h 15m',
    price: 520,
    currency: 'USD',
    stops: 0,
    status: 'cheapest',
    saved: false,
  },
  {
    id: 'flight-2',
    airline: 'AirLuxe',
    flightNumber: 'AL9012',
    origin: 'New York (JFK)',
    destination: 'Paris (CDG)',
    departureTime: '2:15 PM',
    arrivalTime: '3:30 AM+1',
    duration: '6h 45m',
    price: 680,
    currency: 'USD',
    stops: 0,
    status: 'fastest',
    saved: false,
  },
  {
    id: 'flight-3',
    airline: 'GlobalAir',
    flightNumber: 'GA4451',
    origin: 'New York (JFK)',
    destination: 'Paris (CDG)',
    departureTime: '8:00 AM',
    arrivalTime: '9:20 PM',
    duration: '7h 20m',
    price: 595,
    currency: 'USD',
    stops: 0,
    status: 'recommended',
    saved: true,
  },
];

export const mockHotels: Hotel[] = [
  {
    id: 'hotel-1',
    name: 'Le Grand Hotel Paris',
    location: 'Champs-Elysees, Paris',
    stars: 5,
    pricePerNight: 340,
    currency: 'USD',
    amenities: ['WiFi', 'Pool', 'Spa', 'Gym'],
    rating: 4.6,
    reviews: 3420,
    imageColor: 'from-indigo-500 to-purple-400',
    saved: false,
  },
  {
    id: 'hotel-2',
    name: 'Boutique Marais',
    location: 'Le Marais, Paris',
    stars: 4,
    pricePerNight: 195,
    currency: 'USD',
    amenities: ['WiFi', 'Breakfast', 'Rooftop'],
    rating: 4.4,
    reviews: 2180,
    imageColor: 'from-amber-400 to-orange-300',
    saved: true,
  },
];

export const mockItinerary: ItineraryDay[] = [
  {
    day: 1,
    date: 'June 15',
    activities: [
      { time: '10:30 AM', title: 'Depart JFK', location: 'New York', type: 'flight', description: 'Flight SW2847 to Paris' },
      { time: '11:45 PM', title: 'Arrive CDG', location: 'Paris', type: 'flight', description: 'Welcome to Paris!' },
      { time: '1:00 AM', title: 'Check-in', location: 'Le Grand Hotel Paris', type: 'hotel' },
    ],
  },
  {
    day: 2,
    date: 'June 16',
    activities: [
      { time: '9:00 AM', title: 'Breakfast at Cafe de Flore', location: 'Saint-Germain', type: 'food' },
      { time: '11:00 AM', title: 'Louvre Museum Tour', location: 'Louvre', type: 'activity', description: 'Skip-the-line guided tour' },
      { time: '3:00 PM', title: 'Seine River Cruise', location: 'Seine River', type: 'activity' },
      { time: '8:00 PM', title: 'Dinner at Le Jules Verne', location: 'Eiffel Tower', type: 'food' },
    ],
  },
  {
    day: 3,
    date: 'June 17',
    activities: [
      { time: '9:30 AM', title: 'Versailles Day Trip', location: 'Versailles', type: 'activity', description: 'Half-day guided excursion' },
      { time: '4:00 PM', title: 'Montmartre Walk', location: 'Montmartre', type: 'activity' },
      { time: '7:00 PM', title: 'Sacré-Coeur Sunset', location: 'Sacré-Coeur', type: 'activity' },
    ],
  },
];

export const chatHistory = [
  { id: 'thread-1', title: 'Trip to Paris', date: 'Today', messages: 12 },
  { id: 'thread-2', title: 'Tokyo itinerary help', date: 'Yesterday', messages: 8 },
  { id: 'thread-3', title: 'Budget Bali trip', date: '3 days ago', messages: 15 },
  { id: 'thread-4', title: 'Flight changes', date: '1 week ago', messages: 4 },
];
