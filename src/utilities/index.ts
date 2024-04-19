//input ['primary', 'secondary'] output button, button-primary, button-secondary
export const convertClassName = (
  className: string,
  modifier?: string | string[]
) => {
  if (!modifier) return className;

  return `${className} ${className}-${modifier}`;
};

export const toThousand = (number : number) => {
  return number.toString()+ ',000'
}
