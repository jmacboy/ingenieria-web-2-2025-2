import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ListaDocentes from './ListaDocentes'
import FormPrueba from './FormPrueba'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListaDocentes />} />
        <Route path="/docentes/create" element={<FormPrueba />} />
        <Route path="/hola" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
