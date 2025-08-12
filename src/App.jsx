import React, { useState } from 'react'
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel'
import { Menu, X } from 'lucide-react'
import { callGeminiAPI } from './services/geminiService.js'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateQuestions = async (formData) => {
    setIsLoading(true)
    
    try {
      console.log('=== DEBUG START ===')
      console.log('Form data:', formData)
      console.log('=== DEBUG END ===')
      
      console.log('🚀 Calling Gemini API...')
      
      const questions = await callGeminiAPI(formData)
      console.log('✅ API response:', questions)
      
      // Convert to the format expected by the UI
      const formattedQuestions = questions.map((question, index) => ({
        id: Date.now() + index,
        text: question,
        notes: '',
        copied: false
      }))
      
      setQuestions(formattedQuestions)
      setIsLoading(false)
      
    } catch (error) {
      console.error('❌ Error generating questions:', error)
      console.error('❌ Error details:', error.message)
      console.error('❌ Error stack:', error.stack)
      alert(`Failed to generate questions: ${error.message}`)
      setIsLoading(false)
    }
  }



  const handleRegenerateQuestions = (formData) => {
    handleGenerateQuestions(formData)
  }

  const handleCopyQuestion = (questionId) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, copied: true }
        : q
    ))
    
    // Reset copied state after 2 seconds
    setTimeout(() => {
      setQuestions(prev => prev.map(q => 
        q.id === questionId 
          ? { ...q, copied: false }
          : q
      ))
    }, 2000)
  }

  const handleUpdateNotes = (questionId, notes) => {
    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, notes }
        : q
    ))
  }

  return (
    <div className="min-h-screen bg-accent-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-md border border-accent-200"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex h-screen">
        {/* Left Panel - Input Section */}
        <div className={`
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          fixed lg:relative
          w-80 lg:w-1/3
          h-full
          bg-white
          shadow-lg lg:shadow-none
          border-r border-accent-200
          z-40
          transition-transform duration-300 ease-in-out
        `}>
          <InputPanel 
            onGenerateQuestions={handleGenerateQuestions}
            onRegenerateQuestions={handleRegenerateQuestions}
            isLoading={isLoading}
          />
        </div>

        {/* Right Panel - Output Section */}
        <div className="flex-1 lg:w-2/3">
          <OutputPanel 
            questions={questions}
            onCopyQuestion={handleCopyQuestion}
            onUpdateNotes={handleUpdateNotes}
            isLoading={isLoading}
          />
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-primary-900 bg-opacity-30 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default App 