import DashBoard from "./DashBoard"
import Navbar from "../components/Navbar"
import { UserProvider } from "../context/UserContext"
// import Form from './form'

function HomePage() {

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

export default HomePage
