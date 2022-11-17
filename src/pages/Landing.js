import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import { Logo } from '../components'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    <Wrapper>
        <nav>
            <Logo/>
        </nav>
        <div className="container page">
            <div className="info">
                <h1>Job <span>Tracking </span>App</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium unde dolorem modi fuga aliquid impedit non tempore magnam quae veniam excepturi, repudiandae perspiciatis. Perspiciatis ut odit officiis, magni voluptatem voluptates vero labore nihil repudiandae non sit expedita suscipit nulla consequuntur magnam nobis, ipsum mollitia molestias cum. Facere debitis facilis molestias?
                </p>
                <Link to='/register' className='btn btn-hero'>Login/register</Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img' />
        </div>
    </Wrapper>
  )
}

export default Landing