---
title: "AWS Profiles Explained"
author: "Lino Layani"
date: 2022-12-09T23:55:02.010Z
lastmod: 2024-01-26T13:19:09-06:00
tags: ["AWS", "AWS Basics", "cloud", "Profile"]

summary: "AWS profiles are a convenient way to manage and use different sets of credentials and configuration settings in the AWS environment."

cover:
  image: "/posts/2022/aws-profile-explained/images/1.jpg"
  alt: "AWS Profiles Explained: Your Shortcut to Hassle-Free Cloud Management"

images:
  - "/posts/2022/aws-profile-explained/images/1.jpg"
---

> **TL;DR**  
> Profiles simplify managing multiple AWS accounts by removing the need to re-enter credentials.

## The What

In the Amazon Web Services (AWS) environment, a profile is a **named set of credentials and other configuration details** that can be used to access AWS services.

Profiles are stored locally on the user’s machine, typically within the `.aws/credentials` file. They can be used to specify credentials, region, and other settings, that the AWS command-line tools or SDKs should use when interacting with AWS.

## The Why

There are several reasons why using AWS profiles can be useful in the AWS environment:

- Profiles allow you to **store and use multiple sets of credentials** for different purposes, such as for different AWS accounts or for different environments (e.g. development, staging, and production). This can make it easier to **switch between different credentials** without having to manually enter them each time.
- Profiles allow you to **store and use sensitive credentials in a secure manner**, as the credentials are stored in encrypted form in a local file on your computer. This can help to prevent unauthorized access to your AWS resources

## The How

Run `aws configure` to create or manage profiles. It will ask for the necessary details and store the profile in a file called `.aws/credentials` in your home directory.

Once configured, you can specify which profile to use by:

- Passing the `--profile` flag with your AWS CLI commands, or
- Setting the `AWS_PROFILE` environment variable

## Final Thoughts

Overall, using AWS profiles can provide **convenience, security, and flexibility** when working with AWS services. It is a **best practice** to use profiles whenever possible, especially if you are working with **multiple AWS accounts and/or environments**.
