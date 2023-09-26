import { useReducer, useState } from 'react'
import BlankPage from './BlankPage.tsx';
import Header from './header.tsx';
import Input from './input.tsx';
import Preview from './preview.tsx';
//import './App.css'
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
  const localStorageKey = 'md-notes';
  const storedNotes: File[] = JSON.parse(window.localStorage.getItem(localStorageKey) || "[]") || [];
  const initialState: State = {
    notes: storedNotes,
    key: storedNotes.length > 0 ? storedNotes[0].name : ""
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

  const saveChanges = () => {
    return new Promise((resolve, reject) => {
      try {
        window.localStorage.setItem(localStorageKey, JSON.stringify(state.notes));
        resolve(true);
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <>
      <Header fileName={state.key} files={state.notes.map((item) => item.name)} handeler={setState} saveChanges={saveChanges} />
      {state.notes.length > 0
        ? <div
          className='md:flex gap-1 bg-header'
          style={{ height: "92vh" }}>
          <section className='md:hidden flex justify-between items-center px-5'
            style={{ backgroundColor: "var(--bg-display-name)" }}>
            <h5 className="md:hidden tracking-widest uppercase mt-2">{display ? "Preview" : "Input"}</h5>
            <button className="animate-morph" onClick={toggleDisplay} title='Preview'>
              {display
                ? <AiOutlineEyeInvisible />
                : <AiOutlineEye />}
            </button>
          </section>
          {display
            ? <Preview className="md:hidden h-full" data={findNote()} />
            : <Input className="md:hidden h-full" child={findNote()} handeler={setState} />
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
