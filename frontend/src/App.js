import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// require('dotenv').config();
function App() {

  const [inputValue, setInputValue] = useState();
  const [data, setData] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered item index
  const [copyText, setCopyText] = useState(false);
  const [loader, setLoader] = useState(false);
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
      setData(null);
      setLoader(true);
      
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

      setInputValue('');
      const result = await response.json();
      setData(result.reply); // Update state with the response data
      // console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    } finally {

      setLoader(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyText(hoveredIndex);
        setTimeout(() => {
          setCopyText(false);
        }, 1000);
      })
      .catch((err) => console.error("Failed to copy text: ", err));
  };
  return (
    <div className="App">
      <div className='container-fluid'>
        <div className='card'>
          <div className='card-body'>

            <div className='my-5 p-5'>
              {/* <div class="overlay"></div> */}
              {loader && (


                <div class="spanner">
                  <div class="loader"></div>
                </div>
              )}
              {data && (
                <div className='text-start'>
                  {/* <h2> Responses: </h2> */}
                  {/* {data.map((row, key) => {
                    {row.text.split('\n\n').map((item, index) => {

                      console.log(item);
                      return (

                        <p  key={index}> {item} </p>
                        
                      );
                    })};
                    
                  })} */}
                  {data.map((row, rowIndex) => (
                    row.text.split('\n\n').map((item, itemIndex) => (
                      <div
                        key={`${rowIndex}-${itemIndex}`}
                        className="response-container"
                        onMouseEnter={() => setHoveredIndex(`${rowIndex}-${itemIndex}`)}  // Set unique hover index
                        onMouseLeave={() => setHoveredIndex(null)}                        // Reset hover index
                      >
                        <p className="response-text">{item}</p>
                        {hoveredIndex === `${rowIndex}-${itemIndex}` && ( // Show button only if this <p> is hovered
                          <button
                            className="copy-btn"
                            onClick={() => copyToClipboard(item)}
                          >
                            {copyText === `${rowIndex}-${itemIndex}` ? <i className='fa fa-check'></i> : <i className='fa-regular fa-copy'></i>}
                          </button>
                        )}
                      </div>
                    ))
                  ))}
                </div>
              )}
            </div>
            <div class="input-group sticky-bottom">
              <input type='text' className='form-control' value={inputValue}
                onChange={handleChange}
                placeholder="Enter something"
              />
              <button className='btn btn-dark searchBtn' onClick={search} disabled={!inputValue}> <i className='fa-solid fa-paper-plane'></i> </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
