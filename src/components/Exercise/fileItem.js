import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFileAlt, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import './fileItem.scss'

const FileItem = ({ file, deleteFile }) => {
    return (
        <>
            <liFile
                className="file-item"
                key={file.name}>
                    <i class="fa fa-file-code-o fa-2x" aria-hidden="true"></i>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{file.name}</p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div className="actions">
                    <div className="loading"></div>
                    {file.isUploading && <i class="fa fa-spinner" aria-hidden="true"  onClick={() => deleteFile(file.name)}/>
                    }
                    {!file.isUploading &&
                        <i class="fa fa-trash" aria-hidden="true" onClick={() => deleteFile(file.name)} />
             }
                </div>
            </liFile>
        </>
    )
}

export default FileItem
