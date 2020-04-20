---
title: Local mailboxes
---

# Local Mailboxes

The easiest way to catch incoming emails in HELO is by using local mailboxes. Local mailboxes are created automatically, when HELO receives an incoming email from your application. There is no need to manually create these mailboxes.

## Email details

Once HELO receives an incoming email from one of your applications, it will send out a notification and show you the email details in the application UI. Here is how such an example email might look like:

![](/img/email-details.png)

The user interface gives you all the information about the incoming email, such as the sender, recipient, possible CC, and BCC addresses.

You can get more information about the incoming email, by looking at the different tabs. They include information such as the raw email message, the SMTP headers or spam report information.

## Link checker

HELO comes with a built-in link checker, that makes it very easy to determine if your outgoing emails contain any broken or just wrong links. The link checker is enabled by default and will try to automatically perform a `HEAD` request to all of your email links. If the `HEAD` request does not succeed, it will then try and perform a `GET` request instead.

![](/img/link-checker.png)

Because HELO will try and perform a `GET` request, depending on your email content, this might not be the desired behaviour. Think about email verification links that only work one time. When HELO performs the `GET` request to those links, the email will be marked as verified and additional requests will fail.

Because of this, HELO also allows you to manually toggle the link checker feature. You can enable or disable the behaviour in HELOs settings.

## Spam report

When HELO receives an incoming email, it will automatically perform a SpamAssassin check on the email message. The SpamAssassin score will tell you how likely it is, that your email will end up in the users spam box. 
Please be aware that this score is only one indicator and is not a guarantee that your email will go through. When you actually send out your email a lot of additional factors come into play, when receiving email servers calculate their own spam score - such as the server that your email was sent from. 

The spam report will then give you a detailed information of the SpamAssassin scoring.

![](/img/spam-report.png)

## Testing

HELO allows you to easily test how your email will look like on multiple different email clients. This is done by making use of the great [Testi@](https://testi.at) service - it requires that you have a Testi account. Testi includes some tests in its free version, so you can check out if you think that the service is helpful to you.

Once you login with your Testi credentials, you can select to add new tests, choose which email clients to test your email on, and you will afterwards see the results in the HELO UI:

![](/img/testing.png)
