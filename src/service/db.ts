const DB_NAME = "notesDB";
const STORE_NAME = "notes";
const DB_VERSION = 1;

export interface Note {
  id?: number;
  title: string;
  tags: string[];
  content: string;
  last_edited: number;
  archived: boolean;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });

        store.createIndex("tags", "tags", { multiEntry: true });
        store.createIndex("archived", "archived", { unique: false });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function addNote(nota: Omit<Note, "id">): Promise<number> {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.add(nota);

        request.onsuccess = () => resolve(request.result as number);
        request.onerror = () => reject(request.error);
      })();
    } catch (error) {
      reject(error);
    }
  });
}

function getAllNotes(): Promise<Note[]> {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readonly");
        const store = tx.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => resolve(request.result as Note[]);
        request.onerror = () => reject(request.error);
      })();
    } catch (error) {
      reject(error);
    }
  });
}

function updateNote(nota: Note): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.put(nota);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      })();
    } catch (error) {
      reject(error);
    }
  });
}

function removeNote(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      (async () => {
        const db = await openDB();
        const tx = db.transaction(STORE_NAME, "readwrite");
        const store = tx.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => resolve();
        request.onerror = () => reject(request.error);
      })();
    } catch (error) {
      reject(error);
    }
  });
}

export const indexedDBService = {
  openDB,
  addNote,
  getAllNotes,
  removeNote,
  updateNote
};
