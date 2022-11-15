---
num: "Lecture 16"
desc: "Binary Trees, Tree Traversals, Binary Search Trees"
ready: true
lecture_date: 2022-11-15 08:00:00.00-7:00
---

Recorded Lecture: [11_15_22](https://drive.google.com/file/d/1bBgdlUg5ALIj95yTBmYQSjcfqL7lATc-/view?usp=sharing)

# Binary Trees

* Recall: A Binary Tree is a tree structure where a node has **at most** two children
* So far we’ve talked about trees on a conceptual level when analyzing sorting algorithms such as merge sort and quick sort
* We even talked about how to implement Binary Heaps that can be conceptualized as a **complete binary tree**
	* And there are many ways to implement trees!

## Nodes and References Representation

* Similar to our Linked List implementation, we can expand upon this concept using nodes and references to construct our tree
* Each node can be represented as an object
	* Each Node will have left / right child references to other nodes in the tree
	* Each Node is the root of its own subtree
* Binary Tree Implementation (from textbook)

```
class BinaryTreeNode:
	def __init__(self, rootObj):
		self.key = rootObj
		self.leftChild = None
		self.rightChild = None

	def insertLeft(self, newNode):
		# Case 1: Node does not have a left child
		if self.leftChild == None:
			self.leftChild = BinaryTreeNode(newNode)
		else: # Case 2: Node has a left child
			t = BinaryTreeNode(newNode)
			t.leftChild = self.leftChild # Links the left sub tree
			self.leftChild = t

	def insertRight(self, newNode):
		# Case 1: Node does not have a right child
		if self.rightChild == None:
			self.rightChild = BinaryTreeNode(newNode)
		else: # Case 2: Node has a right child
			t = BinaryTreeNode(newNode)
			t.rightChild = self.rightChild # Links the right sub tree
			self.rightChild = t

	def getRightChild(self):
		return self.rightChild

	def getLeftChild(self):
		return self.leftChild

	def setRootVal(self, obj):
		self.key = obj

	def getRootValue(self):
		return self.key
```
```
# PYTESTS
def test_createNode():
	node = BinaryTreeNode("A")
	assert node.getRootValue() == "A"
	assert node.getLeftChild() == None
	assert node.getRightChild() == None

def test_leftNode():
	node = BinaryTreeNode("A")
	node.insertLeft("B")
	assert node.getLeftChild().getRootValue() == "B"
	assert node.getRootValue() == "A"
	assert node.getRightChild() == None
	assert node.getLeftChild().getLeftChild() == None
	assert node.getLeftChild().getRightChild() == None

def test_rightNode():
	node = BinaryTreeNode("A")
	node.insertRight("B")
	assert node.getRightChild().getRootValue() == "B"
	assert node.getRootValue() == "A"
	assert node.getLeftChild() == None
	assert node.getRightChild().getLeftChild() == None
	assert node.getRightChild().getRightChild() == None

def test_insertLeft():
	node = BinaryTreeNode("A")
	node.insertLeft("B")
	node.insertLeft("C")
	node.insertLeft("D")

	temp = node
	s = ""
	while temp != None:
		s = s + temp.getRootValue()
		temp = temp.getLeftChild()
	assert s == "ADCB"
```

# Tree Traversals

* Sometimes we would want to visit all nodes in a tree
* We can do this in various ways, and the order of visiting nodes may vary
* There are three common recursive ways to traverse nodes in a tree:

	* preorder
		* Visit the node first, the recursively go down left subtree, then recursively go down right subtree
	* inorder
		* Recursively go down left subtree, visit node, then recursively go down right subtree
	* postorder
		* Recursively go down left subtree, recursively go down right subtree, then visit node
* Example

![treeTraversals.png](treeTraversals.png)

* Tree Traversal Recursive Implementation

```
def preorder(tree):
	ret = ""
	if tree != None:
		ret += tree.getRootValue()
		ret += preorder(tree.getLeftChild())
		ret += preorder(tree.getRightChild())
	return ret

def inorder(tree):
	ret = ""
	if tree != None:
		ret += inorder(tree.getLeftChild())
		ret += tree.getRootValue()
		ret += inorder(tree.getRightChild())
	return ret

def postorder(tree):
	ret = ""
	if tree != None:
		ret += postorder(tree.getLeftChild())
		ret += postorder(tree.getRightChild())
		ret += tree.getRootValue()
	return ret
```
```
#pytests
def test_preorder():
	# Create tree
	root = BinaryTreeNode("A")
	root.insertLeft("B")
	root.getLeftChild().insertLeft("D")
	root.insertRight("C")
	root.getRightChild().insertLeft("E")
	root.getRightChild().insertRight("F")
	assert preorder(root) == "ABDCEF"

def test_inorder():
	# Create tree
	root = BinaryTreeNode("A")
	root.insertLeft("B")
	root.getLeftChild().insertLeft("D")
	root.insertRight("C")
	root.getRightChild().insertLeft("E")
	root.getRightChild().insertRight("F")
	assert inorder(root) == "DBAECF"

def test_postorder():
	# Create tree
	root = BinaryTreeNode("A")
	root.insertLeft("B")
	root.getLeftChild().insertLeft("D")
	root.insertRight("C")
	root.getRightChild().insertLeft("E")
	root.getRightChild().insertRight("F")
	assert postorder(root) == "DBEFCA"
```

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
