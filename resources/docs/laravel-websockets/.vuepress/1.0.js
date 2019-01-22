module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
    	['getting-started/introduction', 'Introduction'],
    	'getting-started/installation',
    	'getting-started/questions-issues',
    ],
  },
  {
    title: 'Basic Usage',
    collapsable: false,
    children: prefix('basic-usage', [
      'pusher',
      'starting',
      'ssl',
    ]),
  },
  {
    title: 'Debugging',
    collapsable: false,
    children: prefix('debugging', [
      'console',
      'dashboard',
    ]),
  },
  {
    title: 'Advanced usage',
    collapsable: false,
    children: prefix('advanced-usage', [
      'app-providers',
      'custom-websocket-handlers',
    ]),
  },
  {
    title: 'FAQ',
    collapsable: false,
    children: prefix('faq', [
      'deploying',
      'scaling',
    ]),
  }
]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}