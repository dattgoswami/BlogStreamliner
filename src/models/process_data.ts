import json from '../assets/data.json';
import express from 'express';

function getRecipeSet() {
  const recipesSet = new Set<string>();
  for (let i = 0; i < json.recipes.length; i++) {
    recipesSet.add(json.recipes[i].name);
  }
  return recipesSet;
}
function getRecipes() {
  const recipesSet = getRecipeSet();
  const result: any = {
    recipeNames: []
  };
  recipesSet.forEach(function (recipeName: string) {
    result['recipeNames'].push(recipeName);
  });
  /*
  for (const recipeName of Array.from(recipesSet.values())) {
    result['recipeNames'].push(recipeName);
  }
  */
  return {
    status: 200,
    body: result
  };
}
function getRecipeDetails(recipeName: string) {
  let recipeExist: boolean = false;
  const recipesSet = getRecipeSet();
  const result: any = {
    details: {
      ingredients: [],
      numSteps: ''
    }
  };
  if (recipesSet.has(recipeName)) {
    for (let i = 0; i < json.recipes.length; i++) {
      if (json.recipes[i].name === recipeName) {
        recipeExist = true;
        result.details.ingredients.push(json.recipes[i].ingredients);
        result.details.numSteps = json.recipes[i].instructions.length;
      }
    }
  }
  if (!recipeExist) {
    return {
      status: 200,
      body: {}
    };
  }
  console.log(result);
  return {
    status: 200,
    body: result
  };
}
//post
function addRecipe(req: express.Request) {
  const recipesSet = getRecipeSet();

  if (!recipesSet.has(req.body.name)) {
    const newRecipe = {
      name: '',
      ingredients: [],
      instructions: []
    };
    newRecipe.name = req.body.name;
    newRecipe.ingredients = req.body.ingredients;
    newRecipe.instructions = req.body.instructions;
    json.recipes[json.recipes.length] = newRecipe;
    console.log(json);
    return {
      status: 201,
      body: {}
    };
  } else {
    return {
      status: 400,
      body: {
        error: 'Recipe already exists'
      }
    };
  }
}
function putRecipe(req: express.Request) {
  const recipesSet = getRecipeSet();
  const recipeName = req.body.name;
  if (recipesSet.has(recipeName)) {
    const updateRecipe = {
      name: '',
      ingredients: [],
      instructions: []
    };
    updateRecipe.name = recipeName;
    updateRecipe.ingredients = req.body.ingredients;
    updateRecipe.instructions = req.body.instructions;
    for (let i = 0; i < json.recipes.length; i++) {
      if (json.recipes[i].name === recipeName) {
        json.recipes[i] = updateRecipe;
      }
    }
    console.log(json);
    return {
      status: 204,
      body: {}
    };
  } else {
    return {
      status: 404,
      body: {
        error: 'Recipe does not exists'
      }
    };
  }
}
export { getRecipes, getRecipeDetails, addRecipe, putRecipe };
