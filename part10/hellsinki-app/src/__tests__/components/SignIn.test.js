import { render, screen, fireEvent, waitFor  } from '@testing-library/react-native';
import SignIn from '../../components/SignIn';
import useSignIn from '../../hooks/useSignIn';
import useAuthStorage from '../../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';

jest.mock('../../hooks/useSignIn');
jest.mock('../../hooks/useAuthStorage');
jest.mock('@apollo/client', () => {
    const originalModule = jest.requireActual('@apollo/client');
    return {
      ...originalModule,
      useApolloClient: jest.fn(),
      gql: jest.fn((query) => query),
    };
});
jest.mock('react-router-native', () => ({
  useNavigate: jest.fn(),
}));


describe('SignIn',  () => {
    it('renders correctly', async () => {
        const mockSignIn = jest.fn(() => Promise.resolve({ data: { authenticate: { accessToken: 'token' }}}));
        const mockSetAccessToken = jest.fn();
        const mockResetStore = jest.fn();
        const mockNavigate = jest.fn();

        useSignIn.mockReturnValue([mockSignIn]);
        useAuthStorage.mockReturnValue({ setAccessToken: mockSetAccessToken });
        useApolloClient.mockReturnValue({ resetStore: mockResetStore });
        useNavigate.mockReturnValue(mockNavigate);

        render(<SignIn />);

        fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
        fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
        fireEvent.press(screen.getByText('Sign In'));

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith({ username: 'kalle', password: 'password' });
        });
    });
})