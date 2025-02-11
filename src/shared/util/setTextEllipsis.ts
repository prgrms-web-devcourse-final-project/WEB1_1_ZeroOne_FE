export const setTextEllipsis = (text: string, len: number) => {
  return text.length > len ? text.substring(0, len + 1) + '...' : text;
};
