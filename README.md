# AI Book Club Tutor

A modern web application that generates AI-powered discussion questions for book clubs. Built with React, Tailwind CSS, and Vite.

## Features

### 🎯 Core Functionality
- **Split Layout Design**: Clean sidebar input panel and main output area
- **Book Input**: Enter book names, upload PDF/TXT files, or paste text
- **Smart Question Generation**: AI-generated questions based on selected topics
- **Topic Selection**: Choose from Comprehension, Themes, Character Analysis, Personal Reflection, or All
- **Chapter/Page Range**: Specify specific sections for focused discussion

### 📱 User Experience
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Real-time Feedback**: Loading states and copy confirmations
- **Notes System**: Add personal notes to each question
- **Export Options**: Copy individual questions or all questions with notes

### 🛠 Technical Features
- **File Upload**: Support for PDF and TXT files
- **Local Storage**: Persistent question sets and notes (optional)
- **Modern UI**: Beautiful, accessible interface with Tailwind CSS
- **Fast Development**: Hot reload with Vite

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-club-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

## Usage

### Basic Workflow

1. **Enter Book Information**
   - Fill in the book name (required)
   - Optionally specify chapters or page ranges
   - Choose a question topic from the dropdown

2. **Upload Content (Optional)**
   - Upload a PDF or TXT file for content-specific questions
   - Or paste text directly into the text area

3. **Generate Questions**
   - Click "Generate Questions" to create AI-powered discussion questions
   - Wait for the AI to process and generate 5-10 thoughtful questions

4. **Review and Customize**
   - Copy individual questions to your clipboard
   - Add personal notes to each question
   - Regenerate questions if needed

### Question Topics

- **Comprehension**: Questions about plot, setting, and basic understanding
- **Themes**: Questions about underlying messages and symbolism
- **Character Analysis**: Questions about character development and motivations
- **Personal Reflection**: Questions that connect to personal experiences
- **All**: Mixed questions covering all aspects

### Mobile Usage

On mobile devices, the input panel collapses into a drawer that can be accessed via the menu button in the top-left corner.

## Project Structure

```
src/
├── components/
│   ├── InputPanel.jsx      # Left sidebar with form inputs
│   └── OutputPanel.jsx     # Right panel with question display
├── App.jsx                 # Main application component
├── main.jsx               # Application entry point
└── index.css              # Global styles and Tailwind imports
```

## Customization

### Adding OpenAI Integration

To integrate with real OpenAI API:

1. Create a `.env` file in the root directory
2. Add your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=your_api_key_here
   ```

3. Replace the mock question generation in `App.jsx` with actual API calls

### Styling

The app uses Tailwind CSS with a custom color scheme. You can modify:
- `tailwind.config.js` for theme customization
- `src/index.css` for custom component styles

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

- [ ] Real OpenAI API integration
- [ ] User authentication and saved sessions
- [ ] Question history and favorites
- [ ] Export to PDF/Word documents
- [ ] Collaborative features for book clubs
- [ ] Advanced PDF parsing with better text extraction
- [ ] Question difficulty levels
- [ ] Multi-language support 