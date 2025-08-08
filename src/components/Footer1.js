import React from "react";
import Contact from "./Contact";

function Footer1() {
  return (
    <>
      <div
        style={{
          width: "80%",
          margin: "10%",
        }}
        className="d-flex justify-content-center col-xl-10 col-xxl-8 p-4"
      >
        <div
          id="contact"
          className="d-flex justify-content-around row align-items-center g-lg-5 "
          style={{ width: "100%" }}
        >
          <div
            style={{ width: "50%" }}
            className="col-lg-7 text-center text-lg-start mb-5"
          >
            <h1
              style={{
                color: "#6b8e23",
                textShadow: "0px 0px 10px rgba(50, 100, 50, 0.5)",
              }}
              className="display-4  fw-bold lh-1 poppins-bold  mb-3"
            >
              Contact Intel
            </h1>
            <p className=" col-lg-10 text-white fs-5">
              Direct channels and operational status.
            </p>
            <div className="d-flex justify-content-start">
              <div
                style={{
                  backgroundColor: "#efe5e531",
                  borderRadius: "20%",
                  height: "30px",
                  width: "30px",
                  marginRight: "5px",
                }}
                className="circle d-flex align-items-center justify-content-center"
              >
                <i
                  className="fa-solid fa-envelope"
                  style={{ color: "#f7f0f0ff" }}
                />
              </div>
              <p className="text-white">ayushsri@buffalo.edu</p>
            </div>
            <div className="d-flex justify-content-start">
              <div
                style={{
                  backgroundColor: "#efe5e531",
                  borderRadius: "20%",
                  height: "30px",
                  width: "30px",
                  marginRight: "5px",
                }}
                className="circle d-flex align-items-center justify-content-center"
              >
                <i
                  className="fa-solid fa-phone"
                  style={{ color: "#f7f0f0ff" }}
                />
              </div>
              <p className="text-white">+1 (716) 730-9248</p>
            </div>
            <div className="d-flex justify-content-start">
              <div
                style={{
                  backgroundColor: "#efe5e531",
                  borderRadius: "20%",
                  height: "30px",
                  width: "30px",
                  marginRight: "5px",
                }}
                className="circle d-flex align-items-center justify-content-center"
              >
                <i
                  className="fa-solid fa-location-dot"
                  style={{ color: "#f7f0f0ff" }}
                />
              </div>
              <p className="text-white">Buffalo, NY, United States</p>
            </div>
            {/* <p className="text-white mt-3">Available for new missions</p> */}
            <div className="d-flex align-items-center mt-3 gap-3">
              <span className="position-relative d-inline-flex h-1 w-1">
                <span
                  className="animate-pulse position-absolute rounded-circle bg-success opacity-75"
                  style={{ height: "1rem", width: "1rem" }}
                ></span>
                <span
                  className=" rounded-circle bg-success"
                  style={{ height: "1rem", width: "1rem" }}
                ></span>
              </span>
              <span className="text-sm fw-medium text-white">
                Available for new missions
              </span>
            </div>
            <p style={{ color: "#c0bdbdff" }} className="mt-3">
              Typical response time: within 24 hours.
            </p>
            <p className=" col-lg-10 text-white fs-5">
              <b>Follow The Guardian </b>
            </p>
            <a href="https://github.com/axxyush">
              <i
                style={{ color: "#fffafaff", marginRight: "20px" }}
                className="fa-brands fa-github fa-lg"
              />
            </a>
            <a href="https://www.linkedin.com/in/ayush-sri/">
              <i
                style={{ color: "#fffafaff", marginRight: "20px" }}
                className="fa-brands fa-linkedin fa-lg"
              />
            </a>
            <a href="https://www.instagram.com/axxyush/">
              <i
                style={{ color: "#fffafaff", marginRight: "20px" }}
                className="fa-brands fa-instagram fa-lg"
              />
            </a>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer1;
