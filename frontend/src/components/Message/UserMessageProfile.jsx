const UserMessageProfile = ({ user }) => {
  return (
    <div className="userDetailsBoxM">
      <div className="userImgBox">
        <img
          src={
            user?.profileImage === ""
              ? "../images/inputIcons/profile.png"
              : user?.profileImage
          }
          alt="icon"
        />
      </div>

      <div className="userDetailBoxMChild">
        <h5>{`${user.firstName} ${user.lastName}`}</h5>
        <h6>{user.userName}</h6>
      </div>
    </div>
  );
};

export default UserMessageProfile;
