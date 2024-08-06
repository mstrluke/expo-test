import type { User } from './types';

export const loginUser = async (credentials: User) => {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    console.log(response)
    throw new Error('Login failed');
  }

  return response.json();
};

export const logoutUser = async () => {
  const response = await fetch('http://localhost:3000/api/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    console.log(response)
    throw new Error('Logout failed');
  }

  return response.json();
};

export const signupUser = async (credentials: User) => {
  const response = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Signup failed');
  }

  return response.json();
};
