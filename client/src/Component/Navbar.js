import React, { useContext } from 'react'

import { Link, useNavigate} from 'react-router-dom'
import { userContext } from '../App'
const Navbar = () => {
    const navigate = useNavigate()
    const { state, dispatch } = useContext(userContext)
    const renderList = () => {
        if (state) {
            return [<>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/createpost">Create Post</Link></li>
                <li><Link to="/myfollowers">My following post</Link></li>
                <li><button
                className="btn waves-effect waves-light purple" type="submit" name="action"
                onClick={()=>{
                    localStorage.clear()
                    dispatch({type:"CLEAR"})
                    navigate("/login")
                }}>LogOut
                </button></li>
            </>]
        }
        else {
            return [<>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </>]
        }
    }

    return (
        <nav>
            <div className="nav-wrapper purple">
                <Link to={state ? "/" : "/login"} className="brand-logo b">My Social Network</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}
export default Navbar