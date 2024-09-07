import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegistrationForm from './pages/Signup'
import Thank from './pages/Thank'
function App() {

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/thankyou" element={<Thank />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App
