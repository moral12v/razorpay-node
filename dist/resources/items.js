'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _require = require('../utils/razorpay-utils'),
    normalizeDate = _require.normalizeDate,
    normalizeBoolean = _require.normalizeBoolean;

module.exports = function (api) {
  return {
    all: function all() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];
      var from = params.from,
          to = params.to,
          count = params.count,
          skip = params.skip,
          authorized = params.authorized,
          receipt = params.receipt;


      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      count = Number(count) || 10;
      skip = Number(skip) || 0;
      authorized = normalizeBoolean(authorized);

      return api.get({
        url: '/items',
        data: {
          from: from,
          to: to,
          count: count,
          skip: skip,
          authorized: authorized,
          receipt: receipt
        }
      }, callback);
    },
    fetch: function fetch(itemId, callback) {
      if (!itemId) {
        throw new Error('`item_id` is mandatory');
      }

      return api.get({
        url: '/items/' + itemId
      }, callback);
    },
    create: function create() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments[1];

      var name = params.name;
      var amount = params.amount;
      var currency = params.currency;
      var description = params.description;

      currency = currency || 'INR';

      if (!amount) {
        throw new Error('`amount` is mandatory');
      }

      var data = Object.assign({
        name: name,
        amount: amount,
        currency: currency,
        description: description
      });

      return api.post({
        url: '/items',
        data: data
      }, callback);
    },
    edit: function edit(itemId) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var callback = arguments[2];


      if (!itemId) {
        throw new Error('`item_id` is mandatory');
      }

      var url = '/items/' + itemId,
          active = params.active,
          rest = _objectWithoutProperties(params, ['active']);


      var data = Object.assign(_extends({
        active: normalizeBoolean(active)
      }, rest));

      return api.patch({
        url: url,
        data: data
      }, callback);
    },


    delete: function _delete(itemId, callback) {

      if (!itemId) {
        throw new Error('`item_id` is mandatory');
      }

      return api.delete({
        url: '/items/' + itemId
      }, callback);
    }
  };
};