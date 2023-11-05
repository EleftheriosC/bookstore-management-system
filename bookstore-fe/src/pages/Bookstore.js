import '../App.css';
import Login from "../components/Login";
import {Box, Button, Grid, TextField, Typography} from "@mui/material";
import Welcome from "../components/Welcome";
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";
import BookTable from "../components/BookTable";
import AddBook from "../components/AddBook";
import DeleteBook from "../components/DeleteBook";
import UpdateBook from "../components/UpdateBook";

function Bookstore() {
    const location = useLocation();
    const token = location.state.tokenData !== null ? location.state.tokenData : "" ;
  return (
    <main className={"App"}>
        <Grid container>
            <Grid item xs={12} mt={10} mb={10}>
                <Typography variant={"h2"}>Book Management System</Typography>
            </Grid>

            <AddBook token={token} />

            <UpdateBook token={token}/>

            <DeleteBook token={token}/>

            <BookTable token={token}/>

            <Grid item xs={12} mt={5}>
                <Link to={"/"}>Sign Out</Link>
            </Grid>
        </Grid>
    </main>
  );
}

export default Bookstore;
