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
                    sh 'echo "App is working fine!"'
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                script {
                    sh 'echo "Deployed successfully!"'
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
