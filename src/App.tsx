
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

// Placeholder components for other routes
import Learn from './pages/Learn';
import Conversation from './pages/Conversation';
import Dictionary from './pages/Dictionary';
const Profile = () => <div className="p-6"><h1 className="text-2xl font-bold">Profil</h1><p className="text-gray-500 mt-2">User stats and settings.</p></div>;

import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="learn" element={<Learn />} />
            <Route path="conversation" element={<Conversation />} />
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
