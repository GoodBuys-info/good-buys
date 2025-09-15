import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


const currentMembers = [
  { name: "Navid", img: "/images/team/navid.jpg" },
  { name: "Kallan", img: "/images/team/Kallan.jpg" }
];

const pastMembers = [
  { name: "Amelia", img: "/images/team/amelia.jpg" },
  { name: "Akaash", img: "/images/team/aakash.jpg" },
  { name: "Akshay", img: "/images/team/akshay.jpg" },
  { name: "Anubhav", img: "/images/team/anubhav.jpg" },
  { name: "Jason", img: "/images/team/jason.jpg" },
  { name: "Juan", img: "/images/team/juan.jpg" },
  { name: "Mansi", img: "/images/team/mansi.jpg" },
  { name: "Suyash", img: "/images/team/suyash.jpg" },
  { name: "Tony", img: "/images/team/tony.jpg" }
];

const Team = () => {
  useEffect(() => {
    AOS.refresh();
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="glass-overlay text-white p-4 p-md-5 rounded-4 shadow-lg">
        <h1 className="text-center mb-5" data-aos="fade-down">Our Team</h1>

        <div className="row">
          {/* Left Column: Members */}
          <div className="col-lg-8 mb-5 mb-lg-0" data-aos="fade-up">
            <h3 className="text-center mb-4">Current Members</h3>
            <div className="d-flex flex-wrap justify-content-center gap-4 mb-5">
              {currentMembers.map((member, index) => (
                <div className="text-center" key={index}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="rounded-circle team-img"
                  />
                  <div className="team-name mt-2">{member.name}</div>
                </div>
              ))}
            </div>

            <h3 className="text-center mb-4">Past Members</h3>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              {pastMembers.map((member, index) => (
                <div className="text-center" key={index}>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="rounded-circle team-img"
                  />
                  <div className="team-name mt-2">{member.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Supervisor */}
          <div className="col-lg-4 d-flex align-items-start justify-content-center" data-aos="zoom-in-up">
            <div className="bg-dark text-light p-4 rounded-4 shadow-sm w-100" style={{ maxWidth: "350px" }}>
                <center><img
                    src={'/images/team/navid.jpg'}
                    alt='Navid'
                    className="rounded-circle team-img"
                  />
                  </center>
              <h5 className="fw-bold mb-2 mt-4 text-center">Navid Shaghaghi</h5>
              <p className="mb-1"><strong>Role:</strong> Supervisor</p>
              <p className="mb-1">Lecturer and researcher in the departments of Computer Science & Engineering</p>
              <p className="mb-0">
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/nshaghaghi"
                  className="text-info"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/in/nshaghaghi
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
