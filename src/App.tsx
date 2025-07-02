import './App.css'
import { Sidebar } from './components/Sidebar'
import { Search } from './components/Search'
import { ViewModeProvider } from './provider/ViewMode.provider'
import { NotesList } from './components/NotesList'

function App() {

  return (
    <div className="layout">
      <ViewModeProvider>
        <Sidebar />
        <main>
          <Search />
          <section className='layout-flex relative'>
            <NotesList />
          </section>
        </main>
      </ViewModeProvider>
    </div>
  )
}

export default App
