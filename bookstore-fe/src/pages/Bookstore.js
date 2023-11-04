import '../App.css';
import Login from "../components/Login";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Welcome from "../components/Welcome";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import api from '../api/books';
import {DataGrid} from "@mui/x-data-grid";
import BookTable from "../components/BookTable";
import AddBook from "../components/AddBook";

function Bookstore() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const columns = [
        { field: 'bookEntityId', headerName: 'ID', width: 90},
        { field: 'title', headerName: 'Title', width: 140},
        { field: 'author', headerName: 'Author', width: 140},
        { field: 'publicationYear', headerName: 'Publication Year', width: 90},
        { field: 'isbn', headerName: 'ISBN', width: 140}
    ];

    const rows = Object.keys(books)
        .map( bookEntityId =>
            ({
                bookEntityId: bookEntityId
            })
        )

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/Book/GetBooks');
                if (response && response.data){
                    setBooks(response.data);
                }
            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
                else {
                    console.log(`Error: ${err.message}`)
                }
            }
        }

        fetchBooks();
    }, []);

    const booksArray = books.map( book =>
        <li key={book.bookEntityId}>
            <Typography variant={"h5"} color={'black'}>
                Title
            </Typography>
            <p>
                {book.title}
            </p>
            <Typography variant={"h5"} color={'black'}>
                Author
            </Typography>
            <p>
                {book.author}
            </p>
            <Typography variant={"h5"} color={'black'}>
                Publication Year
            </Typography>
            <p>
                {book.publicationYear}
            </p>
            <Typography variant={"h5"} color={'black'}>
                ISBN
            </Typography>
            <p>
                {book.isbn}
            </p>
        </li>);


  return (
    <main className={"App"}>
        <Grid container>

            <Grid item xs={12} mt={10} mb={10}>
                <Typography variant={"h2"}>Book Management System</Typography>
            </Grid>

            <AddBook/>

            <BookTable/>

            <Grid item xs={12} mt={10}>
                <Link to={"/"}>Go to Homepage</Link>
            </Grid>
        </Grid>
    </main>
  );
}

export default Bookstore;
