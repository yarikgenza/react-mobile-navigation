import {
  BINARY_COLOR_SAND_90,
  BINARY_COLOR_BLUE_40,
  BINARY_COLOR_RED_40,
  FONT_FAMILY_MAIN,
} from 'binary-ui-styles';

export const FIELD_VALUE_FONT_CSS = `
  font-family: ${FONT_FAMILY_MAIN};
  font-size: 16;
  font-weight: 200;
`;

export const FIELD_NAME_FONT_CSS = `
  font-family: ${FONT_FAMILY_MAIN};
  font-size: 12;
  font-weight: 700;
  letter-spacing: 2;
`;


export function getEditStyle(color) {
  return {
    borderBottomColor: color,
    borderBottomWidth: 1,
  };
}

export function getHighlightEditStyle(isEdit, isValid, isTypingHighlight, borderColor) {
  if (!isEdit) {
    return undefined;
  }
  // not valid
  if (!isValid) {
    return getEditStyle(BINARY_COLOR_RED_40);
  }
  // active
  if (isTypingHighlight) {
    return getEditStyle(BINARY_COLOR_BLUE_40);
  }
  // only editable style
  if (borderColor) {
    return getEditStyle(borderColor);
  }
  return getEditStyle(BINARY_COLOR_SAND_90);
}
