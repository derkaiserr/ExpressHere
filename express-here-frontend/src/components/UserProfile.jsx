import '../styles/UserProfile.css'
import NavBar from './NavBar';
import MainDash from './MainDash';
import SideBar from './SideBar';

function UserProfile(props) {
  return(<>
  <NavBar isLogged={props.isLogged}/>
  <div class="grid-parent">

    <section class="sidebar">
        <SideBar/>
    </section>
    <section class="main-content">
        <MainDash/>
    </section>
  </div>

  </>);
}

export default UserProfile;