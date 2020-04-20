module.exports = [
  {
    title: 'Getting Started',
    collapsable: false,
    children: [
    	'getting-started/installation',
      'getting-started/configuration',
    ],
  },
  {
    title: 'Basic Usage',
    collapsable: false,
    children: prefix('basic-usage', [
      'mailboxes',
      'remote-mailboxes',
      'sharing'
    ]),
  }
]

function prefix(prefix, children) {
  return children.map(child => `${prefix}/${child}`)
}