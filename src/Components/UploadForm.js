import React, { useState } from 'react'
import { useTheme } from 'emotion-theming'
import axios from 'axios'

const UploadForm = () => {
  const theme = useTheme()
  const [file, setFile] = useState(null)
  const [tableHeaders, setTableHeaders] = useState([])
  const formData = new FormData()

  formData.append('file', file)

  const fileUploader =  async e => {
    e.preventDefault()

    try {
      const res = 
        await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      setTableHeaders(res.data.data)
    } catch(err) {
      console.log(err)
    }
  }
  
  return (
    <div>
      <form onSubmit={fileUploader} id="upload_form" name="upload_form">
        <input 
          accept=".csv"
          type="file"
          name="file"
          onChange={event => { setFile(event.currentTarget.files[0]) }}
        />
        <button type="submit">
          Upload File
        </button>
        { file ? file.name : null }
      </form>
        { tableHeaders.map((el, i) => (
          <div 
            style={{ 
              border: '1px solid black',
              margin: '.5rem', 
              padding: '1rem',
              fontFamily: theme.fonts.body,
            }} 
            key={i}
          >
            <p>E-Mail Address: { el.email_address }</p>
            <p>First Name: { el.f_name }</p>
            <p>Last Name: { el.l_name }</p>
            <div id="schedule">
              <strong>Schedule</strong>
              <p>Monday: { el.monday } </p>
              <p>Tuesday: { el.tuesday } </p>
              <p>Wednesday: { el.wednesday } </p>
              <p>Thursday: { el.thursday } </p>
              <p>Friday: { el.friday } </p>
              <p>Saturday: { el.saturday } </p>
              <p>Sunday: { el.sunday } </p>
            </div>
          </div>
        ))}
    </div>
      
    )
} 

export default UploadForm;