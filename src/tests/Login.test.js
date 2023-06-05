import { fireEvent, render, screen } from '@testing-library/react';
import Login from '../components/Login';

const loginInp = 'login-submit-btn';
const passInp = 'password-input';
const emailInp = 'email-input';

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

    fireEvent.change(emailInput, { target: { value: 'hesr.ribeiro@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123456' } });

    expect(loginBtn).toBeEnabled();
  });

  it('verifica comportamento com inputs incorretos', () => {
    render(<Login />);

    const emailInput = screen.getByTestId(emailInp);
    const passwordInput = screen.getByTestId(passInp);
    const loginBtn = screen.getByTestId(loginInp);

    fireEvent.change(emailInput, { target: { value: 'xablau' } });
    fireEvent.change(passwordInput, { target: { value: 'senha123456' } });

    expect(loginBtn).toBeDisabled();
  });

  it('verifica comportamento quando senha menor do que 6 char', () => {
    render(<Login />);

    const emailInput = screen.getByTestId(emailInp);
    const passwordInput = screen.getByTestId(passInp);
    const loginBtn = screen.getByTestId(loginInp);

    fireEvent.change(emailInput, { target: { value: 'hesr.ribeiro@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: '123' } });

    expect(loginBtn).toBeDisabled();
  });
});
