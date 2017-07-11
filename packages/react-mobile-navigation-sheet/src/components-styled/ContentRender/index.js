import styled from 'styled-components';

export default styled.div.attrs({
  style: props => props.styleTranslate,
})`
  bottom: 0;
  box-sizing: border-box;
  position: absolute;
  transition: transform 300ms cubic-bezier(0.190, 1.000, 0.220, 1.000); 
  width: 100%;
  z-index: 2;
`;
