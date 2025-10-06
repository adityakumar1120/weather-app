import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, reload the page.')
  },
  onOfflineReady() {
    console.log('App ready to work offline.')
  },
})

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
    </Provider>
)
