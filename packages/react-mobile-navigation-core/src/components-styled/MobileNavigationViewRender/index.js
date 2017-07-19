import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    left: props.pageLeft,
    width: props.pageWidth,
    zIndex: props.styleIndex,
    ...props.styleTranslate,
  }),
})`
  bottom: 0;
  position: absolute;
`;
