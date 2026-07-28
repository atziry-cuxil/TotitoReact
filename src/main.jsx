import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { TotitoProvider } from './context/index.jsx'

createRoot(document.getElementById('root')).render(
    <TotitoProvider>
      <App />
    </TotitoProvider>   
  // <StrictMode>
  // </StrictMode>,
)
