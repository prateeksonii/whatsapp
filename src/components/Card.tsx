import { FC } from "react";

const Card: FC = ({ children }) => {
  return <div className='bg-white rounded-md p-8'>{children}</div>;
};

export default Card;
