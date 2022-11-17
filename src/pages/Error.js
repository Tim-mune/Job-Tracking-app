import { Link } from "react-router-dom"
import img from '../assets/images/not-found.svg'
import Wrapper from "../assets/wrappers/ErrorPage"

const Error = () => {
  return (
    <Wrapper className="full-page">
<div>
    <img src={img} alt="Not found" />
    <h3>Sorry </h3>
    <p> The page cannot be found</p>
    <Link to='/'>Navigate Home</Link>
</div>
    </Wrapper>
  )
}

export default Error