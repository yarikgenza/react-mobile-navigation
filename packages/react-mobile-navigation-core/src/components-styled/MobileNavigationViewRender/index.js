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
  transition: transform 0.2s ease-in-out;
  width: 100%;
`;
