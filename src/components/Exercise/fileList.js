import React from 'react'
import FileItem from './fileItem'

const FileList = ({ files, removeFile }) => {
    const deleteFileHandler = (_name) => {
        removeFile(_name)
        window.location.reload(true)
    }
    return (
        <ul className="file-list">
            {
                files &&
                files.map(f => (<FileItem
                    key={f.name}
                    file={f}
                    deleteFile={deleteFileHandler} />))
            }
        </ul>
    )
}

export default FileList
