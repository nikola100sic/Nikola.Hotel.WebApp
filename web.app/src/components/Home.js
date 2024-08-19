import '../index.css';
import React from 'react';

class Home extends React.Component {
  componentDidMount() {
    document.title = 'Hotel - Home'; // Postavite naslov stranice ovde
  }
  
  render() {
    
    return (
      
      <div>
        <div className="containerImage">
            <div className="fullscreen-backgroundImage"></div>
          <div className="blur">
            <h1 className='welcome'>Welcome to the site of the Nicola's hotel</h1>
            <p className='byName'>By: Nikola, 2024.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
