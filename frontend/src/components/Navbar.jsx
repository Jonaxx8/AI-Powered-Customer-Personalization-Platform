import logo from '../assets/bag.png'
import { Link } from 'react-router-dom'
import { doSignOut } from '../firebase/auth'
import React, {useState} from 'react'
import Dropdown from './Dropdown'
import PIcon from '../assets/settings.png'



function Navbar() {
  const [togglePreferencesPopup, setTogglePreferencesPopup] = useState(false);

  const togglePreferences = () => {
    setTogglePreferencesPopup(!togglePreferencesPopup);
  };

  return (
    <div className="border-b border-palette-lighter sticky top-0 z-20 bg-white" style={{position: 'relative'}}>
      {togglePreferencesPopup && <Dropdown onClose={togglePreferences}/>}
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pb-2 pt-4 md:pt-6">
        <Link to="/">
          <Link className=" cursor-pointer">
            <h1 className="flex no-underline">
              <img height="32" width="32" alt="logo" className="h-8 w-8 mr-1 object-contain" src={logo} />
              <span className="text-2xl font-primary font-bold tracking-tight pt-1">
                Dashboard
              </span>
            </h1>
          </Link>
        </Link>
        <div className='flex'> 
          <div className='w-8 h-8' onClick={() => setTogglePreferencesPopup(!togglePreferencesPopup)}><img src={PIcon} /></div>
          <Link to='/'>
            <button
              onClick={doSignOut}
              className="bg-palette-primary text-black font-primary font-semibold py-1 px-4 rounded-md ml-2"
            >
              Logout
            </button>

          </Link>

        </div>
      </div>
    </div>
  )
}

export default Navbar
