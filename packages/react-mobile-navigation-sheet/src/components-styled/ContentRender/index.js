import styled from 'styled-components';

export default styled.div.attrs({
  style: props => props.styleTranslate,
})`
  position: absolute;
  bottom: 0;
  box-sizing: border-box;
  width: 100%;
  z-index: 2;
`;
