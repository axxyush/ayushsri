import React from "react";
import ironman from "../images/ironman.png";
import wolverine from "../images/wolverine.png";
import spiderman2099 from "../images/spiderman2099.png";
import hulk from "../images/hulk.png";

export default function CharacterSelector({ onSelect }) {
  const heroes = [
    { id: "Ironman", label: "Iron Man", img: ironman },
    { id: "Wolverine", label: "Wolverine", img: wolverine },
    { id: "Spiderman2099", label: "Spider-Man 2099", img: spiderman2099 },
    { id: "Hulk", label: "Hulk", img: hulk },
  ];

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center align-items-center m-3  text-white p-4"
      style={{ zIndex: 2000 }}
    >
      <h1
        style={{
          color: "#f64444ff",
          textShadow: `
      0 0 1px #ff9999,
      0 0 1px #ff6666,
      0 0 5px #ff3333,
      0 0 10px #cc0000
    `,
        }}
        className="display-5 fw-bold lh-1 m-5"
      >
        Choose your Character
      </h1>
      <div className="row g-3" style={{ maxWidth: "1200px" }}>
        {heroes.map((h) => (
          <div
            key={h.id}
            className="col-12 col-md-6 text-center d-flex justify-content-around"
            style={{ cursor: "pointer" }}
            onClick={() => onSelect(h.id)}
          >
            <div
              style={{ height: "30vh", width: "fit-content" }}
              className="card"
            >
              <img
                src={h.img}
                className="card-img-top"
                alt={h.label}
                style={{ height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
