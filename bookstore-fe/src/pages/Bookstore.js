import '../App.css';
import Login from "../components/Login";
import {Box, Button, Grid} from "@mui/material";
import Welcome from "../components/Welcome";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import api from '../api/books';

function Bookstore() {

    const [books, setBooks] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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

  return (
    <main className={"App"}>
        <Grid container>
            <Grid item xs={12}>
                Create
            </Grid>
            <Grid item xs={12}>
                Update
            </Grid>
            <Grid item xs={12}>
                Delete
            </Grid>
            <Grid item xs={12}>
                Search
            </Grid>


            <Grid item xs={12}>
                <Link to={"/"}>Go to Homepage</Link>
            </Grid>
        </Grid>
    </main>
  );
}

export default Bookstore;
