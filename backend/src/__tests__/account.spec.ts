import supertest from 'supertest';

import UserContext from '../database/models/user.model';
import { setupDB } from '../test-setup';
import app from '../';

const request = supertest(app);

setupDB('account_test');

describe(':: Account Module', () => {

  it('Should be able to authenticate in system', async done => {

    const createdUserResponse = await request.post('/v1/users').send({
      username: 'bartowski',
      name: 'Charles Bartowski',
      email: 'test@example.com',
      password: '123456',
      phone: '11992993998'
    });

    expect(createdUserResponse.status).toBe(201);

    const { data } = createdUserResponse.body;

    await UserContext.findByIdAndUpdate({ _id: data.id }, { status: 1 });

    const response = await request.post('/v1/accounts/authenticate').send({
      email: 'test@example.com',
      password: '123456',
    });

    const { successed } = response.body;

    expect(successed).toBeTruthy();

    done();
  });
});