import { BINARY_COLOR_SAND_90, LIST_ITEM_HEIGHT } from 'binary-ui-styles';
import styled from 'styled-components/native';

export default styled.View`
  border-bottom-width: 1;
  border-bottom-color: ${BINARY_COLOR_SAND_90};
  height: ${LIST_ITEM_HEIGHT}px;
  justify-content: center;
  padding-left: 10px;
  overflow: hidden;
`;
