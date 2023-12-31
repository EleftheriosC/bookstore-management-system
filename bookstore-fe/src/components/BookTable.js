import {Grid, TextField, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import api from "../api/bookstore";

function BookTable(props) {

    const [books, setBooks] = useState([]);
    const [searchTitle, setSearchTitle]= useState("");
    const [searchAuthor, setSearchAuthor]= useState("");
    const tokenReceived = props.token;
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            setError(false);
            setLoading(true);

            try {
                const response = await api.get('/Book',
                    {
                        headers: {
                            Authorization: `Bearer ${tokenReceived}`,
                            'Content-Type': 'application/json'
                        }
                    });
                if (response && response.data){
                    setBooks(response.data);
                }
                setLoading(false);

            } catch (err) {
                if (err.response) {
                    console.log(err.response.data);
                    console.log(err.response.status);
                    console.log(err.response.headers);
                }
                else {
                    setLoading(false);
                    setError(true);
                    console.log(`Error: ${err.message}`)
                }
            }
        }

        fetchBooks();
    }, [tokenReceived]);

    const columns = [
        { field: 'bookEntityId', headerName: 'ID', width: 90},
        { field: 'title', headerName: 'Title', width: 400},
        { field: 'author', headerName: 'Author', width: 400},
        { field: 'publicationYear', headerName: 'Publication Year', width: 400},
        { field: 'isbn', headerName: 'ISBN', width: 400}
    ];


    const findBook = async (title, author) => {
        setLoading(true);
        setError(false);

        try {
                const searchParams = {};
                if (title){
                    searchParams.title = title
                }

                if (author) {
                    searchParams.author = author
                }
                    let response = await api.get(`/Book/GetBooksByTitleOrAuthor`,
                    {
                        params: searchParams,
                        headers: {
                            Authorization: `Bearer ${tokenReceived}`,
                            'Content-Type': 'application/json'
                        }
                    }, searchParams);
                if (response && response.data){
                    setBooks(response.data);
                }
                setLoading(false);

            } catch (err) {
                setLoading(false);
                setError(true);
                console.log(`Error: &{err.message}`);
            }
    }

    return (
        <>

            <Grid item xs={12}>
                <Typography variant={"h4"} color={'black'}>
                    Book List
                </Typography>
            </Grid>

            <Grid container alignItems={'center'}>
                <Grid container m={2} justifyContent={'center'} alignItems={'center'}>
                <Grid item xs={2} mb={5}>
                    <button
                        type="submit"
                        id="searchBookBtn"
                        disabled={loading}
                        onClick={() => findBook(searchTitle, searchAuthor)}
                    >
                        Search for Book
                    </button>
                    {error &&
                        <Typography variant={"subtitle2"} color={'red'}>
                            Search failed please try again.
                        </Typography>
                    }
                </Grid>


                <Grid item xs={2} mb={5}>
                    <TextField
                        id="bookTitleSearch"
                        label="Search By Title"
                        onChange={(e) => {
                            setSearchTitle(e.target.value)
                        }}
                        value={searchTitle}
                    />
                </Grid>

                <Grid item xs={2} mb={5}>
                    <TextField
                        id="bookAuthorSearch"
                        label="Search By Author"
                        onChange={(e) => {
                            setSearchAuthor(e.target.value)
                        }}
                        value={searchAuthor}
                    />
                </Grid>

                </Grid>

            <Grid container item xs={12}>
                <DataGrid
                    sx={{m: 4}}
                    getRowId={(row => row.bookEntityId)}
                    columns={columns}
                    rows={books}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />

            </Grid>
            </Grid>

        </>
    );
};

export default BookTable;
