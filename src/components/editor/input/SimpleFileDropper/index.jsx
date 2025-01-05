// components/FileUpload.js
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FileList } from '@/components/common/FileList';
import SaveButton from '../SaveButton';
import axios from 'axios';

const SimpleFileDropper = () => {
  const [files, setFiles] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploaded, SetUploaded] = useState([])
  const [progress, setProgress] = useState(100)

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    if (!files) {
      alert('Please select files first');
      return;
    }

    const formData = new FormData();
    formData.set('batchId', "debug")
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    console.log(formData)

    setUploading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await axios('/api/v1/files', {
        method: 'POST',
        data: formData,
        onUploadProgress: (e) => {
          setProgress(Math.round(e.progress*100))
        }
      });
      if (!res.data) {
        const json = await res.data
        throw new Error('Upload failed: ' + json.message);
      }

      const json = await res.data
      console.log(json)
      SetUploaded(json.data)

      setSuccess(true);
      setFiles(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" multiple onChange={handleFileChange} />
      <SaveButton onClick={handleUpload} progress={progress} error={error}>
        {uploading ? `Uploading... ${progress}%` : 'Upload'}
      </SaveButton>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Upload successful!</p>}

      {success && <div style={{display: 'flex', flexDirection: 'row', flexFlow: "wrap", gap: '.5rem', padding: '1rem'}}>
            <FileList files={uploaded.files.map((f) => f.dbEntry)} />
        </div>}
    </div>
  );
};

export default SimpleFileDropper;
