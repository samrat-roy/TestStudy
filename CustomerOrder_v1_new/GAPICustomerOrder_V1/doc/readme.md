# GAPI Customer Order Backend API Design Spec

**GAPI Team**

## INTRODUCTION

In this document we propose a design for the “Customer Order Backend API ” for
GAPI "Customer Order Frontend API".
The document is arranged as following. First we briefly list scenarios
and use cases that motivate Customer Order Backend API work. Then, we summarize the
functionality requirements and define the “in
scope” that will be covered by this design.

## REQUIREMENTS

There are many reasons why GAPI may want to build a new Customer Order Backend API:
+ **Decoupling Basket SQL DB From Customer Order Business Logic:** Separating Basket SQL DB backend logic from customer order helps in moving towards nosql databases like couchbase or cassandra.
+ **Reducing Data Migration Complexity For Frontend Customer Order API:** The new front end order API will be able to seamlessly , migrate on demand from Basket SQL
+ **Decoupling From Martini and Appfabric:** With the advent of open-source and the increase in load every christmas the need to move out of Martini is imminent with no dependency on appfabric caching.
+ **Flexibility:** To support multiple systems at different layers of the architecture with minimum impact on core logic. 


Here are the functionality requirements derived from above use cases:
+ This approach separates backend and business logic, paving way for new order API to come out of Basket SQL DB and appfabric caching.
+ This new approach to provide on demand migration will reduce the load on current support model .
+ The endpoints designed for this new order API are similar to existing endpoints, making migration easy to new API.

## SCOPE

+ Implement a basic DB fetch operations
	This will include the following :-
   + Create relevant endpoints as approved by business
   + Complete support for all the relevant basket operations needed for the new API.
   + Have a decoupled system that can support plug and play like features.
+ Completely migrate from DB20 and Appfabric dependency for basket operations.

## ROADMAP

Please find the roadmap from the below link.

Link To [Roadmap](https://github.dev.global.tesco.org/UKGrocery/GAPICustomerOrder_V2/tree/master/doc/Roadmap)

Some design principles we are following in this architecture:

1. Keep the underlying API endpoints independent. 
2. Keep the business layer of API interface compatible with repository and cache.

## API End Points
Link To [APIEndpoints](https://github.dev.global.tesco.org/UKGrocery/GAPICustomerOrder_V1/tree/IX20/doc/Endpoints-Spec)

