import React, { useRef, useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useContrast } from '../contexts/ContrastContext';
import AddressInput from './AddressInput';
import axios from 'axios';
import { useUser } from '../contexts/UserProvider';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ initialData = null }) => {
  const { isHighContrast } = useContrast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [locating, setLocating] = useState(false);
  const [locationFound, setLocationFound] = useState(
    initialData?.locationText === 'User Location'
  );
  const [locationText, setLocationText] = useState('');
  const [selectingYearFirst, setSelectingYearFirst] = useState(!initialData);
  const datePickerRef = useRef();
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const { setUser } = useUser(); // Destructure setUser from the context
  const navigate = useNavigate();

  const hobbies = [
    'מרכזי ספורט',
    'מרכזי קניות',
    'מסעדות ובתי קפה',
    'משחקים',
    'שירה בציבור',
    'התנדבות',
    'טיולים',
    'מועדוני יום',
    'מרכזי תרבות',
    'טיפוח',
    'שעת חירום',
    'סופרמרקט',
    'בנקים',
    'ספרייה',
    'קופות חולים',
    'בתי קולנוע',
    'יצירה',
    'אמנות',
    'מרכזי מוסיקה',
    'גינות קהילתיות',
  ];

  useEffect(() => {
    if (initialData) {
      setUsername(initialData.username);
      setBirthday(new Date(initialData.birthday));
      setLocation(initialData.location);
      setLocationText(initialData.locationText);
      setSelectedHobbies(initialData.hobbies);
    }
  }, [initialData]);

  const handleLocationClick = () => {
    if (locationFound) {
      // Reset location if already found
      setLocation({ lat: null, lon: null });
      setLocationText('');
      setLocationFound(false);
    } else {
      setLocating(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLocation({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
            setLocationText('User Location'); // Set location text to indicate it's user's current location
            setLocationFound(true); // Set location found to true
            setLocating(false); // Stop showing the locating state
          },
          () => {
            alert('Unable to retrieve your location');
            setLocating(false);
          }
        );
      } else {
        alert('Geolocation is not supported by this browser.');
        setLocating(false);
      }
    }
  };

  const handleDateChange = date => {
    if (selectingYearFirst) {
      setBirthday(new Date(date.getFullYear(), 0, 1));
      setSelectingYearFirst(false); // Switch to full date selection
      setTimeout(() => datePickerRef.current.setOpen(true), 0); // Reopen the date picker
    } else {
      setBirthday(date);
    }
  };

  const handleHobbyChange = hobby => {
    setSelectedHobbies(prev =>
      prev.includes(hobby) ? prev.filter(h => h !== hobby) : [...prev, hobby]
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Check required fields are not empty
    if (
      !username ||
      (!initialData && (!password || !confirmPassword)) ||
      !birthday
    ) {
      alert('אנא מלא את כל השדות הנדרשים.');
      return;
    }

    // Check if password has at least 6 characters
    if (!initialData && password.length < 6) {
      alert('הסיסמה חייבת להכיל לפחות 6 תווים.');
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      alert('הסיסמאות אינן תואמות.');
      return;
    }

    // Check if location is provided
    if (!location.lat || !location.lon) {
      alert('אנא ספק מיקום.');
      return;
    }

    // Check if at least one hobby is selected
    if (selectedHobbies.length === 0) {
      alert('אנא בחר לפחות תחביב אחד.');
      return;
    }

    const formData = {
      username,
      birthday: birthday.toISOString().slice(0, 10), // Format date
      locationText,
      location,
      hobbies: selectedHobbies,
    };

    const apiUrl = initialData
      ? `http://localhost:4000/api/auth/update`
      : `http://localhost:4000/api/auth/register`;
    try {
      await axios.post(apiUrl, {
        ...formData,
        password, // Send password to the server for registration
      });
      setUser(formData); // Save the submitted form data in the UserContext
      if (initialData) {
        navigate('/user-home');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage =
          error?.response?.data?.message || 'אירעה שגיאה לא צפויה';
      alert(`Error submitting form: ${errorMessage}`);
    }
  };

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  return (
    <Container
      className={`my-5 ${isHighContrast ? 'bg-dark text-white' : ''}`}
      dir="rtl"
    >
      <h1 className="text-center mb-3">
        {initialData ? 'עדכון פרטים' : 'הרשמה'}
      </h1>
      <p className="text-center mb-4">
        {initialData
          ? 'עדכן את פרטיך כאן'
          : 'הצטרף לElders Explore היום וגלה יותר!'}
      </p>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} sm="12" lg="6">
            <Form.Label>שם משתמש:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown} // Prevent form submission on enter
              onInvalid={e => e.target.setCustomValidity('נא למלא שם משתמש')}
              onInput={e => e.target.setCustomValidity('')}
              required
              disabled={!!initialData}
              placeholder="הכנס שם משתמש"
            />
          </Form.Group>
          <Form.Group as={Col} sm="12" lg="6">
            <Form.Label>תאריך לידה:</Form.Label>
            <DatePicker
              ref={datePickerRef}
              selected={birthday}
              onChange={handleDateChange}
              dateFormat={selectingYearFirst ? 'yyyy' : 'dd/MM/yyyy'}
              wrapperClassName="form-control d-block" // Ensuring it matches other inputs
              showYearPicker={selectingYearFirst}
              className="form-control"
              onKeyDown={handleKeyDown} // Prevent form submission on enter
              required
              placeholderText="dd/mm/yyyy"
            />
          </Form.Group>
        </Row>
        {!initialData && (
          <>
            <Row className="mb-3">
              <Form.Group as={Col} sm="12" lg="6">
                <Form.Label>סיסמה:</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown} // Prevent form submission on enter
                  onInvalid={e => e.target.setCustomValidity('נא למלא סיסמא')}
                  onInput={e => e.target.setCustomValidity('')}
                  required
                  placeholder="הכנס סיסמה בת 6 תווים לפחות"
                />
              </Form.Group>
              <Form.Group as={Col} sm="12" lg="6">
                <Form.Label>הכנס סיסמה שוב:</Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  onKeyDown={handleKeyDown} // Prevent form submission on enter
                  onInvalid={e => e.target.setCustomValidity('נא למלא סיסמא')}
                  onInput={e => e.target.setCustomValidity('')}
                  required
                  placeholder="הכנס שוב את הסיסמה"
                />
              </Form.Group>
            </Row>
          </>
        )}

        <Row className="mb-4">
          <Col sm="6">
            <Form.Group>
              <Form.Label>כתובת:</Form.Label>
              <AddressInput
                disabled={locationFound}
                setLocation={setLocation}
                setLocationText={setLocationText}
                initialAddress={locationText}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-4">
          <Col sm="12">
            <Button
              variant={locationFound ? 'success' : 'secondary'}
              onClick={handleLocationClick}
              disabled={locating}
            >
              {locating
                ? 'מחפש מיקום...'
                : locationFound
                  ? 'הפסק שימוש במיקום שלי'
                  : 'השתמש במיקום שלי'}
            </Button>
          </Col>
        </Row>
        <Row className="mb-4">
          <Form.Label>בחר תחביבים:</Form.Label>
          {hobbies.map(hobby => (
            <Col sm="4" key={hobby}>
              <Form.Check
                type="checkbox"
                label={hobby}
                checked={selectedHobbies.includes(hobby)}
                onChange={() => handleHobbyChange(hobby)}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col sm="12" className="text-center">
            <Button variant="primary" type="submit">
              {initialData ? 'עדכון פרטים' : 'הרשמה'}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
