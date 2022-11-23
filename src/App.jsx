import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthContext } from './contexts/AuthContext';
import { useState } from 'react';
import Auth from './components/pages/Auth/Auth';
import Home from './components/pages/Home/Home';

const queryClient = new QueryClient();

const App = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <Routes>
          <Route path='/login' element={<Auth />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
