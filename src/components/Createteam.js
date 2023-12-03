import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Usercard from "./Usercard.js";
import { Users } from "../config";
// import Link from 'react-router-dom'

const itemsPerPage = 20;

const Createteam = () => {
  const [allUsers, setAllUsers] = useState(
    Users.map((user) => ({ ...user, isChecked: false }))
  );
  const [filterUser, setFilterUser] = useState(allUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState([]);

  useEffect(() => {
    setFilterUser(
      allUsers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    );
  }, [allUsers, currentPage]);

  function filterdata(searchtext) {
    const tempUser = Users.filter((user) =>
      user?.domain?.toLowerCase()?.includes(searchtext.label?.toLowerCase())
    );

    setAllUsers(tempUser);
    setCurrentPage(1);
    setSelectedDomain([]);
  }

  const checkAlreadySelected = (userId, domain) => {
    let ret = false;
    selectedDomain.map((prev) => {
      if (prev === domain) {
        ret = true;
        return;
      }
    });
    if (!ret) {
      setSelectedDomain((prev) => [...prev, domain]);
      handleCheckboxChange(userId, domain);
    } else {
      return alert("Domain should be unique");
    }
  };

  const handleCheckboxChange = (userId, domain) => {
    setAllUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId && user.available
          ? { ...user, isChecked: !user.isChecked }
          : user
      )
    );
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Nav title="create-team" filterData1={filterdata} />
      

      <div className="btn_div">
        <button className="save_btn">Save</button>
      </div>

      {filterUser.map((user) => (
        <div key={user.id} className="team_card">
          <input
            type="checkbox"
            checked={user.isChecked}
            onChange={() => checkAlreadySelected(user.id, user.domain)}
            // disabled={selectedDomain && selectedDomain !== user.domain && user.isChecked}
          />
          <Usercard {...user} />
        </div>
      ))}

      {/* Pagination controls */}
      <div className="pagination-container">
        {[...Array(Math.ceil(allUsers.length / itemsPerPage)).keys()].map(
          (pageNumber) => (
            <button
              key={pageNumber + 1}
              onClick={() => handlePageChange(pageNumber + 1)}
              className="page_button"
            >
              {pageNumber + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default Createteam;
