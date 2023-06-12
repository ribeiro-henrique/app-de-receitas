import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useHistory } from 'react-router-dom';
import validator from 'validator';
import '../styles/Login.css';

// const tomateImage = require('../images/tomate.png');
// const logoImage = require('../images/logo.png');

function Login() {
  const [validateEmail, setValidateEmail] = useState('');
  const [validatePass, setValidadePass] = useState('');
  const [buttonState, setButtonState] = useState(true);
  const history = useHistory();

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

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: validateEmail }));
    history.push('/meals');
  };

  return (
    <div className="login-container">
      {/* <div className="background" />
      <img className="tomate" src={ tomateImage } alt="Tomate" />
      <img className="logo" src={ logoImage } alt="Logo Recipes App" /> */}
      <Form className="login-form">
        <h1 className="login-title">Login</h1>
        <Form.Group
          className="mb-3"
          controlId="formGroupEmail"
        >

          <Form.Control
            data-testid="email-input"
            type="email"
            placeholder="Email"
            value={ validateEmail }
            onChange={ handleEmail }
          />
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formGroupPassword"
        >

          <Form.Control
            data-testid="password-input"
            type="password"
            placeholder="Password"
            value={ validatePass }
            onChange={ handlePass }
          />
        </Form.Group>
        <Button
          size="lg"
          variant="danger"
          data-testid="login-submit-btn"
          disabled={ buttonState }
          onClick={ handleClick }
        >
          Login

        </Button>
        {' '}
      </Form>
    </div>
  );
}

export default Login;
