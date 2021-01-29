# Real estate app

Code for frontend for a real estate app that allows CRUD operations using React.The backend code is in a different git repository "https://github.com/pshar33/Real-Estate-backend/tree/master"

Eclipse IDE was used for development with Codemix plugin.

## Code requirements

* IDE that supports React project development(I used Eclipse IDE because it allows you to code both in React and python)
* npm (We need to install this package manager to manage dependencies,run our frontend locally at 3000 port,etc)
![alt text](https://github.com/pshar33/Real-Estate-frontend/blob/master/IMAGES/npm%20start.PNG)

## Setup
### Create an empty directory in your IDE Workspace,install git and then check the version of git by typing "git --version" in your directory.
### Clone my github repository to your local empty repository by typing "git clone -b master https://github.com/pshar33/Real-Estate-frontend.git " 
### Type "npm install" (in your IDE's terminal or CMD of your local project directory) in the beginning to install all the necessary node dependencies (which can be found in package.json files of my root folder)
### Navigate to the root folder and type "npm start" in the terminal to deploy our frontend locally at http://localhost:3000/
![alt text](https://github.com/pshar33/Real-Estate-frontend/blob/master/IMAGES/npm%20deployed.PNG)

## Results:
### UI Description
We can perform CRUD operations on the application. The main view of the application is the list of the leads/persons. We can perform Create,Update and Delete operations using the buttons shown in the screenshot. We can update,delete a specific lead by clicking the Update or Delete buttons for that lead. We can create a new lead by clicking on the Add button below our lead list.
![alt text](https://github.com/pshar33/Real-Estate-frontend/blob/master/IMAGES/description.PNG)

1. **Create**: You can create a person by clicking the button below our list of persons. After filling each field a new person will be added to our list of persons after we click on "Add Person" button.
![alt text](https://github.com/pshar33/Real-Estate-frontend/blob/master/IMAGES/create_person.PNG)
2. **Update**:You can update a person by clicking the left button on top right and editing all the text fields which will update the list of persons after we click "Update Person" button.
![alt text](https://github.com/pshar33/Real-Estate-frontend/blob/master/IMAGES/update_person.PNG)
3. **Delete**: You can easily delete a person by clicking on the top right button of the person you want to delete and the person will be deleted from our main persons list.
