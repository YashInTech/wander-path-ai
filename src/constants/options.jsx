export const SelectTravelList=[
    {
        id:1,
        title:'Just Me',
        desc:'A sole traveler in exploration',
        icon:'✈',
        people:'1 person'
    },
    {
        id:2,
        title:'Couple',
        desc:'A romantic getaway for two',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'Friends',
        desc:'A bunch of thrill-seekers',
        icon:'⛵',
        people:'3 to 8 people'
    },
    {
        id:4,
        title:'Small Family',
        desc:'A small family of explorers',
        icon:'🧳',
        people:'3 to 4 people'
    },
    {
        id:5,
        title:'Large Family',
        desc:'A group of fun loving adventurers',
        icon:'🏡',
        people:'5 to 10 people'
    }
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Economy',
        desc:'Stay conscious of the budget',
        icon:'💵'
    },
    {
        id:2,
        title:'Mid-Range',
        desc:'A mix of comfort and budget',
        icon:'💰'
    },
    {
        id:3,
        title:'Luxury',
        desc:'Do not hold back on the luxury',
        icon:'💸'
    }
]

export const AI_PROMPT = 'Generate a travel plan for location : {location} for {totalDays} day(s) for {travelers} with a {budget} budget.Give me a Hotel Option list with HotelName, Address, Price, hotel image url, geo coordinates, ratings, descriptions. Also suggest itinenary with place names to visit, time to visit, ticket prices, details, image url, geo coordinates, ratings. In a JSON Format.';