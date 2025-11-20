import React, { useEffect } from 'react'
import "./css/CodingChallenges.css"
import image from "../Images/exampleEvent.jpg"

const CodingChallenges = () => {
  // function backgroundImageGene(url){
  //   document.getElementById("eventIdUrlImage").style.backgroundImage = `url('${url}')`;
  // }
  useEffect(() => {
    document.getElementById("eventIdUrlImage").style.backgroundImage = `url('${image}')`;
  }, []);
  return (
    <div className="CodingPage">
      <div className='eventsCodingPage'>
        {/* <img className='eventUrlImage' id='eventIdUrlImage' src={image} alt="" /> */}
        <div className='eventUrlImage' id='eventIdUrlImage'></div>
        {/* CodingPages */}
      </div>
    </div>
  )
}

export default CodingChallenges