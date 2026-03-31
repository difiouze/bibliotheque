import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import Filter from "../components/Filter";
import BookCard from "../components/BookCard";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('livres')
        .select()

      if (error) {
        setFetchError('Livres non trouvés')
        setBooks([])
        console.log(error)
        return;
      }

      if (data) {
        setBooks(data)
        setFetchError(null)
      }
    }
    fetchBooks()
  }, [])

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesCollection = selectedCollection === "" || book.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  const handleDelete = (id) => {
    setBooks(prevBooks => {
      return prevBooks.filter(book => book.id !== id)
    })
  }

  return (
    <div className="page home">
      <Filter
        search={search}
        setSearch={setSearch}
        setSelectedCollection={setSelectedCollection}
        books={books}
      />

      {fetchError && <p>{fetchError}</p>}

      <div className="books">
        <div className="books-grid">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home