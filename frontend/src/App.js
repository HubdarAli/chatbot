import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import React, { useState } from 'react';
// import axios from 'axios';

// require('dotenv').config();
function App() {

  const [inputValue, setInputValue] = useState();
  const [data, setData] = useState(null);
  const API_BASE_URL = 'http://localhost:3000/';

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const search = async (e) => {
    console.log(`Input value: ${inputValue}`);
    let requestData = { message: inputValue };
    // console.log(requestData);
    // console.log(API_BASE_URL);
    
    try {
      setInputValue('');
      const response = await fetch(`${API_BASE_URL}chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setData(result.reply); // Update state with the response data
      // console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Replace newlines with <br />
  const formatTextWithLineBreaks = (text) => {
    return text.replace(/\n/g, '<br />');
  };

  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='card'>
          <div className='card-body'>
            <div className='my-5 p-5'>
              {data && (
                <div className='text-start'>
                  {/* <h2> Responses: </h2> */}
                  {data.map((item, index) => {

                    return (

                      <p className='' key={index} dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(item.text) }} />
                    );
                  })}
                </div>
              )}
            </div>
            <div class="input-group sticky-bottom">
              <input type='text' className='form-control' value={inputValue}
                onChange={handleChange}
                placeholder="Enter something"
              />
              <button className='btn btn-dark searchBtn'  onClick={search} disabled={!inputValue}> <i className='fa-solid fa-paper-plane'></i> </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
