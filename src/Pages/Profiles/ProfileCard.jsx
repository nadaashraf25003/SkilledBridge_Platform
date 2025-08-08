// Style
import "/src/index.css";
import "./Profiles.css";

// Assets
import userPhoto from "/src/assets/User.png";

// React
import { Card } from "react-bootstrap";
import { useContext } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

// Components
import { AuthContext } from "../../Contexts/AuthContext";

function ProfileCard({ profile }) {
  const { userType } = useContext(AuthContext);
  const navigate = useNavigate();

  const showingUser = () => {
    if (userType === "Freelancer") {
      navigate(
        `/FreelancerProfile/${profile.name ? profile.name : "User Name"}`,
        {
          state: { profile },
        }
      );
      // return <FreelancerProfile/>
    } else {
      console.log("loggedUseremail", user);
      navigate(`/ClientProfile/${profile.name ? profile.name : "User Name"}`, {
        state: { profile },
      });
      // return <ClientProfile/>
    }
  };
  
  return (
    <>
      <Card className="h-100 shadow-sm col-lg-3 m-2 theme-card">
        <Card.Body className="text-center d-flex flex-column">
          <div className="mb-3">
            <div className="mx-auto rounded-circle profile-avatar">
              {profile.logo ? (
                <img
                  src={profile.logo}
                  alt={profile.name}
                  className="img-fluid rounded-circle"
                />
              ) : (
                <img
                  src={userPhoto}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                />
              )}
            </div>
          </div>

          <Card.Title className="profile-name">{profile.name}</Card.Title>
          <Card.Subtitle className="mb-2 profile-type">
            {profile.userType}
          </Card.Subtitle>

          <div className="my-3 flex-grow-1">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <small className="profile-stats" style={{color: "#6c757d"}}>
                {profile.jobsPosted || 0} jobs
                {profile.userType === "Freelancer" ? " started" : " posted"}
              </small>
            </div>
            <p className="profile-email">{profile.email}</p>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-auto">
            {profile.userType === "Freelancer" ? (
              <Link to={`/FreelancerProfile/${profile.name}`}>
                <button className="button">View {profile.userType}</button>
              </Link>
            ) : (
              <Link to={`/ClientProfile/${profile.name}`}>
              <button className="button" onClick={showingUser}>
                View {profile.userType}
              </button>
               </Link>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default ProfileCard;
