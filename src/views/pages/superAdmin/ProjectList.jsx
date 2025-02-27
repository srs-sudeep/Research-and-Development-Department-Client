import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
  TableSortLabel,
  Modal,
  Box,
  Fade,
  Typography,
  Backdrop,
} from '@mui/material'
import MainCard from 'ui-component/cards/MainCard'
import { getAllProjects } from 'api' // Change the API import to fetch project data

const ProjectList = () => {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [searchTerm, setSearchTerm] = useState('')
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [totalProjects, setTotalProjects] = useState(0) // For pagination
  const [selectedProject, setSelectedProject] = useState(null) // For modal
  const [open, setOpen] = useState(false) // Modal open state

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const data = await getAllProjects() // Fetch projects from API
      setProjects(data)
      console.log(data)
      setTotalProjects(data.length)
    } catch (error) {
      console.error('Error fetching projects:', error.message)
    }
  }

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    setPage(0) // Reset to first page when searching
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page when changing rows per page
  }

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleRowClick = (project) => {
    setSelectedProject(project)
    setOpen(true)
    navigate(`/superadmin/project/${project._id}`)
  }

  const handleClose = () => {
    setOpen(false)
    setSelectedProject(null)
  }

  // Filter and search projects
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.projectId.toString().includes(searchTerm) ||
    project.PI?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Sort projects
  const sortedProjects = filteredProjects.sort((a, b) => {
    if (orderBy === 'projectId') {
      return order === 'asc' ? a.projectId - b.projectId : b.projectId - a.projectId
    }
    if (orderBy === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    }
    return 0
  })

  return (
    <MainCard title="Project List">
      <TextField
        label="Search Projects"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2 }}
      />
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'projectId'}
                    direction={orderBy === 'projectId' ? order : 'asc'}
                    onClick={() => handleRequestSort('projectId')}
                  >
                    Project ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'name'}
                    direction={orderBy === 'name' ? order : 'asc'}
                    onClick={() => handleRequestSort('name')}
                  >
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'PI'}
                    direction={orderBy === 'PI' ? order : 'asc'}
                    onClick={() => handleRequestSort('PI')}
                  >
                    Principal Investigator
                  </TableSortLabel>
                </TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProjects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((project) => (
                  <TableRow
                    key={project._id}
                    hover
                    onClick={() => handleRowClick(project)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>{project.projectId}</TableCell>
                    <TableCell>{project.name}</TableCell>
                    <TableCell>{project.PI?.name}</TableCell>
                    <TableCell>
                      {project.isCompleted ? 'Completed' : 'In Progress'}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={totalProjects} // Total count of all project entries
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Modal for displaying project details */}
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}>
        <Fade in={open}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #white',
              boxShadow: 24,
              p: 4,
            }}>
            {selectedProject && (
              <>
                <Typography variant="h1" gutterBottom>
                  Project Details
                </Typography>
                <Typography variant="body1">
                  <strong>Project ID:</strong> {selectedProject.projectId}
                </Typography>
                <Typography variant="body1">
                  <strong>Project Name:</strong> {selectedProject.name}
                </Typography>
                <Typography variant="body1">
                  <strong>Start Date:</strong>{' '}
                  {new Date(selectedProject.startDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>End Date:</strong>{' '}
                  {new Date(selectedProject.endDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Completion Status:</strong>{' '}
                  {selectedProject.isCompleted ? 'Completed' : 'Ongoing'}
                </Typography>
                <Typography variant="body1">
                  <strong>Staff List:</strong>{' '}
                  {selectedProject.staffList.length > 0
                    ? selectedProject.staffList.join(', ')
                    : 'N/A'}
                </Typography>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </MainCard>
  )
}

export default ProjectList
