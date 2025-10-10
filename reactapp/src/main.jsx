import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListaDocentes from './pages/docentes/ListaDocentes'
import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css'
import FormDocente from './pages/docentes/FormDocente'
import FormLogin from './pages/auth/FormLogin'
import FormRegister from './pages/auth/FormRegister'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaDocentes />} />
        <Route path="/docentes/create" element={<FormDocente />} />
        <Route path="/docentes/:id/edit" element={<FormDocente />} />
        <Route path="/hola" element={<App />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/register" element={<FormRegister />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
