import React from 'react';

const FilePreview = ({ filePath }) => {
  // Function to check if the file is an image
  const isImage = (file) => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
    const fileExtension = file.split('.').pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
  };

  // Function to check if the file is a PDF
  const isPDF = (file) => {
    const fileExtension = file.split('.').pop().toLowerCase();
    return fileExtension === 'pdf';
  };

  if (!filePath) {
    return <p>No file uploaded</p>;
  }

  return (
    <div>
      {isImage(filePath) ? (
        <img src={filePath} alt="Document Preview" width="600" />
      ) : isPDF(filePath) ? (
        <iframe
          src={filePath}
          title="PDF Preview"
          width="600"
          height="400"
          frameBorder="0"
        />
      ) : (
        <p>Unsupported file format</p>
      )}
    </div>
  );
};

export default FilePreview;
