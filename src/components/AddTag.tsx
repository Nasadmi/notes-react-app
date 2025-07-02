import './styles/AddTag.css'

export const AddTag = ({ handleAddTag, shows }: { handleAddTag: (tag: FormDataEntryValue) => void, shows: boolean }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement

    const formData = new FormData(form)
    const obj = Object.fromEntries(formData)

    handleAddTag(obj.tag)
  }

  return (
    <form className={`add-tag ${shows && 'shows'}`} onSubmit={handleSubmit}>
      <h2 className='pacifico'>New name tag</h2>
      <input type="text" name="tag" id="tag" className='inter'/>
      <button type="submit" className='inter'>Add Tag</button>
    </form>
  )
}