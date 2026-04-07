import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import Filter from "../components/Filter";
import BookCard from "../components/BookCard";
import ReactPaginate from "react-paginate";

const Home = () => {
  const [fetchError, setFetchError] = useState(null);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");
  const [orderBy, setOrderBy] = useState("title");
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handleSearchChange = (value) => {
    setSearch(value);
    setCurrentPage(0);
  };

  const handleCollectionChange = (value) => {
    setSelectedCollection(value);
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('livres')
        .select()
        .order(orderBy, { ascending: ascendingOrder} )

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
  }, [orderBy, ascendingOrder])

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase());
    const matchesCollection = selectedCollection === "" || book.collection === selectedCollection;
    return matchesSearch && matchesCollection;
  });

  const itemsPerPage = 12;
  const offset = currentPage * itemsPerPage;
  const paginatedItems = filteredBooks.slice(offset, offset + itemsPerPage);
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    setBooks(prevBooks => {
      return prevBooks.filter(book => book.id !== id)
    })
  }

const handleAscendingOrder = (e) => {
  if (e.target.value === '') return;
  setAscendingOrder(e.target.value === 'ascending-true')
}

  return (
    <div className="page home">
      <Filter
        search={search}
        setSearch={handleSearchChange}
        setSelectedCollection={handleCollectionChange}
        books={books}
      />

      {fetchError && <p>{fetchError}</p>}

      <div className="books">
        <div className="order-by">
          <p>Classé par:</p>

        <div className="order-by__btn-container">
          <button 
            onClick={()=> setOrderBy('title')}
            className={orderBy === 'title' ? 'active' : ''}
          >
            Titre
          </button>
          <button 
            onClick={()=> setOrderBy('number')}
            className={orderBy === 'number' ? 'active' : ''}
          >
            Numéro
          </button>
          <button 
            onClick={()=> setOrderBy('created_at')}
            className={orderBy === 'created_at' ? 'active' : ''}
          >
            Création
          </button>        
        <select
          name="order-option"
          id="order-select"
          onChange={handleAscendingOrder}
        >
            <option value="ascending-true">Ordre croissant</option>
            <option value="ascending-false">Ordre décroissant</option>
        </select>

        </div>
        </div>
        <div className="books-grid">
          {paginatedItems.map(book => (
            <BookCard key={book.id} book={book} onDelete={handleDelete} />
          ))}
        </div>
        <ReactPaginate
          forcePage={currentPage}
          previousLabel={"Précédent"}
          nextLabel={"Suivant"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredBooks.length / itemsPerPage)}
          marginPagesDisplayed={5}
          pageRangeDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName="pagination"
          activeClassName="pagination__active"
          pageLinkClassName="pagination__link"
          previousLinkClassName="pagination__prev-next"
          nextLinkClassName="pagination__prev-next"
          disabledClassName="pagination__disabled"
        />
      </div>
    </div>
  )
}

export default Home