import Wrapper from "../assets/wrappers/BigSidebar"
import Navlinks from './Navlinks';
import Logo from '../components/Logo';
import { useSelector } from 'react-redux';
const BigSideBar = () => {
  const {isSideBarOpen}=useSelector(store=>store.user)
  return (
    <Wrapper>
        <div className={isSideBarOpen?'sidebar-container':'sidebar-container show-sidebar'}>
<div className="content">
  <header>
    <Logo/>
  </header>
  <Navlinks/>
</div>
        </div>
    </Wrapper>
  )
}

export default BigSideBar