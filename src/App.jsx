import React, {useState} from 'react'
import './App.css'
import copy from '/copy.png'

function App() {
  const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","~","`","!","@","#","$","%","^","&","*","(",")","_","-","+","=","{","[","}","]",",","|",":",";","<",">",".","?","/"];
  const alphaNum = characters.slice(0,62);

  const [passOne, setPassOne] = useState({password:'Special characters'});
  const [passTwo, setPassTwo] = useState({password:'Alpha Numeric'});
  const [isClickedOne, setIsClickedOne] = useState(false)
  const [isClickedTwo, setIsClickedTwo] = useState(false)

  function PassOneIdx() {
    let idx = Math.floor(Math.random()*characters.length)
    return idx;
  }

  function PassTwoIdx() {
    let idx = Math.floor(Math.random()*alphaNum.length)
    return idx;
  }

  let pwdOne = ''
  let pwdTwo = ''
  
  const execfunc = ()=> {
    setIsClickedOne(false)
    setIsClickedTwo(false)
    navigator.clipboard.writeText('')
    for(let i=0;i<15;i++) {
      pwdOne += characters[PassOneIdx()];
    }
    for(let i=0;i<15;i++) {
      pwdTwo += alphaNum[PassTwoIdx()];
    }
    setPassOne((m) => {
      let objt = {...m};
      objt.password = pwdOne;
      return objt;
    });
    setPassTwo((m) => {
      let objt = {...m};
      objt.password = pwdTwo;
      return objt;
    })
  }

  function copytoClipOne() {
    setIsClickedOne(true);
    setIsClickedTwo(false);
    navigator.clipboard.writeText(passOne.password);
  }

  function copytoClipTwo() {
    setIsClickedTwo(true);
    setIsClickedOne(false);
    navigator.clipboard.writeText(passTwo.password);
  }

  return (
    <>
    <main className='main'>
      <h1 className='main--h1'>Generate a <span className='h1--span'>random password</span></h1>

      <h3 className='main--h3'>Never use an insecure password again.</h3>

      <button className='main--btn' onClick={execfunc}>Generate passwords</button>

      <hr />

      <div className='passwrds'>
        <div className='passOne' style={{backgroundColor: isClickedOne ? '#10B981' : ''}}>
          <p onClick={copytoClipOne} style={{color: isClickedOne ? 'white' : ''}}>{passOne.password} </p>
          <img src={copy} onClick={copytoClipOne} />
        </div>
        <div className='passTwo' style={{backgroundColor: isClickedTwo ? '#10B981' : ''}}>
          <p onClick={copytoClipTwo} style={{color: isClickedTwo ? 'white' : ''}}>{passTwo.password} </p>
          <img src={copy} onClick={copytoClipTwo}/> 
        </div> 
      </div>
    </main>
    </>
  )
}

export default App
