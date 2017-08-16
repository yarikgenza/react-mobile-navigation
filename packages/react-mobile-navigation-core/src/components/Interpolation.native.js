import isFunction from 'lodash/isFunction';
import React, { Component } from 'react';
import { Animated, Easing, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { MODAL_MARGIN } from '../utils/style-api';

const propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool.isRequired,
  hideOnBack: PropTypes.bool,
  hideOnBackdropPress: PropTypes.bool,
  pageHeight: PropTypes.number.isRequired,
  pageWidth: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  onPageOpenDone: PropTypes.func,
  onPageCloseDone: PropTypes.func,
  onBackButtonPress: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  isVisible: false,
  hideOnBack: true,
  hideOnBackdropPress: true,
  onClose: () => null,
  onBackButtonPress: () => null,
};

export class Interpolation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isShow: props.isVisible,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.closeOnBack = this.closeOnBack.bind(this);
    this.closeOnBackdrop = this.closeOnBackdrop.bind(this);
  }

  componentWillMount() {
    const { isVisible } = this.props;
    if (isVisible) {
      this.setState(() => ({ isVisible: true }));
    }
    this.visibility = new Animated.Value(isVisible ? 1 : 0);
  }

  componentDidMount() {
    const { isVisible } = this.state;
    if (isVisible) {
      this.open();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isVisible } = this.state;
    if (isVisible === false && nextProps.isVisible === true) {
      this.setState(() => ({
        isVisible: true,
      }));
    }
    Animated.timing(this.visibility, {
      duration: 500,
      easing: Easing.bezier(0.190, 1.000, 0.220, 1.000),
      toValue: nextProps.isVisible ? 1 : 0,
      // useNativeDriver: true,
    })
      .start(() => {
        this.setState(() => ({
          isVisible: nextProps.isVisible,
        }));
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isVisible && !prevState.isVisible) {
      this.open();
      return;
    }
    if (!this.props.isVisible && prevProps.isVisible) {
      this.close();
    }
  }

  open() {
    const { onPageOpenDone } = this.props;
    if (isFunction(onPageOpenDone)) {
      onPageOpenDone();
    }
  }

  close() {
    const { onPageCloseDone } = this.props;
    if (isFunction(onPageCloseDone)) {
      onPageCloseDone();
    }
  }

  closeOnBack() {
    const { hideOnBack, onBackButtonPress } = this.props;
    if (hideOnBack) {
      this.close();
    }
    onBackButtonPress();
  }

  closeOnBackdrop() {
    const { hideOnBackdropPress, onClose } = this.props;
    if (hideOnBackdropPress) {
      this.close();
    }
    onClose();
  }

  render() {
    const { children, pageHeight, pageWidth } = this.props;
    const { isVisible } = this.state;
    const pageHeightNew = pageHeight;
    const pageWidthNew = pageWidth - (2 * MODAL_MARGIN);
    return isVisible ? (
      <TouchableWithoutFeedback onPress={this.closeOnBackdrop}>
        <Animated.View
          removeClippedSubviews
          pointerEvents="box-none"
          style={[{
            overflow: 'hidden',
            flex: 1,
            justifyContent: 'flex-end',
            marginLeft: MODAL_MARGIN,
            marginRight: MODAL_MARGIN,
            margin: 0,
            transform: [{
              translateY: this.visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [pageHeightNew, 0],
              }),
            }],
            width: pageWidthNew,
            zIndex: 1000,
          }]}
        >
          {children ? React.cloneElement(
            React.Children.only(children),
            { pageHeight: pageHeightNew, pageWidth: pageWidthNew },
          ) : null}
        </Animated.View>
      </TouchableWithoutFeedback>
    ) : null;
  }
}

Interpolation.propTypes = propTypes;
Interpolation.defaultProps = defaultProps;

export default Interpolation;
