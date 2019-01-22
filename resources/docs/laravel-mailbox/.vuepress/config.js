module.exports = {
  title: 'Laravel Mailbox 📬',
  description: 'Handle incoming emails in your Laravel application.',
  
  base: '/laravel-mailbox/',
  dest: './public/laravel-mailbox',

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
    repo: 'beyondcode/laravel-mailbox',
    docsRepo: 'beyondcode/docs.beyondco.de',
    docsDir: 'resources/docs/laravel-mailbox',
    docsBranch: 'master',
    editLinks: true,
    sidebar: {
      '/1.0/': require('./1.0'),
    },
  }
}
