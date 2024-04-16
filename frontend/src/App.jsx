
import './App.css'
import Navbar from './Components/Navbar'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import AllRoutes from './Routes/AllRoutes'

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn')
  return (
    <>
      {isLoggedIn? <Navbar /> : ""}
      <AllRoutes />
    </>
  )
}

export default App
