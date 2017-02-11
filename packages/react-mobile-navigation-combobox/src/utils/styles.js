import { NO_SELECT_STYLE } from 'binary-ui-styles/web';

const THICK_FONT = {
  fontWeight: 500,
  textTransform: 'uppercase',
};

const LETTER_SPACING_SMALL = {
  letterSpacing: '3px',
};

export const FIELD_NAME_FONT = Object.assign(
  {},
  THICK_FONT,
  LETTER_SPACING_SMALL, {
    fontFamily: 'Fira Sans',
    fontSize: '13px',
    color: '#404040',
  }
);

export const FIELD_VALUE_FONT = {
  fontFamily: 'Fira Sans',
  fontSize: '18px',
  fontWeight: 200,
};

export const FIELD_VALUE_FONT_STYLE = {
  fontFamily: 'Fira Sans',
  fontSize: 18,
  fontWeight: 200,
};

export const RED_EXT = { color: '#C40233', fontWeight: 400 };

const CARDS_GREY = '#eeeae5';
const CARDS_BLUE = '#0087BD';
const CARDS_RED = '#C40233';

export const ACTION_SHEET_ITEM_STYLE = Object.assign(
  {},
  NO_SELECT_STYLE, {
    borderBottom: `1px solid ${CARDS_GREY}`,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  }
);

export const ACTION_SHEET_ITEM_HOVER_EXT_STYLE = {
  backgroundColor: CARDS_GREY,
};

const LIST_ITEM_HEIGHT = 50;

export const COMBOBOX_INPUT_STYLE = Object.assign(
  {},
  NO_SELECT_STYLE, {
    height: LIST_ITEM_HEIGHT,
    outline: 'none',
    border: 'none',
    borderBottom: `1px solid ${CARDS_GREY}`,
    width: '100%',
    boxSizing: 'border-box',
    paddingLeft: '10px',
  }
);

export const COMBOBOX_INPUT_ACTIVE_EXT_STYLE = {
  borderBottom: `1px solid ${CARDS_BLUE}`,
};

export const COMBOBOX_INPUT_INVALID_EXT_STYLE = {
  borderBottom: `1px solid ${CARDS_RED}`,
};

export const COMBOBOX_OPTION_STYLE = Object.assign(
  {},
  NO_SELECT_STYLE, {
    lineHeight: `${LIST_ITEM_HEIGHT}px`,
    borderBottom: `1px solid ${CARDS_GREY}`,
    paddingLeft: '10px',
  }
);

export const COMBOBOX_OPTION_HOVER_EXT_STYLE = {
  backgroundColor: CARDS_GREY,
};

export const COMBOBOX_OPTION_DISABLED_EXT_STYLE = {
  color: '#7F7F7F',
};

export const COMBOBOX_OPTION_DISABLED_HOVER_EXT_STYLE = {
  backgroundColor: '#FFFFFF',
};
