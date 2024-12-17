// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
const Cart = require('../models/cart');
const CartItem = require('../models/cartItem');
const Product = require('../models/product');
class CartService {
  static async createCart(userId) {
    if (stryMutAct_9fa48("116")) {
      {}
    } else {
      stryCov_9fa48("116");
      if (stryMutAct_9fa48("120") ? userId > 0 : stryMutAct_9fa48("119") ? userId < 0 : stryMutAct_9fa48("118") ? false : stryMutAct_9fa48("117") ? true : (stryCov_9fa48("117", "118", "119", "120"), userId <= 0)) {
        if (stryMutAct_9fa48("121")) {
          {}
        } else {
          stryCov_9fa48("121");
          throw new Error(stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), 'The user doesnt exits'));
        }
      }
      return await Cart.create(stryMutAct_9fa48("123") ? {} : (stryCov_9fa48("123"), {
        userId
      }));
    }
  }
  static async addItemToCart(cartId, productId, quantity) {
    if (stryMutAct_9fa48("124")) {
      {}
    } else {
      stryCov_9fa48("124");
      const product = await Product.findByPk(productId);
      if (stryMutAct_9fa48("127") ? false : stryMutAct_9fa48("126") ? true : stryMutAct_9fa48("125") ? product : (stryCov_9fa48("125", "126", "127"), !product)) {
        if (stryMutAct_9fa48("128")) {
          {}
        } else {
          stryCov_9fa48("128");
          throw new Error(stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), 'Product not found'));
        }
      }
      if (stryMutAct_9fa48("133") ? product.inventory >= quantity : stryMutAct_9fa48("132") ? product.inventory <= quantity : stryMutAct_9fa48("131") ? false : stryMutAct_9fa48("130") ? true : (stryCov_9fa48("130", "131", "132", "133"), product.inventory < quantity)) {
        if (stryMutAct_9fa48("134")) {
          {}
        } else {
          stryCov_9fa48("134");
          throw new Error(stryMutAct_9fa48("135") ? "" : (stryCov_9fa48("135"), 'Not enough inventory available'));
        }
      }

      // Check if item already exists in cart
      const existingItem = await CartItem.findOne(stryMutAct_9fa48("136") ? {} : (stryCov_9fa48("136"), {
        where: stryMutAct_9fa48("137") ? {} : (stryCov_9fa48("137"), {
          cartId,
          productId
        })
      }));
      if (stryMutAct_9fa48("139") ? false : stryMutAct_9fa48("138") ? true : (stryCov_9fa48("138", "139"), existingItem)) {
        if (stryMutAct_9fa48("140")) {
          {}
        } else {
          stryCov_9fa48("140");
          const newQuantity = stryMutAct_9fa48("141") ? existingItem.quantity - quantity : (stryCov_9fa48("141"), existingItem.quantity + quantity);
          if (stryMutAct_9fa48("145") ? product.inventory >= newQuantity : stryMutAct_9fa48("144") ? product.inventory <= newQuantity : stryMutAct_9fa48("143") ? false : stryMutAct_9fa48("142") ? true : (stryCov_9fa48("142", "143", "144", "145"), product.inventory < newQuantity)) {
            if (stryMutAct_9fa48("146")) {
              {}
            } else {
              stryCov_9fa48("146");
              throw new Error(stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), 'Not enough inventory available'));
            }
          }
          existingItem.quantity = newQuantity;
          await existingItem.save();
          return existingItem;
        }
      }
      return await CartItem.create(stryMutAct_9fa48("148") ? {} : (stryCov_9fa48("148"), {
        cartId,
        productId,
        quantity
      }));
    }
  }
  static async getCartItems(cartId) {
    if (stryMutAct_9fa48("149")) {
      {}
    } else {
      stryCov_9fa48("149");
      const cart = await Cart.findByPk(cartId);
      if (stryMutAct_9fa48("152") ? false : stryMutAct_9fa48("151") ? true : stryMutAct_9fa48("150") ? cart : (stryCov_9fa48("150", "151", "152"), !cart)) {
        if (stryMutAct_9fa48("153")) {
          {}
        } else {
          stryCov_9fa48("153");
          throw new Error(stryMutAct_9fa48("154") ? "" : (stryCov_9fa48("154"), 'Item not found'));
        }
      }
      const items = await CartItem.findAll(stryMutAct_9fa48("155") ? {} : (stryCov_9fa48("155"), {
        where: stryMutAct_9fa48("156") ? {} : (stryCov_9fa48("156"), {
          cartId
        }),
        include: Product
      }));
      let subtotal = 0;
      let totalTax = 0;
      const itemsWithTotals = items.map(item => {
        if (stryMutAct_9fa48("157")) {
          {}
        } else {
          stryCov_9fa48("157");
          const itemSubtotal = stryMutAct_9fa48("158") ? item.quantity / item.Product.price : (stryCov_9fa48("158"), item.quantity * item.Product.price);
          const itemTax = stryMutAct_9fa48("159") ? itemSubtotal / item.Product.taxRate : (stryCov_9fa48("159"), itemSubtotal * item.Product.taxRate);
          stryMutAct_9fa48("160") ? subtotal -= itemSubtotal : (stryCov_9fa48("160"), subtotal += itemSubtotal);
          stryMutAct_9fa48("161") ? totalTax -= itemTax : (stryCov_9fa48("161"), totalTax += itemTax);
          return stryMutAct_9fa48("162") ? {} : (stryCov_9fa48("162"), {
            ...item.toJSON(),
            itemSubtotal,
            itemTax
          });
        }
      });
      return stryMutAct_9fa48("163") ? {} : (stryCov_9fa48("163"), {
        items: itemsWithTotals,
        summary: stryMutAct_9fa48("164") ? {} : (stryCov_9fa48("164"), {
          subtotal,
          totalTax,
          total: stryMutAct_9fa48("165") ? subtotal - totalTax : (stryCov_9fa48("165"), subtotal + totalTax)
        })
      });
    }
  }
  static async updateCartItem(itemId, quantity) {
    if (stryMutAct_9fa48("166")) {
      {}
    } else {
      stryCov_9fa48("166");
      const cartItem = await CartItem.findByPk(itemId, stryMutAct_9fa48("167") ? {} : (stryCov_9fa48("167"), {
        include: Product
      }));
      if (stryMutAct_9fa48("170") ? false : stryMutAct_9fa48("169") ? true : stryMutAct_9fa48("168") ? cartItem : (stryCov_9fa48("168", "169", "170"), !cartItem)) {
        if (stryMutAct_9fa48("171")) {
          {}
        } else {
          stryCov_9fa48("171");
          throw new Error(stryMutAct_9fa48("172") ? "" : (stryCov_9fa48("172"), 'Item not found'));
        }
      }
      if (stryMutAct_9fa48("176") ? cartItem.Product.inventory >= quantity : stryMutAct_9fa48("175") ? cartItem.Product.inventory <= quantity : stryMutAct_9fa48("174") ? false : stryMutAct_9fa48("173") ? true : (stryCov_9fa48("173", "174", "175", "176"), cartItem.Product.inventory < quantity)) {
        if (stryMutAct_9fa48("177")) {
          {}
        } else {
          stryCov_9fa48("177");
          throw new Error(stryMutAct_9fa48("178") ? "" : (stryCov_9fa48("178"), 'Not enough inventory available'));
        }
      }
      cartItem.quantity = quantity;
      await cartItem.save();
      return cartItem;
    }
  }
  static async removeCartItem(itemId) {
    if (stryMutAct_9fa48("179")) {
      {}
    } else {
      stryCov_9fa48("179");
      const cartItem = await CartItem.findByPk(itemId);
      if (stryMutAct_9fa48("182") ? false : stryMutAct_9fa48("181") ? true : stryMutAct_9fa48("180") ? cartItem : (stryCov_9fa48("180", "181", "182"), !cartItem)) {
        if (stryMutAct_9fa48("183")) {
          {}
        } else {
          stryCov_9fa48("183");
          throw new Error(stryMutAct_9fa48("184") ? "" : (stryCov_9fa48("184"), 'Item not found'));
        }
      }
      await cartItem.destroy();
    }
  }
}
module.exports = CartService;