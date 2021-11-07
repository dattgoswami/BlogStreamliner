import supertest from 'supertest';
import app from '../../../src/server';

const request = supertest(app);

describe('recipes endpoint response test suite', () => {
  it('get recipes', async () => {
    const res = await request.get('/recipes');
    const recipes = { recipeNames: ['scrambledEggs', 'garlicPasta', 'chai'] };
    expect(res.status).toBe(200);
    expect(res.body).toEqual(recipes);
  });
  it('get details for recipe', async () => {
    const res = await request.get('/recipes/details/chai');
    const chaiRecipe = { details: { ingredients: [[Array]], numSteps: 4 } };
    expect(res.status).toBe(200);
    expect(res.body.details.numSteps).toEqual(chaiRecipe.details.numSteps);
  });
  it('post recipe creation endpoint', async () => {
    const res = await request.post('/recipes').send({
      name: 'chai',
      ingredients: [
        '400mL water',
        '100mL milk',
        '5g chai masala',
        '2 tea bags or 20 g loose tea leaves'
      ],
      instructions: [
        'Heat water until 80 C',
        'Add milk, heat until 80 C',
        'Add tea leaves/tea bags, chai masala; mix and steep for 3-4 minutes',
        'Remove mixture from heat; strain and enjoy'
      ]
    });
    expect(res.status).toBe(400);
    console.log(res.body);
    expect(res.body).toEqual({
      error: 'Recipe already exists'
    });
  });
});
