import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  TextField,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { format } from 'date-fns';
import { getAllMessTransaction } from 'api';

const MessTransaction = () => {
  const [studentData, setStudentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [studentId, setStudentId] = useState(''); // Replace with actual logic to get student ID

  // Fetch mess transactions from the backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        console.log("Hello");
        const response = await getAllMessTransaction();
        setStudentData(response);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  console.log("Hello");

  return (
    <MainCard title="Mess Transactions">
      <div className="p-4">
        <Paper className="mt-4">
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            className="mb-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Mess</TableCell>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Transaction Date</TableCell>
                  <TableCell>Meal Type</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {studentData
                  .filter((transaction) =>
                    transaction.students.some((student) =>
                      student.name.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                  )
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction, index) => (
                    <TableRow key={transaction.id || index} hover>
                      <TableCell>
                        {transaction.vendorId.userId.name ? transaction.vendorId.userId.name : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {transaction.students.length > 0 ? transaction.students[0].idNumber : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {format(new Date(transaction.date), 'dd/MM/yyyy HH:mm:ss')}
                      </TableCell>
                      <TableCell>{transaction.type}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>

            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={studentData.length}
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) =>
              setRowsPerPage(parseInt(e.target.value, 10))
            }
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Paper>
      </div>
    </MainCard>
  );
};

export default MessTransaction;
