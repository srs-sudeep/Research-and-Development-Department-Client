import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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
import MainCard from 'ui-component/cards/MainCard'
import { getAllPayroles } from 'api'
import { format } from 'date-fns'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PendingIcon from '@mui/icons-material/Pending'

const AdminPayroles = () => {
  const [payroles, setPayroles] = useState([])
  const [openViewModal, setOpenViewModal] = useState(false)
  const [selectedPayrole, setSelectedPayrole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayroles()
  }, [])

  const fetchPayroles = async () => {
    try {
      const data = await getAllPayroles()
      setPayroles(data)
    } catch (error) {
      console.error('Error fetching payroles:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewModalOpen = (payrole) => {
    setSelectedPayrole(payrole)
    setOpenViewModal(true)
  }

  const handleViewModalClose = () => {
    setOpenViewModal(false)
    setSelectedPayrole(null)
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <MainCard title="All Payroles">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Staff Name</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Period</TableCell>
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
                <TableCell>{payrole.staffId.userId.name}</TableCell>
                <TableCell>{payrole.pid.name}</TableCell>
                <TableCell>{payrole.countOfDays}</TableCell>
                <TableCell>₹{payrole.amount}</TableCell>
                <TableCell>
                  {format(new Date(payrole.startDate), 'dd/MM/yyyy')} -{' '}
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

      {/* View Payrole Modal */}
      <Dialog
        open={openViewModal}
        onClose={handleViewModalClose}
        maxWidth="sm"
        fullWidth>
        <DialogTitle>Payrole Details</DialogTitle>
        <DialogContent>
          {selectedPayrole && (
            <Box
              sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Typography>
                <strong>Staff Name:</strong>{' '}
                {selectedPayrole.staffId.userId.name}
              </Typography>
              <Typography>
                <strong>Staff Email:</strong>{' '}
                {selectedPayrole.staffId.userId.email}
              </Typography>
              <Typography>
                <strong>Staff Phone:</strong>{' '}
                {selectedPayrole.staffId.userId.phoneNumber}
              </Typography>
              <Typography>
                <strong>LDAP ID:</strong> {selectedPayrole.staffId.userId.ldap}
              </Typography>
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
                <Chip
                  icon={
                    selectedPayrole.isVerified ? (
                      <CheckCircleIcon />
                    ) : (
                      <PendingIcon />
                    )
                  }
                  label={selectedPayrole.isVerified ? 'Verified' : 'Pending'}
                  color={selectedPayrole.isVerified ? 'success' : 'warning'}
                  size="small"
                />
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  )
}

export default AdminPayroles
