import Form from 'react-bootstrap/Form';

function SwitchButton({ setOnlyOpens, onlyOpens }) {
  return (
    <Form className="form">
      <Form.Check
        onChange={() => setOnlyOpens(!onlyOpens)}
        className="d-inline form-button"
        type="switch"
        id="custom-switch"
      />
      <label className="d-inline"> הצג מקומות פתוחים בלבד</label>
    </Form>
  );
}

export default SwitchButton;
