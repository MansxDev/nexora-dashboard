import { createRoot } from 'react-dom/client'
import App from './App'
import { useUiStore } from './stores/uiStore'
import { applyTheme } from './utils/theme'
import './index.css'

// Hydrate persisted theme onto <html> before first paint.
applyTheme(useUiStore.getState().theme)

createRoot(document.getElementById('root')!).render(<App />)
