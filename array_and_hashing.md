# Arrays & Hashing: Complete Guide for Beginners

## Part 1: Simple Explanation for Programming Beginners

### What are Arrays?

Think of an array like a **shopping list** or a **row of lockers**:

- **Ordered collection**: Each item has a position (index)
- **Fixed sequence**: Items stay in the same order unless you change them
- **Quick access**: You can directly go to any position

**Simple Example**:
```
Shopping List:
Position 0: "Milk"
Position 1: "Eggs" 
Position 2: "Bread"
Position 3: "Butter"
```

### What is Hashing?

Think of hashing like a **magic mailbox system**:

- **Key-Value pairs**: Each name (key) has a specific mailbox (value)
- **Fast lookup**: No need to check all mailboxes - go directly to the right one
- **Unique keys**: Each person has their own mailbox

**Simple Example**:
```
Classroom Seating:
"Alice" -> Seat 3A
"Bob" -> Seat 2B  
"Charlie" -> Seat 1C
```

## Part 2: Python-Specific Deep Dive

### Arrays in Python (Lists)

```python
# Creating arrays (lists) in Python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", 3.14, True]

# Accessing elements
print(fruits[0])    # "apple" - first element
print(fruits[-1])   # "cherry" - last element

# Modifying arrays
fruits[1] = "blueberry"  # Change element
fruits.append("orange")  # Add to end
fruits.pop(0)           # Remove first element
```

### Hashing in Python (Dictionaries)

```python
# Creating dictionaries
student_grades = {"Alice": 85, "Bob": 92, "Charlie": 78}
phone_book = {"emergency": "911", "mom": "555-1234"}

# Accessing values
print(student_grades["Alice"])  # 85

# Modifying dictionaries
student_grades["Diana"] = 88    # Add new entry
student_grades["Bob"] = 95      # Update existing
del student_grades["Charlie"]   # Remove entry
```

## Part 3: 10 Comprehensive Examples

### Example 1: Two Sum

**Question**: Find two numbers that add up to a target

```python
def two_sum(nums, target):
    """
    Find indices of two numbers that add up to target
    
    Approach: Use hash map to store numbers and their indices
    Time: O(n), Space: O(n)
    """
    num_map = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in num_map:
            return [num_map[complement], i]
        num_map[num] = i
    
    return []

# Example usage
nums = [2, 7, 11, 15]
target = 9
print(two_sum(nums, target))  # [0, 1]
```

**Pseudo Code**:
```
1. Create empty hash map
2. For each number with index:
   a. Calculate complement = target - current number
   b. If complement in hash map, return both indices
   c. Else store current number and index in hash map
```

**Flowchart**:
```
Start → Create empty map → Loop through numbers → 
Calculate complement → Complement in map? → 
Yes: Return indices → No: Store in map → Continue
```

**Step-by-Step**:
1. Input: nums = [2,7,11,15], target = 9
2. i=0, num=2, complement=7, 7 not in map → store {2:0}
3. i=1, num=7, complement=2, 2 in map → return [0,1]

---

### Example 2: Contains Duplicate

**Question**: Check if array contains duplicates

```python
def contains_duplicate(nums):
    """
    Check if array contains any duplicate values
    
    Approach: Use set to track seen numbers
    Time: O(n), Space: O(n)
    """
    seen = set()
    
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    
    return False

# Example usage
print(contains_duplicate([1,2,3,1]))  # True
print(contains_duplicate([1,2,3,4]))  # False
```

**Pseudo Code**:
```
1. Create empty set
2. For each number in array:
   a. If number in set, return True
   b. Else add number to set
3. Return False if no duplicates found
```

**Step-by-Step**:
1. Input: [1,2,3,1]
2. seen = {}, check 1 → add {1}
3. check 2 → add {1,2}
4. check 3 → add {1,2,3}
5. check 1 → found in set → return True

---

### Example 3: Valid Anagram

**Question**: Check if two strings are anagrams

```python
def is_anagram(s, t):
    """
    Check if two strings are anagrams of each other
    
    Approach: Compare character frequency using hash map
    Time: O(n), Space: O(1) - fixed 26 characters
    """
    if len(s) != len(t):
        return False
    
    char_count = {}
    
    # Count characters in first string
    for char in s:
        char_count[char] = char_count.get(char, 0) + 1
    
    # Subtract characters from second string
    for char in t:
        if char not in char_count or char_count[char] == 0:
            return False
        char_count[char] -= 1
    
    return True

# Example usage
print(is_anagram("anagram", "nagaram"))  # True
print(is_anagram("rat", "car"))          # False
```

**Pseudo Code**:
```
1. If lengths different, return False
2. Create character frequency map for string s
3. For each character in string t:
   a. If character not in map or count zero, return False
   b. Else decrement count
4. Return True
```

**Step-by-Step**:
1. s="anagram", t="nagaram"
2. Count s: {'a':3, 'n':1, 'g':1, 'r':1, 'm':1}
3. Check t: subtract counts, all become zero → True

---

### Example 4: Group Anagrams

**Question**: Group words that are anagrams together

```python
def group_anagrams(strs):
    """
    Group anagrams together from list of strings
    
    Approach: Use sorted string as key in hash map
    Time: O(n * k log k) where k is max string length
    Space: O(n * k)
    """
    anagram_groups = {}
    
    for word in strs:
        # Use sorted tuple as key (immutable)
        key = tuple(sorted(word))
        
        if key not in anagram_groups:
            anagram_groups[key] = []
        anagram_groups[key].append(word)
    
    return list(anagram_groups.values())

# Example usage
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(group_anagrams(strs))
# [["eat","tea","ate"], ["tan","nat"], ["bat"]]
```

**Pseudo Code**:
```
1. Create empty hash map
2. For each word in list:
   a. Sort word characters to create key
   b. Add word to list for that key
3. Return all values from hash map
```

**Step-by-Step**:
1. "eat" → key=('a','e','t') → group1: ["eat"]
2. "tea" → key=('a','e','t') → group1: ["eat","tea"]
3. "tan" → key=('a','n','t') → group2: ["tan"]

---

### Example 5: Top K Frequent Elements

**Question**: Find K most frequent elements

```python
def top_k_frequent(nums, k):
    """
    Find k most frequent elements in array
    
    Approach: Bucket sort with frequency
    Time: O(n), Space: O(n)
    """
    # Count frequencies
    freq_map = {}
    for num in nums:
        freq_map[num] = freq_map.get(num, 0) + 1
    
    # Create buckets by frequency
    buckets = [[] for _ in range(len(nums) + 1)]
    
    for num, freq in freq_map.items():
        buckets[freq].append(num)
    
    # Get top k frequent
    result = []
    for i in range(len(buckets) - 1, 0, -1):
        if buckets[i]:
            result.extend(buckets[i])
        if len(result) >= k:
            break
    
    return result[:k]

# Example usage
nums = [1,1,1,2,2,3]
k = 2
print(top_k_frequent(nums, k))  # [1, 2]
```

**Pseudo Code**:
```
1. Count frequency of each number
2. Create buckets where index = frequency
3. Place numbers in corresponding frequency buckets
4. Collect numbers from highest to lowest frequency until k elements
```

**Step-by-Step**:
1. nums=[1,1,1,2,2,3] → freq: {1:3, 2:2, 3:1}
2. buckets: index3:[1], index2:[2], index1:[3]
3. From highest: [1], then [2] → result=[1,2]

---

### Example 6: Product of Array Except Self

**Question**: Calculate product of all elements except current

```python
def product_except_self(nums):
    """
    Calculate product of all elements except current index
    
    Approach: Prefix and suffix products
    Time: O(n), Space: O(1) excluding output
    """
    n = len(nums)
    result = [1] * n
    
    # Calculate prefix products
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    
    # Calculate suffix products and multiply
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    
    return result

# Example usage
nums = [1, 2, 3, 4]
print(product_except_self(nums))  # [24, 12, 8, 6]
```

**Pseudo Code**:
```
1. Initialize result array with 1s
2. Left pass: store prefix product up to i-1
3. Right pass: multiply with suffix product from i+1
4. Return result
```

**Step-by-Step**:
1. nums = [1,2,3,4]
2. Left pass: [1,1,2,6]
3. Right pass: [24,12,8,6]

---

### Example 7: Valid Sudoku

**Question**: Validate Sudoku board

```python
def is_valid_sudoku(board):
    """
    Validate 9x9 Sudoku board
    
    Approach: Track rows, columns, and 3x3 boxes
    Time: O(1) - fixed 81 cells, Space: O(1)
    """
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    
    for i in range(9):
        for j in range(9):
            num = board[i][j]
            if num == '.':
                continue
            
            # Check row
            if num in rows[i]:
                return False
            rows[i].add(num)
            
            # Check column
            if num in cols[j]:
                return False
            cols[j].add(num)
            
            # Check 3x3 box
            box_idx = (i // 3) * 3 + (j // 3)
            if num in boxes[box_idx]:
                return False
            boxes[box_idx].add(num)
    
    return True

# Example usage
board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
]
print(is_valid_sudoku(board))  # True
```

**Pseudo Code**:
```
1. Create sets for 9 rows, 9 columns, 9 boxes
2. For each cell in board:
   a. Skip if empty
   b. Check if number exists in current row/column/box
   c. If found, return False
   d. Else add to all three sets
3. Return True if all checks pass
```

---

### Example 8: Longest Consecutive Sequence

**Question**: Find longest consecutive sequence length

```python
def longest_consecutive(nums):
    """
    Find length of longest consecutive sequence
    
    Approach: Use set for O(1) lookups
    Time: O(n), Space: O(n)
    """
    if not nums:
        return 0
    
    num_set = set(nums)
    longest = 0
    
    for num in num_set:
        # Only start counting from beginning of sequence
        if num - 1 not in num_set:
            current_num = num
            current_streak = 1
            
            while current_num + 1 in num_set:
                current_num += 1
                current_streak += 1
            
            longest = max(longest, current_streak)
    
    return longest

# Example usage
nums = [100, 4, 200, 1, 3, 2]
print(longest_consecutive(nums))  # 4 (1,2,3,4)
```

**Pseudo Code**:
```
1. Convert array to set
2. For each number in set:
   a. If it's start of sequence (num-1 not in set)
   b. Count consecutive numbers
   c. Update longest sequence
3. Return longest
```

**Step-by-Step**:
1. Set: {100,4,200,1,3,2}
2. Start from 1: sequence 1,2,3,4 → length 4
3. Start from 100: sequence 100 → length 1
4. Start from 200: sequence 200 → length 1

---

### Example 9: Encode and Decode Strings

**Question**: Encode list of strings to single string and decode back

```python
def encode(strs):
    """
    Encode list of strings to single string
    
    Approach: Use length prefix with delimiter
    """
    encoded = ""
    for s in strs:
        encoded += str(len(s)) + "#" + s
    return encoded

def decode(s):
    """
    Decode string back to list of strings
    """
    decoded = []
    i = 0
    
    while i < len(s):
        # Find delimiter
        j = i
        while s[j] != '#':
            j += 1
        
        # Get length
        length = int(s[i:j])
        
        # Get string
        decoded.append(s[j + 1: j + 1 + length])
        
        # Move to next
        i = j + 1 + length
    
    return decoded

# Example usage
strs = ["hello", "world", "code"]
encoded = encode(strs)
decoded = decode(encoded)
print(encoded)   # "5#hello5#world4#code"
print(decoded)   # ["hello", "world", "code"]
```

**Pseudo Code for Encode**:
```
For each string:
   Append "length#string" to result
```

**Pseudo Code for Decode**:
```
1. Initialize pointer i=0
2. While i < length:
   a. Find '#' to get length
   b. Extract string using length
   c. Move pointer forward
```

---

### Example 10: First Missing Positive

**Question**: Find smallest missing positive integer

```python
def first_missing_positive(nums):
    """
    Find first missing positive integer
    
    Approach: Cyclic sort to place numbers in correct positions
    Time: O(n), Space: O(1)
    """
    n = len(nums)
    
    # Place each number in its correct position if possible
    for i in range(n):
        while 1 <= nums[i] <= n and nums[i] != nums[nums[i] - 1]:
            # Swap to correct position
            correct_pos = nums[i] - 1
            nums[i], nums[correct_pos] = nums[correct_pos], nums[i]
    
    # Find first missing positive
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    
    return n + 1

# Example usage
print(first_missing_positive([3, 4, -1, 1]))  # 2
print(first_missing_positive([1, 2, 0]))      # 3
```

**Pseudo Code**:
```
1. For each position:
   a. While number is positive and can be placed correctly:
      Swap to correct position
2. Scan array for first position where number != index+1
3. Return that missing number
```

**Step-by-Step**:
1. [3,4,-1,1] → after sorting: [1,-1,3,4]
2. First position where nums[i] != i+1: index1 → return 2

## Key Takeaways

### Arrays (Lists):
- **Ordered collections** with indices
- **Fast random access** O(1)
- **Good for** sequential data, ordered elements
- **Watch for** shifting during insertions/deletions

### Hashing (Dictionaries):
- **Key-value pairs** with unique keys
- **Fast lookups** O(1) average case
- **Good for** frequency counting, relationships
- **Watch for** hash collisions, memory usage

### When to Use Which:
- **Use Arrays** when order matters or you need index-based access
- **Use Hashing** when you need fast lookups or relationship mapping
- **Often Combine** both for optimal solutions

This comprehensive guide covers the fundamental concepts with practical examples that demonstrate real-world problem-solving patterns. Practice these examples to build strong intuition for arrays and hashing problems!