import { useReducer, useState } from 'react'
import BlankPage from './BlankPage.tsx';
import Header from './header.tsx';
import Input from './input.tsx';
import Preview from './preview.tsx';
import datas from './assets/datas.json';
import './App.css'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";


interface File {
  "name": string,
  "content": string | null,
}
interface State {
  notes: File[],
  key: string
}
interface Action {
  type: string,
  payLoad: string | null
}

function App() {

  const initialState: State = {
    notes: datas,
    key: datas[0].name
  }

  const findNote = () => {
    for (let note of state.notes) {
      if (note.name === state.key) {
        return note.content;
      }
    }
    return "";
  }


  function reducer(state: State, action: Action): State {
    let index;
    switch (action.type) {
      case "updateNote":
        return { ...state, notes: state.notes.map((item: File) => item.name === state.key ? { ...item, content: action.payLoad } : item) };
      case "updateKey":
        return { ...state, key: action.payLoad ?? state.key };
      case "newNote":
        index = action.payLoad || "";
        return { ...state, key: index, notes: [...state.notes, { "name": action.payLoad ?? "", "content": "" }] };
      case "deleteNote":
        index = ""; let i = 0;
        while (i < state.notes.length) {
          if (state.notes[i].name != action.payLoad) {
            index = state.notes[i].name;
            break;
          }
          i++;
        }
        return { ...state, key: index, notes: state.notes.filter((note: File) => note.name != action.payLoad) };
      default:
        return state;
    }
  }

  const [state, setState] = useReducer(reducer, initialState);
  const [display, setDisplay] = useState<boolean>(false);

  const toggleDisplay = () => {
    setDisplay(prevState => !prevState);
  }

  return (
    <>
      <Header fileName={state.key} files={state.notes.map((item) => item.name)} handeler={setState} />
      {state.notes.length > 0
        ? <div
          className='md:flex overflow-hidden gap-1'
          style={{ height: "92.9vh", backgroundColor: "var(--bg-header)" }}>
          <section className='md:hidden flex justify-between items-center px-5'
            style={{ backgroundColor: "var(--bg-display-name)" }}>
            <h5 className="md:hidden tracking-widest uppercase mt-2">{display ? "Preview" : "Input"}</h5>
            <button className="animate-morph" onClick={toggleDisplay}>
              {display
                ? <AiOutlineEyeInvisible />
                : <AiOutlineEye />}
            </button>
          </section>
          {display
            ? <Preview className="md:hidden" data={findNote()} />
            : <Input className="md:hidden" child={findNote()} handeler={setState} />
          }
          <Input className="hidden md:block" child={findNote()} handeler={setState} />
          <Preview className="hidden md:block" data={findNote()} />
        </div >
        : <BlankPage />
      }
    </>
  )
}

export default App
