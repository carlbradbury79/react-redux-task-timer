import { render, screen } from '@testing-library/react';
import { TotalTime } from '../TotalTime';

// Top tip, do not delete setupTests.js if you want to use jest methods...
// If you do delete it, the RTL will still work

describe('Total Time Component tests', () => {
  describe('Less than 1 minute tests', () => {
    it('should display second only span (1s)', async () => {
      render(<TotalTime seconds={1} />);
      const spanElement = screen.getByText(/1s/i);
      expect(spanElement).toBeInTheDocument();
    });

    it('should display second only span (59s)', async () => {
      render(<TotalTime seconds={59} />);
      const spanElement = screen.getByText(/59s/i);
      expect(spanElement).toBeInTheDocument();
    });
  });
  describe('1 minute or more tests', () => {
    it('should display mins and secs span (1m 0s)', async () => {
      render(<TotalTime seconds={60} />);
      const spanElement = screen.getByText(/1m 0s/i);
      expect(spanElement).toBeInTheDocument();
    });

    it('should display mins and secs span (1m 1s)', async () => {
      render(<TotalTime seconds={61} />);
      const spanElement = screen.getByText(/1m 1s/i);
      expect(spanElement).toBeInTheDocument();
    });

    it('should display mins and secs span (2m 0s)', async () => {
      render(<TotalTime seconds={120} />);
      const spanElement = screen.getByText(/2m 0s/i);
      expect(spanElement).toBeInTheDocument();
    });
  });
});
