import React, { useState } from "react"
import { useDropzone } from "react-dropzone"
import './drag.css';
function App() {
  const [files, setFiles] = useState([])

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
      console.log("kqehjfqeb",acceptedFiles);
    },
  })

  const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: "200px" }} alt="preview" />
      </div>
    </div>
  ))

  return (
    <div className="App1">
      <div className="div1" {...getRootProps()}>
        <input {...getInputProps()} />
        <p className="para">Drop files here</p>
      </div>
      <div>{images}</div>
    </div>
  )
}

export default App