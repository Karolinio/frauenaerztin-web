import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Datenschutz } from './Datenschutz';
import '../styles/app.css';

const wurzel = document.getElementById('root');
if (!wurzel) throw new Error('Kein #root im Dokument — datenschutz.html prüfen.');

createRoot(wurzel).render(
  <StrictMode>
    <Datenschutz />
  </StrictMode>,
);
