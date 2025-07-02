import './App.css'
import { Sidebar } from './components/Sidebar'
import { Search } from './components/Search'
import { ViewModeProvider } from './provider/ViewMode.provider'
import { NotesIdProvider } from './provider/NotesId.provider'
import { NotesList } from './components/NotesList'
import { NotesContent } from './components/NotesContent'
import { NotesManager } from './components/NotesManager'

function App() {

  return (
    <div className="layout">
      <ViewModeProvider>
        <Sidebar />
        <main>
          <Search />
          <section className='layout-grid relative'>
            <NotesIdProvider>
              <NotesList />
              <NotesContent />
              <NotesManager />
            </NotesIdProvider>
          </section>
        </main>
      </ViewModeProvider>
    </div>
  )
}

export default App
