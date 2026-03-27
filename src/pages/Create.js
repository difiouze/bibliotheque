import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient";

const Create = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [collection, setCollection] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!title || !collection || !number || !description) {
      setFormError('Tous les champs doivent être remplis');
      return
    }

    const { data, error } = await supabase
        .from('livres')
        .insert([{title, collection, number, description}])
        .select()

        if(error) {
          console.log(error)
          setFormError('Tous les champs doivent être remplis')
        }

        if(data) {
          setFormError(null)
          navigate('/')
        }
  }

  return (
    <div className="page create">
      <h2 className="form-title">Créer</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label 
          htmlFor="book-title">
            Titre
        </label>
        <input 
          type="text" 
          id="book-title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        >
        </input>
        <label 
          htmlFor="book-collection">
            Collection
        </label>
        <input 
          type="text" 
          id="book-collection" 
          value={collection}
          onChange={(e) => setCollection(e.target.value)}
        >
        </input>
        <label 
          htmlFor="book-number">
            Numéro
        </label>
        <input 
          type="text" 
          id="book-number" 
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        >
        </input>
        <label 
          htmlFor="book-description">
            Description
        </label>
        <textarea
          rows="10"
          id="book-description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        >
        </textarea>
        <button>Ajouter</button>
      </form>
      { formError && <span className="form-error">{formError}</span>}
    </div>
  )
}

export default Create