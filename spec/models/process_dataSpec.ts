import { getRecipes, getRecipeDetails } from '../../src/models/process_data';

describe('test suite for function process data', () => {
  it('should return list of all recipes when called', () => {
    const result = getRecipes();
    const recipes = {
      recipeNames: ['scrambledEggs', 'garlicPasta', 'chai']
    };
    expect(result['body']).toEqual(recipes);
  });
  it('should not return anything when the recipe does not exist', () => {
    const result = getRecipeDetails('pizza');
    const emptyResult = {};
    expect(result['body']).toEqual(emptyResult);
  });
});
