---
layout: conway
title:  "Conway's Game of Life Brought to Life"
date:   2016-08-07 00:00:00 +0200
categories: conway javascript d3
---
I wanted to spruce up this blog a bit and thought that having a generated background would be a nice addition. My first thought was to have a graphical representation of several steps of Conway's Game of Life (Conway's Game of Life is a popular cellular automaton; see the [wikipedia article][conway_wiki] for more information).

*Note: clicking anywhere on the page kills all the cells (sometimes the animation is just too distracting).*

I decided to use [d3.js][d3js] to illustrate the steps, since I'd like to become more familiar with the library (I don't believe I'm using the library correctly but I have learned a thing or two about it in this process).

# Creating a Static Background
I started out by running 20 steps of the game; during each step drawing the live cells as green circles that reduce in size and change colour to yellow with each step (thus a history of the live cells can be seen). In an attempt to make the cells look more organic their centers were offset by random amounts.

![phase1]({{ site.baseurl }}/assets/conway/phase1.png){: .image-center }

Whilst playing around with the d3 animations I realised that it might be better to animate the background (a bounce transition was added to make the animation look less mechanical). This also meant we had to eventually remove the cells that have died (because, soon the page would be filled with thousands of svg circles).
 
Since the game can become stale I added the ability to *activate* cells by moving the mouse cursor over it. Furthermore I changed the new generation rules to the *highlife* variation (cells will now also be born if it has 6 neighbours) which makes it less likely that the game will become stale.

Once again, the animations started to look mechanical so once again an animation change was made. A new cell would have it's starting position set as one of the neighbouring cells that spawned it and then move to it's own location; this makes it look like the cell is an offspring of another cell migrating to its new location.

In the end I've decided not to add this to the blog because I find it both CPU intensive and (most importantly) distracting. The amount of distraction can be reduced by slowing down the animations or creating a 'game free zone' behind the main content of each post. These possible solutions bring me to my next section.

# Scope Creep
You've probably been a victim of scope creep. I always associate scope creep with my day job, that is until I read a post on procrastination where the author warned against scope creep in your personal projects. Lo and behold here I was adding feature upon feature on this little "background project". I decided to put a stop to the creep and finish whatever I was working on (which was spawning the new cells at the *parent* cell's location). If the current state did not work for the blog (which it doesn't) then I'd just pull the plug on it.

If I've taken anything from this exercise it is that your personal projects are also susceptible to scope creep (probably even more so than with professional projects) and reducing the scope creep may lead to more productive personal projects.

**-f**

[conway_wiki]: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
[d3js]: https://d3js.org/
