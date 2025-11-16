import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './sw-register'    // <--- add this line
import 'bootstrap/dist/css/bootstrap.min.css' // if you use Bootstrap

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
