import React from "react";
import { render } from '@testing-library/react';
import Birre from '../pages/Birre';
import Home from '../pages/Home';
import Inventario from '../pages/Inventario';
import Ricette from '../pages/Ricette';
import Spesa from '../pages/Spesa';

describe('Birre component', () => {
    test('should render correctly', () => {
      const { container } = render(<Birre />);
      expect(container.firstChild).toMatchSnapshot();
    });
  });

describe('Home component', () => {
    test('should render correctly', () => {
      const { container } = render(<Home />);
      expect(container.firstChild).toMatchSnapshot();
    });
});

describe('Inventario component', () => {
    test('should render correctly', () => {
      const { container } = render(<Inventario />);
      expect(container.firstChild).toMatchSnapshot();
    });
});

describe('Ricette component', () => {
    test('should render correctly', () => {
      const { container } = render(<Ricette />);
      expect(container.firstChild).toMatchSnapshot();
    });
});

describe('Spesa component', () => {
    test('should render correctly', () => {
      const { container } = render(<Spesa />);
      expect(container.firstChild).toMatchSnapshot();
    });
});