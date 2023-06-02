const UserMessageProfile = ({ user }) => {
  return (
    <div className="userDetailsBoxM">
      <div className="userImgBox">
        <img src="../images/inputIcons/profile.png" alt="icon" />
      </div>

      <div className="userDetailBoxMChild">
        <h5>{`${user.firstName} ${user.lastName}`}</h5>
        <h6>Last Message</h6>
      </div>
    </div>
  );
};

export default UserMessageProfile;
