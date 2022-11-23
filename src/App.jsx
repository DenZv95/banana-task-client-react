import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthContext } from './contexts/AuthContext';
import { useState } from 'react';
import Auth from './components/pages/Auth/Auth';

const queryClient = new QueryClient();

const App = () => {
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem('token'));

  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ isAuth, setIsAuth }}>
        <Routes>
          <Route path='/' element={<Auth />} />
        </Routes>
      </AuthContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
