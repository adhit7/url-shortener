import { Copy, Download, LinkIcon, Trash } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import { QRCode } from 'react-qrcode-logo';

const LinkCard = ({ url, loading, deleteFn }) => {
  return (
    <div className='flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg'>
      <QRCode
        value={url?.originalUrl}
        style={{
          boxShadow: '0 0 0 1px #3b82f6',
          alignSelf: 'flex-start',
        }}
      />
      <Link to={`/link/${url?._id}`} className='flex flex-col flex-1'>
        <span className='text-3xl font-extrabold hover:underline cursor-pointer'>
          {url?.title}
        </span>
        <span className='text-2xl text-blue-400 font-bold hover:underline cursor-pointer'>
          {url.shortenUrl}
        </span>
        <span className='flex items-center gap-1 hover:underline cursor-pointer flex-wrap'>
          <LinkIcon className='p-1' />
          {url?.originalUrl}
        </span>
        <span className='flex items-end font-extralight text-sm flex-1'>
          {new Date(url?.createdAt).toLocaleString()}
        </span>
      </Link>
      <div className='flex gap-2'>
        <Button
          variant='ghost'
          onClick={() => navigator.clipboard.writeText(url?.shortenUrl)}
        >
          <Copy />
        </Button>
        <Button
          variant='ghost'
          onClick={() => deleteFn(url?._id)}
          disable={loading}
        >
          {loading ? <BeatLoader size={5} color='white' /> : <Trash />}
        </Button>
      </div>
    </div>
  );
};

export default LinkCard;
