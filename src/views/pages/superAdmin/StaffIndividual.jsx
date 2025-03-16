import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  MenuItem,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Autocomplete,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { getIndiStaff, updateStaff, getAllProjects, updateProject } from 'api'
import MainCard from 'ui-component/cards/MainCard'

const StaffIndividual = () => {
  const { id } = useParams()
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
    employmenttype: '',
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)
  const [projects, setProjects] = useState([])
  const [allProjects, setAllProjects] = useState([])
  const [newProject, setNewProject] = useState({ projectId: '', start: '' })
  const [isAddingProject, setIsAddingProject] = useState(false)

  useEffect(() => {
    fetchStaffDetails()
    fetchProjects()
  }, [id])

  const fetchStaffDetails = async () => {
    try {
      setLoading(true)
      const data = await getIndiStaff(id)
      const formattedData = {
        ...data,
        dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : '',
        doj: data.doj ? new Date(data.doj).toISOString().split('T')[0] : '',
        upto: data.upto ? new Date(data.upto).toISOString().split('T')[0] : '',
      }
      setStaffData(formattedData)
      setOriginalData(formattedData)
    } catch (error) {
      console.error('Error fetching staff details:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchProjects = async () => {
    try {
      const data = await getAllProjects()
      setAllProjects(data)
      const staffProjects = data.filter((project) =>
        project.staffList.some((staffMember) => staffMember.staffId === id),
      )
      setProjects(staffProjects)
    } catch (error) {
      console.error('Error fetching projects:', error)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setStaffData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = async () => {
    const requiredStaffData = {
      name: staffData.name,
      email: staffData.email,
      idNumber: staffData.idNumber,
      ldap: staffData.ldap,
      phoneNumber: staffData.phoneNumber,
      dob: staffData.dob,
      doj: staffData.doj,
      upto: staffData.upto,
      gender: staffData.gender,
      addr1: staffData.addr1,
      addr2: staffData.addr2,
      employmenttype: staffData.employmenttype,
      salary: staffData.salary,
    }

    try {
      await updateStaff(id, requiredStaffData)
      setIsEditing(false)
      fetchStaffDetails()
    } catch (error) {
      console.error('Error updating staff details:', error)
    }
  }

  const handleCancel = () => {
    setStaffData(originalData)
    setIsEditing(false)
  }

  const handleEditEndDate = (projectId, value) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project._id === projectId
          ? {
              ...project,
              staffList: project.staffList.map((staffMember) =>
                staffMember.staffId === id
                  ? { ...staffMember, end: value }
                  : staffMember,
              ),
            }
          : project,
      ),
    )
  }

  const handleSaveEndDate = async (projectId) => {
    try {
      const updatedProject = projects.find(
        (project) => project._id === projectId,
      )

      const formData = {
        name: updatedProject.name,
        projectId: updatedProject.projectId,
        PI: updatedProject.PI,
        coPI: updatedProject.coPI,
        staffList: updatedProject.staffList.map((staff) => ({
          staffId: staff.staffId,
          start: staff.start,
          end: staff.end,
        })),
        start: updatedProject.start,
        startDate: updatedProject.startDate,
        endDate: updatedProject.endDate,
        fund: updatedProject.fund,
        isCompleted: updatedProject.isCompleted,
      }

      await updateProject(projectId, formData)
      fetchProjects()
    } catch (error) {
      console.error('Error updating project end date:', error)
    }
  }

  const handleAddProject = () => {
    setIsAddingProject(true)
  }

  const handleSaveNewProject = async () => {
    try {
      const newProjectData = {
        staffId: id,
        start: newProject.start,
      }
      await updateProject(newProject.projectId, newProjectData)
      setNewProject({ projectId: '', start: '' })
      setIsAddingProject(false)
      fetchProjects()
    } catch (error) {
      console.error('Error adding new project:', error)
    }
  }

  const allEndDatesFilled = () => {
    return projects.every((project) =>
      project.staffList.some(
        (staffMember) => staffMember.staffId === id && staffMember.end,
      ),
    )
  }

  if (loading) {
    return <Typography>Loading...</Typography>
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
          {/* Personal Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Personal Information
            </Typography>
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
                fullWidth>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Box>
          </Grid>

          {/* Employment Information */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Employment Information
            </Typography>
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Additional Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                fullWidth>
                <MenuItem value="permanent">Permanent</MenuItem>
                <MenuItem value="contractual">Contractual</MenuItem>
                <MenuItem value="visiting">Visiting</MenuItem>
              </TextField>
            </Box>
          </Grid>

          {/* Project Table */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Assigned Projects
            </Typography>
            {projects.length > 0 && !isAddingProject && (
              <Box textAlign={'right'}>
                <Button
                  variant="contained"
                  onClick={handleAddProject}
                  disabled={!allEndDatesFilled()}>
                  Add Project
                </Button>
              </Box>
            )}

            {isAddingProject && (
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Autocomplete
                    options={allProjects} // Use the allProjects array for the dropdown
                    getOptionLabel={(option) => option.name} // Show project name in the dropdown
                    onChange={(event, newValue) => {
                      setNewProject({
                        ...newProject,
                        projectId: newValue ? newValue._id : '',
                      })
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Project Name" fullWidth />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Start Date"
                    type="date"
                    value={newProject.start}
                    onChange={(e) =>
                      setNewProject({ ...newProject, start: e.target.value })
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box textAlign={'right'}>
                    <Button variant="contained" onClick={handleSaveNewProject}>
                      Save Project
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            )}

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Project ID</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.map((project) => {
                    const staffMember = project.staffList.find(
                      (member) => member.staffId === id,
                    )
                    return (
                      <TableRow key={project._id}>
                        <TableCell>{project.projectId}</TableCell>
                        <TableCell>{project.name}</TableCell>
                        <TableCell>
                          {staffMember?.start
                            ? new Date(staffMember.start).toLocaleDateString()
                            : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {!staffMember?.end ? (
                            <TextField
                              type="date"
                              value={staffMember?.end || ''}
                              onChange={(e) =>
                                handleEditEndDate(project._id, e.target.value)
                              }
                            />
                          ) : staffMember?.end && !isEditing ? (
                            new Date(staffMember.end).toLocaleDateString()
                          ) : (
                            'Ongoing'
                          )}
                        </TableCell>
                        <TableCell>
                          {!staffMember?.end ? (
                            <IconButton
                              onClick={() => handleSaveEndDate(project._id)}
                              color="primary">
                              <SaveIcon />
                            </IconButton>
                          ) : (
                            <IconButton
                              onClick={() =>
                                handleEditEndDate(
                                  project._id,
                                  new Date().toISOString().split('T')[0],
                                )
                              }
                              disabled={staffMember.end}
                              color="primary">
                              <EditIcon />
                            </IconButton>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  )
}

export default StaffIndividual
