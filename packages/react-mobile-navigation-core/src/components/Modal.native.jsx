import React, { Component } from 'react';
import { Animated, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
import { MODAL_MARGIN } from '../utils/style-api';

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0,
    backgroundColor: 'black',
  },
});

const propTypes = {
  children: PropTypes.node.isRequired,
  isVisible: PropTypes.bool.isRequired,
  hideOnBack: PropTypes.bool,
  hideOnBackdropPress: PropTypes.bool,
  pageHeight: PropTypes.number.isRequired,
  pageWidth: PropTypes.number.isRequired,
  onClose: PropTypes.func,
  onBackButtonPress: PropTypes.func,
  onModalShow: PropTypes.func,
  onModalHide: PropTypes.func,
};

const defaultProps = {
  isVisible: false,
  hideOnBack: true,
  hideOnBackdropPress: true,
  onClose: () => null,
  onBackButtonPress: () => null,
  onModalShow: () => null,
  onModalHide: () => null,
};

const OPACITY_ON = 0.2;

export class ReactNativeModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisible: props.isVisible,
    };
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
    this._closeOnBack = this._closeOnBack.bind(this);
    this._closeOnBackdrop = this._closeOnBackdrop.bind(this);
  }

  componentWillMount() {
    if (this.props.isVisible) {
      this.setState({ isVisible: true });
    }
    this._visibility = new Animated.Value(this.props.isVisible ? 1 : 0);
  }

  componentDidMount() {
    if (this.state.isVisible) {
      this._open();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.isVisible && nextProps.isVisible) {
      this.setState({ isVisible: true });
    }
    Animated.timing(this._visibility, {
      toValue: nextProps.isVisible ? 1 : 0,
      duration: 300,
    }).start(() => {
      this.setState({ isVisible: nextProps.isVisible });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    // On modal open request, we slide the view up and fade in the backdrop
    if (this.state.isVisible && !prevState.isVisible) {
      this._open();
      // On modal close request, we slide the view down and fade out the backdrop
    } else if (!this.props.isVisible && prevProps.isVisible) {
      this._close();
    }
  }

  _open() {
    /* this.backdropRef.transitionTo(
      { opacity: this.props.backdropOpacity },
      this.props.backdropTransitionInTiming,
    );
    this.contentRef[this.props.animationIn](this.props.animationInTiming).then(() => {
      this.props.onModalShow();
    }); */
  }

  _close() {
    /* this.backdropRef.transitionTo({ opacity: 0 }, this.props.backdropTransitionOutTiming);
    this.contentRef[this.props.animationOut](this.props.animationOutTiming).then(() => {
      this.setState({ isVisible: false });
      this.props.onModalHide();
    }); */
  }

  _closeOnBack() {
    if (this.props.hideOnBack) {
      this._close();
    }
    this.props.onBackButtonPress();
  }

  _closeOnBackdrop() {
    if (this.props.hideOnBackdropPress) {
      this._close();
    }
    this.props.onClose();
  }

  render() {
    const {
      children,
      pageHeight,
      pageWidth,
      onModalShow,
      onModalHide,
    } = this.props;
    const { isVisible } = this.state;
    const pageHeightNew = pageHeight - MODAL_MARGIN;
    const pageWidthNew = pageWidth - (2 * MODAL_MARGIN);
    return (
      <Modal
        transparent
        animationType={'none'}
        visible={isVisible}
        onRequestClose={this._closeOnBack}
      >
        <TouchableWithoutFeedback onPress={this._closeOnBackdrop}>
          <Animated.View
            style={[
              styles.backdrop, {
                backgroundColor: '#000000',
                width: pageWidth,
                height: pageHeight,
                opacity: this._visibility.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, OPACITY_ON],
                }),
              },
            ]}
          />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[{
            // borderTopLeftRadius: 10,
            // borderTopRightRadius: 10,
            flex: 1,
            // justifyContent: 'center',
            justifyContent: 'flex-end',
            marginLeft: MODAL_MARGIN,
            marginRight: MODAL_MARGIN,
            margin: 0,
            transform: [{
              translateY: this._visibility.interpolate({
                inputRange: [0, 1],
                outputRange: [pageHeightNew, 0],
              }),
            }],
            width: pageWidthNew,
          }]}
          pointerEvents="box-none"
        >
          {React.cloneElement(
            React.Children.only(children),
            { pageHeight: pageHeightNew, pageWidth: pageWidthNew },
          )}
        </Animated.View>
      </Modal>
    );
  }
}

ReactNativeModal.propTypes = propTypes;
ReactNativeModal.defaultProps = defaultProps;

export default ReactNativeModal;
