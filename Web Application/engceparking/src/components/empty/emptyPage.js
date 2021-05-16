import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

// import MapIcon from '@material-ui/icons/Map';

import { Card } from 'react-bootstrap';

import AutoScale from 'react-auto-scale';

import MapImage from './MAPCE.jpg';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { Link } from 'react-router-dom'


// import { Map, GoogleApiWrapper } from 'google-maps-React';

// const data = {
  
//   labels: ['1', '2', '3', '4', '5', '6'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       fill: false,
//       backgroundColor: 'rgb(255, 99, 132)',
//       borderColor: 'rgba(255, 99, 132, 0.2)',
//     },
//   ],
// }

// const options = {
//   scales: {
//     yAxes: [
//       {
//         ticks: {
//           beginAtZero: true,
//         },
//       },
//     ],
//   },
// }

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


const parking = (props) => {
  console.log("count =="+count);
  const { parking } = props;
  const { cameraRealTime } = props;
  
  count = 0;
  countRedTop = 0;
  countGreenTop = 0;
  countGreenButtom = 0;
  countRedButtom = 0;
  return (
    
        
        <AutoScale maxScale={3}>
          <Card style=
                    {{
                      width: '1050px' ,height:'700px',backgroundColor: '',
                    }}>
          <h4>แผนกวิศวกรรมคอมพิวเตอร์</h4>
          {/* <Line data={data} width={1000} height={500} options={options} />
          <p> แกนX แสดง    แกนY แสดง   </p>
          <p>1. EIEI = {moment("2021-03-30 12:22:53.325358").format('YYYY-MM-DD HH:mm:ss')} </p>
           */}
          <br></br>
          <img src={MapImage} alt="Map" style={{height: '500px',marginRight:'1700px'}}/>
          <ul className="online-users" style={{width:'100%',position: 'absolute',marginTop:'-300px',marginLeft:'300px'}}>
            
            
          
          
            {parking && parking.map(item => {
              
            //   if(String(item.base64).length >=100){
            //     dataImageC = item.base64;
            // }
            //   dataImageL = item.base64L;
            //   if(String(item.base64C3).length >=100){
            //       dataImageC3 = item.base64C3;
            //   }
              console.log(dataImageC);
              
            
             console.log("count =="+count);
             
             if(String(item.base64).length >=100||String(item.base64L).length>=100||String(item.base64C3).length>=100||String(item.base64C2).length>=100){
               console.log("have base64")
             }else{
              count++;

              if(count  <= 17){
                if(item.color == 'red'){
                  console.log("red    "+item.color)
                  countRedTop ++;
                  return <td>
                    <span style={{backgroundColor: 'red',fontSize: '1px',marginBottom: '1px',marginLeft: '0px',padding: '15px 5px',border: '1px solid',borderRadius: '3px',}}> </span>
                  </td>
                  
                }else{
                  countGreenTop ++;
                  console.log("green    "+item.color)
                  return <td> 
                      <span style={{backgroundColor: 'green',fontSize: '1px',marginLeft: '0npm i React-google-mapspx',marginBottom: '1px',padding: '15px 5px', border: '1px solid',borderRadius: '3px',}}></span>
                  </td>
                }
               
             

                
                
              }
              
              if(count == 18){
                return  <td>
                <Card style={{width: '0px',marginLeft: '20px'}}> </Card>
              </td>
              }


              if(count > 18){
                if(item.color == 'red'){
                  console.log("red    "+item.color)
                  countRedButtom ++;
                  return <td>
                    <span style={{backgroundColor: 'red',fontSize: '1px',marginBottom: '1px',marginLeft: '0px',padding: '15px 5px',border: '1px solid',borderRadius: '3px',}}> </span>
                  </td>
                }else{
                  countGreenButtom ++;
                  console.log("green    "+item.color)
                  return <td> 
                      <span style={{  backgroundColor: 'green',fontSize: '1px',marginLeft: '0px',marginBottom: '1px',padding: '15px 5px', border: '1px solid',borderRadius: '3px',}}></span>
                  </td>
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
          
          
          <Card style={{ marginTop: '-510px', marginLeft: '300px', width: '380px' , height: '200px' ,backgroundColor: 'lightblue',}}>
          <Card.Title>ทค.101</Card.Title>
          <br></br><br></br><br></br><br></br>
         
            <Card style={{ marginTop: '-100px',marginLeft: '100px', width: '200px' ,height: '100px'  ,backgroundColor: colorBoxCount,}}>
            <Card.Title  >
            <h4 style={{textalign: 'center',fontSize: '18px'}} >    ว่าง </h4> 
            
            <span style={{fontSize: '50px'}}>{17-countRedTop} </span>
            <span style={{marginLeft: '5px',fontSize: '18px'}}>/17 </span>
            </Card.Title>
            
            </Card>
            
            {/* <AutoScale maxWidth={1920} maxHeight={1080} maxScale={3}>
            <Card style={{  width: '100px',height: '100%' }}>
            <img style={{  width: '100%' }} src={`data:image/jpeg;base64,${dataImageC}`} />
            
            </Card>
            </AutoScale> */}
            <Link to="/liveCamera">
            <button className="btn red lighten-1 z-depth-0" style={{height:'35px',width:'140px',fontSize: '20px'}}>Live View</button>
            </Link>
          </Card>
          
         
          <Card style={{ marginTop: '-215px', marginLeft: '700px', width: '300px' , height: '200px' ,backgroundColor: 'lightblue',}}>
            
              <Card.Title>ห้องพักอาจารย์</Card.Title>
              <br></br><br></br><br></br><br></br>
          
            <Card style={{ marginTop: '-100px',marginLeft: '50px', width: '200px' ,height: '100px' ,backgroundColor: colorBoxCountButtom,}}>
            <Card.Title  >
            <h4 style={{textalign: 'center',fontSize: '18px'}} >    ว่าง </h4> 
            <span style={{fontSize: '50px'}}>{13-countRedButtom} </span>
            <span style={{marginLeft: '5px',fontSize: '16px'}}>/13 </span>
            </Card.Title>
            
            </Card>
            
            {/* <AutoScale maxWidth={1920} maxHeight={1080} maxScale={3}>
            <Card style={{  width: '640px',height: '100%' }}>
            <img style={{  width: '100%' }} src={`data:image/jpeg;base64,${dataImageC3}`} />
            </Card>
            </AutoScale> */}

            <Link to="/liveCamera">
            <button className="btn red lighten-1 z-depth-0" style={{height:'35px',width:'140px',fontSize: '20px'}}>Live View</button>
            </Link>
            </Card>
            <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
            
            <button className="btn blue lighten-1 z-depth-0"
    type="button"
    onClick={(e) => {
      e.preventDefault();
      window.location.href='https://maps.app.goo.gl/cnQLjxwfapcYmWXb6';
      }}
> google map</button>
            </Card>
            
            </AutoScale>
            

           
            
            
            
            
           
            

            
        
        

            
            
            
    
  )
}



export default compose(
  firestoreConnect(() => ['parking']), // or { collection: 'todos' }
  connect((state, props) => ({
    parking: state.firestore.ordered.parking
  }))
)(parking)