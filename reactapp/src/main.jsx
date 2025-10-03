import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListaDocentes from './ListaDocentes'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import FormDocente from './FormDocente'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaDocentes />} />
        <Route path="/docentes/create" element={<FormDocente />} />
        <Route path="/hola" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
