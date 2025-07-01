// @ts-nocheck
import { useState, useMemo } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  type ClassItem = { code: number; name: string; text: string };
  const [classList, setClassList] = useState([
    { code: 1, name: 'hi', text: 'hoi' },
  ] as Array<ClassItem>);
  const [isClassAdding, setIsClassAdding] = useState(false);
  const [classForm, setClassForm] = useState({
    code: 0,
    name: '',
    text: '',
  } as Partial<ClassItem>);
  const [editingClassCode, setEditingClassCode] = useState(
    null as null | ClassItem['code']
  );
  const editingClass = useMemo(() => {
    if (editingClassCode == null) return null;
    else return classList.find((cls) => cls.code === editingClassCode) ?? null;
  }, [editingClassCode, classList]);

  return (
    <>
      <div>
        <div>
          <button onClick={() => setIsClassAdding(!isClassAdding)}>+</button>
        </div>
        <div style={{ ...(!isClassAdding && { display: 'none' }) }}>
          <input
            type="text"
            value={classForm.name}
            placeholder="class name"
            onInput={(e) =>
              setClassForm({
                ...classForm,
                name: (e.target as HTMLInputElement).value,
              })
            }
          />
          <button
            onClick={() => {
              const code = Date.now();
              setClassList(
                classList.concat({ code, name: classForm.name ?? '', text: '' })
              );
              setIsClassAdding(false);
              setClassForm({ code: 0, name: '', text: '' });
            }}
          >
            Add
          </button>
        </div>
        <p>Your Class List</p>
        {classList.map((cls) => (
          <div
            key={cls.code}
            style={{
              cursor: 'pointer',
              ...(cls.code === editingClassCode && { fontWeight: 'bold' }),
            }}
            onClick={() => {
              if (editingClassCode === cls.code) setEditingClassCode(null);
              else setEditingClassCode(cls.code);
            }}
          >
            <span>{cls.name}</span>
          </div>
        ))}
      </div>
      <div style={{ ...(editingClass == null && { display: 'none' }) }}>
        {editingClass == null ? null : (
          <>
            <textarea
              value={editingClass.text}
              onInput={(e) => {
                const text = (e.target as HTMLTextAreaElement).value;
                const idx =
                  classList.findIndex((cls) => cls.code === editingClassCode) ??
                  -1;
                if (classList[idx]) {
                  setClassList(
                    classList.map((cls, i) =>
                      i === idx
                        ? {
                            ...cls,
                            text,
                          }
                        : cls
                    )
                  );
                }
              }}
            ></textarea>
            <button
              onClick={() => {
                const text = '';
                const idx =
                  classList.findIndex((cls) => cls.code === editingClassCode) ??
                  -1;
                if (classList[idx]) {
                  setClassList(
                    classList.map((cls, i) =>
                      i === idx
                        ? {
                            ...cls,
                            text,
                          }
                        : cls
                    )
                  );
                }
              }}
            >
              {' '}
              clear{' '}
            </button>
          </>
        )}
      </div>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
