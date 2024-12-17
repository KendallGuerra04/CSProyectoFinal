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
const express = require('express');
const CartService = require('../services/cartService');
const router = express.Router();

// Create a new cart for a user
router.post(stryMutAct_9fa48("51") ? "" : (stryCov_9fa48("51"), '/:userId'), async (req, res) => {
  if (stryMutAct_9fa48("52")) {
    {}
  } else {
    stryCov_9fa48("52");
    try {
      if (stryMutAct_9fa48("53")) {
        {}
      } else {
        stryCov_9fa48("53");
        const userId = req.params.userId;
        const cart = await CartService.createCart(userId);
        return res.status(201).json(cart);
      }
    } catch (error) {
      if (stryMutAct_9fa48("54")) {
        {}
      } else {
        stryCov_9fa48("54");
        return res.status(400).json(stryMutAct_9fa48("55") ? {} : (stryCov_9fa48("55"), {
          error: error.message
        }));
      }
    }
  }
});

// Add an item to the cart
router.post(stryMutAct_9fa48("56") ? "" : (stryCov_9fa48("56"), '/:cartId/items'), async (req, res) => {
  if (stryMutAct_9fa48("57")) {
    {}
  } else {
    stryCov_9fa48("57");
    try {
      if (stryMutAct_9fa48("58")) {
        {}
      } else {
        stryCov_9fa48("58");
        const {
          productId,
          quantity
        } = req.body;
        const cartItem = await CartService.addItemToCart(req.params.cartId, productId, quantity);
        res.status(201).json(cartItem);
      }
    } catch (error) {
      if (stryMutAct_9fa48("59")) {
        {}
      } else {
        stryCov_9fa48("59");
        res.status(400).json(stryMutAct_9fa48("60") ? {} : (stryCov_9fa48("60"), {
          error: error.message
        }));
      }
    }
  }
});

// Get all items in a cart
router.get(stryMutAct_9fa48("61") ? "" : (stryCov_9fa48("61"), '/:cartId/items'), async (req, res) => {
  if (stryMutAct_9fa48("62")) {
    {}
  } else {
    stryCov_9fa48("62");
    try {
      if (stryMutAct_9fa48("63")) {
        {}
      } else {
        stryCov_9fa48("63");
        const items = await CartService.getCartItems(req.params.cartId);
        return res.json(items);
      }
    } catch (errors) {
      if (stryMutAct_9fa48("64")) {
        {}
      } else {
        stryCov_9fa48("64");
        return res.status(400).json(stryMutAct_9fa48("65") ? {} : (stryCov_9fa48("65"), {
          error: errors.message
        }));
      }
    }
  }
});

// Update quantity of a cart item
router.put(stryMutAct_9fa48("66") ? "" : (stryCov_9fa48("66"), '/:cartId/items/:itemId'), async (req, res) => {
  if (stryMutAct_9fa48("67")) {
    {}
  } else {
    stryCov_9fa48("67");
    try {
      if (stryMutAct_9fa48("68")) {
        {}
      } else {
        stryCov_9fa48("68");
        const {
          quantity
        } = req.body;
        const cartItem = await CartService.updateCartItem(req.params.itemId, quantity);
        res.json(cartItem);
      }
    } catch (error) {
      if (stryMutAct_9fa48("69")) {
        {}
      } else {
        stryCov_9fa48("69");
        res.status(400).json(stryMutAct_9fa48("70") ? {} : (stryCov_9fa48("70"), {
          error: error.message
        }));
      }
    }
  }
});

// Remove an item from the cart
router.delete(stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), '/:cartId/items/:itemId'), async (req, res) => {
  if (stryMutAct_9fa48("72")) {
    {}
  } else {
    stryCov_9fa48("72");
    try {
      if (stryMutAct_9fa48("73")) {
        {}
      } else {
        stryCov_9fa48("73");
        await CartService.removeCartItem(req.params.itemId);
        res.status(204).send();
      }
    } catch (error) {
      if (stryMutAct_9fa48("74")) {
        {}
      } else {
        stryCov_9fa48("74");
        res.status(400).json(stryMutAct_9fa48("75") ? {} : (stryCov_9fa48("75"), {
          error: error.message
        }));
      }
    }
  }
});
module.exports = router;