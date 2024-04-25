import React,{useState, useEffect} from 'react'
import "../styles/dashboard.css";
import Plant from './Plant';

function Dashboard(){
  //might need to use  useRef instead of useState if rendering problems occur with useEffect
  const[plants, setPlants] = useState([]);
  const [user, setUSer] = useState(sessionStorage.getItem("User"));

  useEffect(() =>{
    loadDashboard();
  },[]);//empty array so this only runs when component initially mounts

  const loadDashboard = async () => {
    const response = await fetch("http://127.0.0.1:5000/dashboard", {
      method: "POST",
      mode: "cors",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
      }),
    })
    const data = await response.json();

    console.log(data)
    const list = data["message"].map((p) =>(
      ["plant",
      p["data_packet"]["probes"][0]["humidity"],
      p["data_packet"]["probes"][0]["light"],
      p["data_packet"]["probes"][0]["moisture"],
      p["data_packet"]["probes"][0]["temp"],
      p["data_packet"]["tank_level"],
      p["systemID"],
      "n/a"
      ]
    ));
    console.log(list)
    setPlants(p => list)

  }

  function join(){
      // const newPlant = ["plant" , 0, 11, 22, 33, 44]
      // setPlants(p => [...p, newPlant])
      window.location.replace("/Join")
  }

  function register(){
    window.location.replace("/Register")
  }

  return(
    <div className='dashboard'>
      <header className='dash-head'>
        <h1 className='dash-title'>APWS</h1>
        <a href='/login'>
          <button className='head-btn'>Sign Out</button>
        </a> 
        <button className='head-btn'>Settings</button>
      </header>
      <div className='dash-display'>
        <button className='joinBtn' onClick={join}>Join</button>
        <button className='joinBtn' onClick={register}>Register Plant</button>
        <ul className='plant-list'>
          {plants.map((plant, index) =>
            <li key={index}>
              <Plant name={plant[0]}
                      humidityL={plant[1]}
                      lightL={plant[2]}
                      moistL={plant[3]}
                      tempL={plant[4]}
                      tankL={plant[5]}
                      sysID={plant[6]}
                      alerts={plant[7]} />
            </li>
          )}
        </ul>
      </div>
      <footer className='dash-foot'>
        <p className='copyright'>&copy; APWS {new Date().getFullYear()}</p>
      </footer>
    </div>
  );

}

  
export default Dashboard;