const request = require('supertest');

describe('Testes da API de Pessoas', () => {
  let resposta;

  beforeEach(async () => {
    resposta = await getPersonById(1);
  });

  const getPersonById = async (id) => {
    const resposta = await request(`https://swapi.dev/api`).get(`/people/${id}`);
    return resposta;
  };

  it('Deve retornar status 200 e informações corretas para a pessoa com ID 1',() => {

    // Verifica se o status é 200
    expect(resposta.status).toBe(200);

    // Verifica se as propriedades esperadas estão presentes e com os valores corretos
    expect(resposta.body).toHaveProperty('name', 'Luke Skywalker');
    expect(resposta.body).toHaveProperty('height', '172');
    expect(resposta.body).toHaveProperty('mass', '77');
    expect(resposta.body).toHaveProperty('hair_color', 'blond');
    expect(resposta.body).toHaveProperty('skin_color', 'fair');
    expect(resposta.body).toHaveProperty('eye_color', 'blue');
    expect(resposta.body).toHaveProperty('birth_year', '19BBY');
    expect(resposta.body).toHaveProperty('gender', 'male');
    expect(resposta.body).toHaveProperty('homeworld', 'https://swapi.dev/api/planets/1/');

    // Verifica se a propriedade "films" contém os filmes corretos
    expect(resposta.body).toHaveProperty('films', [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/2/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/6/'
    ]);

    // Verifica se a propriedade "species" contém o array vazio, indicando que não há informações de espécie
    expect(resposta.body.species).toEqual([]);

    // Verifica se a propriedade "vehicles" contém os veículos corretos
    expect(resposta.body).toHaveProperty('vehicles', [
      'https://swapi.dev/api/vehicles/14/',
      'https://swapi.dev/api/vehicles/30/'
    ]);

    // Verifica se a propriedade "starships" contém as espaçonaves corretas
    expect(resposta.body).toHaveProperty('starships', [
      'https://swapi.dev/api/starships/12/',
      'https://swapi.dev/api/starships/22/'
    ]);

    // Verifica se as propriedades "created" e "edited" existem
    expect(resposta.body).toHaveProperty('created');
    expect(resposta.body).toHaveProperty('edited');

    // Verifica se a propriedade "url" contém um URL válida
    expect(resposta.body.url).toMatch(/^https:\/\/swapi\.dev\/api\/people\/\d+\/$/);
  });

  it.skip('', async () => {
    console.log(resposta.body);
    console.log(resposta.status);
  });

  it.skip('Deve visualizar informações de cadastro quando buscar por uma pessoa existente', () => {
    expect(resposta.status).toBe(200);
    expect(resposta.body.films).toBeDefined();
    expect(resposta.body.vehicles.length).toBeGreaterThan(0);
    expect(resposta.body.name).toBe('Luke Skywalker');
  });

  it.skip('Deve retornar um erro que a pessoa não existe', async () => {
    const resposta = await getPersonById(9999);

    console.log(resposta.status);
    console.log(resposta.body);

    expect(resposta.status).toBe(404);
    expect(resposta.body).toMatchObject({
      detail: 'Not found'
    });
  });
});