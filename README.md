# Simple API using Node and Express

The task of this assessment is to build a simple API using Node and Express.

## Getting Started

The src folder has index.ts which creates the server and starts listening on port 3000. The routes folder has index.ts file which creates an express router and configures the recipes endpoint to use the module recipes from routes/api/recipes.ts.

## Instructions

Steps to run the project:
Once you have cloned the project repo, navigate to the project directory.

```
npm install
npm run start
//OR
node dist/index.js
```

After running the npm run start or node dist/index.js you will be prompted that the server has started on port 3000.
Go to this url in the browser:
GET [http://localhost:3000/recipes] - this would display list of recipes
GET [http://localhost:3000/recipes/details/chai] - this would show you the ingrediests and the number of steps
POST [http://localhost:3000/recipes/] - this will add a new recipe to the dataset if it is not already present
PUT [http://localhost:3000/recipes/] - this will update a recipe if it exists in the dataset
