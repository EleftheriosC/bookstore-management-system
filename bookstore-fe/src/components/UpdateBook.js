import { Grid, TextField} from "@mui/material";
import {useState} from "react";
import api from "../api/bookstore";
import {useNavigate} from "react-router-dom";

function UpdateBook(props) {

    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publicationYear, setPublicationYear] = useState(-1);
    const [isbn, setIsbn] = useState("");
    const navigate = useNavigate();
    const tokenReceived = props.token;

    const updateBook = async (bookId, title, author, publicationYear, isbn) => {
        const validTitle = title !== null && title.length > 0;
        const validAuthor = author !== null && author.length > 0;
        const validPublicationYear = publicationYear !== null && publicationYear.length >0;
        const validISBN = isbn !== null && isbn.length >0;

            const updatedBook = {
                title: validTitle ? title : "",
                author: validAuthor ? author : "",
                publicationYear: validPublicationYear ? parseInt(publicationYear) : -1,
                isbn: validISBN ? isbn : ""
            };

            try {
                let response = await api.put(`/Book/${bookId}`, updatedBook,
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

    return (
        <>
            <Grid container>
                <Grid item xs={2} mb={5}>
                    <button
                        type="submit"
                        id="updateBookBtn"
                        onClick={() => updateBook(bookId,title,author,publicationYear,isbn)}
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
                        id="updateBookTitle"
                        label="Title"
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>

                    <TextField
                        id="updateBookAuthor"
                        label="Author"
                        onChange={(e) => {
                            setAuthor(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>
                    <TextField
                        id="updateBookPublicationYear"
                        label="Publication Year"
                        onChange={(e) => {
                            setPublicationYear(e.target.value)
                        }}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>
                    <TextField
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
