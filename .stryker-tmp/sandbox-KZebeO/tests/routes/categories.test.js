// @ts-nocheck
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { initTestDb, closeTestDb } = require('../setup/testDb');
const categoryRouter = require('../../routes/categories');
const Category = require('../../models/category');

const app = express();
app.use(bodyParser.json());
app.use('/api/categories', categoryRouter);

describe('Category Routes', () => {
  beforeAll(async () => {
    await initTestDb();
  });

  afterAll(async () => {
    await closeTestDb();
  });

  beforeEach(async () => {
    await Category.destroy({ where: {} });
  });

  
  //Pruebas POST /api/categories
  
  describe('POST /api/categories', () => {
    it('should create a new category', async () => {
      const categoryData = {
        name: 'Electronics'
      };

      const response = await request(app)
        .post('/api/categories')
        .send(categoryData)
        .expect(201);

      expect(response.body).toHaveProperty('name', 'Electronics');
      expect(response.body).toHaveProperty('id');
    });

    it('should return 400 if category data is invalid', async () => {
      const categoryData = {}; 

      const response = await request(app)
        .post('/api/categories')
        .send(categoryData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  //Pruebas GET /api/categories

  describe('GET /api/categories', () => {
    it('should return all categories', async () => {
      const category1 = await Category.create({ name: 'Electronics' });
      const category2 = await Category.create({ name: 'Books' });

      const response = await request(app)
        .get('/api/categories')
        .expect(200);

      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('name', 'Electronics');
      expect(response.body[1]).toHaveProperty('name', 'Books');
    });

    it('should return an empty array if no categories exist', async () => {
      const response = await request(app)
        .get('/api/categories')
        .expect(200);

      expect(response.body).toEqual([]);
    });
  });
});
