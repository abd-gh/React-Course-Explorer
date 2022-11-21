import React, { useState } from "react";
import Search from "./search";
import './filterBar.css';
import SortBy from "./sortBy";
import Courses from "../list/courses";

const FilterBar = (props) => {
    //console.log(props.reload);
   // const[refreshAction,setRefreshAction]=useState(props.reload);
  //  setRefreshAction(props.reload);

    const [searchedValue, setSearchedValue] = useState('');
    const [sortedValue, setSortedValue] = useState('');
    const[usname,setUsname]=useState(props.uname);
 
    const seachedChangeHandler = (x) => {    
        setSearchedValue(x);
       // console.log(x);
    };
    const SelectedChangeHandler = (y) => {    
        setSortedValue(y);
      //  console.log(y);
    };

   
    return (
        <>
        <div className='filter-bar'>
            <h1 className='filter-bar__right'>
                Courses 
            </h1>
            <div className='filter-bar__left'>
                <Search onInsertSearch={seachedChangeHandler}/>
                <SortBy onSelectSort={SelectedChangeHandler}/>
                
            </div>
        </div>
        <Courses SortBy={sortedValue} LookFor={searchedValue} currentu={usname} />
        </>
    )
};

export default FilterBar;