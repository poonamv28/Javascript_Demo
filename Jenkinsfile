pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code from Git...'
                checkout scm
            }
        }
        
        stage('Build') {
            steps {
                echo 'Building the application...'
                script {
                    // Create a simple build directory
                    sh 'mkdir -p build'
                    
                    // Copy files to build directory
                    sh '''
                        cp index.html build/
                        cp styles.css build/
                        cp script.js build/
                        cp package.json build/ 2>/dev/null || echo "No package.json to copy"
                    '''
                    
                    echo "Build completed successfully!"
                }
            }
        }
        
        stage('Test') {
            steps {
                echo 'Running basic tests...'
                script {
                    // Simple file existence tests
                    sh '''
                        echo "Testing if files exist..."
                        
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
                        
                        echo "All tests passed!"
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying application...'
                script {
                    // Simple deployment simulation
                    sh '''
                        echo "Application deployed successfully!"
                        echo "Files ready for deployment:"
                        ls -la build/
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully! 🎉'
        }
        failure {
            echo 'Pipeline failed! ❌'
        }
    }
}
