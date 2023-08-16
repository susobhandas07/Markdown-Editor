import { useState } from 'react'
import Header from './header.tsx';
import Input from './input.tsx';
import Preview from './preview.tsx';
import datas from './assets/datas.json';
import './App.css'


function App() {
  const [files, setFiles] = useState(datas || []);
  const [key, setkey] = useState(files[0] && files[0].name);

  function findNote() {
    for (let i in files) {
      if (files[i].name === key) {
        return files[i].content;
      }
    }
    return "";
  }
  function updateChange(e: any) {
    const { name, value } = e.target;
    if (name === 'content') {
      setFiles((prevState) => prevState.map((file) => file.name === key ? { ...file, content: value } : file));
    } else if (name === 'key') {
      setkey(value);
    }
  }

  return (
    <>
      <Header fileName={key} files={files.map((item) => item.name)} handeler={updateChange} />
      <div
        className='flex'>
        <Input child={findNote()} handeler={updateChange} />
        <Preview data={findNote()} />
      </div>
    </>
  )
}

export default App
