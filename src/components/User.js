import Nav from "./Nav";
import { useState, useEffect } from "react";
import { Users } from "../config";
import Usercard from "./Usercard.js";

const User = () => {
  const itemsPerPage = 20;
  const [filteredUsers, setFilteredUsers] = useState(
    Users.map((user) => ({ ...user, isChecked: false }))
  );
  const [currUsers, setCurrUser] = useState(
    Users.map((user) => ({ ...user, isChecked: false }))
  );
  const [originalUser, setOriginalUser] = useState(Users);
  const [selectedDomain, setSelectedDomain] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [createTeam, setCreateTeam] = useState(false);
  const [domainArray, setDomainArray] = useState([]);

  useEffect(() => {
    setOriginalUser(Users.map((user) => ({ ...user, isChecked: false })));
    console.log(originalUser);
  }, []);
  useEffect(() => {
    filterUsers();
  }, [selectedDomain, selectedGender, selectedAvailability, currUsers]);

  const handleCheckboxChange = (type, value) => {
    switch (type) {
      case "Domain":
        setSelectedDomain((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "Gender":
        setSelectedGender((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      case "Availability":
        setSelectedAvailability((prev) =>
          prev.includes(value)
            ? prev.filter((item) => item !== value)
            : [...prev, value]
        );
        break;
      default:
        break;
    }
  };

  const filterUsers = () => {
    const filteredUsers = currUsers.filter((user) => {
      const domainMatch =
        selectedDomain.length === 0 || selectedDomain.includes(user.domain);

      const genderMatch =
        selectedGender.length === 0 || selectedGender.includes(user.gender);
      let userAvail = user.available.toString();
      userAvail = userAvail.charAt(0).toUpperCase() + userAvail.slice(1);
      const availabilityMatch =
        selectedAvailability.length === 0 ||
        selectedAvailability.includes(userAvail);

      return domainMatch && genderMatch && availabilityMatch;
    });
    setFilteredUsers(filteredUsers);
  };

  // const handleChildValue = (value) => {
  //   // setFilteredUsers(value2);
  //   settext(value);
  // };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const usersToDisplay = filteredUsers.slice(startIndex, endIndex);

  function filterdata(searchtext) {
    const temUser = originalUser.filter(
      (user) =>
        // user?.first_name?.toLowerCase()?.includes(searchtext?.toLowerCase())
        searchtext === user?.first_name?.slice(0, searchtext.length)
    );
    setCurrUser(temUser);
    setFilteredUsers(temUser);
    setCurrentPage(1);
  }
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const uniqueDomains = [...new Set(Users.map((user) => user.domain))];

  // console.log(uniqueDomains);

  // createTeam functions
  function handleCreateteam(e) {
    console.log(e);
    setCreateTeam(e);
  }

  const checkAlreadySelected = (userId, domain, isChecked) => {
    if (isChecked) {
      setDomainArray((prev) =>
        prev.includes(domain)
          ? prev.filter((item) => item !== domain)
          : [...prev, domain]
      );
      handleCheckboxChangeCreateTeam(userId, domain);
      return;
    }
    let ret = false;
    domainArray.map((prev) => {
      if (prev === domain) {
        ret = true;
        return;
      }
    });
    if (!ret) {
      setDomainArray((prev) => [...prev, domain]);
      handleCheckboxChangeCreateTeam(userId, domain);
    } else {
      return alert("Domain should be unique");
    }
  };

  const handleCheckboxChangeCreateTeam = (userId, domain) => {
    setFilteredUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId && user.available
          ? { ...user, isChecked: !user.isChecked }
          : user
      )
    );
  };
  return (
    <>
      <Nav
        title="user"
        filterData={filterdata}
        handleCreateTeam={handleCreateteam}
      />

      <div className="user_body">
        <aside className="user_item1">
          <div className="user_filters">
            <h2>Filtered by</h2>
            <div>
              <h3>Domain</h3>
              {uniqueDomains.map((domain) => (
                <div key={domain}>
                  <input
                    type="checkbox"
                    id={`domainCheckbox_${domain}`}
                    name="domainCheckbox"
                    checked={selectedDomain.includes(domain)}
                    onChange={() => handleCheckboxChange("Domain", domain)}
                  />
                  {domain}
                </div>
              ))}
            </div>

            <div>
              <h3>Gender</h3>
              {["Male", "Female"].map((gender) => (
                <div key={gender}>
                  <input
                    type="checkbox"
                    id={`genderCheckbox_${gender}`}
                    name="genderCheckbox"
                    checked={selectedGender.includes(gender)}
                    onChange={() => handleCheckboxChange("Gender", gender)}
                  />
                  {gender}
                </div>
              ))}
            </div>

            <div>
              <h3>Availability</h3>
              {["True", "False"].map((availability) => (
                <div key={availability}>
                  <input
                    type="checkbox"
                    id={`availabilityCheckbox_${availability}`}
                    name="availabilityCheckbox"
                    checked={selectedAvailability.includes(availability)}
                    onChange={() =>
                      handleCheckboxChange("Availability", availability)
                    }
                  />
                  {availability}
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="user_item2">
          {usersToDisplay.length === 0 && (
            <h2 className="no_user">
              No user found according to your filters.
            </h2>
          )}
          {usersToDisplay.map((user) => {
            return (
              <Usercard
                key={user.id}
                {...user}
                createTeam={createTeam}
                checkAlreadySelected={checkAlreadySelected}
              />
            );
          })}

          <div className="pagination-container">
            {[
              ...Array(Math.ceil(filteredUsers.length / itemsPerPage)).keys(),
            ].map((pageNumber) => (
              <button
                key={pageNumber + 1}
                onClick={() => handlePageChange(pageNumber + 1)}
                // className={currentPage === pageNumber + 1 ? "active" : ""}
                className="page_button"
              >
                {pageNumber + 1}
              </button>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default User;
