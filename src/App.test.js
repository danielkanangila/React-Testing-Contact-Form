import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import ContactFrom from "./components/ContactForm";
import 'mutationobserver-shim';
import { act } from "react-dom/test-utils";


test("renders App without crashing", () => {
  render(<App />);
});

test("check that submit fails if inputs are empties", async () => {
  const { getByTestId } = render(<ContactFrom />);
  const submitButton = getByTestId(/btn-submit/i);
  
  await act ( async () => {
    fireEvent.click(submitButton);
  })

  expect(document.querySelectorAll('p.error').length).toBe(3);
});

test("form submit if inputs are valid", async () => {
  const { getByPlaceholderText, getByTestId } = render(<ContactFrom />);
  const submitButton = getByTestId(/btn-submit/i);
  
  const inputFirstName = getByPlaceholderText("bill");
  const inputLastName = getByPlaceholderText("luo");
  const inputEmail = getByPlaceholderText("bluebill1049@hotmail.com");

  await act ( async () => {
    fireEvent.change(inputFirstName, {target: {value: "Dan"}});
    fireEvent.change(inputLastName, {target: {value: "Foo"}});
    fireEvent.change(inputEmail, {target: {value: "example@fakegmail.com"}});
    fireEvent.click(submitButton);
  });

  expect(document.querySelector('pre')).toBeVisible();
})