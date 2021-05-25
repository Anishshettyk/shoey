import React from 'react';
import styled from 'styled-components';
import { techStack } from '../utils';
import { Icon } from '.';
import { Tooltip } from '@material-ui/core';
import { theme } from '../styles';

const { colors } = theme;
const FooterContainer = styled.footer`
  text-align: center;
  border-top: 3px dashed ${colors.grey2};
  padding-top: 10px;
  .footer__maker {
    font-weight: 600;
    a {
      padding: 3px 7px;
      background-color: ${colors.blue};
      color: ${colors.white};
      border-radius: 30px;
    }
  }
  .footer__tech__stack {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -10px;
    a {
      margin-right: 5px;
      color: ${colors.darkBlue};
      font-size: 1.5rem;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p className="footer__maker">
        Built by{' '}
        <a href="https://anishshettyk.com" target="_blank" rel="noopener noreferrer">
          Anish shetty k
          <Icon name="External link" />
        </a>{' '}
        using..
      </p>
      <div className="footer__tech__stack">
        {techStack.map((tech, i) => (
          <Tooltip title={tech.name} aria-label="tech used links" key={i}>
            <a href={tech.link} target="_blank" rel="noopener noreferrer">
              <Icon name={tech.name} />
            </a>
          </Tooltip>
        ))}
        <p>and much more</p>
      </div>
    </FooterContainer>
  );
};

export default Footer;
