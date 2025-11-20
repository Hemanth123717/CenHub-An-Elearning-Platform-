// // // import React from "react";
// // // import "./css/Ranking.css";

// // // const Ranking = () => {
// // //   return (
// // //     <div className="Ranking">
// // //       <div className="title">Leaderboard</div>
      
// // //       {/* TOP 3 Podium */}
// // //       <div className="TOP_3">
// // //         {[
// // //           { name: "Skulldugger", points: 500, rank: 2, img: "zwWaKv2XmSTraBClW1TIKrKM8g0xejhNOQsvX_TE0G8" },
// // //           { name: "Klaxxon", points: 1500, rank: 1, img: "lxwF7XXcU9TDJIQB3oD3H5nCqO7EraPmMiFWuih7HOw" },
// // //           { name: "Ultralex", points: 250, rank: 3, img: "2cRZ4SfH_GiR0lOTvQeHNXpvomM6Riyl5wGHT4j6wbI" },
// // //         ].map((player) => {
// // //           // Function to get ordinal suffix (1st, 2nd, 3rd)
// // //           const getOrdinal = (n) => {
// // //             if (n === 1) return "1st";
// // //             if (n === 2) return "2nd";
// // //             if (n === 3) return "3rd";
// // //             return `${n}th`;
// // //           };

// // //           return (
            
// // //             <div className={`TOP3_profiles rank-${player.rank}`} key={player.name}>
// // //               <div className="rank-label">{getOrdinal(player.rank)}</div>
// // //               <img
// // //                 src={`https://storage.googleapis.com/a1aa/image/${player.img}.jpg`}
// // //                 alt={player.name}
// // //                 className="rank-img"
// // //               />
// // //               <div className="reward-prize">{player.points} Points</div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* Leaderboard Table */}
// // //       <div className="leaderboard">
// // //         <table>
// // //           <thead>
// // //             <tr>
// // //               <th>Place</th>
// // //               <th>Username</th>
// // //               <th>Points</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {[4, 5, 6].map((place) => (
// // //               <tr key={place}>
// // //                 <td>{place}</td>
// // //                 <td>Protesian</td>
// // //                 <td>156</td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Ranking;


// // import React, { useEffect, useState } from "react";
// // import "./css/Ranking.css";

// // const Ranking = () => {
// //   const [topClients, setTopClients] = useState([]);

// //   useEffect(() => {
// //     fetch("http://localhost:8080/api/Client/clients/overAllTop5")
// //       .then((res) => res.json()) // ✅ Parse response as JSON
// //       .then((data) => {
// //         setTopClients(data); // ✅ Set the parsed data
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching leaderboard:", err);
// //       });
// //   }, []);
  

// //   // Function to get ordinal suffix
// //   const getOrdinal = (n) => {
// //     if (n === 1) return "1st";
// //     if (n === 2) return "2nd";
// //     if (n === 3) return "3rd";
// //     return `${n}th`;
// //   };

// //   const top3 = topClients.slice(0, 3);
// //   const others = topClients.slice(3);

// //   return (
// //     <div className="Ranking">
// //       <div className="title">Leaderboard</div>

// //       {/* TOP 3 Podium */}
// //       <div className="TOP_3">
// //         {top3.map((player, index) => (
// //           <div className={`TOP3_profiles rank-${index + 1}`} key={player.name}>
// //             <div className="rank-label">{getOrdinal(index + 1)}</div>
// //             {/* <img
// //               src={`https://storage.googleapis.com/a1aa/image/${player.img}.jpg`}
// //               alt={player.name}
// //               className="rank-img"
// //             /> */}
// //             <div className="rank-label">{player.cenId}</div>
// //             <div className="reward-prize">{player.totalMarks} Points</div>
// //           </div>
// //         ))}
// //       </div>

// //       {/* Leaderboard Table */}
// //       <div className="leaderboard">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>Place</th>
// //               <th>Username</th>
// //               <th>Total Marks</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {others.map((player, index) => (
// //               <tr key={player.name}>
// //                 <td>{index + 4}</td>
// //                 <td>{player.name}</td>
// //                 <td>{player.totalMarks}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Ranking;


// import React, { useEffect, useState } from "react";
// import "./css/Ranking.css";

// const Ranking = () => {
//   const [topClients, setTopClients] = useState(null); // Start as null
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     fetch("http://localhost:8080/api/Client/clients/overAllTop5")
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data) && data.length > 0) {
//           setTopClients(data);
//         } else {
//           setTopClients([]); // Set as empty array to indicate no data
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching leaderboard:", err);
//         setError(true); // Set error state if fetch fails
//       });
//   }, []);

//   const getOrdinal = (n) => {
//     if (n === 1) return "1st";
//     if (n === 2) return "2nd";
//     if (n === 3) return "3rd";
//     return `${n}th`;
//   };

//   if (error) {
//     return <div className="Ranking">⚠️ Failed to load leaderboard.</div>;
//   }

//   if (topClients === null) {
//     return <div className="Ranking">Loading...</div>; // While data is being fetched
//   }

//   if (topClients.length === 0) {
//     return <div className="Ranking">No data found.</div>; // No data available
//   }

//   const top3 = topClients.slice(0, 3);
//   const others = topClients.slice(3);

//   return (
//     <div className="Ranking">
//       <div className="title">Leaderboard</div>

//       {/* TOP 3 Podium */}
//       <div className="TOP_3">
//         {top3.map((player, index) => (
//           <div className={`TOP3_profiles rank-${index + 1}`} key={player.name || player.cenId}>
//             <div className="rank-label">{getOrdinal(index + 1)}</div>
//             <div className="rank-label">{player.cenId}</div>
//             <div className="reward-prize">{player.totalMarks} Points</div>
//           </div>
//         ))}
//       </div>

//       {/* Leaderboard Table */}
//       <div className="leaderboard">
//         <table>
//           <thead>
//             <tr>
//               <th>Place</th>
//               <th>Username</th>
//               <th>Total Marks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {others.map((player, index) => (
//               <tr key={player.name || player.cenId}>
//                 <td>{index + 4}</td>
//                 <td>{player.name}</td>
//                 <td>{player.totalMarks}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Ranking;


import React, { useEffect, useState } from "react";
import "./css/Ranking.css";

const Ranking = () => {
  const [topClients, setTopClients] = useState(null); // null = loading
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/Client/clients/overAllTop5",{
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
    }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopClients(data);
        } else {
          setTopClients([]); // If data is not an array, treat as empty
        }
      })
      .catch((err) => {
        console.error("Error fetching leaderboard:", err);
        setError(true);
      });
  }, []);

  const getOrdinal = (n) => {
    if (n === 1) return "1st";
    if (n === 2) return "2nd";
    if (n === 3) return "3rd";
    return `${n}th`;
  };

  if (error) {
    return (
      <div className="Ranking">
        <div className="title">Leaderboard</div>
        <p>⚠️ Failed to load leaderboard.</p>
      </div>
    );
  }

  const top3 = (topClients || []).slice(0, 3);
  const others = (topClients || []).slice(3);

  return (
    <div className="Ranking">
      <div className='shapes'>
            <div className="leftTopCir circle"></div>
            <div className="leftBottomCir circle"></div>
            <div className="rightCir circle"></div>
          </div>
      <div className="title">Leaderboard</div>

      {/* TOP 3 Podium */}
      <div className="TOP_3">
        {[1, 0, 2].map((i) => {
          const player = top3[i] || {}; // fallback to empty object if undefined
          return (
            <div className={`TOP3_profiles rank-${i + 1}`} key={player.name || player.cenId || i}>
              <div className="rank-label">{getOrdinal(i + 1)}</div>
              <div className="rank-label">{player.name}</div>
              <div className="rank-label">{player.cenId || "N/A"}</div>
              <div className="reward-prize">
                {/* {player.totalMarks != null ? `${player.totalMarks} Points` : "N/A"} */}
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard Table */}
      <div className="leaderboard">
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Username</th>
              <th>Total Marks</th>
            </tr>
          </thead>
          <tbody>
            {others.length > 0 ? (
              others.map((player, index) => (
                <tr key={player.name || player.cenId || index}>
                  <td>{index + 4}</td>
                  <td>{player.name || "N/A"}</td>
                  <td>{player.totalMarks != null ? player.totalMarks : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No additional users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ranking;
