import Card from "@components/Card";
import Center from "@components/Center";
import Input from "@components/Input";
import Page from "@components/Page";
import { FC } from "react";

const Signup: FC = () => {
  return (
    <Page>
      <Center>
        <h1 className='text-4xl'>Create account</h1>
        <div className='p-4' />
        <div className='text-black'>
          <Card>
            <Input id='email' label='Email address' type='email' />
            <div className='p-2' />
            <Input id='password' label='Password' type='password' />
            <div className='p-2' />
            <Input
              id='confirmPassword'
              label='Confirm password'
              type='password'
            />
          </Card>
        </div>
      </Center>
    </Page>
  );
};

export default Signup;
