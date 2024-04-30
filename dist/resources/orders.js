'use strict';

const { normalizeDate, normalizeBoolean, normalizeNotes } = require('../utils/razorpay-utils');

module.exports = function (api) {
  return {
    all(params = {}, callback) {
      if (!callback || typeof callback !== 'function') {
        throw new Error('Callback function is required');
      }

      let { from, to, count = 10, skip = 0, authorized, receipt } = params;
      let expand;

      if (from) {
        from = normalizeDate(from);
      }

      if (to) {
        to = normalizeDate(to);
      }

      if (params.hasOwnProperty("expand")) {
        expand = { expand: params.expand };
      }

      count = Number(count);
      skip = Number(skip);
      authorized = normalizeBoolean(authorized);

      api.get({
        url: '/orders',
        data: {
          from,
          to,
          count,
          skip,
          authorized,
          receipt,
          ...expand
        }
      }, callback);
    },

    fetch(orderId, callback) {
      if (!orderId) {
        callback(new Error('`order_id` is mandatory'));
        return;
      }

      api.get({
        url: `/orders/${orderId}`
      }, callback);
    },

    create(params = {}, callback) {
      if (!callback || typeof callback !== 'function') {
        throw new Error('Callback function is required');
      }

      let { amount, currency = 'INR', receipt, payment_capture, notes, method, ...otherParams } = params;
      let isNotForm = false;

      if (params.hasOwnProperty("first_payment_min_amount")) {
        isNotForm = true;
      }

      const data = {
        amount,
        currency,
        receipt,
        payment_capture: normalizeBoolean(payment_capture),
        method,
        ...otherParams,
        ...normalizeNotes(notes)
      };

      api.post({
        url: '/orders',
        data
      }, callback, isNotForm);
    },

    edit(orderId, params = {}, callback) {
      if (!orderId) {
        callback(new Error('`order_id` is mandatory'));
        return;
      }

      const data = {
        ...normalizeNotes(params.notes)
      };

      api.patch({
        url: `/orders/${orderId}`,
        data
      }, callback);
    },

    fetchPayments(orderId, callback) {
      if (!orderId) {
        callback(new Error('`order_id` is mandatory'));
        return;
      }

      api.get({
        url: `/orders/${orderId}/payments`
      }, callback);
    },

    fetchTransferOrder(orderId, callback) {
      if (!orderId) {
        callback(new Error('`order_id` is mandatory'));
        return;
      }

      api.get({
        url: `/orders/${orderId}`,
        data: {
          expand: ['transfers', 'status']
        }
      }, callback);
    }
  };
};
