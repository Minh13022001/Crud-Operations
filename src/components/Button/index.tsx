
interface Props {
  modifier?: string;
  children: string;
  className: string;
}



const Button = ({ className, modifier, children }: Props) => {

  const Convert = (className: string, modifier?: string) => {
    const result = `${className} ${className}-${modifier}`
    return result;
  }

  return <div className={Convert(className, modifier)}>{children}</div>;
}

export default Button;
