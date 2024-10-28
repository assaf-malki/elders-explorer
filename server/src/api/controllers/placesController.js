const axios = require('axios');

const getPlaceDetails = async (placeId) => {
  const apiUrl = 'https://maps.googleapis.com/maps/api/place/details/json';
  const params = {
    place_id: placeId,
    key: process.env.GOOGLE_API_KEY,
    language: 'iw',
  };

  try {
    const response = await axios.get(apiUrl, { params });
    return response.data.result;
  } catch (error) {
    console.error(`Failed to fetch details for place_id ${placeId}:`, error);
    return null;
  }
};

exports.getPlaces = async (req, res) => {
  const { hobby, radius, location } = req.query;


  const apiUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
  const params = {
    location: location,
    radius: radius,
    keyword: hobby,
    key: process.env.GOOGLE_API_KEY,
    language: 'iw',
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const places = response.data.results;

    const detailedPlaces = await Promise.all(
        places.map(async (place) => {
          const details = await getPlaceDetails(place.place_id);
          return { ...place, ...details };
        })
    );

    res.json(detailedPlaces);
  } catch (error) {
    console.error('Failed to fetch places:', error);
    res.status(500).send('Server error');
  }
};
