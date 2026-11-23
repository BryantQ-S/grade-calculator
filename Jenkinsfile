pipeline {
  agent any
  tools { nodejs 'NodeJS-24' }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
        script { properties([copyArtifactPermission('CD-React-App')]) }
      }
    }
    stage('Install and Test') {
      steps {
        sh 'npm ci'
        sh 'npm test'
      }
    }
    stage('Coverage') {
      steps { sh 'npm run coverage' }
    }
    stage('SonarQube Analysis') {
      when { branch 'main' }
      steps {
        script {
          def scannerHome = tool 'SonarScanner'
          withSonarQubeEnv('SonarQube-Lab') {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }
    stage('Quality Gate') {
      when { branch 'main' }
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true
        }
      }
    }
    stage('Build') {
      when { anyOf { branch 'main'; branch 'develop' } }
      steps { sh 'npm run build' }
    }
    stage('Archive Artifact') {
      when { branch 'main' }
      steps {
        sh "tar -czf react-app-${env.BUILD_NUMBER}.tar.gz dist Dockerfile"
        archiveArtifacts artifacts: "react-app-${env.BUILD_NUMBER}.tar.gz", fingerprint: true
      }
    }
  }
}