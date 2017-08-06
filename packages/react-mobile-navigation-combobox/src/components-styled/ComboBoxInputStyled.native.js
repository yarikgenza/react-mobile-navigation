import styled from 'styled-components/native';

export default styled.TextInput.attrs({
  onChangeText: (props) => (
    () => { props.onInputChange(); }
  ),
})``;
