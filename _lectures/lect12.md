---
num: "Lecture 12"
desc: "Quadratic Sorting Algorithms cont."
ready: true
lecture_date: 2022-11-01 08:00:00.00-7:00
---

Recorded Lecture: [11_1_22](https://drive.google.com/file/d/1ZnVC3qUeJs3TSRBpQ-Gi-Hsjqi3cBnPA/view?usp=sharing)

# Selection Sort

**Idea:** Similar to Bubble Sort, we make passes through the list and find the largest element. We then swap the largest element in the correct place (each iteration will place the largest element at the end of the list assuming we’re sorting in ascending order)
* It’s not necessary to swap adjacent elements in like Bubble Sort
* Think of it as "selecting" the largest element and then placing it in the correct place

```
def selectionSort(aList):
	for fillslot in range(len(aList)-1,0,-1):
		positionOfMax=0
		for location in range(1,fillslot+1):
			if aList[location]>aList[positionOfMax]:
				positionOfMax = location

		# swap largest element in correct place
		temp = aList[fillslot]
		aList[fillslot] = aList[positionOfMax]
		aList[positionOfMax] = temp
```
```
def test_selectionSort():
	list1 = [1,2,3,4,5,6]
	list2 = [2,2,2,2,2,2]
	list3 = []
	list4 = [6,7,5,3,1]
	selectionSort(list1)
	assert list1 == [1,2,3,4,5,6]
	selectionSort(list2)
	assert list2 == [2,2,2,2,2,2]
	selectionSort(list3)
	assert list3 == []
	selectionSort(list4)
	assert list4 == [1,3,5,6,7]
```

## Selection Sort Analysis

* Similar to Bubble Sort, we have to make n-1 comparisons during the first iteration through the list
	* Then n-2 comparisons during the 2nd iteration, etc.
* If we count the number of comparisons in this algorithm, we have
	* n-1 + n-2 + ... + 2 + 1 = n(n+1)/2
	* **O(n<sup>2</sup>)**
* Note: we only do one swap operation per iteration unlike Bubble Sort

# Insertion Sort

**Idea:** We want to work left-to-right and insert unsorted elements into the sorted left portion of the list
* For example, the first element is sorted by default.
	* Then we check the second element and determine if it goes before or after the first element
	* Then we check the third element and determine if it goes before, in the middle, or after the first two (sorted) elements
	* etc
* Note that in order to make "room" for the inserted element, we have to shift the elements greater than the inserted element up by one

**Analogy:** Similar to how one might sort a deck of cards
	* Work left-to-right, take a card and "insert" it into the correct position on the left portion of the sorted deck

```
def insertionSort(aList):
	for index in range(1,len(aList)):

		currentvalue = aList[index]
		position = index

		# shift elements over by one
		while position > 0 and aList[position-1] > currentvalue:
			aList[position] = aList[position-1]
			position = position-1

		# insert element in appropriate place
		aList[position] = currentvalue
```
```
def test_insertionSort():
	list1 = [1,2,3,4,5,6]
	list2 = [2,2,2,2,2,2]
	list3 = []
	list4 = [6,7,5,3,1]
	insertionSort(list1)
	assert list1 == [1,2,3,4,5,6]
	insertionSort(list2)
	assert list2 == [2,2,2,2,2,2]
	insertionSort(list3)
	assert list3 == []
	insertionSort(list4)
	assert list4 == [1,3,5,6,7]
```

## Insertion Sort Analysis

* When we check where to insert an element, we do up to 1 swap on the first iteration in order to make room for the element to be inserted in the sorted left portion of the list
	* Then we do up to two swaps on the second iteration
	* Then up to three swaps on the third iteration, etc.
	* So we get: 1 + 2 + ... + n-2 + n-1 swaps
	* **O(n<sup>2</sup>)**
* Let’s also look at the BEST case scenario (the list is already sorted)
	* Here, we still go through n elements, but no swaps occur because each position is in the correct place
	* So in the best case scenario, we have **O(n)**