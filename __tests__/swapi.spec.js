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

  it.skip('', async () => {
    console.log(resposta.body);
    console.log(resposta.status);
  });

  it('Deve visualizar informações de cadastro quando buscar por uma pessoa existente', async () => {
    expect(resposta.status).toBe(200);
    expect(resposta.body.films).toBeDefined();
    expect(resposta.body.vehicles.length).toBeGreaterThan(0);
    expect(resposta.body.name).toBe('Luke Skywalker');
  });

  it('Deve retornar um erro que a pessoa não existe', async () => {
    const resposta = await getPersonById(9999);

    console.log(resposta.status);
    console.log(resposta.body);

    expect(resposta.status).toBe(404);
    expect(resposta.body).toMatchObject({
      detail: 'Not found'
    });
  });
});