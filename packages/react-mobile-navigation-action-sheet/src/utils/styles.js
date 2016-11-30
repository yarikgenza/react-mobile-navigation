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

export const ACTION_SHEET_STYLE = Object.assign({}, FIELD_VALUE_FONT_STYLE, {
  backgroundColor: '#ffffff',
  borderRadius: 0,
  boxSizing: 'border-box',
  lineHeight: '50px',
  overflow: 'hidden',
  margin: '0 auto',
  verticalAlign: 'middle',
  width: '100%',
  zIndex: 1000,
});

export const RED_EXT = { color: '#C40233', fontWeight: 400 };

const CARDS_GREY = '#eeeae5';

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
