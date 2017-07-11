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
  transition: transform 300ms cubic-bezier(0.190, 1.000, 0.220, 1.000);
  width: 100%;
`;
