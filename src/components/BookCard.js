import { Link } from "react-router-dom";
import supabase from "../config/supabaseClient";

const BookCard = ({ book, onDelete }) => {

    const handleDelete = async () => {
        const { data, error } = await supabase
        .from('livres')
        .delete()
        .eq('id', book.id)
        .select()

        if (error) {
            console.log(error)
        }

        if (data) {
            console.log(data)
            onDelete(book.id)
        }
    }

    return (
    <div className="book-card">
        <h3>{book.title}</h3>
        <span>{book.collection}</span>
        <div className="button">
            <Link to={'/' + book.id}>
                <i className="material-icons">edit</i>
            </Link>
            <i onClick={handleDelete} className="material-icons">delete</i>
        </div>
    </div>
    )
}

export default BookCard;