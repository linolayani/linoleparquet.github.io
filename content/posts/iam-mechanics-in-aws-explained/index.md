---
title: "IAM Mechanics in AWS explained"
author: "Lino Layani"
date: 2022-08-01T00:34:23.335Z
lastmod: 2024-01-26T13:18:51-06:00

description: "How does a user get to perform a certain action on AWS ?"
summary: "How does a user get to perform a certain action on AWS ?"
tags: ["AWS", "IAM", "AWS Basics", "cloud"]

cover:
  image: "/posts/iam-mechanics-in-aws-explained/images/1.jpeg"
  alt: "IAM Mechanics in AWS explained"

images:
  - "/posts/iam-mechanics-in-aws-explained/images/1.jpeg"
  - "/posts/iam-mechanics-in-aws-explained/images/2.jpg"
  - "/posts/iam-mechanics-in-aws-explained/images/3.png"
---

Let’s start by defining some useful terms:

**IAM**  
IAM stands for **Identity Access Management**. Its a framework that allows you to control the access to the ressources. Simply put, this is where you to define who can access what.

![Straight from the AWS official documentation](/posts/iam-mechanics-in-aws-explained/images/2.jpg#center)

---

**User**  
A user is a **person** using a AWS account with his AWS credentials. It can be you or a person of your team.

---

**Group**  
A group is composed by users. A group allows you to **divide users around a certain theme**. Group allow you to define a default policy document, so that anyone that has membership to a particular group automatically inherit those policies that are associated with that document. It’s a great way to standardise your processes.

---

**Role**  
A Role is similar to a User, in that it is an AWS identity with permission policies that **determine what the identity can and cannot do in AWS**. However, instead of being uniquely associated with one person, a role is intended to be **assumable by anyone who needs it**.

---

**Policy**  
A Policy is a **JSON file that define permissions**. This a basically a list of access and deny rules over actions to perform on ressources.

---

**Action**  
Actions represents **ways we can interact with a ressource**. They are defined by the ressource the are associated to, and are describe as verbs.  
For exemple, creating an Amazon S3 Bucket is an action, reading his content is another action, and deleting it is another action.

---

**Ressource**  
Resources are the **entities you are going to interact with in AWS**. They are a lot of Ressources you can create and manipulate. Examples include an Amazon EC2 instance, an AWS CloudFormation stack, or an Amazon S3 bucket.

Here is a schema to understand how those objects interact:

![image](/posts/iam-mechanics-in-aws-explained/images/3.png#center)

A **user** can perform an **action** on a **ressource** thanks to the **policy** attached to the **role** that the **group** he belongs to assumes.

---

## Conclusion

There are four different ways you can grant or revoke access to a ressource to a user:

- by modifying **the group he belongs to**
- by modifying **the role a group can assume**
- by modifying **the policy linked to a role**
- or by directly modify the **policy file**
