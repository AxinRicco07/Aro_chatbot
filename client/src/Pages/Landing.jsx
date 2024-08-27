import React from 'react';
import main from '../Components/Assest/main-front.jpg';
import mainLeft from '../Components/Assest/topping1.jpg';
import './Landing.css'



const Landing = () => {
  
  return (
  
    <div>
       
      <div className="landing-page">
        <div className="content">
          <div className="container">
            <div className="info">
              <h1>Innovative care for a healthier you</h1>
              <p>
                <strong>
                  அன்புற்று அமர்ந்த வழக்கென்ப வையகத்து
                  <br />
                  இன்புற்றார் எய்தும் சிறப்பு.
                  <br />
                </strong>
                Sweetness on earth and rarest bliss above, These are the fruits of tranquil life of love
              </p>
              <button id="login_bt">Try now</button>
            </div>
            <div className="image">
              <img src={main} alt="toppings" />
            </div>
          </div>
        </div>
        <img className="toppings-bg-left" src={mainLeft} alt="toppings" />
      </div>
    </div>
  );
};

export default Landing;
