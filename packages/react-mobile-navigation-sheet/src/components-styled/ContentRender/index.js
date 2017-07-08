import styled from 'styled-components';

export default styled.div.attrs({
  style: props => props.styleTranslate,
})`
  bottom: 0;
  box-sizing: border-box;
  position: absolute;
  transition: transform 0.2s ease-in-out;
  width: 100%;
  z-index: 2;
`;
