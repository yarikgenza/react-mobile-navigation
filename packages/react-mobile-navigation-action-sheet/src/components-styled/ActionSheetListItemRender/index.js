import { BINARY_COLOR_RED_40, BINARY_COLOR_SAND_90 } from 'binary-ui-styles';
import { NO_SELECT_CSS } from 'binary-ui-styles';
import styled from 'styled-components';

export default styled.div`
  ${NO_SELECT_CSS}
  border-bottom: 1px solid ${BINARY_COLOR_SAND_90};
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  cursor: default;
  &:active {
    background-color: ${BINARY_COLOR_SAND_90};
  }
  ${props => (props.isRed ? `color: ${BINARY_COLOR_RED_40}; font-weight: 400;` : undefined)}
`;
