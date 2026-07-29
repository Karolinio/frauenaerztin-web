import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/app.css';

const wurzel = document.getElementById('root');
if (!wurzel) throw new Error('Kein #root im Dokument — index.html prüfen.');

createRoot(wurzel).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
