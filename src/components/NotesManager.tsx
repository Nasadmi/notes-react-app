import { useNotesId } from "../hooks/notesId.hook";
import { useNotes } from "../hooks/notes.hook";
import { Icon } from "./Icon";
import {
  Delete01FreeIcons,
  Archive03FreeIcons,
  Unarchive03FreeIcons,
} from "@hugeicons/core-free-icons";
import { Alert, Toast } from "../service/alerts";
import { useViewMode } from "../hooks/viewMode.hook";
import './styles/NotesManager.css'

export const NotesManager = () => {
  const { id } = useNotesId();
  const { deleteNote, updateNote, getNote } = useNotes();
  const { viewMode } = useViewMode()

  const handleRemove = () => {
    if (!id) {
      Toast.fire({
        title: "Note doesnt selected",
        icon: "warning",
      });

      return;
    }

    Alert.fire({
        title: 'Are you sure to delete this note?',
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
    }).then((result) => {
        if (!result.isConfirmed) {
            return;
        }

        deleteNote(id);
    })
  };

  const handleArchive = () => {
    (async () => {
      if (!id) {
        Toast.fire({
          title: "Note doesnt selected",
          icon: "warning",
        });

        return;
      }

      const note = await getNote(id);
      if (viewMode === 'all') {
        updateNote({ ...note, archived: true });
      } else {
        updateNote({ ...note, archived: false });
      }
    })();
  };

  return (
    <ul className="notesManager">
      <li>
        <button className="notesManager-removeNote inter" onClick={handleRemove}>
          <Icon icon={Delete01FreeIcons} />
          Remove this note
        </button>
      </li>
      <li>
        <button className="notesManager-archivedNote inter" onClick={handleArchive}>
          
          { viewMode === 'all' ? (
            <>
              <Icon icon={Archive03FreeIcons} />
              Archive this note
            </>
          ) : (
            <>
              <Icon icon={Unarchive03FreeIcons} />
              Unarchive this note
            </>
          ) }
        </button>
      </li>
    </ul>
  );
};
