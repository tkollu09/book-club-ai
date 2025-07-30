import React, { useState } from 'react'
import InputPanel from './components/InputPanel'
import OutputPanel from './components/OutputPanel'
import { Menu, X } from 'lucide-react'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleGenerateQuestions = async (formData) => {
    setIsLoading(true)
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      const mockQuestions = generateMockQuestions(formData)
      setQuestions(mockQuestions)
      setIsLoading(false)
    }, 2000)
  }

  const generateMockQuestions = (formData) => {
    const { bookName, topic, chapters } = formData
    const questions = []
    
    const topicQuestions = {
      'Comprehension': [
        `What are the main events that occur in ${chapters || 'the selected chapters'} of "${bookName}"?`,
        `How does the author establish the setting in this section?`,
        `What key information is revealed about the characters in this part of the story?`,
        `Can you summarize the plot progression in this section?`,
        `What questions arise from reading this portion of the text?`
      ],
      'Themes': [
        `What themes emerge in ${chapters || 'this section'} of "${bookName}"?`,
        `How does the author develop the theme of [specific theme] throughout this part?`,
        `What symbols or motifs appear in this section and what do they represent?`,
        `How do the characters' actions reflect the book's central themes?`,
        `What universal truths or messages does this section convey?`
      ],
      'Character Analysis': [
        `How do the main characters develop in ${chapters || 'this section'}?`,
        `What motivates the characters' decisions in this part of the story?`,
        `How do the characters' relationships evolve in this section?`,
        `What internal conflicts do the characters face in this portion?`,
        `How do the characters' actions reveal their true nature?`
      ],
      'Personal Reflection': [
        `How does this section of "${bookName}" relate to your own experiences?`,
        `What emotions did this part of the story evoke in you?`,
        `How has your perspective changed after reading this section?`,
        `What would you have done differently if you were in the characters' situation?`,
        `What questions about life does this section raise for you?`
      ],
      'All': [
        `What are the most important events in ${chapters || 'this section'} of "${bookName}"?`,
        `How do the themes and character development work together in this part?`,
        `What questions does this section raise about human nature?`,
        `How does this portion contribute to the overall meaning of the book?`,
        `What aspects of this section would you like to discuss further?`
      ]
    }

    const selectedQuestions = topicQuestions[topic] || topicQuestions['All']
    
    selectedQuestions.forEach((question, index) => {
      questions.push({
        id: Date.now() + index,
        text: question,
        notes: '',
        copied: false
      })
    })

    return questions
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