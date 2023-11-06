import {Grid, TextField, Typography} from "@mui/material";
import { useState} from "react";
import api from "../api/bookstore";
import {useNavigate} from 'react-router-dom';

function DeleteBook(props) {

    const [bookId, setBookId] = useState("");
    const navigate = useNavigate();
    const tokenReceived = props.token;
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const removeBook = async (bookId) => {
        setError(false);

        if (bookId !== null && bookId.length >0)
        {
            setLoading(true);

            try {
               let response = await api.delete(`/Book/${bookId}`,
                   {
                       headers: {
                           Authorization: `Bearer ${tokenReceived}`,
                           'Content-Type': 'application/json'
                       }
                   });
                setBookId("");
                navigate(0);
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
                        id="deleteBookBtn"
                        disabled={loading}
                        onClick={() => removeBook(bookId)}
                    >
                        Delete Book
                    </button>
                </Grid>

                <Grid item xs={2} mb={5}>
                    <TextField
                        required
                        id="deleteBookId"
                        label="Book ID"
                        onChange={(e) => {
                            setBookId(e.target.value)
                        }}
                        value={bookId}
                    />

                    {error &&
                            <Typography variant={"subtitle2"} color={'red'}>
                                Book deletion failed please enter a valid Book ID.
                            </Typography>
                    }
                </Grid>

            </Grid>

        </>
    );
}

export default DeleteBook;
