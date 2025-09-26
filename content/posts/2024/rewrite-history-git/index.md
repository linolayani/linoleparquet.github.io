---
title: Escaping the Git Abyss
date:
lastmod: 2024-04-20T13:19:15-06:00
draft: false
tags: ["git", "devops"]
summary: "Stuck in Git hell? We’ve all been there."

cover:
  image: "/posts/2024/rewrite-history-git/this-is-fine.png"
  alt: "Welcome to git hell. Make yourself a home."
---

## We've all been there

<!-- > _His palms are sweaty, staring at this git history,_ > _PR is not ready, code is spaghetti_
>
> - Eminem, maybe -->

Git is a wonderful, life-saving tool. It's the defacto, modern versioning solution used across the industry. Although it's well-known and well-adopted, there's still a learning curve. And most of us had to learn it the hard way.
Maybe you deleted a file you weren't supposed to delete. Maybe you got distracted during a merge state. And you end up in an obscure, unknown detached state.

Now, you're there. **What do you do ?**

## But where are you exactly ?

Before diving into complex git commands, first step is about assessing your current state. There's multiples ways to do so. Some people know they way around advanced UI tools and integrations. For my part, I prefer to stick to the basic, and rely on the git CLI.

`git status` is our best friend. It displays the state of the working directory. It let you see which changes have been staged, which haven't, and which files aren't being tracked by the Git. It also inform you if you're mid-rebase.

```bash
lino@Lino-Layanis-Mac linoleparquet.github.io % git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   content/posts/2024/rewrite-history-git/index.md
        deleted:    content/posts/2025/issue-datadog-argocd/index.md

Untracked files:
  (use "git add <file>..." to include in what will be committed)
        content/posts/2025/helm-randAlphaNum-argocd/
        content/posts/2025/kubernetes-anti-patterns/

no changes added to commit (use "git add" and/or "git commit -a")
```

## Git reflog

Meet `git reflog`. It's the best place to go when all hope is lost. It had saved me out more times than I care to admit.

reflog stands for reference logs. It records updates to branch tips (ie `HEAD`, or `master`), along with a timestamp. It's the backbone of others git commands that you might already know, such as `git checkout` or `git reset`.

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

## Git Reset HEAD^

The `git reset HEAD^` moves the branch pointer to the parent of the current commit, **discarding the most recent commit**.

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

## Oh Shit, Git!?!

For me, git `status`, `reflog` and `reset HEAD^` fix 99% of git-related headaches. They are my daily survival kit.

But when things get messy, I rely on **[Oh Shit Git](https://ohshitgit.com/)**.  
Got check it out. It gives great one liners for common git situations.

## Final Thoughts

Git ease our developers lives in numerous ways. It's a well designed, essential tool for modern development. This blog post is only the starting point. I encourage you to go a step further in your git mastery journey. Searching, tinkering and often pays off.
