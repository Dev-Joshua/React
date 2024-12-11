import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Llamamos el elemento 'root' del html donde queremos renderizar nuestra app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

//Punto de entrada de la aplicacion.
