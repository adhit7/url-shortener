import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from '../components/ui/card';
import CreateLink from '../components/CreateLink';
import { useCurrentUserContext } from '@/context/CurrentUserContext';
import LinkCard from '@/components/LinkCard';
import api from '@/lib/api';
import { BarLoader } from 'react-spinners';
import { useToast } from '@/components/ui/use-toast';
import noDataFound from '../assets/lottie/noDataFound.json';
import Lottie from 'lottie-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [urls, setUrls] = useState([]);
  const [lastMonthCount, setLastMonthCount] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const { user, deleteUrl } = useCurrentUserContext();
  const { toast } = useToast();

  const getCount = (urlList) => {
    let todayDate = new Date()?.toLocaleString()?.split(',');
    let formattedDate = todayDate?.[0]?.split('/');

    const last30Days = urlList?.reduce((sum, item) => {
      let itemDate = item?.createdAt?.split('/');

      let lastMonth =
        formattedDate?.[1] === '01' ? 12 : Number(formattedDate?.[1] - 1);

      if (Number(itemDate?.[1]) === lastMonth) {
        sum += 1;
      }
      return sum;
    }, 0);
    return last30Days;
  };

  const getUrls = async () => {
    setLoading(true);
    const { _id } = user;
    const requestBody = { _id };
    try {
      const { data } = await api.get('/url/all', requestBody);
      const last30DaysCount = getCount(data);
      setUrls(data);
      setLastMonthCount(last30DaysCount);
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

  const deleteLink = async (id) => {
    try {
      deleteUrl(setLoading, id);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUrls();
  }, [refresh]);

  return (
    <div className='flex flex-col gap-8'>
      {loading && <BarLoader width={'100%'} color='#36d7b7' />}
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Last Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{lastMonthCount}</p>
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-between'>
        <h2 className='text-3xl font-extrabold'>My Links</h2>
        <CreateLink />
      </div>
      {urls?.length > 0
        ? urls.map((url, i) => (
            <LinkCard
              key={i}
              url={url}
              loading={loading}
              deleteFn={deleteLink}
            />
          ))
        : !loading && (
            <div className='flex justify-center p-3'>
              <Lottie animationData={noDataFound} loop={true} />
            </div>
          )}
    </div>
  );
};

export default Dashboard;
