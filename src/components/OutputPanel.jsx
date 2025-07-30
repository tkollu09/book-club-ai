import React, { useState } from 'react'
import { Copy, Check, Edit3, Loader2 } from 'lucide-react'

const OutputPanel = ({ questions, onCopyQuestion, onUpdateNotes, isLoading }) => {
  const handleCopy = (questionId, questionText) => {
    navigator.clipboard.writeText(questionText)
    onCopyQuestion(questionId)
  }

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary-600 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-primary-700 mb-2">
            Generating Questions...
          </h2>
          <p className="text-gray-600">
            Our AI is analyzing your book and creating thoughtful discussion questions
          </p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Edit3 className="h-8 w-8 text-accent-600" />
          </div>
          <h2 className="text-xl font-semibold text-primary-700 mb-2">
            Ready to Generate Questions
          </h2>
          <p className="text-gray-600">
            Fill out the form on the left to generate discussion questions for your Meemli book club.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-accent-50 p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary-700 mb-2">
            Discussion Questions
          </h2>
          <p className="text-gray-600">
            {questions.length} questions generated for your book club discussion
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              index={index}
              onCopy={handleCopy}
              onUpdateNotes={onUpdateNotes}
            />
          ))}
        </div>

        {/* Export Options */}
        {questions.length > 0 && (
          <div className="mt-8 p-4 bg-white rounded-lg border border-accent-200">
            <h3 className="font-medium text-primary-700 mb-3">Export Options</h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => {
                  const allQuestions = questions.map(q => q.text).join('\n\n')
                  navigator.clipboard.writeText(allQuestions)
                }}
                className="btn-secondary flex items-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy All Questions</span>
              </button>
              <button
                onClick={() => {
                  const questionsWithNotes = questions
                    .map(q => `${q.text}${q.notes ? `\nNotes: ${q.notes}` : ''}`)
                    .join('\n\n')
                  navigator.clipboard.writeText(questionsWithNotes)
                }}
                className="btn-secondary flex items-center space-x-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy with Notes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const QuestionCard = ({ question, index, onCopy, onUpdateNotes }) => {
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [tempNotes, setTempNotes] = useState(question.notes)

  const handleSaveNotes = () => {
    onUpdateNotes(question.id, tempNotes)
    setIsEditingNotes(false)
  }

  const handleCancelNotes = () => {
    setTempNotes(question.notes)
    setIsEditingNotes(false)
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent-100 text-accent-700 rounded-full flex items-center justify-center text-sm font-medium">
            {index + 1}
          </div>
          <h3 className="font-medium text-primary-700">
            Question {index + 1}
          </h3>
        </div>
        <button
          onClick={() => onCopy(question.id, question.text)}
          className={`p-2 rounded-lg transition-colors ${
            question.copied 
              ? 'bg-accent-100 text-accent-700' 
              : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          }`}
          title={question.copied ? 'Copied!' : 'Copy question'}
        >
          {question.copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">
          {question.text}
        </p>
      </div>

      {/* Notes Section */}
              <div className="border-t border-accent-100 pt-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-primary-700">Your Notes</h4>
            {!isEditingNotes && (
              <button
                onClick={() => setIsEditingNotes(true)}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                {question.notes ? 'Edit' : 'Add notes'}
              </button>
            )}
          </div>

        {isEditingNotes ? (
          <div className="space-y-3">
            <textarea
              value={tempNotes}
              onChange={(e) => setTempNotes(e.target.value)}
              placeholder="Add your thoughts, discussion points, or personal notes..."
              rows={3}
              className="input-field resize-none"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveNotes}
                className="btn-primary text-sm px-3 py-1"
              >
                Save
              </button>
              <button
                onClick={handleCancelNotes}
                className="btn-secondary text-sm px-3 py-1"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[3rem]">
            {question.notes ? (
              <p className="text-sm text-gray-700 bg-accent-50 p-3 rounded-lg">
                {question.notes}
              </p>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No notes added yet
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default OutputPanel 