import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams() 
  const navigate = useNavigate()

  const [title, setTitle] = useState('');
  const [collection, setCollection] = useState('');
  const [number, setNumber] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchBook = async () => {
      const { data, error } = await supabase
        .from('livres')
        .select()
        .eq('id', id)
        .single()

        if (error) {
          navigate('/', { replace: true })
        }

        if (data) {
          setTitle(data.title)
          setCollection(data.collection)
          setNumber(data.number)
          setDescription(data.description)
        }

    }
    fetchBook()
  }, [id, navigate])

  return (
    <div className="page update">
      <form>
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
        <button>Update</button>
      </form>
    </div>
  )
}

export default Update