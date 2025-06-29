import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NotesProvider } from './provider/Notes.provider.tsx'
import { FilterProvider } from './provider/Filter.provider.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotesProvider>
      <FilterProvider>
        <App />
      </FilterProvider>
    </NotesProvider>
  </StrictMode>,
)
