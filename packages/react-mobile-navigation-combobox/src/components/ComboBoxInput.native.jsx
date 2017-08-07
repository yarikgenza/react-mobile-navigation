import PropTypes from 'prop-types';
import React from 'react';
import Input from 'binary-ui-components/mobile/Input';

const propTypes = {
  borderColor: PropTypes.string,
  textFilter: PropTypes.string,
  isBold: PropTypes.bool.isRequired,
  isValid: PropTypes.bool,
  placeholder: PropTypes.string,
  onFilterSet: PropTypes.func.isRequired,
  onFilterOnKeyUp: PropTypes.func,
};

const defaultProps = {
  borderColor: undefined,
  isValid: true,
  placeholder: '',
  textFilter: '',
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
    this.onInputChange = this.onInputChange.bind(this);
  }

  onBlur() {
    this.setState(() => ({ isActive: false }));
  }

  onFocus() {
    this.setState(() => ({ isActive: true }));
  }

  onInputChange(value) {
    const { onFilterSet } = this.props;
    onFilterSet(value);
  }

  render() {
    const { isBold, isValid, placeholder, textFilter, onFilterOnKeyUp } = this.props;
    const { isActive } = this.state;
    return (
      <Input
        isActive={isActive}
        isBold={isBold}
        isValid={isValid}
        placeholder={isBold ? placeholder.toUpperCase() : placeholder}
        value={isBold ? textFilter.toUpperCase() : textFilter}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onInputChange={this.onInputChange}
        onKeyUp={onFilterOnKeyUp}
      />
    );
  }
}

ComboBoxInput.propTypes = propTypes;
ComboBoxInput.defaultProps = defaultProps;
