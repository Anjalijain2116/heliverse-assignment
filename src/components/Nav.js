import { IoIosHome } from "react-icons/io";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";



const Nav = (props) => {
  const [isTeam, setisTeam] = useState();   //to check we are on team page or not
  
  const [searchtext, setsearchtext] = useState("");


  // function handleClick() {
  //   setisTeam((prev) => !prev);
  //   return props.setCreateTeam(isTeam);
  // }

  useEffect(() => {

    //this will set team accroding to our page
    props.title === "user" ? setisTeam(true) : setisTeam(false);
  }, []);

  return (
    <div className="nav">
      <Link to="/">
      <IoIosHome className="home" />
      </Link>
      <div className="search-container">
        <input
          type="text"
          value={searchtext}
          className="search-input"
          placeholder="Search"
          onChange={(e) => {
            setsearchtext(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            return props.filterData(searchtext);
          }}
        >
          Search
        </button>
      </div>

     

      {isTeam ? (
        <button
          className="nav_btn"
          onClick={() => {
            setisTeam((prev) => !prev);
            return props.handleCreateTeam(isTeam);
          }}
        >
          Create team
        </button>
      ) : (
        <button
          className="nav_btn"
          onClick={() => {
            setisTeam((prev) => !prev);
            return props.handleCreateTeam(isTeam);
          }}
        >
          Users
        </button>
      )}
    </div>
  );
};

export default Nav;
