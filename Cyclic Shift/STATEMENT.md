A large binary number is represented by a string A of size N and
comprises of 0, and 1. You must perform a cyclic shift on this string. The cyclic shift operation is defined as follows:

If the string A is [Ag, Ay, As,..., Ay_1], then after performing one
cyclic shift, the string becomes [Ay, A, ..., Ax_1, Ag].

You performed the shift infinite number of times and each time you recorded the value of the binary number represented by the string. The maximum binary number formed after performing (possibly 0) the operation is B. Your task is to determine the number of cyclic shifts that can be performed such that the value represented by the string A will be equal to B for the K’ th time.

### Input format

- First line: A single integer T denoting the number of test cases
- For each test case:
  - First line: Two space-separated integers N and K
  - Second line: A denoting the string

### Output format

For each test case, print a single line containing one integer that represents the number of cyclic shift operations performed such that the value represented by string A is equal to B for the K" time.
