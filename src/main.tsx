import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import App from './App';
import './styles/globals.css';

const root = document.getElementById('app');
if (!root) throw new Error('Root element not found');
createRoot(root).render(<StrictMode><HelmetProvider><App /></HelmetProvider></StrictMode>);
