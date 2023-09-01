import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import Button from './components/Button'
import {UploadSimple} from "phosphor-react"

function App() {
  const [transcription, setTranscription] = useState("")
  const [file, setFile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  let isButtonDisabled = isLoading || !file
  
  function handleFileUpload(event) {
    const inputValue = event.target.files[0]
    setFile(inputValue)
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsLoading(true)
    const fileUploadForm = new FormData()
    fileUploadForm.append("file", file) 
    async function fetchTranscription() {
      const {data} = await axios.post("http://localhost:8000/api/transcribe", fileUploadForm)
      setTranscription(data.transcription)
      setFile(null)
      setIsLoading(false)
    }
    fetchTranscription()
  }


  return (
    <div className='container'>
      <header className='header-home'>
        <h1>
          MP3 to Text
        </h1>
        <p>Create text files from your MP3. Automatic audio transcription</p>
      </header>
      <main className='main-content'>
      <div className='buttons-wrapper'>
      <label className='label-input-audio' htmlFor='audio'>
        <UploadSimple size={24} />
        <span> {file ? file.name : "Choose .mp3 file"} </span>
      </label>
      <input className='input-audio' id='audio' type="file" onChange={(event) => handleFileUpload(event)} />
      <Button title="Upload file" onClick={(event) => handleSubmit(event)} disabled={isButtonDisabled} />
      </div>
      <div className='transcription-container'>
        {transcription && <p>{transcription}</p>}
        {isLoading && <p>Loading...</p>}
      </div>
      </main>
    </div>
  )
}

export default App
