const BookCard = ({ book }) => {
    return (
    <div className="book-card">
        <h3>{book.title}</h3>
        <span>{book.collection}</span>
    </div>
    )
}

export default BookCard;