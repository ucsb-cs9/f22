---
num: "Lecture 17"
desc: "Binary Search Trees cont."
ready: true
lecture_date: 2022-11-17 08:00:00.00-7:00
---

Recorded Lecture: [11_17_22](https://drive.google.com/file/d/1gFsotyxlq75Dqq0pxtuFC_LGdGyTcIH3/view?usp=sharing)

# Binary Search Tree (BST)

* Recall that a binary tree is a tree structure where a node may have at most two children
* **Binary Search Trees (BST)** are binary trees that have the following property:
	* Values that are less than the parent are found in the left subtree
	* Values that are greater than the parent are found in the right subtree
	* This is known as the **BST property**
* Binary Search Trees are also one way to implement a **Map** Abstract Data Type
	* A Map ADT maps keys to corresponding values
	* Think of keys defining where in the BST structure a node gets inserted
	* And each node has a corresponding value field
	* Similar to how Python Dictionaries work on a high-level (but the underlying implementation between a Python Dictionary and BST are different (each with pros / cons))
* Example: Inserting the following keys into a BST

![BSTInsertion1.png](BSTInsertion1.png)

* **Note:** Insertion order of elements affects the structure of the tree!
* Example: Inserting the same elements in different order

![BSTInsertion2.png](BSTInsertion2.png)
![BSTInsertion3.png](BSTInsertion3.png)

* **Also note:** inorder traversal in a BST will visit the nodes in order - try it out!

# BST TreeNode and BST Implementation

```
# TreeNode.py

class TreeNode:
	def __init__(self,key,val,left=None,right=None, parent=None):
		self.key = key
		self.payload = val
		self.leftChild = left
		self.rightChild = right
		self.parent = parent

	def hasLeftChild(self):
		return self.leftChild # Note: Python considers None as a False value

	def hasRightChild(self):
		return self.rightChild

	def isLeftChild(self):
		return self.parent and self.parent.leftChild == self

	def isRightChild(self):
		return self.parent and self.parent.rightChild == self

	def isRoot(self):
		return not self.parent

	def isLeaf(self):
		return not (self.rightChild or self.leftChild)

	def hasAnyChildren(self):
		return self.rightChild or self.leftChild

	def hasBothChildren(self):
		return self.rightChild and self.leftChild

	def replaceNodeData(self,key,value,lc,rc):
		self.key = key
		self.payload = value
		self.leftChild = lc
		self.rightChild = rc
		if self.hasLeftChild():
			self.leftChild.parent = self
		if self.hasRightChild():
			self.rightChild.parent = self
```
```
# BinarySearchTree.py

from TreeNode import TreeNode

class BinarySearchTree:
	def __init__(self):
		self.root = None # A BST just needs a reference to the root node
		self.size = 0 # Keeps track of number of nodes

	def length(self):
		return self.size

	def put(self,key,val):
		if self.root:
			self._put(key,val,self.root)
		else:
			self.root = TreeNode(key,val)
		self.size = self.size + 1

	# helper method to recursively walk down the tree
	def _put(self,key,val,currentNode):
		if key < currentNode.key:
			if currentNode.hasLeftChild():
				self._put(key,val,currentNode.leftChild)
			else:
				currentNode.leftChild = \
				TreeNode(key,val,parent=currentNode)
		else:
			if currentNode.hasRightChild():
				self._put(key,val,currentNode.rightChild)
			else:
				currentNode.rightChild = \ 
				TreeNode(key,val,parent=currentNode)


	def get(self,key): # returns payload for key if it exists
		if self.root:
			res = self._get(key,self.root)
			if res:
				return res.payload
			else:
				return None
		else:
			return None

	# helper method to recursively walk down the tree
	def _get(self,key,currentNode): 
		if not currentNode:
			return None
		elif currentNode.key == key:
			return currentNode
		elif key < currentNode.key:
			return self._get(key,currentNode.leftChild)
		else:
			return self._get(key,currentNode.rightChild)
```
```
# pytests

from BinarySearchTree import BinarySearchTree

def test_constructBST():
	BST = BinarySearchTree()
	assert BST.root == None
	assert BST.length() == 0

def test_insertRoot():
	BST = BinarySearchTree()
	BST.put(10, "ten")
	assert BST.root.key == 10
	assert BST.root.payload == "ten"
	assert BST.root.hasLeftChild() == None
	assert BST.root.hasRightChild() == None
	assert BST.root.isLeftChild() == None
	assert BST.root.isRightChild() == None
	assert BST.root.isRoot() == True
	assert BST.root.hasAnyChildren() == None
	assert BST.root.isLeaf() == True
	assert BST.root.hasBothChildren() == None
	BST.root.replaceNodeData(20, "twenty", None, None)
	assert BST.root.key == 20
	assert BST.root.payload == "twenty"

def test_insertNodes():
	BST = BinarySearchTree()
	BST.put(10, "ten")
	BST.put(20, "twenty")
	BST.put(15, "fifteen")
	BST.put(5, "five")
	assert BST.root.key == 10
	assert BST.root.leftChild.key == 5
	assert BST.root.rightChild.key == 20
	assert BST.root.rightChild.leftChild.key == 15
```
