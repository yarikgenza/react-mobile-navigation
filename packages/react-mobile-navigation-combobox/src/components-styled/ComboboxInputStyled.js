import {
  BINARY_COLOR_SAND_90,
  BINARY_COLOR_RED_40,
  BINARY_COLOR_BLUE_40,
  LIST_ITEM_HEIGHT,
} from 'binary-ui-styles';
import styled from 'styled-components';
import {
  FIELD_VALUE_FONT_CSS,
  FIELD_NAME_FONT_CSS,
  LIST_ITEM_CONTENTS_BASE_CSS,
} from '../utils/styles';

export default styled.input.attrs({
  style: props => {
    if (!props.isValid) {
      return { borderBottom: `1px solid ${BINARY_COLOR_RED_40}` };
    }
    if (props.isActive) {
      return { borderBottom: `1px solid ${BINARY_COLOR_BLUE_40}` };
    }
    return { borderBottom: `1px solid ${BINARY_COLOR_SAND_90}` };
  },
  onChange: (props) => (
    (e) => { props.onInputChange(e.target.value); }
  ),
})`
  ${props => (props.isBold ? FIELD_NAME_FONT_CSS : FIELD_VALUE_FONT_CSS)}
  ${LIST_ITEM_CONTENTS_BASE_CSS}
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
