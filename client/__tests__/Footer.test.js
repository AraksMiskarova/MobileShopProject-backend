import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../src/components/Simple/Footer/Footer';

describe('Footer', () => {
  test('renders "Ukraine" text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Kyiv, Ukraine/)).toBeInTheDocument();
  });
  test('renders "InstagramIcon" by test-id', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('InstagramIcon')).toBeInTheDocument();
  });
  test('renders "TelegramIcon" by test-id', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('TelegramIcon')).toBeInTheDocument();
  });
  test('renders "YouTubeIcon" by test-id', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('YouTubeIcon')).toBeInTheDocument();
  });
  test('renders "EmailIcon" by test-id', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>,
    );
    expect(screen.getByTestId('EmailIcon')).toBeInTheDocument();
  });
});
