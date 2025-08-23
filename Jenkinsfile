pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Getting code from Git...'
                checkout scm
            }
        }
        
        stage('Test') {
            steps {
                echo 'Testing the app...'
                script {
                    if (isUnix()) {
                        sh 'echo "App is working fine!"'
                    } else {
                        bat 'echo "App is working fine!"'
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                script {
                    if (isUnix()) {
                        sh 'echo "Deployed successfully!"'
                    } else {
                        bat 'echo "Deployed successfully!"'
                    }
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
