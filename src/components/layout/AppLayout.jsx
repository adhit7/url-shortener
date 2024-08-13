import Header from '../Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

const AppLayout = () => {
  return (
    <div>
      <main className='min-h-screen container'>
        <Header />
        <Outlet />
      </main>
      <div className='p-10 text-center bg-gray-800 mt-10'>
        Made with ❤️ by Adhi
      </div>
      <Toaster />
    </div>
  );
};

export default AppLayout;
