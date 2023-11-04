import {Button, Grid, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../api/books";

function AddBook() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationYear, setPublicationYear] = useState(0);
    const [isbn, setIsbn] = useState("");

    const createBook = async (title, author, publicationYear, isbn) => {
        console.log('Add Book Clicked');
        if ((title !== null && title.length >0)
            && (author !== null && author.length >0)
            && (publicationYear !== null && publicationYear.length >0)
            && (isbn !== null  && isbn.length >0))
        {
            const newBook = {
                title: title,
                author: author,
                publicationYear: parseInt(publicationYear),
                isbn: isbn
            };
            try {
                console.log('Attempting call');

                setLoading(true)

                let response = await api.post('/Book/AddBook', newBook);
                setLoading(false)

                return response;
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
                        id="addBookBtn"
                        onClick={() => createBook(title,author,publicationYear,isbn)}
                        // disabled={loading}
                        // onSubmit={ (e) => {
                        //     addBook(title,author,publicationYear,isbn)
                        // }}
                    >
                        Add Book
                    </button>
                </Grid>


                <Grid item xs={2} mb={5}>
                    <TextField
                        required
                        id="bookTitle"
                        label="Title"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="bookAuthor"
                        label="Author"
                        onChange={(e) => {
                            setAuthor(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="bookPublicationYear"
                        label="Publication Year"
                        on={(e) => {
                            setPublicationYear(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="bookISBN"
                        label="ISBN"
                        onChange={(e) => {
                            setIsbn(e.target.value)
                        }}
                    />
                </Grid>
            </Grid>

        </>
    );
}

export default AddBook;
