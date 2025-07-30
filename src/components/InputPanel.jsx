import React, { useState, useRef } from 'react'
import { Upload, BookOpen, FileText, Loader2 } from 'lucide-react'

const InputPanel = ({ onGenerateQuestions, onRegenerateQuestions, isLoading }) => {
  const [formData, setFormData] = useState({
    bookName: '',
    chapters: '',
    topic: 'All',
    uploadedText: ''
  })
  const [uploadedFile, setUploadedFile] = useState(null)
  const [fileText, setFileText] = useState('')
  const [showCustomTopic, setShowCustomTopic] = useState(false)
  const [customTopic, setCustomTopic] = useState('')
  const fileInputRef = useRef(null)

  const topics = [
    'Comprehension',
    'Themes', 
    'Character Analysis',
    'Personal Reflection',
    'All', 
    "Other",
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Add this logic to show/hide custom topic input
    if (name === 'topic') {
      setShowCustomTopic(value === 'Other')
      if (value !== 'Other') {
        setCustomTopic('') // Clear custom topic when switching away
      }
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setUploadedFile(file)
    
    if (file.type === 'text/plain') {
      const text = await file.text()
      setFileText(text)
      setFormData(prev => ({
        ...prev,
        uploadedText: text
      }))
    } else if (file.type === 'application/pdf') {
      // For PDF files, we'll extract text (simplified version)
      // In a real app, you'd use a PDF parsing library
      setFileText('PDF content extracted (simulated)')
      setFormData(prev => ({
        ...prev,
        uploadedText: 'PDF content extracted (simulated)'
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.bookName && !fileText && !formData.uploadedText) {
      alert('Please provide a book name or upload a file')
      return
    }

    const submitData = {
      ...formData,
      fileText,
      uploadedFile,
      // Add the custom topic if "Other" is selected
      topic: formData.topic === 'Other' ? customTopic : formData.topic
    }

    onGenerateQuestions(submitData)
  }

  const handleRegenerate = () => {
    const submitData = {
      ...formData,
      fileText,
      uploadedFile
    }
    onRegenerateQuestions(submitData)
  }

  const removeFile = () => {
    setUploadedFile(null)
    setFileText('')
    setFormData(prev => ({
      ...prev,
      uploadedText: ''
    }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="h-full bg-white border-r border-accent-200 p-6 overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-primary-700 mb-2">
          Meemli Book Club Tutor
        </h1>
        <p className="text-gray-600">
          Generate discussion questions for your book club
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Book Name */}
        <div>
          <label htmlFor="bookName" className="block text-sm font-medium text-gray-700 mb-2">
            Book Name *
          </label>
          <input
            type="text"
            id="bookName"
            name="bookName"
            value={formData.bookName}
            onChange={handleInputChange}
            placeholder="Enter book title"
            className="input-field"
            required
          />
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Book (Optional)
          </label>
          <div className="border-2 border-dashed border-accent-300 rounded-lg p-6 text-center hover:border-primary-400 transition-colors bg-accent-50">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="space-y-2">
              <Upload className="mx-auto h-12 w-12 text-accent-500" />
              <div className="text-sm text-gray-600">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Click to upload
                </button>
                {' '}or drag and drop
              </div>
              <p className="text-xs text-gray-500">
                PDF or TXT files up to 10MB
              </p>
            </div>
          </div>
          
                     {uploadedFile && (
             <div className="mt-3 p-3 bg-accent-50 border border-accent-200 rounded-lg">
               <div className="flex items-center justify-between">
                 <div className="flex items-center space-x-2">
                   <FileText className="h-4 w-4 text-accent-600" />
                   <span className="text-sm text-accent-800">{uploadedFile.name}</span>
                 </div>
                 <button
                   type="button"
                   onClick={removeFile}
                   className="text-primary-600 hover:text-primary-700 text-sm"
                 >
                   Remove
                 </button>
               </div>
             </div>
           )}
        </div>

        {/* Chapters or Page Range */}
        <div>
          <label htmlFor="chapters" className="block text-sm font-medium text-gray-700 mb-2">
            Chapters or Page Range (Optional)
          </label>
          <input
            type="text"
            id="chapters"
            name="chapters"
            value={formData.chapters}
            onChange={handleInputChange}
            placeholder="e.g., Ch. 1-3 or Pages 10-50"
            className="input-field"
          />
        </div>

        {/* Question Topic */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
            Question Topic
          </label>
          <select
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            className="input-field"
          >
            {topics.map(topic => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Topic Input - Add this after the select */}
        {showCustomTopic && (
          <div>
            <label htmlFor="customTopic" className="block text-sm font-medium text-gray-700 mb-2">
              Specify Custom Topic
            </label>
            <input
              type="text"
              id="customTopic"
              name="customTopic"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="Enter your custom topic..."
              className="input-field"
            />
          </div>
        )}

        {/* Pasted Text */}
        <div>
          <label htmlFor="uploadedText" className="block text-sm font-medium text-gray-700 mb-2">
            Paste Text (Optional)
          </label>
          <textarea
            id="uploadedText"
            name="uploadedText"
            value={formData.uploadedText}
            onChange={handleInputChange}
            placeholder="Paste text from your book here..."
            rows={4}
            className="input-field resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Generating Questions...</span>
              </>
            ) : (
              <>
                <BookOpen className="h-5 w-5" />
                <span>Generate Questions</span>
              </>
            )}
          </button>
          
          {!isLoading && (
            <button
              type="button"
              onClick={handleRegenerate}
              className="btn-secondary w-full"
            >
              Regenerate Questions
            </button>
          )}
        </div>
      </form>

             {/* Instructions */}
       <div className="mt-8 p-4 bg-secondary-50 rounded-lg border border-secondary-200">
         <h3 className="font-medium text-secondary-900 mb-2">How to use:</h3>
         <ul className="text-sm text-secondary-800 space-y-1">
           <li>• Enter a book name to generate general questions</li>
           <li>• Upload a PDF/TXT file for content-specific questions</li>
           <li>• Specify chapters or page ranges for focused discussion</li>
           <li>• Choose a topic to target specific types of questions</li>
         </ul>
       </div>
    </div>
  )
}

export default InputPanel 