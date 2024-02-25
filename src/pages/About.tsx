import { Link } from 'react-router-dom'
import { ReactComponent as Github } from '../components/github.svg'
import './About.css'
import './common.css'

function WooilKim() {
  return (
    <Link
      className='homepage-link'
      to='https://wooil.kim'>
      wooil.kim
    </Link>
  )
}

export default function About() {
  return (
    <>
      <nav>
        <Link
          className='title-link'
          to='https://wooil.kim'>
          <h1 className='title'>
            Find peace here, if only for a little while!
          </h1>
        </Link>
      </nav>
      <div className='content'>
        <p>
          <WooilKim /> is a personal website owned by Wooil Kim.
        </p>
        <h2>Contacts</h2>
        <Link
          className='contacts github'
          to='https://github.com/woooil'
          target='_blank'
          rel='noopener noreferrer'>
          <Github className='contacts-icon github-icon' />
          <div>woooil</div>
        </Link>
        <Link
          className='contacts mail'
          to='mailto:hello@wooil.kim'
          target='_blank'
          rel='noopener noreferrer'>
          <div className='contacts-icon mail-icon icon'>mail</div>
          <div>hello@wooil.kim</div>
        </Link>
        <h2>Copyright Notice</h2>
        <p>
          All emojis (bird, tree, and flowers) used on <WooilKim /> were
          generated by{' '}
          <Link
            className='copyright-link'
            to='https://emojis.sh/'
            target='_blank'
            rel='noopener noreferrer'>
            emojis.sh
          </Link>{' '}
          for non-commercial purposes.
        </p>
        <h2>Personal Information</h2>
        <p>
          <WooilKim /> does not collect or store any personal information.
        </p>
      </div>
    </>
  )
}
