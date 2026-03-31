import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    return (
    <div className="book-card">
        <h3>{book.title}</h3>
        <span>{book.collection}</span>
        <div className="button">
            <Link to={'/' + book.id}>
                <i className="material-icons">edit</i>
            </Link>
        </div>
    </div>
    )
}

export default BookCard;