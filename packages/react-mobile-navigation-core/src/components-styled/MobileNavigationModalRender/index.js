import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    height: props.pageHeight,
    width: props.pageWidth,
  }),
})`
  margin: 0 auto;
`;
