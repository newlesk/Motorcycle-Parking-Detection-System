import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './Signedinlink'
import SignedOutLinks from './Signedoutlink'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile } = props;
  // console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile} /> : <SignedOutLinks />;

  return (
    <nav className="nav-wrapper white darken-3">
      <div className="container">
        <Link to='/' className="brand-logo"></Link>
        {links}
      </div>
    </nav>
  )
}

const mapStateToProps = (state) => {
  // console.log(state);
  return{
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)