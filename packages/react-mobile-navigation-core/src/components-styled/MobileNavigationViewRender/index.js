import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    zIndex: props.styleIndex,
    ...props.styleTranslate,
  }),
})`
  bottom: 0;
  height: auto;
  position: absolute;
  width: 100%;
  transition: transform 0.25s;
`;
