import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"; // <-- חשוב להוסיף

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

    <StrictMode>
      <App></App>
    </StrictMode>
  </BrowserRouter>
  ,

)
