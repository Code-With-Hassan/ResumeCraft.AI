import { render, screen } from '@testing-library/react';
import AboutPage from './page';

describe('About Page', () => {
  it('renders the main heading', () => {
    render(<AboutPage />);
    const heading = screen.getByRole('heading', {
      name: /About ResumeCraft AI/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the mission card', () => {
    render(<AboutPage />);
    const missionTitle = screen.getByRole('heading', { name: /Our Mission/i });
    const missionText = screen.getByText(
      /To empower job seekers with intelligent, intuitive, and innovative tools/i
    );
    expect(missionTitle).toBeInTheDocument();
    expect(missionText).toBeInTheDocument();
  });

  it('renders the team card', () => {
    render(<AboutPage />);
    const teamTitle = screen.getByRole('heading', { name: /Our Team/i });
    const teamText = screen.getByText(
      /A diverse group of AI researchers, developers, and career coaches/i
    );
    expect(teamTitle).toBeInTheDocument();
    expect(teamText).toBeInTheDocument();
  });

  it('renders the technology card', () => {
    render(<AboutPage />);
    const technologyTitle = screen.getByRole('heading', { name: /Our Technology/i });
    const technologyText = screen.getByText(
      /Leveraging state-of-the-art language models and machine learning algorithms/i
    );
    expect(technologyTitle).toBeInTheDocument();
    expect(technologyText).toBeInTheDocument();
  });
});
