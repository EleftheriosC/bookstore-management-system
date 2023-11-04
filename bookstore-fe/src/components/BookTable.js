import {Grid, Typography} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import api from "../api/books";

function BookTable() {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await api.get('/Book');
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

    const columns = [
        { field: 'bookEntityId', headerName: 'ID', width: 90},
        { field: 'title', headerName: 'Title', width: 400},
        { field: 'author', headerName: 'Author', width: 400},
        { field: 'publicationYear', headerName: 'Publication Year', width: 400},
        { field: 'isbn', headerName: 'ISBN', width: 400}
    ];

    return (
        <>

            <Grid item xs={12}>
                <Typography variant={"h4"} color={'black'}>
                    Book List
                </Typography>
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

        </>
    );
};

export default BookTable;
