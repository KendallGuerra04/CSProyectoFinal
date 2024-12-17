// @ts-nocheck
// Mock the models before requiring the service
jest.mock('../../models/product', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    belongsTo: jest.fn()  // Mock the association method
  }));

  jest.mock('../../models/category', () => ({
    findAll: jest.fn(),
    findByPk: jest.fn(),
    create: jest.fn()
  }));

  // Now require the service after the mocks are set up
  const { Op } = require('sequelize'); 
  const ProductService = require('../../services/productService');
  const Product = require('../../models/product');
  const Category = require('../../models/category');

describe('ProductService', () => {
    // Clear all mocks before each test
    beforeEach(() => {
        jest.clearAllMocks();
    });

    async function getProductsByCategory(category) {
        if (!category) {
          throw new Error('Category cannot be empty');
        }
      
        const products = await Product.findAll({ where: { categoryId } });
        return products;
      }

    describe('getAllProducts', () => {
        it('should return all products', async () => {
            const mockProducts = [
                { id: 1, name: 'Product 1', inventory: 10 },
                { id: 2, name: 'Product 2', inventory: 15 },
            ];
            Product.findAll.mockResolvedValue(mockProducts);

            const products = await ProductService.getAllProducts();

            expect(Product.findAll).toHaveBeenCalledTimes(1);
            expect(products).toEqual(mockProducts);
        });
    });

    describe('getProductById', () => {
        it('should return the product with the given ID', async () => {
            const mockProduct = { id: 1, name: 'Product 1' };
            Product.findByPk.mockResolvedValue(mockProduct);

            const result = await ProductService.getProductById(1);

            expect(Product.findByPk).toHaveBeenCalledWith(1);
            expect(result).toEqual(mockProduct);
        });

        it('should return null if the product is not found', async () => {
            Product.findByPk.mockResolvedValue(null);

            const result = await ProductService.getProductById(999);

            expect(Product.findByPk).toHaveBeenCalledWith(999);
            expect(result).toBeNull();
        });
    });

    describe('createProduct', () => {
        it('should create and return a new product if the category exists', async () => {
            const mockProduct = { name: 'New Product', categoryId: 1 };
            const mockCategory = { id: 1, name: 'Category 1' };
            const createdProduct = { id: 1, ...mockProduct };

            Category.findByPk.mockResolvedValue(mockCategory);
            Product.create.mockResolvedValue(createdProduct);

            const result = await ProductService.createProduct(mockProduct);

            expect(Category.findByPk).toHaveBeenCalledWith(1);
            expect(Product.create).toHaveBeenCalledWith(mockProduct);
            expect(result).toEqual(createdProduct);
        });

        it('should throw an error if the category does not exist', async () => {
            const mockProduct = { name: 'New Product', categoryId: 999 };
            Category.findByPk.mockResolvedValue(null);

            await expect(ProductService.createProduct(mockProduct)).rejects.toThrow('Category with id 999 does not exist');
            expect(Category.findByPk).toHaveBeenCalledWith(999);
            expect(Product.create).not.toHaveBeenCalled();
        });
    });

    describe('updateProduct', () => {
        it('should update the product if category exists', async () => {
            const mockProduct = { name: 'Updated Product', categoryId: 1 };
            const mockCategory = { id: 1, name: 'Category 1' };
    
            Category.findByPk.mockResolvedValue(mockCategory);
            Product.update.mockResolvedValue([1]); 
    
            const result = await ProductService.updateProduct(1, mockProduct);
    
            expect(Category.findByPk).toHaveBeenCalledWith(1);
            expect(Product.update).toHaveBeenCalledWith(mockProduct, { where: { id: 1 } });
            expect(result).toEqual([1]); 
        });
    
        it('should throw an error if the new category does not exist', async () => {
            const mockProduct = { name: 'Updated Product', categoryId: 999 };
    
            Category.findByPk.mockResolvedValue(null);
    
            await expect(ProductService.updateProduct(1, mockProduct)).rejects.toThrow('Category with id 999 does not exist');
            expect(Category.findByPk).toHaveBeenCalledWith(999);
            expect(Product.update).not.toHaveBeenCalled();
        });
    
        it('should update the product with empty product object', async () => {
            Product.update.mockResolvedValue([1]);
    
            const result = await ProductService.updateProduct(1, {});
    
            expect(Product.update).toHaveBeenCalledWith({}, { where: { id: 1 } });
            expect(result).toEqual([1]); 
        });
    
        it('should return 0 if no product is updated', async () => {
            const mockProduct = { name: 'Updated Product', categoryId: 1 };
    
            Category.findByPk.mockResolvedValue({ id: 1, name: 'Category 1' });
            Product.update.mockResolvedValue([0]); 
    
            const result = await ProductService.updateProduct(999, mockProduct);
    
            expect(Category.findByPk).toHaveBeenCalledWith(1);
            expect(Product.update).toHaveBeenCalledWith(mockProduct, { where: { id: 999 } });
            expect(result).toEqual([0]); 
        });
    });

    describe('deleteProduct', () => {
        it('should delete the product and return the number of affected rows', async () => {
            Product.destroy.mockResolvedValue(1);

            const result = await ProductService.deleteProduct(1);

            expect(Product.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
            expect(result).toBe(1);
        });
    });

    describe('getProductsByCategory', () => {//CATEGORY
        it('should throw an error if the category parameter is empty', async () => {
            const emptyCategory = '';
    
            await expect(getProductsByCategory(emptyCategory)).rejects.toThrow('Category cannot be empty');
        });

        it('should return products filtered by category', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50, categoryId: 1 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30, categoryId: 1 };
            const mockProducts = [mockProduct1, mockProduct2];
        
            Product.findAll.mockResolvedValue(mockProducts);
        
            const result = await ProductService.getProductsByCategory(1);
        
            expect(result).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalledWith({
                where: { categoryId: 1 },
                include: Category,
            });
        });

        it('should apply pagination with limit and offset', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30 };
            const mockProducts = [mockProduct1, mockProduct2];
        
            Product.findAll.mockResolvedValue(mockProducts);
        
            const result = await ProductService.getProductsByCategory(1, { limit: 2, offset: 1 });
        
            expect(result).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalledWith({
                where: { categoryId: 1 },
                include: Category,
                limit: 2,
                offset: 1,
            });
        });

        it('should apply sorting when specified', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30 };
            const mockProducts = [mockProduct1, mockProduct2];
        
            Product.findAll.mockResolvedValue(mockProducts);
        
            const result = await ProductService.getProductsByCategory(1, { sort: 'price,DESC' });
        
            expect(result).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalledWith({
                where: { categoryId: 1 },
                include: Category,
                order: [['price', 'DESC']],
            });
        });
    
        it('should apply limit and offset without sorting', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30 };
            const mockProducts = [mockProduct1, mockProduct2];
    
            Product.findAll.mockResolvedValue(mockProducts);
    
            const limit = 2;
            const offset = 1;
            const result = await ProductService.getProductsByCategory(1, { limit, offset });
            const expected = [mockProduct1, mockProduct2];
    
            expect(result).toEqual(expected);
            expect(Product.findAll).toHaveBeenCalledWith({
                where: { categoryId: 1 },
                include: Category,
                limit: 2,
                offset: 1,
            });
        });
    });

      describe('getProductsByCategories', () => {//CATEGORIES 

        it('should return products filtered by multiple categories', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50, categoryId: 1 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30, categoryId: 2 };
            const mockProducts = [mockProduct1, mockProduct2];
        
            Product.findAll.mockResolvedValue(mockProducts);
        
            const result = await ProductService.getProductsByCategories('1,2');
        
            expect(result).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalledWith({
                where: {
                    categoryId: {
                        [Op.in]: [1, 2],
                    },
                },
                include: Category,
            });
        });

        it('should apply sorting when specified', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30 };
            const mockProducts = [mockProduct1, mockProduct2];
        
            Product.findAll.mockResolvedValue(mockProducts);
        
            const result = await ProductService.getProductsByCategories('1,2,3', { sort: 'price,DESC' });
        
            expect(result).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalledWith({
                where: {
                    categoryId: {
                        [Op.in]: [1, 2, 3],
                    },
                },
                include: Category,
                order: [['price', 'DESC']],
            });
        });

        it('should apply pagination with limit and offset', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30 };
            const mockProducts = [mockProduct1, mockProduct2];
        
            Product.findAll.mockResolvedValue(mockProducts);
        
            const result = await ProductService.getProductsByCategories('1,2,3', { limit: 2, offset: 1 });
        
            expect(result).toEqual(mockProducts);
            expect(Product.findAll).toHaveBeenCalledWith({
                where: {
                    categoryId: {
                        [Op.in]: [1, 2, 3],
                    },
                },
                include: Category,
                limit: 2,
                offset: 1,
            });
        });
    
        it('should apply sorting and ignore limit and offset if not provided', async () => {
            const mockProduct1 = { id: 1, name: 'Producto 1', price: 50 };
            const mockProduct2 = { id: 2, name: 'Producto 2', price: 30 };
            const mockProduct3 = { id: 3, name: 'Producto 3', price: 10 };
            const mockProducts = [mockProduct1, mockProduct2, mockProduct3];
    
            Product.findAll.mockResolvedValue(mockProducts);
    
            const sortOption = 'price,DESC';
            const result = await ProductService.getProductsByCategories('1,2,3', { sort: sortOption });
            const expected = [mockProduct1, mockProduct2, mockProduct3]; 
    
            expect(result).toEqual(expected);
        });
    });
});