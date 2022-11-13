---
layout: lab
num: lab07
ready: true
desc: "Pizza Time!"
assigned: 2022-11-13 23:59:59-7
due: 2022-11-20 23:59:59-7
---

In this lab, we will utilize many concepts covered in the course so far including:

* Inheritance and Polymorphism
* Implementing and applying the Heap data structure as a priority queue
* Defining and raising Exceptions
* Testing your functionality with pytest

**Note: It is important that you try and start this lab early so you can utilize our office hours to seek assistance / ask clarifying questions during the weekdays before the deadline if needed!**

# Introduction

The goal for this lab is to write a program that will manage incoming pizza orders. All pizza orders have an associated time representing when the customer expects to have their pizza ready (it's possible for a customer to call ahead and schedule a later pickup time). All pizza orders will be managed by a MinHeap where the next order to prepare is the one that is the earliest compared to the other orders.

In order to manage pizza orders for this lab, you will design various Pizza classes (`Pizza`, `CustomPizza`, and `SpecialtyPizza` that utilizes inheritance / polymorphism), a `PizzaOrder` class representing a collection of Pizzas a customer wants to place in a single order, and an `OrderQueue` class that organizes the Pizza orders in a MinHeap data structure.

You will also write pytests in `testFile.py` illustrating your behavior works correctly. This lab writeup will provide some test cases for clarity, but the Gradescope autograder will run different tests shown here.

# Instructions

You will need to create six files:
* `Pizza.py` - Defines a Pizza class representing commonality for all Pizzas. For simplicity, this class will assume all Pizzas have a `size` and `price`
* `CustomPizza.py` - Defines a child class of Pizza. This class should inherit all fields / methods from the Pizza class, but also introduces the concepts of toppings a customer can order (represented as a list of strings)
* `SpecialtyPizza.py` - Defines a child class of Pizza. This class should inherit all fields / methods from the Pizza class. Specialty pizzas are defined by a name attribute and all have a set price depending on the pizza size
* `PizzaOrder.py` - Defines a class that is a collection of pizza objects the customer wants to order. The total price for the order can be derived from each individual pizza price. This class will also have an expected time of when the customer would like their pizzas ready for pickup. More details on this later in the writeup
* `OrderQueue.py` - Defines a MinHeap to organize and process Pizza Orders according to their expected time of pickup. You can adapt the Heap implementation shown in the textbook supporting the specifications in this lab.
* `testFile.py` - This file will contain your pytest functions that tests the overall correctness of your class definitions

There will be no starter code for this assignment, but rather class descriptions and required methods are defined in the specification below.

You should organize your lab work in its own directory. This way all files for a lab are located in a single folder. Also, this will be easy to import various files into your code using the `import / from` technique shown in lecture. 

# Pizza.py

The `Pizza.py` file will contain the definition of a Pizza base class. We will define the Pizza attributes as follows:

* `price` - float that represents the price of a pizza. Since the price will be defined by what type of pizza is ordered, we can simply create the price field and initialize it to 0.0
* `size` - str that represents the size of the pizza being ordered. For simplicity, we can have three valid pizza sizes and and label these with `"S"` for small, `"M"` for medium, and `"L"` for large

You should write a constructor that allows the user to construct a Pizza object by passing in values for the size. Your constructor should also create a price attribute and set it to 0.0.

* `__init__(self, size)`

Your Pizza class definition should also support the "getter" and "setter" methods for the price and size. Since this will be a base class for other Pizza types, anything we write here can be inherited by its child classes.

* `getPrice(self)`
* `setPrice(self, price)`
* `getSize(self)`
* `setSize(self, size)`

# CustomPizza.py and SpecialtyPizza.py

`Pizza` objects can be two different types. Both of these types of pizzas inherit from the Pizza class:
1. `CustomPizza` that allows the customers to add additional toppings of their choosing
2. `SpecialtyPizza` that has already been pre-configured and has a fixed price based on its size

## CustomPizza.py
Your `CustomPizza` class definition will be defined in `CustomPizza.py`. The `CustomPizza` class will contain a constructor that takes in the size of the Pizza, and should use this size to call our base class' constructor. In addition to the size, it will initialize a toppings list represented as a Python List.

The price of a CustomPizza is defined by two things:
1. the size of the pizza
2. the number of toppings the pizza will have (assuming no toppings is a simple cheese pizza). CustomPizzas will have the following fixed prices based on its size:

* Small (S): $8.00
* Medium (M): $10.00
* Large (L): $12.00

The size of the pizza also dictates the amount each additional topping will cost based on the following definition:

* Small (S): + $0.50 per additional topping
* Medium (M): + $0.75 per additional topping
* Large (L): + $1.00 per additional topping

Since we now know what the price of a pizza should be based on the size, the `CustomPizza` constructor should determine the base price of the pizza and set it appropriately (remember, no need to write it in this class if we already have the method in `Pizza.py`).

* `__init__(self, size)`

There are two more methods this class should support:

* `addTopping(self, topping)` - this method will add to the toppings list and update its price appropriately. The topping parameter is represented as a `str` type
* `getPizzaDetails(self)` - this method will construct and return a string containing the details of the `CustomPizza` object including the size, toppings, and price of the `CustomPizza`. An example (with escape characters shown for formatting) is given below. When constructing your string, please follow the **EXACT** format since this is what Gradescope will expect

`CustomPizza` without toppings example:

```python
cp1 = CustomPizza("S")

assert cp1.getPizzaDetails() == \
"CUSTOM PIZZA\n\
Size: S\n\
Toppings:\n\
Price: $8.00\n"
```

`CustomPizza` with a list of toppings example (note that each topping will be indented with a tab):

```python
cp1 = CustomPizza("L")
cp1.addTopping("extra cheese")
cp1.addTopping("sausage")

assert cp1.getPizzaDetails() == \
"CUSTOM PIZZA\n\
Size: L\n\
Toppings:\n\
\t+ extra cheese\n\
\t+ sausage\n\
Price: $14.00\n"
```

## SpecialtyPizza.py
A `SpecialtyPizza` class definition will exist in `SpecialtyPizza.py`. Similar to a `CustomPizza` object, the class constructor will take in a size as well as the name for the specialty pizza. 

* `__init__(self, size, name)`

Also similar to the `CustomPizza` class, `SpecialtyPizza` will use the size to set its price appropriately. The price of a `SpecialtyPizza` is defined as follows:

* Small (S): $12.00
* Medium (M): $14.00
* Large (L): $16.00

Unlike custom pizzas, specialty pizzas do not have a list of toppings associated with it, but do have a unique name that will be displayed when getting details for this pizza. This class should also have its own `getPizzaDetails` method described below:

* `getPizzaDetails(self)` - this method will construct and return a string containing the details of the `SpecialtyPizza` object including the size and name of the `SpecialtyPizza`. An example (with escape characters shown for formatting) is given below. When constructing your string, please follow the **EXACT** format since this is what Gradescope will expect

A sample output test for `getPizzaDetails()`:

```python
sp1 = SpecialtyPizza("S", "Carne-more")
assert sp1.getPizzaDetails() == \
"SPECIALTY PIZZA\n\
Size: S\n\
Name: Carne-more\n\
Price: $12.00\n"
```

# PizzaOrder.py

The `PizzaOrder` class will be defined in `PizzaOrder.py`. This class will keep track of various pizzas for single order. The `PizzaOrder` class will have the following attributes:

* `pizzas` - a Python List containing all the pizzas that the single order contains. This can be initially set to an empty list
* `time` - an int representing the expected time the order will be picked up. This field is what will be used in determining the *priority of orders*. So it is possible for an early order to be deprioritized based on when the pizza is expected to be ready

The constructor for a `PizzaOrder` will take in the expected time that order should be ready:

* `__init__(self, time)`

The time format will be stored as an `int` in a 24-hour time format. For example, given a `hour:minute:second` format, the corresponding int values would be:

* 12:00:00 AM --> 0
* 12:08:00 AM --> 800
* 8:00:05 AM --> 80005
* 9:25:32 AM --> 92532
* 1:14:23 PM --> 131423
* 10:56:59 PM --> 225659

In addition to the constructor, getters / setters for the time attribute, the ability to add Pizza objects to the order, as well as a method to construct a string representing the order details will need to be implemented:

* `getTime(self)`
* `setTime(self, time)`
* `addPizza(self, pizza)` - will add the Pizza object to the end of the Python List
* `getOrderDescription(self)` - constructs and returns a string containing the time of the order, all information for each pizza in the order, as well as the total order price. Since we're storing various Pizza objects in this class, we can utilize polymorphism and simply call the `getPizzaDetails()` method on the Pizza objects when constructing the string for our entire order, as well as `getPrice()` to compute the `PizzaOrder` total price

An example of the `getOrderDescription()` string format is given below:

```python
cp1 = CustomPizza("S")
cp1.addTopping("extra cheese")
cp1.addTopping("sausage")
sp1 = SpecialtyPizza("S", "Carne-more")
order = PizzaOrder(123000) #12:30:00PM
order.addPizza(cp1)
order.addPizza(sp1)

assert order.getOrderDescription() == \
"******\n\
Order Time: 123000\n\
CUSTOM PIZZA\n\
Size: S\n\
Toppings:\n\
\t+ extra cheese\n\
\t+ sausage\n\
Price: $9.00\n\
\n\
----\n\
SPECIALTY PIZZA\n\
Size: S\n\
Name: Carne-more\n\
Price: $12.00\n\
\n\
----\n\
TOTAL ORDER PRICE: $21.00\n\
******\n"
```

# OrderQueue.py

The `OrderQueue` class will be defined in `OrderQueue.py`. This priority queue is implemented as a MinHeap data structure. The `OrderQueue` will manage `PizzaOrder` objects based on their `time` attribute.

* `__init__(self)` - the constructor for the `OrderQueue` will simply initialize the Python List representing the MinHeap.

Since it's possible to remove from an empty `OrderQueue`, we will create and raise an exception when this is done. You will define a `QueueEmptyException` class in `OrderQueue.py` that doesn't do anything except define an `Exception` object to raise when this happens (recall, we did do an example of defining basic Exception class types - you can refer to [lect06](https://ucsb-cs9.github.io/f22/lectures/lect06/) notes).

In addition to the construction of the MinHeap in this class, two methods are required to be implemented:

* `addOrder(self, pizzaOrder)` - a `pizzaOrder` object will be stored in the MinHeap *prioritized by its time attribute* (lower value means higher priority)
* `processNextOrder(self)` - this removes the root node from the MinHeap (and restructures the MinHeap), and returns a string containing the root value's pizza order description

The automated tests will create various pizza orders with different time attributes. It will then call processNextOrder one at a time and check the removed PizzaOrder is in the right priority by checking their expected `getOrderDescription()` string. You should write similar tests to confirm the MinHeap state is in the correct order.

# testFile.py

This file should test all of your classes using pytest. Think of various scenarios and edge cases when testing your code according to the given descriptions. You should test every class' method functionality (except for getters / setters). Even though Gradescope will not use this file when running automated tests (there are separate tests defined for this), it is important to provide this file with various test cases (testing is important!!).

Of course, feel free to reach out / post questions on Piazza as they come up!

# Submission

Once you're done with writing your class definitions and tests, submit the following files to Gradescope's Lab07 assignment:

* `Pizza.py` 
* `CustomPizza.py`
* `SpecialtyPizza.py`
* `PizzaOrder.py`
* `OrderQueue.py`
* `testFile.py`

There will be various unit tests Gradescope will run to ensure your code is working correctly based on the specifications given in this lab.

If the tests don't pass, you may get some error message that may or may not be obvious at this point. Don't worry - if the tests didn't pass, take a minute to think about what may have caused the error. If your tests didn't pass and you're still not sure why you're getting the error, feel free to ask your TAs or Learning Assistants.
