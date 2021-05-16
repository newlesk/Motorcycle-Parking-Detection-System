import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  return (
    <div>
      <ul className="left">
      <li><NavLink to='/' className="btn btn-floating blue lighten-1">
          { props.profile.initials}
          </NavLink>
        </li>

      </ul>
      <ul className="right" >
        <li><NavLink to='/create' style={{  color: 'black'}}>Edit Profile</NavLink></li>
        <li><a onClick={props.signOut} style={{  color: 'black'}}>Log Out</a></li>
        <li><NavLink to='/empty' style={{  color: 'black'}} >Parking</NavLink></li>
        
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)