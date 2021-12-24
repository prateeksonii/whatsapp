import { FC } from "react";

const Center: FC = ({ children }) => {
  return (
    <div className='h-full w-full flex items-center justify-center flex-col'>
      {children}
    </div>
  );
};

export default Center;
