import React from "react";
import { render } from '@testing-library/react';
import Button from '../components/Button';

describe('Button component', () => {
    test('should render correctly', () => {
      const { container } = render(<Button />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });