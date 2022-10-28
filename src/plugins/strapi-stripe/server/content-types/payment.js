'use strict';

module.exports = {
  info: {
    tableName: 'StrapiStripePayment',
    singularName: 'strapi-stripe-payment', // kebab-case mandatory
    pluralName: 'strapi-stripe-payments', // kebab-case mandatory
    displayName: 'Payment',
    description: 'Stripe Payment',
    kind: 'collectionType',
  },
  options: {
    draftAndPublish: false,
  },
  pluginOptions: {
    'content-manager': {
      visible: false,
    },
    'content-type-builder': {
      visible: false,
    },
  },
  attributes: {
    txnDate: {
      type: 'datetime',
      required: true,
      configurable: false,
    },
    transactionId: {
      type: 'string',
      maxLength: 250,
      required: true,
      configurable: false,
    },
    isTxnSuccessful: {
      type: 'boolean',
      default: false,
      configurable: false,
    },
    txnMessage: {
      type: 'string',
      maxLength: 5000,
      configurable: false,
    },
    txnErrorMessage: {
      type: 'string',
      maxLength: 250,
      configurable: false,
    },
    txnAmount: {
      type: 'decimal',
      required: true,
      configurable: false,
    },
    customerName: {
      type: 'string',
      required: true,
      configurable: false,
    },
    customerEmail: {
      type: 'string',
      required: true,
      configurable: false,
    },
    stripeProduct: {
      type: 'relation',
      relation: 'manyToOne',
      target: 'plugin::strapi-stripe.strapi-stripe-product',
      inversedBy: 'stripePayment',
      configurable: false,
    },
  },
};
