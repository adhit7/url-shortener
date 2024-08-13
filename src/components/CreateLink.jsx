import React, { useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';
import api from '@/lib/api';
import Error from './Error';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const linkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  longUrl: z.string().url('Must be a valid URL').min(1, 'Long URL is required'),
});

const CreateLink = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const navigate = useNavigate();

  const ref = useRef();

  const [longUrl, setLongUrl] = useState(longLink ? longLink : '');

  const form = useForm({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: '',
      longUrl: longUrl,
    },
  });

  const createNewLink = async (values) => {
    setError('');
    setLoading(true);
    const { title, longUrl } = values;
    const requestBody = { title, longUrl };
    try {
      const { data } = await api.post('/url/create', requestBody);
      if (data) {
        navigate(`/link/${data?.id}`);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant='destructive'>Create New Link</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='font-bold text-2xl'>Create New</DialogTitle>
        </DialogHeader>
        {error && <Error message={error} />}
        {longUrl?.length > 0 && <QRCode ref={ref} size={250} value={longUrl} />}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(createNewLink)}
            className='space-y-4'
          >
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Short Link's Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='longUrl'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Enter your Loooong URL'
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setLongUrl(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='sm:justify-start'>
              <Button type='submit' variant='destructive' disabled={loading}>
                {loading ? <BeatLoader size={10} color='white' /> : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
