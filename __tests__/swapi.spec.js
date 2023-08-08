const request = require('supertest');

describe('People Api Tests', () => {
  let resposta;

  beforeEach(async () => {
    resposta = await getPersonById(1);
  });

  const getPersonById = async (id) => {
    const resposta = await request(`https://swapi.dev/api`).get(`/people/${id}`);
    return resposta;
  };

  it('Should return status 200 and correct information for person with ID 1',() => {

    expect(resposta.status).toBe(200);

    expect(resposta.body).toHaveProperty('name', 'Luke Skywalker');
    expect(resposta.body).toHaveProperty('height', '172');
    expect(resposta.body).toHaveProperty('mass', '77');
    expect(resposta.body).toHaveProperty('hair_color', 'blond');
    expect(resposta.body).toHaveProperty('skin_color', 'fair');
    expect(resposta.body).toHaveProperty('eye_color', 'blue');
    expect(resposta.body).toHaveProperty('birth_year', '19BBY');
    expect(resposta.body).toHaveProperty('gender', 'male');
    expect(resposta.body).toHaveProperty('homeworld', 'https://swapi.dev/api/planets/1/');

    expect(resposta.body).toHaveProperty('films', [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/'
    ]);

    expect(resposta.body.species).toEqual([]);

    expect(resposta.body).toHaveProperty('vehicles', [
      'https://swapi.dev/api/vehicles/14/',
      'https://swapi.dev/api/vehicles/30/'
    ]);

    expect(resposta.body).toHaveProperty('starships', [
      'https://swapi.dev/api/starships/12/',
      'https://swapi.dev/api/starships/22/'
    ]);

    expect(resposta.body).toHaveProperty('created');
    expect(resposta.body).toHaveProperty('edited');

    expect(resposta.body.url).toMatch(/^https:\/\/swapi\.dev\/api\/people\/\d+\/$/);
  });

  it.skip('', async () => {
    console.log(resposta.body);
    console.log(resposta.status);
  });

  it.skip('Should display registration information when searching for an existing person', () => {
    expect(resposta.status).toBe(200);
    expect(resposta.body.films).toBeDefined();
    expect(resposta.body.vehicles.length).toBeGreaterThan(0);
    expect(resposta.body.name).toBe('Luke Skywalker');
  });

  it.skip('Should return an error that the person does not exist', async () => {
    const resposta = await getPersonById(9999);

    console.log(resposta.status);
    console.log(resposta.body);

    expect(resposta.status).toBe(404);
    expect(resposta.body).toMatchObject({
      detail: 'Not found'
    });
  });
});