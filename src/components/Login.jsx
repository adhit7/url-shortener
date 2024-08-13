import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { BeatLoader } from 'react-spinners';
import { Button } from './ui/button';
import { Input } from './ui/input';
import api from '../lib/api';
import Error from './Error';
import { useCurrentUserContext } from '../context/CurrentUserContext';
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

const loginSchema = z.object({
  email: z.string().email('Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useCurrentUserContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const userLogin = async (values) => {
    setError('');
    setLoading(true);
    const { email, password } = values;
    const requestBody = { email, password };
    try {
      const { data } = await api.post('/user/login', requestBody);
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
        <CardTitle>Login</CardTitle>
        <CardDescription>
          to your account if you already have one
        </CardDescription>
        {error && <Error message={error} />}
      </CardHeader>

      <CardContent className='space-y-2'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(userLogin)} className='space-y-4'>
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
              {loading ? <BeatLoader size={10} color='#36d7b7' /> : 'Login'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Login;
