import React, { Component } from 'react';
import { Animated, Easing, Modal, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { MODAL_MARGIN } from '../utils/style-api';

const OPACITY_ON = 0.2;

const propTypes = {
  children: PropTypes.node,
  isVisible: PropTypes.bool.isRequired,
  hideOnBack: PropTypes.bool,
  hideOnBackdropPress: PropTypes.bool,
  pageHeight: PropTypes.number.isRequired,
  pageWidth: PropTypes.number.isRequired,
  onClose: PropTypes.func,
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

export class ReactNativeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
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
      this.openModal();
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
      this.openModal();
      return;
    }
    if (!this.props.isVisible && prevProps.isVisible) {
      this.closeModal();
    }
  }

  openModal() { }

  closeModal() { }

  closeOnBack() {
    const { hideOnBack, onBackButtonPress } = this.props;
    if (hideOnBack) {
      this.closeModal();
    }
    onBackButtonPress();
  }

  closeOnBackdrop() {
    const { hideOnBackdropPress, onClose } = this.props;
    if (hideOnBackdropPress) {
      this.closeModal();
    }
    onClose();
  }

  render() {
    const { children, pageHeight, pageWidth } = this.props;
    const { isVisible } = this.state;
    const pageHeightNew = pageHeight - MODAL_MARGIN;
    const pageWidthNew = pageWidth - (2 * MODAL_MARGIN);
    return (
      <Modal
        transparent
        animationType="none"
        visible={isVisible}
        onRequestClose={this.closeOnBack}
      >
        <TouchableWithoutFeedback onPress={this.closeOnBackdrop}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: '#000000',
              width: pageWidth,
              height: pageHeight,
              opacity: this.visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [0, OPACITY_ON],
              }),
            }}
          />
        </TouchableWithoutFeedback>
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
      </Modal>
    );
  }
}

ReactNativeModal.propTypes = propTypes;
ReactNativeModal.defaultProps = defaultProps;

export default ReactNativeModal;
