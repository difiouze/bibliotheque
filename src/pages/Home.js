import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import Filter from "../components/Filter";
import BookCard from "../components/BookCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('livres')
        .select()

      if (error) {
        setFetchError('Livres non trouvés')
        setBooks(null)
        console.log(error)
      }

      if (data) {
        setBooks(data)
        setFetchError(null)
      }
    }
    fetchBooks()
  }, [])

  const filteredBooks = books?.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page home">

      <Filter search={search} setSearch={setSearch} />

      {fetchError && (<p>{fetchError}</p>)}
      {filteredBooks && (
        <div className="books">
          <div className="books-grid">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home