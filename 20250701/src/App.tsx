// @ts-nocheck
import { useState, useMemo, useCallback } from 'react';
import './App.css';

type TodoItem = { id: number; title: string; state: 'idle' | 'done' };
function getToday() {
  return new Date().toISOString().slice(0, 10);
}
function useStorage() {
  const STORAGE_KEY = '250701';
  const list = [] as Array<TodoItem>;
  const date = getToday();
  try {
    const storageStr = localStorage.getItem(STORAGE_KEY) as string;
    if (storageStr) {
      const storage = JSON.parse(storageStr) as {
        list: Array<TodoItem>;
        date: string;
      };
      if (storage.date === date) list.push(...storage.list);
    }
  } catch {
    alert('로딩 에러야');
  }
  const setData = (newList: Array<TodoItem>) => {
    const newDate = getToday();
    const storageStr = JSON.stringify({ list: newList, date: newDate });
    try {
      localStorage.setItem(STORAGE_KEY, storageStr);
    } catch {
      alert('저장 에러야');
    }
  };
  return [{ date, list }, setData] as [
    { list: Array<TodoItem>; date: string },
    typeof setData
  ];
}

function Header() {
  return (
    <div>
      Today is {Intl.DateTimeFormat('ko-KR', { dateStyle: 'medium' }).format()}
    </div>
  );
}
function ListView({
  list: storedList,
  onListUpdated,
}: {
  list: Array<TodoItem>;
  onListUpdated: (newList: Array<TodoItem>) => void;
}) {
  const [itemList, _setItemList] = useState([...storedList] as Array<TodoItem>);
  const setItemList = useCallback(
    (list: Array<TodoItem>) => {
      _setItemList(list);
      onListUpdated(list);
    },
    [itemList]
  );
  const addNewItem = useCallback(() => {
    const newItem: TodoItem = {
      id: Date.now(),
      title: 'New Item',
      state: 'idle',
    };
    setItemList([...itemList, newItem]);
  }, [itemList]);
  const [editingItemId, setEditingItemId] = useState(0);
  const setItemTitle = useCallback(
    (id: TodoItem['id'], newTitle: string) => {
      setItemList(
        itemList.map((o) => (o.id === id ? { ...o, title: newTitle } : o))
      );
    },
    [itemList]
  );
  const setItemState = useCallback(
    (id: TodoItem['id'], newState: TodoItem['state']) => {
      setItemList(
        itemList.map((o) => (o.id === id ? { ...o, state: newState } : o))
      );
    },
    [itemList]
  );

  const removeItem = useCallback(
    (id: TodoItem['id']) => {
      setItemList(itemList.flatMap((o) => (o.id === id ? [] : [o])));
    },
    [itemList]
  );

  const sortedItemList = useMemo(() => itemList.slice().sort((i1, i2) => {
    if (i1.state === 'done') return 1;
    else if (i2.state === 'done') return -1;
    else return i1.id > i2.id ? 1 : -1
  }), [itemList]);

  return (
    <div style={{ flex: '1' }}>
      {sortedItemList.map((o) => (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          {editingItemId === o.id ? (
            <input
              value={o.title}
              style={{
                flex: '1',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setEditingItemId(0);
                }
              }}
              onChange={(e) => {
                setItemTitle(o.id, (e.target as HTMLInputElement).value);
              }}
              onDoubleClick={() => setEditingItemId(0)}
            />
          ) : (
            <span
              style={{
                ...(o.state === 'done' && { textDecoration: 'line-through' }),
              }}
              onDoubleClick={() => setEditingItemId(o.id)}
            >
              {o.title}
            </span>
          )}

          <div
            style={{
              display: editingItemId === o.id ? 'none' : 'flex',
              gap: '6px',
            }}
          >
            <span style={{ cursor: 'pointer' }}>
              {o.state === 'idle' ? (
                <span onClick={() => setItemState(o.id, 'done')}>▶️</span>
              ) : o.state === 'done' ? (
                <span onClick={() => setItemState(o.id, 'idle')}>✅</span>
              ) : (
                <span></span>
              )}
            </span>
            <span
              style={{ marginLeft: '12px', cursor: 'pointer' }}
              onClick={() => removeItem(o.id)}
            >
              ❌
            </span>
          </div>
        </div>
      ))}

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button onClick={() => addNewItem()}>+ 추가</button>
      </div>
    </div>
  );
}
function App() {
  const [data, setData] = useStorage();
  return (
    <>
      <div
        style={{
          width: 'calc(100vw - 4rem)',
          height: 'calc(100vh - 4rem)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <ListView list={data.list} onListUpdated={setData} />
      </div>
    </>
  );
}

export default App;
