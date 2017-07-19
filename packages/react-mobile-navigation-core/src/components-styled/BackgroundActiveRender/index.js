import styled from 'styled-components';
import { TRANSFORM_CURVE } from '../../utils/style-api';

export default styled.div.attrs({
  style: props => ({
    backdropFilter: props.styleBackdropFilter,
    opacity: props.styleOpacity,
    transition: props.isForce
      ? undefined
      : `opacity 0.5s ${TRANSFORM_CURVE}, backdrop-filter 0.5s ${TRANSFORM_CURVE}`,
  }),
})`
  background-color: #000000;
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;
