import Home from './components/pages/Home/Home';
import SignIn from './components/pages/SignIn/SignIn';
import SignUp from './components/pages/SignUp/SignUp';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='login' element={<SignIn />} />
      <Route path='/' element={<Home />} />
      <Route path='registration' element={<SignUp />} />
    </Routes>
  );
}

export default App;
