import type { FC } from "react";
import Center from "@components/Center";
import Page from "@components/Page";
import { Link } from "react-router-dom";

const Index: FC = () => {
  return (
    <Page>
      <Center>
        <h1 className='text-7xl'>Whatsapp Redefined</h1>
        <p className='mt-8 text-2xl font-light'>
          A minimal realtime chat application
        </p>
        <div className='flex gap-4 mt-8'>
          <Link to='/signup' className='px-6 py-3 bg-black rounded-lg'>
            Sign up
          </Link>
          <Link to='/signin' className='px-6 py-3 bg-white text-black rounded-lg'>
            Sign in
          </Link>
        </div>
      </Center>
    </Page>
  );
};

export default Index;
