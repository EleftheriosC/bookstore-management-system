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
import DeleteBook from "../components/DeleteBook";

function Bookstore() {
  return (
    <main className={"App"}>
        <Grid container>

            <Grid item xs={12} mt={10} mb={10}>
                <Typography variant={"h2"}>Book Management System</Typography>
            </Grid>

            <AddBook/>

            <DeleteBook/>

            <BookTable/>

            <Grid item xs={12} mt={10}>
                <Link to={"/"}>Go to Homepage</Link>
            </Grid>
        </Grid>
    </main>
  );
}

export default Bookstore;
