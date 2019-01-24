# Honeycomb Tracing Workshop Materials

This repository is intended to accompany Honeycomb's [Always Bee Tracing](https://www.eventbrite.com/e/always-bee-tracing-tickets-50756405776) workshop.

It requires Node 8+ and has intentionally included the `node_modules` directory in hopes of simplifying dependencies.

## Running the main application

Run our sample `wall` service with:

```bash
# Will run on port 8080
node ./wall.js
```

## Interacting with your application

You may either use the web UI to read and write messages:

![index](/images/index.png) | ![new message](/images/message.png)
:-------------------------:|:-------------------------:
View contents of wall | Write new message on wall

Or `curl` the contents of your wall directly:

```bash
# Fetch the contents of your wall
curl localhost:8080
```

```bash
# Write a new message to your wall
curl localhost:8080 -d "message=i'm #tracing with @honeycombio"
```

## Running the analysis service

Over the course of the workshop, you will run a second service, `analysis`, with:

```bash
# Will run on port 8088
node ./analysis.js
```

But you won't be interacting with it directly; the `wall` service will simply ping `localhost:8088` in hopes of the `analysis` service being alive.

## Security fine print 

Any API keys included in this repository are included for ease of use during the workshop and will be rendered null and void after the event on January 24th, 2019.
