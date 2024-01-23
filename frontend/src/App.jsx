import DashBoard from './pages/DashBoard'
import Navbar from './components/Navbar'
import Form from './pages/form'
import { UserProvider } from './context/UserContext'

function App() {

  return (
    <>
      <UserProvider>    
        <Navbar />
        {/* <Form /> */}
        <DashBoard />
      </UserProvider>
    </>
    
  )
}

export default App
