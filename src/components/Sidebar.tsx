import {Link, Location} from 'react-router-dom'
import {ChartBarIcon, HomeIcon, NewspaperIcon, SwitchHorizontalIcon} from '@heroicons/react/outline'

export interface SidebarProps {
    location: Location
}

const Sidebar = ({location}: SidebarProps) => {
    return (
        <div className='bg-blue-800 min-w-[280px] text-gray-200 fixed top-0 bottom-0 left-0' >
            <div className="flex items-center space-x-2 justify-center my-10">
                <img className="h-12 object-contain" src="https://bit.ly/3KpRk1t" alt="" />
                <h2 className='text-3xl'>Crypto App</h2>
            </div>
            <div className="py-4">
                <Link to='/' className={`flex items-center space-x-1 px-5 py-2 hover:bg-blue-400 ${location.pathname === '/' && 'bg-blue-600'}`} >
                    <HomeIcon className="h-6" />
                    <span>Home</span>
                </Link>
                <Link to='/cryptocurrencies' className={`flex items-center space-x-1 px-5 py-2 hover:bg-blue-400 ${location.pathname === '/cryptocurrencies' && 'bg-blue-600'}`} >
                    <ChartBarIcon className="h-6" />
                    <span>Cryptocurrencies</span>
                </Link>
                <Link to='/exchanges' className={`flex items-center space-x-1 px-5 py-2 hover:bg-blue-400 ${location.pathname === '/exchanges' && 'bg-blue-600'}`} >
                    <SwitchHorizontalIcon className="h-6" />
                    <span>Exchanges</span>
                </Link>
                <Link to='/news' className={`flex items-center space-x-1 px-5 py-2 hover:bg-blue-400 ${location.pathname === '/news' && 'bg-blue-600'}`} >
                    <NewspaperIcon className="h-6" />
                    <span>News</span>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar