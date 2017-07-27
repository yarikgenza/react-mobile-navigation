import PropTypes from 'prop-types';
import React from 'react';
import MobileNavigationShadowPage from './MobileNavigationShadowPage';
import MobileNavigationModalRender from '../components-styled/MobileNavigationModalRender';
import { VERTICAL } from '../constants/direction-types';
import { MODAL } from '../constants/page-types';
import { MODAL_MARGIN } from '../utils/style-api';

const propTypes = {
  children: PropTypes.element,
  isForce: PropTypes.bool,
  isShow: PropTypes.bool,
  pageHeight: PropTypes.number,
  pageStatus: PropTypes.string,
  pageWidth: PropTypes.number,
  zIndex: PropTypes.number,
  onPageClose: PropTypes.func,
  onTransitionEnd: PropTypes.func,
};

const defaultProps = {
  children: undefined,
  isForce: undefined,
  isShow: undefined,
  pageHeight: undefined,
  pageStatus: undefined,
  pageWidth: undefined,
  zIndex: undefined,
  onPageClose: undefined,
  onTransitionEnd: undefined,
};

export default class MobileNavigationModal extends React.Component {

  constructor(props) {
    super(props);
    this.onShadowClick = this.onShadowClick.bind(this);
  }

  onShadowClick() {
    const { onPageClose } = this.props;
    if (!onPageClose) {
      return;
    }
    onPageClose();
  }

  render() {
    const {
      children,
      isForce,
      isShow,
      pageHeight,
      pageWidth,
      zIndex,
      onTransitionEnd,
      ...props,
    } = this.props;
    const pageHeightNew = pageHeight - MODAL_MARGIN;
    const pageWidthNew = pageWidth - (2 * MODAL_MARGIN);
    return (
      <MobileNavigationShadowPage
        direction={VERTICAL}
        isForce={isForce}
        isShow={isShow}
        pageLeft={MODAL_MARGIN}
        pageStatus={props.pageStatus}
        pageWidth={pageWidthNew}
        zIndex={zIndex}
        onShadowClick={this.onShadowClick}
        onTransitionEnd={onTransitionEnd}
      >
        <MobileNavigationModalRender pageHeight={pageHeightNew} pageWidth={pageWidthNew} >
          {children
            ? React.cloneElement(
              React.Children.only(children),
              Object.assign({}, props, { pageHeight: pageHeightNew, pageWidth: pageWidthNew })
            )
            : null
          }
        </MobileNavigationModalRender>
      </MobileNavigationShadowPage>
    );
  }
}

MobileNavigationModal.propTypes = propTypes;
MobileNavigationModal.defaultProps = defaultProps;
MobileNavigationModal.pageType = MODAL;
