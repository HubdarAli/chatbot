import './App.css';
import React , {useState} from 'react';
// import axios from 'axios';

// require('dotenv').config();
function App() {

  const [inputValue, setInputValue] = useState();
  const [data, setData] = useState(null);
  const API_BASE_URL = 'http://localhost:3000/';

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const search = async  () => {
    console.log(`Input value: ${inputValue}`);
    let requestData = {  message: inputValue};
    // console.log(requestData);
    // console.log(API_BASE_URL);

    try {
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
      <input type='text' value={inputValue}
        onChange={handleChange}
        placeholder="Enter something"
        />
      <button className='searchBtn' onClick={search}> Search </button>

      {data && (
        <div>
            {/* <h2> Responses: </h2> */}
            {data.map((item , index)=> {
              
              return (
                <p key={index} dangerouslySetInnerHTML={{ __html: formatTextWithLineBreaks(item.text) }} />
              );
            })}
          </div>
      )}
            
    </div>
  );
}

export default App;
