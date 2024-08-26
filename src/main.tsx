import { Toaster } from '@/components/ui/sonner'
import Page from '@/features/Page'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page />
    <Toaster />
  </StrictMode>
)
