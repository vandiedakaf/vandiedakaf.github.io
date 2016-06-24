---
layout: post
title:  "Git-Flow Gym"
date:   2016-06-20 00:00:00 +0200
categories: git workflow Gym
---
My choice of version control system recently changed from Mercurial to Git. As part of this change I decided that there's no better time than the present to move to a proper branching strategy (and in doing so replacing my god-branch "strategy" -- which is not an _actual_ branching strategy; I was merely using a single branch for all my commits). I've since been meaning to start using [Git-Flow][git-flow] and decided that an effective way to cement this workflow into my day-to-day commits would be create a Git-Flow Gym.

# What is the Git-Flow Gym?

The goal of this post is simple -- follow the tasks in an attempt to recreate the commit history example from Vincent Driessen's blog.

![git-flow]({{ site.baseurl }}/assets/git-flow.jpg){: .image-center }

There is a task for each number in the image above. After completing these tasks you should be more comfortable and confident moving forward with Git-Flow in your future projects.

# In Preparation
Before you attempt the tasks you might want to familiarise yourself with the strategy behind Git-Flow by reading Vincent Driessen's Blog [post][git-flow]. Note that in this post the naming convention has changed from `branch-*` to `branch/*`.
 
Also familiarising yourself with the `git flow` commands in Daniel Kummer's Git-Flow [cheatsheet][git-flow-cheatsheet] (note that feature collaboration and release collaboration is not covered in this post).

# Repository Setup
Run the commands below to set up your local repository:

0. initialise git flow (use the default values)
`git flow init`

0. create base files
`touch task00`
`git add .`

0. perform first commit
`git commit -m "task00"`

0. rebase to the master branch
`git checkout master`
`git merge --no-ff develop`

0. tag the master branch (skip this step for other projects)
`git tag -a 0.1 -m "tagging 0.1"`

# The Tasks
Complete the following tasks in sequence. Changes to the code base are performed by executing the `touch` command, e.g. `touch task##`, where `##` is to be replaced with the task number (e.g. `touch task01`). Furthermore, commit messages follow the pattern `git commit -m "task##"`. A lot of branch switching occurs in theses tasks; the flow has not been optimized so as to get more comfortable with branch checkouts and merges via practice.

01. <details>
        <summary>Start a new task in the develop branch and commit.</summary>
            <code>git checkout develop</code><br/>
            <code>touch task01</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task01"</code><br/>
    </details>
    
02. <details>
        <summary>Create a new commit on the existing task.</summary>
            <code>touch task02</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task02"</code><br/>
    </details>
    
03. <details>
        <summary>Create another commit on the existing task.</summary>
            <code>touch task03</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task03"</code><br/>
    </details>
    
04. <details>
        <summary>Create a feature branch (call it 'a') and commit a change to it.</summary>
            <code>git flow feature start a</code><br/>
            <code>touch task04</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task04"</code><br/>
    </details>
    
05. <details>
        <summary>Create another feature branch (call it 'b') and commit a change to it.</summary>
            <code>git flow feature start b</code><br/>
            <code>touch task05</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task05"</code><br/>
    </details>
    
06. <details>
        <summary>Create a commit the development branch.</summary>
            <code>git checkout develop</code><br/>
            <code>touch task06</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task06"</code><br/>
    </details>
    
07. <details>
        <summary>Start hotfix 0.2 and commit a change.</summary>
            <code>git flow hotfix start 0.2</code><br/>
            <code>touch task07</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task07"</code><br/>
    </details>
    
08. <details>
        <summary>Finish hotfix 0.2 (this merges the branch with both master and develop).</summary>
            <code>git flow hotfix finish 0.2 -m "task08"</code><br/>
    </details>
    
09. <details>
        <summary>Commit a change to feature/a.</summary>
            <code>git checkout feature/a</code><br/>
            <code>touch task09</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task09"</code><br/>
    </details>
    
10. <details>
        <summary>Commit a change to feature/b.</summary>
            <code>git checkout feature/b</code><br/>
            <code>touch task10</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task10"</code><br/>
    </details>
    
11. <details>
        <summary>Commit a change to feature-b.</summary>
            <code>touch task11</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task11"</code><br/>
    </details>
    
12. <details>
        <summary>Finish feature b (this merges the branch with develop).</summary>
            <code>git flow feature finish b</code><br/>
    </details>
    
13. <details>
        <summary>Start a release branch (1.0) and commit a change.</summary>
            <code>git flow release start 1.0</code><br/>
            <code>touch task13</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task13"</code><br/>
    </details>
    
14. <details>
        <summary>Commit a change to release 1.0.</summary>
            <code>touch task14</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task14"</code><br/>
    </details>
    
15. <details>
        <summary>Merge release 1.0 into develop and commit.</summary>
            <code>git checkout develop</code><br/>
            <code>git merge --no-ff release/1.0</code><br/>
            <code>touch task15</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task15"</code><br/>
    </details>
    
16. <details>
        <summary>Commit a change to feature-a.</summary>
            <code>git checkout feature/a</code><br/>
            <code>touch task16</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task16"</code><br/>
    </details>
    
17. <details>
        <summary>Create a feature branch (call it 'c') and commit a change to it.</summary>
            <code>git flow feature start c</code><br/>
            <code>touch task17</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task17"</code><br/>
    </details>
    
18. <details>
        <summary>Commit a change to release 1.0.</summary>
            <code>git checkout release/1.0</code><br/>
            <code>touch task18</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task18"</code><br/>
    </details>
    
19. <details>
        <summary>Commit another change to release 1.0.</summary>
            <code>touch task19</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task19"</code><br/>
    </details>
    
20. <details>
        <summary>Finish release 1.0 (this merges the branch with both master and develop).</summary>
            <code>git flow release finish 1.0 -m "task20"</code><br/>
    </details>
    
21. <details>
        <summary>Create a change to feature-c.</summary>
            <code>git checkout feature/c</code><br/>
            <code>touch task21</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task21"</code><br/>
    </details>
    
22. <details>
        <summary>Commit a change to feature-c.</summary>
            <code>touch task22</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task22"</code><br/>
    </details>
    
23. <details>
        <summary>Create a change to feature-a.</summary>
            <code>git checkout feature/a</code><br/>
            <code>touch task23</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task23"</code><br/>
    </details>
    
24. <details>
        <summary>Finish feature c and then feature a.</summary>
            <code>git flow feature finish c</code><br/>
            <code>git flow feature finish a</code><br/> 
    </details>
       
25. <details>
        <summary>Start a release branch (1.1) and commit a change.</summary>
            <code>git flow release start 1.1</code><br/>
            <code>touch task25</code><br/>
            <code>git add .</code><br/>
            <code>git commit -m "task25"</code><br/>
    </details>
    
26. <details>
        <summary>Finish release 1.1.</summary>
            <code>git flow release finish 1.1 -m "task26"</code><br/>
    </details>
    

If we checkout the master branch and run the command `git log --graph --pretty=format:"%s"` we should see the following output:
{% highlight text %}
*   Merge branch 'release/1.1'
|\
| * task25
| *   Merge branch 'feature/a' into develop
| |\
| | * task23
| | * task16
| | * task09
| | * task04
| * |   Merge branch 'feature/c' into develop
| |\ \
| | * | task22
| | * | task21
| | * | task17
| * | |   Merge tag '1.0' into develop
| |\ \ \
| |/ / /
|/| / /
| |/ /
* | |   Merge branch 'release/1.0'
|\ \ \
| * | | task19
| * | | task18
| | * | task15
| | * |   Merge branch 'release/1.0' into develop
| | |\ \
| | |/ /
| |/| |
| * | | task14
| * | | task13
| |/ /
| * |   Merge branch 'feature/b' into develop
| |\ \
| | * | task11
| | * | task10
| | * | task05
| | |/
| * |   Merge tag '0.2' into develop
| |\ \
| |/ /
|/| |
* | |   Merge branch 'hotfix/0.2'
|\ \ \
| * | | task07
|/ / /
* | |   Merge branch 'develop'
|\ \ \
| | * | task06
| | |/
| | * task03
| | * task02
| | * task01
| |/
| * task00
|/
* Initial commit
{% endhighlight %}

With the aid of the `git flow *` commands this exercise turned out to be easier than I thought it would be. I hope you found as much value out of this post as I did in creating it.

**-f**

[^god-branch]: This is not an _actual_ branching strategy. I was merely using a single branch for all my commits.

[git-flow]: http://nvie.com/posts/a-successful-git-branching-model/
[git-flow-cheatsheet]: http://danielkummer.github.io/git-flow-cheatsheet/
