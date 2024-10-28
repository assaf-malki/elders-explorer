import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { debounce } from 'lodash';
import { useParams } from 'react-router-dom'; // Import useParams
import { useUser } from '../contexts/UserProvider'; // Ensure this is imported correctly
import StarRating from './StarRating'; // Ensure this is imported correctly
import { useContrast } from '../contexts/ContrastContext'; // Ensure this is imported correctly
import SwitchButton from './SwitchButton';

const placeTypeTranslations = {
  accounting: 'חשבונאות',
  airport: 'שדה תעופה',
  amusement_park: 'פארק שעשועים',
  aquarium: 'אקווריום',
  art_gallery: 'גלריה לאמנות',
  atm: 'כספומט',
  bakery: 'מאפיה',
  bank: 'בנק',
  bar: 'בר',
  beauty_salon: 'מכון יופי',
  bicycle_store: 'חנות אופניים',
  book_store: 'חנות ספרים',
  bowling_alley: 'מסלול באולינג',
  bus_station: 'תחנת אוטובוס',
  cafe: 'בית קפה',
  campground: 'אתר קמפינג',
  car_dealer: 'מוכר רכבים',
  car_rental: 'השכרת רכב',
  car_repair: 'תיקון רכבים',
  car_wash: 'שטיפת רכבים',
  casino: 'קזינו',
  cemetery: 'בית קברות',
  church: 'כנסייה',
  city_hall: 'עירייה',
  clothing_store: 'חנות בגדים',
  convenience_store: 'חנות נוחות',
  courthouse: 'בית משפט',
  dentist: 'רופא שיניים',
  department_store: 'חנות מחלקות',
  doctor: 'רופא',
  drugstore: 'בית מרקחת',
  electrician: 'חשמלאי',
  electronics_store: 'חנות אלקטרוניקה',
  embassy: 'שגרירות',
  fire_station: 'תחנת כיבוי אש',
  florist: 'חנות פרחים',
  funeral_home: 'בית אבל',
  furniture_store: 'חנות ריהוט',
  gas_station: 'תחנת דלק',
  gym: 'חדר כושר',
  hair_care: 'טיפוח שיער',
  hardware_store: 'חנות חומרה',
  hindu_temple: 'מקדש הינדו',
  home_goods_store: 'חנות למוצרי בית',
  hospital: 'בית חולים',
  insurance_agency: 'סוכנות ביטוח',
  jewelry_store: 'חנות תכשיטים',
  laundry: 'כביסה',
  lawyer: 'עורך דין',
  library: 'ספרייה',
  light_rail_station: 'תחנת רכבת קלה',
  liquor_store: 'חנות משקאות',
  local_government_office: 'משרד ממשלתי מקומי',
  locksmith: 'מנעולן',
  lodging: 'לינה',
  meal_delivery: 'משלוח אוכל',
  meal_takeaway: 'אוכל לקחת',
  mosque: 'מסגד',
  movie_rental: 'השכרת סרטים',
  movie_theater: 'קולנוע',
  moving_company: 'חברת הובלות',
  museum: 'מוזיאון',
  night_club: 'מועדון לילה',
  painter: 'צייר',
  park: 'פארק',
  parking: 'חנייה',
  pet_store: 'חנות חיות מחמד',
  pharmacy: 'בית מרקחת',
  physiotherapist: 'פיזיותרפיסט',
  plumber: 'אינסטלטור',
  police: 'משטרה',
  post_office: 'דואר',
  primary_school: 'בית ספר יסודי',
  real_estate_agency: 'סוכנות נדל"ן',
  restaurant: 'מסעדה',
  roofing_contractor: 'קבלן גגות',
  rv_park: 'חניון קרוואנים',
  school: 'בית ספר',
  secondary_school: 'תיכון',
  shoe_store: 'חנות נעליים',
  shopping_mall: 'קניון',
  spa: 'ספא',
  stadium: 'אצטדיון',
  storage: 'אחסון',
  store: 'חנות',
  subway_station: 'תחנת רכבת תחתית',
  supermarket: 'סופרמרקט',
  synagogue: 'בית כנסת',
  taxi_stand: 'תחנת מוניות',
  tourist_attraction: 'אטרקציות תיירות',
  train_station: 'תחנת רכבת',
  transit_station: 'תחנת מעבר',
  travel_agency: 'סוכנות נסיעות',
  university: 'אוניברסיטה',
  veterinary_care: 'רופא וטרינר',
  zoo: 'גן חיות',
  administrative_area_level_1: 'מחוז מנהלי רמה 1',
  administrative_area_level_2: 'מחוז מנהלי רמה 2',
  administrative_area_level_3: 'מחוז מנהלי רמה 3',
  administrative_area_level_4: 'מחוז מנהלי רמה 4',
  administrative_area_level_5: 'מחוז מנהלי רמה 5',
  administrative_area_level_6: 'מחוז מנהלי רמה 6',
  administrative_area_level_7: 'מחוז מנהלי רמה 7',
  archipelago: 'ארכיפלג',
  colloquial_area: 'אזור בלתי רשמי',
  continent: 'יבשת',
  country: 'מדינה',
  establishment: 'מוסד',
  finance: 'פיננסים',
  floor: 'קומה',
  food: 'מזון',
  general_contractor: 'קבלן כללי',
  geocode: 'גיאוקוד',
  health: 'בריאות',
  intersection: 'צומת',
  landmark: 'אתר מורשת',
  locality: 'מקומיות',
  natural_feature: 'תכונה טבעית',
  neighborhood: 'שכונה',
  place_of_worship: 'בית תפילה',
  plus_code: 'קוד פלוס',
  point_of_interest: 'נקודת עניין',
  political: 'פוליטי',
  post_box: 'תיבת דואר',
  postal_code: 'מיקוד',
  postal_code_prefix: 'קידומת מיקוד',
  postal_code_suffix: 'סיומת מיקוד',
  postal_town: 'עיר דואר',
  premise: 'נכס',
  room: 'חדר',
  route: 'מסלול',
  street_address: 'כתובת רחוב',
  street_number: 'מספר רחוב',
  sublocality: 'תת-אזור',
  sublocality_level_1: 'תת-אזור רמה 1',
  sublocality_level_2: 'תת-אזור רמה 2',
  sublocality_level_3: 'תת-אזור רמה 3',
  sublocality_level_4: 'תת-אזור רמה 4',
  sublocality_level_5: 'תת-אזור רמה 5',
  subpremise: 'תת-נכס',
  town_square: 'כיכר העיר',
};

const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = degree => degree * (Math.PI / 180);
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance; // Distance in kilometers
};

const PlacesOfInterest = () => {
  const { hobby } = useParams(); // Use useParams to get the hobby from the route
  const { user } = useUser(); // Use the UserContext to access user data
  const [radius, setRadius] = useState(2000); // Default radius in meters
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isHighContrast } = useContrast(); // Using the useContrast hook here
  const [onlyOpens, setOnlyOpens] = useState(false);

  const locationString =
    user && user.location
      ? `${user.location.lat},${user.location.lon}`
      : 'DEFAULT_LOCATION'; // Provide a default or a user prompt to set location

  const fetchPlaces = useCallback(
    debounce(async (hobby, radius) => {
      if (locationString !== 'DEFAULT_LOCATION') {
        setLoading(true); // Set loading to true before fetching data
        try {
          const { data } = await axios.get(`http://localhost:4000/api/places`, {
            params: {
              location: locationString,
              radius,
              hobby,
            },
          });
          setPlaces(data);
        } catch (error) {
          console.error('Failed to fetch places:', error);
        } finally {
          setLoading(false); // Set loading to false after fetching data
        }
      }
    }, 500),
    [locationString] // Only recreate the debounced function when the location changes
  );

  useEffect(() => {
    fetchPlaces(hobby, radius);
    // Cleanup the debounced function on component unmount
    return () => {
      fetchPlaces.cancel();
    };
  }, [hobby, radius, fetchPlaces]);

  const cardStyle = {
    backgroundColor: isHighContrast ? '#343a40' : '#fff',
    color: isHighContrast ? '#fff' : '#000',
  };

  //sort the places array by distance and filter by open/all status
  const sortedAndFilteredPlaces = places
    .sort((a, b) => {
      const distanceA = haversineDistance(
        user.location.lat,
        user.location.lon,
        a.geometry.location.lat,
        a.geometry.location.lng
      );
      const distanceB = haversineDistance(
        user.location.lat,
        user.location.lon,
        b.geometry.location.lat,
        b.geometry.location.lng
      );
      return distanceA - distanceB;
    })
    .filter(
      place =>
        !onlyOpens || (place.opening_hours && place.opening_hours.open_now)
    );
  return (
    <Container>
      <Row className="justify-content-center my-3">
        <Col xs={12}>
          <h1 className="text-center mb-3">{hobby}</h1>
          <p className="text-center mb-4" dir="rtl">
            גלה מקומות מעניינים הקשורים ל{hobby} בקרבתך!
          </p>
        </Col>
        <Col xs={12} md={6}>
          <Slider
            min={100}
            max={5000}
            value={radius}
            onChange={setRadius}
            onChangeComplete={newRadius => fetchPlaces(hobby, newRadius)}
            trackStyle={{ backgroundColor: 'blue', height: 10 }}
            handleStyle={{
              borderColor: 'blue',
              height: 28,
              width: 28,
              marginLeft: -14,
              marginTop: -9,
              backgroundColor: 'white',
            }}
            railStyle={{ backgroundColor: 'grey', height: 10 }}
          />
          <div className="text-center mt-2">רדיוס: {radius} מטרים</div>
        </Col>
      </Row>

      {loading ? (
        <Row className="justify-content-center mt-4">
          <Col className="text-center">
            <Spinner animation="border" />
          </Col>
        </Row>
      ) : (
        <>
          <SwitchButton setOnlyOpens={setOnlyOpens} onlyOpens={onlyOpens} />
          <Row
            className={`justify-content-${places.length < 3 ? 'center' : 'start'}`}
          >
            {places.length === 0 ? (
              <Col className="text-center">
                אין תוצאות - נא להרחיב את טווח החיפוש
              </Col>
            ) : sortedAndFilteredPlaces.length === 0 ? (
              <Col className="text-center">
                אין מקומות פתוחים כרגע ברדיוס של {radius} מטרים
              </Col>
            ) : (
              sortedAndFilteredPlaces.map(place => {
                const distance = haversineDistance(
                  user.location.lat,
                  user.location.lon,
                  place.geometry.location.lat,
                  place.geometry.location.lng
                );
                return (
                  <Col
                    key={place.place_id}
                    md={
                      sortedAndFilteredPlaces.length === 1
                        ? 8
                        : sortedAndFilteredPlaces.length === 2
                          ? 6
                          : 4
                    } // Adjust column width based on the number of places
                    className="mb-4 d-flex align-items-stretch"
                  >
                    <Card
                      className="w-100 custom-card"
                      dir="rtl"
                      style={cardStyle}
                    >
                      <Card.Img
                        variant="top"
                        src={
                          place.photos && place.photos.length > 0
                            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${process.env.REACT_APP_PLACES_API_KEY}`
                            : `https://via.placeholder.com/400x200?text=No+Image`
                        }
                        alt={place.name}
                        className="uniform-img" // Ensure all images have the same height
                      />
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>
                          {place.website ? (
                            <a
                              rel="noreferrer"
                              target="_blank"
                              href={place.website}
                            >
                              {place.name}
                            </a>
                          ) : (
                            place.name
                          )}
                          {/* {place.name} */}
                        </Card.Title>
                        <div>
                          {place.opening_hours &&
                          place.opening_hours.open_now ? (
                            <span
                              style={{
                                color: isHighContrast ? 'lightgreen' : 'green',
                              }}
                            >
                              פתוח
                            </span>
                          ) : (
                            <span
                              style={{
                                color: isHighContrast ? 'red' : 'darkred',
                              }}
                            >
                              סגור
                            </span>
                          )}
                          <br />
                          {place.vicinity || 'לא זמין כתובת'}
                          <br />
                          מרחק: {distance.toFixed(2)} ק"מ
                          <br />
                          מצב עסק:{' '}
                          {place.business_status === 'OPERATIONAL'
                            ? 'פעיל'
                            : 'לא פעיל'}
                          <br />
                          ציון: <StarRating rating={place.rating} /> (
                          {place.rating.toFixed(1)})
                          <br />
                          ביקורות: {place.user_ratings_total}
                          <br />
                          שעות פתיחה:
                          {place.opening_hours &&
                          place.opening_hours.weekday_text ? (
                            <ul>
                              {place.opening_hours.weekday_text.map(
                                (text, index) => (
                                  <li key={index}>{text}</li>
                                )
                              )}
                            </ul>
                          ) : (
                            <>
                              <span> שעות פתיחה לא זמינות</span>
                              <br />
                            </>
                          )}
                          {place.formatted_phone_number ? (
                            <>
                              טלפון: {place.formatted_phone_number}
                              <br />
                            </>
                          ) : (
                            <>
                              מס' טלפון לא זמין
                              <br />
                            </>
                          )}
                        </div>
                        <div className="mt-3">
                          <small style={{ color: cardStyle.color }}>
                            {place.types
                              .map(type => placeTypeTranslations[type]) // Use the predefined dictionary for translation
                              .filter(Boolean) // Remove undefined entries
                              .join(', ') || 'לא זמינים סוגים'}
                          </small>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        </>
      )}
    </Container>
  );
};

export default PlacesOfInterest;
