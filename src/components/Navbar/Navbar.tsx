/**
  The Navbar component renders a navigation bar with a logo and two links: "Home" and "Tags".
  It uses the NavLinkWithIcon component to render the links with icons.
  It also hides the logo and navigation links on certain pages.
  It has the following functions and state:
  useState:
  width: a state variable that holds the width of the window.
  useLocation:
  location: a variable that holds the current location of the app.
  useEffect:
  A function that is called when the component mounts to add a window resize event listener.
  A function that is called when the component unmounts to remove the window resize event listener.
  It renders the following elements:
  A div with the class 'sidebar' that contains the logo and navigation links.
  A div with the classes 'd-flex', 'flex-sm-column', 'flex-row', 'flex-nowrap', and 'align-items-center' that
  contains the logo and navigation links.
  An anchor tag with the logo image.
  An unordered list with the classes 'nav', 'nav-pills', 'nav-flush', 'flex-sm-column', 'flex-row', 'flex-nowrap',
  'mb-auto', 'mx-auto', 'text-center', and 'align-items-center' that contains the navigation links.
  Two NavLinkWithIcon components for the "Home" and "Tags" links.
  A div with the class 'mobile-nav' that contains the NavLinkWithIcon components for the "Home" and "Tags" links.
  @returns a JSX element with the navigation bar.
*/
import Logo from '../../assets/images/logo.svg';
import { NavLink, useLocation } from 'react-router-dom';
import ActiveIcon from '../../assets/images/icon-active.svg';
import InactiveIcon from '../../assets/images/icon-inactive.svg';
import TagsIcon from '../../assets/images/icon-tags.svg';
import { useState, useEffect } from 'react';
import './Navbar.css'

/**
 * The NavLinkWithIcon component represents a navigation link with an icon.
 * @param {string} to - The URL of the link.
 * @param {string} label - The label of the link.
 * @param {string} iconActive - The path to the active icon.
 * @param {string} iconInactive - The path to the inactive icon.
*/
interface INavLinkProps {
  to: string;
  label?: string;
  iconActive: string;
  iconInactive: string;
}

/**
 * The NavLinkWithIcon component represents a navigation link with an icon.
 * @param {string} to - The URL of the link.
 * @param {string} label - The label of the link.
 * @param {string} iconActive - The path to the active icon.
 * @param {string} iconInactive - The path to the inactive icon.
*/
const NavLinkWithIcon = ({to, label, iconActive, iconInactive}: INavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to || (location.pathname === '/search' && to === '/');
  const icon = isActive ? iconActive : iconInactive;
  const linkLabel = !['/search', '/tags'].includes(location.pathname) && isActive ? label : undefined;
  const isTags = location.pathname === '/tags';

  if (to === '/search') {
    return null; 
  }

  return (
    <li className={isTags && label === 'Tags' ? `nav-item add-top` : `nav-item`}>
      <NavLink to={to} className="py-2 px-2 nav-link">
        <img src={icon} alt={label} />
        {linkLabel && <span>{linkLabel}</span>}
      </NavLink>
    </li>
  );
}


export default function Navbar () {
  const [width, setWidth] = useState(window.innerWidth);
  const location = useLocation();
  const isHide = location.pathname === '/search' || location.pathname === '/tags';

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const showNav = width >= 600;

  return (
    <div className="col-md-auto sidebar sticky-top">
      <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top">
        {isHide 
          ? (
            <a href="/" className="d-none d-md-block d-lg-block link-dark text-decoration-none logo-wrapper">
                <img src={Logo} alt="Logo" className='logo' data-testid="logo"/>
              </a>
          ) 
          : ( 
              <a href="/" className="d-block link-dark text-decoration-none logo-wrapper">
                <img src={Logo} alt="Logo" className='logo' data-testid="logo"/>
              </a>
          )
        }
       
        {showNav && (
          <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center pt-3">
            <NavLinkWithIcon to="/" label="Home" iconActive={ActiveIcon} iconInactive={InactiveIcon} />
            <NavLinkWithIcon to="/tags" label="Tags" iconActive={ActiveIcon} iconInactive={TagsIcon} />
          </ul>
        )}
        {!showNav && !isHide && (
          <div className="mobile-nav">
            <NavLinkWithIcon to="/" label="" iconActive={ActiveIcon} iconInactive={InactiveIcon} />
            <NavLinkWithIcon to="/tags" label="" iconActive={ActiveIcon} iconInactive={TagsIcon} />
          </div>
        )}
      </div>
    </div>
  );
}