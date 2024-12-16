const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { initTestDb, closeTestDb } = require('../setup/testDb');
const productRouter = require('../../routes/products');
const Product = require('../../models/product');
const Category = require('../../models/category');
const ProductService = require('../../services/productService');  


const app = express();
app.use(bodyParser.json());
app.use('/api/products', productRouter);

describe('Product Routes', () => {
  beforeAll(async () => {
    await initTestDb();
  });

  afterAll(async () => {
    await closeTestDb();
  });

  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await Category.destroy({ where: {} });
  });

  
  //Pruebas POST /api/products

  describe('POST /api/products', () => {
    let category;

    beforeEach(async () => {
      category = await Category.create({ name: 'Test Category' });
    });

    it('should create a new product', async () => {
      const productData = {
        name: 'Test Product',
        price: 100,
        categoryId: category.id,
        inventory: 10
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(201);

      expect(response.body).toHaveProperty('name', 'Test Product');
      expect(response.body).toHaveProperty('price', 100);
      expect(response.body).toHaveProperty('categoryId', category.id);
      expect(response.body).toHaveProperty('inventory', 10);
    });

    it('should return error when name is missing', async () => {
      const productData = {
        categoryId: category.id,
        price: 100,
        inventory: 10
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toMatch(/notNull Violation: Product.name cannot be null/);
    });

    it('should return error when category does not exist', async () => {
      const productData = {
        name: 'Test Product',
        categoryId: 9999, //ID de categoría inexistente
        price: 100,
        inventory: 10
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Category with id 9999 does not exist');
    });

    it('should return error when price is missing', async () => {
      const productData = {
        name: 'Test Product',
        categoryId: category.id,
        inventory: 10
      };

      const response = await request(app)
        .post('/api/products')
        .send(productData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toMatch(/notNull Violation: Product.price cannot be null/);
    });
  });


  //Pruebas GET /api/products/category/:categoryId
  
  describe('GET /api/products/category/:categoryId', () => {
    let category;

    beforeEach(async () => {
      category = await Category.create({ name: 'Test Category' });
      await Product.bulkCreate([
        { name: 'Product 1', price: 100, categoryId: category.id, inventory: 10 },
        { name: 'Product 2', price: 150, categoryId: category.id, inventory: 5 },
      ]);
    });

    it('should return products for category', async () => {
      const response = await request(app)
        .get(`/api/products/category/${category.id}`)
        .expect(200);

      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('name', 'Product 1');
      expect(response.body[1]).toHaveProperty('name', 'Product 2');
    });

    it('should return empty array when category does not exist', async () => {
      const response = await request(app)
        .get('/api/products/category/5555') //ID de categoría inexistente
        .expect(200);

      expect(response.body).toEqual([]); // No existe la categoría
    });

    it('should return empty array if category has no products', async () => {
      const newCategory = await Category.create({ name: 'Empty Category' });

      const response = await request(app)
        .get(`/api/products/category/${newCategory.id}`)
        .expect(200);

      expect(response.body).toEqual([]); //No debe haber productos
    });

    it('should return status 400 if there is an error in getting products for category', async () => {
      jest.spyOn(ProductService, 'getProductsByCategory').mockRejectedValue(new Error('Some internal error'));

      const response = await request(app)
        .get(`/api/products/category/${category.id}`)
        .expect(400);  //Esperamos el código 400

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Some internal error');
    });
  });


  //Pruebas GET /api/products/categories

  describe('GET /api/products/categories', () => {
    let category1, category2;

    beforeEach(async () => {
      category1 = await Category.create({ name: 'Category 1' });
      category2 = await Category.create({ name: 'Category 2' });

      await Product.bulkCreate([
        { name: 'Product 1', price: 100, categoryId: category1.id, inventory: 10 },
        { name: 'Product 2', price: 150, categoryId: category2.id, inventory: 5 },
      ]);
    });

    it('should return products for multiple categories', async () => {
      const response = await request(app)
        .get('/api/products/categories')
        .query({ categories: `${category1.id},${category2.id}` })
        .expect(200);

      expect(response.body.length).toBe(2);
      expect(response.body[0]).toHaveProperty('name', 'Product 1');
      expect(response.body[1]).toHaveProperty('name', 'Product 2');
    });

    it('should return empty array if no products in categories', async () => {
      const newCategory = await Category.create({ name: 'Empty Category' });

      const response = await request(app)
        .get('/api/products/categories')
        .query({ categories: [newCategory.id] })
        .expect(200);

      expect(response.body).toEqual([]); //Sin productos
    });

    it('should return error if categories query is missing', async () => {
      const response = await request(app)
        .get('/api/products/categories')
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Categories parameter is required'); //Dependiendo del error que se maneje
    });
  });


  //Pruebas GET /api/products

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const category = await Category.create({ name: 'Test Category' });

      await Product.bulkCreate([
        { name: 'Product 1', price: 100, categoryId: category.id, inventory: 10 },
        { name: 'Product 2', price: 150, categoryId: category.id, inventory: 5 },
      ]);

      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body.length).toBe(2);  //Dos productos en la respuesta
      expect(response.body[0]).toHaveProperty('name', 'Product 1');
      expect(response.body[1]).toHaveProperty('name', 'Product 2');
    });

    it('should return an empty array if no products exist', async () => {
      const response = await request(app)
        .get('/api/products')
        .expect(200);

      expect(response.body).toEqual([]);  //Sin productos
    });

    it('should return status 500 if there is an internal server error', async () => {
      jest.spyOn(ProductService, 'getAllProducts').mockRejectedValue(new Error('Internal server error'));

      const response = await request(app)
        .get('/api/products')
        .expect(500);  //Esperamos el código de estado 500

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Internal server error');
    });
  });
});
