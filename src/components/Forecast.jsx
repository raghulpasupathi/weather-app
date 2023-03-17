import React from 'react'
import { iconUrlFromCode } from '../services/WeatherService'

function Forecast({ title, items }) {
    console.log('items',items)
    return (
        <div>
            <div className='flex items-center justify-start mt-6'>
                <p className='text-white font-medium uppercase'>{title}</p>
            </div>
            <hr className='my-2' />
            <div className={(title === 'daily forecast') ? 'flex flex-row items-center text-white justify-between' : 'flex flex-row items-center text-white justify-around'}>
                {items.map((item) => (
                    <div className='flex flex-col items-center justify-center'>
                        <p className='font-light text-sm'>{item.title}</p>
                        <img src={iconUrlFromCode(item.icon)} alt='' className='w-12 my-1' />
                        <p className='font-medium '>{`${item.temp.toFixed()}°`}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Forecast