# Getting started
1. Ensure tsc is installed on the host system
    type in "tsc --version" to check if the package is present.
    * tsc
        ```sh
        tsc --version
        ```
2. Ensure  NodeJs is installed on the host system
    Type in "node -v" in the terminal to check if node is present
    * node
        ```sh
        node -v
        ```
    Additionally, Ensure Node version is 15 or above.
    Node version 21.6.1 was used to develop this Project
3. Ensure NPM is installed on the host system
* npm
  ```sh
  npm install npm@latest -g
  ```


### Prerequisites
1. Ensure Node version is 15 or above
2. RUN "npm i" to install dependencies
  ```sh
  npm i
  ```
3. RUN "npm run start" to run the API and start listening on port 3000
  ```sh
  npm run start
  ```




# Note data structure is as follows:
interface iNote{
    title:string;
    body:string;
    id:string;
}


# Doing REST api requests:
All requests to notes should be sent to this base URL: http://localhost:3000/notes


1. Creation
    in the BODY section of the request only "title" is required

sample request:
```sh
URL: http://localhost:3000/notes/
```
 JSON BODY:
```sh
{
	"title": "Hello world!",
	"body":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
}
```

2. Updating
    -in the params, only the "id" is required

```sh
URL: http://localhost:3000/notes/[insert-id-here]
```

3. Deleting
    -Only the ID in params is necessary

```sh
URL: http://localhost:3000/notes/[insert-id-here]
```



# Notes
1. All data is stored in the "db.json" file located at the root of the project
2. lowdb was used to manage the data in this project



