import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useCurrentUserContext } from '@/context/CurrentUserContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { LinkIcon, LogOut } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useCurrentUserContext();
  return (
    <nav className='py-4 flex justify-between items-center'>
      <Link to='/'>
        <img src='/logo.png' className='h-16' alt='Trimrr Logo' />
      </Link>
      {!user ? (
        <Button onClick={() => navigate('/login')}>Login</Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger className='w-10 rounded-full overflow-hidden'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>PA</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user?.['name']}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to='/dashboard' className='flex'>
                <LinkIcon className='mr-2 h-4 w-4' />
                My Links
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className='text-red-400'
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </nav>
  );
};

export default Header;
