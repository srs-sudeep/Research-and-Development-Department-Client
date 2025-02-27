import React, { useState, useEffect } from 'react';
import {
  Box,
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
  Button,
  Checkbox,
  IconButton,
  Tooltip,
} from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import { getPayroleProfessor, updatePayrole } from 'api';
import { format } from 'date-fns';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';

const ProfessorPayrole = () => {
  const [payroles, setPayroles] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedPayrole, setSelectedPayrole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayroles();
  }, []);

  const fetchPayroles = async () => {
    try {
      const data = await getPayroleProfessor();
      setPayroles(data);
    } catch (error) {
      console.error('Error fetching payroles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewModalOpen = (event, payrole) => {
    // Prevent checkbox click from opening modal
    if (event.target.type !== 'checkbox') {
      setSelectedPayrole(payrole);
      setOpenViewModal(true);
    }
  };

  const handleViewModalClose = () => {
    setOpenViewModal(false);
    setSelectedPayrole(null);
  };

  const handleVerificationChange = async (payroleId, currentStatus) => {
    try {
      await updatePayrole(payroleId, { isVerified: !currentStatus });
      // Update local state
      setPayroles(payroles.map(payrole => 
        payrole._id === payroleId 
          ? { ...payrole, isVerified: !currentStatus }
          : payrole
      ));
    } catch (error) {
      console.error('Error updating payrole verification:', error);
    }
  };

  return (
    <MainCard title="Payrole Verification">
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
              <TableCell align="center">Verify</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payroles.map((payrole) => (
              <TableRow
                key={payrole._id}
                hover
                onClick={(e) => handleViewModalOpen(e, payrole)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>{payrole.staffId.userId.name}</TableCell>
                <TableCell>{payrole.pid.name}</TableCell>
                <TableCell>{payrole.countOfDays}</TableCell>
                <TableCell>₹{payrole.amount}</TableCell>
                <TableCell>
                  {format(new Date(payrole.startDate), 'dd/MM/yyyy')} - {format(new Date(payrole.endDate), 'dd/MM/yyyy')}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {payrole.isVerified ? (
                      <Tooltip title="Verified">
                        <CheckCircleIcon color="success" />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Pending">
                        <PendingIcon color="warning" />
                      </Tooltip>
                    )}
                    {payrole.isVerified ? 'Verified' : 'Pending'}
                  </Box>
                </TableCell>
                <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={payrole.isVerified}
                    onChange={() => handleVerificationChange(payrole._id, payrole.isVerified)}
                    color="primary"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View Payrole Modal */}
      <Dialog open={openViewModal} onClose={handleViewModalClose} maxWidth="sm" fullWidth>
        <DialogTitle>Payrole Details</DialogTitle>
        <DialogContent>
          {selectedPayrole && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Typography>
                <strong>Staff Name:</strong> {selectedPayrole.staffId.userId.name}
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
                <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                  {selectedPayrole.isVerified ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <PendingIcon color="warning" fontSize="small" />
                  )}
                  {selectedPayrole.isVerified ? 'Verified' : 'Pending'}
                </Box>
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleViewModalClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default ProfessorPayrole; 