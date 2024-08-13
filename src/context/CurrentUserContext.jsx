import { useToast } from '@/components/ui/use-toast';
import api from '@/lib/api';
import { createContext, useContext, useState } from 'react';

const userInfo = localStorage.getItem('userInfo');
const decodedUser = userInfo ? JSON.parse(userInfo) : null;

const CurrentUserContext = createContext(null);

const CurrentUserProvider = ({ children }) => {
  const [user, setUser] = useState(decodedUser);
  const { toast } = useToast();

  const login = (userData) => {
    localStorage.setItem('userInfo', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  const deleteUrl = async (setLoading, id) => {
    setLoading(true);
    try {
      await api.delete(`/url/${id}`);
      toast({
        title: 'The link has been deleted successfully',
      });
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

  return (
    <CurrentUserContext.Provider
      value={{ user, setUser, login, logout, deleteUrl }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

const useCurrentUserContext = () => useContext(CurrentUserContext);

export { useCurrentUserContext };
export default CurrentUserProvider;
