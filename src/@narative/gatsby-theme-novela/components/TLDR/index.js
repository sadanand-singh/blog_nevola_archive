import React from 'react';

import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const TLDRStyle = styled.p`
  line-height: 1.756;
  font-size: 18px;
  font-family: ${p => p.theme.fonts.sansSerif};
  transition: ${p => p.theme.colorModeTransition};
  margin: 0 auto 35px;
  width: 100%;
  max-width: 680px;
  b {
    font-weight: 800;
  }
  ${mediaqueries.desktop`
    max-width: 507px;
  `}
  ${mediaqueries.tablet`
    max-width: 486px;
    margin: 0 auto 25px;
  `};
  ${mediaqueries.phablet`
    padding: 0 20px;
  `};
  color: ${p => p.theme.colors.grey};
  // border: 2px solid ${p => p.theme.colors.failure};
  background-color: #e7f3fe;
  border-left: 6px solid ${p => p.theme.colors.grey};
  padding: 20px;
`;

export default class TLDR extends React.Component {
  render() {
    return (
      <TLDRStyle>
        <strong>TL;DR</strong>
        <br />
        {this.props.msg}
      </TLDRStyle>
    );
  }
}
