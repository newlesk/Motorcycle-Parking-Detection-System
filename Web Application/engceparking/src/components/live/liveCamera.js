import React, { Component } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { Card } from 'react-bootstrap';

import AutoScale from 'react-auto-scale';


import { Line } from 'react-chartjs-2';
import moment from 'moment';



let dataImageC =''
let dataImageC2 =''
let dataImageC3 =''



const parking = (props) => {
  const { parking } = props;
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
                      width: '450px' ,backgroundColor: '',
                    }}>
          <h5>กล้องแผนกวิศวกรรมคอมพิวเตอร์</h5>
         
          <br></br>
          
          <ul className="online-users" style={{width:'100%',position: 'absolute'}}>
            
          
          
            {parking && parking.map(item => {
              
              if(String(item.base64).length >=100){
                dataImageC = item.base64;
            }
              if(String(item.base64C2).length >=100){
                dataImageC2 = item.base64C2;
            }
            if(String(item.base64C3).length >=100){
              dataImageC3 = item.base64C3;
          }
              
            }
            
            
            
            
            
            )}
            
            </ul>
            <h6>กล้องตัวที่ 1</h6>
            <img style={{  width: '100%' }} src={`data:image/jpeg;base64,${dataImageC}`} />
          
         
          
            <br></br>
            <h6>กล้องตัวที่ 2</h6>
            <img style={{  width: '100%' }} src={`data:image/jpeg;base64,${dataImageC2}`} />
            <br></br>
            <h6>กล้องตัวที่ 3</h6>
            <img style={{  width: '100%' }} src={`data:image/jpeg;base64,${dataImageC3}`} />
            </Card>
            </AutoScale>

           
            
            
            
            
           
            

            
        
        

            
            
            
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}



export default compose(
  firestoreConnect(() => ['parking']), // or { collection: 'todos' }
  connect((state, props) => ({
    parking: state.firestore.ordered.parking
  }))
)(parking)