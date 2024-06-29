import React, {useEffect, useState} from 'react'
import './App.css'
import copy from '/copy.png'

function App() {
  const characters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9","!","@","#","$","&","*","_","-",",",".","?"];
  
  const alphabets = characters.slice(0,52)
  const numbers = characters.slice(52,62)
  const specialChars = characters.slice(62)

  const [includeNum, setIncludeNum] = useState(false)
  const [includeSpecial, setIncludeSpecial] = useState(false)

  const [passOne, setPassOne] = useState({password:'Special characters'});
  const [passTwo, setPassTwo] = useState({password:'Alpha Numeric'});
  const [isClickedOne, setIsClickedOne] = useState(false)
  const [isClickedTwo, setIsClickedTwo] = useState(false)

  let str = alphabets

  useEffect(() => {
    if(includeNum && includeSpecial)
      str = alphabets.concat(numbers).concat(specialChars)
    else if(includeSpecial)
      str = alphabets.concat(specialChars)
    else if(includeNum)
      str = alphabets.concat(numbers)
  },[includeNum, includeSpecial, passOne, passTwo])

  function PassOneIdx() {
    let idx = Math.floor(Math.random()*str.length)
    return idx;
  }

  function PassTwoIdx() {
    let idx = Math.floor(Math.random()*str.length)
    return idx;
  }

  let passwordOne = ''
  let passwordTwo = ''
  
  const generatePasswords = ()=> {
    setIsClickedOne(false)
    setIsClickedTwo(false)
    navigator.clipboard.writeText('')
    
    
    for(let i=0;i<15;i++) {
      passwordOne += str[PassOneIdx()];
    }
    for(let i=0;i<15;i++) {
      passwordTwo += str[PassTwoIdx()];
    }
    setPassOne((m) => {
      let objt = {...m};
      objt.password = passwordOne;
      return objt;
    });
    setPassTwo((m) => {
      let objt = {...m};
      objt.password = passwordTwo;
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

      <div className='checkbox-inputs' onChange={() => {setIncludeNum(prevVal => !prevVal)}}>
        <input type="checkbox" name="includeNums" id="includeNums" />
        <label htmlFor="includeNums">Numbers</label>
      </div>
      <div className='checkbox-inputs' onChange={() => {setIncludeSpecial(prevVal => !prevVal)}}>
        <input  type="checkbox" name="includeSpecial" id="includeSpecial" />
        <label htmlFor="includeSpecial">Special Characters</label>
      </div>

      <button className='main--btn' onClick={generatePasswords}>Generate passwords</button>

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
