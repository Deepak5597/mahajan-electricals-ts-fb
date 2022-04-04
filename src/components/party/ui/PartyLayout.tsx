import { FC, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import useGlobal from '../../../global/hooks/useGlobal';
import { useNavigate } from 'react-router-dom';
import IParty from '../model/party';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import PartyListAction from './components/PartyListAction';

const PartyLayout: FC = () => {
    const navigate = useNavigate();

    const { parties } = useGlobal();
    const [filteredParties, setFilteredParties] = useState<IParty[]>(parties);
    const [partyDataChoice, setPartyDataChoice] = useState<string>("all");
    const [tableData, setTableData] = useState<IParty[]>(filteredParties);
    const [searchText, setSearchText] = useState<string>("");

    //pagination setup start
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number,) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    //pagination setup ends

    useEffect(() => {
        if (partyDataChoice === "all") {
            setFilteredParties(parties);
        } else {
            setFilteredParties(parties.filter(party => party.type === partyDataChoice));
        }
    }, [partyDataChoice, parties]);

    useEffect(() => {
        console.log("in")
        if (searchText === "") {
            setTableData(filteredParties);
        } else {
            setTableData(filteredParties.filter(party => JSON.stringify(party).toLowerCase().search(searchText.toLowerCase()) > 1))
        }
    }, [filteredParties, searchText]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", height: "100%", borderRadius: 2, rowGap: 2 }}>
            <Box sx={{ backgroundColor: "common.white", p: 2, display: "flex", justifyContent: "space-between", borderRadius: 2 }}>
                <Box>
                    <FormControl sx={{ width: "25ch" }}>
                        <InputLabel id="partyType-select-label">Showing Parties</InputLabel>
                        <Select
                            size="small"
                            labelId="partyType-select-label"
                            id="partyType-select"
                            value={partyDataChoice}
                            label="howing Parties"
                            onChange={(e) => { setPartyDataChoice(e.target.value) }}
                        >
                            <MenuItem value="all">All</MenuItem>
                            <MenuItem value="credit">Credit</MenuItem>
                            <MenuItem value="sale">Sale</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate("/parties/create")}>
                        Add Party
                    </Button>
                </Box>
            </Box>
            <Box sx={{ flex: 1, p: 2, backgroundColor: "common.white", borderRadius: 2, display: "flex", flexDirection: "column" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}> Total Parties &nbsp;| &nbsp;{tableData.length}</Typography>
                    <TextField type="search" label="Search Parties" variant="outlined" size="small" onChange={(e) => { setSearchText(e.target.value) }} />
                </Box>
                <Box sx={{ flex: 1, mt: 2, display: "flex", flexDirection: "column" }}>
                    {
                        tableData.length > 0 ?
                            (
                                <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
                                    <Box sx={{ flex: 1 }}>

                                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                                            <TableContainer component={Paper} sx={{ maxHeight: 340 }}>
                                                <Table stickyHeader aria-label="Party Data">
                                                    <TableHead>
                                                        <TableRow sx={{ p: 0, m: 0, "& th": { backgroundColor: "primary.main", color: "primary.contrastText" } }}>
                                                            <TableCell>Id</TableCell>
                                                            <TableCell align="center">Name</TableCell>
                                                            <TableCell align="center">Type</TableCell>
                                                            <TableCell align="center">Current Balance</TableCell>
                                                            <TableCell align="center">Action</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {
                                                            (rowsPerPage > 0
                                                                ? tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                : tableData).map((pageData: IParty) => {
                                                                    return (
                                                                        <TableRow key={pageData.id} sx={{ '& td': { p: 0.8 } }}>
                                                                            <TableCell component="th" scope="row">{pageData.id}</TableCell>
                                                                            <TableCell align="center">{pageData.name}</TableCell>
                                                                            <TableCell align="center">{pageData.type}</TableCell>
                                                                            <TableCell align="center">{pageData.currentBalance}</TableCell>
                                                                            <TableCell align="center">
                                                                                <PartyListAction data={pageData} key={pageData.id} />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                })
                                                        }
                                                        {emptyRows > 0 && (
                                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                                <TableCell colSpan={6} />
                                                            </TableRow>
                                                        )}
                                                    </TableBody>
                                                    <TableFooter>
                                                        <TableRow>
                                                        </TableRow>
                                                    </TableFooter>
                                                </Table>
                                            </TableContainer>
                                        </Paper>

                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={tableData.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                            sx={{ float: "right" }}
                                        />
                                    </Box>
                                </Box>
                            )
                            :
                            <Typography variant="body1"> No Data</Typography>
                    }
                </Box>
            </Box>
        </Box >
    )
}

export default PartyLayout