import {Button, Grid, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../api/books";
import {useNavigate} from "react-router-dom";

function UpdateBook() {

    const [loading, setLoading] = useState(false)
    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationYear, setPublicationYear] = useState(0);
    const [isbn, setIsbn] = useState("");
    const navigate = useNavigate();

    const updateBook = async (bookId, title, author, publicationYear, isbn) => {
        console.log('Update Book Clicked');

        const validTitle = title !== null && title.length >0;
        const validAuthor = author !== null && author.length >0;
        const validPublicationYear = publicationYear !== null && publicationYear.length >0;
        const validISBN =isbn !== null  && isbn.length >0;

        console.log(publicationYear)
        if ((validTitle)
            || (validAuthor)
            || (validPublicationYear)
            || (validISBN)
            && (bookId !== null && bookId.length >0))
        {
            const updatedBook = {
                title: validTitle ? title : null,
                author: validAuthor ? author : null,
                publicationYear: validPublicationYear ? parseInt(publicationYear) : -1,
                isbn: validISBN ? isbn : null
            };
            console.log('Add Book Conditions met');

            try {
                console.log('Attempting crate book call');
                let response = await api.put(`/Book/${bookId}`, updatedBook);
                navigate(0);
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
                        id="updateBookBtn"
                        onClick={() => updateBook(bookId,title,author,publicationYear,isbn)}
                        // disabled={loading}
                        // onSubmit={ (e) => {
                        //     addBook(title,author,publicationYear,isbn)
                        // }}
                    >
                        Update Book
                    </button>
                </Grid>

                <Grid item xs={2} mb={5}>
                    <TextField
                        required
                        id="updateBookId"
                        label="Book ID"
                        onChange={(e) => {
                            setBookId(e.target.value)
                        }}
                        value={bookId}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>
                    <TextField
                        required
                        id="updateBookTitle"
                        label="Title"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="updateBookAuthor"
                        label="Author"
                        onChange={(e) => {
                            setAuthor(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="updateBookPublicationYear"
                        label="Publication Year"
                        onChange={(e) => {
                            setPublicationYear(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="updateBookISBN"
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

export default UpdateBook;
