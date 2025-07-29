import axios from 'axios';

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
  headers: {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': import.meta.env.VITE_GOOGLE_PLACE_API_KEY,
    'X-Goog-FieldMask': ['places.photos', 'places.displayName', 'places.id'],
  },
};

export const GetPlaceDetails = (data) => {
  // Make sure textQuery is properly formatted
  const requestData = {
    textQuery: data.textQuery || 'Unknown location',
    languageCode: data.languageCode || 'en',
  };

  // Maximum number of results if specified
  if (data.maxResultCount) {
    requestData.maxResultCount = data.maxResultCount;
  }

  // Add error handling and timeout
  return axios
    .post(BASE_URL, requestData, {
      ...config,
      timeout: 10000, // 10 second timeout
    })
    .catch((error) => {
      console.error('Places API Error:', error);
      // Return a structured error response
      return {
        data: {
          places: [],
        },
      };
    });
};

export const PHOTO_REF_URL =
  'https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=500&maxWidthPx=650&key=' +
  import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
