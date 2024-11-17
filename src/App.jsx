import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, notChar] = useState(false);
  const [password, setPass] = useState("qwertyui");

  // ref 
  const passRef = useRef(null);

  //callback
  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) str += ")(*&^%$#@!><}{{}";
    if (numAllowed) str += "0987654321";

    for (let i = 0; i <= length; i++) {
      let x = Math.floor(Math.random() * str.length);
      pass += str.charAt(x);
    }
    setPass(pass);
  }, [length, numAllowed, charAllowed, setPass]);

  const copyPassToClip = useCallback(() => {
    passRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordgenerator();
    console.log("pass generated successfully");
  }, [length, numAllowed, charAllowed, passwordgenerator]);

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 text-orange-500 bg-slate-600 text-center text-xs my-8'>
        <h1 className='text-xl text-center px-4 py-4' style={{ color: "green" }}>
          Password Generator
        </h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input
            type='text'
            value={password}
            readOnly
            className='outline-none w-full py-2 px-4'
            placeholder='password'
            ref={passRef}
          />
          <button
            className='outline-none bg-blue-500 text-white px-4 py-4 shrink-0 hover:bg-red-400 transition-colors duration-800'
            onClick={copyPassToClip}
          >
            Copy
          </button>
        </div>

        <div className='flex text-sm gap-x-1'>
          <div className='flex items-center gap-x-1'>
            <input
              type="range"
              min={8}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value); }}
            />
            <label>Length: {length}</label>
          </div>

          <div className='flex text-sm gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={numAllowed}
              id='numberInput'
              onChange={() => { setNumAllowed((prev) => !prev); }}
            />
            <label htmlFor='numberInput'>
              Number
            </label>
          </div>

          <div className='flex text-sm gap-x-1'>
            <input
              type='checkbox'
              defaultChecked={charAllowed}
              id='characterInput'
              onChange={() => { notChar((prev) => !prev); }}
            />
            <label htmlFor='characterInput'>
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
