import React from 'react';
import women from '../../images/icons/woman.svg';
import men from '../../images/icons//men.svg';
import kids from '../../images/icons/kids.svg';
// import { GrCart } from 'react-icons/gr';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson, BsSearch, BsFillPersonFill } from 'react-icons/bs';
import { BiPhone } from 'react-icons/bi';
import { FiFacebook, FiLinkedin, FiGithub, FiTwitter, FiCodepen, FiShoppingCart } from 'react-icons/fi';

const Icon = ({ name }) => {
  switch (name) {
    case 'Men':
      return <img src={men} alt="men icon" />;
    case 'Women':
      return <img src={women} alt="women icon" />;
    case 'Kids':
      return <img src={kids} alt="kids icon" />;
    case 'Cart':
      return <FiShoppingCart />;
    case 'Home':
      return <AiOutlineHome />;
    case 'About Us':
      return <BsPerson />;
    case 'Contact':
      return <BiPhone />;
    case 'Facebook':
      return <FiFacebook />;
    case 'Github':
      return <FiGithub />;
    case 'Codepen':
      return <FiCodepen />;
    case 'Linked in':
      return <FiLinkedin />;
    case 'Twitter':
      return <FiTwitter />;
    case 'Search':
      return <BsSearch />;
    case 'User':
      return <BsFillPersonFill />;
    default:
      return <p>please enter a valid name</p>;
  }
};

export default Icon;
