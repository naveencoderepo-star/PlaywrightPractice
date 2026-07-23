pipeline {
    agent any

    // TESTING: Run every 5 minutes (change back to '0 4 * * 1-5' after testing)
    triggers {
        cron('*/5 * * * *')
    }

    environment {
        CI = 'true'
        CMS_USER     = credentials('cms-username')       // Jenkins credential ID
        CMS_PASS     = credentials('cms-password')       // Jenkins credential ID
        GMAIL_USER   = credentials('gmail-user')         // Jenkins credential ID
        GMAIL_APP_PASS = credentials('gmail-app-password') // Jenkins credential ID
    }

    tools {
        nodejs 'NodeJS' // Name of NodeJS installation in Jenkins
    }

    stages {
        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
                bat 'npx playwright install chromium'
            }
        }

        stage('Run CMS Productive Hours Monitor') {
            steps {
                bat 'node send-cms-mail.js'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'test-results/productive-hours.png', allowEmptyArchive: true
        }
        success {
            echo '✅ CMS monitoring completed successfully!'
        }
        failure {
            echo '❌ CMS monitoring failed!'
        }
    }
}
