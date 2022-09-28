---
layout: lab
num: lab00
ready: true
desc: "Getting Started, Python Review"
assigned: 2022-09-22 08:00:00.00-7
due: 2022-10-02 23:59:59.59-7
---

# Introduction

Your first lab for this week is an introduction to making submissions to Gradescope's autograder, joining the ucsb-cs9-f22 github organization so you can create **private** repositories of your lab work throughout the quarter, and writing Python functions for review.

## Goals for this lab

By the time you have completed this lab, you should have:
* installed Python
* created and run Python progams in IDLE
* created a Private github repo and upload your work using github's web interface
* submited an assignment using the Gradescope system

# Get setup with Github and adding yourself to our organization

We will be using <https://github.com> in this course. We have created an organization called ucsb-cs9-f22 on github.com where you can create repositories (repos) for your assignments in this course. The advantage of creating private repos under this organization is that the course staff (your instructor, TAs, and Learning Assistants) will be able to see your code and provide you with help.

To join this organization, you need to do three things.

1. If you don't already have a github.com account, create one on the "free" plan. Visit [https://github.com/](https://github.com/)

2. If you don't already have your @umail.ucsb.edu email address associated with your github.com account. go to "settings", add that email, and confirm that email address.

3. Visit our Github Sign Up Tool at [https://ucsb-cs-github-linker.herokuapp.com/](https://ucsb-cs-github-linker.herokuapp.com/), login with your github.com account, click "Home", find this course (CS 9 F22), and click the "join course button". That will automatically send you an invitation to join the course organization on github.

4. There should be a link to the invitation for the GitHub organization for this course (<https://github.com/ucsb-cs9-f22>). Click on the invitation link and accept it. You can also go straight to <https://github.com/ucsb-cs9-f22> and see the invitation there (if you're logged in). Accept the invitation that appears in your browser (from step 3) or log into your account on [https://github.com/](https://github.com/) to accept the invitation.

# Get setup with Gradescope

We will use Gradescope to grade all your homeworks, quizzes, and lab assignments. I have manually added everyone (using your @umail.ucsb.edu accounts) currently enrolled in the course to the Gradescope system. You should have received an email notification with instructions about logging into Gradescope. Once you follow the instructions to set your password, you should have access to our course on Gradescope. You should see "CMPSC 9" in your Fall 2022 courses.

The lab assignment "Lab00" should appear in your Gradescope dashboard in CMPSC 9. You will need to submit your code for Lab00 using this page.

# Install Python on your computer

The instructions on installing Python on your computer can be found here:

<https://www.python.org/downloads/>

Follow the appropriate links to install Python for your computer.

# Lab Section Computers

We are offering in-person lab sections this quarter in SSMS 1301. These computers are Windows machines with Python 3+ already installed. **In general, it is acceptable to conduct your work on your own computer for this class.** 

The workstations in SSMS 1301 **WILL NOT** save your work such that when you log in / log out. If you plan on using these machines to do your work, it is a good idea to create back up versions of your work in case you plan on working on your personal computer - uploading versions of your work on github or Gradescope is a great way to do this since you can download / upload your work on any computer. Instructions on creating a repository on github to store your work is at the bottom of these lab instructions.

# Create your Lab00 directory

It's important to be organized when working on various labs this quarter. My recommendation is to create a "cs9" folder that will contain sub folders for each lab - in this case I would recommend creating a cs9/lab00 folder on your computer where you can save your file(s) and work in this directory for Lab00. I recommend creating a new folder for each lab assignment.

When creating or obtaining files to work with, you may use any editor of your choice. However, for now I will recommend IDLE since this comes with the installation of Python and the lab instructions will guide you through the process using IDLE (a program to create and run Python programs).

You can launch IDLE running Python 3+ as a Windows Application. On a Mac or Unix system, you can start idle by typing `idle3` in a terminal window (a program that gives us access to the `command line` interface for the computer). You can access the terminal window by opening up a terminal window:

![terminal icon](Terminal.png)

* A Terminal Window should pop up
* You can then open the IDLE program by typing `idle3`

If you are encountering any issues or need help, feel free to ask a TA / ULA for assistance when getting started.

# Create a new lab00.py file

Using the editor of your choice, create a `lab00.py` file in your lab00 directory. This `lab00.py` file will contain the python code you will submit for this lab assignment. Steps of creating this new file with IDLE are:

* Open IDLE on your computer
* Go to "File" -> "New File", which will create an untitled file.
* Save this file by going to "File" -> "Save", which will prompt you to save this file in a specified location.
	* Name this file `lab00` (assuming the extension will automatically be saved as a `.py` file).
	* Save this file under your cs9/lab00 directory you created for this lab.

# Copy the following code template into `lab00.py` and complete the function definitions

We will write three python functions for this lab, which reviews some of the concepts covered in CS 8 and the readings in h00.

Copy the following code into your `lab00.py` file and complete the function definitions according to the comments (and type your actual name on the first line):

```python
# Lab00, CS 9, [type your name here]

def areElementsInList(list1, list2):
    ''' This function takes two lists as its parameters (list1 and
        list2). Return True if each element in list1 exists in list2.
        Return False otherwise. If list1 contains no elements, True is
        returned.
    '''
    # COMPLETE FUNCTION DEFINITION HERE

assert areElementsInList(["one",2], [0,"one",2,"three"]) == True
assert areElementsInList([],[1,2,3,4]) == True
assert areElementsInList([1,2,3],[1,2]) == False
assert areElementsInList([1,2,3],[3,2,1]) == True

def alternateCase(s):
    ''' This function takes a string parameter (s) and returns a new
        string that flips the case of each alpha character in s.
    '''
    # COMPLETE FUNCTION DEFINITION HERE

assert alternateCase("") == ""
assert alternateCase("This is a Sentence") == "tHIS IS A sENTENCE"
assert alternateCase("CS9") == "cs9"
assert alternateCase("9.95") == "9.95"

def getCharacterCount(s):
    ''' This function takes a string parameter (s) and returns a dictionary
        type where each key in the dictionary is a unique upper-case character
        in s and its associated value is the number of occurences the unique
        character exists in s. Note that the unique characters should be case
        insensitive ("a" and "A" are considered the same and should be stored as
        "A" in the dictionary). Non alpha characters (including whitespaces)
        and their occurences should also be stored in the dictionary.
    '''
    # COMPLETE FUNCTION DEFINITION HERE

x = getCharacterCount("This is a Sentence")
assert x.get("S") == 3
assert x.get("P") == None
assert x.get("I") == 2
assert x.get(" ") == 3

y = getCharacterCount("Pi is Approximately 3.14159")
assert y.get("1") == 2
assert y.get("A") == 2
assert y.get("P") == 3
assert y.get(".") == 1
assert y.get(4) == None
```

Note that several `assert` statements are included after each function definition. The goal is to run your code such that these assert statements do not produce any errors and your code successfully finishes execution. Assert statements are a quick-and-dirty way to do simple testing, but there are better ways instead of just using `assert` statements scattered throughout your code for testing, which we'll cover later this quarter.

In Python, things are executed line-by-line from top to bottom. So if your code has an error and an `assert` statement doesn't pass, then you will see which `assert` statement failed and execution will stop (no other statements after the error will be executed).

In order to run your `lab00.py` file in IDLE, go to "Run" -> "Run Module". This will start the execution of the file you're working on and the output will be displayed in IDLE's Interactive Shell.

## Good Idea: Periodically uploading your solution to Github

It's a good idea to periodically save your work on Github since:
* It helps our staff provide assistance on the code you're currently working on.
* It saves versions of your work, in case you want to revert back to a previous version.
* You can download your work in case you're working on a different computer.
* It's useful to familiarize yourself with Github's interface - Github is a commonly used and powerful tool!

In order to create a directory in the Github organization:
* Navigate to <https://github.com/ucsb-cs9-f22>
* Click on the "New" Green Button to create a new "repository" (note: you should have a separate repository for each lab assignment).

![newButton](newButton.png)

* From here, you can create your repository.
* NOTE: Be sure that **"Private"** is selected. The CS 9 course staff can see all private repositories, but other students will not be able to.
* Name your repository "lab00_[your_UCSBNETID]" - where you will type your actual UCSBNETID.

![createRepo](createRepo.png)

* Once your Private repository is created, you can upload your work by clicking on the "uploading an existing file" link in your currently empty repository page.
* You can drag/drop or navigate to your `lab00.py` file on your computer to upload.

![fileUpload](fileUpload.png)

* Then click on the "Commit changes" green button to actually upload your file to your repository.
* Congrats! Your file now lives in your Github repository!
	* You can re-upload updated versions on Github and all of your previous versions of your work will be saved.

# Submitting to Gradescope

The lab assignment "Lab00" should appear in your Gradescope dashboard in CMPSC 9. If you haven’t submitted anything for this assignment yet, Gradescope will prompt you to upload your files. This prompt is shown below:

![Gradescope_upload](Gradescope_upload.png)

You either can navigate to your file(s) or "drag-and-drop" them into the "Submit Programming Assignment" window.

If you already submitted something on Gradescope, it will take you to their "Autograder Results" page. There is a "Resubmit" button on the bottom right that will allow you to update the files for your submission.

For this lab, if everything is correct, you'll see a successful submission passing all of the autograder tests shown below.

![Gradescope_results](Gradescope_results.PNG)

**Tip: Removing print statements**
If you see the following error message:

```The autograder failed to execute correctly. Please ensure that your submission is valid. Contact your course staff for help in debugging this issue. Make sure to include a link to this page so that they can help you most effectively.```

This may be because your code contains `print` statements when submitting to Gradescope. Print statements sometimes confuses the autograder resulting in this message. In general, lab submissions do not require any `print` statements (though it may be helpful to use when debugging). If you see this error, try removing any `print` statements in your code and see if that resolves your issue.

If the tests don't pass, you may get some error message that may or may not be obvious at this point. Don't worry - if the tests didn't pass, take a minute to think about what may have caused the error. If your tests didn't pass and you're still not sure why you're getting the error, feel free to ask your TAs or Learning Assistants.

Note: Be sure to log out of the machine before you leave. In fact, you should do this every time you walk away from a lab computer.