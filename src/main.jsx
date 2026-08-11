import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/fonts.css';
import './styles/theme.css';
import './styles/animations.css';
import './styles/reveal.css';
import './styles/base.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
