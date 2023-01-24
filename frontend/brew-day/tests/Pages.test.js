import React from "react";
import { render } from '@testing-library/react';
import Birre from '../src/pages/Birre';
import Home from '../src/pages/Home';
import Inventario from '../src/pages/Inventario';
import Ricette from '../src/pages/Ricette';
import Spesa from '../src/pages/Spesa';

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