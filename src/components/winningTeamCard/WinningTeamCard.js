import React from "react";
import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import "./WinningTeamCard.css";
import cross from "../../assets/images/cross.png";

const WinningTeamCard = ({
  position,
  name,
  leader,
  college,
  member1,
  member2,
  member3,
  member4,
  member5,
  member6,
}) => {
  const [modal, setModal] = useState(false);
  const [team, setTeam] = useState([]);

  const getTeam = (
    name,
    leader,
    college,
    member1,
    member2,
    member3,
    member4,
    member5,
    member6
  ) => {
    let temp = [
      name,
      leader,
      college,
      member1,
      member2,
      member3,
      member4,
      member5,
      member6,
    ];
    setTeam((item) => [1, ...temp]);
    return setModal(true);
  };

  document.body.style.overflow = !modal ? "visible" : "hidden";

  return (
    <div>
      <div className="codeutsava__section11-card">
        <div
          className="codeutsava__section11-card-name"
          onClick={() =>
            getTeam(name, leader, member1, member2, member3, member4, member5)
          }
        >
          {position} {name}
        </div>
      </div>

      {/* modal */}

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ scaleX: 0, scaleY: 0.01 }}
            animate={{ scaleX: [0, 1, 1], scaleY: [0.005, 0.005, 1] }}
            transition={{ duration: 0.8, ease: [0.165, 0.84, 0.44, 1] }}
            exit={{ scaleX: [1, 1, 0], scaleY: [1, 0.005, 0.005] }}
            className="codeutsava__section11-problemModal-body"
          >
            <img
              className="problemModal-close"
              src={cross}
              onClick={() => setModal(false)}
            />
            <h1>Team Name: {name}</h1>
            <h5 style={{ fontWeight: "600" }}>College: {college}</h5>
            <h5 style={{ fontWeight: "600" }}>Team Leader: {leader}</h5>
            <h5 style={{ fontWeight: "600" }}>Team Members</h5>
            <p>{leader}</p>
            <p>{member1}</p>
            <p>{member2}</p>
            <p>{member3}</p>
            <p>{member4}</p>
            <p>{member5}</p>
            <p>{member6}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WinningTeamCard;
