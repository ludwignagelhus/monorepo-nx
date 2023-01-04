/* From camelCase? */
export const snakeCase = (s: string) => {
  return s
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

/* TODO: add others as well:  */
/* - camelCase */
/* - SCREAMING_SNAKE_CASE */
/* - PascalCase */
