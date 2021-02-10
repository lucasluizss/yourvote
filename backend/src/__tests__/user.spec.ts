import supertest from 'supertest';

import UserContext from '../database/models/user.model';
import { setupDB } from '../test-setup';
import app from '../';

const request = supertest(app);

setupDB('user_test');

describe(':: User Module', () => {

  it('Should be able to register an user to database', async done => {

    const response = await request.post('/v1/users').send({
      username: 'bartowski',
      name: 'Charles Bartowski',
      email: 'test@example.com',
      password: '123456',
      phone: '11992993998'
    });

    const { data } = response.body;
    expect(data.name).toBeTruthy();
    expect(data.email).toBeTruthy();
    expect(response.status).toBe(201);

    const user = await UserContext.findOne({ email: 'test@example.com' });
    expect(user?.name).toBeTruthy();
    expect(user?.email).toBeTruthy();

    done();
  });
});