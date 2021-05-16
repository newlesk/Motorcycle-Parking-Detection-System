import React, { Component } from 'react'
import ProjectList from '../project/Projectlist'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { Card } from 'react-bootstrap';
import { string } from 'yup'
import Road from './Road.png';
import Map from './MAPCE.jpg';
import AutoScale from 'react-auto-scale';
import { Link } from 'react-router-dom'




let count = 0;
let countRedTop = 0;
let countGreenTop = 0;
let dataImageC =''
let dataImageC3 =''
let dataImageL =''
let colorBoxCount = 'lightgreen';
let colorBoxCountButtom = 'lightgreen';
let countGreenButtom = 0;
let countRedButtom = 0;
let NotificationsFix = 10;



class Dashboard extends Component {
  
  render() {
    count = 0;
    const { projects, auth, notifications ,parking} = this.props;
    if (!auth.uid) return <Redirect to='/empty' /> 
    count = 0;
    countRedTop = 0;
    countGreenTop = 0;
    countGreenButtom = 0;
    countRedButtom = 0;
  
   

    return (
      
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">


          <div className="section">
      <div className="card z-depth-0">
        <div className="card-content" >
        
        <AutoScale maxScale={3}>
          <Card style=
                    {{
                      width: '600px' ,height: '2000px',
                    }}>
          <h4>แผนกวิศวกรรมคอมพิวเตอร์</h4>
          
          <br></br>
          <img src={Map} alt="Map" width = "500px"/>
          <ul className="online-users" style={{width:'100%',position: 'absolute',marginTop:'-850px',marginLeft:'50px'}}>
            
          
                 
          
          
            {parking && parking.map(item => {
              
              // if(String(item.base64).length >=100){
              //   dataImageC = item.base64;
              // }
              // if(String(item.base64L).length >=100){
              //   dataImageL = item.base64L;
              // }
              // if(String(item.base64C3).length >=100){
              //   dataImageC3 = item.base64C3;
              // }
              // console.log(dataImageL);
             
             //count++;
             console.log("count =="+count);
             
             if(String(item.base64).length >=100||String(item.base64L).length>=100||String(item.base64C3).length>=100||String(item.base64C2).length>=100){
               console.log("have base64")
             }else{
              count++;

              if(count  <= 17){
                if(item.color == 'red'){
                  console.log("red    "+item.color)
                  countRedTop ++;
                  return <tr>
                    <span style={{backgroundColor: 'red',fontSize: '1px',marginBottom: '1px',marginLeft: '180px',padding: '5px 15px',border: '1px solid',borderRadius: '3px',}}> </span>
                  </tr>
                  
                }else{
                  countGreenTop ++;
                  console.log("green    "+item.color)
                  return <tr> 
                      <span style={{backgroundColor: 'green',fontSize: '1px',marginLeft: '180px',marginBottom: '1px',padding: '5px 15px', border: '1px solid',borderRadius: '3px',}}></span>
                  </tr>
                }
               
             

                
                
              }
              
              if(count == 18){
                return  <tr>
                <Card style={{ backgroundColor: '',marginBottom:'55px',marginLeft: '180px',border: '0px solid'}}> </Card>
              </tr>
              }


              if(count > 18){
                if(item.color == 'red'){
                  console.log("red    "+item.color)
                  countRedButtom ++;
                  return <tr>
                    <span style={{backgroundColor: 'red',fontSize: '1px',marginBottom: '1px',marginLeft: '180px',padding: '5px 15px',border: '1px solid',borderRadius: '3px',}}> </span>
                  </tr>
                }else{
                  countGreenButtom ++;
                  console.log("green    "+item.color)
                  return <tr> 
                      <span style={{  backgroundColor: 'green',fontSize: '1px',marginLeft: '180px',marginBottom: '1px',padding: '5px 15px', border: '1px solid',borderRadius: '3px',}}></span>
                  </tr>
                }
                

              }

                
               
             }
             
             

             
                
             if(17-countRedTop<= 5){
              colorBoxCount = 'pink'
              
            }else if(17-countRedTop > 5 && 17-countRedTop<= 10){
              colorBoxCount = 'yellow'
            }else{
              colorBoxCount = 'lightgreen'
            }
            
            if(13-countRedButtom <= 4){
              colorBoxCountButtom = 'pink'
              
            }else if(13-countRedButtom > 4 && 13-countRedButtom<= 7){
              colorBoxCountButtom = 'yellow'
            }else{
              colorBoxCountButtom = 'lightgreen'
            }
              
 
            }
            
            
            
            
            
            )}
            
          </ul>
          
          
          
          <Card style={{ marginTop: '-840px', marginLeft: '280px', width: '200px' , height: '400px' ,backgroundColor: 'lightblue',}}>
          <Card.Title>ทค.101</Card.Title>
          <br></br>
          <AutoScale>
            <Card style={{ marginTop: '-10px',marginLeft: '0', width: '450px' ,height: '100%'  ,backgroundColor: colorBoxCount,}}>
            <Card.Title  >
            <h4 style={{textalign: 'center',fontSize: '50px'}} >    ว่าง </h4> 
            <br></br><br></br><br></br><br></br>
            <span style={{fontSize: '600%'}}>{17-countRedTop} </span>
            <span style={{marginLeft: '50%',fontSize: '300%'}}>/17 </span>
            </Card.Title>
            <br></br><br></br><br></br>
            </Card>
            </AutoScale>
            <AutoScale maxWidth={1920} maxHeight={1080} maxScale={3}>
            <Card style={{  width: '640px',height: '100%' }}>
            <img style={{  width: '100%' }} src={`data:image/jpeg;base64,${dataImageC}`} />
            </Card>
            </AutoScale>
            <Link to="/liveCamera">
            <button className="btn red lighten-1 z-depth-0" style={{height:'35px',width:'140px',fontSize: '20px'}}>Live View</button>
            </Link>
          </Card>
          
         
          <Card style={{ marginTop: '30px', marginLeft: '280px', width: '200px' , height: '300x' ,backgroundColor: 'lightblue',}}>
            
              <Card.Title>ห้องพักอาจารย์</Card.Title>
              <br></br>
          <AutoScale>
            <Card style={{ marginTop: '-25px',marginLeft: '0', width: '450px' ,height: '100%'  ,backgroundColor: colorBoxCountButtom,}}>
            <Card.Title  >
            <h4 style={{textalign: 'center',fontSize: '50px'}} >    ว่าง </h4> 
            <br></br><br></br><br></br><br></br>
            <span style={{fontSize: '600%'}}>{13-countRedButtom} </span>
            <span style={{marginLeft: '50%',fontSize: '300%'}}>/13 </span>
            </Card.Title>
            <br></br><br></br><br></br>
            </Card>
            </AutoScale>
            <AutoScale maxWidth={1920} maxHeight={1080} maxScale={3}>
            <Card style={{  width: '640px',height: '100%' }}>
            <img style={{  width: '100%' }} src={`data:image/jpeg;base64,${dataImageC3}`} />
            </Card>
            </AutoScale>
            <Link to="/liveCamera">
            <button className="btn red lighten-1 z-depth-0" style={{height:'35px',width:'140px',fontSize: '20px'}}>Live View</button>
            </Link>
            </Card>
            <br></br>
            </Card>
            </AutoScale>

           
            
            
            
            
           
            

            
        
        

            
            
            
        </div>
        
      </div>
    </div>
          </div>
          
          <div className="col s12 m5 offset-m1">
          <h5 className="card-title">Licence Plate</h5>
          <br></br>
          
          {parking && parking.map(item => {
           if(String(item.base64L).length >=100){
              return <img style={{  width: '40%' }} src={`data:image/jpeg;base64,${item.base64L}`} />
           }

            
            

          })}
            
              
            
            <Notifications notifications={notifications} />
            
            
            
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    notifications: state.firestore.ordered.notifications
  }
}

export default compose(
  
  firestoreConnect(() => ['parking']), // or { collection: 'todos' }
  connect((state, props) => ({
    parking: state.firestore.ordered.parking
  })),
  connect(mapStateToProps),
  firestoreConnect([
    // { collection: 'projects' ,orderBy: ['createAt','desc']},
    { collection: 'notifications', limit: NotificationsFix, orderBy: ['time','desc']}
  ])
)(Dashboard)