import React from 'react'

const FilePreview = ({ filePath }) => {
  return (
    <div>
      <iframe
        src={filePath}
        title="PDF Preview"
        style={{ width: '100%', height: '300px' }}
      />
    </div>
  )
}

export default FilePreview
