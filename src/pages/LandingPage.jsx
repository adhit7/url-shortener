import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import { useCurrentUserContext } from '../context/CurrentUserContext';

const LandingPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const navigate = useNavigate();
  const { user } = useCurrentUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      navigate(`/dashboard?createNew=${longUrl}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div>
      <div className='flex flex-col  items-center'>
        <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>
          The only URL Shortener you’ll ever need! 👇
        </h2>
        <form
          className='flex items-center w-full md:w-2/4 gap-2'
          onSubmit={handleSubmit}
        >
          <Input
            type='url'
            placeholder='Enter your looong URL'
            className='py-4 px-4 h-full'
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
          />
          <Button
            type='submit'
            className='h-full py-4 px-4'
            variant='destructive'
          >
            Shorten!
          </Button>
        </form>
        <img
          src='/banner1.jpg' // replace with 2 in small screens
          className='w-full my-11 md:px-11'
        />
        <Accordion type='multiple' collapsible className='w-full md:px-11'>
          <AccordionItem value='item-1'>
            <AccordionTrigger className='text-start'>
              How does the Trimrr URL shortener works?
            </AccordionTrigger>
            <AccordionContent>
              When you enter a long URL, our system generates a shorter version
              of that URL. This shortened URL redirects to the original long URL
              when accessed.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger className='text-start'>
              Do I need an account to use the app?
            </AccordionTrigger>
            <AccordionContent>
              Yes. Creating an account allows you to manage your URLs, view
              analytics, and customize your short URLs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger className='text-start'>
              What analytics are available for my shortened URLs?
            </AccordionTrigger>
            <AccordionContent>
              You can view the number of clicks, geolocation data of the clicks
              and device types (mobile/desktop) for each of your shortened URLs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default LandingPage;
