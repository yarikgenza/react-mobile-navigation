import styled from 'styled-components/native';
import { FONT_FAMILY_MAIN, BINARY_COLOR_RED_40 } from 'binary-ui-styles';

export default styled.Text`
  font-family: ${FONT_FAMILY_MAIN};
  font-size: 18px;
  font-weight: 200;
  ${props => (props.isRed ? `color: ${BINARY_COLOR_RED_40}; font-weight: 400;` : undefined)}
`;
