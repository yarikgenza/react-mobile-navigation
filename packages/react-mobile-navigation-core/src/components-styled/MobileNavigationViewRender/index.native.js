import styled from 'styled-components/native';

export default styled.View.attrs({
  style: props => ({
    zIndex: props.zIndex,
  }),
})`
  position: absolute;
`;
