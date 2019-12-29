import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import mediaqueries from '@styles/media';
import CodeStatsLogo from '../Logo/CodeStats';

const Hidden = styled.span`
  position: absolute;
  display: inline-block;
  opacity: 0;
  width: 0px;
  height: 0px;
  visibility: hidden;
  overflow: hidden;
`;

const BackArrowIconContainer = styled.div`
  transition: 0.2s transform var(--ease-out-quad);
  opacity: 0;
  padding-right: 30px;
  animation: fadein 0.3s linear forwards;

  @keyframes fadein {
    to {
      opacity: 1;
    }
  }

  ${mediaqueries.desktop_medium`
    display: none;
  `}
`;

const LogoLink = styled(Link)<{ back: string }>`
  position: relative;
  display: flex;
  align-items: center;
  left: ${p => (p.back === 'true' ? '-54px' : 0)};

  ${mediaqueries.desktop_medium`
    left: 0
  `}

  &[data-a11y="true"]:focus::after {
    content: '';
    position: absolute;
    left: -10%;
    top: -30%;
    width: 120%;
    height: 160%;
    border: 2px solid ${p => p.theme.colors.accent};
    background: rgba(255, 255, 255, 0.01);
    border-radius: 5px;
  }

  &:hover {
    opacity: 1;
    fill: ${p => p.theme.colors.articleText};
    stroke: ${p => p.theme.colors.articleText};
    ${BackArrowIconContainer} {
      transform: translateX(-3px);
    }
  }
`;

const CodeStatsLink: React.FC<{}> = () => {
  return (
    <LogoLink
      to={'/code-stats'}
      data-a11y='false'
      title='Code:Stats for Sadanand'
      aria-label='Code:Stats for Sadanand'
      back={'false'}
    >
      <CodeStatsLogo />
      <Hidden>Code:Stats for Sadanand</Hidden>
    </LogoLink>
  );
};

export default CodeStatsLink;
