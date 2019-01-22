---
home: true
actionText: Get Started →
actionLink: /1.0/getting-started/introduction.html
features:
- title: Fluent API
  details: Laravel Mailbox has a fluent API that allows you to easily define custom mailboxes to catch incoming emails.
- title: Automate tasks
  details: Use Laravel Mailbox to automate tasks and automatically perform tasks whenever your application receives an incoming email.
- title: Multiple-Drivers supported
  details: Laravel Mailbox supports Mailgun, SendGrid and local development out of the box - with the ability to add new drivers easily.
---



```bash
$ composer require beyondcode/laravel-mailbox
```

```php
Mailbox::from('{username}@gmail.com', function (InboundEmail $email, $username) {
    // Access email attributes and content
    $subject = $email->subject();
    
    $email->reply(new ReplyMailable);
});
```