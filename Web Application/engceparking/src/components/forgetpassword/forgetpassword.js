import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ForgetPassword } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'
import { BrowserRouter, Switch, Route,Link} from 'react-router-dom';






class ForgotPassword extends Component {
  state = {
    email: '',
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.ForgetPassword(this.state)
   
  }
  render() {
    const { authError, auth } = this.props;
    if (auth.e) return <Redirect to='/' /> 
    return (
      <div className="container" 

      
      
      >
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">ForgetPassword</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id='email' onChange={this.handleChange} />
          </div>
         
          <div className="input-field">
            <button className="btn blue lighten-1 z-depth-0" style={{width:'100%'}}>Submit</button>
            <div className="center red-text">
            
              { authError ? <p>{authError}</p> : null }
            </div>
            
          </div>

          
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return{
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ForgetPassword: (creds) => dispatch(ForgetPassword(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)