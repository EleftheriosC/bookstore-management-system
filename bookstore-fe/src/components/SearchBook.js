import {Button, Grid, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../api/bookstore";
import {useNavigate} from 'react-router-dom';

function SearchBook() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const navigate = useNavigate();

    const findBook = async (title, author) => {
        console.log('Find Book Clicked');
        if (bookId !== null && bookId.length >0)
        {
            try {
                console.log('Attempting delete book call');
               let response = await api.get('/Book/GetBooksByTitleOrAuthor');
                setBookId("");
                navigate(0);
            } catch (err) {
                console.log(`Error: &{err.message}`);
            }
        }
    }

    return (
        <>
            <Grid container>
                <Grid item xs={2} mb={5}>
                    <button
                        type="submit"
                        id="deleteBookBtn"
                        onClick={() => findBook(bookId)}
                        // disabled={loading}
                        // onSubmit={ (e) => {
                        //     addBook(title,author,publicationYear,isbn)
                        // }}
                    >
                        Delete Book
                    </button>
                </Grid>


                <Grid item xs={2} mb={5}>
                    <TextField
                        id="bookTitleSearch"
                        label="Search By Title"
                        onChange={(e) => {
                            setBookId(e.target.value)
                        }}
                        value={bookId}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>
                    <TextField
                        id="bookAuthorSearch"
                        label="Search By Author"
                        onChange={(e) => {
                            setBookId(e.target.value)
                        }}
                        value={bookId}
                    />
                </Grid>

            </Grid>

        </>
    );
}

export default SearchBook;
