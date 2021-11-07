import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {
  getRecipes,
  getRecipeDetails,
  addRecipe,
  putRecipe
} from './models/process_data';

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
  res.status(recipesList['status']);
  res.send(recipesList['body']);
};
const getOneRecipeDetails = async (req: Request, res: Response) => {
  const recipe = req.params.recipeName;
  const recipeDetails = getRecipeDetails(recipe);
  res.status(recipeDetails['status']);
  res.send(recipeDetails['body']);
};
const postRecipe = async (req: Request, res: Response) => {
  const response = addRecipe(req);
  res.status(response['status']);
  res.send(response['body']);
};
const putRecipeIfExists = async (req: Request, res: Response) => {
  const response = putRecipe(req);
  res.status(response['status']);
  res.send(response['body']);
};
const recipe_routes = (app: Application) => {
  app.get('/recipes', getAllRecipes);
  app.get('/recipes/details/:recipeName', getOneRecipeDetails);
  app.post('/recipes', postRecipe);
  app.put('/recipes', putRecipeIfExists);
};
recipe_routes(app);
export default app;
