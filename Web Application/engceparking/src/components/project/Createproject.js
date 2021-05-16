import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import licensePlateImage from './DSCF4666.jpg';

class CreateProject extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    licensePlateTop: '',
    licensePlateNumber:'',
    LineNotifyToken: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.createProject(this.state);
    this.props.history.push('/');
  }
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/signin' /> 
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Edit Your Profile</h5>
          <table style=
                  {{width:'100%',
                  
                  border: '2px solid',
                  
                  }}>
          <h7>Please confirm email and password</h7>
          <tr>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input  type="email" id='email' onChange={this.handleChange} />
            
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id='password' onChange={this.handleChange} />
            
          </div>
          </tr>
          </table>
          
          {/* <div className="input-field">
            <label htmlFor="password">confirm Password</label>
            <input type="password" id='confirmPassword' onChange={this.handleChange} />
            
          </div> */}
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id='firstName' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id='lastName' onChange={this.handleChange} />
          </div>
          <h5 className="grey-text text-darken-3">License Plate</h5>
          <img src={licensePlateImage} alt="licensePlateImage" height="200" />;
          
          
          <div className="input-field">
          
            <label htmlFor="licensePlateTop">License Plate Top Ex. 1กก กรุงเทพมหานคร</label>
            <input type="text" id='licensePlateTop' onChange={this.handleChange} />
       
            
          </div>
          <div className="input-field">
            <label htmlFor="licensePlateNumber">License Plate Number Ex. 1056</label>
            <input type="text" id='licensePlateNumber' onChange={this.handleChange} />
    
          </div>
          <h5 className="grey-text text-darken-3">Line Notify Token</h5>
          <div className="input-field">
            <label htmlFor="LineNotifyToken">Line Notify Token</label>
            <input type="text" id='LineNotifyToken' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <button className="btn blue lighten-1">COMMIT</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createProject: (project) => dispatch(createProject(project))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)