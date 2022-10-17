import Logo from 'assets/logo.svg';

export default {
  config: {
    locales: ['en', 'pt-BR'],
    translations: {
      en: {
        'Auth.form.email.placeholder': 'roicoroy@mercado.com',
        'Auth.form.welcome.subtitle': 'Welcome to the jungle',
        'Auth.form.welcome.title': 'Mercado Amigão!',
        'global.documentation': 'Example documentation text',
        'app.components.BlockLink.documentation.content': 'Discover our products',
        'app.components.HomePage.welcome.again': 'Welcome 👋'
      },
      'pt-BR': {
        'Auth.form.email.placeholder': 'roicoroy@mercado.com',
        'Auth.form.welcome.subtitle': 'Bem-vindo a selva de pedras',
        'Auth.form.welcome.title': 'Mercado Amigão!',
        'global.documentation': 'Exemplo documentação',
        'app.components.BlockLink.documentation.content': 'Descubra nossos produtos',
        'app.components.HomePage.welcome.again': 'Bem-vindo 👋'
      },
    },
    auth: {
      logo: Logo,
    },
    theme: {
    },
    head: {
      favicon:
        Logo,
      title: 'Mercado Amigão CMS',
    },
    menu: {
      logo: Logo,
    },
    tutorials: false,
    notifications: { release: false },
  },
  bootstrap() { },
};
