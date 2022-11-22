import Home from './components/pages/Home/Home';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path='login' element={<SignIn />} />
        <Route path='/' element={<Home />} />
        <Route path='registration' element={<SignUp />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
