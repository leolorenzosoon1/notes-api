To run this project, Ensure the ff:
1. tsc is installed on the host system
    type in "tsc --version" to check if the package is present.
2. NodeJs is installed on the host system
    Type in "node -v" in the terminal to check if node is present
    Additionally, Ensure Node version is 15 or above.
    Node version 21.6.1 was used to develop this Project


When cloning, do the ff:
1. Ensure Node version is 15 or above
2. RUN "npm i" to install dependencies
3. RUN "npm run start" to run the API and start listening on port 3000


All data is stored in the "db.json" file located at the root of the project

Note data structure is as follows:
interface iNote{
    title:string;
    body:string;
    id:string;
}


Doing REST api requests:
1. Creation
    in the BODY section of the request only "title" is required

2. Updating/Deleting
    -in the params, the "id" is required
    -in the BODY section of the request only "title" is required



