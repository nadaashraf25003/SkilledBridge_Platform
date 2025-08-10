// Style
import "/src/index.css";
import "./api.css";

// React
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// Components
import JobCard from "./../Pages/Jobs/JobCard";

function JobAPI() {
  const location = useLocation();
  const [jobsAPI, setJobs] = useState([]);
  const [jobsAdded, setjobsAdded] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://remotive.com/api/remote-jobs")
      .then((response) => {
        setJobs(response.data.jobs);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("j")) {
        let value;
        try {
          value = JSON.parse(localStorage.getItem(key));
          if (!value.id) value.id = `local-${key}`;
        } catch (err) {
          continue;
        }
        setjobsAdded((prevJobs) => [...prevJobs, value]);
      }
    }
  }, []);

  // Combine both job sources
  const allJobs = [...jobsAdded, ...jobsAPI.filter(job => job.id !== 1000)];

  // Handle limited jobs for home page
  const isHomePage = location.pathname === "/";
  const limitedJobs = isHomePage ? allJobs.slice(0, 5) : allJobs;

  // Get current jobs for pagination (only if not on home page)
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = isHomePage ? limitedJobs : allJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(allJobs.length / jobsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of page buttons to show
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than maxVisiblePages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Show limited pages with ellipsis
      const leftBound = Math.max(2, currentPage - 1);
      const rightBound = Math.min(totalPages - 1, currentPage + 1);
      
      pageNumbers.push(1); // Always show first page
      
      if (leftBound > 2) {
        pageNumbers.push('...'); // Left ellipsis
      }
      
      // Middle pages
      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }
      
      if (rightBound < totalPages - 1) {
        pageNumbers.push('...'); // Right ellipsis
      }
      
      pageNumbers.push(totalPages); // Always show last page
    }
    
    return pageNumbers;
  };

  return (
    <>
      {allJobs.length > 0 ? (
        <div className="job-list-container">
          <div className="job-list">
            {currentJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          {/* Show pagination only if not on home page */}
          {!isHomePage && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="pagination-button prev-next"
              >
                &laquo; Previous
              </button>
              
              <div className="page-numbers">
                {getPageNumbers().map((number, index) => (
                  number === '...' ? (
                    <span key={`ellipsis-${index}`} className="ellipsis">...</span>
                  ) : (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                    >
                      {number}
                    </button>
                  )
                ))}
              </div>
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="pagination-button prev-next"
              >
                Next &raquo;
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className="no-jobs-message">
          No Jobs Found
        </p>
      )}
    </>
  );
}

export default JobAPI;
