import { createRoot } from 'react-dom/client'
import store from './app/store.js'
import { Provider } from 'react-redux'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)