// Mock the models
jest.mock('../../models/cart', () => ({
  create: jest.fn(),
  findByPk: jest.fn()
}));

jest.mock('../../models/cartItem', () => ({
  findOne: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
  findOrCreate: jest.fn(),
  findOneAndUpdate: jest.fn(),
  count: jest.fn(),
  toJSON: jest.fn()
}));

jest.mock('../../models/product', () => ({
  findByPk: jest.fn()
}));

const CartService = require('../../services/cartService');
const Cart = require('../../models/cart');
const CartItem = require('../../models/cartItem');
const Product = require('../../models/product');

describe('CartService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createCart', () => {
    it('should create a new cart with the given user ID', async () => {
      const mockCart = { id: 1, userId: 1 };
      Cart.create.mockResolvedValue(mockCart);

      const result = await CartService.createCart(1);

      expect(result).toEqual(mockCart);
    });

    it('should throw an error if failed to create a new cart', async () => {
      Cart.create.mockRejectedValue(new Error('Database error'));

      await expect(CartService.createCart(1)).rejects.toThrow('Database error');
    });
  });

  describe('addItemToCart', () => {
    it('should throw an error if product does not exist', async () => {
      const productId = 1;
      Product.findByPk.mockResolvedValue(null); // Simula que el producto no existe

      await expect(CartService.addItemToCart(1, productId, 3)).rejects.toThrow('Product not found');
    });

    it('should throw an error if there is not enough inventory for the product', async () => {
      // Mock de un producto con inventario insuficiente
      const mockProduct = { id: 1, inventory: 5 };
      Product.findByPk.mockResolvedValue(mockProduct);

      // Simulando un cartItem que intenta agregar una cantidad mayor que la disponibilidad del inventario
      const mockCartItem = { id: 1, cartId: 1, productId: 1, quantity: 6 };
      CartItem.findOne.mockResolvedValue(mockCartItem);

      // Intentando añadir el item al carrito
      await expect(CartService.addItemToCart(1, 1, 6)).rejects.toThrow('Not enough inventory available');

      // Verificando que la condición de falta de inventario dispara el error
      //const product = await Product.findByPk(1);
      //const cartItem = await CartItem.findOne({ where: { productId: 1 } });

      //expect(product.inventory).toBeLessThan(cartItem.quantity);
    });

    it('should create a new item in the cart if it does not already exist', async () => {
      const mockProduct = { id: 1, inventory: 10 };
      const mockNewItem = { id: 2, cartId: 1, productId: 1, quantity: 3 };
      Product.findByPk.mockResolvedValue(mockProduct);
      CartItem.findOne.mockResolvedValue(null); // Simulando que no existe el item

      CartItem.create.mockResolvedValue(mockNewItem);

      const result = await CartService.addItemToCart(1, 1, 3);
      expect(result).toEqual(mockNewItem);
    });

    it('should update quantity if item already exists in the cart', async () => {
      const mockProduct = { id: 1, inventory: 10 };
      const mockCartItem = { id: 1, quantity: 2, save: jest.fn() }; // Agregamos el mock de save
      const newQuantity = 5;

      Product.findByPk.mockResolvedValue(mockProduct);
      CartItem.findOne.mockResolvedValue(mockCartItem);

      // Configuramos el comportamiento de mockCartItem.save
      mockCartItem.save.mockResolvedValue({ ...mockCartItem, quantity: newQuantity });

      const result = await CartService.addItemToCart(1, 1, 3);

      expect(result.quantity).toBe(newQuantity); // Verificamos que se actualizó correctamente
      expect(mockCartItem.save).toHaveBeenCalled(); // Verificamos que se llamó a save
    });

    it('should handle case when updating item quantity results in insufficient inventory', async () => {
      const mockProduct = { id: 1, inventory: 5 };
      const mockCartItem = { id: 1, cartId: 1, productId: 1, quantity: 4 };
      Product.findByPk.mockResolvedValue(mockProduct);
      CartItem.findOne.mockResolvedValue(mockCartItem);

      await expect(CartService.addItemToCart(1, 1, 3)).rejects.toThrow('Not enough inventory available');
    });

    it('should handle errors when updating the existing cart item fails', async () => {
      const mockProduct = { id: 1, inventory: 10 };
      const mockCartItem = { id: 1, quantity: 2, save: jest.fn() }; // Añadimos el mock de save

      Product.findByPk.mockResolvedValue(mockProduct);
      CartItem.findOne.mockResolvedValue(mockCartItem);

      // Configuramos el mock para simular un error al intentar guardar
      mockCartItem.save.mockRejectedValue(new Error('Database error'));

      await expect(CartService.addItemToCart(1, 1, 3)).rejects.toThrow('Database error');

      // Verificamos que save fue llamado incluso si falló
      expect(mockCartItem.save).toHaveBeenCalled();
    });
  });

  describe('getCartItems', () => {
    it('should throw an error if the cart is not found', async () => {
      // Simulate Cart.findByPk returning null
      Cart.findByPk.mockResolvedValue(null);

      await expect(CartService.getCartItems(1)).rejects.toThrow('Item not found');
    });

    it('should return cart items with calculated totals when items exist', async () => {
      const mockCart = { id: 1 };
      const mockCartItems = [
        {
          id: 1,
          quantity: 2,
          Product: { id: 1, price: 10, taxRate: 0.1 },
          toJSON: jest.fn().mockReturnValue({
            id: 1,
            quantity: 2,
            Product: { id: 1, price: 10, taxRate: 0.1 }
          }),
        },
        {
          id: 2,
          quantity: 1,
          Product: { id: 2, price: 20, taxRate: 0.2 },
          toJSON: jest.fn().mockReturnValue({
            id: 2,
            quantity: 1,
            Product: { id: 2, price: 20, taxRate: 0.2 }
          }),
        },
      ];

      // Mock the Cart and CartItem responses
      Cart.findByPk.mockResolvedValue(mockCart);
      CartItem.findAll.mockResolvedValue(mockCartItems);

      const result = await CartService.getCartItems(1);

      expect(result.items).toEqual([
        {
          id: 1,
          quantity: 2,
          Product: { id: 1, price: 10, taxRate: 0.1 },
          itemSubtotal: 20, // 2 * 10
          itemTax: 2,      // 20 * 0.1
        },
        {
          id: 2,
          quantity: 1,
          Product: { id: 2, price: 20, taxRate: 0.2 },
          itemSubtotal: 20, // 1 * 20
          itemTax: 4,      // 20 * 0.2
        },
      ]);

      expect(result.summary).toEqual({
        subtotal: 40, // 20 + 20
        totalTax: 6,  // 2 + 4
        total: 46,    // 40 + 6
      });
    });
  });

  describe('updateCartItem', () => {
    it('should update the cart item quantity correctly', async () => {
      // Mock del producto con inventario suficiente
      const mockCartItem = {
        id: 1,
        quantity: 2,
        Product: {
          id: 1,
          inventory: 10 // Inventario suficiente para la actualización
        },
        save: jest.fn().mockResolvedValue({
          id: 1,
          quantity: 5,
          Product: { id: 1, inventory: 10 }
        })
      };

      // Mock de CartItem.findByPk para devolver el cartItem mockeado
      CartItem.findByPk.mockResolvedValue(mockCartItem);

      // Llamada a la función de servicio para actualizar el cartItem
      const result = await CartService.updateCartItem(1, 5);

      // Verificamos que el resultado coincida con el cartItem actualizado
      expect(result.quantity).toBe(5);
      expect(mockCartItem.save).toHaveBeenCalled(); // Verifica que se haya llamado save
    });

    it('should throw an error if cart item is not found', async () => {
      CartItem.findByPk.mockResolvedValue(null);

      await expect(CartService.updateCartItem(1, 3)).rejects.toThrow('Item not found');
    });

    it('should throw an error if not enough inventory is available', async () => {
      const mockCartItem = {
        id: 1,
        quantity: 2,
        Product: {
          id: 1,
          inventory: 5 // Inventario insuficiente
        }
      };
      CartItem.findByPk.mockResolvedValue(mockCartItem);

      await expect(CartService.updateCartItem(1, 6)).rejects.toThrow('Not enough inventory available');
    });

    it('should handle errors when updating the cart item fails', async () => {
      const mockCartItem = {
        id: 1,
        quantity: 2,
        Product: {
          id: 1,
          inventory: 10 // Inventario suficiente para la actualización
        },
        save: jest.fn().mockRejectedValue(new Error('Database error'))
      };
      CartItem.findByPk.mockResolvedValue(mockCartItem);

      await expect(CartService.updateCartItem(1, 3)).rejects.toThrow('Database error');
    });
  });

  describe('removeCartItem', () => {
    it('should remove the cart item successfully', async () => {
      // Mock de un cart item encontrado
      const mockCartItem = { destroy: jest.fn().mockResolvedValue() };
      CartItem.findByPk.mockResolvedValue(mockCartItem);

      // Llamar a removeCartItem
      const result = await CartService.removeCartItem(1);

      expect(result).toBeUndefined(); // Asegurar que no devuelve nada
    });

    it('should throw an error if item is not found', async () => {
      CartItem.findByPk.mockResolvedValue(null);

      await expect(CartService.removeCartItem(1)).rejects.toThrow('Item not found');
    });

    it('should handle errors when removing the cart item fails', async () => {
      // Simular un error en findByPk
      CartItem.findByPk.mockRejectedValue(new Error('Database error'));

      // Verificar que removeCartItem lanza el error esperado
      await expect(CartService.removeCartItem(1)).rejects.toThrow('Database error');
    });
  });
});
