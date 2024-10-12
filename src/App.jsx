import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegistrationForm from './pages/Signup'
import Thank from './pages/Thank'
import Admin from './pages/Admin'
import AdminLogin from './pages/AdminLogin'
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/thankyou" element={<Thank />} />
        <Route path="/admin/data" element={<Admin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App
