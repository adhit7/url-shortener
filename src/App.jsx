import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import AppLayout from './components/layout/AppLayout';
import RequireUser from './components/authentication/RequireUser';
import RequireVisitor from './components/authentication/RequireVisitor';
import LinkStats from './pages/LinkStats';

function App() {
  return (
    <div>
      <Routes>
        <Route element={<AppLayout />}>
          <Route element={<RequireUser />}>
            <Route index path='/dashboard' element={<Dashboard />} />
            <Route index path='/link/:id' element={<LinkStats />} />
          </Route>

          <Route element={<RequireVisitor />}>
            <Route path='/login' element={<Auth />} />
          </Route>

          <Route path='/' element={<LandingPage />} />
        </Route>
      </Routes>
      {/* <div className='p-10 bg-gray-800 text-center'>Made with ❤️ by Adhi</div> */}
    </div>
  );
}

export default App;
