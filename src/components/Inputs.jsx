import React, { useState } from 'react'
import {UilSearch, UilLocationPoint} from '@iconscout/react-unicons'

function Inputs({setQuery, units, setUnits}) {
  const [city,setCity] = useState("");

  const handleSearchClick = () => {
    if(city !== '') setQuery({q: city})
  }

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;
        
        setQuery({ lat, lon});
      })
    }
  }

  const handleUnitsChange = (e) => {
    if(units !== e.currentTarget.name) setUnits(e.currentTarget.name);
  }
  
  const handleSelect = () => {
    if(units === 'metric'){
      return 
    }
  }
  return (
    <div className='flex flex-row justify-around my-6'>
        <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
            <input 
            value = {city}
            onChange={(e) => setCity(e.currentTarget.value)}
            onEnt
            type='text'
            placeholder='Search for city...'
            className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
            />
            <UilSearch size={25} onClick = {handleSearchClick} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
            <UilLocationPoint size={25} onClick = {handleLocationClick} className='text-white cursor-pointer transition ease-out hover:scale-125'/>
        </div>
        <div className='flex flex-row items-center justify-center w-1/4'>
        <button name='metric' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnitsChange}>°C</button>
        <p className='text-xl text-white mx-1'>|</p>
        <button name='imperial' className='text-xl text-white font-light transition ease-out hover:scale-125' onClick={handleUnitsChange}>°F</button>
        </div>
    </div>
  )
}

export default Inputs