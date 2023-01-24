import React from "react";
import { render } from '@testing-library/react';
import Button from '../components/Button';
import GridInventoryItem from '../components/GridInventoryItem';

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