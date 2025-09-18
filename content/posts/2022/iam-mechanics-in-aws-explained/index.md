---
title: "IAM Mechanics in AWS explained"
author: "Lino Layani"
date: 2022-08-01T00:34:23.335Z
lastmod: 2024-01-26T13:18:51-06:00

summary: "IAM Mechanics can be tricky. Let's decompose how a user get to perform which action."
tags: ["AWS", "IAM", "AWS Basics", "cloud"]

cover:
  image: "/posts/2022//iam-mechanics-in-aws-explained/images/1.jpeg"
  alt: "IAM Mechanics in AWS explained"

images:
  - "/posts/2022//iam-mechanics-in-aws-explained/images/1.jpeg"
  - "/posts/2022//iam-mechanics-in-aws-explained/images/2.jpg"
  - "/posts/2022//iam-mechanics-in-aws-explained/images/3.png"
---

Let’s start by defining some useful terms:

## IAM

IAM stands for **Identity Access Management**. Its a framework that allows you to control the access to the resources. Simply put, this is where you to define who can access what.

![Straight from the AWS official documentation](/posts/2022//iam-mechanics-in-aws-explained/images/2.jpg#center)

## User

A user is a **person** using a AWS account with his AWS credentials. It can be you or a person of your team.

## Group

A group is composed by users. A group allows you to **divide users around a certain theme**. Group allow to define a default policy document, so that anyone that has membership to a particular group automatically inherit the policies associated with that document. It’s a great way to standardize your processes.

## Role

A Role is similar to a User, in that it is an AWS identity with permission policies that **determine what the identity can and cannot do in AWS**. However, instead of being uniquely associated with one person, a role is intended to be **assumable by anyone who needs it**.

## Policy

A Policy is a **JSON file that define permissions**. This a basically a list of access and deny rules over actions to perform on resources.

## Action

Actions represents **ways we can interact with a resource**. They are defined by the resource the are associated to, and are describe as verbs.  
For example, creating an Amazon S3 Bucket is an action, reading his content is another action, and deleting it is another action.

## Resource

Resources are the **entities you are going to interact with in AWS**. They are a lot of resources you can create and manipulate. Examples include an Amazon EC2 instance, an AWS CloudFormation stack, or an Amazon S3 bucket.

Here is a schema to understand how those objects interact:

![image](/posts/2022//iam-mechanics-in-aws-explained/images/3.png#center)

A **user** can perform an **action** on a **resource** thanks to the **policy** attached to the **role** that the **group** he belongs to assumes.

## Conclusion

There are four different ways you can grant or revoke access to a resource to a user:

- by modifying **the group he belongs to**
- by modifying **the role a group can assume**
- by modifying **the policy linked to a role**
- or by directly modify the **policy file**
