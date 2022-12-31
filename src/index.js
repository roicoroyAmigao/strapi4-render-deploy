'use strict';
// const axios = require("axios");

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {
    // let seedData = axios.post(`http://localhost:9000/hooks/seed`);

    // seedData.then(async (res) => {

    //   // console.log(res.data);

    //   const products = await res?.data.products;
    //   const regions = await res?.data.regions;
    //   const shippingOptions = await res.data.shippingOptions;
    //   const paymentProviders = await res.data.paymentProviders;
    //   const fulfillmentProviders = await res?.data.fulfillmentProviders;
    //   const shippingProfiles = await res?.data.shippingProfiles;

    //   await strapi.services["api::fulfillment-provider.fulfillment-provider"].bootstrap(fulfillmentProviders);
    //   await strapi.services["api::payment-provider.payment-provider"].bootstrap(paymentProviders);
    //   await strapi.services["api::region.region"].bootstrap(regions);
    //   await strapi.services["api::shipping-option.shipping-option"].bootstrap(shippingOptions);
    //   await strapi.services["api::shipping-profile.shipping-profile"].bootstrap(shippingProfiles);
    //   await strapi.services["api::product.product"].bootstrap(products);

    //   // const user = await strapi.services['plugin::users-permissions.user'];
    //   // // user.count;

    //   // user.exists().then((res) => {
    //   //   console.log(res);
    //   // });

    // });
  },
};
