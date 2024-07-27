export const transformStringToClue = (str: string) => {
  if (str.length > 50) {
    str = str.substring(0, 50);
  }

  const firstChar = str.charAt(0);

  let transformedText = firstChar;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === ' ') {
      transformedText += ' ';
    } else {
      transformedText += '_';
    }
  }

  return transformedText;
};
