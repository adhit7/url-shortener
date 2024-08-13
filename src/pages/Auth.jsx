import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import Signup from '../components/Signup';
import Login from '../components/Login';

const Auth = () => {
  return (
    <div className='mt-36 flex flex-col items-center gap-10'>
      <h1 className='text-5xl font-extrabold'>Login</h1>
      <Tabs defaultValue='login' className='w-[400px]'>
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='login'>Login</TabsTrigger>
          <TabsTrigger value='signup'>Signup</TabsTrigger>
        </TabsList>
        <TabsContent value='login'>
          <Login />
        </TabsContent>
        <TabsContent value='signup'>
          <Signup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Auth;
