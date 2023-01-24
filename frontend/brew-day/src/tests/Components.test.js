import React from "react";
import { render } from '@testing-library/react';
import Button from '../components/Button';
import GridInventoryItem from '../components/GridInventoryItem';
import NavBar from '../components/NavBar';
import QuantityInput from '../components/QuantityInput';

describe('Button component', () => {
    test('should render correctly', () => {
      const { container } = render(<Button />);
      expect(container.firstChild).toMatchSnapshot();
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
});