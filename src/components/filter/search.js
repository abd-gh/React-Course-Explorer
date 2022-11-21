import React, { useState } from "react";
import './search.css';

const Search=(props)=>{
   // const[SearchValue,setSearchValue]=useState("");
    const searchEntredHandler=(event)=>{
        //setSearchValue(event.target.value);
        props.onInsertSearch(event.target.value);
    }
return(
    <div className="search-field">
        <p>Search</p>
        <input className="search-input" type="text" onChange={searchEntredHandler}/>
    </div>
)
}

export default Search;