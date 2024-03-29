import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
  // @ts-ignore
} from 'react-simple-captcha'
import { ReactComponent as Github } from '../components/github.svg'
import './About.css'
import './common.css'

const EMAIL_COVER_MSG = 'Click here to see email'

function Email() {
  const [matched, setMatched] = useState(false)
  const [captcha, setCaptcha] = useState(false)
  const [answer, setAnswer] = useState('')

  const clickHandler = () => setCaptcha(true)

  const submitHandler = () => {
    if (validateCaptcha(answer, false) === true) setMatched(true)
    else {
      alert('Captcha does not match')
    }
  }

  useEffect(() => {
    if (captcha) loadCaptchaEnginge(6)
  }, [captcha])

  return (
    <div>
      {matched ? (
        <Link
          className='contacts mail'
          to={`mailto:${process.env.REACT_APP_EMAIL_ADDRESS}`}
          target='_blank'
          rel='noopener noreferrer'>
          <div className='contacts-icon mail-icon icon'>mail</div>
          <div>{process.env.REACT_APP_EMAIL_ADDRESS}</div>
        </Link>
      ) : (
        <div className='contacts mail beforeMatched'>
          <div className='contacts-icon mail-icon icon'>mail</div>
          {captcha ? (
            <form className='captcha-form'>
              <LoadCanvasTemplate />
              <input
                className='answer'
                id='captcha-answer'
                type='text'
                placeholder='Enter captcha value'
                onChange={(e) => setAnswer(e.target.value)}
                value={answer}
              />
              <button
                className='submit'
                type='submit'
                onClick={submitHandler}>
                Submit
              </button>
            </form>
          ) : (
            <button
              className='show-captcha-button'
              onClick={clickHandler}>
              {EMAIL_COVER_MSG}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function About() {
  return (
    <>
      <nav>
        <Link
          className='title-link'
          to='/'>
          <h1 className='title'>
            Find peace here, if only for a little while!
          </h1>
        </Link>
        <Link
          className='homepage-button top-right-button icon'
          to='/'>
          home
        </Link>
      </nav>
      <div className='content'>
        <p>Bird and Tree is a personal website owned by Wooil Kim.</p>
        <h2>Contacts</h2>
        <Link
          className='contacts github'
          to='https://github.com/woooil'
          target='_blank'
          rel='noopener noreferrer'>
          <Github className='contacts-icon github-icon' />
          <div>woooil</div>
        </Link>
        <Email />
        <h2>Copyright Notice</h2>
        <p>
          All emojis (bird, tree, and flowers) used on this website ("Website")
          were generated by{' '}
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
        <p>This Website does not collect or store any personal information.</p>
      </div>
    </>
  )
}
