import React from 'react';
import { Icon } from '../index';
import styled from 'styled-components';
import { theme, mixins, media } from '../../styles';
import { Link } from 'react-router-dom';
import { socials, links } from '../../utils';
import { Tooltip } from '@material-ui/core';

const { colors, transitionTime } = theme;

const StyledTopBanner = styled.div`
  border-bottom: 0.5px solid ${colors.grey3};
  padding: 5px 0px;
  ${mixins.spaceAround}
  .topBanner__links {
    a {
      margin: 0px 10px;
      font-size: 15px;
      color: ${colors.textColor};
      font-weight: 500;
      transition: ${transitionTime.t4};
      &:hover {
        color: ${colors.grey2};
      }
    }
  }
  .topBanner__socials {
    svg {
      margin: 0px 7px;
      color: ${({ color }) => color};

      transition: ${transitionTime.t4};
      &:hover {
        color: ${colors.textColor};
        transform: rotateY(-45deg);
      }
    }
  }
  ${media.phone`
  display:none;
  `}
`;

const TopNavbar = () => {
  return (
    <StyledTopBanner>
      <div className="topBanner__links">
        {links.map((link, i) => (
          <Link to={link.link} key={i}>
            {link.name}
          </Link>
        ))}
      </div>
      <div className="topBanner__socials">
        {socials.map((social, i) => (
          <Tooltip title={social.name} aria-label="social links" key={i}>
            <Link to={social.link} style={{ color: social.color }}>
              <Icon name={social.name} />
            </Link>
          </Tooltip>
        ))}
      </div>
    </StyledTopBanner>
  );
};

export default TopNavbar;
