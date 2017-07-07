import styled from 'styled-components';

export default styled.div.attrs({
  style: props => props.styleTranslate,
})`
  bottom: 0;
  box-sizing: border-box;
  position: absolute;
  transition: all 0.25s;
  width: 100%;
  z-index: 2;
`;
