import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Login from '../pages/Login';

const loginInp = 'login-submit-btn';
const passInp = 'password-input';
const emailInp = 'email-input';
const validEmail = 'hesr.ribeiro@gmail.com';

describe('Testando a tela de Login ao máximo', () => {
  it('verifica os inputs de senha e email', () => {
    render(<Login />);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
  });

  it('verifica se o btn ta disabled', () => {
    render(<Login />);

    const loginBtn = screen.getByTestId(loginInp);
    expect(loginBtn).toBeDisabled();
  });

  it('verifica comportamento com inputs corretos', () => {
    render(<Login />);

    const emailInput = screen.getByTestId(emailInp);
    const passwordInput = screen.getByTestId(passInp);
    const loginBtn = screen.getByTestId(loginInp);
    const history = createMemoryHistory();

    userEvent.type(emailInput, validEmail);
    userEvent.type(passwordInput, '12345678124546');

    expect(loginBtn).toBeEnabled();

    userEvent.click(loginBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const savedUser = JSON.parse(localStorage.getItem('user'));
    expect(savedUser).toEqual({ email: validEmail });
  });

  it('verifica comportamento com inputs incorretos', () => {
    render(<Login />);

    const emailInput = screen.getByTestId(emailInp);
    const passwordInput = screen.getByTestId(passInp);
    const loginBtn = screen.getByTestId(loginInp);

    userEvent.type(emailInput, 'xablau');
    userEvent.type(passwordInput, 'senha123456');

    expect(loginBtn).toBeDisabled();
  });

  it('verifica comportamento quando senha menor do que 6 char', () => {
    render(<Login />);

    const emailInput = screen.getByTestId(emailInp);
    const passwordInput = screen.getByTestId(passInp);
    const loginBtn = screen.getByTestId(loginInp);

    userEvent.type(emailInput, { target: { value: 'hesr.ribeiro@gmail.com' } });
    userEvent.type(passwordInput, { target: { value: '123' } });

    expect(loginBtn).toBeDisabled();
  });
});
