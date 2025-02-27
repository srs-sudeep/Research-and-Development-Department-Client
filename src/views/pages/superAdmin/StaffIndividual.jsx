import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  IconButton,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { getIndiStaff } from 'api';
import MainCard from 'ui-component/cards/MainCard';

const StaffIndividual = () => {
  const { id } = useParams();
  const [staffData, setStaffData] = useState({
    name: '',
    email: '',
    idNumber: '',
    ldap: '',
    phoneNumber: '',
    dob: '',
    doj: '',
    upto: '',
    gender: '',
    addr1: '',
    addr2: '',
    projectId: '',
    employmenttype: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState(null);

  useEffect(() => {
    fetchStaffDetails();
  }, [id]);

  const fetchStaffDetails = async () => {
    try {
      setLoading(true);
      const data = await getIndiStaff(id);
      const formattedData = {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
        doj: data.doj ? new Date(data.doj).toISOString().split('T')[0] : '',
        upto: data.upto ? new Date(data.upto).toISOString().split('T')[0] : '',
      };
      setStaffData(formattedData);
      setOriginalData(formattedData);
    } catch (error) {
      console.error('Error fetching staff details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateStaff(id, staffData);
      // await axios.put(`/api/staff/${id}`, staffData);
      setIsEditing(false);
      fetchStaffDetails();
    } catch (error) {
      console.error('Error updating staff details:', error);
    }
  };

  const handleCancel = () => {
    setStaffData(originalData);
    setIsEditing(false);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <MainCard title="Staff Profile">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">{staffData.name}'s Profile</Typography>
          <Stack direction="row" spacing={1}>
            {isEditing ? (
              <>
                <IconButton onClick={handleSave} color="primary">
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel} color="error">
                  <CloseIcon />
                </IconButton>
              </>
            ) : (
              <IconButton onClick={() => setIsEditing(true)} color="primary">
                <EditIcon />
              </IconButton>
            )}
          </Stack>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>Personal Information</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Name"
                name="name"
                value={staffData.name || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Email"
                name="email"
                value={staffData.email || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={staffData.phoneNumber || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Date of Birth"
                name="dob"
                type="date"
                value={staffData.dob || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                label="Gender"
                name="gender"
                value={staffData.gender || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>Employment Information</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="LDAP ID"
                name="ldap"
                value={staffData.ldap || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="ID Number"
                name="idNumber"
                value={staffData.idNumber || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Valid Upto"
                name="upto"
                type="date"
                value={staffData.upto || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Date of Joining"
                name="doj"
                type="date"
                value={staffData.doj || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>Additional Information</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Project ID"
                name="projectId"
                value={staffData.projectId || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Address Line 1"
                name="addr1"
                value={staffData.addr1 || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Address Line 2"
                name="addr2"
                value={staffData.addr2 || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                select
                label="Employment Type"
                name="employmenttype"
                value={staffData.employmenttype || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              >
                <MenuItem value="permanent">Permanent</MenuItem>
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="temporary">Temporary</MenuItem>
              </TextField>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  );
};

export default StaffIndividual;
