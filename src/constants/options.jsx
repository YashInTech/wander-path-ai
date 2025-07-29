export const SelectTravelList = [
  {
    id: 1,
    title: 'Just Me',
    desc: 'A sole traveler in exploration',
    icon: '✈',
    people: '1 person',
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'A romantic getaway for two',
    icon: '🥂',
    people: '2 people',
  },
  {
    id: 3,
    title: 'Friends',
    desc: 'A bunch of thrill-seekers',
    icon: '⛵',
    people: '3 to 8 people',
  },
  {
    id: 4,
    title: 'Small Family',
    desc: 'A small family of explorers',
    icon: '🧳',
    people: '3 to 4 people',
  },
  {
    id: 5,
    title: 'Large Family',
    desc: 'A group of fun loving adventurers',
    icon: '🏡',
    people: '5 to 10 people',
  },
];

export const SelectBudgetOptions = [
  {
    id: 1,
    title: 'Economy',
    desc: 'Stay conscious of the budget',
    icon: '💵',
  },
  {
    id: 2,
    title: 'Mid-Range',
    desc: 'A mix of comfort and budget',
    icon: '💰',
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Do not hold back on the luxury',
    icon: '💸',
  },
];

export const AI_PROMPT = `Generate a travel plan for location: {location} for {totalDays} day(s) for {travelers} with a {budget} budget.

Provide the response in JSON format with the following structure:

1. Hotel Options: Include HotelName, Address, Price, hotel image url (use real hotel booking site URLs like booking.com, hotels.com, or actual hotel website image URLs - NOT placeholder URLs), geo coordinates, ratings, descriptions.

2. Itinerary: Include place names to visit, time to visit, ticket prices, details, image url (use real image URLs from tourism websites, Wikipedia, or official attraction websites - NOT placeholder URLs like www.example.com), geo coordinates, ratings.

Important: For image URLs, provide actual working URLs from:
- For hotels: Use URLs from booking.com, hotels.com, marriott.com, hilton.com, etc.
- For attractions: Use URLs from official tourism sites, Wikipedia, TripAdvisor, or attraction official websites
- If you cannot find a real URL, use: "https://via.placeholder.com/400x300?text=Image+Not+Available"

Ensure all URLs are complete and functional. Do not use example.com or placeholder domains.

Return the response in this exact JSON format:
{
  "travelPlan": {
    "location": "{location}",
    "duration": "{totalDays} days",
    "budget": "{budget}",
    "travelers": "{travelers}",
    "hotelOptions": [
      {
        "hotelName": "Hotel Name",
        "address": "Complete Address",
        "price": "$X per night",
        "imageURL": "Real working image URL",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ratings": 4.5,
        "description": "Hotel description"
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "placeName": "Attraction Name",
        "details": "Detailed description",
        "timeToVisit": "Best time to visit",
        "ticketPrice": "Entry fee or Free",
        "imageURL": "Real working image URL",
        "geoCoordinates": {
          "latitude": 0.0,
          "longitude": 0.0
        },
        "ratings": 4.8
      }
    ]
  }
}`;
