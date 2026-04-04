const googlebooksapi = process.env.REACT_APP_GOOGLE_BOOKS_API

const fetchIsbn = async (isbn) => {

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${googlebooksapi}

`)
        const data = await response.json()
        if (!data.items) throw new Error('Livre introuvable')
        return data.items[0].volumeInfo 
    }

    catch (error) {
        console.log(error)
        throw error
    }
} 

export default fetchIsbn;