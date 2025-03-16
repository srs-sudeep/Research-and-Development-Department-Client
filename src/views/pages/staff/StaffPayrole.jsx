import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import MainCard from 'ui-component/cards/MainCard'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'
import { createPayrole, getIndiProject, getIndiStaff, getPayroleStaff } from 'api'
import { format } from 'date-fns'
import FilePreview from 'ui-component/FilePreview'

const StaffPayrole = () => {
  const [payroles, setPayroles] = useState([])
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openViewModal, setOpenViewModal] = useState(false)
  const [selectedPayrole, setSelectedPayrole] = useState(null)
  const [formData, setFormData] = useState({
    pid: '',
    countOfDays: '',
    amount: '',
    startDate: '',
    endDate: '',
  })
  const [pdfFile, setPdfFile] = useState(null) // State for PDF file
  const [loading, setLoading] = useState(true)
  const [salary, setSalary] = useState(0)

  useEffect(() => {
    fetchPayroles()
    fetchProject()
  }, [])

  const fetchPayroles = async () => {
    try {
      const data = await getPayroleStaff()
      setPayroles(data)
    } catch (error) {
      console.error('Error fetching payroles:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProject = async () => {
    try {
      const data = await getIndiStaff(localStorage.getItem('id'))
      const pro = await getIndiProject(data.projectId)
      setFormData((prevFormData) => ({
        ...prevFormData,
        pid: pro.projectId,
      }))
      setSalary(data.salary)
    } catch (error) {
      console.error('Error fetching payroles:', error)
    } finally {
      setLoading(false)
    }
  }
  

  const handleCreateModalOpen = () => {
    setOpenCreateModal(true)
  }

  const handleCreateModalClose = () => {
    setOpenCreateModal(false)
    setFormData({
      pid: '',
      countOfDays: '',
      amount: '',
      startDate: '',
      endDate: '',
    })
    setPdfFile(null) // Reset PDF file
  }

  const handleViewModalOpen = (payrole) => {
    setSelectedPayrole(payrole)
    setOpenViewModal(true)
  }

  const handleViewModalClose = () => {
    setOpenViewModal(false)
    setSelectedPayrole(null)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prev) => {
      let updatedFormData = { ...prev, [name]: value };
  
      // Calculate the endDate based on startDate and countOfDays
      if (name === 'startDate' || name === 'countOfDays') {
        const { startDate, countOfDays } = updatedFormData;
  
        if (startDate && countOfDays) {
          const start = new Date(startDate);
          const daysToAdd = parseInt(countOfDays, 10);
  
          // Set the endDate by adding the countOfDays to the startDate
          const end = new Date(start);
          end.setDate(end.getDate() + daysToAdd - 1); // Subtract 1 to ensure inclusive count
  
          const formattedEndDate = end.toISOString().split('T')[0]; // Format the date as YYYY-MM-DD
          updatedFormData = {
            ...updatedFormData,
            endDate: formattedEndDate, // Update the form data with the calculated endDate
          };
        }
      }
  
      // When both the startDate, endDate, and countOfDays are set, calculate the salary accordingly
      const { startDate, endDate, countOfDays } = updatedFormData;
      if (startDate && endDate && countOfDays) {
        const start = new Date(startDate);
        const end = new Date(endDate);
  
        if (start <= end) {
          let totalAmount = 0;
          let current = new Date(start);
  
          // Loop through each month between start and end dates
          while (current <= end) {
            const year = current.getFullYear();
            const month = current.getMonth() + 1; // Month is 0-indexed, so add 1
            const daysInMonth = new Date(year, month, 0).getDate();
  
            // Calculate how many days to take for the current month
            const firstDay = current.getDate();
            const lastDay =
              current.getMonth() === end.getMonth() && current.getFullYear() === end.getFullYear()
                ? end.getDate()
                : daysInMonth;
  
            const daysWorkedInMonth = lastDay - firstDay + 1;
            const dailySalary = salary / daysInMonth;
            totalAmount += dailySalary * daysWorkedInMonth;
  
            // Move to the next month
            current.setMonth(current.getMonth() + 1);
            current.setDate(1); // Set to first day of the month
          }
  
          updatedFormData = {
            ...updatedFormData,
            amount: totalAmount.toFixed(2), // Update the amount field with the calculated amount
          };
        }
      }
  
      return updatedFormData;
    });
  };        

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]) // Set the selected file
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData) // Logs formData correctly

    const payroleData = new FormData() // Use FormData for file upload
    payroleData.append('pid', formData.pid)
    payroleData.append('countOfDays', formData.countOfDays)
    payroleData.append('amount', formData.amount)
    payroleData.append('startDate', formData.startDate)
    payroleData.append('endDate', formData.endDate)

    if (pdfFile) {
      payroleData.append('file', pdfFile) // Append the PDF file
    }

    try {
      await createPayrole(payroleData) // Send FormData including the PDF file
      handleCreateModalClose()
      fetchPayroles()
    } catch (error) {
      console.error('Error creating payrole:', error)
    }
  }

  return (
    <MainCard title="Payrole Management">
      <Box sx={{ mb: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateModalOpen}>
          Add New Payrole
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project ID</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payroles.map((payrole) => (
              <TableRow
                key={payrole._id}
                hover
                onClick={() => handleViewModalOpen(payrole)}
                sx={{ cursor: 'pointer' }}>
                <TableCell>{payrole.pid.name}</TableCell>
                <TableCell>{payrole.countOfDays}</TableCell>
                <TableCell>₹{payrole.amount}</TableCell>
                <TableCell>
                  {format(new Date(payrole.startDate), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  {format(new Date(payrole.endDate), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                <Chip
                    icon={
                      payrole.isVerified ? <CheckCircleIcon /> : <PendingIcon />
                    }
                    label={payrole.isVerified ? 'Verified' : 'Pending'}
                    color={payrole.isVerified ? 'success' : 'warning'}
                    size="small"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Payrole Modal */}
      <Dialog
        open={openCreateModal}
        onClose={handleCreateModalClose}
        maxWidth="sm"
        fullWidth>
        <DialogTitle>Create New Payrole</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Project ID"
                name="pid"
                disabled
                value={formData.pid}
                onChange={handleInputChange}
                required
                fullWidth
              />
              <TextField
                label="Number of Days"
                name="countOfDays"
                type="number"
                value={formData.countOfDays}
                onChange={handleInputChange}
                required
                fullWidth
                inputProps={{ min: 0 }}
              />
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                disabled
                value={formData.endDate}
                onChange={handleInputChange}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                disabled
                value={formData.amount}
                onChange={handleInputChange}
                required
                fullWidth
                inputProps={{ min: 0 }}
              />
              <p
                style={{ marginTop: '10px' }}
                className="text-xs text-gray-500">
                Upload scanned PDF of attendance sheet
              </p>
              <input type="file" accept=".pdf" onChange={handlePdfChange} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateModalClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* View Payrole Modal */}
      <Dialog
        open={openViewModal}
        onClose={handleViewModalClose}
        maxWidth="sm"
        fullWidth>
        <DialogTitle>Payrole Details</DialogTitle>
        <DialogContent>
          {selectedPayrole && (
            <div className='flex items-center justify-between gap-2'>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Typography>
                <strong>Project:</strong> {selectedPayrole.pid.name}
              </Typography>
              <Typography>
                <strong>Number of Days:</strong> {selectedPayrole.countOfDays}
              </Typography>
              <Typography>
                <strong>Amount:</strong> ₹{selectedPayrole.amount}
              </Typography>
              <Typography>
                <strong>Start Date:</strong>{' '}
                {format(new Date(selectedPayrole.startDate), 'dd/MM/yyyy')}
              </Typography>
              <Typography>
                <strong>End Date:</strong>{' '}
                {format(new Date(selectedPayrole.endDate), 'dd/MM/yyyy')}
              </Typography>
              <Typography>
                <strong>Status:</strong>{' '}
                {selectedPayrole.isVerified ? 'Verified' : 'Pending'}
              </Typography>
            </Box>
            <FilePreview
            filePath={`http://localhost:5000/${selectedPayrole.file.path}`}
          />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  )
}

export default StaffPayrole
