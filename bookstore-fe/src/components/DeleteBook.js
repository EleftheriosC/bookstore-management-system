import {Button, Grid, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import api from "../api/books";
import {useNavigate} from 'react-router-dom';

function DeleteBook() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false)
    const [bookId, setBookId] = useState("");
    const navigate = useNavigate();

    const removeBook = async (bookId) => {
        console.log('Delete Book Clicked');
        if (bookId !== null && bookId.length >0)
        {
            try {
                console.log('Attempting delete book call');
               let response = await api.delete(`/Book/DeleteBook/${bookId}`);
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
                        onClick={() => removeBook(bookId)}
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
                        required
                        id="bookId"
                        label="Book ID"
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

export default DeleteBook;
