module.exports = {
  title: 'HELO',
  description: 'Debugging and testing your emails has never been easier.',

  base: '/helo/',
  dest: './public/helo',

  ga: 'UA-75386803-9',

  head: [
    [
      'link',
      {
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css',
        rel: 'stylesheet',
        type: 'text/css',
      },
    ]
  ],

  themeConfig: {
    websocketClientKey: 'documentation',
    displayAllHeaders: true,
    sidebarDepth: 1,
    editLinks: false,
    sidebar: {
      '/1.0/': require('./1.0'),
    },
    logo: 'https://beyondco.de/images/logo.png',
  }
}
