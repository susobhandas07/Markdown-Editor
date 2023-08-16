import { useState } from 'react'
import Header from './header.tsx';
import Input from './input.tsx';
import Preview from './preview.tsx';

import './App.css'


function App() {
  const [data, setData] = useState("");
  function updateChange(e: any) {
    setData(e.target.value || "");
  }
  return (
    <>
      <Header />
      <div
        className='flex'>
        <Input child={data} handeler={updateChange} />
        <Preview data={data} />
      </div>
    </>
  )
}

export default App
