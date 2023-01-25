import React from "react";
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Button from '../src/components/Button';
import GridInventoryItem from '../src/components/GridInventoryItem';
import NavBar from '../src/components/NavBar';
import QuantityInput from '../src/components/QuantityInput';

describe('Button component', () => {
    test('should render correctly', () => {
      const { container } = render(<Button />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('should increase the count when "+" button is clicked', () => {
      const { getByText } = render(<Button />);
      const plusButton = getByText('+');
      fireEvent.click(plusButton);
      const countText = getByText('1');
      expect(countText).toBeInTheDocument();
    });

    test('should decrease the count when "-" button is clicked if count is greater than zero', () => {
      const { getByText } = render(<Button />);
      const plusButton = getByText('+');
      fireEvent.click(plusButton);
      fireEvent.click(plusButton);
      const minusButton = getByText('-');
      fireEvent.click(minusButton);
      const countText = getByText('1');
      expect(countText).toBeInTheDocument();
    });

    test('should not decrease the count when "-" button is clicked if count is zero', () => {
      const { getByText } = render(<Button />);
      const minusButton = getByText('-');
      fireEvent.click(minusButton);
      const countText = getByText('0');
      expect(countText).toBeInTheDocument();
    });
  });

describe('GridInventoryItem component', () => {
    test('should render correctly', () => {
      const { container } = render(<GridInventoryItem />);
      expect(container.firstChild).toMatchSnapshot();
    });
});

describe('NavBar component', () => {
    test('should render correctly', () => {
      const { container } = render(<NavBar />);
      expect(container.firstChild).toMatchSnapshot();
    });
});

describe('QuantityInput component', () => {
    test('should render correctly', () => {
      const { container } = render(<QuantityInput />);
      expect(container.firstChild).toMatchSnapshot();
    });

    test('correctly sets the value of the input element', () => {
      const { container } = render(<QuantityInput />);
      const input = container.querySelector('input');
    
      fireEvent.change(input, { target: { value: '100' } });
      expect(input.value).toBe('100');
    
      fireEvent.change(input, { target: { value: '1000' } });
      expect(input.value).toBe('999');
    
      fireEvent.change(input, { target: { value: '100.5' } });
      expect(input.value).toBe('100.5');
    });

    test('correctly sets the value of the input element on blur', () => {
      const { container } = render(<QuantityInput />);
      const input = container.querySelector('input');
    
      fireEvent.change(input, { target: { value: '0.00' } });
      fireEvent.blur(input);
      expect(input.value).toBe('0');
    });
});