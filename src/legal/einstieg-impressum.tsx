import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Impressum } from './Impressum';
import '../styles/app.css';

const wurzel = document.getElementById('root');
if (!wurzel) throw new Error('Kein #root im Dokument — impressum.html prüfen.');

createRoot(wurzel).render(
  <StrictMode>
    <Impressum />
  </StrictMode>,
);
