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
            script {
                echo 'Development build successful. Triggering Cypress tests after 5 minutes...'
                
                // Wait 5 minutes then trigger downstream job
                sleep(time: 5, unit: 'MINUTES')
                
                // Trigger the Cypress pipeline
                build job: 'test2', 
                      wait: false, 
                      parameters: [
                          string(name: 'BUILD_NUMBER', value: "${env.BUILD_NUMBER}"),
                          string(name: 'GIT_COMMIT', value: "${env.GIT_COMMIT}")
                      ]
            }
        }
        failure {
            echo 'Development build failed. Cypress tests will not run.'
        }
    }
}
