import '../App.css';
import { Grid, Typography} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
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

            <Grid item xs={12} mb={4}>
                <Typography variant={"h2"}>Book Management System</Typography>
                <Link to={"/"}>Sign Out</Link>
            </Grid>

            <AddBook token={token} />

            <UpdateBook token={token}/>

            <DeleteBook token={token}/>

            <BookTable token={token}/>

        </Grid>
    </main>
  );
}

export default Bookstore;
