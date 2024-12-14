const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { initTestDb, closeTestDb } = require('../setup/testDb');
const cartRouter = require('../../routes/cart');
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const Category = require('../../models/category');

const app = express();
app.use(bodyParser.json());
app.use('/api/carts', cartRouter);

describe('Cart Routes', () => {
  beforeAll(async () => {
    await initTestDb();
  });

  afterAll(async () => {
    await closeTestDb();
  });

  beforeEach(async () => {
    await Cart.destroy({ where: {} });
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
  });

  describe('GET /api/carts/:cartId/items', () => {
    it('should return error message', async () => {
      const cartId = -1;
      const response = await request(app)
        .get(`/api/carts/${cartId}/items`)
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/carts/:cartId/items', () => {
    it('should return cart empty', async () => {
      const cartId = 2;
      const summary = {
        subtotal: 0,
        totalTax: 0,
        total: 0,
      }
      const response = await request(app)
        .get(`/api/carts/${cartId}/items`)
        .expect(200);
      expect(response.body).toHaveProperty('items');
      expect(response.body.items).toBeInstanceOf(Array);
      expect(response.body.items).toEqual([]);

      expect(response.body).toHaveProperty('summary');
      expect(response.body.summary).toEqual(summary);
    });
  });

  describe('GET /api/carts/:cartId/items', () => {
    it('should return cart items with totals', async () => {
      const cartId = 1;
      const response = await request(app)
        .get(`/api/carts/${cartId}/items`)
        .expect(200);
      expect(response.body.items).toBeInstanceOf(Array);
      expect(response.body.summary).toHaveProperty('subtotal');
      expect(response.body.summary).toHaveProperty('totalTax');
      expect(response.body.summary).toHaveProperty('total');
    });
  });

  describe('POST /api/carts/:userId', () => {
    it('should create a new cart', async () => {
      const userId = 1;
      const response = await request(app)
        .post(`/api/carts/${userId}`)
        .expect(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('userId', userId.toString());
    });
  });

  describe('POST /api/carts/:userId', () => {
    it('should return error message', async () => {
      const userId = -1;
      const response = await request(app)
        .post(`/api/carts/${userId}`)
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/carts/:cartId/items', () => {
    //let cart, product;

    // beforeEach(async () => {
    //   const category = await Category.create({ name: 'Test Category' });
    //   product = await Product.create({
    //     name: 'Test Product',
    //     price: 100,
    //     inventory: 10,
    //     categoryId: category.id
    //   });
    //   cart = await Cart.create({ userId: '1' });
    // });

    it('should add item to cart', async () => {

    });

  });

  describe('PUT /api/carts/:cartId/items/:itemId', () => {
    it('should return cart items with totals', async () => {

    });
  });

  describe('DELETE /api/carts/:cartId/items/:itemId', () => {
    it('should return cart items with totals', async () => {

    });
  });
});