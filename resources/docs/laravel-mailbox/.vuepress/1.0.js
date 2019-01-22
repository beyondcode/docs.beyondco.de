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
      'mailboxes',
      'handling'
    ]),
  },
  {
    title: 'Drivers',
    collapsable: false,
    children: prefix('drivers', [
      'drivers',
    ]),
  }
]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}