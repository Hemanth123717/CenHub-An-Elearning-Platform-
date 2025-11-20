// // import React from 'react'

// // const TestInstructions = () => {
// //   return (
// //     <div>TestInstructions</div>
// //   )
// // }

// // export default TestInstructions

import React from 'react';
import "./css/TestInstructions.css"

const TestInstructions = () => {
  return (
//   <div className='TestSeriesDiv'>
//             <div className='glowBlob'></div>
//             <div className="boltDiv topLeft"></div>
//             <div className="boltDiv topRight"></div>
//             <div className="boltDiv bottomLeft"></div>
//             <div className="boltDiv bottomRight"></div>
//             <div className='clientBottomNavBar'>
//               <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/">Home</a></div>
//               <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/events">Events</a></div>
//               <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/dashboard">Dashboard</a></div>
//               <div className='clientBottomNavBarOption'><a className='clientBottomNavBarOptionLink' href="/aboutus">AboutUs</a></div>
//             </div>
//         <div className='glassEffectDiv'>
            <div className="test-instructions-container">
            <h2>Instructions</h2>
            <ul>
                <li><strong>You can attempt any test only once.</strong></li>
                <li><strong>Once the test is started, you cannot retake it.</strong></li>
                <li>If you <strong>reload or close</strong> the page during the test, it will be <strong>auto-submitted</strong>.</li>
                <li>If you <strong>switch between apps or tabs</strong> during the test, it will be <strong>auto-submitted</strong>.</li>
                <li>You must attempt every question to <strong>enable submission</strong>.</li>
                <li><strong>Please re-login every 2.5 hours to avoid interruptions.</strong></li>
                <li><strong>Please make sure to log out before leaving the website. If you do not log out properly, you will be unable to log in again for the next 4 hours.</strong></li>
                <li>The test duration is <strong>15 minutes</strong>.</li>
                <li>There are <strong>15 questions</strong> in total.</li>
                <li>Each question carries <strong>1 mark</strong>.</li>
                <li>You will get <strong>1 minute per question</strong>.</li>
                <li><strong>Each user will receive a different set of questions</strong> for the same exam.</li>
                <li>You <strong>can move between questions freely</strong>.</li>
                {/* <li><strong>Results</strong> will be shown after the test is completed.</li> */}
                <li><strong>Results</strong> can be accessed after the test is completed.</li>
            </ul>

            <div className="start-test-warning">
                <strong>⚠️ Once you start the test, you must complete it in one go. Do not refresh or close the page.</strong>
            </div>
            {/* <button className="start-test-button" onClick={() => {
                // You can navigate to the test page or trigger test start logic here
                // Example: navigate("/start-test");
                alert("Test Started!");
            }}>
                Start Test
            </button> */}
            </div>
  );
};

export default TestInstructions;


// import React from 'react';
// import "./css/TestInstructions.css"

// const TestInstructions = ({ onStartTest }) => {
//   return (
//     <div className="test-instructions-container">
//       <h2>Test Instructions</h2>
//       <ul>
//                 <li>The test duration is <strong>15 minutes</strong>.</li>
//                 <li>There are <strong>15 questions</strong> in total.</li>
//                 <li>Each question carries <strong>1 mark</strong>.</li>
//                 <li>You will get <strong>1 minute per question</strong>.</li>
//                 <li><strong>Each user will receive a different set of questions</strong> for the same exam.</li>
//                 <li>You <strong>can move between questions freely</strong>.</li>
//                 <li>Once the test is <strong>started</strong>, you <strong>cannot retake</strong> it.</li>
//                 <li>If you <strong>reload or close</strong> the page during the test, it will be <strong>auto-submitted</strong>.</li>
//                 <li>If you <strong>switch between apps or tabs</strong> during the test, it will be <strong>auto-submitted</strong>.</li>
//                 {/* <li><strong>Results</strong> will be shown after the test is completed.</li> */}
//                 <li><strong>Results</strong> can be accessed after the test is completed.</li>
//                 <li>You can attempt any test only <strong>once</strong>.</li>
//             </ul>
//       <div className="start-test-warning">
//         ⚠️ Once you start the test, you must complete it in one go.
//       </div>
//       <button className="start-test-button" onClick={onStartTest}>
//         Start Test
//       </button>
//     </div>
//   );
// };

// export default TestInstructions;
