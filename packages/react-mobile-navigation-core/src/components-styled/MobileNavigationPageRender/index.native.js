import { BASE_CONTAINER_CSS } from '../../utils/styles';
import styled from 'styled-components/native';

export default styled.View.attrs({
  style: props => ({
    zIndex: props.zIndex,
  }),
})`
  ${BASE_CONTAINER_CSS}
`;
