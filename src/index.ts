import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  getRecipes,
  getRecipeDetails,
  addRecipe,
  putRecipe
} from './utilities/process_data';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('endpoint currently available is recipes');
});

app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});

const getAllRecipes = async (req: Request, res: Response) => {
  const recipesList = getRecipes();
  console.log(recipesList);
  res.status(200);
  res.send(recipesList);
};
const getOneRecipeDetails = async (req: Request, res: Response) => {
  const recipe = req.params.recipeName;
  const recipeDetails = getRecipeDetails(recipe);
  res.status(200);
  res.send(recipeDetails);
};
const postRecipe = async (req: Request, res: Response) => {
  const response = addRecipe(req);
  if (response === 400) {
    const errorMessage = {
      error: 'Recipe already exists'
    };
    res.send(errorMessage);
  } else {
    res.status(response).send();
  }
};
const putRecipeIfExists = async (req: Request, res: Response) => {
  const response = putRecipe(req);
  if (response === 404) {
    const errorMessage = {
      error: 'Recipe does not exists'
    };
    res.send(errorMessage);
  } else {
    res.status(response).send();
  }
};
const recipe_routes = (app: Application) => {
  app.get('/recipes', getAllRecipes);
  app.get('/recipes/details/:recipeName', getOneRecipeDetails);
  app.post('/recipes', postRecipe);
  app.put('/recipes', putRecipeIfExists);
};
recipe_routes(app);
export default app;
