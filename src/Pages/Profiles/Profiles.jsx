// Style
import "/src/index.css";
import "./Profiles.css";

// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Components
import ProfileCard from "./ProfileCard";
import Navbar from "./../../Components/Navbar";
import Footer from "../../Components/Footer";
import AdminOverlay from "../../APIs/AdminOverlay";
import UsersAPI from "../../APIs/UsersAPI";

function Profiles() {
  const [FreelancersProfiles, setFreelancersProfiles] = useState([]);
  const [ClientsProfiles, setClientsProfiles] = useState([]);
  const [showOverlay, setShowOverlay] = useState(false);
  useEffect(() => {
    const freelancers = [];
    const clients = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key.startsWith("j") && !key.startsWith("l")) {
        let value;
        try {
          value = JSON.parse(localStorage.getItem(key));
        } catch (err) {
          // Skip values that are not valid JSON
          continue;
        }
        if (value.userType === "Client") {
          clients.push(value);
        } else if (value.userType === "Freelancer") {
          freelancers.push(value);
        } else {
          continue;
        }
      }
    }
    setFreelancersProfiles(freelancers);
    setClientsProfiles(clients);
  }, []);

  // For Admin
  const [authenticated, setAuthenticated] = useState(false);
  const handleSuccess = () => {
    setAuthenticated(true);
    setShowOverlay(false);
  };
  const navigate = useNavigate();
  if (authenticated) {
    navigate("/userManagement");
  }

  return (
    <>
      <Navbar />
      {showOverlay ? (
        <AdminOverlay
          onSuccess={handleSuccess}
          onClose={() => setShowOverlay(false)}
        />
      ) : (
        ""
      )}
      {}
      <div
        className="container"
        style={{ marginTop: "6rem", marginBottom: "5rem" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="section-title">Clients</h2>
          <button className="button button2" onClick={() => setShowOverlay(true)}>
            Edit Users
          </button>
        </div>
        {ClientsProfiles.length > 0 ? (
          <div className="d-flex flex-wrap justify-content-center">
            {ClientsProfiles.map((profile) => (
              <ProfileCard profile={profile} />
            ))}
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            No Clients Found
          </p>
        )}
      </div>

      <div
        className="container"
        style={{ marginTop: "5rem", marginBottom: "5rem" }}
      >
        <h2 className="section-title">Freelancers</h2>
        <div className="d-flex flex-wrap justify-content-center ">
          {FreelancersProfiles.map((profile) => (
            <ProfileCard profile={profile} />
          ))}
          <UsersAPI />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profiles;
