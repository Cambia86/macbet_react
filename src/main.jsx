import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import './index.css'  // opzionale, se vuoi stile base
import store, { persistor } from './store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        {/* <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider> */}

        
        <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
        </Provider>
    </React.StrictMode>
)