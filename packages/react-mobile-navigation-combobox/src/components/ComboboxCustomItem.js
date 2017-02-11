import React from 'react';
import {
  COMBOBOX_INPUT_STYLE,
  COMBOBOX_INPUT_ACTIVE_EXT_STYLE,
  COMBOBOX_INPUT_INVALID_EXT_STYLE,
} from '../utils/styles';

const propTypes = {
  textFilter: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  isValid: React.PropTypes.bool,
  styleExt: React.PropTypes.object,
  onSetFilter: React.PropTypes.func,
  onFilterOnKeyUp: React.PropTypes.func,
};

const defaultProps = {
  textFilter: '',
  placeholder: 'Search Here',
};

export default class ComboboxCustomItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
    this.onSetActiveStatus = this.onSetActiveStatus.bind(this);
    this.onFilterOnInput = this.onFilterOnInput.bind(this);
  }

  onSetActiveStatus(isActive) {
    this.setState({ isActive });
  }

  onFilterOnInput(e) {
    this.props.onSetFilter(e.target.value);
  }

  render() {
    const { isValid, styleExt } = this.props;
    const { isActive } = this.state;
    const style = Object.assign(
      {},
      styleExt,
      COMBOBOX_INPUT_STYLE,
      isValid ? undefined : COMBOBOX_INPUT_INVALID_EXT_STYLE,
      isActive ? COMBOBOX_INPUT_ACTIVE_EXT_STYLE : undefined
    );
    return (
      <input
        placeholder={this.props.placeholder}
        style={style}
        value={this.props.textFilter}
        onBlur={() => { this.onSetActiveStatus(false); }}
        onFocus={() => { this.onSetActiveStatus(true); }}
        onInput={this.onFilterOnInput}
        onKeyUp={this.props.onFilterOnKeyUp}
      />
    );
  }
}

ComboboxCustomItem.propTypes = propTypes;
ComboboxCustomItem.defaultProps = defaultProps;
