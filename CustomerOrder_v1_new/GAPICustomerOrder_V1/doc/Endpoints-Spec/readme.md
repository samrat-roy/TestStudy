## **``CustomerOrder_V1 Endpoints``**


1. [CancelOrder](#cancelorder)
2. [ConfirmOrder](#confirmorder)
3. [GetOrder](#getorder)
4. [GetOrders](#getorders)
5. [GetOrderDiff](#getorderdiff)

## CancelOrder

> #### End-point : ``/order/v1/cancelorder``
> #### Method    : ``POST``
> #### Signature : ``Order cancelOrder(string orderId, Order order, bool isOrderMigrated, string customerId, string business, string channel, string language, string country)``


CancelOrder endpoint will be used by GAPI clients to cancle an existing Order by passing ``OrderId `` / ``Order`` and ``CustomerId`` as an input parameters. Upon successful transaction a status object will be returned to the client, which contains all the canellation status of coupons, slots and ``OrderStatus``.



#### Input Parameters

<table style="border:0px solid #000000;border-collapse:collapse;">
<tbody>
<tr>
<td style="padding:5px;"><b>Name</b><br>
</td>
<td style="padding:5px;"><b>Description</b><br>
</td>
<td style="padding:5px;"><b>Mandatory</b><br>
</td>
<td style="padding:5px;"><b>Schema</b><br>
</td>
<td style="padding:5px;"><b>Default</b><br>
</td>
</tr>
<tr>
<td style="padding:5px;">Order<br>
</td>
<td style="padding:5px;">Order <br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">Order Entity<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<td style="padding:5px;">OrderId<br>
</td>
<td style="padding:5px;">Id of the order to be cancelled <br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<td style="padding:5px;">IsOrderMigrated<br>
</td>
<td style="padding:5px;">Flag to identify if order is migrated to new database<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">Bool<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<tr>
<td style="padding:5px;">CustomerId<br>
</td>
<td style="padding:5px;">Id of the Customer<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<td style="padding:5px;">Business<br>
</td>
<td style="padding:5px;">Business consuming API endpoint<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>Grocery</p></td>
</tr>
<tr>
<td style="padding:5px;">Channel<br>
</td>
<td style="padding:5px;">Channel consuming API endpoint<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<td style="padding:5px;">Language<br>
</td>
<td style="padding:5px;">Localized language<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>en-gb</p></td>
</tr>
<tr>
<td style="padding:5px;">Country<br>
</td>
<td style="padding:5px;">From where API endpoint has been hit<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
</tbody>
</table>

#### Response :

A status object will be returned to the client, which contains all the canellation status of coupons, slots and ``OrderStatus``. with ``HTTP-200`` statusCode.


## ConfirmOrder


> #### End-point : ``/order/v1/confirmOrder``
> #### Method    : ``PUT``
> #### Signature : ``Status confirmOrder(Order)``


``confirmorder`` endpoint will be used by GAPI clients to update the confirm the Order for current basket. `confirmorder` method will take ``Order`` and ``customerId`` as an input parameter, Upon successful transaction it will return ``Status`` object holding ``orderStatus``.



#### Input Parameters :

<table style="border:0px solid #000000;border-collapse:collapse;">
<tbody>
<tr>
<td style="padding:5px;"><b>Name</b><br>
</td>
<td style="padding:5px;"><b>Description</b><br>
</td>
<td style="padding:5px;"><b>Mandatory</b><br>
</td>
<td style="padding:5px;"><b>Schema</b><br>
</td>
<td style="padding:5px;"><b>Default</b><br>
</td>
</tr>
<tr>
<td style="padding:5px;">Order<br>
</td>
<td style="padding:5px;">Object holding order entity<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">Order Entity<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<td style="padding:5px;">CustomerId<br>
</td>
<td style="padding:5px;">Id of the customer confirming an Order<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<tr>
</tbody>
</table>

#### Response :

**``Order``** object will be returned to the client with ``HTTP-200`` statusCode.



## GetOrder

> #### End-point:  ``/order/v1/getorder``
> #### Method :  ``GET``
> #### Signature:  ``Order getOrder(string orderId(optional), string customerId, string business, string channel, string language, string country)``


Proposed **``getOrder``** endpoint will have the following functionalities  
1. It can fetch all the available baskets for the customer.  
2. It can give specific order details.  

``getOrder`` endpoint  will consume below listed parameters as an input, and upon successful transaction it will return an ``Order entity`` for the requested baskets or OrderId.



#### Input Parameters :

<table style="border:1px solid #000000;border-collapse:collapse;">
<tbody>
<tr>
<td style="padding:5px;"><b>Name</b><br>
</td>
<td style="padding:5px;"><b>Description</b><br>
</td>
<td style="padding:5px;"><b>Mandatory</b><br>
</td>
<td style="padding:5px;"><b>Schema</b><br>
</td>
<td style="padding:5px;"><b>Default</b><br>
</td>
</tr>
<tr>
<td style="padding:5px;">orderId<br>
</td>
<td style="padding:5px;">Id Of The Order - As Query Param<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">Order Entity<br>
</td>
<td style="padding:5px;"><p></p></td>
</tr>
<tr>
<td style="padding:5px;">customerId<br>
</td>
<td style="padding:5px;">The Customer Id<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">string <br>
</td>
<td style="padding:5px;"><p></p></td>
</tr>
<tr>
<td style="padding:5px;">business<br>
</td>
<td style="padding:5px;">The Business that is making use of the API Endpoint<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">string <br>
</td>
<td style="padding:5px;"><p>grocery</p></td>
</tr>
<tr>
<td style="padding:5px;">channel<br>
</td>
<td style="padding:5px;">The Channel that is making use of the API Endpoint<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">string <br>
</td>
<td style="padding:5px;"><p></p></td>
</tr>
<tr>
<td style="padding:5px;">language<br>
</td>
<td style="padding:5px;">The Language Client Is Using<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">string <br>
</td>
<td style="padding:5px;"><p>EN-GB</p></td>
</tr>
<tr>
<td style="padding:5px;">country<br>
</td>
<td style="padding:5px;">The Country<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">string <br>
</td>
<td style="padding:5px;"><p>GB</p></td>
</tr>
</tbody>
</table>

#### Response :

**``Order Entity``** object array will be returned to the client with ``HTTP-200`` statusCode.

## GetOrders

> #### End-point : ``/order/v1/getorders``
> #### Method    : ``GET``
> #### Signature : ``Order[] getOrders(string customerId ,string status, string business, string channel, string language, string country)``


Proposed **``getOrders``** endpoint will return all orders of the user.


``getOrders`` endpoint  will be used by GAPI clients to get array of ``Orders``. ``getOrders()`` method will consume below listed parameters as an input, and upon successful transaction it will return an ``Order Array`` for the requested customerId.

``getOrders()`` can be invoked with ``customerId`` and / or ``Order Status``.



#### Input Parameters : 

<table style="border:1px solid #000000;border-collapse:collapse;">
<tbody>
<tr>
<td style="padding:5px;"><b>Name</b><br>
</td>
<td style="padding:5px;"><b>Description</b><br>
</td>
<td style="padding:5px;"><b>Mandatory</b><br>
</td>
<td style="padding:5px;"><b>Schema</b><br>
</td>
<td style="padding:5px;"><b>Default</b><br>
</td>
</tr>
<tr>
<td style="padding:5px;">CustomerId<br>
</td>
<td style="padding:5px;">The Customer Id<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;">None</td>
</tr>
<tr>
<td style="padding:5px;">Status<br>
</td>
<td style="padding:5px;">Order Status<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">string <br>
</td>
<td style="padding:5px;"><p></p></td>
</tr>
<tr>
<td style="padding:5px;">Business<br>
</td>
<td style="padding:5px;">Business consuming API endpoint<br>
</td>
<td style="padding:5px;">yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>Grocery</p></td>
</tr>
<tr>
<td style="padding:5px;">Channel<br>
</td>
<td style="padding:5px;">Channel consuming API endpoint<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
<tr>
<td style="padding:5px;">Language<br>
</td>
<td style="padding:5px;">Localized language<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>en-gb</p></td>
</tr>
<tr>
<td style="padding:5px;">Country<br>
</td>
<td style="padding:5px;">From where API endpoint has been hit<br>
</td>
<td style="padding:5px;">no<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p>None</p></td>
</tr>
</tbody>
</table>

#### Response :

**``Order Array``** will be returned to the client with ``HTTP-200`` statusCode.


## GetOrderDiff

> #### End-point : ``/order/v1/getorderdiff``
> #### Method    : ``GET``
> #### Signature : ``Order getOrderDiff(string customerId, string orderId)``

``getOrderDiff`` endpoint  will be used by GAPI clients to determine the difference between Order versions. ``getOrderDiff()`` method will consume below listed parameters as an input, and upon successful transaction it will return  ``Order`` object.




#### Input Parameters : 

<table style=" solid #000000;border-collapse:collapse;">
<tbody>
<tr>
<td style="padding:5px;"><b>Name</b><br>
</td>
<td style="padding:5px;"><b>Description</b><br>
</td>
<td style="padding:5px;"><b>Mandatory</b><br>
</td>
<td style="padding:5px;"><b>Schema</b><br>
</td>
<td style="padding:5px;"><b>Default</b><br>
</td>
</tr>
<tr>
<td style="padding:5px;">CustomerId<br>
</td>
<td style="padding:5px;">CustomerId<br>
</td>
<td style="padding:5px;">Yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;">None</td>
</tr>
<tr>
<td style="padding:5px;">OrderId<br>
</td>
<td style="padding:5px;">id of the Order<br>
</td>
<td style="padding:5px;">Yes<br>
</td>
<td style="padding:5px;">String<br>
</td>
<td style="padding:5px;"><p></p></td>
</tr>
</tbody>
</table>

#### Response :

**``Order``** will be returned to the client with ``HTTP-200`` statusCode.




