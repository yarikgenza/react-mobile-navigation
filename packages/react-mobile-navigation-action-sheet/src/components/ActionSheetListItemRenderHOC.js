import React from 'react';
import { actionAreaBlockHOC } from 'react-action-hoc';
import ActionSheetListItemRender from '../components-styled/ActionSheetListItemRender';

export default actionAreaBlockHOC(
  (props) => (<ActionSheetListItemRender {...props} />)
);
