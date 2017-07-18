import styled from 'styled-components';

export default styled.div.attrs({
  style: props => ({
    height: props.pageHeight,
    width: props.pageWidth,
  }),
})`
  margin: 0 auto;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
