---
layout: lab
num: lab02
ready: true
desc: "Coffee Shop"
assigned: 2022-10-09 23:59:59-7
due: 2022-10-16 23:59:59-7
---

In this lab, we'll utilize inheritance functionality and define various Beverage objects and its properties. You'll have the opportunity to practice:

* Defining a base class and creating an inheritance hierarchy
* Defining derived classes and inheriting data and reusing functionality from a base class
* Overriding inherited methods from the parent class in the derived classes
* Installing pytest and unit testing your code

**Note: In general, it is always important to work on labs and reading early so you can gain the proper context and utilize our office hours to seek assistance / ask clarifying questions during the week before the deadline if needed!**

It may be a good idea to read up on some concepts we'll be using in this lab before you get started, specifically Chapter 1.4.6.2 (Inheritance).

In this lab, we will create a `Beverage` base class as well as defining specific classes for a couple types of Beverages (`Coffee` and `FruitJuice`). The `DrinkOrder` class will organize Beverages and will provide a summary of a specific drink order.

In addition to defining classes for various Beverages and a Drink Order, you will test your code for correctness by unit testing various scenarios using `pytest`.

# Instructions

You will need to create five files:
* `Beverage.py` - file containing a class definition with attributes all Beverages have.
* `Coffee.py` - file containing a class definition of a coffee beverage that inherits from the `Beverage` class.
* `FruitJuice.py` - file containing a class definition of a fruit juice beverage that inherits from the `Beverage` class.
* `DrinkOrder.py` - file containing a class definition of a customer's drink order containing organizing various beverages.
* `testFile.py` - file containing `pytest` functions testing the `Beverage`, `Coffee`, `FruitJuice`, and `DrinkOrder` classes.

There will be no starter code for this assignment, but rather the class descriptions and required methods are defined in the specification below.

It's recommended that you organize your lab work in its own directory. This way all files for a lab are located in a single folder. Also, this will be easy to import various files into your code using the `import / from` technique shown in lecture.

## `Beverage` class

The `Beverage.py` file will contain the class definition of what a general beverage is.

We will define this class' attributes as follows:

* `ounces` - `int` that represents the number of ounces of the beverage.
* `price` - `float` that represents the price of the beverage.

You should write a constructor that passes in values for all the fields. You may assume calls to the constructor will always contain a positive `int` representing the beverage's ounces and a positive `float` representing the beverage's price.

* `__init__(self, ounces, price)`

In addition to your constructor, your class definition should also support "setter" and "getter" methods that can update and retrieve the state of the Beverage objects:

`updateOunces(self, newOunces)` - updates the ounces of the beverage
`updatePrice(self, newPrice)` - updates the price of the beverage
`getOunces(self)` - returns the ounces of the beverage
`getPrice(self)` - returns the price of the beverage

Each Beverage object should be able to call a method `getInfo(self)` that you will implement, which returns a `str` with the current beverage's ounces and price. Since there are many beverages, the following output represents what will be returned if we call the `getInfo` method after constructing a `Beverage` object:

```python
b1 = Beverage(16, 20.5)
print(b1.getInfo())
```

<b>Output:</b>

```
16 oz, $20.50
```

<b>Note:</b> The `b1.getInfo()` return value in the example above does not contain a newline character (`\n`) at the end.

<b>Tip:</b> Note that the return string will contain a price with two decimal places (as traditionally used when displaying prices). Consider using the string's `format` method have floating point values contain 2 decimal places. For example:

```
>>> price = 1.5
>>> "{:.2f}".format(price)
'1.50'
```

You can refer to CS 8 lecture notes on string formatting if you would like a review [https://ucsb-cs8.github.io/m19-wang/lectures/lect11/](https://ucsb-cs8.github.io/m19-wang/lectures/lect11/)

## `Coffee` class

The `Coffee.py` file will contain the class definition of what a coffee beverage will have. Since a coffee **IS-A** beverage, we will inherit the values we defined in the `Beverage` class.

Your `Coffee` class definition should support the following constructor and method:

* `__init__(self, ounces, price, style)` - constructor that extends the parent class' (`Beverage`) constructor and sets the style of coffee (for example, Cappuccino, Americano, Espresso, etc.) as an attribute to the `Coffee` class. Note, you may assume the `style` parameter is a `str`. In order to avoid code duplication, **you must explicitly utilize the base class' constructor to set the ounces and price attributes.**
* `getInfo(self)` - method that overrides the inherited `getInfo` method in the `Beverage` class, and returns a `str` with the properties of a `Coffee` object. In order to avoid code duplication, **you must explicitly utilize the base class' `getInfo` method to construct the `Coffee` object's information**. An example of what the return string format of the `getInfo` method is shown below:

```
>>> c1 = Coffee(8, 3.0, "Espresso")
>>> c1.getInfo()
'Espresso Coffee, 8 oz, $3.00'
```

<b>Note:</b> The `c1.getInfo()` return value in the example above does not contain a newline character (`\n`) at the end.

## `FruitJuice` class

The `FruitJuice.py` file will contain the class definition of what a fruit juice beverage will have. Since a fruit juice **IS-A** beverage, we will inherit the values we defined in the `Beverage` class.

Your `FruitJuice` class definition should support the following constructor and method:

* `__init__(self, ounces, price, fruits)` - constructor that extends the parent class' (`Beverage`) constructor and sets a list of fruits used in this fruit juice object. Note, you may assume the `fruits` parameter is a list of strings representing the types of fruits (for example, `"orange"`, `"blueberry"`, `"guava"`, etc.) used in the fruit juice. In order to avoid code duplication, **you must explicitly utilize the base class' constructor to set the ounces adn price attributes.**
* `getInfo(self)` - method that overrides the inherited `getInfo` method in the `Beverage` class, and returns a `str` with the properties of a `FruitJuice` object. In order to avoid code duplication, **you must explicitly utilize the bass class `getInfo` method to construct the `FruitJuice` object's information.** An example of what the return string format of the `getInfo` method is shown below:

```
>>> juice = FruitJuice(16, 4.5, ["Apple", "Guava"])
>>> juice.getInfo()
'Apple/Guava Juice, 16 oz, $4.50'
```

<b>Note:</b> The `juice.getInfo()` return value in the example above does not contain a newline character (`\n`) at the end.

## `DrinkOrder` class

The `DrinkOrder.py` file will contain the class definition of what a customer's drink order will contain along with the total price of all beverages in the drink order.

Your `DrinkOrder` class definition should support the following constructor and methods:

* `__init__(self)` - constructor that initializes an empty list to the class. This list will eventually expand with beverages for the customer's drink order.
* `addBeverage(self, beverage)` - method that will add the beverage parameter to the `DrinkOrder`'s list. The most recently added beverage will exist at the end of the list. You may assume the beverage parameter will either be a `FruitJuice` or `Coffee` object.
*  `getTotalOrder(self)` - method that will return a `str` containing each beverage in the drink order, and the total price of all beverages in the drink order. An example of what the return string format of the `getTotalOrder` method is shown below:

```python
c1 = Coffee(8, 3.0, "Espresso")
juice = FruitJuice(16, 4.5, ["Apple", "Guava"])
order = DrinkOrder()
order.addBeverage(c1)
order.addBeverage(juice)
print(order.getTotalOrder())
```

<b>Output:</b>

```
Order Items:
* Espresso Coffee, 8 oz, $3.00
* Apple/Guava Juice, 16 oz, $4.50
Total Price: $7.50
```

<b>Note:</b> The `order.getTotalOrder()` return value in the example above does not contain a newline character (`\n`) at the end.

## `testFile.py` pytests

This file will contain unit tests using `pytest` to test if your functionality is correct. Think of various scenarios and method calls to be certain that the state of your objects and return values are correct (provide enough tests such that all method calls in `Beverage`, `Coffee`, and `FruitJuice` and `DrinkOrder` are covered). Even though Gradescope will not use this file when running the automated tests, it is important to provide this file with various test cases (testing is important!!). We will manually grade your `testFile.py` to make sure your unit tests cover the defined methods in `Beverage`, `Coffee`, and `FruitJuice` and `DrinkOrder`. There are many ways to organize your test functions - my recommendation is writing a test for each class, and calling various methods to make sure the functionality and state of the objects are correct.

Pytest will need to be installed on your computer since it does not come with Python by default. Some links for you to use when installing pytest are:
* Installation Guide: <https://docs.pytest.org/en/stable/getting-started.html>
	* Note: on MacOS running Python3, try using **pip3** instead of **pip** if your installation is not working.
* Windows Installation Guide (created by previous Learning Assistants): [Python and Pytest Installation Guide for Windows](https://drive.google.com/file/d/1nPCwIA8cBAkiJ-kOKZFjkOskD94jmWYn/view)
	* If you have installed Python on your windows machine already without selecting `Add Python 3.x to PATH`, the easiest thing to do is uninstall / reinstall Python and be sure to select this box. 

In order to run your pytests, you can navigate to your folder where your lab02 code is located with the command line interface, and run:

On Mac:

```
python3 -m pytest testFile.py
```

On Windows:

```
python -m pytest testFile.py
```

* If you run into any difficulties when installing / running pytest, and/or have any questions about testing your code, we will be happy to help you out during our office / lab hours!

## Submission

Once you're done with writing your class definition and tests, Submit your `Beverage.py`, `Coffee.py`, `FruitJuice.py`, `DrinkOrder.py`, and `testFile.py` files to the `Lab02` assignment on Gradescope. There will be various unit tests Gradescope will run to ensure your code is working correctly based on the specifications given in this lab.

**Note on grading for labs with testing component:** For this lab assignment (and all lab assignments requiring a `testFile.py`), we will only manually grade the tests you write. In general, your lab score will be based on the autograder's score (out of 100 points).

* If you write your tests correctly according to the specifications, then you will receive 100/100 points.
* If your written tests are missing, incomplete, or incorrect, then there will be **up to** a 10 point deduction from the autograder score. For example, if you didn't write any tests, then your lab score will be 90/100 (-10 point deduction from the autograder's score).

If Gradescope's tests don't pass, you may get some error message that may or may not be obvious. Don't worry - if the tests didn't pass, take a minute to think about what may have caused the error. Try to think of your pytests and see if you can write a test to help you debug the error (if you haven't already). If you're still not sure why you're getting the error, feel free to ask your TAs or Learning Assistants.
