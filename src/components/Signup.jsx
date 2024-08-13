import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { BeatLoader } from 'react-spinners';
import api from '../lib/api';
import Error from './Error';
import { useCurrentUserContext } from '@/context/CurrentUserContext';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const signUpSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useCurrentUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const userSignup = async (values) => {
    setError('');
    setLoading(true);
    const { name, email, password } = values;
    const requestBody = { name, email, password };
    try {
      const { data } = await api.post('/user/register', requestBody);
      if (data) {
        login(data);
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account if you haven’t already
        </CardDescription>
        {error && <Error message={error} />}
      </CardHeader>
      <CardContent className='space-y-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(userSignup)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='text' placeholder='Enter Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='email' placeholder='Enter Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit'>
              {loading ? <BeatLoader size={10} color='#36d7b7' /> : 'Signup'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Signup;
