import { FONT_FAMILY_MAIN } from 'binary-ui-styles/web';
import styled from 'styled-components';

// NOTE: set zIndex 1000 to be on a top of everything
export default styled.div`
  font-family: ${FONT_FAMILY_MAIN};
  font-size: 18px;
  font-weight: 200;
  background-color: #ffffff;
  border-radius: 0;
  box-sizing: border-box;
  line-height: 50px;
  overflow: hidden;
  margin: 0 auto;
  vertical-align: middle;
  width: 100%;
  zIndex: 1000;
  cursor: default;
`;
