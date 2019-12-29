import styled from '@emotion/styled';
import mediaqueries from '@styles/media';

const Blockquote = styled.blockquote`
  transition: ${p => p.theme.colorModeTransition};
  margin: 15px auto 15px;
  color: ${p => p.theme.colors.articleText};
  border: 2px solid ${p => p.theme.colors.grey};
  border-radius: 4px;
  padding: 1rem;

  ${mediaqueries.tablet`
    margin: 10px auto 35px;
  `};

  & > p {
    line-height: 1.756;
    font-size: 18px;
    font-style: italic;
    font-family: italic ${p => p.theme.fonts.sansSerif};
    transition: ${p => p.theme.colorModeTransition};
    margin: 0 auto 5px;
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
  }
`;

export default Blockquote;
