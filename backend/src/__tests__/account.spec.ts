import request from 'supertest';
import app from '../';

describe('Likes', () => {
  // it('should be able to give a like to the repository', async () => {
  //   const repository = await request(app)
  //     .post('/repositories')
  //     .send({
  //       url: 'https://github.com/Rocketseat/umbriel',
  //       title: 'Umbriel',
  //       techs: ['Node', 'Express', 'TypeScript']
  //     });

  //   let response = await request(app).post(
  //     `/repositories/${repository.body.id}/like`
  //   );

  //   expect(response.body).toMatchObject({
  //     likes: 1
  //   });

  //   response = await request(app).post(
  //     `/repositories/${repository.body.id}/like`
  //   );

  //   expect(response.body).toMatchObject({
  //     likes: 2
  //   });
  // });

  it('should not be able to like a repository that does not exist', async () => {
    await request(app)
      .post(`v1//users/123`)
      .expect(400);
  });
});
