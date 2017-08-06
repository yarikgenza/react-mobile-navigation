import { FONT_FAMILY_MAIN } from 'binary-ui-styles';
import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    zIndex: props.styleIndex,
  }),
})`
  font-family: ${FONT_FAMILY_MAIN};
  font-size: 18px;
  font-weight: 200;
  background-color: #ffffff;
  border-radius: 0;
  box-sizing: border-box;
  line-height: 50px;
  overflow: hidden;
  vertical-align: middle;
  width: 100%;
  cursor: default;
`;
