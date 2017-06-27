import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    zIndex: props.styleIndex,
    ...props.styleTranslate,
  }),
})`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
