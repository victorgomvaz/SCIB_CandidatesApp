import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import * as path from 'path';
import * as fs from 'fs';

describe('CandidatesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/candidates (POST) should return merged candidate', async () => {
    const testFilePath = path.join(__dirname, 'test-candidate.xlsx');
    const buffer = fs.readFileSync(testFilePath);

    return request(app.getHttpServer())
      .post('/candidates')
      .field('name', 'Victor')
      .field('surname', 'Gomez')
      .attach('excel', buffer, 'test-candidate.xlsx')
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('name', 'Victor');
        expect(res.body).toHaveProperty('surname', 'Gomez');
        expect(res.body).toHaveProperty('seniority');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
