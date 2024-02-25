import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback="loading...">
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>,
)
