import { useState ,useCallback,useEffect,useRef} from 'react'


function App() {
  const [length, setlength] = useState(8)
  const [numberin,setnumberin]=useState(false)
  const [character,setcharacter]=useState(false)
  const [password,setpassword]=useState("")

  const passwordref=useRef(null)

  const passwordgenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberin) str+="0123456789"
    if(character) str+="[]{}.?!@#$%^&*()"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
      console.log(pass,"char :",char)
    }
    setpassword(pass)

  },[length,numberin,character,setpassword])

const copytoclip=useCallback(()=>{
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,20)
window.navigator.clipboard.writeText(password)
},[password])

useEffect(()=>{
  passwordgenerator()


},[length,numberin,character,passwordgenerator])
  return (
    <>
  <div className="bg-slate-400 rounded-xl w-full px-3 py-2 mx-auto my-auto max-w-xl text-white flex flex-col items-center justify-center">
  <div className="flex flex-col shadow rounded-lg overflow-hidden mb-4 justify-center items-center w-full">
    <h1 className="text-xl px-4 py-2 flex justify-center">password generator</h1>
    
    <div className='flex flex-row w-full'>
    <input type="text" 
    value={password}
    placeholder='password'
    readOnly
    ref={passwordref}
    className="ml-2 bg-slate-900 px-3 py-2 rounded-xl text-red-400 text-center w-full max-w-md mb-4"
    />
    <button 
    onClick={copytoclip}
     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-3 px-4 rounded-lg mb-4"
    >Copy</button>
    </div>
  </div>  
  <div className='flex text-sm gap-x-2'>
    <div className='flex items-center gap-x-1'>
    <input type="range" 
    min={6}
    max={50}
    value={length}
    className='cursor-pointer'
    onChange={(e)=>{setlength(e.target.value)}}
    />
    <label>Length:{length}</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      id="numberinput"
      defaultChecked={numberin}
      onChange={()=>{setnumberin((prev)=>!prev)}}
      />
      <label>Numbers</label>
    </div>
    <div className='flex items-center gap-x-1'>
      <input type="checkbox"
      id="charinput"
      defaultChecked={character}
      onChange={()=>{setcharacter((prev)=>!prev)}}
      />
      <label>Characters</label>
    </div>
  </div>  
  </div>    

    </>
  )
}

export default App
