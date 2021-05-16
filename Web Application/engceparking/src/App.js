import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetail from './components/project/Projectdetail'
import SignIn from './components/auth/Signin'
import SignUp from './components/auth/Signup'
import CreateProject from './components/project/Createproject'
import emptyPage from './components/empty/emptyPage';
import forgetpassword from './components/forgetpassword/forgetpassword';
import notifications from './components/dashboard/Notifications'
import liveCamera from './components/live/liveCamera'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/project/:id' component={ ProjectDetail}/>
        <Route path='/signin' component={SignIn}/>
        <Route path='/signup' component={SignUp}/>
        <Route path='/create' component={CreateProject}/>
        <Route path='/empty'  component={emptyPage}/>
        <Route path='/forgetpassword'  component={forgetpassword}/>
        <Route path='/notifications'  component={notifications}/>
        <Route path='/liveCamera'  component={liveCamera}/>

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
