pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub')
    }

    stages {

        stage('Checkout') {
            steps {
                git  url: 'https://github.com/therajsoni/rate', branch: 'main'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh "docker build -t $DOCKERHUB_CREDENTIALS_USR/backend:latest ."
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh "docker build -t $DOCKERHUB_CREDENTIALS_USR/frontend:latest ."
                }
            }
        }

        stage('Push Images') {
            steps {
                sh """
                echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                docker push $DOCKERHUB_CREDENTIALS_USR/backend:latest
                docker push $DOCKERHUB_CREDENTIALS_USR/frontend:latest
                """
            }
        }

        stage('Deploy to K8s') {
            steps {
                sh """
                kubectl apply -f k8s/
                kubectl rollout restart deployment backend
                kubectl rollout restart deployment frontend
                """
            }
        }
    }
}

