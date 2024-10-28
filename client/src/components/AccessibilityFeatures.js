import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FaWheelchair } from 'react-icons/fa';
import { useTextSize } from '../contexts/TextSizeContext';
import { useContrast } from '../contexts/ContrastContext';

function AccessibilityFeatures() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { fontSizeMultiplier, setFontSizeMultiplier } = useTextSize();
  const { isHighContrast, setHighContrast } = useContrast();

  const toggleModal = () => setModalIsOpen(!modalIsOpen);
  const handleTextSizeChange = multiplier => setFontSizeMultiplier(multiplier);
  const toggleHighContrast = () => setHighContrast(!isHighContrast);

  return (
    <div className="accessibility-features">
      <div dir="rtl">
        <Button
          variant="outline-primary"
          onClick={toggleModal}
          className="d-flex align-items-center"
        >
          <FaWheelchair />
          <span className="ms-2">נגישות</span>
        </Button>

        <Modal
          show={modalIsOpen}
          onHide={toggleModal}
          centered
          dialogClassName="rtl-modal"
          contentClassName={isHighContrast ? 'bg-dark text-white' : ''}
        >
          <Modal.Header
            closeButton
            className={isHighContrast ? 'border-bottom border-secondary' : ''}
          >
            <Modal.Title>תפריט נגישות</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <strong>גודל טקסט:</strong>
              {['1', '1.25', '1.5'].map(size => (
                <Form.Check
                  type="radio"
                  label={`${size === '1' ? 'בינוני' : size === '1.25' ? 'גדול' : 'יותר גדול'}`}
                  name="textSize"
                  value={size}
                  id={`text-size-${size}`}
                  checked={fontSizeMultiplier === parseFloat(size)}
                  onChange={() => handleTextSizeChange(parseFloat(size))}
                  key={size}
                  className={isHighContrast ? 'text-white' : ''}
                />
              ))}
              <Form.Check
                type="checkbox"
                label="הפעל מצב ניגודיות גבוהה"
                id="high-contrast-mode"
                checked={isHighContrast}
                onChange={toggleHighContrast}
                className={isHighContrast ? 'text-white' : ''}
              />
            </Form>
          </Modal.Body>
          <Modal.Footer
            className={isHighContrast ? 'border-top border-secondary' : ''}
          >
            <Button
              variant={isHighContrast ? 'secondary' : 'light'}
              onClick={toggleModal}
            >
              סגור
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default AccessibilityFeatures;
