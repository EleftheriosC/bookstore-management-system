import {Grid, TextField, Typography} from "@mui/material";
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
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const createBook = async (title, author, publicationYear, isbn) => {

        const validTitle = title !== null && title.length >0;
        const validAuthor = author !== null && author.length >0;
        const validPublicationYear = publicationYear !== null && publicationYear.length >0;
        const validISBN =isbn !== null  && isbn.length >0;
        setError(false);

        if ((validTitle)
            && (validAuthor)
            && (validPublicationYear)
            && (validISBN))
        {
            setLoading(true);

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
                setLoading(false);
                navigate(0);
                return response;
            } catch (err) {
                setLoading(false);
                setError(true);
                console.log(`Error: &{err.message}`);
            }
        }
    }

    return (
        <>
            <Grid container alignItems={'center'}>
                <Grid item xs={2} mb={5}>
                    <button
                        type="submit"
                        id="addBookBtn"
                        disabled={loading}
                        onClick={() => createBook(title,author,publicationYear,isbn)}
                    >
                        Add Book
                    </button>
                    {error &&
                        <Typography variant={"subtitle2"} color={'red'}>
                            Book addition failed please enter a valid Book details and try again.
                        </Typography>
                    }
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
