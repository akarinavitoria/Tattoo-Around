const request = require('supertest');
const app = require('../server'); // Certifique-se de exportar o app no server.js
const mongoose = require('mongoose');

beforeAll(async () => {
  // Conecte ao banco de dados de teste se necessário
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/v1/appointments', () => {
  it('deve criar um agendamento com dados válidos', async () => {
    const res = await request(app)
      .post('/api/v1/appointments')
      .send({
        artistId: '60c1234567890abcdef12345',
        appointmentDate: '2025-03-01T15:00:00Z',
        service: 'Tatuagem Tradicional',
        notes: 'Teste de agendamento'
      })
      .set('Authorization', 'Bearer <TOKEN_VALIDO>');

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('success', true);
  });
});
