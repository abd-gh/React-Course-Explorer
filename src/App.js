import './App.css';
import { useEffect, useState } from 'react';
import Search from './components/filter/search';
import FilterBar from './components/filter/filterBar';
import Courses from './components/list/courses';
import Login from './components/login/login';
import CreateCourse from './components/Create-Course/CreateCourse';

function App() {

  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: ''
  })
  const haveUser = (user) => {
    setCurrentUser(() => {
      return {
        name: user.name,
        email: user.email
      }
    });
  }

  return (
    <div className='body'>
      <div className='top'>
        <h1 className='box-text'>Course Explorer - Qlue</h1>
      </div>
      {(currentUser.name=='')  &&       
          <Login onSaveList={haveUser} />      
      }
      {!(currentUser.name=='') &&           
        <FilterBar uname={currentUser.name} />    
       }
      
    </div>
  );
}

export default App;
