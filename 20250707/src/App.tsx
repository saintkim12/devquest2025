import { useCallback, useEffect, useMemo, useState } from 'react'
import './App.css'

type UrlItem = { id: number; url: string; title: string; tags: string[]; timestamp: number }
function App() {
  const [urlList, setUrlList] = useState([] as Array<UrlItem>)
  const [urlItemForm, setUrlItemForm] = useState({ id: 0, url: '', title: '', tags: [], timestamp: 0 })
  const [isLoading, setIsLoading] = useState(true)
  // const [editingItemId, setEditingItemId] = useState(0)
  const [editingItemForm, setEditingItemForm] = useState({ id: 0, url: '', title: '', tags: [], timestamp: 0 } as UrlItem)
  const editingItemId = useMemo(() => editingItemForm.id, [editingItemForm])
  const setEditingItem = useCallback(
    (id: number) => {
      console.log('setEditingItem', 'editingItemForm', editingItemForm, 'id', id)
      if (editingItemForm.id === id) setEditingItemForm({ id: 0, url: '', title: '', tags: [], timestamp: 0 })
        else {
      const item = urlList.find((o) => o.id === id)
      if (!item) return
      console.log('setEditingItem', 'item', item)
        setEditingItemForm({ ...item })
      }
    },
    [urlList, editingItemForm]
  )

  const addUrlItem = useCallback(async () => {
    let url = urlItemForm.url?.trim?.()
    // url 검증
    if (!url) return
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`
    }
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const title = urlItemForm.url
    setUrlList(
      [...urlList].concat({
        id: Date.now(),
        url,
        title: title,
        tags: [...urlItemForm.tags],
        timestamp: Date.now(),
      })
    )

    // clear form
    setIsLoading(false)
    setUrlItemForm({ id: 0, url: '', title: '', tags: [], timestamp: 0 })
  }, [isLoading, urlItemForm, urlList])

  const updateUrlItem = useCallback(
    (urlItem = editingItemForm) => {
      setUrlList([...urlList].map((o) => (o.id === urlItem.id ? { ...o, ...urlItem } : o)))
      setEditingItemForm({ id: 0, url: '', title: '', tags: [], timestamp: 0 })
    },
    [isLoading, urlItemForm, urlList]
  )

  useEffect(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* <!-- 🔹 1. 상단 입력 영역 (textarea + 버튼) --> */}
        <div className="flex gap-2">
          <textarea
            className="flex-1 border border-gray-300 rounded p-2 resize-none"
            rows={2}
            placeholder="내용을 입력하세요..."
            value={urlItemForm.url}
            onInput={(e) => setUrlItemForm({ ...urlItemForm, url: (e.target as HTMLTextAreaElement).value })}
          ></textarea>
          {/* <button className={!isLoading ? 'bg-gray-300 px-4 py-2 rounded cursor-not-allowed opacity-50' : 'bg-blue-600 px-4 py-2 rounded hover:bg-blue-700'} disabled={isLoading} onClick={addUrlItem}> */}
          <button {...(isLoading ? { className: 'bg-gray-300 px-4 py-2 rounded cursor-not-allowed opacity-50', disabled: true } : { className: 'bg-blue-600 px-4 py-2 rounded hover:bg-blue-700' })} onClick={addUrlItem}>
            추가
          </button>
        </div>
        {/* <!-- 🔹 2. 중간 검색 영역 (인풋 or 인풋 + 버튼) --> */}
        <div className="flex justify-end gap-2">
          <input type="text" placeholder="검색어를 입력하세요" className="border border-gray-300 rounded px-3 py-2" />
          <button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">태그 검색</button>
        </div>
        {/* <!-- 🔹 3. 하단 리스트 테이블 스타일 --> */}
        <div className="bg-white shadow rounded overflow-hidden">
          <div className="grid grid-cols-5 bg-gray-100 px-4 py-2 font-semibold text-sm text-gray-700">
            <div>제목</div>
            <div>URL</div>
            <div>태그</div>
            <div>날짜</div>
            <div>Action</div>
          </div>
          {/* <!-- 항목 리스트 --> */}
          <div className="divide-y divide-gray-200 text-sm">
            {urlList.map((item) => (
              <div key={item.id} className="grid grid-cols-5 px-4 py-2">
                {editingItemId === item.id ? (
                  <>
                    <div>
                      <input value={editingItemForm.title} onInput={(e) => setEditingItemForm({ ...editingItemForm, title: (e.target as HTMLInputElement).value })} />
                    </div>
                    <div>
                      <input value={editingItemForm.url} onInput={(e) => setEditingItemForm({ ...editingItemForm, url: (e.target as HTMLInputElement).value })} />
                    </div>
                    <div>
                      <input value={editingItemForm.tags.map((tag) => `#${tag}`).join(' ')} onInput={(e) => setEditingItemForm({ ...editingItemForm, tags: (e.target as HTMLInputElement).value.split(' ').map((tag) => tag.replace(/^#/, '')) })} />
                    </div>
                    <div>{Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(item.timestamp)}</div>
                    <div>
                      <button onClick={() => updateUrlItem(editingItemForm)}>저장</button>
                      <button onClick={() => setEditingItemForm({ id: 0, url: '', title: '', tags: [], timestamp: 0 })}>취소</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <span>{item.title}</span>
                    </div>
                    <div>
                      <a href={item.url}>{item.url}</a>
                    </div>
                    <div>{item.tags.map((tag) => <span>#{tag}</span>).join('&nbsp;')}</div>
                    <div>{Intl.DateTimeFormat('ko-KR', { dateStyle: 'full' }).format(item.timestamp)}</div>
                    <div>
                      <button onClick={() => setEditingItem(item.id)}>수정</button>
                      <button onClick={() => setUrlList(urlList.flatMap((o) => (o.id === item.id ? [] : o)))}>삭제</button>
                    </div>
                  </>
                )}
              </div>
            ))}
            {/* <!-- 필요시 항목 더 추가 --> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
