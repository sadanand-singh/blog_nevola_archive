import React from 'react';

import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const UPDATEStyle = styled.p`
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
  color: ${p => p.theme.colors.primary};
  border: 2px solid ${p => p.theme.colors.failure};
  padding: 20px;
  background-color: #5dade2;
`;

export default class UPDATE extends React.Component {
  render() {
    return (
      <UPDATEStyle>
        <strong>Update:</strong>
        <br />
        {this.props.msg}
      </UPDATEStyle>
    );
  }
}
