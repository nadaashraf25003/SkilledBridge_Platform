// Style
import "/src/index.css";
import "./Profiles.css";

// Assets
import userPhoto from "/src/assets/User.png";

// React
import { useLocation } from "react-router-dom";

// Components
import Navbar from "../../Components/Navbar";

function FreelancerProfile() {
  const FreelancerEmail = JSON.parse(localStorage.getItem("loggedUser") || "null")?.email ||
  "https://www.google.com";
  const location = useLocation();
  const userprofile = location.state?.user || {};
  const {
    Img,
    Name,
    Title,
    Location,
    AboutMe,
    Skills, // array
    MyPortfolio, // object {title:"", time:"", details:""}
    Languages,
    MemberSince,
    Links,
    HourlyRate,
    Availability,
    ProfessionalOverview,
    WorkProcess,
    WorkExperience,
    Reviews,
  } = userprofile || {};

  return (
    <>
      <Navbar />
      <div className="profile-container mt-5">
        {/* Profile Header */}
        <div className="profile-header d-flex flex-column align-items-center">
          <img
            src={Img ? Img : userPhoto}
            alt="Profile"
            className="profile-avatar"
          />
          <h1>{Name ? Name : userprofile.username}</h1>
          <h3>{Title ? Title : "Freelancer Title"}</h3>
          <div className="profile-location">
            <i className="fas fa-map-marker-alt" />{" "}
            {Location ? Location : "Freelancer Location"}
          </div>
          <div className="profile-actions">
            <button className="button">
             <a href={`mailto:${FreelancerEmail}`} style={{color: "white"}}> <i className="fas fa-envelope" /> Contact</a>
            </button>
          </div>
        </div>
        {/* Profile Content */}
        <div className="profile-content">
          {/* About Section */}
          <div className="profile-section">
            <h2>About Me</h2>
            <p>{AboutMe ? AboutMe : "About Freelancer "}</p>
          </div>
          {/* Skills Section */}
          <div className="profile-section">
            <h2>Skills</h2>
            <div className="skills">
              {Skills
                ? Skills.map((skill) => (
                    <span className="skill-badge">{skill}</span>
                  ))
                : "No Skills Added "}
            </div>
          </div>
          {/* Experience Section */}
          <div className="profile-section">
            <h2>Experience</h2>
            {MyPortfolio
              ? MyPortfolio.map((item) => (
                  <div className="experience-item">
                    <h3>{item.title}</h3>
                    <p className="company">{item.time}</p>
                    <p>{item.details}</p>
                  </div>
                ))
              : "No Experience Added"}
          </div>
        </div>
      </div>
    </>
  );
}
export default FreelancerProfile;

