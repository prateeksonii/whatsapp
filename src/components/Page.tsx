import { FC } from "react";

const Page: FC = ({ children }) => {
  return (
    <div className='h-screen w-screen bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white'>
      {children}
    </div>
  );
};

export default Page;
