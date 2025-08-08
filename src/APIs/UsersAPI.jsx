// Style
import "/src/index.css";
import "./api.css";
import "/src/Pages/Profiles/Profiles.css";

// Assets
import userPhoto from "/src/assets/User.png";

// React
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from 'react-router';
import capitalize from '@mui/utils/capitalize';

function UsersAPI() {
  const [UsersProfiles, setUsersProfiles] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((response) => response.json())
      .then((data) => setUsersProfiles(data))
      
  }, []);

  return (
    <>
      {UsersProfiles.map((user) => (
        
        <Card className="h-100 shadow-sm col-lg-3 m-2 theme-card">
        <Card.Body className="text-center d-flex flex-column">
          <div className="mb-3">
            <div className="mx-auto rounded-circle profile-avatar">
              {user.logo ? (
                <img
                  src={user.logo}
                  alt={user.username}
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

          <Card.Title className="profile-name">{capitalize(user.name.firstname)} {capitalize(user.name.lastname)}</Card.Title>
          <Card.Subtitle className="mb-2 profile-type">
            {user.username}
          </Card.Subtitle>

          <div className="my-3 flex-grow-1">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <small className="profile-stats" style={{color: "#6c757d"}}>
                {user.address.city }
              </small>
            </div>
            <p className="profile-email">{user.email}</p>
          </div>

          <div className="d-flex justify-content-center align-items-center mt-auto">
            <Link to={`/FreelancerProfile/${user.username}`}>
            <button className="button">View User</button>
            </Link>
          </div>
        </Card.Body>
      </Card>
      ))}
    </>
  );
}

export default UsersAPI;
