import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
  const { notifications } = props;
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className= "card-title">Notifications</span>
          <table className="online-users">
            { notifications && notifications.map(item =>{
              return <tr key={item.id}>
                
                <td >เวลาเข้า </td>
                <td style={{fontWeight:'bold'}}>{item.time}</td>
                <td >รถทะเบียน </td>
                <td className="pink-text">{item.licenceplate} </td>
                
              </tr>
            })}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Notifications