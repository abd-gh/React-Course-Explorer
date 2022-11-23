import React from "react";
import './sortBy.css';

const SortBy=(props)=>{
    const sortSelectHandler=(event)=>{  
        props.onSelectSort(event.target.value);
        //console.log(event.target.value);
    }
return(
<select onChange={sortSelectHandler} className="sort-by__select">
    <option> Name of course</option>
    <option>Course supplier</option>
    <option>Descending Course length</option>
    <option>Ascending Course length</option>
    <option>Review date</option>
    <option>Nr of stars</option>


</select>
)
};

export default SortBy;