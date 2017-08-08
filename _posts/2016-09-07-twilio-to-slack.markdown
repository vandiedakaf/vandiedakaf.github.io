---
layout: post
title:  "A Foray Into Serverless Development"
date:   2016-09-07 00:00:00 +0200
categories: java aws twilio slack serverless
---

This retrospective covers some details regarding my project that forwards SMSes sent to a specific Twilio number to a Slack channel. *The repository for this post can be found on [Github][github].*

The goal of this project (or the [why][why]) was dual-fold. Firstly, I wanted to be able to share a single mobile number with my colleagues (to be used as a team contact number) and secondly I wanted to learn how to use Gradle and Travis. I expect the usage of this system to be few and far between so I wanted to make something that can run as cheaply as possible which is why I decided to make use of some serverless products. This project makes use of Twilio, AWS API Gateway, AWS Lambda (hereafter referred to as Lambda) and Slack as illustrated in the image below:
[![twilio2slack]({{ site.baseurl }}/assets/twilio2slack.png){: .image-center }][cloudcraft]
Twilio forwards any SMSes it receives to an API Gateway endpoint which in turn sends it to a Lambda function. Finally the Lambda function formats the message and sends it to a Slack channel.

## Lambda Function
I believe that node.js and Python make for easier and better Lambda development but using any of them would exceed the number of unknowns that I'm comfortable in one project so I chose Java as the Lambda Function runtime. Making use of Lambda did introduce some new challenges in terms of configuration and memory.

### Configuration
There's no known way to save environment variables when working with Lambda so I opted to save configuration in a property file in S3. I struggled quite a bit with accessing the configuration from S3, not knowing what was wrong with my policy settings. My call kept on timing out and the log outputs were not being helpful as to why I was getting timeouts. I compared my settings with that of one of the Lambda S3 blueprints and the only difference was the amount of memory allocated. I thought this was irrelevant because the stats would say that the function only uses approximately 60MB of the default 128MB.

### Memory
It turns out that using the default 128MB memory allocation setting is a bad idea because "[the] [CPU available for the container is quantified using the memory configuration][forum]", that is, the more memory you select the faster your Lambda should execute. The Java runtime takes a while to cold boot on the first Lambda invocation and then subsequent calls will reuse that container (for as long as the container remains _active_). My guess is that as a result of my calls timing out that the containers were destroyed (since the cold boot was not completed). Subsequently, this lead to all calls timing out. This issue was resolved by increasing the memory well beyond that which was actualy required.

## Slack Web Hook
Making a call to the Slack web hook was delightfully easy; so much so that it warrants it's own little section just to mention it.

## Twilio and the API Gateway
The Twilio and API Gateway integration was more tricky than I thought it would be. The body parameters from Twilio `POST` request has to be transformed to a Json body (API Gateway does allow transformations via the Velocity Template Language).  An [article][edwin] by Edwin Velazquez covers what you need to know to get this done with a `GET` request and a forum [post][mapping] describes how to get this done with a `POST`. Without these articles I probably would not have figured out what changes to apply to the API Gateway.

## Automation
I made a point of getting some sort of automation working very early on because I know just how much time can be wasted when you are manually creating an AWS Cloudformation Stack. To this point I made two Gradle tasks, namely createStack and deleteStack.

## Return of the Creep
In my previous post I mentioned scope creep in my personal projects and this project was no exception. While I was adding the build status badge to the README.md file I thought of adding a code coverage badge. So before I knew it I had connected my repo to [coveralls.io][coveralls.io] and I was busy investigating how I can use [jmockit][jmockit] to mock the S3 and Slack integrations. It took a while before I realised that I was under that all-too-familiar spell again. One day I'll recognize the scope creep before I spend time on it.

## Possible Improvements
Here are some improvements (and production-readiness requirements) that can be made to the project.

* ~~Set the S3 configuration file location in a properties file.~~
* ~~Add an updateStack task to Gradle.~~
* ~~Authenticate the origin of the Twilio message.~~
* ~~Alter API Gateway response so that Twilio does not give a schema validation warning (i.e. Lambda should return valid XML).~~

Following on this list of improvements let me share this inspirational video with you (I thought it was apt to my current mindset of running projects):
<iframe src="https://www.youtube.com/embed/lRtV-ugIT0k" frameborder="0" allowfullscreen></iframe>{: .iframe-youtube }

**-f**

[cloudcraft]: https://cloudcraft.co
[coveralls.io]: https://coveralls.io
[edwin]: http://edwinvelazquez.com/blog/2015/12/15/build_an_aws_endpoint.html
[forum]: https://forums.aws.amazon.com/thread.jspa?messageID=691551
[jmockit]: http://jmockit.org/
[github]: https://github.com/vandiedakaf/twilio2slack
[mapping]: https://forums.aws.amazon.com/thread.jspa?messageID=673012&tstart=0#673012
[why]: https://www.ted.com/talks/simon_sinek_how_great_leaders_inspire_action
