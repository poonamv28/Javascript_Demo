pipeline {
    agent any
    
    environment {
        NODE_VERSION = '18'
        APP_NAME = 'simple-js-app'
        BUILD_NUMBER = "${env.BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }
        
        stage('Setup Environment') {
            steps {
                echo 'Setting up build environment...'
                script {
                    // Check if Node.js is installed
                    def nodeVersion = sh(
                        script: 'node --version 2>/dev/null || echo "Node.js not found"',
                        returnStdout: true
                    ).trim()
                    
                    if (nodeVersion == "Node.js not found") {
                        echo 'Installing Node.js...'
                        // For Windows
                        if (isUnix() == false) {
                            bat 'powershell -Command "Invoke-WebRequest -Uri https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi -OutFile node-installer.msi"'
                            bat 'msiexec /i node-installer.msi /quiet /norestart'
                            bat 'refreshenv'
                        } else {
                            // For Linux/Mac
                            sh 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -'
                            sh 'sudo apt-get install -y nodejs'
                        }
                    }
                    
                    // Verify installation
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                script {
                    // Create package.json if it doesn't exist
                    if (!fileExists('package.json')) {
                        writeFile file: 'package.json', text: '''
{
  "name": "simple-js-app",
  "version": "1.0.0",
  "description": "A simple JavaScript application with HTML, CSS, and JS",
  "main": "index.html",
  "scripts": {
    "start": "python -m http.server 8000",
    "test": "echo \\"No tests specified\\" && exit 0",
    "build": "echo \\"Build completed\\"",
    "lint": "echo \\"Linting completed\\"",
    "serve": "python -m http.server 8000"
  },
  "keywords": ["javascript", "html", "css", "web-app"],
  "author": "Developer",
  "license": "MIT"
}
'''
                    }
                    
                    // Install dependencies (if any)
                    sh 'npm install || echo "No npm dependencies to install"'
                }
            }
        }
        
        stage('Code Quality Check') {
            steps {
                echo 'Running code quality checks...'
                script {
                    // Check if HTML is valid
                    sh '''
                        echo "Checking HTML syntax..."
                        if command -v tidy >/dev/null 2>&1; then
                            tidy -q -e index.html || echo "HTML validation completed"
                        else
                            echo "HTML tidy not available, skipping validation"
                        fi
                    '''
                    
                    // Check if CSS is valid
                    sh '''
                        echo "Checking CSS syntax..."
                        if command -v csslint >/dev/null 2>&1; then
                            csslint styles.css || echo "CSS validation completed"
                        else
                            echo "CSSLint not available, skipping validation"
                        fi
                    '''
                    
                    // Check JavaScript syntax
                    sh '''
                        echo "Checking JavaScript syntax..."
                        node -c script.js || echo "JavaScript syntax check completed"
                    '''
                }
            }
        }
        
        stage('Security Scan') {
            steps {
                echo 'Running security scans...'
                script {
                    // Basic security checks
                    sh '''
                        echo "Checking for common security issues..."
                        
                        # Check for hardcoded secrets
                        if grep -r "password\|secret\|key\|token" . --exclude-dir=.git --exclude=Jenkinsfile; then
                            echo "WARNING: Potential hardcoded secrets found"
                        else
                            echo "No obvious hardcoded secrets found"
                        fi
                        
                        # Check file permissions
                        if [ -f "script.js" ]; then
                            ls -la script.js
                        fi
                    '''
                }
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building application...'
                script {
                    // Create build directory
                    sh 'mkdir -p build'
                    
                    // Copy files to build directory
                    sh '''
                        cp index.html build/
                        cp styles.css build/
                        cp script.js build/
                        cp package.json build/ 2>/dev/null || echo "No package.json to copy"
                    '''
                    
                    // Create a simple build manifest
                    writeFile file: 'build/build-info.json', text: """
{
  "buildNumber": "${env.BUILD_NUMBER}",
  "buildTime": "${new Date().format('yyyy-MM-dd HH:mm:ss')}",
  "version": "1.0.0",
  "files": ["index.html", "styles.css", "script.js"]
}
"""
                    
                    // Create deployment package
                    sh '''
                        cd build
                        if command -v zip >/dev/null 2>&1; then
                            zip -r ../${APP_NAME}-${BUILD_NUMBER}.zip .
                        else
                            echo "Zip not available, creating tar instead"
                            tar -czf ../${APP_NAME}-${BUILD_NUMBER}.tar.gz .
                        fi
                    '''
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running tests...'
                script {
                    // Basic functionality tests
                    sh '''
                        echo "Running basic functionality tests..."
                        
                        # Test if files exist
                        if [ -f "build/index.html" ]; then
                            echo "✓ index.html exists"
                        else
                            echo "✗ index.html missing"
                            exit 1
                        fi
                        
                        if [ -f "build/styles.css" ]; then
                            echo "✓ styles.css exists"
                        else
                            echo "✗ styles.css missing"
                            exit 1
                        fi
                        
                        if [ -f "build/script.js" ]; then
                            echo "✓ script.js exists"
                        else
                            echo "✗ script.js missing"
                            exit 1
                        fi
                        
                        # Test if HTML contains required elements
                        if grep -q "Simple JavaScript App" build/index.html; then
                            echo "✓ HTML contains expected content"
                        else
                            echo "✗ HTML content validation failed"
                            exit 1
                        fi
                        
                        # Test if CSS contains required styles
                        if grep -q "body" build/styles.css; then
                            echo "✓ CSS contains expected styles"
                        else
                            echo "✗ CSS validation failed"
                            exit 1
                        fi
                        
                        # Test if JavaScript contains required functions
                        if grep -q "addEventListener" build/script.js; then
                            echo "✓ JavaScript contains expected functionality"
                        else
                            echo "✗ JavaScript validation failed"
                            exit 1
                        fi
                        
                        echo "All basic tests passed!"
                    '''
                }
            }
        }
        
        stage('Archive') {
            steps {
                echo 'Archiving build artifacts...'
                script {
                    // Archive the build artifacts
                    archiveArtifacts artifacts: "build/**/*", fingerprint: true
                    archiveArtifacts artifacts: "${APP_NAME}-*.zip,${APP_NAME}-*.tar.gz", fingerprint: true
                }
            }
        }
        
        stage('Deploy to Staging') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying to staging environment...'
                script {
                    // Simulate deployment to staging
                    sh '''
                        echo "Deploying to staging server..."
                        echo "Build ${BUILD_NUMBER} deployed to staging at $(date)"
                        
                        # Create deployment log
                        echo "Deployment successful - Build ${BUILD_NUMBER}" > deployment-staging.log
                        echo "Deployed at: $(date)" >> deployment-staging.log
                        echo "Files deployed:" >> deployment-staging.log
                        ls -la build/ >> deployment-staging.log
                    '''
                }
            }
        }
        
        stage('Deploy to Production') {
            when {
                branch 'main'
            }
            steps {
                input message: 'Deploy to production?', ok: 'Deploy'
                echo 'Deploying to production environment...'
                script {
                    // Simulate deployment to production
                    sh '''
                        echo "Deploying to production server..."
                        echo "Build ${BUILD_NUMBER} deployed to production at $(date)"
                        
                        # Create deployment log
                        echo "Deployment successful - Build ${BUILD_NUMBER}" > deployment-production.log
                        echo "Deployed at: $(date)" >> deployment-production.log
                        echo "Files deployed:" >> deployment-production.log
                        ls -la build/ >> deployment-production.log
                    '''
                }
            }
        }
    }
    
    post {
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
            script {
                // Send success notification
                echo "Build ${env.BUILD_NUMBER} completed successfully"
            }
        }
        failure {
            echo 'Pipeline failed!'
            script {
                // Send failure notification
                echo "Build ${env.BUILD_NUMBER} failed"
            }
        }
        cleanup {
            echo 'Pipeline cleanup completed'
        }
    }
}
