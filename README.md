# AI Code Reviewer

An intelligent, full-stack application that acts as your personal expert code reviewer. Powered by the Anthropic Claude API, it automatically analyzes your code for bugs, security vulnerabilities, performance bottlenecks, and best practice violations.

![AI Code Review Tool Dashboard](client/src/assets/app.png)

## Tech Stack
- **Frontend**: React.js, Vite, TailwindCSS, Monaco Editor
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **AI Model**: Anthropic Claude API (`claude-3-5-sonnet-20241022`)
- **Deployment**: Vercel (Client) + Render (Server)

## Features
- **Instant Code Analysis**: Simply paste your code and get a detailed review in seconds.
- **Language Auto-Detection**: Autodetects the language of the code you pasted.
- **Categorized Feedback**: Review is split into clean tabs: Overview, Bugs, Security, Performance, and Best Practices.
- **Improved Code Generator**: Outputs a perfectly refactored version of your code.
- **Dark Mode UI**: Clean, professional dark theme styled with Tailwind CSS.
- **Share & Export**: Download review as a PDF or copy improved code in one click.
- **History Dashboard**: Keeps track of your last 10 code reviews and scores.

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB connection string (`MONGO_URI`)
- Anthropic API Key (`ANTHROPIC_API_KEY`)

### 1. Clone & Install Dependencies
\`\`\`bash
git clone https://github.com/your-username/ai-code-reviewer.git
cd ai-code-reviewer

# Install Backend dependencies
cd server
npm install

# Install Frontend dependencies
cd ../client
npm install
\`\`\`

### 2. Configure Environment Variables
Inside the `server` directory, create a `.env` file:

| Variable | Description |
| ---- | ----------- |
| `ANTHROPIC_API_KEY` | Your Anthropic Claude API Key |
| `MONGO_URI` | MongoDB Atlas (or local) Connection URI |
| `PORT` | API Server port (default: `5000`) |

Example `.env`:
\`\`\`
ANTHROPIC_API_KEY=sk-ant-api03-...
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/ai-reviewer
PORT=5000
\`\`\`

### 3. Run the App Locally
Open two terminal windows:

**Terminal 1 (Backend)**:
\`\`\`bash
cd server
npm start
\`\`\`

**Terminal 2 (Frontend)**:
\`\`\`bash
cd client
npm run dev
\`\`\`

Visit `http://localhost:5173` to start reviewing your code!

---

## How It Works
1. **Submit**: User pastes code into the Monaco Editor and hits "Analyze Code" (or `Ctrl+Enter`).
2. **Backend Parsing**: The backend receives the code string and formats it with an explicit system prompt.
3. **Claude AI**: The Claude API analyzes it for software engineering best practices, security flaws, performance issues, and general bugs. It returns a strict, parsed JSON object.
4. **Data Persistence**: The Node.js Express server saves this analysis to a MongoDB instance via Mongoose.
5. **Viewing Results**: The frontend displays the final interactive dashboard containing scores, metrics, issues, fixes, and refactored code.

## Deployment

**Vercel (Frontend)**:
1. Push to GitHub.
2. Import the project in Vercel.
3. Keep the Root Directory config to `client`.
4. Update your production frontend API URLs from `localhost:5000` to your Render API link.

**Render (Backend)**:
1. Create a "Web Service" in Render.
2. Link your GitHub repo.
3. Set root directory to `server`.
4. Set Build command to `npm install` and Start command to `node server.js`.
5. Add the mapped Environment Variables.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
