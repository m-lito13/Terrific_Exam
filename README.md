# Terrific_Exam
Running instructions 

For run there is need to create local copy of the repository . 
To run with Docker (For the test - there is backend and frontend running  via same docker_compose but different dockerfiles)
1. In the command line go to folder <LOCAL_REPO> (<LOCAL_REPO> - folder where local copy of the repository located)
2. run command
   docker-compose up
    It can be seen on Docker descktop ( if installed ) that both frontend and backend are running
   ![image](https://github.com/user-attachments/assets/f66cae1c-53e5-46a7-89b7-ea7be00c9b5c)

4. To access UI - access localhost:3000

To run without docker 
1. From cmd line - go to folder Backend and run commands
   npm install 
   npm start   (backend will run on port 3001)
3. From cmd line - go to folder todos-ui-app and run command
   npm install
   npm start   (frontend will run on port 3000)

NOTE: 
For Backend : port value can be changed in .env file located in Backend

For Frontend : URL and PORT of backend can be changed in .env file located in todos-ui-app folder

Backend REST API 

Get Todo items : GET <BaseURL>/api/todos
Add new Todo item : POST <BaseURL>/api/todos , request body {"text":"tochange" status:"NEW"}  (valid values for status are "NEW", "INPROCESS", "DONE") 
Delete Todo item : DELETE <BaseURL>/api/todos/<id> , <id> of Todo item to be deleted
Update Todo item : PUT <BaseURL>/api/todos/<id> , request body {"text":"tochange" status:"NEW"}  (valid values for status are "NEW", "INPROCESS", "DONE") 

For update request one of fields can be provided , for add new - both fields 

UI - in order to edit TODO item - click EDIT TEXT on the item to be edited -- the item text becomes editable. Pressing ENTER key - saves edit changes and makes text readonly again
