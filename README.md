# Softneta task
## Required environment to run this project
&#8594; OS must have installed java 8 or higher <br />
&#8594; OS must have installed Postgres Date base <br />
&#8594; OS must have installed Nodejs

## Framework use to complete this task:
* Spring-boot to develop back end
* ReactJs to develop front end

##To run this project follow the below instructions:
1. Open PgAdmin or any Database IDE
2. Create a Database name: **Softneta**
3. Then create  **patient_info** schema under **Softneta** database
4. Change database credential in application.properties file according to your environment
5. Make sure 3000 port not occupied by any other application (port number can be change through application.properties file).

6. Open terminal and go to **softneta-backend** folder of this project
7. Now execute the following command: <br />
   
   ./gradlew clean && ./gradlew build && ./gradlew bootRun

8. Open terminal and go to **softneta-frontend** folder of this project
9. Make sure 4200 port not occupied by any other application (port number can be change through .env file).
10. Now execute the following command: <br />
    npm install <br />
    npm start <br />


#####To explore front-end open the following link in browser
http://localhost:4200/
