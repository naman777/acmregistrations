import './App.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegistrationForm from './pages/Signup'
import ThankYouPage from './pages/Thanks'
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App
