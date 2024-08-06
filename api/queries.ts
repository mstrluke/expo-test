// useAuthMutations.js
import { useMutation } from '@tanstack/react-query';
import { loginUser, logoutUser, signupUser } from './';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log('Login successful', data);
    },
    onError: (error) => {
      console.error('Login error', error);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      console.log('Logout successful');
    },
    onError: (error) => {
      console.error('Logout error', error);
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log('Signup successful', data);
    },
    onError: (error) => {
      console.error('Signup error', error);
    },
  });
};
