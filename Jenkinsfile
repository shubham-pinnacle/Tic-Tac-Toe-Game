pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/shubham-pinnacle/Tic-Tac-Toe-Game.git', branch: 'main'
            }
        }

        stage('Build') {
            steps {
                echo "Building the application..."
                // Add your build commands here
            }
        }

        stage('Test') {
            steps {
                echo "Running tests..."
                // Add test commands here
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying the application..."
                // Add deployment steps here
            }
        }
    }
}