import React from 'react';
import {
  COMBOBOX_INPUT_ACTIVE_EXT_STYLE,
  COMBOBOX_INPUT_INVALID_EXT_STYLE,
} from '../utils/styles';

import ComboboxInputStyled from '../components-styled/ComboboxInputStyled';

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
    this.onSetActiveStatus = this.onSetActiveStatus.bind(this);
    this.onFilterOnInput = this.onFilterOnInput.bind(this);
  }

  onSetActiveStatus(isActive) {
    this.setState(() => ({ isActive }));
  }

  onFilterOnInput(e) {
    this.props.onSetFilter(e.target.value);
  }

  render() {
    const { isBold, isValid, placeholder, textFilter, onFilterOnKeyUp } = this.props;
    const { isActive } = this.state;
    return (
      <ComboboxInputStyled
        isBold={isBold}
        placeholder={placeholder}
        style={Object.assign(
          {},
          isActive ? COMBOBOX_INPUT_ACTIVE_EXT_STYLE : undefined,
          isValid ? undefined : COMBOBOX_INPUT_INVALID_EXT_STYLE
        )}
        value={textFilter}
        onBlur={() => { this.onSetActiveStatus(false); }}
        onFocus={() => { this.onSetActiveStatus(true); }}
        onInput={this.onFilterOnInput}
        onKeyUp={onFilterOnKeyUp}
      />
    );
  }
}

ComboboxInput.propTypes = propTypes;
ComboboxInput.defaultProps = defaultProps;
