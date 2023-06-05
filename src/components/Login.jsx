import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import validator from 'validator';

function Login() {
  const [validateEmail, setValidateEmail] = useState('');
  const [validatePass, setValidadePass] = useState('');
  const [buttonState, setButtonState] = useState(true);

  const PASS_LENGTH = 6;

  const verifyInp = () => {
    if (validatePass.length >= PASS_LENGTH && validator.isEmail(validateEmail)) {
      return setButtonState(false);
    }
  };

  const handleEmail = ({ target }) => {
    setValidateEmail(target.value);
    verifyInp();
  };

  const handlePass = ({ target }) => {
    setValidadePass(target.value);
    verifyInp();
  };

  return (
    <Form>
      <Form.Group
        className="mb-3"
        controlId="formGroupEmail"
      >
        <Form.Label>Email address</Form.Label>
        <Form.Control
          data-testid="email-input"
          type="email"
          placeholder="Enter email"
          value={ validateEmail }
          onChange={ handleEmail }
        />
      </Form.Group>
      <Form.Group
        className="mb-3"
        controlId="formGroupPassword"
      >
        <Form.Label>Password</Form.Label>
        <Form.Control
          data-testid="password-input"
          type="password"
          placeholder="Password"
          value={ validatePass }
          onChange={ handlePass }
        />
      </Form.Group>
      <Button
        variant="danger"
        data-testid="login-submit-btn"
        disabled={ buttonState }
      >
        Login

      </Button>
      {' '}
    </Form>
  );
}

export default Login;
