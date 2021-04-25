import React from 'react';
import women from '../../images/icons/woman.svg';
import men from '../../images/icons//men.svg';
import kids from '../../images/icons/kids.svg';
import { GrCart } from 'react-icons/gr';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs';
import { BiPhone } from 'react-icons/bi';

const Icon = ({ name }) => {
  switch (name) {
    case 'Men':
      return <img src={men} alt="men icon" />;
    case 'Women':
      return <img src={women} alt="women icon" />;
    case 'Kids':
      return <img src={kids} alt="kids icon" />;
    case 'Cart':
      return <GrCart />;
    case 'Home':
      return <AiOutlineHome />;
    case 'About Us':
      return <BsPerson />;
    case 'Contact':
      return <BiPhone />;
    default:
      return <p>please enter a valid name</p>;
  }
};

export default Icon;
