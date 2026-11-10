import type { Theme } from '../types'

/** Apply the theme class on <html>; called on boot and on every toggle. */
export function applyTheme(theme: Theme): void {
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
