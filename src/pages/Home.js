import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"

// components
import BookCard from "../components/BookCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState(null);

  useEffect(()=> {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('livres')
        .select()

        if(error) {
          setFetchError('Livres non trouvés')
          setBooks(null)
          console.log(error)
        }

        if(data) {
          setBooks(data)
          setFetchError(null)
        }
    }
    fetchBooks()
  }, [])

  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {books && (
       <div className="books">
         <div className="books-grid">
          {books.map(book => (
            <BookCard key={book.id} book={book}/>
          ))}
        </div>
       </div> 
      )}
    </div>
  )
}

export default Home