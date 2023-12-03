//this is for display users

const Usercard = ({
  id,
  first_name,
  last_name,
  email,
  avatar,
  domain,
  available,
  gender,
  isChecked,
  checkAlreadySelected,
  createTeam,
}) => {
  return (
    <div className="user_card">

      {/* this input will only show on create team page */}
      {createTeam && (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => checkAlreadySelected(id, domain, isChecked)}
          disabled={!available}
          // disabled={selectedDomain && selectedDomain !== user.domain && user.isChecked}
        />
      )}
      {/* this is for cards */}
      <img className="img" src={avatar} alt="card is not there"/>
      <div className="card_text">
        <h3>
          {first_name} {last_name}
        </h3>
        <div>Email : {email}</div>
        <div>Domain : {domain}</div>
        <div>Gender : {gender}</div>
        <div>Availability : {available === true ? "True" : "False"}</div>
      </div>
    </div>
  );
};

export default Usercard;
