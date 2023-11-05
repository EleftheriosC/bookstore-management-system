import {Grid, TextField} from "@mui/material";
import { useState} from "react";
import api from "../api/bookstore";
import {useNavigate} from "react-router-dom";

function AddBook( props ) {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationYear, setPublicationYear] = useState(0);
    const [isbn, setIsbn] = useState("");
    const navigate = useNavigate();
    const tokenReceived = props.token;
    const createBook = async (title, author, publicationYear, isbn) => {

        const validTitle = title !== null && title.length >0;
        const validAuthor = author !== null && author.length >0;
        const validPublicationYear = publicationYear !== null && publicationYear.length >0;
        const validISBN =isbn !== null  && isbn.length >0;

        if ((validTitle)
            && (validAuthor)
            && (validPublicationYear)
            && (validISBN))
        {
            const newBook = {
                title: title,
                author: author,
                publicationYear: parseInt(publicationYear),
                isbn: isbn
            };

            try {
                let response = await api.post('/Book', newBook,
                    {
                        headers: {
                            Authorization: `Bearer ${tokenReceived}`,
                            'Content-Type': 'application/json'
                        }
                    });
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
                        id="addBookBtn"
                        onClick={() => createBook(title,author,publicationYear,isbn)}
                    >
                        Add Book
                    </button>
                </Grid>


                <Grid item xs={2} mb={5}>
                    <TextField
                        required
                        id="addBookTitle"
                        label="Title"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="addBookAuthor"
                        label="Author"
                        onChange={(e) => {
                            setAuthor(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="addBookPublicationYear"
                        label="Publication Year"
                        onChange={(e) => {
                            setPublicationYear(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        required
                        id="addBookISBN"
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
