---
title: Configuration
---

## Generic usage

HELO can be used with any local software that can send emails via SMTP. 

If your specific application is not listed, please refer to your application documentation on how to change the SMTP configuration.

If you are using Vagrant/Homestead, use `10.0.2.2` as your SMTP-Host.  
For Docker, use `host.docker.internal` as your SMTP-Host.

## Ruby on Rails
In `config/environments/*.rb` specify ActionMailer defaults for your development or staging servers:

```
config.action_mailer.delivery_method = :smtp
config.action_mailer.smtp_settings = {
  :user_name => 'Mailbox-Name',
  :password => '',
  :address => '127.0.0.1',
  :domain => '127.0.0.1',
  :port => ':port:',
  :authentication => :cram_md5
}
```

## Ruby (net/smtp)

```
require 'net/smtp'

message = <<-END.split("\n").map!(&:strip).join("\n")
From: Private Person <from@127.0.0.1>
To: A Test User <to@127.0.0.1>
Subject: HELO!

This is a test e-mail message from HELO.
END

Net::SMTP.start('127.0.0.1',
              2525,
              '127.0.0.1',
              'Mailbox-Name', '', :cram_md5) do |smtp|
smtp.send_message message, 'from@127.0.0.1',
                           'to@127.0.0.1'
end
```

## Laravel

Use these configuration values in your Laravel applications `.env` file, to connect to HELO:

For Laravel 7+:
```
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=:port:
MAIL_USERNAME=Inbox-Name
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

For Laravel 6 and below:
```
MAIL_DRIVER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=:port:
MAIL_USERNAME=Inbox-Name
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
```

You can install the <strong>optional</strong> HELO helper package to display additional debug information, like which view file, view content and view data was used when sending the email.

To install the package use: `composer require --dev beyondcode/helo-laravel`

## Symfony

Symfony uses SwiftMailerBundle to send emails. You can find more information on how to send email on [Symfony's website](https://symfony.com/doc/current/email.html).

To get started you need to modify .env file in your project directory and set MAILER_URL value:

```
MAILER_URL=smtp://127.0.0.1:2525?encryption=tls&auth_mode=login&username=Mailbox-Name&password=
```

## WordPress

You can configure your WordPress site to send mails to HELO by using [this code](http://codex.wordpress.org/Plugin_API/Action_Reference/phpmailer_init):

```
function helo($phpmailer) {
  $phpmailer->isSMTP();
  $phpmailer->Host = '127.0.0.1';
  $phpmailer->SMTPAuth = true;
  $phpmailer->Port = 2525;
  $phpmailer->Username = 'Mailbox-Name';
  $phpmailer->Password = '';
}

add_action('phpmailer_init', 'helo');
```

## PHPMailer

You can use this configuration to use HELO with PHPMailer:

```php
$mail = new PHPMailer();
$mail->isSMTP();
$mail->Host = '127.0.0.1';
$mail->SMTPAuth = true;
$mail->Username = 'Mailbox-Name';
$mail->Password = '';
$mail->Port = 2525;
```

## Yii Framework

You can find documentation for sending emails using SMTP in Yii Framework [here](https://www.yiiframework.com/wiki/656/how-to-send-emails-using-smtp).

In your config file add:

```
'components' => [
     ...
     'mail' => [
         'class' => 'yii\\swiftmailer\\Mailer',
         'transport' => [
             'class' => 'Swift_SmtpTransport',
             'host' => '127.0.0.1',
             'username' => 'Mailbox-Name',
             'password' => '',
             'port' => '2525',
             'encryption' => 'tls',
         ],
     ],
     ...
 ],
```

## Nodemailer
Nodemailer is an easy to use module to send e-mails with Node.JS:


```
let transport = nodemailer.createTransport({
  host: "127.0.0.1",
  port: 2525,
  auth: {
    user: "Mailbox-Name",
    pass: ""
  }
});
```
