# Terrific_Exam
Running instructions 

For run there is need to create local copy of the repository . 
To run with Docker (For the test - there is backend and frontend running  via same docker_compose but different dockerfiles)
1. In the command line go to folder <LOCAL_REPO> (<LOCAL_REPO> - folder where local copy of the repository located)
2. run command
   docker-compose up
    It can be seen on Docker descktop ( if installed ) that both frontend and backend are running  
3. To access UI - try localhost:3000

To run without docker 
1. From cmd line - go to folder Backend and run command
   npm start   (backend will run on port 3001)
2. From cmd line - go to folder todos-ui-app and run command
   npm start   (frontend will run on port 3000)

NOTE: 
For Backend : port value can be changed in .env file located in Backend

For Frontend : URL and PORT of backend can be changed in .env file located in todos-ui-app folder
