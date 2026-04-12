pipeline {
    agent { label 'docker-node' } // Professional docker-based execution environment
    
    options {
        timeout(time: 1, unit: 'HOURS') // Prevent hanging builds
        timestamps()
    }

    stages {
        stage('Cleanup') {
            steps {
                cleanWs() // Clear workspace before starting a new build
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Install exact versions from package-lock.json
                sh 'npx playwright install --with-deps' // Install required browsers
            }
        }
        stage('Execute Tests') {
            steps {
                sh 'npx playwright test' // Trigger the test suite
            }
        }
    }
    
    post {
        always {
            // Publish Allure reports within the Jenkins UI
            allure includeProperties: false, results: [[path: 'allure-results']]
            
            // Archive standard HTML report as a backup artifact
            publishHTML([
                allowMissing: false, 
                alwaysLinkToLastBuild: true, 
                keepAll: true, 
                reportDir: 'playwright-report', 
                reportFiles: 'index.html', 
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}