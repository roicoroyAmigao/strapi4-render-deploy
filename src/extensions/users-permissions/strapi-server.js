// module.exports = plugin => {
//   return plugin;
// };

// path: src/extensions/users-permissions/strapi-server.js
module.exports = plugin => {
  const sanitizeOutput = (user) => {
    const {
      password, resetPasswordToken, confirmationToken, ...sanitizedUser
    } = user; // be careful, you need to omit other private attributes yourself
    return sanitizedUser;
  };

  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      ctx.state.user.id,
      {
        populate: [
          'first_name',
          'last_name',
          'address_1',
          'address_2',
          'city',
          // cotry code needs to be removed
          // from strapi user, it will belong to CheckoutState
          'region_code',
          'country',
          'postal_code',
          'phone',
          'device_token'
        ]
      }
    );

    ctx.body = sanitizeOutput(user);
  };

  plugin.controllers.user.find = async (ctx) => {
    const users = await strapi.entityService.findMany(
      'plugin::users-permissions.user',
      { ...ctx.params, populate: [
        'first_name',
        'last_name',
        'address_1',
        'address_2',
        'city',
        'region_code',
        'country',
        'postal_code',
        'phone',
        'device_token'
      ] 
      }
    );

    ctx.body = users.map(user => sanitizeOutput(user));
  };


  plugin.controllers.user.me = async (ctx) => {
    if (!ctx.state.user) {
      return ctx.unauthorized();
    }
    const user = await strapi.entityService.findOne(
      'plugin::users-permissions.user',
      ctx.state.user.id,
      {
        populate: [
          'avatar',
        ]
      }
    );

    ctx.body = sanitizeOutput(user);
  };

  plugin.controllers.user.find = async (ctx) => {
    console.log(ctx);
    const users = await strapi.entityService.findMany(
      'plugin::users-permissions.user',
      {
        ...ctx.params, populate: [
          'avatar',
        ]
      }
    );

    ctx.body = users.map(user => sanitizeOutput(user));
  };



  const getController = name => {
    return strapi.plugins['users-permissions'].controller(name);
  };

  // Create the new controller
  plugin.controllers.user.updateMe = async (ctx) => {
    const user = ctx.state.user;

    // User has to be logged in to update themselves
    if (!user) {
      return ctx.unauthorized();
    }

    // Pick only specific fields for security
    const newData = _.pick(ctx.request.body, ['email', 'username', 'password', 'confirmPassword']);

    // Make sure there is no duplicate user with the same username
    if (newData.username) {
      const userWithSameUsername = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { username: newData.username } });

      if (userWithSameUsername && userWithSameUsername.id != user.id) {
        return ctx.badRequest('Username already taken');
      }
    }

    // Make sure there is no duplicate user with the same email
    if (newData.email) {
      const userWithSameEmail = await strapi
        .query('plugin::users-permissions.user')
        .findOne({ where: { email: newData.email.toLowerCase() } });

      if (userWithSameEmail && userWithSameEmail.id != user.id) {
        return ctx.badRequest('Email already taken');
      }
      newData.email = newData.email.toLowerCase();
    }

    // Check if user is changing password and make sure passwords match
    if (newData.password) {
      if (!newData.confirmPassword) {
        return ctx.badRequest('Missing password confirmation');
      } else if (newData.password !== newData.confirmPassword) {
        return ctx.badRequest('Passwords don\'t match')
      }
      delete newData.confirmPassword
    }

    // Reconstruct context so we can pass to the controller
    ctx.request.body = newData
    ctx.params = { id: user.id }

    // Update the user and return the sanitized data
    return await getController('user').update(ctx)
  };

  // Add the custom route
  plugin.routes['content-api'].routes.unshift({
    method: 'PUT',
    path: '/users/me',
    handler: 'user.updateMe',
    config: {
      prefix: ''
    }
  });

  return plugin;
};