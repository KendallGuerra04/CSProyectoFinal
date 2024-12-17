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
const router = express.Router();
const ProductService = require('../services/productService');

// Create a product
router.post(stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), '/'), async (req, res) => {
  if (stryMutAct_9fa48("84")) {
    {}
  } else {
    stryCov_9fa48("84");
    try {
      if (stryMutAct_9fa48("85")) {
        {}
      } else {
        stryCov_9fa48("85");
        const product = await ProductService.createProduct(req.body);
        res.status(201).json(product);
      }
    } catch (error) {
      if (stryMutAct_9fa48("86")) {
        {}
      } else {
        stryCov_9fa48("86");
        res.status(400).json(stryMutAct_9fa48("87") ? {} : (stryCov_9fa48("87"), {
          error: error.message
        }));
      }
    }
  }
});

// Get all products
router.get(stryMutAct_9fa48("88") ? "" : (stryCov_9fa48("88"), '/'), async (req, res) => {
  if (stryMutAct_9fa48("89")) {
    {}
  } else {
    stryCov_9fa48("89");
    try {
      if (stryMutAct_9fa48("90")) {
        {}
      } else {
        stryCov_9fa48("90");
        const products = await ProductService.getAllProducts();
        res.json(products);
      }
    } catch (error) {
      if (stryMutAct_9fa48("91")) {
        {}
      } else {
        stryCov_9fa48("91");
        res.status(500).json(stryMutAct_9fa48("92") ? {} : (stryCov_9fa48("92"), {
          error: error.message
        }));
      }
    }
  }
});

// Get products by category
router.get(stryMutAct_9fa48("93") ? "" : (stryCov_9fa48("93"), '/category/:categoryId'), async (req, res) => {
  if (stryMutAct_9fa48("94")) {
    {}
  } else {
    stryCov_9fa48("94");
    try {
      if (stryMutAct_9fa48("95")) {
        {}
      } else {
        stryCov_9fa48("95");
        const options = stryMutAct_9fa48("96") ? {} : (stryCov_9fa48("96"), {
          sort: req.query.sort,
          limit: req.query.limit,
          offset: req.query.offset
        });
        const products = await ProductService.getProductsByCategory(req.params.categoryId, options);
        res.json(products);
      }
    } catch (error) {
      if (stryMutAct_9fa48("97")) {
        {}
      } else {
        stryCov_9fa48("97");
        res.status(400).json(stryMutAct_9fa48("98") ? {} : (stryCov_9fa48("98"), {
          error: error.message
        }));
      }
    }
  }
});

// Get products by multiple categories
router.get(stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), '/categories'), async (req, res) => {
  if (stryMutAct_9fa48("100")) {
    {}
  } else {
    stryCov_9fa48("100");
    try {
      if (stryMutAct_9fa48("101")) {
        {}
      } else {
        stryCov_9fa48("101");
        const options = stryMutAct_9fa48("102") ? {} : (stryCov_9fa48("102"), {
          sort: req.query.sort,
          limit: req.query.limit,
          offset: req.query.offset
        });
        const products = await ProductService.getProductsByCategories(req.query.categories, options);
        res.json(products);
      }
    } catch (error) {
      if (stryMutAct_9fa48("103")) {
        {}
      } else {
        stryCov_9fa48("103");
        res.status(400).json(stryMutAct_9fa48("104") ? {} : (stryCov_9fa48("104"), {
          error: error.message
        }));
      }
    }
  }
});
module.exports = router;