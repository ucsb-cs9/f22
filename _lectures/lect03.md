---
num: "Lecture 3"
desc: "Python Classes"
ready: true
lecture_date: 2022-09-29 08:00:00.00-7:00
---

Recorded Lecture: [9_29_22](https://drive.google.com/file/d/1Xud0InvNRxkGMR32Myje6gChX7LJ2AMd/view?usp=sharing)

# Python Objects and Classes

* Objects are a way for programmers to define their own Python types and create abstractions of things with the programming language.
* Each object may have a certain state that gets modified throughout program execution.
* Object Oriented (OO) programming is the way programs use and manipulate objects to solve problems and model real-world properties
* OO Programming is not REQUIRED
	* It’s more of a way to organize, read, maintain, test, and debug software in a manageable way
* We’ve been using objects already, for example:

```
>>> x = [1,2,3]
>>> type(x)
<class 'list'>
>>> x.count(3)
1
>>> x.count(-1)
0
>>> x.append(0)
>>> x
[1, 2, 3, 0]
```

* `count`, `append`, etc are all examples of **methods** that can be called on an object.
* **Methods** are like functions but are associated with an object
* In this case, Python already defined its own class called `list` that we can use, but sometimes we want to create our own specific objects for the applications we’re trying to build!

## Student Class Example

```
class Student:
	''' Student class type that contains attributes for all students '''
	def setName(self, name):
		self.name = name

	def setPerm(self, perm):
		self.perm = perm

	def printAttributes(self):
		print("Student name: {}, perm: {}" \
		.format(self.name, self.perm))

s = Student()
s.setName("Chris Gaucho")
s.setPerm(1111111)
s.printAttributes()
```

* When defining methods, the `self` parameter represents the current object we’re calling the method on
* In the example above, s is the variable storing the created Student object.
* When we define the methods, the first parameter is the *instance* of the object stored in s
* We can then use and manipulate the state of the object with these methods using the `self` parameter

## Default Constructor

* We can provide either default values or set values of the object when constructing it through the parameter list
* In the example above, we can set an empty object without any initial attributes, which may cause an error when trying to use them
* The constructor below will set `self.name` and `self.perm` to the value `None`, which doesn't require the set methods to set these fields in the object.

```
def __init__(self):
	self.name = None
	self.perm = None

s = Student()
s.printAttributes()
```

## Overloading Constructors

* We can even go a step further and define the attributes by putting them in the parameters when we create the object

```
def __init__(self, name, perm):
	self.name = name
	self.perm = perm

s = Student("Richert", 1234567)
s.printAttributes()
```

## Initializing default values in the constructor

```
def __init__(self, name=None, perm=None):
	self.name = name
	self.perm = perm
```

* In this case, we can pass in parameters or not. If not, then `None` will automatically be assigned to the `self.name` and `self.perm`
* Or we can pick and choose what to set. For example:

```
s = Student(perm=1234567)
s.printAttributes()

# Student name: None, perm: 1234567
```

* We used the default value of name (None) and then explicitly set the perm (1234567)

## Example of using objects in code

```
s1 = Student("Jane", 1234567)
s2 = Student("Joe", 7654321)
s3 = Student("Jill", 5555555)

studentList = [s1, s2, s3]

for s in studentList:
	s.printAttributes()

# Using assert statements to test correct functionality
s1 = Student()
assert s1.name == None
assert s1.perm == None

s1 = Student("Gaucho", 7654321)
assert s1.name == "Gaucho"
assert s1.perm == 7654321
```

# Container Classes

* Let's continue to expand on our `Student` class
* Classes are also useful to organize / maintain state of a program
* Student objects are useful to organize the attributes of a single student
* But let’s imagine we are trying to write a database of various students
	* The database may be useful to search for students with certain attributes...
	* We will need to add / remove things from our database
	* We can define a class to represent a collection of courses containing students
	* Let’s set up a collection of courses such that a dictionary key is defined by the course number and the value is a list of actual student objects

```
# Courses.py

# from [filename (without .py)] import [component]
from Student import Student 

class Courses:
	''' Class representing a collection of courses. Courses are
		organized by a dictionary where the key is the
		course number and the corresponding value is
		a list of Students of this course '''

	def __init__(self):
		self.courses = {}

	def addStudent(self, student, courseNum):
		# If course doesn't exist... 
		if self.courses.get(courseNum) == None:
			self.courses[courseNum] = [student]
		elif not student in self.courses.get(courseNum):
			self.courses[courseNum].append(student)

	def printCourses(self):
		for courseNum in self.courses:
			print("CourseNum: ", courseNum)
			for student in self.courses[courseNum]:
				student.printAttributes()
			print("---")

	# Getter method
	def getCourses(self):
		return self.courses


# Using assert statements to test correct functionality
s1 = Student("Gaucho", 1234567)
UCSB = Courses()
UCSB.addStudent(s1, "CS9")
courses = UCSB.getCourses()

assert courses == {"CS9": [s1]}
```
