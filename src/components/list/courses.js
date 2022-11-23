
import React, { useEffect, useState } from "react";
import { async } from '@firebase/util';
import { db } from "../../firebase-config.js";
import { addDoc, collection, doc, getDocs, orderBy, onSnapshot, updateDoc } from "firebase/firestore";
import { query, where, limit } from "firebase/firestore";
import './courses.css';
import Rate from "./rate.js";
import CreateCourse from "../Create-Course/CreateCourse.js";


const Courses = (props) => {

    const [rateChange, setRateChange] = useState();
    const [ourAvg, setOurAvg] = useState([]);

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const [haveReload, setHaveReload] = useState(0);
    //tabel in DB
    const [ourCourses, setOurCourses] = useState([]);
    //connection
    const CourseEvaluationCollectionRef = collection(db, "Course_Evaluation");
    const coursesCollectionRef = collection(db, "Courses");
    useEffect(() => {
        const getCourses = async () => {
            const data = await getDocs(coursesCollectionRef)
            setOurCourses(
                data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        getCourses()
    }, [props.Refresh, rateChange]);

    let SortedCourse = [...ourCourses].sort((a, b) => a.Name > b.Name ? 1 : -1,);
    if (props.SortBy == "Course supplier") {
        SortedCourse = [...ourCourses].sort((a, b) => a.supplier > b.supplier ? 1 : -1,);
    }
    else if (props.SortBy == "Descending Course length") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Course_length > b.Course_length ? -1 : 1,);
    }
    else if (props.SortBy == "Ascending Course length") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Course_length > b.Course_length ? 1 : -1,);
    }
    else if (props.SortBy == "Name of course") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Name > b.Name ? 1 : -1,);
    }
    else if (props.SortBy == "Review date") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Last_Review_date > b.Last_Review_date ? -1 : 1,);
    }
    else if (props.SortBy == "Nr of stars") {
        SortedCourse = [...ourCourses].sort((a, b) => a.Rate_Avg > b.Rate_Avg ? -1 : 1,);
    }

    const SearchCourse = SortedCourse.filter(x => {
        return x.Name.toLowerCase().match(new RegExp(props.LookFor, 'g')) ||
            x.Skills_Learned.toLowerCase().match(new RegExp(props.LookFor, 'g')) ||
            x.Description.toLowerCase().match(new RegExp(props.LookFor, 'g')) ||
            x.supplier.toLowerCase().match(new RegExp(props.LookFor, 'g')) ||
            x.Instructor.toLowerCase().match(new RegExp(props.LookFor, 'g'));
    });


    const reload = (answer) => {
        setHaveReload(answer);
    }



    const rateChanged = (c) => {
        setRateChange(c);
        //console.log('course '+c);
    }

    return (
        <>
            
            {SearchCourse.map((course) => {
                return (
                    <>
                        <div className="bottom">
                            <h2>{course.Name}</h2>
                            <div className="course-body">
                                <div className="course-information">
                                    <p className="course-sourse">{course.Instructor}, {course.supplier}</p>
                                    <p className="course-description">{course.Description}</p>
                                    <p>Length: {course.Course_length}   Month </p>
                                    <p className="course-skills">Skills: {course.Skills_Learned}   </p>
                                </div>
                                <Rate myProp={course} myUser={props.currentu} done={rateChanged} />
                            </div>
                        </div>

                    </>
                )
            })}
        </>


    )
}





export default Courses; 