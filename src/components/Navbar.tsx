import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const message = 'Find peace here, if only for a little while!'

  return (
    <nav>
      <h1 className='title'>{message}</h1>
      <Link
        className='about-link icon'
        to='/about'>
        info
      </Link>
    </nav>
  )
}
