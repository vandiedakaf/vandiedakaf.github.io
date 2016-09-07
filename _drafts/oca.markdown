---
layout: post
title:  "OCA Findings"
<!--date:   2016-06-16 00:00:00 +0200-->
categories: java oca
---
In this post I'm sharing some Java features that I've discovered (or re-discovered) whilst studying for the OCA exam that I thought was worth sharing. 

## Valid Literals
As of Java 7 underscores can be utilised in numeric literals (with some [placement constraints][underscores]).
{% highlight java %}
int readableValue = 987_654;
double readableValue = 98_765.432_1;
{% endhighlight %}
... and I've found a bug. It seems that even [Rouge][rouge] did not know about this underscore feature. An issue for this oversight has been created [here][github502].

## Labels
I've wanted to break out of a inner loop before and then have the break exit the outer loop as well. This is accomplished by setting a boolean's value before the break of the inner loop. This boolean then instructs the outer loop to break as well:
{% highlight java %}
for(String student: students) {
    boolean submitFailed = false;
    
    for(String subject: subjects) {    
        try {
            submitGrade(student, subject);
        } catch (Exception e) {
            submitFailed = true;
            break; //  pseudo circuit-breaker
        }
    }
    
    if (submitFailed) {
        break; //  pseudo circuit-breaker, continued
    }
}
{% endhighlight %}

However, labels provide a more elegant solution for this scenario:
{% highlight java %}
STUDENT_LOOP: for(String student: students) {
    SUBJECT_LOOP: for(String subject: subjects) {
        try {
            submitGrade(student, subject);
        } catch (Exception e) {
            break STUDENT_LOOP; //  pseudo circuit-breaker
        }
    }
}
{% endhighlight %}


## String Literals
Forcing Java to create a new String() object
{% highlight java %}
String title = new String("Subject To Change");
{% endhighlight %}
is less efficient than making use of the string pool
{% highlight java %}
String title = "Subject To Change";
{% endhighlight %} 

## Array Initialisation
Array initialisation is more forgiving than I thought -- the statement 
{% highlight java %}
int[] numbers = new int[] {12, 34, 56};
{% endhighlight %}
can be rewritten as a more concise
{% highlight java %}
int[] numbers = {12, 34, 56};
{% endhighlight %}

## Default interface methods
Introduced in Java 8 as a way to update interfaces without forcing implementation updates.

## Lambda Functions


**-f**

[underscores]: http://docs.oracle.com/javase/7/docs/technotes/guides/language/underscores-literals.html
[rouge]: http://rouge.jneen.net/
[github502]: https://github.com/jneen/rouge/issues/502
*[OCA]: Oracle Certified Associate
*[rouge]: Jekyll's default highlighter

