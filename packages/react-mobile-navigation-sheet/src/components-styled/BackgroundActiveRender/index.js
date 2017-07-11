import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    opacity: props.styleOpacity,
  }),
})`
  background-color: #000000;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  transition: opacity 0.5s cubic-bezier(0.190, 1.000, 0.220, 1.000);
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;
