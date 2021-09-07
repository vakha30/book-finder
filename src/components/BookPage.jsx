import React from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function BookPage() {
    const { id } = useParams()
    const [book, setBook] = React.useState({})
    const [isLoaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        axios.get(`https://www.googleapis.com/books/v1/volumes?q="${id}"`)
            .then(({ data }) => {
                setBook(data.items[0])
                setLoaded(true)
            })
            .catch(e => console.log(e))
    }, [id])

    return (
        <div className="container">

            {isLoaded ?
                <div className="book-page">
                    <div className="book-image">
                        <img src={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_Mz3sqDvFMNTgft394pfjhZlsx7OWD47o3A&usqp=CAU'} alt="" />
                    </div>
                    <div className="book-info">
                        <h2 className="book-info__title">
                            {book.volumeInfo.title}
                        </h2>

                        <ul className="book-info__categories">
                            <li className="li-title">Categories: </li>
                            {book.volumeInfo.categories
                                ? book.volumeInfo.categories.map(category => <li key={category}>{category}</li>)
                                : '-----'
                            }
                        </ul>
                        <p className="book-info__description">
                            {book.volumeInfo.description}
                        </p>
                        <ul className="book-info__authors">
                            <li className="li-title">Authors: </li>
                            {book.volumeInfo.authors
                                ? book.volumeInfo.authors.map((author, i) => <li key={i}>{author}</li>)
                                : 'Unknow'
                            }
                        </ul>
                        <div className="book-info__original-link">
                            <span>Original links: </span>
                            <a href={book.volumeInfo.previewLink}>Preview link</a>
                            <a href={book.volumeInfo.infoLink}>Info link</a>

                        </div>
                    </div>
                </div>
                :
                <div className="loader" style={{ paddingTop: '40vh' }}><Loader type="TailSpin" color="#00BFFF" height={80} width={80} /></div>
            }

        </div>
    )
}

export default BookPage


// 