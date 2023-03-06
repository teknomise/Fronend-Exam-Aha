import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders the logo', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('renders the home and tags links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const tagsLink = screen.getByRole('link', { name: /tags/i });
    expect(tagsLink).toBeInTheDocument();
  });
  

  it('hides the navigation links on certain pages', () => {
    render(
      <MemoryRouter initialEntries={['/search']}>
        <Navbar />
      </MemoryRouter>
    );
  
    expect(screen.queryByText('Home')).not.toBeInTheDocument();
    expect(screen.queryByText('Tags')).not.toBeInTheDocument();
  });
  
  
  
});
