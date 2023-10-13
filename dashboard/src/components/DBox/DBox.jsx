import React from 'react'
import styles from './Dbox.module.css';
import DPieChart from '../DPieChart/DPieChart';
import smallGraph from '../../assets/dashboard/small_box_graph.png'
const DBox = ({title}) => {
  return (
    <div className={styles.Dbox} >
       
        <div>
            <div>
            <DPieChart />
            </div>
        </div>
        <div className={`${styles.Dbox_content}`}>
            <span className={`${styles.Dbox_content_title}`}>{title}</span>
            <br />
            <small className='text-danger' style={{fontWeight: 600}}>40%</small>
        </div>
    </div>
  )
}




export default DBox;




