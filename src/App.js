import './App.css';

function App() {
  return (
    <>
      <div className='container'>
          <div className='weatherBox'>
            <div className='backgroundImage'></div>
            <h1 className='heading'>Weather App</h1>
            <div className='inputArea'>
              <label htmlFor='city'>City Name : </label>
              <input className='inputBox' id='city' placeholder="e.g. Ballia"></input>
              <button className='btn'>Search</button>
            </div>
          </div>
      </div>
    </>
  );
}

export default App;
