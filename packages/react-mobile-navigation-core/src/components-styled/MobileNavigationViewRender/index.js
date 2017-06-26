import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    zIndex: props.styleIndex,
    ...props.styleTranslate,
  }),
})`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 0;
`;
