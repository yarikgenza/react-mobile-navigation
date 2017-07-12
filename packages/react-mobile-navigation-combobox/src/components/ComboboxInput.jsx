import React from 'react';
import ComboBoxInputStyled from '../components-styled/ComboboxInputStyled';

const propTypes = {
  textFilter: React.PropTypes.string,
  isBold: React.PropTypes.bool.isRequired,
  isValid: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  onFilterSet: React.PropTypes.func.isRequired,
  onFilterOnKeyUp: React.PropTypes.func,
};

const defaultProps = {
  isValid: true,
  textFilter: '',
  placeholder: '',
  onFilterOnKeyUp: undefined,
};

export default class ComboBoxInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  onBlur() {
    this.setState(() => ({ isActive: false }));
  }

  onFocus() {
    this.setState(() => ({ isActive: true }));
  }

  onInput(e) {
    const { onFilterSet } = this.props;
    onFilterSet(e.target.value);
  }

  render() {
    const { isBold, isValid, placeholder, textFilter, onFilterOnKeyUp } = this.props;
    const { isActive } = this.state;
    return (
      <ComboBoxInputStyled
        isActive={isActive}
        isBold={isBold}
        isValid={isValid}
        placeholder={placeholder}
        value={textFilter}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onInput={this.onInput}
        onKeyUp={onFilterOnKeyUp}
      />
    );
  }
}

ComboBoxInput.propTypes = propTypes;
ComboBoxInput.defaultProps = defaultProps;
