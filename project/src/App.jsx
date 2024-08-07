// App.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'; // Asegúrate de que la ruta sea correcta
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Router>
);
