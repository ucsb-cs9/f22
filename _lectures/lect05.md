---
num: "Lecture 5"
desc: "Pytest, Operator Overloading, Inheritance"
ready: true
lecture_date: 2022-10-06 08:00:00.00-7:00
---

Recorded Lecture: [10_6_22](https://drive.google.com/file/d/1sBET0qBK0Sw43vf4jduKHjx_qjCfrHfi/view?usp=sharing)

# Pytest
* Pytest is a framework that allows developers to write tests to check the correctness of their code
* Gradescope actually uses pytest to check the "correct" answer with students’ submissions
* We can write functions that start with `test_`, and the body of the function can contain assert statements (as seen in lab00)
	* Pytest will run each of these functions are report which tests passed and which tests failed
* Try and install Pytest on your computer (will use this in our examples)
Installation Guide: <https://docs.pytest.org/en/stable/getting-started.html>
* Windows Installation Guide (created by previous Learning Assistants): [Python and Pytest Installation Guide for Windows](https://drive.google.com/file/d/1nPCwIA8cBAkiJ-kOKZFjkOskD94jmWYn/view)

* Example

Write a function `biggestInt(a,b,c,d)` that takes 4 int values and returns the largest

* Let's write our our tests first (TDD!)

```
# testFile.py

# imports the biggestInt function from lecture.py
from lecture import biggestInt 

def test_biggestInt1():
    assert biggestInt(1,2,3,4) == 4
    assert biggestInt(1,2,4,3) == 4
    assert biggestInt(1,4,2,3) == 4

def test_biggestInt2():
    assert biggestInt(5,5,5,5) == 5
    # etc.

def test_biggestInt3():
    assert biggestInt(-5,-10,-12,-100) == -5
    assert biggestInt(-100, 1, 100, 0) == 100
    # etc.
```

* Now let’s write the function:

```
# lecture.py

def biggestInt(a,b,c,d):
	biggest = 0
	if a >= b and a >= c and a >= d:
		return a
	if b >= a and b >= c and b >= d:
		return b
	if c >= a and c >= b and c >= d:
		return c
	else:
		return d
```

Command to run pytest on testFile.py:
* Navigate to the folder containing `lecture.py` and `testFile.py`
* (On mac terminal): `python3 -m pytest testFile.py`
    * Note: replace `python3` with `python` on Windows.

# Operator Overloading

* We can define our own behavior for common operators in our classes
	* What does it mean if two student objects are equal (we defined it to mean perm numbers are equal)?
	* Or what does it mean to add (+) two students together?
	* Python allows us to define the functionality for operators!

## Defining `__str__` 

* When printing our defined objects, we may get something unusual. For example:

```
from Student import Student

s1 = Student("Gaucho", 1234567)
s2 = Student("Jane", 5555555)
print(s1) <Student.Student object at 0x7fd5380d8e80>
```

* All objects can be printed, but Python wouldn’t know what to print for user-defined objects like Student
* So it just prints the memory address (the `0x...`) of where the object exists in memory
* In order to provide our own meaning of what Python should display when printing an object like Student, we will need to define a special `__str__` method in our Student class:

```
def __str__(self):
	''' returns a string representation of a student '''
	return "Student name: {}, perm: {}".format(self.name, self.perm) 
```

* Python will now use the return value of the `__str__` method when determining what to display in the print statement
	* Now the `print(s1)` statement outputs `Student name: Gaucho, perm: 1234567`

## Overriding the '+' operator

* What would it mean to add (+) two students together?
* Maybe we can return a list collection ... could be useful ... maybe?

```
def __add__(self, rhs):
	''' Takes two students and returns a list containing these two students '''
    return [self, rhs]
```
```
x = s1 + s2 # returns a list of s1 + s2
print(type(x)) # list type

for i in x:
	print(i)

# Output of for loop
# Student name: Gaucho, perm: 1234567
# Student name: Jane, perm: 5555555
```

## Overloading the '<=' and '>=' operator

* Example:

```
# <=
def __le__(self, rhs):
	''' Takes two students and returns True if the
		student is less than or equal to the other
		student based on the lexicographical order
		of the name '''
	return self.name.upper() <= rhs.name.upper()

# >=
def __ge__(self, rhs):
	''' Takes two students and returns True if the
		student is greater than or equal to the other
		student based on the lexicographical order
		of the name '''
	return self.name.upper() >= rhs.name.upper()

# >
# def __gt__

# <
# def __lt__
```
```
print(s1 <= s2) # True
print(s1 >= s2) # False
print(s1 == s2) # False
print(s1 < s2) # ERROR, we didn’t define the __lt__ method
```

* Good article on this as well as a list of common operators we can overload: <https://thepythonguru.com/python-operator-overloading/>

# Inheritance

* Let's write an `Animal` class and see what inheritance looks like in action:

```
# Animal.py
class Animal:
	''' Animal class type that contains attributes for all animals '''

def __init__(self, species=None, name=None):
	self.species = species
	self.name = name

def setName(self, name):
	self.name = name

def setSpecies(self, species):
	self.species = species

def getAttributes(self):
	return "Species: {}, Name: {}".format(self.species, self.name)

def getSound(self):
	return "I'm an Animal!!!"
```

* and now let's define a `Cow` class that inherits from `Animal`

```
# Cow.py

from Animal import Animal

class Cow(Animal):
    # Available method for the Cow Class 
    def setSound(self, sound):
        self.sound = sound
```
```
c = Cow("Cow", "Betsy")
print(c.getAttributes())
c.setSound("Moo") # Sets a Cow sound attribute to "Moo"
print(c.getSound()) # I’m an Animal!!! (calls the Animal.getSound method)
```

* Note that the Cow’s constructor (`__init__`) was inherited from the class `Animal` as well as the `getAttributes()` method
* Also note that we didn’t need to define the `getSound()` method since it was inherited from `Animal`
* But in this case, this inherited method `getSound()` may not be what we want.
* So we can redefine its functionality in the Cow class!

```
# in Cow class
def getSound(self):
	return "{}!".format(self.sound)
```

* We changed the `getSound()` method in the `Cow` class, so in this case our `Cow` class overrode the `getSound()` method of `Animal`
* So now, cow objects will use its own version of `getSound()`, not the version that was inherited from `Animal`, as seen below:

```
c = Cow("Cow", "Betsy")
c.setSound("Moo") # Sets a Cow sound to "Moo"
print(c.getSound()) # Moo!
```

* We can still create `Animal` objects, and `Animal` objects will still use its own version of `getSound()`

```
a = Animal("Unicorn", "Lala")
print(a.getAttributes())
print(a.getSound()) # I’m an Animal!!!
```

<b>Note:</b> The constructed object type will dictate which method in which class is called.
* It first looks at the <b>constructed object type</b> and checks if there is a method defined in that class. If so, it uses that
* If the constructed object doesn’t have a method definition in its class, then it checks the parent(s) it inherited from, and so on ...
* If there is no matching method call, then an error happens