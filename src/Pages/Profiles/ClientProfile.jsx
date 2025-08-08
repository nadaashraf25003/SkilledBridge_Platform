// Style
// import "/src/index.css";
// import "./Profiles.css";

// Assets
import userPhoto from "/src/assets/User.png";

// React
import { Link, useLocation } from "react-router-dom";

// Components
import Footer from "../../Components/Footer";
import Navbar from "./../../Components/Navbar";

function ClientProfile() {
  const ClientEmail = JSON.parse(localStorage.getItem("loggedUser")).email;
  const location = useLocation();
  const userprofile = location.state?.user || {};
  const {
    Img,
    Name,
    Location,
    Title,
    AboutCompany,
    employees,
    founded,
    website,
    Glance, // object {rating:"", Jobs:"",Hired:""}
    // name = "Client Name",
    // location = "Berlin, Germany",
    // title = "Financial Technology Company",
    // about = "Provides payment solutions and business tools for small merchants.",
    // employees = "1,001-5,000 employees",
    // founded = "2012",
    // website = "www.sumup.com"
  } = userprofile || {};

  return (
    <>
      <Navbar />
      <div className="profile-container mt-5">
        {/* Header */}
        <div className="profile-header">
          <div className="header-content d-flex flex-column align-items-center">
            <img
              src={Img ? Img : userPhoto}
              alt="Company Logo"
              className="company-logo"
            />
            <div className="profile-info">
              <h1>{Name ? Name : userprofile.username}</h1>
              <p className="company-title">{Title ? Title : "Company Title"}</p>
              <div className="location">
                <i className="fas fa-map-marker-alt"></i>{" "}
                {Location ? Location : "Location"}
              </div>
            </div>
          </div>
        </div>

        {/* Key Info Cards */}
        <div className="info-cards">
          <div className="info-card">
            <h3>
              <i className="fas fa-info-circle"></i> About
            </h3>
            <p>{AboutCompany ? AboutCompany : "About Company"}</p>
          </div>

          <div className="info-card">
            <h3>
              <i className="fas fa-building"></i> Company
            </h3>
            <div className="company-details">
              <p>
                <strong>Size:</strong>{" "}
                {employees ? employees : "Employees Size"}
              </p>
              <p>
                <strong>Founded:</strong> {founded ? founded : "Founded Date"}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a href={`https://${website}`}>
                  {website ? website : "Website"}
                </a>
              </p>
            </div>
          </div>

          <div className="info-card stats">
            <h3>
              <i className="fas fa-chart-bar"></i> At a Glance
            </h3>
            <div className="stats-grid">
              <div className="stat">
                <div className="number">{Glance ? Glance.rating : "00"}</div>
                <div className="label">Rating</div>
              </div>
              <div className="stat">
                <div className="number">{Glance ? Glance.Jobs : "00"}</div>
                <div className="label">Jobs</div>
              </div>
              <div className="stat">
                <div className="number">{Glance ? Glance.Hired : "00"}</div>
                <div className="label">Hired</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="contact-section mb-5">
          
          <button className="button">
            <a href={`mailto:${ClientEmail}`} style={{color: "white"}}><i className="fas fa-envelope"></i> Contact Company</a>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ClientProfile;
