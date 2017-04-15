import { NO_SELECT_CSS } from 'binary-ui-styles/web';
import styled from 'styled-components';
import { LIST_ITEM_HEIGHT, BINARY_COLOR_SAND_80, BINARY_COLOR_SAND_90 } from 'binary-ui-styles';
import {
  FIELD_VALUE_FONT_CSS,
  FIELD_NAME_FONT_CSS,
  LIST_ITEM_CONTENTS_BASE_CSS,
} from '../utils/styles';

export default styled.div`
  ${NO_SELECT_CSS}
  ${props => (props.isBold ? FIELD_NAME_FONT_CSS : FIELD_VALUE_FONT_CSS)}
  ${LIST_ITEM_CONTENTS_BASE_CSS}
  cursor: default;
  height: ${LIST_ITEM_HEIGHT}px;
  line-height: ${LIST_ITEM_HEIGHT}px;
  vertical-align: middle;
  padding-left: 10px;
`;
