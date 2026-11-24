pipeline {
agent any

tools { nodejs 'NodeJS-24' }

environment {
    SONAR_SCANNER_HOME = tool 'SonarScanner'
}

stages {
    stage('Checkout') {
        steps {
            checkout scm
        }
    }

    stage('Install and Test') {
        steps {
            sh 'npm ci'
            sh 'npm test'
        }
    }

    stage('Generate Coverage') {
        steps {
            sh 'npm run coverage'
        }
    }

    stage('SonarQube Analysis') {
        when {
            branch 'main'
        }
        steps {
            withSonarQubeEnv('SonarQube-Lab') {
                sh "${SONAR_SCANNER_HOME}/bin/sonar-scanner"
            }
        }
    }

    stage('Quality Gate') {
        when {
            branch 'main'
        }
        steps {
            timeout(time: 5, unit: 'MINUTES') {
                waitForQualityGate abortPipeline: true
            }
        }
    }

    stage('Build') {
        when {
            anyOf {
                branch 'main'
                branch 'develop'
            }
        }
        steps {
            sh 'npm run build'
        }
    }

    stage('Archive Artifact') {
        when {
            branch 'main'
        }
        steps {
            sh "tar --exclude='node_modules' -czf react-app-${BUILD_NUMBER}.tar.gz ."
            archiveArtifacts artifacts: "react-app-${BUILD_NUMBER}.tar.gz", fingerprint: true
        }
    }
}
}