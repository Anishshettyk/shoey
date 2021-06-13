import React from 'react';
import women from '../../images/icons/woman.svg';
import men from '../../images/icons//men.svg';
import kids from '../../images/icons/kids.svg';
// import { GrCart } from 'react-icons/gr';
import { AiOutlineHome } from 'react-icons/ai';
import { BsPerson, BsSearch, BsFillPersonFill } from 'react-icons/bs';
import { BiPhone, BiRightArrow, BiArrowBack } from 'react-icons/bi';
import { CgSize } from 'react-icons/cg';
import {
  FiFacebook,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiCodepen,
  FiShoppingCart,
  FiUserCheck,
  FiUserPlus,
  FiEye,
  FiHeart,
} from 'react-icons/fi';
import { SiReact, SiRedux, SiFirebase, SiMaterialUi } from 'react-icons/si';
import { RiExternalLinkLine } from 'react-icons/ri';
import { GrGallery } from 'react-icons/gr';
import { MdDescription } from 'react-icons/md';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
    case 'Sign out':
      return <ExitToAppIcon />;
    case 'Sign in':
      return <FiUserCheck />;
    case 'Sign up':
      return <FiUserPlus />;
    case 'React':
      return <SiReact />;
    case 'Redux':
      return <SiRedux />;
    case 'Firebase':
      return <SiFirebase />;
    case 'Material UI':
      return <SiMaterialUi />;
    case 'External link':
      return <RiExternalLinkLine />;
    case 'right triangle':
      return <BiRightArrow />;
    case 'eye':
      return <FiEye />;
    case 'gallery':
      return <GrGallery />;
    case 'description':
      return <MdDescription />;
    case 'heart':
      return <FiHeart />;
    case 'arrowBack':
      return <BiArrowBack />;
    case 'size':
      return <CgSize />;
    default:
      return <p>please enter a valid name</p>;
  }
};

export default Icon;
