# Simple JavaScript App

A modern, interactive web application built with HTML, CSS, and JavaScript. This project includes a complete CI/CD pipeline using Jenkins.

## 🚀 Features

### Interactive Components
- **Counter**: Increment, decrement, and reset functionality with color-coded display
- **Todo List**: Add, complete, and delete tasks with local storage persistence
- **Color Generator**: Generate random colors with automatic text contrast adjustment

### Modern UI/UX
- Responsive design that works on all devices
- Beautiful gradient background and card-based layout
- Smooth animations and hover effects
- Keyboard shortcuts for enhanced usability

### Technical Features
- Local storage for todo persistence
- Modern ES6+ JavaScript
- CSS Grid and Flexbox for layout
- Progressive enhancement

## 📁 Project Structure

```
simple-js-app/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
├── Jenkinsfile         # Jenkins CI/CD pipeline
├── package.json        # Project metadata
└── README.md           # This file
```

## 🛠️ Local Development

### Prerequisites
- A modern web browser
- Python (for local server) or any HTTP server

### Running Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd simple-js-app
   ```

2. **Start a local server:**
   
   **Option 1: Using Python**
   ```bash
   python -m http.server 8000
   ```
   
   **Option 2: Using Node.js**
   ```bash
   npx http-server -p 8000
   ```
   
   **Option 3: Using PHP**
   ```bash
   php -S localhost:8000
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8000`

## 🎮 How to Use

### Counter
- Click `+` to increment
- Click `-` to decrement
- Click `Reset` to return to zero
- **Keyboard shortcuts:**
  - `↑` Arrow: Increment
  - `↓` Arrow: Decrement
  - `R` key: Reset

### Todo List
- Type a task in the input field
- Click `Add` or press `Enter` to add the task
- Check the checkbox to mark as complete
- Click `Delete` to remove a task
- **Keyboard shortcut:** `Ctrl/Cmd + Enter` to add task

### Color Generator
- Click `Generate Color` to create a new random color
- **Keyboard shortcut:** Press `Space` to generate new color

## 🔧 Jenkins Pipeline

The project includes a comprehensive Jenkins pipeline with the following stages:

### Pipeline Stages

1. **Checkout**: Retrieves source code from version control
2. **Setup Environment**: Installs Node.js if not present
3. **Install Dependencies**: Sets up project dependencies
4. **Code Quality Check**: Validates HTML, CSS, and JavaScript syntax
5. **Security Scan**: Checks for common security issues
6. **Build**: Creates build artifacts and deployment packages
7. **Test**: Runs automated tests
8. **Archive**: Stores build artifacts
9. **Deploy to Staging**: Deploys to staging environment (main branch only)
10. **Deploy to Production**: Deploys to production with manual approval

### Pipeline Features

- **Multi-platform support**: Works on Windows, Linux, and macOS
- **Automatic Node.js installation**: Installs Node.js if not available
- **Code validation**: Checks HTML, CSS, and JavaScript syntax
- **Security scanning**: Basic security checks for hardcoded secrets
- **Artifact archiving**: Stores build artifacts for later use
- **Conditional deployment**: Only deploys from main branch
- **Manual approval**: Requires approval for production deployment

### Setting Up Jenkins Pipeline

1. **Install Jenkins:**
   - Download and install Jenkins from [jenkins.io](https://jenkins.io)
   - Install recommended plugins

2. **Create a new Pipeline job:**
   - Go to Jenkins dashboard
   - Click "New Item"
   - Select "Pipeline"
   - Name it "simple-js-app"

3. **Configure the pipeline:**
   - In the pipeline configuration, select "Pipeline script from SCM"
   - Choose your version control system (Git, SVN, etc.)
   - Set the repository URL
   - Set the script path to `Jenkinsfile`

4. **Run the pipeline:**
   - Click "Build Now" to start the pipeline
   - Monitor the build progress in the console output

### Pipeline Environment Variables

- `NODE_VERSION`: Node.js version to install (default: 18)
- `APP_NAME`: Application name (default: simple-js-app)
- `BUILD_NUMBER`: Jenkins build number

## 🧪 Testing

The pipeline includes automated tests that verify:
- File existence and structure
- HTML content validation
- CSS syntax validation
- JavaScript functionality validation

## 📦 Build Artifacts

The pipeline creates the following artifacts:
- `build/` directory with all application files
- `build-info.json` with build metadata
- Compressed deployment package (ZIP or TAR.GZ)

## 🚀 Deployment

### Staging Deployment
- Automatically deploys when code is pushed to the main branch
- Creates deployment logs for tracking

### Production Deployment
- Requires manual approval via Jenkins input step
- Creates detailed deployment logs
- Only available for main branch builds

## 🔒 Security Features

- Basic security scanning for hardcoded secrets
- File permission checks
- Input validation and sanitization
- Local storage for data persistence

## 🌟 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Check the Jenkins pipeline logs for build issues
- Review the browser console for JavaScript errors

---

**Happy Coding! 🎉**
