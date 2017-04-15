import styled from 'styled-components';
import { LIST_ITEM_HEIGHT, BINARY_COLOR_SAND_90 } from 'binary-ui-styles';
import {
  FIELD_VALUE_FONT_CSS,
  FIELD_NAME_FONT_CSS,
  LIST_ITEM_CONTENTS_BASE_CSS,
} from '../utils/styles';

export default styled.input`
  ${props => (props.isBold ? FIELD_NAME_FONT_CSS : FIELD_VALUE_FONT_CSS)}
  ${LIST_ITEM_CONTENTS_BASE_CSS}
  border-bottom: 1px solid ${BINARY_COLOR_SAND_90};
  border-left: none;
  border-right: none;
  border-top: none;
  box-sizing: border-box;
  cursor: text;
  height: ${LIST_ITEM_HEIGHT}px;
  line-height: ${LIST_ITEM_HEIGHT}px;
  outline: none;
  padding-left: 10px;
  vertical-align: middle;
  width: 100%;
`;
