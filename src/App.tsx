import './App.css'
import { Sidebar } from './components/Sidebar'
import { Search } from './components/Search'
import { ViewModeProvider } from './provider/ViewMode.provider'

function App() {

  return (
    <div className="layout">
      <ViewModeProvider>
        <Sidebar />
        <main>
          <Search />
        </main>
      </ViewModeProvider>
    </div>
  )
}

export default App
