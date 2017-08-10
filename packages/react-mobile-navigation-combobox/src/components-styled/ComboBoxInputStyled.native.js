import styled from 'styled-components/native';
import {
  LIST_ITEM_HEIGHT,
} from 'binary-ui-styles';
import {
  FIELD_VALUE_FONT_CSS,
  FIELD_NAME_FONT_CSS,
} from '../utils/styles.native';

export default styled.TextInput.attrs({
  numberOfLines: 1,
  onChangeText: (props) => (
    () => { props.onInputChange(); }
  ),
})`
  ${props => (props.isBold ? FIELD_NAME_FONT_CSS : FIELD_VALUE_FONT_CSS)}
  height: ${LIST_ITEM_HEIGHT}px;
  padding-left: 10px;
  overflow: hidden;
`;
