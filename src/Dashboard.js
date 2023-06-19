import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [fileToUpdate, setFileToUpdate] = useState(null);
    const [newFilename, setNewFilename] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const { isAuthenticated, logout: authLogout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogoutClick = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            performLogout();
        }
    };

    const performLogout = () => {
        authLogout();

        navigate('/login');
    };

    const getFiles = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/uploads', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data) {
                setFiles(response.data.files);
            } else {
                alert('Failed to fetch files');
            }
        } catch (error) {
            console.error('Fetch files error', error);
            if (error.response) {
                alert(`Fetch files error: ${error.response.data.error}`);
            } else if (error.request) {
                alert('Fetch files error: No response from server');
            } else {
                alert(`Fetch files error: ${error.message}`);
            }
        }
    };

    useEffect(() => {
        getFiles();
    }, []);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:3000/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data) {
                alert('File uploaded successfully');
                getFiles();
            } else {
                alert('File upload failed');
            }
        } catch (error) {
            console.error('File upload error', error);
            if (error.response) {
                alert(`File upload error: ${error.response.data.error}`);
            } else if (error.request) {
                alert('File upload error: No response from server');
            } else {
                alert(`File upload error: ${error.message}`);
            }
        }
    };

    const handleDelete = async (filename) => {
        try {
            const response = await axios.delete('http://localhost:3000/api/delete', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                data: {
                    filename: filename
                }
            });

            if (response.data) {
                alert('File deleted successfully');
                getFiles();
            } else {
                alert('File delete failed');
            }
        } catch (error) {
            console.error('File delete error', error);
            if (error.response) {
                alert(`File delete error: ${error.response.data.error}`);
            } else if (error.request) {
                alert('File delete error: No response from server');
            } else {
                alert(`File delete error: ${error.message}`);
            }
        }
    };


    const handleUpdate = async (oldFilename) => {
        if (!newFilename) {
            alert('Please enter a new filename');
            return;
        }

        try {
            const response = await axios.put('http://localhost:3000/api/rename', {
                oldFilename: oldFilename,
                newFilename: newFilename
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data) {
                alert('File updated successfully');
                setNewFilename('');
                await getFiles();
            } else {
                alert('File update failed');
            }
        } catch (error) {
            console.error('File update error', error);
            if (error.response) {
                alert(`File update error: ${error.response.data.error}`);
            } else if (error.request) {
                alert('File update error: No response from server');
            } else {
                alert(`File update error: ${error.message}`);
            }
        }
    };


    const handleDownload = async (filename) => {
        try {
            const response = await axios.get(`http://localhost:3000/api/uploads/${filename}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                responseType: 'blob'
            });

            const downloadUrl = URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('File download error', error);
            if (error.response) {
                alert(`File download error: ${error.response.data.error}`);
            } else if (error.request) {
                alert('File download error: No response from server');
            } else {
                alert(`File download error: ${error.message}`);
            }
        }
    };


    return (
        <div className="dashboard">
            <h2 className="dashboard-heading">Dashboard</h2>
            <button className="logout-button" onClick={handleLogoutClick}>Logout</button>
            <div className="upload-section">
                <input type="file" className="file-input" onChange={handleFileChange} />
                <button className="upload-button" onClick={handleUpload}>Upload</button>
            </div>
            <input type="text" className="search-input" placeholder="Search files..." onChange={(event) => setSearchTerm(event.target.value)} />
            <h3 className="files-heading">Your files:</h3>
            <ul className="file-list">
                {files.filter(file => file.originalname.toLowerCase().includes(searchTerm.toLowerCase())).map(file => (
                    <li key={file.filename} className="file-item">
                        <div className="file-details">
                            <span className="file-name">{file.originalname}</span>
                            <div className="file-actions">
                                <button className="file-action-button" onClick={() => handleDelete(file.filename)}>Delete</button>
                                <button className="file-action-button" onClick={() => setFileToUpdate(file.filename)}>Update</button>
                                {fileToUpdate === file.filename && (
                                    <div className="file-update-section">
                                        <input
                                            type="text"
                                            className="new-filename-input"
                                            value={newFilename}
                                            onChange={(e) => setNewFilename(e.target.value)}
                                        />                                        <button className="file-update-button" onClick={() => handleUpdate(file.filename)}>Submit Update</button>
                                    </div>
                                )}
                                <button className="file-action-button" onClick={() => handleDownload(file.filename)}>Download</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
