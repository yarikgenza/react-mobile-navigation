import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    left: props.pageLeft,
    width: props.pageWidth,
    ...props.styleTranslate,
  }),
})`
  bottom: 0;
  box-sizing: border-box;
  position: absolute;
  z-index: 2;
`;
