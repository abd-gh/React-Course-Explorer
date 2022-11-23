import React, { useEffect, useState } from "react";
//import { async } from '@firebase/util';
import { db } from "../../firebase-config.js";
import { addDoc, collection, doc, getDocs, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
//import { query, where, limit } from "firebase/firestore";
import './rate.css';
import CustomPopup from "../CustomProp/Popup.js";


const Rate = ({ myProp, myUser, done }) => {

    const[clcikedIndex,setClcikedIndex]=useState();
    const [visibility, setVisibility] = useState(false);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const CourseEvaluationCollectionRef = collection(db, "Course_Evaluation");
    const [rateChange, setRateChange] = useState(0);

    const update = async (id, rate, points, count) => {
        const courseDoc = doc(db, "Courses", id)
        const newFields = {
            Points: points + rate,
            count: count + 1,
            Rate_Avg: (points + rate) / (count + 1),
            Last_Review_date: new Date(),
            Last_Review_Name: myUser
        }
        await updateDoc(courseDoc, newFields)
        setRateChange(oldKey => oldKey + 1);
        done(rateChange);

    }
    /*const showPop=()=>{
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                //onClick: () => Delete()
              },
              {
                label: 'No',
                //onClick: () => alert('Click No')
              }
            ]
          });
    }*/
    const popupCloseHandler = () => {
        setVisibility(false);
    };

    const addRating = async (index, id, points, count) => {

        await addDoc(CourseEvaluationCollectionRef, {
            Course_Id: id,
            Username: myUser,
            date: new Date,
            rate: index
        });
        setRating(index);
        update(id, index, points, count);
    }
    return (
        <div className="course-evaluate ">
           
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {

                    index += 1;
                    return (
                        <button
                            type="button"
                            key={index}

                            className={index <= (hover || Math.round(myProp.Rate_Avg)) ? "on" : "off"}
                             onClick={() =>{if(window.confirm('Do you really want to evaluate a '+myProp.Name+' course with '+index+' stars?')){addRating(index, myProp.id , myProp.Points, myProp.count)};}  /*setRating(index)*/}
                            //onClick={() =>{showPop()}} 
                           // onClick={() => {setVisibility(true); setClcikedIndex(index)}}
                            onMouseEnter={() => setHover(index)}
                            onMouseLeave={() => setHover(Math.round(myProp.Rate_Avg))}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                    );
                })}
            </div>
            <div className="last-review">
                <p >last review</p>
                <p >{myProp.Last_Review_Name}</p>
                <p >{myProp.Last_Review_date && (myProp.Last_Review_date.toDate()).toLocaleString()}</p>
            </div>
            <CustomPopup
                onClose={popupCloseHandler}
                show={visibility}
                title={myProp.Name}
            >
                
                <h2>Do you really want to evaluate a {myProp.Name} course with {clcikedIndex} stars?</h2>
            </CustomPopup>
        </div>
    )
}

export default Rate;







