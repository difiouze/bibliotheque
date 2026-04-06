const IsbnSearchInput = ({ isbnHandleSearch, setIsbnInput, isbnError }) => {

    return (
        <>
        <div className="isbn-search">
            <input 
            name="isbn-input-search"
            className="input-search" 
            onChange={(e) => setIsbnInput(e.target.value)}
            placeholder="Veuillez rentrer un ISBN"
            >
            </input>
            <button className="button button--primary" onClick={isbnHandleSearch}>Rechercher</button>
        </div>
        <div className="isbn-error__container">
            {isbnError && <span className="isbn-error">{isbnError}</span>}
        </div>
        </>
    )
}

export default IsbnSearchInput