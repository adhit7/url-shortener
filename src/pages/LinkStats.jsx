import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Copy, Trash, LinkIcon } from 'lucide-react';
import { QRCode } from 'react-qrcode-logo';
import { BarLoader } from 'react-spinners';
import api from '@/lib/api';
import DeviceStats from '../components/DeviceStats';
import LocationStats from '../components/LocationStats';
import Lottie from 'lottie-react';
import noDataFound from '../assets/lottie/noDataFound.json';
import { useToast } from '@/components/ui/use-toast';
import { useCurrentUserContext } from '@/context/CurrentUserContext';

const LinkStats = () => {
  const { id } = useParams();
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [stats, setStats] = useState([]);
  const { toast } = useToast();
  const { deleteUrl } = useCurrentUserContext();
  const navigate = useNavigate();

  const getUrl = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/url/${id}`);
      setUrl(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      console.log(errorMessage);
      toast({
        variant: 'destructive',
        title: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const getStats = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/click/url/count/${url._id}`);
      setStats(data);
    } catch (error) {
      const errorMessage = error.response?.data?.message || error?.message;
      console.log(errorMessage);
      toast({
        variant: 'destructive',
        title: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = (id) => {
    try {
      deleteUrl(setLoadingStats, id);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUrl();
    }
  }, []);

  useEffect(() => {
    if (url?._id) {
      getStats();
    }
  }, [url]);

  return (
    <>
      {loading ? (
        <BarLoader width={'100%'} color='#36d7b7' />
      ) : (
        <div className='flex flex-col gap-8 sm:flex-row justify-between'>
          <div className='flex flex-col items-start gap-8 rounded-lg sm:w-2/5'>
            <span className='text-6xl font-extrabold hover:underline cursor-pointer break-all'>
              {url?.title}
            </span>
            <a
              href={url?.shortenUrl}
              target='_blank'
              className='text-3xl sm:text-4xl text-blue-400 font-bold hover:underline cursor-pointer break-all'
            >
              {url?.shortenUrl}
            </a>
            <a
              href={url?.originalUrl}
              target='_blank'
              className='flex items-center gap-1 hover:underline cursor-pointer break-all'
            >
              <LinkIcon className='p-1' />
              <p className='break-all'>{url?.originalUrl}</p>
            </a>
            <span className='flex items-end font-extralight text-sm'>
              {url?.createdAt && new Date(url?.createdAt).toLocaleString()}
            </span>

            <div className='flex gap-2'>
              <Button
                variant='ghost'
                onClick={() => navigator.clipboard.writeText(url?.shortenUrl)}
              >
                <Copy />
              </Button>
              <Button variant='ghost' onClick={() => deleteLink(url?._id)}>
                <Trash />
              </Button>
            </div>

            {url?.originalUrl && (
              <QRCode
                value={url?.originalUrl}
                style={{
                  width: '100%',
                  height: 'auto',
                  alignSelf: 'center',
                  '@media (min-width: 640px)': {
                    alignSelf: 'flex-start',
                  },
                  padding: '0.25rem',
                }}
              />
            )}
          </div>
          <Card className='md:w-1/2 sm:w-3/5'>
            <CardHeader>
              <CardTitle className='text-4xl font-extrabold'>Stats</CardTitle>
            </CardHeader>
            {stats && stats.length ? (
              <CardContent className='flex flex-col gap-6'>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Clicks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{stats?.length}</p>
                  </CardContent>
                </Card>

                <CardTitle>Location Data</CardTitle>
                <LocationStats stats={stats} />
                <CardTitle>Device Info</CardTitle>
                <DeviceStats stats={stats} />
              </CardContent>
            ) : (
              <CardContent className='h-2/3 flex flex-col justify-center items-center'>
                {loadingStats === false ? (
                  <>
                    <Lottie animationData={noDataFound} loop={true} />
                    <h2 className='text-center text-3xl font-bold mt-3'>
                      Not enough data to process your link stats
                    </h2>
                  </>
                ) : (
                  'Loading Statistics..'
                )}
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default LinkStats;
