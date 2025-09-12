---
title: Help me escape Git Hell
date:
lastmod: 2025-04-20T13:19:15-06:00
draft: false
tags: ["git"]
summary: "Stuck in Git hell? We’ve all been there. Luckily, commands exists to get us out."

cover:
  image: "/posts/2024/rewrite-history-git/this-is-fine.png"
  alt: "Welcome to git hell. Make yourself a home."
---

> **TL;DR**
>
> - `git status` -> what is going on.
> - `git reset HEAD^` -> rollback the latest commit, locally.
> - `git reset $hash` -> rollback to the specified commit.
> - `git reflog` -> time machine for Git.
> - [Oh Shit, Git!?!](https://ohshitgit.com/) -> ultimate guide for Git disasters.

---

## We've all been there

<!-- > _His palms are sweaty, staring at this git history,_ > _PR is not ready, code is spaghetti_
>
> - Eminem, maybe -->

Getting stuck in a git hell is part of the developer experience. This is how we, developers, grow.

Maybe you deleted the wrong file, a merge went south, or you ended up in some obscure detached state.

When a senior dev is nearby, you lean on them. But when you’re on your own, what do you do?

---

## Git status

`git status` is one of the most useful, yet underappreciated, commands in Git.

It show the state of your working directory: which files are modified, whether you're mid-rebase, or the working directory is clean. When in doubt, run it. It’s your first line of defense.

---

## Git reflog

Meet `git reflog`. It had saved me out more times than I care to admit, and I bet it'll rescue you too.

`git reflog` is Git’s time machine: it records every move your HEAD makes: commits, checkouts, rebases, even the mistakes.  
When you lose work, or a branch goes missing, `git reflog` is how you time-travel back and recover it. It has been proven useful when deleting a local branch too soon.

Here's how to access the reflog:

```bash
$ git reflog
e1c29d4 HEAD@{0}: commit (initial): Initial commit
a123456 HEAD@{1}: commit: Added new feature
...
```

The hashes on the left are checkpoints.  
You can return to any of them with the following command:

```
git reset $hash
```

---

## Git Reset HEAD^

The `git reset HEAD^` moves the branch pointer to the parent of the current commit, discarding the most recent commit.

```bash
$ git log -n 2
commit 123456 (HEAD -> master)
Author: Your Name <your_email@example.com>
Date:   Fri Jan 15 11:45:00 2021 +0000

    Initial Commit

# Reset to the parent of the current commit
$ git reset HEAD^
```

This command is useful when you want to undo the previous commit.

---

## Oh Shit, Git!?!

For me, git `status`, `reflog` and `reset HEAD^` fix 99% of git-related headaches. They are my daily survival kit.  
But when things get messy, I rely on [Oh Shit Git](https://ohshitgit.com/).  
Got check it out. It gives great one liners for common git situations.

---

## Final Thoughts

Git hell is inevitable. These commands won’t solve every Git nightmare, nor will Oh Shit Git.  
Still, they cover the vast majority of real-world problems, and once you’re comfortable with them, you’ll never feel completely lost in Git again.
