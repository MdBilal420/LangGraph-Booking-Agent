import { ToolCall } from '@/types/chat';

const TOOL_FOLLOW_UPS: Record<string, string[]> = {
  fetch_user_flight_information: [
    'Can I change my flight?',
    'Cancel my ticket',
    'What hotels are at my destination?',
  ],
  search_flights: [
    'Book this flight',
    'Show earlier flights',
    'What about return flights?',
  ],
  update_ticket_to_new_flight: [
    'What hotels are available there?',
    'Book a car rental',
    'What excursions can I do?',
  ],
  cancel_ticket: [
    'Search for alternative flights',
    'What are my refund options?',
    'Check my other bookings',
  ],
  search_hotels: [
    'Book a hotel',
    'Show cheaper options',
    'What car rentals are nearby?',
  ],
  book_hotel: [
    'Book a car rental',
    'What excursions are available?',
    'Can I upgrade my room?',
  ],
  update_hotel: [
    'What car rentals are available?',
    'Find excursions nearby',
    'Cancel my hotel',
  ],
  cancel_hotel: [
    'Search for other hotels',
    'What about Airbnb options?',
    'Book a car rental instead',
  ],
  search_car_rentals: [
    'Book this car',
    'Show cheaper options',
    'What excursions are available?',
  ],
  book_car_rental: [
    'What excursions can I do?',
    'Book a hotel nearby',
    'Can I add insurance?',
  ],
  update_car_rental: [
    'What hotels are nearby?',
    'Find excursions',
    'Cancel my car rental',
  ],
  cancel_car_rental: [
    'Search for other cars',
    'What about public transport?',
    'Book a hotel with shuttle',
  ],
  search_trip_recommendations: [
    'Book this excursion',
    'What else is nearby?',
    'Find a hotel nearby',
  ],
  book_excursion: [
    'What else should I do?',
    'Book another activity',
    'Find a restaurant nearby',
  ],
  update_excursion: [
    'Book another excursion',
    'What hotels are nearby?',
    'Cancel this excursion',
  ],
  cancel_excursion: [
    'What other excursions are available?',
    'Find activities for kids',
    'Book a guided tour',
  ],
  lookup_policy: [
    'Can you help me change my flight?',
    'What are my refund options?',
    'How do I contact support?',
  ],
  tavily_search_results_json: [
    'Book a flight there',
    'Find hotels',
    'What car rentals are available?',
  ],
};

const DEFAULT_FOLLOW_UPS = [
  'What time is my flight?',
  'What can you help me with?',
  'What hotels are available?',
];

export function getFollowUpSuggestions(toolCalls?: ToolCall[] | null): string[] {
  if (!toolCalls || toolCalls.length === 0) {
    return DEFAULT_FOLLOW_UPS;
  }

  const suggestions = new Set<string>();

  // Process tools in reverse order so the most recent tool's suggestions appear first
  for (const toolCall of [...toolCalls].reverse()) {
    const toolSuggestions = TOOL_FOLLOW_UPS[toolCall.name];
    if (toolSuggestions) {
      toolSuggestions.forEach((s) => suggestions.add(s));
    }
  }

  if (suggestions.size === 0) {
    return DEFAULT_FOLLOW_UPS;
  }

  return Array.from(suggestions).slice(0, 5);
}
