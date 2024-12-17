// @ts-nocheck
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { initTestDb, closeTestDb } = require('../setup/testDb');
const cartRouter = require('../../routes/cart');
const Cart = require('../../models/cart');
const Product = require('../../models/product');
const Category = require('../../models/category');
const CartService = require('../../services/cartService');
const ProductService = require('../../services/productService');
const CartItem = require('../../models/cartItem');

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
    let cart;
    beforeEach(async () => {
      cart = await CartService.createCart(1);
    });
    it('should return cart items with totals', async () => {
      const response = await request(app)
        .get(`/api/carts/${cart.id}/items`)
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
      expect(response.body).toHaveProperty('error', 'The user doesnt exits');
    });
  });

  describe('POST /api/carts/:cartId/items', () => {
    let product, category, cart;
    beforeEach(async () => {
      category = await Category.create({
        "name": "Electronics",
        "description": "electronic devices and accessories"
      });
      product = await ProductService.createProduct({
        "name": "Iphone",
        "price": 599.99,
        "categoryId": category.id,
        "inventory": 12
      });
      cart = await CartService.createCart(1);
    });
    it('should add item to cart', async () => {
      const arrayProduct = {
        productId: product.categoryId,
        quantity: 2
      };
      const response = await request(app)
        .post(`/api/carts/${cart.id}/items`)
        .send(arrayProduct)
        .expect(201);
      let idCart = String(cart.id);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('cartId', idCart);
      expect(response.body).toHaveProperty('productId', product.categoryId);
      expect(response.body).toHaveProperty('quantity', 2);
    });
  });

  describe('POST /api/carts/:cartId/items', () => {
    it('should return error message', async () => {
      const cartId = 1;
      const arrayProduct = {
        productId: 999,
        quantity: 2
      };
      const response = await request(app)
        .post(`/api/carts/${cartId}/items`)
        .send(arrayProduct)
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/carts/:cartId/items', () => {
    if ('should return error message', async () => {
      const cartId = 1;
      const arrayProduct = {
        productId: 1,
        quantity: 999
      };
      const response = await request(app)
        .post(`/api/carts/${cartId}/items`)
        .send(arrayProduct)
        .expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/carts/:cartId/items/:itemId', () => {
    let cartItem, cart;
    beforeEach(async () => {
      category = await Category.create({
        "name": "Electronics",
        "description": "electronic devices and accessories"
      });
      product = await ProductService.createProduct({
        "name": "Iphone",
        "price": 599.99,
        "categoryId": category.id,
        "inventory": 12
      });
      cart = await CartService.createCart(1);
      const arrayProduct = {
        productId: category.id,
        quantity: 4
      };
      cartItem = await CartService.addItemToCart(cart.id, arrayProduct.productId, arrayProduct.quantity);
    });
    it('should return cart items update', async () => {
      const arrayQuantity = {
        quantity: 1
      };
      const response = await request(app)
        .put(`/api/carts/${cart.id}/items/${cartItem.id}`)
        .send(arrayQuantity);
      expect(200);
      expect(response.body).toHaveProperty('quantity', 1);
      expect(response.body).toHaveProperty('cartId', cart.id);
      expect(response.body).toHaveProperty('productId', category.id);
    });
  });

  describe('PUT /api/carts/:cartId/items/:itemId', () => {
    it('should return error message', async () => {
      const cartId = 1;
      const arrayQuantity = {
        quantity: 1
      };
      const cartItem = -1
      const response = await request(app)
        .put(`/api/carts/${cartId}/items/${cartItem}`)
        .send(arrayQuantity);
      expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/carts/:cartId/items/:itemId', () => {
    let cartItem, cart;
    beforeEach(async () => {
      category = await Category.create({
        "name": "Electronics",
        "description": "electronic devices and accessories"
      });
      product = await ProductService.createProduct({
        "name": "Iphone",
        "price": 599.99,
        "categoryId": category.id,
        "inventory": 12
      });
      cart = await CartService.createCart(1);
      const arrayProduct = {
        productId: category.id,
        quantity: 4
      };
      cartItem = await CartService.addItemToCart(cart.id, arrayProduct.productId, arrayProduct.quantity);
    });
    it('should return 204', async () => {
      const response = await request(app)
        .delete(`/api/carts/${cart.id}/items/${cartItem.id}`)
      expect(204);
    });
  });

  describe('DELETE /api/carts/:cartId/items/:itemId', () => {
    it('should return error message', async () => {
      const cartId = 1;
      const cartItem = -2;
      const response = await request(app)
        .delete(`/api/carts/${cartId}/items/${cartItem}`)
      expect(400);
      expect(response.body).toHaveProperty('error');
    });
  });
});