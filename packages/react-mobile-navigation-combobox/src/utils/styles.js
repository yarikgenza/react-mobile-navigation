import {
  BINARY_COLOR_SAND_90,
  BINARY_COLOR_RED_40,
  BINARY_COLOR_BLUE_40,
} from 'binary-ui-styles';
import { FONT_FAMILY_MAIN, NO_SELECT_CSS } from 'binary-ui-styles/web';

export const FIELD_VALUE_FONT_CSS = `
  font-family: ${FONT_FAMILY_MAIN};
  font-size: 18px;
  font-weight: 200;
`;

export const FIELD_NAME_FONT_CSS = `
  font-family: ${FONT_FAMILY_MAIN};
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
`;

export const LIST_ITEM_CONTENTS_BASE_CSS = `
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: inline-block;
  outline: 0;
`;

export const RED_EXT = { color: BINARY_COLOR_RED_40, fontWeight: 400 };

export const ACTION_SHEET_ITEM_STYLE = Object.assign(
  {},
  NO_SELECT_CSS, {
    borderBottom: `1px solid ${BINARY_COLOR_SAND_90}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    cursor: 'default',
  }
);

export const ACTION_SHEET_ITEM_HOVER_EXT_STYLE = {
  backgroundColor: BINARY_COLOR_SAND_90,
};

export const LIST_ITEM_HEIGHT = 44;

export const COMBOBOX_INPUT_ACTIVE_EXT_STYLE = {
  borderBottom: `1px solid ${BINARY_COLOR_BLUE_40}`,
};

export const COMBOBOX_INPUT_INVALID_EXT_STYLE = {
  borderBottom: `1px solid ${BINARY_COLOR_RED_40}`,
};
