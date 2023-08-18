import { useReducer } from 'react'
import BlankPage from './BlankPage.tsx';
import Header from './header.tsx';
import Input from './input.tsx';
import Preview from './preview.tsx';
import datas from './assets/datas.json';
import './App.css'


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
  return (
    <>
      <Header fileName={state.key} files={state.notes.map((item) => item.name)} handeler={setState} />
      {state.notes.length > 0
        ? <div
          className='flex'>
          <Input child={findNote()} handeler={setState} />
          <Preview data={findNote()} />
        </div>
        : <BlankPage />}
    </>
  )
}

export default App
