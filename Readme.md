[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## Getting Started
First of all install [Rabbit](https://www.rabbitmq.com/download.html).
If you are using docker you can just do
```sh
  docker run -d --name gaia-rabbit -p 15672:15672 -p 4369:4369 -p 5671:5671 -p 5672:5672 -p 15671:15671 -p 25672:25672  rabbitmq:3-management
```
This image comes with the management plugin installed. You can see what happens inside rabbitmq entering `http://localhost:15672/`. Auth by default `guest:guest`

After that clone the repo:
```sh
git clone git@github.com:emilioriosvz/rabbit-nodejs-example.git
cd rabbit-nodejs-example
```

## Install dependencies
This repo is composed of 3 different node processes, therefore you have to install the dependencies in all
```sh
cd consumer && npm i && cd ../ddos && npm i && cd ../sender && npm i && cd ..
```

## Explanation
In order to execute this example you have to run the services in this order:

### Sender
It is a very simple server with only one endpoint that emit to a queue when it is called

Run it with ```node index.js```

### Receiver
It is a very simple process that is simply waiting for something to arrive in the queue that is listening

Run it with ```node index.js```

If you want to try, you can launch this process simultaneously as many times as you want to see how rabbit distributes the work among the different consumers.

### Ddos
This script calls an endpoint in loop.

Run it with ``` node index.js 1000``` where 1000 is the frequency with which you will call that endpoint

