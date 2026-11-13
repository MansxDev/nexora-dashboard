import { createRoot } from 'react-dom/client'
import App from './App'
import { useUiStore } from './stores/uiStore'
import { applyTheme } from './utils/theme'
import './index.css'
import './i18n/config' // <-- Init i18n


// Hydrate persisted theme onto <html> before first paint.
applyTheme(useUiStore.getState().theme)

createRoot(document.getElementById('root')!).render(<App />)
