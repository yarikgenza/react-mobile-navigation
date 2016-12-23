import { CARDS_GREY_COLOR } from 'binary-ui-styles';
import { NO_SELECT_CSS } from 'binary-ui-styles/web';
import styled from 'styled-components';

export default styled.div`
  ${NO_SELECT_CSS}
  border-bottom: 1px solid ${CARDS_GREY_COLOR};
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
