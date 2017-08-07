import styled from 'styled-components/native';
import { LIST_ITEM_HEIGHT } from 'binary-ui-styles';
import {
  FIELD_VALUE_FONT_CSS,
  FIELD_NAME_FONT_CSS,
} from '../utils/styles';

const halfHeight = LIST_ITEM_HEIGHT / 3;

export default styled.Text`
  ${props => (props.isBold ? FIELD_NAME_FONT_CSS : FIELD_VALUE_FONT_CSS)}
  padding-top: ${halfHeight};
  padding-left: 10px;
`;
