# The Complete Guide to Arrays & Hashing in Python

## Table of Contents

1. [Introduction](#introduction)
2. [Part 1: Arrays - Foundation](#part-1-arrays---foundation)
3. [Part 2: Python Lists Deep Dive](#part-2-python-lists-deep-dive)
4. [Part 3: Hash Tables - Foundation](#part-3-hash-tables---foundation)
5. [Part 4: Python Dictionaries Deep Dive](#part-4-python-dictionaries-deep-dive)
6. [Part 5: When to Use Arrays vs Hash Tables](#part-5-when-to-use-arrays-vs-hash-tables)
7. [Part 6: Ten Comprehensive Examples](#part-6-ten-comprehensive-examples)
8. [Quick Reference Cheat Sheet](#quick-reference-cheat-sheet)

---

## Introduction

Arrays and hash tables are the **two most fundamental data structures** in programming. Master these, and you'll have the tools to solve the vast majority of coding problems you'll encounter. This guide takes you from absolute beginner to confident practitioner with unforgettable explanations and hands-on examples.

**What you'll learn:**
- How arrays store data in memory and why index access is instant
- How hash tables achieve "magical" O(1) lookups
- Python-specific implementations, methods, and gotchas
- Ten carefully selected problems that cement these concepts forever

---

## Part 1: Arrays - Foundation

### What is an Array?

An **array** is a collection of elements stored in **contiguous (adjacent) memory locations**. Think of it as a row of numbered storage boxes sitting right next to each other—each box holds one piece of data, and you can instantly find any box by its number.

#### The Parking Lot Analogy 🚗

Imagine a parking lot with **numbered spaces in a single row**:

```
┌─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┐
│  0  │  1  │  2  │  3  │  4  │  5  │  6  │  7  │  ← Space numbers (indices)
├─────┼─────┼─────┼─────┼─────┼─────┼─────┼─────┤
│ 🚗 │ 🚙 │ 🚕 │ 🏎️ │ 🚐 │ 🛻 │ 🚎 │ 🚑 │  ← Cars (elements)
└─────┴─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

**Key insights from this analogy:**
- **Direct access**: To find the car in space 5, you walk directly there—no checking spaces 0-4
- **Zero-indexed**: The first space is 0, not 1 (more on why below)
- **Fixed positions**: Each car's location is determined by its space number
- **Insertion cost**: Inserting a car in the middle means every car after it must move over

### Why Array Indexing Starts at 0

This isn't arbitrary—it's elegantly mathematical. The index represents the **offset** from the starting position:

```
Memory Address = Base Address + (Index × Element Size)

Base: 1000    Index 0: 1000 + (0 × 4) = 1000  ← Zero offset = first position
              Index 1: 1000 + (1 × 4) = 1004
              Index 2: 1000 + (2 × 4) = 1008
              Index 3: 1000 + (3 × 4) = 1012
```

The first element requires **zero jumps** from the start—hence index 0.

### How Arrays Work in Memory

Arrays store elements in **sequential memory addresses**. This contiguous layout is what makes arrays powerful:

```
┌──────────────────────────────────────────────────────────────┐
│                     COMPUTER MEMORY                          │
├──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┤
│ ...  │ 2000 │ 2004 │ 2008 │ 2012 │ 2016 │ 2020 │ 2024 │ ...  │
├──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┼──────┤
│      │  10  │  20  │  30  │  40  │  50  │  60  │  70  │      │
│      │ [0]  │ [1]  │ [2]  │ [3]  │ [4]  │ [5]  │ [6]  │      │
└──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┴──────┘
         ↑
    Base address (known)
```

**Why this matters**: Because elements are adjacent, the CPU can calculate any element's location with simple math—no searching required. This is why **array access is O(1)**.

### Static vs Dynamic Arrays

| Feature | Static Arrays | Dynamic Arrays |
|---------|--------------|----------------|
| **Size** | Fixed at creation | Grows/shrinks at runtime |
| **Memory** | Allocated at compile time | Allocated at runtime |
| **Resizing** | Cannot resize | Automatically resizes |
| **Examples** | C arrays, Java arrays | Python lists, ArrayList, C++ vector |
| **Use when** | Size is known and fixed | Size varies or unknown |

**Dynamic array growth strategy**: When capacity is reached, a new larger array (typically 1.5x-2x size) is allocated, existing elements are copied over. This gives **amortized O(1)** append performance.

### Time & Space Complexity for Arrays

| Operation | Time Complexity | Why? |
|-----------|----------------|------|
| **Access by index** `arr[i]` | **O(1)** | Direct calculation: base + offset |
| **Search for element** | **O(n)** | Must potentially check every element |
| **Insert at end** | **O(1)** amortized | Direct placement (occasional resize) |
| **Insert at beginning** | **O(n)** | Must shift ALL elements right |
| **Insert at middle** | **O(n)** | Must shift elements after insertion point |
| **Delete at end** | **O(1)** | Simple size decrement |
| **Delete at beginning/middle** | **O(n)** | Must shift elements to fill gap |

**Space Complexity**: O(n) where n = number of elements

**Memory tip**: Visualize the shifting:

```
Insert 'X' at index 2:
Before: [A][B][C][D][E]
              ↓ ↓ ↓ ↓  ← Everything shifts right
After:  [A][B][X][C][D][E]
```

---

## Part 2: Python Lists Deep Dive

### Internal Implementation

Python lists are **dynamic arrays** implemented in C. Each list object contains:

```
┌─────────────────────────────────────────────┐
│           PyListObject Structure            │
├─────────────────────────────────────────────┤
│  ob_size     →  Current length (len())      │
│  allocated   →  Total capacity              │
│  ob_item     →  Pointer to array of         │
│                 PyObject* pointers          │
└─────────────────────────────────────────────┘
                     │
                     ▼
┌─────┬─────┬─────┬─────┬─────┬─────┐
│ ptr │ ptr │ ptr │ ptr │ ... │ ... │  ← Array of pointers (8 bytes each)
└──┬──┴──┬──┴──┬──┴──┬──┴─────┴─────┘
   │     │     │     │
   ▼     ▼     ▼     ▼
  42   "hi"  3.14  True    ← Actual Python objects (anywhere in memory)
```

**Key insight**: Python lists store **pointers to objects**, not the objects themselves. This is why lists can be heterogeneous (mixed types)—each slot is just an 8-byte pointer.

### Over-Allocation Strategy

Python uses **over-allocation** to achieve amortized O(1) appends:

```python
# Growth pattern: 0 → 4 → 8 → 16 → 24 → 32 → 40 → 52 → 64 → 76...
# Roughly 12.5% extra capacity + small constant
```

This ensures that not every `append()` triggers expensive memory reallocation.

### Python List Methods and Operations

| Operation | Example | Time | Notes |
|-----------|---------|------|-------|
| **Access** | `lst[i]` | O(1) | Direct index lookup |
| **Assign** | `lst[i] = x` | O(1) | Direct assignment |
| **Length** | `len(lst)` | O(1) | Stored as attribute |
| **Append** | `lst.append(x)` | O(1)* | *Amortized |
| **Extend** | `lst.extend(iter)` | O(k) | k = iterable length |
| **Insert** | `lst.insert(i, x)` | O(n) | Shifts elements |
| **Pop end** | `lst.pop()` | O(1) | Remove last |
| **Pop index** | `lst.pop(i)` | O(n) | Shifts elements |
| **Remove** | `lst.remove(x)` | O(n) | Search + shift |
| **Search** | `x in lst` | O(n) | Linear scan |
| **Index** | `lst.index(x)` | O(n) | Find first occurrence |
| **Count** | `lst.count(x)` | O(n) | Count all occurrences |
| **Sort** | `lst.sort()` | O(n log n) | Timsort (in-place) |
| **Reverse** | `lst.reverse()` | O(n) | In-place swap |
| **Copy** | `lst.copy()` | O(n) | Shallow copy |
| **Slice** | `lst[a:b]` | O(k) | k = slice length |

#### List Comprehensions

```python
# Pythonic way to create lists
squares = [x**2 for x in range(10)]          # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
evens = [x for x in range(20) if x % 2 == 0] # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
```

List comprehensions are typically **faster** than equivalent for-loops due to internal optimizations.

### Common Pitfalls with Python Lists

#### Pitfall 1: Shallow vs Deep Copy 🔥

This is the **#1 source of bugs** for Python beginners:

```python
import copy

# DANGER: Assignment creates a REFERENCE, not a copy
original = [[1, 2], [3, 4]]
reference = original          # Both point to SAME list!
reference[0][0] = 99
print(original)               # [[99, 2], [3, 4]] ← Original modified!

# CAUTION: Shallow copy - new outer list, shared inner objects
shallow = original.copy()     # or original[:] or list(original)
shallow[0][0] = 77
print(original)               # [[77, 2], [3, 4]] ← Still connected!

# SAFE: Deep copy - completely independent
deep = copy.deepcopy(original)
deep[0][0] = 55
print(original)               # [[77, 2], [3, 4]] ← Original unchanged!
```

#### Pitfall 2: Default Mutable Arguments

```python
# WRONG: Default list persists between calls!
def add_item(item, my_list=[]):
    my_list.append(item)
    return my_list

print(add_item("a"))  # ['a']
print(add_item("b"))  # ['a', 'b'] ← Unexpected!

# CORRECT: Use None as default
def add_item(item, my_list=None):
    if my_list is None:
        my_list = []
    my_list.append(item)
    return my_list
```

#### Pitfall 3: Modifying List While Iterating

```python
# WRONG: Skips elements!
items = [1, 2, 3, 4, 5]
for item in items:
    if item % 2 == 0:
        items.remove(item)

# CORRECT: Create new list or iterate over copy
items = [x for x in items if x % 2 != 0]  # List comprehension
```

---

## Part 3: Hash Tables - Foundation

### What is a Hash Table?

A **hash table** (also called hash map, dictionary, or associative array) stores **key-value pairs** with near-instant access. It uses a mathematical function to convert keys into array indices.

#### The Filing Cabinet Analogy 🗄️

Imagine a smart filing cabinet with 26 drawers (A-Z):

```
┌─────────────────────────────────────────┐
│         SMART FILING CABINET            │
├───┬───────────────────────────────────┬─┤
│ A │ Adams: $5000, Allen: $3000        │←┤
├───┼───────────────────────────────────┤ │
│ B │ Baker: $7500, Brown: $4200        │ │
├───┼───────────────────────────────────┤ │
│ S │ Smith: $6800 ← FOUND INSTANTLY!   │←┘
├───┼───────────────────────────────────┤
│...│                                   │
└───┴───────────────────────────────────┘
```

**Key insight**: You don't search through all files—you go directly to the right drawer based on a rule (hash function).

### How Hashing Works

```
┌─────────────┐     ┌───────────────┐     ┌─────────────┐
│    KEY      │ ──→ │ HASH FUNCTION │ ──→ │    INDEX    │
│  "apple"    │     │  (math magic) │     │      7      │
└─────────────┘     └───────────────┘     └─────────────┘
                                                 │
                                                 ▼
    Index: [0]  [1]  [2]  [3]  [4]  [5]  [6]  [7]  [8]  [9]
    Data:  [ ]  [ ]  [ ]  [ ]  [ ]  [ ]  [ ] [🍎] [ ]  [ ]
```

**Hash function requirements:**
- **Deterministic**: Same input always produces same output
- **Fast**: O(1) computation
- **Uniform**: Spreads keys evenly across buckets
- **Minimal collisions**: Different keys rarely produce same hash

### Collision Handling

When two different keys produce the same hash (a **collision**), we need a strategy:

#### Strategy 1: Chaining (Separate Chaining)

Each bucket contains a linked list:

```
Index 0: ──→ ["cat": 1] ──→ ["dog": 2] ──→ None
Index 1: ──→ None
Index 2: ──→ ["fish": 3] ──→ None
```

#### Strategy 2: Open Addressing (Linear Probing)

If a slot is taken, check the next slot:

```
"cat" hashes to 3, but 3 is taken, so try 4:

Index: [0]    [1]    [2]    [3]     [4]    [5]
Data:  ["a"]  ["b"]  [   ]  ["dog"] ["cat"] [   ]
```

### Time Complexity for Hash Tables

| Operation | Average Case | Worst Case |
|-----------|-------------|------------|
| **Insert** | **O(1)** | O(n) |
| **Search** | **O(1)** | O(n) |
| **Delete** | **O(1)** | O(n) |

---

## Part 4: Python Dictionaries Deep Dive

### Dictionary Internal Implementation

Python dictionaries use **open addressing** with a compact representation:

- Initial size: **8 slots** (always power of 2)
- Resize when load factor exceeds **2/3 (~66.7%)**
- **Python 3.7+**: Dictionaries maintain **insertion order**

### Dictionary Methods and Operations

```python
# Creation
d = {'a': 1, 'b': 2}           # Literal
d = dict(a=1, b=2)             # Constructor
d = {x: x**2 for x in range(5)} # Comprehension

# Access
d['key']                        # KeyError if missing
d.get('key', 'default')         # 'default' if missing

# Modification
d['key'] = value                # Insert or update
d.setdefault('key', 'default')  # Insert only if missing
d.update({'c': 3, 'd': 4})      # Merge another dict

# Removal
d.pop('key', 'default')         # Remove and return
d.popitem()                     # Remove last item (LIFO)
```

### The collections Module

```python
from collections import Counter, defaultdict

# Counter - Frequency Counting
c = Counter('mississippi')  # Counter({'i': 4, 's': 4, 'p': 2, 'm': 1})
c.most_common(2)            # [('i', 4), ('s', 4)]

# defaultdict - Auto-Initialize Missing Keys
groups = defaultdict(list)
groups['fruits'].append('apple')  # No KeyError!
```

### Common Pitfalls with Dictionaries

```python
# Unhashable Keys
d = {[1, 2, 3]: 'value'}  # TypeError! Use tuple instead

# Modifying While Iterating
for key in list(d.keys()):  # Iterate over copy
    if d[key] == 0:
        del d[key]
```

---

## Part 5: When to Use Arrays vs Hash Tables

### Decision Framework

| Need | Use |
|------|-----|
| Access by position (index) | **Array (list)** |
| Key-value association | **Hash table (dict)** |
| Fast membership testing | **Hash set (set)** |
| Maintain order, iterate sequentially | **Array (list)** |

### Performance Comparison

| Operation | List | Dict/Set |
|-----------|------|----------|
| Access by index | **O(1)** ✓ | N/A |
| Access by key | O(n) | **O(1)** ✓ |
| Search (`in`) | O(n) | **O(1)** ✓ |
| Memory efficiency | Better | ~30% overhead |

---

## Part 6: Ten Comprehensive Examples

---

### Problem 1: Find Maximum and Minimum in Array

#### Problem Statement
Given an array of integers, find and return both the maximum and minimum elements.

```
Input:  [3, 1, 8, 2, 5, 10, 6]
Output: Maximum: 10, Minimum: 1
```

#### Pseudocode
```
FUNCTION findMaxMin(arr):
    IF arr is empty: RETURN None, None
    SET max_val = min_val = arr[0]
    FOR each element in arr[1:]:
        IF element > max_val: max_val = element
        ELSE IF element < min_val: min_val = element
    RETURN max_val, min_val
```

#### Flowchart
```
       ┌─────────┐
       │  START  │
       └────┬────┘
            ▼
    ┌───────────────┐
    │ Empty array?  │──YES──► Return None, None
    └───────┬───────┘
         NO │
            ▼
    ┌───────────────┐
    │max=min=arr[0] │
    └───────┬───────┘
            ▼
    ┌───────────────┐
    │ For each num  │◄─────────┐
    │  in arr[1:]   │          │
    └───────┬───────┘          │
            ▼                  │
    ┌───────────────┐          │
    │ num > max?    │─YES─► max = num ─┐
    └───────┬───────┘                  │
         NO │                          │
            ▼                          │
    ┌───────────────┐                  │
    │ num < min?    │─YES─► min = num ─┤
    └───────┬───────┘                  │
            └──────────────────────────┘
            │ (done iterating)
            ▼
    ┌───────────────┐
    │Return max,min │
    └───────────────┘
```

#### Step-by-Step Breakdown
1. **Handle edge case**: Check if array is empty
2. **Initialize**: Set both max and min to first element
3. **Single pass**: Iterate through remaining elements
4. **Compare and update**: Update max if larger, min if smaller
5. **Return result**: Return final max and min

#### Python Code
```python
def find_max_min(arr):
    """
    Find the maximum and minimum elements in an array.
    
    Time Complexity: O(n) - single pass through array
    Space Complexity: O(1) - only two variables
    """
    if not arr:
        return None, None
    
    max_val = arr[0]
    min_val = arr[0]
    
    for i in range(1, len(arr)):
        if arr[i] > max_val:
            max_val = arr[i]
        elif arr[i] < min_val:
            min_val = arr[i]
    
    return max_val, min_val

# Test
print(find_max_min([3, 1, 8, 2, 5, 10, 6]))  # (10, 1)
print(find_max_min([-8, -3, -10, -32, -1]))  # (-1, -32)
```

#### Detailed Description
This problem teaches **array traversal with running state**. We maintain two variables tracking the best values seen so far.

**Why initialize with arr[0]?** Using 0 would fail for all-negative arrays like `[-5, -3, -8]`.

**Why elif?** When a number is the new maximum, it can't also be the new minimum—saves one comparison per iteration.

**Complexity**: O(n) time (must examine every element), O(1) space (two variables regardless of size).

---

### Problem 2: Contains Duplicate

#### Problem Statement
Return `true` if any value appears at least twice in the array.

```
Input:  nums = [1, 2, 3, 1]
Output: true
```

#### Pseudocode
```
FUNCTION containsDuplicate(nums):
    CREATE empty set 'seen'
    FOR each num in nums:
        IF num in seen: RETURN True
        ADD num to seen
    RETURN False
```

#### Flowchart
```
       ┌─────────┐
       │  START  │
       └────┬────┘
            ▼
    ┌───────────────┐
    │ seen = set()  │
    └───────┬───────┘
            ▼
    ┌───────────────┐
    │For each num   │◄─────────┐
    └───────┬───────┘          │
            ▼                  │
    ┌───────────────┐          │
    │num in seen?   │─YES─► Return True
    └───────┬───────┘          │
         NO │                  │
            ▼                  │
    ┌───────────────┐          │
    │ seen.add(num) │──────────┘
    └───────────────┘
            │ (done)
            ▼
    ┌───────────────┐
    │ Return False  │
    └───────────────┘
```

#### Python Code
```python
def contains_duplicate(nums):
    """
    Check for duplicates using a hash set.
    
    Time Complexity: O(n) - single pass with O(1) set operations
    Space Complexity: O(n) - set may store all elements
    """
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False

# One-liner alternative
def contains_duplicate_oneliner(nums):
    return len(set(nums)) != len(nums)

# Test
print(contains_duplicate([1, 2, 3, 1]))  # True
print(contains_duplicate([1, 2, 3, 4]))  # False
```

#### Detailed Description
This introduces **hash sets for O(1) membership testing**. The key insight: `if x in list` is O(n), but `if x in set` is O(1).

---

### Problem 3: Two Sum

#### Problem Statement
Return indices of two numbers that add up to target.

```
Input:  nums = [2, 7, 11, 15], target = 9
Output: [0, 1]  (nums[0] + nums[1] = 9)
```

#### Pseudocode
```
FUNCTION twoSum(nums, target):
    CREATE empty map num_to_index
    FOR index i, number num in nums:
        complement = target - num
        IF complement in num_to_index:
            RETURN [num_to_index[complement], i]
        num_to_index[num] = i
    RETURN []
```

#### Flowchart
```
       ┌─────────────┐
       │    START    │
       └──────┬──────┘
              ▼
    ┌─────────────────┐
    │num_to_index = {}│
    └────────┬────────┘
              ▼
    ┌─────────────────┐
    │ For i, num in   │◄────────────────┐
    │ enumerate(nums) │                 │
    └────────┬────────┘                 │
              ▼                         │
    ┌─────────────────┐                 │
    │complement =     │                 │
    │ target - num    │                 │
    └────────┬────────┘                 │
              ▼                         │
    ┌─────────────────┐                 │
    │complement in    │─YES─► Return [old_idx, i]
    │num_to_index?    │                 │
    └────────┬────────┘                 │
          NO │                          │
              ▼                         │
    ┌─────────────────┐                 │
    │num_to_index     │                 │
    │  [num] = i      │─────────────────┘
    └─────────────────┘
```

#### Step-by-Step Walkthrough
With `nums = [2, 7, 11, 15]`, `target = 9`:

| Step | num | complement | Map | Action |
|------|-----|------------|-----|--------|
| i=0 | 2 | 7 | {} | 7 not found → add {2:0} |
| i=1 | 7 | 2 | {2:0} | **2 found!** Return [0,1] ✓ |

#### Python Code
```python
def two_sum(nums, target):
    """
    Find two numbers that add up to target.
    
    Key insight: For each number, we know exactly what complement
    we need (target - num). Hash map gives O(1) lookup.
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    num_to_index = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        
        if complement in num_to_index:
            return [num_to_index[complement], i]
        
        num_to_index[num] = i
    
    return []

# Test
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))       # [1, 2]
print(two_sum([3, 3], 6))          # [0, 1]
```

#### Detailed Description
The **complement pattern** is fundamental: instead of checking all pairs (O(n²)), we ask "Have I seen my partner before?" using a hash map (O(n)).

**Why check before adding?** For `[3, 3]` with target 6, adding first would let us find 3 at index 0 when processing index 0—using the same element twice!

---

### Problem 4: Valid Anagram

#### Problem Statement
Check if string `t` is an anagram of string `s`.

```
Input:  s = "anagram", t = "nagaram"
Output: true
```

#### Pseudocode
```
FUNCTION isAnagram(s, t):
    IF len(s) ≠ len(t): RETURN False
    char_count = {}
    FOR i in range(len(s)):
        char_count[s[i]] += 1
        char_count[t[i]] -= 1
    RETURN all counts are 0
```

#### Flowchart
```
       ┌─────────────┐
       │    START    │
       └──────┬──────┘
              ▼
    ┌─────────────────┐
    │len(s) == len(t)?│─NO─► Return False
    └────────┬────────┘
          YES│
              ▼
    ┌─────────────────┐
    │ char_count = {} │
    └────────┬────────┘
              ▼
    ┌─────────────────┐
    │ For i in range  │◄────┐
    │   (len(s))      │     │
    └────────┬────────┘     │
              ▼             │
    ┌─────────────────┐     │
    │count[s[i]] += 1 │     │
    │count[t[i]] -= 1 │─────┘
    └────────┬────────┘
              │ (done)
              ▼
    ┌─────────────────┐
    │All counts == 0? │
    └────┬───────┬────┘
      YES│       │NO
         ▼       ▼
    Return True  Return False
```

#### Python Code
```python
from collections import Counter

def is_anagram(s, t):
    """
    Check if t is an anagram of s using frequency counting.
    
    Time Complexity: O(n)
    Space Complexity: O(1) - at most 26 characters
    """
    if len(s) != len(t):
        return False
    
    char_count = {}
    for i in range(len(s)):
        char_count[s[i]] = char_count.get(s[i], 0) + 1
        char_count[t[i]] = char_count.get(t[i], 0) - 1
    
    return all(count == 0 for count in char_count.values())

# One-liner with Counter
def is_anagram_counter(s, t):
    return Counter(s) == Counter(t)

# Test
print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False
```

#### Detailed Description
**Character frequency counting** is key. For anagrams, every character "added" by s must be "removed" by t, leaving all counts at zero.

---

### Problem 5: Intersection of Two Arrays

#### Problem Statement
Return unique elements common to both arrays.

```
Input:  nums1 = [1, 2, 2, 1], nums2 = [2, 2]
Output: [2]
```

#### Python Code
```python
def intersection(nums1, nums2):
    """
    Find intersection using set operations.
    
    Time Complexity: O(n + m)
    Space Complexity: O(n + m)
    """
    return list(set(nums1) & set(nums2))

# Test
print(intersection([1, 2, 2, 1], [2, 2]))        # [2]
print(intersection([4, 9, 5], [9, 4, 9, 8, 4]))  # [4, 9]
```

#### Detailed Description
Python's **set intersection** (`&`) efficiently finds common elements. Sets provide automatic deduplication and O(1) membership testing.

---

### Problem 6: Group Anagrams

#### Problem Statement
Group strings that are anagrams of each other.

```
Input:  ["eat", "tea", "tan", "ate", "nat", "bat"]
Output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]]
```

#### Pseudocode
```
FUNCTION groupAnagrams(strs):
    anagram_groups = defaultdict(list)
    FOR each word in strs:
        count = [0] * 26
        FOR each char in word:
            count[char - 'a'] += 1
        key = tuple(count)
        anagram_groups[key].append(word)
    RETURN list(anagram_groups.values())
```

#### Flowchart
```
       ┌─────────────────┐
       │      START      │
       └────────┬────────┘
                ▼
    ┌────────────────────┐
    │anagram_groups = {} │
    └────────┬───────────┘
                ▼
    ┌────────────────────┐
    │ For each word      │◄──────────────┐
    └────────┬───────────┘               │
                ▼                        │
    ┌────────────────────┐               │
    │count = [0] * 26    │               │
    │                    │               │
    │For char in word:   │               │
    │ count[ord(char)    │               │
    │  - ord('a')] += 1  │               │
    └────────┬───────────┘               │
                ▼                        │
    ┌────────────────────┐               │
    │key = tuple(count)  │               │
    └────────┬───────────┘               │
                ▼                        │
    ┌────────────────────┐               │
    │anagram_groups[key] │               │
    │  .append(word)     │───────────────┘
    └────────┬───────────┘
                │ (done)
                ▼
    ┌────────────────────┐
    │Return list(values) │
    └────────────────────┘
```

#### Python Code
```python
from collections import defaultdict

def group_anagrams(strs):
    """
    Group anagrams using character count as hash key.
    
    Key insight: All anagrams share identical character frequencies.
    
    Time Complexity: O(n * k) where n = strings, k = max length
    Space Complexity: O(n * k)
    """
    anagram_groups = defaultdict(list)
    
    for word in strs:
        count = [0] * 26
        for char in word:
            count[ord(char) - ord('a')] += 1
        
        key = tuple(count)  # Lists aren't hashable, tuples are
        anagram_groups[key].append(word)
    
    return list(anagram_groups.values())

# Test
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(group_anagrams(strs))
# [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]
```

#### Detailed Description
**Hash map grouping with computed keys**: All anagrams produce the same frequency tuple, so they're automatically grouped together. Using `tuple(count)` instead of sorting gives O(k) vs O(k log k) per word.

---

### Problem 7: Top K Frequent Elements

#### Problem Statement
Return the k most frequent elements.

```
Input:  nums = [1,1,1,2,2,3], k = 2
Output: [1, 2]
```

#### Pseudocode
```
FUNCTION topKFrequent(nums, k):
    count = Counter(nums)
    buckets = [[] for _ in range(len(nums) + 1)]
    FOR num, freq in count.items():
        buckets[freq].append(num)
    result = []
    FOR freq from len(buckets)-1 down to 0:
        FOR num in buckets[freq]:
            result.append(num)
            IF len(result) == k: RETURN result
    RETURN result
```

#### Flowchart
```
       ┌─────────────────┐
       │      START      │
       └────────┬────────┘
                ▼
    ┌─────────────────────┐
    │count = Counter(nums)│
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │buckets = [[]] *     │
    │         (len+1)     │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │For num, freq in     │
    │ count.items():      │
    │  buckets[freq]      │
    │    .append(num)     │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │result = []          │
    │For freq = n → 1:    │
    │ For num in bucket:  │
    │  result.append(num) │
    │  if len==k: return  │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │   Return result     │
    └─────────────────────┘
```

#### Python Code
```python
from collections import Counter

def top_k_frequent(nums, k):
    """
    Find k most frequent elements using bucket sort.
    
    Key insight: Maximum frequency is n, so use frequency as index.
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    count = Counter(nums)
    
    # Bucket index = frequency, value = list of numbers with that frequency
    buckets = [[] for _ in range(len(nums) + 1)]
    
    for num, freq in count.items():
        buckets[freq].append(num)
    
    # Collect from highest frequency
    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    
    return result

# Test
print(top_k_frequent([1,1,1,2,2,3], 2))  # [1, 2]
```

#### Detailed Description
**Bucket sort optimization**: Since frequencies range from 0 to n, we use frequency as an array index. This avoids O(n log n) sorting for O(n) bucket placement.

---

### Problem 8: Product of Array Except Self

#### Problem Statement
Return array where each element is the product of all other elements. No division allowed.

```
Input:  [1, 2, 3, 4]
Output: [24, 12, 8, 6]
```

#### Pseudocode
```
FUNCTION productExceptSelf(nums):
    n = len(nums)
    answer = [1] * n
    
    // Forward pass: prefix products
    prefix = 1
    FOR i from 0 to n-1:
        answer[i] = prefix
        prefix *= nums[i]
    
    // Backward pass: multiply by suffix products
    suffix = 1
    FOR i from n-1 down to 0:
        answer[i] *= suffix
        suffix *= nums[i]
    
    RETURN answer
```

#### Flowchart
```
       ┌─────────────────┐
       │      START      │
       └────────┬────────┘
                ▼
    ┌─────────────────────┐
    │ answer = [1] * n    │
    │ prefix = 1          │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │ FORWARD PASS        │
    │ For i = 0 to n-1:   │
    │  answer[i] = prefix │
    │  prefix *= nums[i]  │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │ suffix = 1          │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │ BACKWARD PASS       │
    │ For i = n-1 to 0:   │
    │  answer[i] *= suffix│
    │  suffix *= nums[i]  │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │   Return answer     │
    └─────────────────────┘
```

#### Step-by-Step Walkthrough
With `nums = [1, 2, 3, 4]`:

**Forward Pass (prefix products):**
| i | prefix | answer[i] | Update prefix |
|---|--------|-----------|---------------|
| 0 | 1 | 1 | 1*1=1 |
| 1 | 1 | 1 | 1*2=2 |
| 2 | 2 | 2 | 2*3=6 |
| 3 | 6 | 6 | 6*4=24 |

answer = [1, 1, 2, 6]

**Backward Pass (multiply by suffix):**
| i | suffix | answer[i] | Update suffix |
|---|--------|-----------|---------------|
| 3 | 1 | 6*1=6 | 1*4=4 |
| 2 | 4 | 2*4=8 | 4*3=12 |
| 1 | 12 | 1*12=12 | 12*2=24 |
| 0 | 24 | 1*24=24 | 24*1=24 |

answer = [24, 12, 8, 6] ✓

#### Python Code
```python
def product_except_self(nums):
    """
    Product of array except self using prefix/suffix products.
    
    Key insight: answer[i] = (product of left) × (product of right)
    
    Time Complexity: O(n)
    Space Complexity: O(1) extra (output doesn't count)
    """
    n = len(nums)
    answer = [1] * n
    
    # Forward: answer[i] = product of elements before i
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix *= nums[i]
    
    # Backward: multiply by product of elements after i
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    
    return answer

# Test
print(product_except_self([1, 2, 3, 4]))  # [24, 12, 8, 6]
```

#### Detailed Description
**Prefix-suffix decomposition**: For index i, the answer is `left_product × right_product`. We compute all left products in one pass, then all right products in another, combining them in-place.

---

### Problem 9: Longest Consecutive Sequence

#### Problem Statement
Find the length of the longest consecutive elements sequence. Must run in O(n) time.

```
Input:  [100, 4, 200, 1, 3, 2]
Output: 4 (sequence [1, 2, 3, 4])
```

#### Pseudocode
```
FUNCTION longestConsecutive(nums):
    num_set = set(nums)
    longest = 0
    
    FOR num in num_set:
        // Only start counting from sequence beginnings
        IF num - 1 NOT IN num_set:
            current = num
            length = 1
            WHILE current + 1 IN num_set:
                current += 1
                length += 1
            longest = max(longest, length)
    
    RETURN longest
```

#### Flowchart
```
       ┌─────────────────┐
       │      START      │
       └────────┬────────┘
                ▼
    ┌─────────────────────┐
    │num_set = set(nums)  │
    │longest = 0          │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │  For num in num_set │◄──────────────────┐
    └────────┬────────────┘                   │
                ▼                             │
    ┌─────────────────────┐                   │
    │num - 1 in num_set?  │─YES───────────────┤
    └────────┬────────────┘ (skip, not start) │
          NO │ (this IS a start)              │
                ▼                             │
    ┌─────────────────────┐                   │
    │current = num        │                   │
    │length = 1           │                   │
    └────────┬────────────┘                   │
                ▼                             │
    ┌─────────────────────┐                   │
    │current+1 in num_set?│─YES─┐             │
    └────────┬────────────┘     │             │
          NO │                  ▼             │
             │         ┌────────────────┐     │
             │         │current += 1    │     │
             │         │length += 1     │─────┤
             │         └────────────────┘     │
                ▼                             │
    ┌─────────────────────┐                   │
    │longest = max(       │                   │
    │  longest, length)   │───────────────────┘
    └────────┬────────────┘
                │ (done)
                ▼
    ┌─────────────────────┐
    │   Return longest    │
    └─────────────────────┘
```

#### Python Code
```python
def longest_consecutive(nums):
    """
    Find longest consecutive sequence using hash set.
    
    Key insight: Only count from sequence STARTS (num-1 not in set).
    This ensures each element is visited at most twice → O(n).
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        # Only start counting if this is the START of a sequence
        if num - 1 not in num_set:
            current = num
            length = 1
            
            while current + 1 in num_set:
                current += 1
                length += 1
            
            longest = max(longest, length)
    
    return longest

# Test
print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # 4
print(longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))  # 9
```

#### Detailed Description
**Sequence start detection**: By only initiating counts from elements without predecessors, we ensure each element participates in exactly one sequence count. Without this optimization, counting from every element would give O(n²) for sorted arrays.

---

### Problem 10: Subarray Sum Equals K

#### Problem Statement
Count subarrays whose sum equals k.

```
Input:  nums = [1, 1, 1], k = 2
Output: 2 (subarrays [1,1] at indices 0-1 and 1-2)
```

#### Pseudocode
```
FUNCTION subarraySum(nums, k):
    prefix_count = {0: 1}  // Empty prefix has sum 0
    current_sum = 0
    count = 0
    
    FOR each num in nums:
        current_sum += num
        IF (current_sum - k) IN prefix_count:
            count += prefix_count[current_sum - k]
        prefix_count[current_sum] += 1
    
    RETURN count
```

#### Flowchart
```
       ┌─────────────────┐
       │      START      │
       └────────┬────────┘
                ▼
    ┌─────────────────────┐
    │prefix_count = {0: 1}│
    │current_sum = 0      │
    │count = 0            │
    └────────┬────────────┘
                ▼
    ┌─────────────────────┐
    │   For num in nums   │◄──────────────────┐
    └────────┬────────────┘                   │
                ▼                             │
    ┌─────────────────────┐                   │
    │current_sum += num   │                   │
    └────────┬────────────┘                   │
                ▼                             │
    ┌─────────────────────┐                   │
    │(current_sum - k) in │                   │
    │  prefix_count?      │─YES─┐             │
    └────────┬────────────┘     │             │
          NO │                  ▼             │
             │    ┌─────────────────────┐     │
             │    │count += prefix_count│     │
             │    │  [current_sum - k]  │     │
             │    └──────────┬──────────┘     │
             │               │                │
                ▼            ▼                │
    ┌─────────────────────────────┐           │
    │prefix_count[current_sum]++ │───────────┘
    └────────┬────────────────────┘
                │ (done)
                ▼
    ┌─────────────────────┐
    │    Return count     │
    └─────────────────────┘
```

#### Step-by-Step Walkthrough
With `nums = [1, 2, 3]`, `k = 3`:

| Step | num | current_sum | Check sum-k | prefix_count | count |
|------|-----|-------------|-------------|--------------|-------|
| init | - | 0 | - | {0:1} | 0 |
| 1 | 1 | 1 | 1-3=-2 (not found) | {0:1, 1:1} | 0 |
| 2 | 2 | 3 | 3-3=0 (**found 1 time!**) | {0:1, 1:1, 3:1} | **1** |
| 3 | 3 | 6 | 6-3=3 (**found 1 time!**) | {0:1, 1:1, 3:1, 6:1} | **2** |

Result: 2 subarrays ([1,2] and [3])

#### Python Code
```python
def subarray_sum(nums, k):
    """
    Count subarrays with sum k using prefix sum + hash map.
    
    Key insight: If prefix[j] - prefix[i] = k, then subarray
    from i+1 to j sums to k. We track how many times each
    prefix sum has occurred.
    
    Time Complexity: O(n)
    Space Complexity: O(n)
    """
    # {0: 1} handles subarrays starting at index 0
    prefix_count = {0: 1}
    current_sum = 0
    count = 0
    
    for num in nums:
        current_sum += num
        
        # If (current_sum - k) was seen before, those positions
        # mark valid subarray starting points
        if current_sum - k in prefix_count:
            count += prefix_count[current_sum - k]
        
        # Record this prefix sum (AFTER checking to avoid length-0 subarrays)
        prefix_count[current_sum] = prefix_count.get(current_sum, 0) + 1
    
    return count

# Test
print(subarray_sum([1, 1, 1], 2))  # 2
print(subarray_sum([1, 2, 3], 3))  # 2
```

#### Detailed Description
**Prefix sum + hash map** is a powerful pattern. The mathematical foundation:
- `prefix[j]` = sum of nums[0..j]
- Sum of subarray nums[i..j] = prefix[j] - prefix[i-1]
- We want this = k, so prefix[i-1] = prefix[j] - k

By tracking prefix sum frequencies, we count how many valid start positions exist for each endpoint.

**Why {0: 1}?** It handles subarrays starting at index 0 (prefix[j] - 0 = k means the entire prefix sums to k).

---

## Quick Reference Cheat Sheet

### Time Complexity Summary

| Problem | Technique | Time | Space |
|---------|-----------|------|-------|
| Find Max/Min | Linear scan | O(n) | O(1) |
| Contains Duplicate | Hash set | O(n) | O(n) |
| Two Sum | Hash map (complement) | O(n) | O(n) |
| Valid Anagram | Frequency count | O(n) | O(1) |
| Intersection | Set operations | O(n+m) | O(n+m) |
| Group Anagrams | Hash map grouping | O(n×k) | O(n×k) |
| Top K Frequent | Bucket sort | O(n) | O(n) |
| Product Except Self | Prefix/suffix | O(n) | O(1) |
| Longest Consecutive | Hash set + start detection | O(n) | O(n) |
| Subarray Sum K | Prefix sum + hash map | O(n) | O(n) |

### Key Patterns

```
┌─────────────────────────────────────────────────────────────┐
│                     PATTERN RECOGNITION                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  "Find duplicate / seen before"  →  Hash Set                │
│                                                             │
│  "Two numbers sum to X"          →  Hash Map (complement)   │
│                                                             │
│  "Count frequencies"             →  Counter / defaultdict   │
│                                                             │
│  "Group by property"             →  Hash Map (computed key) │
│                                                             │
│  "Subarray sum"                  →  Prefix Sum + Hash Map   │
│                                                             │
│  "Product/sum except current"    →  Prefix + Suffix arrays  │
│                                                             │
│  "Consecutive sequence"          →  Hash Set + start detect │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Python Quick Reference

```python
# Lists
lst = [1, 2, 3]
lst.append(4)           # O(1) - add to end
lst.pop()               # O(1) - remove from end
lst.insert(0, x)        # O(n) - insert at beginning
x in lst                # O(n) - linear search

# Sets
s = {1, 2, 3}
s.add(4)                # O(1) - add element
s.remove(1)             # O(1) - remove element
x in s                  # O(1) - membership test
s1 & s2                 # O(min(n,m)) - intersection
s1 | s2                 # O(n+m) - union

# Dicts
d = {'a': 1, 'b': 2}
d['c'] = 3              # O(1) - insert
d.get('x', default)     # O(1) - safe access
d.pop('a')              # O(1) - remove
x in d                  # O(1) - key membership

# Counter
from collections import Counter
c = Counter([1,1,2,3])  # Counter({1: 2, 2: 1, 3: 1})
c.most_common(2)        # [(1, 2), (2, 1)]

# defaultdict
from collections import defaultdict
dd = defaultdict(list)
dd['key'].append(val)   # Auto-creates list if missing
```

### Memory Model Reminders

```
┌─────────────────────────────────────────────────────────────┐
│                    COPY BEHAVIOR                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  a = b           →  REFERENCE (same object!)                │
│  a = b.copy()    →  SHALLOW COPY (nested objects shared)    │
│  a = deepcopy(b) →  DEEP COPY (fully independent)           │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                   HASHABLE TYPES                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ✓ Can be dict key/set element:                             │
│    int, float, str, bool, tuple (of immutables), frozenset  │
│                                                             │
│  ✗ Cannot be dict key/set element:                          │
│    list, dict, set                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Conclusion

You've now mastered the **two most fundamental data structures** in programming. Here are your key takeaways:

**Arrays (Python Lists):**
- O(1) access by index due to contiguous memory
- O(n) insertion/deletion in middle due to shifting
- Watch for shallow copy bugs with nested structures

**Hash Tables (Python Dicts/Sets):**
- O(1) average access by key due to hashing
- Transform O(n²) brute force into O(n) solutions
- Use for: duplicates, complements, grouping, counting

**Pattern Recognition:**
- "Have I seen this before?" → Hash Set
- "What's my partner?" → Hash Map with complement
- "How many of each?" → Counter
- "Subarray sum?" → Prefix Sum + Hash Map

These ten problems aren't just exercises—they're **templates** for countless variations you'll encounter. Master them, and you'll recognize solutions instantly.

*Happy coding!* 🚀