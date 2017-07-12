import React from 'react';
import ComboBoxInputStyled from '../components-styled/ComboboxInputStyled';

const propTypes = {
  textFilter: React.PropTypes.string,
  isBold: React.PropTypes.bool.isRequired,
  isValid: React.PropTypes.bool,
  placeholder: React.PropTypes.string,
  onSetFilter: React.PropTypes.func.isRequired,
  onFilterOnKeyUp: React.PropTypes.func,
};

const defaultProps = {
  isValid: true,
  textFilter: '',
  placeholder: '',
  onFilterOnKeyUp: undefined,
};

export default class ComboboxInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onFilterOnInput = this.onFilterOnInput.bind(this);
  }

  onFilterOnInput(e) {
    const { onSetFilter } = this.props;
    onSetFilter(e.target.value);
  }

  onBlur() {
    this.setState(() => ({ isActive: false }));
  }

  onFocus() {
    this.setState(() => ({ isActive: true }));
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
        onInput={this.onFilterOnInput}
        onKeyUp={onFilterOnKeyUp}
      />
    );
  }
}

ComboboxInput.propTypes = propTypes;
ComboboxInput.defaultProps = defaultProps;
