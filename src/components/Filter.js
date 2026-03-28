const Filter = ({ search, setSearch }) => {

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  return (
    <input
    className="input-search"
      type="text"
      value={search}
      onChange={handleChange}
      placeholder="Rechercher un livre..."
    />
  )
}

export default Filter