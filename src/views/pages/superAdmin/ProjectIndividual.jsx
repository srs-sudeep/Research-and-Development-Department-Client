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
  Chip,
  FormControlLabel,
  Switch,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import CloseIcon from '@mui/icons-material/Close'
import { getIndiProject, updateProject } from 'api'
import MainCard from 'ui-component/cards/MainCard'

const ProjectIndividual = () => {
  const { id } = useParams()
  const [projectData, setProjectData] = useState({
    name: '',
    projectId: '',
    PI: '',
    coPI: [],
    startDate: '',
    endDate: '',
    staffList: [],
    isCompleted: false,
  })
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [originalData, setOriginalData] = useState(null)

  useEffect(() => {
    fetchProjectDetails()
  }, [id])

  const fetchProjectDetails = async () => {
    try {
      setLoading(true)
      const data = await getIndiProject(id)
      const formattedData = {
        ...data,
        startDate: data.startDate
          ? new Date(data.startDate).toISOString().split('T')[0]
          : '',
        endDate: data.endDate
          ? new Date(data.endDate).toISOString().split('T')[0]
          : '',
      }
      setProjectData(formattedData)
      setOriginalData(formattedData)
    } catch (error) {
      console.error('Error fetching project details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProjectData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (e) => {
    const { name, checked } = e.target
    setProjectData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSave = async () => {
    try {
      await updateProject(id, projectData)
      setIsEditing(false)
      fetchProjectDetails()
    } catch (error) {
      console.error('Error updating project details:', error)
    }
  }

  const handleCancel = () => {
    setProjectData(originalData)
    setIsEditing(false)
  }

  if (loading) {
    return <Typography>Loading...</Typography>
  }

  return (
    <MainCard title="Project Details">
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">{projectData.name}</Typography>
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
            <Typography variant="h6" sx={{ mb: 2 }}>
              Basic Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Project Name"
                name="name"
                value={projectData.name || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Project ID"
                name="projectId"
                value={projectData.projectId || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
              />
              <TextField
                label="Principal Investigator"
                name="PI"
                value={projectData.PI?.name || ''}
                disabled
                fullWidth
              />
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Co-Principal Investigators
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {projectData.coPI?.map((copi) => (
                    <Chip key={copi._id} label={copi.name} />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Timeline Information
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Start Date"
                name="startDate"
                type="date"
                value={projectData.startDate || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="End Date"
                name="endDate"
                type="date"
                value={projectData.endDate || ''}
                onChange={handleInputChange}
                disabled={!isEditing}
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={projectData.isCompleted}
                    onChange={handleSwitchChange}
                    name="isCompleted"
                    disabled={!isEditing}
                  />
                }
                label="Project Completed"
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Staff Information
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {projectData.staffList?.map((staff) => (
                <Chip key={staff._id} label={staff.name} />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </MainCard>
  )
}

export default ProjectIndividual
