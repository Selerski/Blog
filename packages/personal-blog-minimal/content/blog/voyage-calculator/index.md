---
title: Exploring Vortexa’s new Voyage Calculator
date: "2020-10-20"
description: A story of the Voyage Calculator, Vortexa's latest release. How cross-team collaboration combined with clever infrastructural setup can yield incredible results.
tags:
  ["react", "typescript", "kubernetes", "vortexa", "voyage", "analytics", "web"]
cover: "./vortexa_img.jpeg"
---

Many thanks to [@laurence.ashdown](https://medium.com/@laurence.ashdown), the developer behind the Voyage Calculator, and the co-author of this piece!

<!-- !["Big ole ship"](/vortexa_img.jpeg "Big ole ship") -->

Every new feature released onto Vortexa’s Analytics platform is a result of a concerted cross-team effort.

Each stage of the data enrichment process, preceding the stage when the data is displayed in the browser, requires the involvement of a separate specialized team.
Our latest release — **the Voyage Calculator** — is an example of how cross-team collaboration can lead to great results.

### What is the Voyage Calculator?

Vortexa’s Voyage Calculator computes estimated distances, times, and speeds for routes between ports, or between a selected vessel and a port.

![Voyage Calculator UI](/figure_1.png "Voyage Calculator UI") <center><span style="color: #a6a6a6; font-size: 14px; margin-bottom: 0px">Figure 1</span></center>

Under the hood, the Voyage Calculator uses our standalone internal service run on Kubernetes which utilises a proprietary maritime route A\* search algorithm, developed by the Signal Processing and Enrichment Team.

Our Application Development Team was tasked with building the frontend and the backend infrastructure to use the service to calculate various voyage parameters.

### What happens when I press ‘Calculate Voyage’?

First, the Voyage Calculator form in the frontend collects all the necessary information to send a successful POST request to a selected endpoint in the Vortexa API. As shown in Figure 2, there are a number of possible combinations, and we leave it to the customer to decide how they want to structure this query.

![Voyage Calculator form](/figure_2.png "Voyage Calculator form") <center><span style="color: #a6a6a6; font-size: 14px; margin-bottom: 0px">Figure 2</span></center>

Once all non-optional parameters have been selected, the user can submit the form to begin the process of voyage calculation. Behind the scenes, the frontend makes a call to the Vortexa API, i.e. the backend, via our internal JavaScript SDK.

Before any calculation is performed, the API will validate request parameters, sending an error message instead of a full response if any are missing.

Next, multiple requests can be made to the pathfinding service with latitude and longitude coordinates, to return an optimal path between two points. For voyages with many waypoints, there are multiple asynchronous requests made to the service, each taking only 23ms to complete. The data from these parallel requests is then stitched together in the API. The final shape of the trail is also dependent on the class of the vessel and whether it carries any cargo.

At this point we have the trail, but our job is not done yet! Voyage data, such as the speed, the ETA (estimated time of arrival), ETD (estimated time of departure), or the duration, are still missing. All of this is calculated by a utility function located in the backend. A complete response is then sent to the browser.

Back in the frontend, the state of the application is updated with the result of our successful query. The frontend components of the Voyage Calculator use effect hooks and state selectors to access this new data as soon as it’s returned from the API. As shown in Figure 4, the data is displayed in two ways:

- On the map component as an additional overlay with the vessel trail shown as a dashed line;
- Underneath the input form, as numeric data.

![Voyage Calculator output](/figure_3.png "Voyage Calculator output") <center><span style="color: #a6a6a6; font-size: 14px; margin-bottom: 0px">Figure 3</span></center>

The best thing about it? — It takes approximately 400ms to get all this information from the moment you click on the ‘Calculate Voyage’ button!

### Feature delivery “The Vortexa Way”

The release of the Voyage Calculator is one we are particularly proud of. And it’s not just because this feature was eagerly anticipated by our growing client base and worked reliably from day 1.

The most striking aspect of this release was how straightforward implementing a functionality like the Voyage Calculator is in Vortexa’s architecture.

A lot of Vortexa’s internal services run on Kubernetes, which allows us to easily spin up new instances of our microservices and scale them according to the current usage. Responsibility for managing this part of Vortexa’s estate belongs to the Data Services Team.

Their expertise in optimising individual microservices for maximum performance and efficiency gave the Signal Processing and Enrichment team the confidence that their pathfinding service will be served to our Application Development Team with minimal latency, ensuring deterministic user-response time.

This three-way cooperation is part of our daily routine here at Vortexa. Playing to each other’s strengths allows us to continuously develop market-leading features, such as the Voyage Calculator. The aim of this project was to provide a great user experience — so far the feedback has been nothing but positive!

### Summary

How the voyage calculation is obtained:

- The form in the browser collects query parameters from a user, and on submission the voyage calculation resource is requested from the API;
- The API validates parameters and initiates the calculation of the trail;
- Calculation of the trail is outsourced to the pathfinding service, which will compute the most appropriate trail for a given vessel class and status;
- Back in the API, the time, the speed, and arrival/departure time estimates of the voyage are calculated. Together with the trail information, this data is packaged into a response object and sent back to the frontend;
- Event listeners in the browser pick up information about the successful response and the data is then displayed to the user.

![Flowchart](/figure_4.png "Flowchart") <center><span style="color: #a6a6a6; font-size: 14px; margin-bottom: 0px">Figure 4</span></center>
