import "./App.css";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Search } from "./components/Search";
import { ViewModeProvider } from "./provider/ViewMode.provider";
import { NotesIdProvider } from "./provider/NotesId.provider";
import { NotesList } from "./components/NotesList";
import { NotesContent } from "./components/NotesContent";
import { NotesManager } from "./components/NotesManager";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const regex = /android|iphone|ipad|ipod|blackberry|windows phone/i;

    if (regex.test(userAgent)) {
      setIsMobile(true);
    }
  }, []);

  return (
    <>
      {!isMobile ? (
        <div className="layout">
          <ViewModeProvider>
            <Sidebar />
            <main>
              <Search />
              <section className="layout-grid relative">
                <NotesIdProvider>
                  <NotesList />
                  <NotesContent />
                  <NotesManager />
                </NotesIdProvider>
              </section>
            </main>
          </ViewModeProvider>
        </div>
      ) : (
        <div className="mobile-layout inter">
          <h1>Mobile support not available</h1>
        </div>
      )}
    </>
  );
}

export default App;
