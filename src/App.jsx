import { Route, Routes } from 'react-router-dom';
import CallbackModalProvider from './components/Callback/CallbackForm.jsx';
import HomePage from './pages/HomePage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';

export default function App() {
  return (
    <CallbackModalProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </CallbackModalProvider>
  );
}
