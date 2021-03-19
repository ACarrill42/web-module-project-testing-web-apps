import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import ContactForm from './ContactForm';

test('renders without errors', ()=>{
  render(<App />)
  render(<ContactForm />)
});

test('renders the contact form header', ()=> {
  render(<ContactForm />)
    const header = screen.getByText(/Contact Form/i);
    expect(header).toBeTruthy();
    expect(header).toBeDefined();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />)
  const firstNameLabel = screen.getByLabelText(/First Name/i);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  const errorMessage = screen.getByText(/must have at least 5 characters/)
  expect(errorMessage).toBeInTheDocument()
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />)
  const firstNameLabel = screen.getByLabelText(/First Name/i);
  const lastNameLabel = screen.getByLabelText(/Last Name/i);
  const emailLabel = screen.getByLabelText(/Email/i);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton)
  const errorMessageFirstName = screen.getByText(/must have at least 5 characters/);
  const errorMessageEmail = screen.getByText(/must be a valid email address/i);
  const errorMessageLastName = screen.getByText(/is a required field/i)

  expect(errorMessageFirstName).toBeInTheDocument();
  expect(errorMessageEmail).toBeInTheDocument();
  expect(errorMessageLastName).toBeInTheDocument();

});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />)  
  const firstNameLabel = screen.getByLabelText(/First Name/i);
  const lastNameLabel = screen.getByLabelText(/Last Name/i);
  const emailLabel = screen.getByLabelText(/Email/i);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);
  userEvent.type(firstNameLabel, 'Austin');
  userEvent.type(lastNameLabel, 'Carrill');

  const errorMessageEmail = screen.getByText(/must be a valid email address/i);
  expect(errorMessageEmail).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />) 
  const emailLabel = screen.getByLabelText(/Email/i);   
  const submitButton = screen.getByRole('button');
  const errorMessageEmail = screen.getByText(/must be a valid email address/i);
  userEvent.click(submitButton);
  userEvent.type(emailLabel, 'asd.goo')

  expect(errorMessageEmail).toBeInTheDocument()
  screen.debug();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />)    
  const lastNameLabel = screen.getByLabelText(/Last Name/i);
  const errorMessageLastName = screen.getByText(/is a required field/i);
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  expect(errorMessageLastName).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />)    
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />) 
  
  const firstNameLabel = screen.getByLabelText(/First Name/i);
  const lastNameLabel = screen.getByLabelText(/Last Name/i);
  const emailLabel = screen.getByLabelText(/Email/i);
  const submitButton = screen.getByRole('button');

  userEvent.type(firstNameLabel, 'Austin');
  userEvent.type(lastNameLabel, 'Carrill');
  userEvent.type(emailLabel, 'abc@gmail.com');
  userEvent.click(submitButton);
});