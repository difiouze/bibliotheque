const Filter = ({ search, setSearch, setSelectedCollection, books = [] }) => {

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

  const handleCollectionChange = (e) => {
    setSelectedCollection(e.target.value)
  }

  const uniqueCollections = [...new Set(
    books
      .map(book => book.collection)
      .filter(Boolean)
  )];

  return (
    <>
      <div className="search-filter">
        <input
          id="input-search"
          className="input-search"
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Rechercher un livre..."
        />
      </div>

      <div className="collection-filter">
        <label htmlFor="collection-select">Choisir une collection:</label>
        <select
          name="collection-option"
          id="collection-select"
          onChange={handleCollectionChange}
        >
          <option value="">--Choisir une collection--</option>
          {uniqueCollections.map(collection => (
            <option key={collection} value={collection}>{collection}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Filter