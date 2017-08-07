import styled from 'styled-components/native';
import {
  FIELD_VALUE_FONT_CSS,
  FIELD_NAME_FONT_CSS,
} from '../utils/styles';

export default styled.Text`
  ${props => (props.isBold ? FIELD_NAME_FONT_CSS : FIELD_VALUE_FONT_CSS)}
`;
