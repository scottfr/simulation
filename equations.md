# `simulation` Package Equations

The `simulation` package's equation engine provides a powerful language for specifying simulation equations. This document focuses on the core syntax, programming constructs, and built-in functions available in the language.

## Basic Syntax and Expressions

### Literals

The equation engine supports several types of literal values:

1. Numeric literals

```
42        # Integer
3.14159   # Floating point 
1.2e-5    # Scientific notation
```

2. Primitive Literals

```
[Population]                 # Refer to the Population primitive
[Birth Rate]                 # Refer to the Birth Rate primitive
```

3. Unit Literals

```
{100 people} 
{10 meters/second}
```

4. String literals

```
"Hello World" 
'Single quoted\nNext Line'
```

Single or double quotes are allowed. Common escape sequences (\n, \t, ...) are supported.

5. Boolean literals

```
true
false
```

6. Vectors (arrays) literals

```
{1, 4, 9}
{"blue", "green"}
```

7. Named vector (associative arrays/dictionaries) literals

```
{ x: 20, y: 50}
{ "John Smith": "contractor", "Jane Doe": "employee" }
```

Keys with spaces or special characters can be enclosed in quotes.

### Operators

#### Arithmetic Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `+` | Addition | `5 + 3` | `8` |
| `-` | Subtraction | `5 - 3` | `2` |
| `*` | Multiplication | `5 * 3` | `15` |
| `/` | Division | `10 / 4` | `2.5` |
| `%` or `mod` | Modulo | `10 mod 3` | `1` |
| `^` | Exponentiation | `5^2` | `25` |

#### Comparison Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `=` or `==` | Equal to | `a = b` | Boolean |
| `!=` or `<>` | Not equal to | `a != b` | Boolean |
| `<` | Less than | `a < b` | Boolean |
| `<=` | Less than or equal to | `a <= b` | Boolean |
| `>` | Greater than | `a > b` | Boolean |
| `>=` | Greater than or equal to | `a >= b` | Boolean |

#### Logical Operators

| Operator | Description | Example | Result |
|----------|-------------|---------|--------|
| `and` or `&&` | Logical AND | `a and b` | Boolean |
| `or` or `\|\|` | Logical OR | `a or b` | Boolean |
| `xor` | Logical XOR | `a xor b` | Boolean |
| `!` or `not` | Logical NOT | `not a` | Boolean |

Logical operators work with boolean values and expressions:

```
true and false       # false
true or false        # true
true xor true        # false
not true             # false

(5 > 3) and (2 < 4)  # true
(5 > 10) or (3 < 4)  # true
```

### Expressions

Example expressions:

```
[Population] * [Growth Rate]
```

```
[Units Sold] * [Price per Unit] - [Fixed Costs]
```

```
IfThenElse([Income] > 50000, [Income] * 0.3, [Income] * 0.2)
```

## Variables and Assignment

Variables can be defined and modified using the assignment operator `<-`. The engine uses block scoping, so variables declared within a block (like a loop or if statement) will not be accessible outside that block.

```
x <- 10              # Assigns 10 to x
y <- x^2             # Assigns the square of x to y
x <- x + 1           # Modifies x to be 11
```

Multiple assignments are possible using vector destructuring:

```
a, b <- {10, 20}     # a = 10, b = 20
```

Scoping example:

```
x <- 10              # Global x

if x > 5 then
  y <- 20            # y only exists in this if block
  x <- 15            # Modifies global x
end if

# Here, x is 15 but y is not defined
```

## Comments

The equation engine supports several forms of comments:

```
# This is a single-line comment

// This is also a single-line comment

/* This is a
   multi-line comment that can
   span multiple lines */
```

## Control Structures

### Conditional Statements

#### If-Then-Else Statements

The If-Then-Else structure allows for conditional execution of code:

```
if condition then
  # code to execute if condition is true
else if anotherCondition then
  # code to execute if anotherCondition is true
else
  # code to execute otherwise
end if
```

Example:

```
temperature <- 22

if temperature > 30 then
  "Hot"
else if temperature > 20 then
  "Warm"
else if temperature > 10 then
  "Cool"
else
  "Cold"
end if
```

### Loops

#### While Loop

The while loop repeats a block of code as long as a condition is true:

```
while condition
  # code to execute while condition is true
end loop
```

Example:

```
x <- 1
while x < 10
  x <- x * 2
end loop
# x is now 16
```

The while loop first evaluates the condition; if it's true, it executes the code block and then re-evaluates the condition. This continues until the condition evaluates to false.

#### For Loop

The for loop iterates from a start value to an end value, with an optional step size:

```
for variable from start to end [by step]
  # code to execute for each iteration
end loop
```

Example:

```
total <- 0
for i from 1 to 10
  total <- total + i
end loop
# total is now 55

# With a custom step size
total <- 0
for i from 0 to 10 by 2
  total <- total + i
end loop
# total is now 30 (sum of 0, 2, 4, 6, 8, 10)
```


#### For-In Loop

The for-in loop iterates over each element in a vector:

```
for element in vector
  # code to execute for each element
end loop
```

Example:

```
total <- 0
for x in {1, 3, 5, 7}
  total <- total + x
end loop
# total is now 16
```


## Functions

### Function Definition

Functions can be defined using the `function` keyword:

```
function name(param1, param2, param3 = defaultValue)
  # function body
  # the last evaluated expression is returned, or
  return result  # explicit return statement
end function
```

Example:

```
function calculateArea(length, width)
  length * width
end function

area <- calculateArea(5, 10)  # 50
```

Functions can have default parameter values:

```
function greet(name, greeting = "Hello")
  greeting + ", " + name + "!"
end function

greet("World")        # "Hello, World!"
greet("John", "Hi")   # "Hi, John!"
```

### Anonymous Functions

Anonymous functions (lambda functions) can be created and assigned to variables:

```
# Multi-line form
square <- function(x)
  x^2
end function

# Single-line form for simple expressions
cube <- function(x) x^3
```

Anonymous functions are particularly useful for functional programming with vectors:

```
numbers <- {1, 2, 3, 4, 5}
square <- numbers.Map(function(x) x^2)  # {1, 4, 9, 16, 25}
evens <- numbers.Filter(function(x) x mod 2 = 0)  # {2, 4}
```


## Vectors

### Range operator

The range operator `:` can be used to create a sequence of numbers

```
# Range operator creates sequential vectors
simpleRange <- 1:5                # {1, 2, 3, 4, 5}
customStep <- 0:2:10              # {0, 2, 4, 6, 8, 10}
descendingRange <- 10:-2:0        # {10, 8, 6, 4, 2, 0}
```

### Vector Operations

Vectors support arithmetic operations, which are applied element-wise:

```
# Scalar operations apply to all elements
{1, 2, 3} + 5        # {6, 7, 8}
{1, 2, 3} * 2        # {2, 4, 6}

# Element-wise operations between vectors
{1, 2, 3} + {4, 5, 6}  # {5, 7, 9}
{1, 2, 3} * {4, 5, 6}  # {4, 10, 18}

# Operations with named vectors
{a: 1, b: 2} + 10      # {a: 11, b: 12}
{a: 1, b: 2} * {a: 5, b: 3}  # {a: 5, b: 6}
```

Vector comparisons also work element-wise:

```
{1, 2, 3} > 2           # {false, false, true}
{5, 10, 15} <= {10, 10, 10}  # {true, true, false}
```

### Element Selection

Elements from vectors can be accessed using various selector methods:

```
vector <- {10, 20, 30, 40, 50}

# Access by index (1-based indexing)
vector{1}              # 10 (first element)
vector{5}              # 50 (fifth element)

# Access multiple elements by position
vector{{1, 3, 5}}        # {10, 30, 50}

# Access with logical selection
vector{vector > 25}    # {30, 40, 50}

# Named vector access
person <- {name: "John", age: 30}
person{"name"}         # "John"
person.name            # "John" (shorthand dot notation)
```

Note that vector indexing is 1-based, not 0-based as in some other programming languages.


### Matrices and Collapsing

Imagine you had this data representing rabbit populations in two sites, one in Canada and one in the USA:

```
rabbits <- {Canada: {Males: 200, Females: 100}, USA: {Males: 150, Females: 50} }
```

You could select specific rabbit counts using two different syntaxes:

```

[Rabbits]{"Canada", "Males"}   # = 200
[Rabbits].Canada.Males         # = 200
```

If you use a "*" instead of an element name, the simulation package engine returns the whole vector along that dimension:

```
[Rabbits]{"Canada", *}    # = {Males: 200, Females: 100}

[Rabbits]{*, "Males"}     # = {Canada: 200, USA: 150}
```

You can also collapse or summarize elements from a matrix by using the name of a function in the selection. The function is used to aggregate elements along that dimension. For example, to get the total number of rabbits by country:

```
[Rabbits]{*, sum}    # = {Canada: 300, USA: 200}
```

To get the average number of males and females in the countries:

```
[Rabbits]{mean, *}     # = {Males: 175, Females: 75}
```

All standard simulation package vector functions (Mean, Median, StdDev, etc...) can be used in this way.

### Vectors in Primitives

Using a vector as a primitive value allows you to replicate the model structure without duplicating elements.

For instance a stock with a value `{Canada: 100, USA: 300}` represents effectively two stocks: one for Canada with a value of 100 and one for the USA with a value of 300. Since vector math is done element-wise, flows with similar vector structures flowing in or out will operate independently for Canada and USA.

## Error Handling

### Try-Catch Blocks

The Try-Catch structure allows for handling errors gracefully:

```
Try
  # Code that might cause an error
  result <- Ln({1 meter})
Catch err
  # Code to handle the error
  "Error: " + err
End Try
```

### Throwing Errors

You can throw custom errors with the `throw` statement:

```
function divide(a, b)
  if b = 0 then
    throw "Division by zero is not allowed"
  end if
  a / b
end function
```

Custom exceptions can be used to provide meaningful error messages or to handle specific error conditions in your code.


# Supported Units

The simulation package supports a wide variety of units for defining quantities in system models. Units can be specified using the `units` property or as literals in formulas using curly braces, such as `{10 kilogram}`. 

## Basic Units

The following units are built-in to the simulation package. They have built-in conversion support between equivalent units. Unit names are case insensitive.

### Angle Units

- Degree (or Degrees, most units support a plural form)
- Radian

### Electrical Units

- Ampere
- Coulomb
- Volt, Millivolt, Kilovolt
- Farad

### Mass Units

- Gram
- Kilogram
- Milligram
- Ounce
- Pound
- Tonne
- Ton

### Time Units

- Second
- Minute
- Hour
- Day
- Week
- Month
- Quarter
- Year

### Length Units

- Meter
- Centimeter
- Millimeter
- Kilometer
- Inch
- Foot/Feet
- Yard
- Mile

### Area Units

- Meter Squared/Square Meter
- Centimeter Squared/Square Centimeter
- Millimeter Squared/Square Millimeter
- Kilometer Squared/Square Kilometer
- Inch Squared/Square Inch
- Foot Squared/Square Foot
- Yard Squared/Square Yard
- Mile Squared/Square Mile
- Acre
- Hectare

### Volume Units

- Meter Cubed/Cubic Meter
- Centimeter Cubed/Cubic Centimeter
- Millimeter Cubed/Cubic Millimeter
- Kilometer Cubed/Cubic Kilometer
- Liter
- Gallon
- Quart
- Fluid Ounce

### Force Units

- Newton
- Pound Force

### Energy Units

- Joule
- Kilojoule
- Calorie
- Kilocalorie
- BTU/British Thermal Unit

### Power Units

- Watt
- Kilowatt
- Megawatt
- Gigawatt

### Pressure Units

- Pascal
- Kilopascal
- Bar
- Atmosphere
- Pound per Square Inch

### Other Units

- Atom
- Molecule
- Mole

## Unit Syntax and Combinations

Units can be combined in formulas using various operations. The simulation package handles unit conversions and dimensional analysis automatically:

### Basic Unit Literal Expression

```
{10 meter}
```

Note that if you have a primitive with units, those will be automatically applied to unitless values in the primitive. For instance if the value of a primitive was `10` and the units of the primitive were `meters`, the value of `meters` would automatically be applied and you wouldn't need to set the value to the literal `{10 meters}`.

### Multiplication

Units can be multiplied using an asterisk:

```
{5 kilogram * meter}
```

### Division

Units can be divided using a forward slash or the "per" keyword:

```
{60 kilometer/hour}
{60 kilometer per hour}
```

### Powers

Units can be raised to powers using the caret symbol, or using the "squared" and "cubed" keywords:

```
{5 meter^2}
{5 meter squared}
{2 meter^3}
{2 meter cubed}
```

### Negative Powers

Negative powers can be used for compound units:

```
{9.81 meter*second^-2}
```

### Parentheses for Grouping

Parentheses can be used to group units:

```
{5 kilogram*(meter/second^2)}
```

### Example Derived Units

#### Velocity

```
{5 meter per second}
{60 kilometer per hour}
{30 mile per hour}
{10 feet per second}
```

#### Acceleration
```
{9.81 meter per second squared}
{9.81 meter/second^2}
{32.2 feet per second squared}
```

#### Flow Rates

```
{5 liter per second}
{10 cubic meter per second}
{20 gallon per minute}
```

#### Mass Flow Rates

```
{2 kilogram per second}
{10 pound per second}
```

#### Currency Flow Rates

```
{100 dollar per hour}
{5000 dollar per month}
{2000 euro per week}
```

## Automatic Unit Conversion

The simulation package supports automatic unit conversion between compatible units. For example, a formula expecting meters can accept values in kilometers, feet, or other length units, and the appropriate conversion will be applied.

Units with the same base dimensions (e.g., different units of length or different units of time) are automatically converted when used in calculations. If an invalid conversion is attempted, an error will be thrown.

### Examples of Unit Conversions

```
{1 meter} + {10 centimeter} → {1.1 meter}
{1 hour} - {30 minute} → {0.5 hour}
{1 kilogram} + {500 gram} → {1.5 kilogram}
{2 mile} + {1000 foot} → {2.189 mile}


{5 meter} * {2 meter} → {10 meter^2}
{10 meter^2} / {2 meter} → {5 meter}
{20 kilogram*meter/second^2} / {5 kilogram} → {4 meter/second^2}
```

Incompatible units conversions will produce errors:

```
{1 meter} + {1 second} → Error: Incompatible units
```

### Custom and Non-Standard Units

Beyond the built-in units, the simulation package allows the use of any arbitrary unit name, as long as it's used consistently:

```
{1 cow} + {10 cow}         # Valid: Results in {11 cow}
{5 widget} * {3 gadget}    # Valid: Results in {15 widget*gadget}
{20 person} / {5 team}     # Valid: Results in {4 person/team}
{20 person} + {5 team}     # Invalid: Incompatible units
```

Custom unit names may be any valid unicode letter followed by one or more letters, underscores, or numbers.

# Built-in Functions

In addition to standard algebraic and logical operators, the simulation package engine has many built-in functions. The following is a list of these functions.

## Mathematical Functions

### Round – Round(Value)

Rounds a number to the nearest integer.

**Examples**

`Round(3.6)` → `4`

`Round(3.5)` → `4`

`Round(-1.4)` → `-1`

`Round(2.1)` → `2`

### Round Up – Ceiling(Value)

Rounds a number up to the nearest integer.

**Examples**

`Ceiling(3.01)` → `4`

`Ceiling(-1.99)` → `-1`

`Ceiling(5.0)` → `5`

`Ceiling(7.1)` → `8`

### Round Down – Floor(Value)

Rounds a number down to the nearest integer.

**Examples**

`Floor(3.99)` → `3`

`Floor(-1.01)` → `-2`

`Floor(5.0)` → `5`

`Floor(7.9)` → `7`

### Cos – Cos(Angle)

Finds the cosine of an angle.

**Examples**

`Cos(0)` → `1`

`Cos(Pi/3)` → `0.5`

`Cos(Pi)` → `-1`

`Cos(2*Pi)` → `1`

### ArcCos – ArcCos(Value)

Finds the arc-cosine of a value. The result includes units.

**Examples**

`ArcCos(1)` → `0`

`ArcCos(0)` → `Pi/2`

`ArcCos(-1)` → `Pi`

`ArcCos(0.5)` → `Pi/3`

### Sin – Sin(Angle)

Finds the sine of an angle.

**Examples**

`Sin(0)` → `0`

`Sin(Pi/2)` → `1`

`Sin(Pi)` → `0`

`Sin(3*Pi/2)` → `-1`

### ArcSin – ArcSin(Value)

Finds the arc-sine of a value. The result includes units.

**Examples**

`ArcSin(0)` → `0`

`ArcSin(1)` → `Pi/2`

`ArcSin(-1)` → `-Pi/2`

`ArcSin(0.5)` → `Pi/6`

### Tan – Tan(Angle)

Finds the tangent of an angle.

**Examples**

`Tan(0)` → `0`

`Tan(Pi/4)` → `1`

`Tan(Pi)` → `0`

`Tan(3*Pi/4)` → `-1`

### ArcTan – ArcTan(Value)

Finds the arc-tangent of a value. The result includes units.

**Examples**

`ArcTan(1)` → `Pi/4`

`ArcTan(0)` → `0`

`ArcTan(-1)` → `-Pi/4`

### Log – Log(Value)

Returns the base-10 logarithm of a number.

**Examples**

`Log(10)` → `1`

`Log(100)` → `2`

`Log(1)` → `0`

`Log(1000)` → `3`

### Ln – Ln(Value)

Returns the natural logarithm of a number.

**Examples**

`Ln(e)` → `1`

`Ln(e^3)` → `3`

`Ln(1)` → `0`

Ln and e are inverses: `Ln(e^0.5)` → `0.5`

### Exp – Exp(Value)

Returns e taken to a power.

**Examples**

`Exp(2)` → `e^2`

Exp of 0 is always 1: `Exp(0)` → `1`

Exp of -1 gives the reciprocal of e: `Exp(-1)` → `1/e`

Exp of 1 is e itself: `Exp(1)` → `e`

### Sum – Sum(Values)

Returns the sum of a vector or list of numbers.

**Examples**

A list of numbers: `Sum(1, 2, 3, 4)` → `10`

Works with vectors: `Sum({-1, 5, -2, 8})` → `10`

`Sum({0.5, 2.5, 4})` → `7.0`

Single value is simply returned: `Sum(10)` → `10`

### Product – Product(Values)

Returns the product of a vector or list of numbers.

**Examples**

A list of numbers: `Product(1, 2, 3, 4)` → `24`

Works with vectors: `Product({-1, 4, -3})` → `-12`

`Product(0.5, 2, 8)` → `8`

`Product({2, 2, 2, 2})` → `16`

### Maximum – Max(Values)

Returns the largest of a vector or list of numbers.

**Examples**

`Max(2, 4, -1)` → `4`

`Max(100, 54, 89, 3)` → `100`

Finding the maximum value in a vector: `Max({1, 3, 5, 7, 9})` → `9`

Maximum of negative numbers: `Max(-5, -2, -9, -4)` → `-2`

### Minimum – Min(Values)

Returns the smallest of a vector or list of numbers.

**Examples**

`Min(2, 4, -1, 3)` → `-1`

`Min({10, 5, 15, 2})` → `2`

`Min(-8, -3, -10)` → `-10`

### Mean – Mean(Values)

Returns the mean (average) of a vector or list of numbers.

**Examples**

`Mean(2, 7, 3)` → `4`

Average of a simple numeric sequence: `Mean(1, 3, 5, 7)` → `4`

Calculating the mean of a vector: `Mean({10, 20, 30, 40, 50})` → `30`

Average of negative numbers: `Mean(-2, -4, -6)` → `-4`

### Median – Median(Values)

Returns the median of a vector or list of numbers.

**Examples**

`Median(2, 7, 3)` → `3`

Median with an odd number of elements: `Median(1, 3, 3, 6, 7)` → `3`

Median of an even number of elements in a vector: `Median({1, 2, 3, 4})` → `2.5`

### Standard Deviation – StdDev(Values)

Returns the standard deviation of a vector or list of numbers.

**Examples**

`StdDev(1, 2, 3)` → `1`

`StdDev({10, 20, 30})` → `10`

No variation from the mean: `StdDev(100, 100, 100)` → `0`

### Absolute Value – Abs(Value)

Returns the absolute value of a number.

**Examples**

`Abs(-23)` → `23`

Positive numbers remain unchanged: `Abs(17)` → `17`

`Abs(-0.5)` → `0.5`

Absolute value of zero is zero: `Abs(0)` → `0`

### Mod – (Value One) mod (Value Two)

Returns the remainder of the division of two numbers.

**Examples**

`13 mod 5` → `3`

Using the % operator instead of mod: `13 % 5` → `3`

Checking for even numbers: `10 mod 2` → `0`

Perfectly divisible numbers: `9 mod 3` → `0`

### Square Root – Sqrt(Value)

Returns the square root of a number.

**Examples**

`Sqrt(9)` → `3`

`Sqrt(16)` → `4`

`Sqrt(2)` → `1.41`

### Sign – Sign(Value)

1 if the value is greater than 0, -1 if it is less than 0, and 0 if it is 0.

**Examples**

`Sign(-12)` → `-1`

Positive number sign: `Sign(20)` → `1`

Zero sign: `Sign(0)` → `0`

Sign of a small negative number: `Sign(-0.01)` → `-1`

### Pi – pi

The value 3.14159265.

**Examples**

`pi` → `3.14159265`

Circumference of a unit circle: `2*pi` → `6.28318531`

### e – e

The value 2.71828183.

**Examples**

`e` → `2.71828183`

`1/e` → `0.367879441`

### Logit – Logit(Value)

Returns the logit transformation of the value. Converts values on a 0 to 1 scale to a -Infinity to Infinity scale.

**Examples**

Logit transformation of a probability of 0.5: `Logit(0.5)` → `0`

Higher probabilities result in positive log-odds: `Logit(0.75)` → `1.0986`

Lower probabilities result in negative log-odds: `Logit(0.25)` → `-1.0986`

Logit of a high probability: `Logit(0.9)` → `2.197`

### Expit – Expit(Value)

Returns the expit transformation of the value. Converts values on a -Infinity to Infinity scale to a 0 to 1 scale.

**Examples**

Expit transformation returning a probability of 0.5: `Expit(0)` → `0.5`

Positive values result in probabilities greater than 0.5: `Expit(1)` → `0.73106`

Negative values yield probabilities less than 0.5: `Expit(-1)` → `0.26894`

Higher input gives higher probabilities: `Expit(2)` → `0.88079`

## Time Functions

### Seconds – Seconds()

The current time in seconds.

**Examples**

The time in milliseconds: `Seconds()*1000`

Converts seconds to minutes: `Seconds()/60`

Checks if more than an hour has passed in the simulation: `IfThenElse(Seconds() > 3600, 'More than an hour has passed.', 'Less than an hour has passed.')`

### Minutes – Minutes()

The current time in minutes.

**Examples**

`Seconds() = Minutes()*60` → `True`

Converts minutes back to seconds: `Minutes()*60`

Uses minutes to determine how long the simulation has run: `IfThenElse(Minutes() > 120, 'More than 2 hours have passed.', 'Less than 2 hours have passed.')`

### Hours – Hours()

The current time in hours.

**Examples**

Converts hours to minutes: `Hours()*60`

Determines if a day has passed in the simulation: `IfThenElse(Hours() >= 24, 'A day or more has passed.', 'Less than a day has passed.')`

Converts hours to days: `Hours()/24`

### Days – Days()

The current time in days.

**Examples**

Converts days to hours: `Days()*24`

Checks if more than a week has passed: `IfThenElse(Days() > 7, 'More than a week has passed.', 'Less than a week has passed.')`

Converts days to weeks: `Days()/7`

### Weeks – Weeks()

The current time in weeks.

**Examples**

Converts weeks to days: `Weeks()*7`

Determines if more than a month has passed based on the number of weeks: `IfThenElse(Weeks() > 4, 'More than a month has passed.', 'Less than a month has passed.')`

Approximates weeks to months for quick calculations: `Weeks()*4`

### Months – Months()

The current time in months.

**Examples**

Approximates months to days: `Months()*30`

Checks if a year has passed in simulation time: `IfThenElse(Months() >= 12, 'A year or more has passed.', 'Less than a year has passed.')`

Converts months to years for long-term tracking: `Months()/12`

### Years – Years()

The current time in years.

**Examples**

Implements a condition based on the simulation time exceeding 10 years: `IfThenElse(Years() > 10, 15, 0)`

Converts years to months for detailed time analysis: `Years()*12`

Converts years to days for precise time calculations: `Years()*365`

### Current Time – Time()

The current time including units.

**Examples**

Determines actions based on the simulation time surpassing 10 years: `IfThenElse(Time() > {10 Years}, 15, 0)`

Calculates the elapsed time since the start of the simulation: `Time() - TimeStart()`

Determines the remaining time until the simulation ends: `TimeEnd() - Time()`

### Time Start – TimeStart()

The simulation start time including units.

**Examples**

Calculates the elapsed time since the simulation started: `Time() - TimeStart()`

### Time Step – TimeStep()

The simulation time step including units.

**Examples**

Determines the resolution of the simulation based on the time step: `IfThenElse(TimeStep() < {1 Day}, 'High resolution simulation.', 'Low resolution simulation.')`

Calculates the number of time steps in the simulation: `TimeLength() / TimeStep()`

### Time Length – TimeLength()

The total length of the simulation including units.

**Examples**

`IfThenElse(TimeLength() > {365 Days}, 'Simulation spans more than a year.', 'Simulation spans less than a year.')`

Calculates the percentage of time elapsed in the simulation: `(Time() - TimeStart()) / TimeLength()`

### Time End – TimeEnd()

The time at which the simulation ends including units.

**Examples**

`TimeStart() + TimeLength() = TimeEnd()` → `True`

`IfThenElse(Time() > TimeEnd(), 'Simulation has ended (you should never see this).', 'Simulation still in progress.')`

### Seasonal – Seasonal(Peak=0)

Model of seasonality influences. Sine wave with a period of one year, a peak amplitude of one, and a peak at the specified time.

**Examples**

`Seasonal()`

A wave that oscillates from 0 to 1 and peaks in September: `Seasonal({9 Months})*0.5+1`

Models a sine wave peaking in June, useful for simulating summer peak: `Seasonal({6 Months})`

Combines two seasonal patterns, peaking in March and September: `Seasonal({3 Months}) + Seasonal({9 Months})`

## Historical Functions

### Delay – Delay([Primitive], Delay Length, Default Value)

Returns the value of a primitive for a specified length of time ago. Default Value stands in for the primitive value in the case of negative times.

**Examples**

The population value from 5 years ago or 100000 if less than 5 years have passed: `Delay([Population], {5 Years}, 100000)`

Retrieves the interest rate from one year ago, using 0.05 as the default if the simulation is in its first year: `Delay([Interest Rate], {1 Year}, 0.05)`

Accesses the revenue value from three months prior, defaulting to 50000 if the simulation is within the first three months: `Delay([Revenue], {3 Months}, 50000)`

Fetches the temperature from two years ago, with a default value of 20 if the simulation has not yet reached two years: `Delay([Temperature], {2 Years}, 20)`

### Delay1 – Delay1([Value], Delay Length, Initial Value)

Returns a smoothed, first-order exponential delay of a value. The Initial Value is optional.

**Examples**

`Delay1([Sales], {1 year}, 200)` → `A smoothed sales figure over the past year, starting from 200.`

Applies a six-month smoothed delay to pollution data: `Delay1([Pollution], {6 month})`

Models a smoothed three-month delay in customer satisfaction: `Delay1([Customer Satisfaction], {3 month})`

Smooths the water level changes over two years, with an initial water level of 100: `Delay1([Water Level], {2 years}, 100)`

### Delay3 – Delay3([Value], Delay Length, Initial Value)

Returns a smoothed, third-order exponential delay of a value. The Initial Value is optional.

**Examples**

Models a third-order delay on investment impacts over five years, starting from an initial investment of 100000: `Delay3([Investment], {5 Years}, 100000)`

Applies a two-year, third-order delay to the adoption of new technology: `Delay3([Technology Adoption], 24)`

Simulates a third-order delay in population growth over four years: `Delay3([Population Growth], 48)`

Implements a third-order smoothing delay on carbon emission data over one year, starting from 1000 units: `Delay3([Carbon Emission], 12, 1000)`

### DelayN – DelayN([Value], Delay Length, Order, Initial Value)

Returns a smoothed, exponential delay of a value with the specified order. The Initial Value is optional.

**Examples**

Models a three-order delayed response in population growth over five years, starting at 100: `DelayN([Population Growth], {5 Years}, 3, 100)`

Applies a second-order delay to investment returns over two years: `DelayN([Investment], {2 Years}, 2)`

Models the delayed impact of CO2 emissions on climate change over ten years: `DelayN([CO2 Emissions], {10 Years}, 1)`

Uses a fourth-order delay: `DelayN([Sales], {6 Months}, 4, 200)`

### Smooth – Smooth([Value], Length, Initial Value)

Returns a smoothing of a value. Results in an averaged curve fit. Length affects the weight of past values. The Initial Value is optional.

**Examples**

Smooths interest rate fluctuations over the past year, starting with an initial rate of 0.05: `Smooth([Interest Rate], {12 Months}, 0.05)`

Averages daily temperature data over the past month: `Smooth([Temperature], {30 Days})`

Applies smoothing to stock price movements over six months: `Smooth([Stock Price], {6 Months})`

Smooths weekly fluctuations in traffic flow, starting with an initial count of 500 vehicles: `Smooth([Traffic Flow], {1 Week}, 500)`

### SmoothN – SmoothN([Value], Length, Order, Initial Value)

Returns a smoothing of a value with a specified order. Length affects the weight of past values. The Initial Value is optional.

**Examples**

Applies a third-order smoothing to revenue data over one year, starting from 100000: `SmoothN([Revenue], {1 Year}, 3, 100000)`

Uses second-order smoothing on pollution levels over two years: `SmoothN([Pollution], {2 Years}, 2)`

Fourth-order smoothing of customer satisfaction scores over three months: `SmoothN([Customer Satisfaction], {3 Months}, 4)`

Applies fifth-order smoothing to rainfall data over six months, with an initial value of 200mm: `SmoothN([Rainfall], {6 Months}, 5, 200)`

### PastValues – PastValues([Primitive], Period = All Time)

Returns the values a primitive has taken on over the course of the simulation as a vector. The second optional argument is a time window to limit the depth of the history.

**Examples**

Total past income: `Sum(PastValues([Income]))`

Computes the average stock price over the last 5 years: `Mean(PastValues([Stock Price], {5 Years}))`

Finds the highest temperature value in the past year: `Max(PastValues([Temperature], {1 Year}))`

Determines the lowest water level recorded in the past two years: `Min(PastValues([Water Level], {2 Years}))`

### Maximum – PastMax([Primitive], Period = All Time)

Returns the maximum of the values a primitive has taken on over the course of the simulation. The second optional argument is a time window to limit the calculation.

**Examples**

The maximum income in the past 10 years: `PastMax([Income], {10 Years})`

Determines the maximum pollution level recorded in the last 5 years: `PastMax([Pollution Level], {5 Years})`

Finds the highest customer satisfaction score throughout the simulation: `PastMax([Customer Satisfaction])`

Calculates the peak sales volume within the past year: `PastMax([Sales], {1 Year})`

### Minimum – PastMin([Primitive], Period = All Time)

Returns the minimum of the values a primitive has taken on over the course of the simulation. The second optional argument is a time window to limit the calculation.

**Examples**

Finds the lowest income value over the last 10 time units: `PastMin([Income], 10)` → `The minimum income in the past 10 units of time`

Determines the lowest water level recorded in the past two years: `PastMin([Water Level], {2 Years})`

Calculates the lowest stock price during the entire simulation: `PastMin([Stock Price])`

### Median – PastMedian([Primitive], Period = All Time)

Returns the median of the values a primitive has taken on over the course of the simulation. The second optional argument is a time window to limit the calculation.

**Examples**

Finds the median sales number for a product over the past year: `PastMedian([Product Sales], {1 Year})`

Calculates the median temperature recorded over the last three months: `PastMedian([Temperature], {3 Months})`

Determines the median level of pollution throughout the simulation: `PastMedian([Pollution Level])`

### Mean – PastMean([Primitive], Period = All Time)

Returns the mean of the values a primitive has taken on over the course of the simulation. The second optional argument is a time window to limit the calculation.

**Examples**

Calculates the average rainfall over the past year: `PastMean([Rainfall], {1 Year})`

The mean stock value in the last quarter: `PastMean([Stock Value], {3 Months})`

The mean energy consumption throughout the simulation: `PastMean([Energy Consumption])`

### Standard Deviation – PastStdDev([Primitive], Period = All Time)

Returns the standard deviation of the values a primitive has taken on over the course of the simulation. The second optional argument is a time window to limit the calculation.

**Examples**

Evaluates the volatility in market demand over the past year: `PastStdDev([Market Demand], {1 Year})`

The standard deviation in temperature during the last six months: `PastStdDev([Temperature], {6 Months})`

Calculates the standard deviation of production output throughout the simulation: `PastStdDev([Production Output])`

### Correlation – PastCorrelation([Primitive], [Primitive], Period = All Time)

Returns the correlation between the values that two primitives have taken on over the course of the simulation. The third optional argument is an optional time window to limit the calculation.

**Examples**

The correlation between income and expenditures over the past 10 years: `PastCorrelation([Income], [Expenditures], {10 Years})`

The correlation between temperature and ice cream sales over the last year: `PastCorrelation([Temperature], [Ice Cream Sales], {1 Year})`

The correlation between social media marketing spend and website traffic throughout the simulation: `PastCorrelation([Social Media Spend], [Website Traffic])`

### Fix – Fix(Value, Period = All Time)

Takes the dynamic value and forces it to be fixed over the course of the period. If period is omitted, the value is held constant over the course of the whole simulation.

**Examples**

Chooses a new random value every five years: `Fix(Rand(), {5 Years})`

Sets the initial stock price to remain constant throughout the simulation: `Fix([Initial Stock Price])`

Keeps the annual rainfall amount constant for a decade: `Fix([Annual Rainfall], {10 Years})`

Assumes technology efficiency remains unchanged for two years: `Fix([Technology Efficiency], {2 Years})`

## Random Number Functions

### Uniform Distribution – Rand(Minimum, Maximum)

Generates a uniformly distributed random number between the minimum and maximum. The minimum and maximum are optional and default to 0 and 1 respectively.

**Examples**

Generates a random number between 0 and 1: `Rand()`

Generates a random number between 1 and 10: `Rand(1, 10)`

Generates a random number between -5 and 5: `Rand(-5, 5)`

Generates a random number between 0 and 100: `Rand(0, 100)`

### Normal Distribution – RandNormal(Mean, Standard Deviation)

Generates a normally distributed random number with a mean and a standard deviation. The mean and standard deviation are optional and default to 0 and 1 respectively.

**Examples**

Generates a standard normal distributed random number: `RandNormal()`

Generates a random number with mean 10 and standard deviation 2: `RandNormal(10, 2)`

Generates a random number with mean 100 and standard deviation 15: `RandNormal(100, 15)`

Generates a random number with mean 50 and standard deviation 5: `RandNormal(50, 5)`

### Lognormal Distribution – RandLognormal(Mean, Standard Deviation)

Generates a log-normally distributed random number with a mean and a standard deviation.

**Examples**

Generates a log-normally distributed number with a log-space mean of 1 and standard deviation of 0.25: `RandLognormal(1, 0.25)`

Generates a log-normally distributed number with a log-space mean of 0 and standard deviation of 0.5: `RandLognormal(0, 0.5)`

Generates a log-normally distributed number with a log-space mean of 2 and standard deviation of 1: `RandLognormal(2, 1)`

### Binary Distribution – RandBoolean(Probability)

Returns true with the specified probability, otherwise false. The probability is optional and defaults to 0.5: a coin flip.

**Examples**

Returns false with 90% probability and true with 10% probability: `RandBoolean(0.1)`

Returns true with 90% probability and false with 10% probability: `RandBoolean(0.9)`

A 50% chance to return either false or true, simulating a coin flip: `RandBoolean()`

### Binomial Distribution – RandBinomial(Count, Probability)

Generates a binomially distributed random number. The number of successes in Count random events each with Probability of success.

**Examples**

The number of successes in 10 trials with a 50% success rate: `RandBinomial(10, 0.5)`

The number of successes in 20 trials with a 30% success rate: `RandBinomial(20, 0.3)`

The number of successes in 5 trials with an 80% success rate: `RandBinomial(5, 0.8)`

### Negative Binomial – RandNegativeBinomial(Successes, Probability)

Generates a negative binomially distributed random number. The number of random events each with Probability of success required to generate the specified Successes.

**Examples**

The number of trials to achieve 3 successes with a 50% success rate: `RandNegativeBinomial(3, 0.5)`

The number of trials to achieve 5 successes with a 30% success rate: `RandNegativeBinomial(5, 0.3)`

The number of trials to achieve 2 successes with a 70% success rate: `RandNegativeBinomial(2, 0.7)`

### Poisson Distribution – RandPoisson(Lambda)

Generates a Poisson distributed random number.

**Examples**

Generates a Poisson distributed number with Lambda=5: `RandPoisson(5)`

Simulates the number of events (Lambda=10) occurring in a fixed interval: `RandPoisson(10)`

Models a low-rate event occurrence scenario with Lambda=2: `RandPoisson(2)`

### Triangular Distribution – RandTriangular(Minimum, Maximum, Peak)

Generates a triangularly distributed random number.

**Examples**

Generates a triangular distributed number with a minimum of 1, maximum of 10, and peak at 5: `RandTriangular(1, 10, 5)`

Models a scenario with wide range but a more likely lower value: `RandTriangular(0, 100, 20)`

Useful for more precise estimations with narrower ranges: `RandTriangular(3, 6, 4)`

### Exponential Distribution – RandExp(Lambda)

Generates an exponentially distributed random number with the specified rate parameter.

**Examples**

Generates an exponentially distributed time between events with Lambda=1: `RandExp(1)`

Simulates longer expected time between events with Lambda=0.5: `RandExp(0.5)`

Models a high rate of event occurrence with short expected times between them with Lambda=5: `RandExp(5)`

### Gamma Distribution – RandGamma(Alpha, Beta)

Generates a Gamma distributed random number.

**Examples**

Generates a Gamma distributed number with Alpha=2, Beta=2: `RandGamma(2, 2)`

Models a scenario with a longer tail, indicating possible high-value outcomes: `RandGamma(5, 1)`

Simulates an exponential distribution with Alpha=1 and Beta=0.5: `RandGamma(1, 0.5)`

### Beta Distribution – RandBeta(Alpha, Beta)

Generates a Beta distributed random number.

**Examples**

Generates a Beta distributed number leaning towards lower values: `RandBeta(2, 5)`

Models a distribution with a tendency towards higher values: `RandBeta(5, 2)`

Represents a uniform distribution between 0 and 1: `RandBeta(1, 1)`

### Custom Distribution – RandDist(X, Y)

Generates a random number according to a custom distribution.

**Examples**

Generates a number from a custom distribution with three discrete outcomes: `RandDist({1, 2, 3}, {0.2, 0.5, 0.3})`

Models a triangular distribution manually: `RandDist({0, 10, 20}, {0, 0.5, 0})`

Simulates outcomes with a higher likelihood of occurring at 0: `RandDist({-1, 0, 1}, {0.25, 0.5, 0.25})`

### SetRandSeed – SetRandSeed(Seed)

Sets the seed for the random number generator.

**Examples**

Initializes the random number generator with a seed of 123: `SetRandSeed(123)`

Ensures a different sequence of random numbers with seed 83940: `SetRandSeed(83940)`

## Vector Functions

### Range – Start:End

Creates a vector with a range of sequential values going from start to end.

**Examples**

`1:5` → `{1, 2, 3, 4, 5}`

Creates a vector from 0 to 10 in steps of 2: `0:2:10` → `{0, 2, 4, 6, 8, 10}`

Creates a vector from -5 to 5 in steps of 1: `-5:1:5` → `{-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5}`

Creates a descending vector from 10 to 2 in steps of -2: `10:-2:2` → `{10, 8, 6, 4, 2}`

### Length – Vector.Length()

The number of elements in a vector.

**Examples**

`{1, 1, 2, 3}.Length()` → `4`

`{10, 20, 30, 40, 50}.Length()` → `5`

`{}.Length()` → `0`

`{ 'a', 'b', 'c', 'd', 'e', 'f' }.Length()` → `6`

### Select – Vector{Selector}

Selects one or more elements from a vector.

**Examples**

`{1,3,7}{2}` → `3`

Selects elements at positions 1 and 3: `{4, 5, 6, 7}{ {1, 3} }` → `{4, 6}`

Selects element with name 'b': `{ 'a': 1, 'b': 2, 'c': 3 }{'b'}` → `2`

Selects elements at positions where selector is true: `{10, 20, 30, 40, 50}{ {true, false, true, false, true} }` → `{10, 30, 50}`

Selects elements that are greater than 10: `vector{ vector > 10 }`

### Join – Join(Item 1, Item 2, Item N)

Merges items together into a single vector.

**Examples**

`Join(0, {1, 1, 2})` → `{0, 1, 1, 2}`

Joins three vectors into one: `Join({1, 2}, {3, 4}, {5, 6})` → `{1, 2, 3, 4, 5, 6}`

Combines strings and a vector into a single vector: `Join('a', {'b', 'c'}, 'd')` → `{'a', 'b', 'c', 'd'}`

Returns an empty vector when no arguments are provided: `Join()` → `{}`

### Flatten – Vector.Flatten()

Flattens a vector removing and expanding all nested vectors.

**Examples**

`{ {0}, {1, 1, 2} }.Flatten()` → `{0, 1, 1, 2}`

Flattens a vector with nested vectors: `{ {1, 2}, {3, {4, 5}} }.Flatten()` → `{1, 2, 3, 4, 5}`

Ignores empty vectors and flattens the rest: `{ {}, {0}, {}, {1, 2} }.Flatten()` → `{0, 1, 2}`

Flattens deeply nested vectors into a single level: `{ { { {1} } } }.Flatten()` → `{1}`

### Unique – Vector.Unique()

Returns a vector with duplicates removed.

**Examples**

`{1, 1, 2, 3}.Unique()` → `{1, 2, 3}`

Removes duplicates from a vector of strings: `{'a', 'b', 'a', 'c', 'b'}.Unique()` → `{'a', 'b', 'c'}`

Identifies and removes duplicate numbers: `{10, 20, 20, 10, 30}.Unique()` → `{10, 20, 30}`

Returns an empty vector when applied to an empty vector: `{}.Unique()` → `{}`

### Union – Vector.Union(Vector 2)

Returns the combined elements of two vectors (with duplicates removed).

**Examples**

`{1, 2}.Union({2, 3})` → `{1, 2, 3}`

`{'apple', 'banana'}.Union({'banana', 'cherry'})` → `{'apple', 'banana', 'cherry'}`

Union of distinct numerical vectors: `{1, 4, 5}.Union({6, 7})` → `{1, 4, 5, 6, 7}`

Union with an empty vector returns the non-empty vector: `{}.Union({2, 3})` → `{2, 3}`

### Intersection – Vector.Intersection(Second Vector)

Returns the elements that exist in both vectors.

**Examples**

`{1, 2}.Intersection({2, 3})` → `{2}`

`{'apple', 'banana'}.Intersection({'banana', 'cherry'})` → `{'banana'}`

Intersection of disjoint vectors results in an empty vector: `{1, 2, 3}.Intersection({4, 5, 6})` → `{}`

Intersection of vectors with the same elements in different order: `{1, 2, 3}.Intersection({3, 2, 1})` → `{1, 2, 3}`

### Difference – Vector.Difference(Vector 2)

Returns the elements that exist in only one of the two vectors.

**Examples**

`{1, 2}.Difference({2, 3})` → `{1, 3}`

`{'apple', 'banana'}.Difference({'banana', 'cherry'})` → `{'apple', 'cherry'}`

Difference with an empty vector retains all elements: `{1, 2, 3}.Difference({})` → `{1, 2, 3}`

Completely unique vectors result in a combination of both: `{1, 2, 3}.Difference({4, 5, 6})` → `{1, 2, 3, 4, 5, 6}`

### Sort – Vector.Sort()

Sorts a vector from smallest value to largest value.

**Examples**

`{1, 3, 2, -1}.Sort()` → `{-1, 1, 2, 3}`

`{10, 20, 5, 30}.Sort()` → `{5, 10, 20, 30}`

Already sorted vectors remain unchanged: `{1, 2, 3}.Sort()` → `{1, 2, 3}`

### Reverse – Vector.Reverse()

Reverses the ordering of elements in a vector.

**Examples**

`{1, 2, 3}.Reverse()` → `{3, 2, 1}`

Reversing the order of strings: `{'apple', 'banana', 'cherry'}.Reverse()` → `{'cherry', 'banana', 'apple'}`

### Sample – Vector.Sample(Sample Size, Allow Repeats=False)

Takes a random sample from a vector. Allow Repeats determines whether the same index can be sampled multiple times and is false by default.

**Examples**

Randomly sampling two elements without repeats: `{1, 4, 9}.Sample(2)` → `{9, 1}`

Sampling with replacement allows the same element to be selected more than once: `{1, 2, 3, 4, 5}.Sample(3, true)`

Randomly sampling a single element: `{1, 2, 3}.Sample(1)`

Sampling four unique elements from the vector: `{1, 2, 3, 4, 5, 6}.Sample(4, false)`

### IndexOf – Vector.IndexOf(Needle)

Returns the position of the needle within the vector (starting with index 1). If the needle is not found, 0 is returned.

**Examples**

`{1, 4, 9}.IndexOf(9)` → `3`

Finding the position of a string within a vector of strings: `{'apple', 'banana', 'cherry'}.IndexOf('banana')` → `2`

Searching for a non-existing element returns 0: `{1, 2, 3}.IndexOf(4)` → `0`

Returns the position of the first occurrence of the element: `{2, 4, 2}.IndexOf(2)` → `1`

### Contains – Vector.Contains(Needle)

Returns true if the needle is in the vector. Otherwise returns false.

**Examples**

`{1, 4, 9}.Contains(9)` → `true`

Checking for an element not present in the vector: `{'apple', 'banana', 'cherry'}.Contains('mango')` → `false`

Checking an empty vector for any element returns false: `{}.Contains(1)` → `false`

### Repeat – Repeat(Expression, Times)

Creates a new vector by repeating an expression a specified number of times. 'x' in the expression refers to the current index. Times may also be a vector of strings in which case a named vector is created.

**Examples**

`Repeat(x^2, 3)` → `{1, 4, 9}`

Creates a vector {10, 20, 30, 40, 50} by multiplying index by 10: `Repeat(x*10, 5)` → `{10, 20, 30, 40, 50}`

Generates a vector with powers of 2: `Repeat(2^x, 4)` → `{2, 4, 8, 16}`

`Repeat('Group ' + key, {'a', 'b', 'c'})` → `{a: 'Group a', b: 'Group b', c:'Group c'}`

### Map – Vector.Map(Function)

Applies a function to each element of a vector and returns the result. The function may also be an expression where 'x' in the expression represents the current element and, for named vectors, 'key' represents the current element's key.

**Examples**

`{1, 2, 3}.Map(x*2)` → `{2, 4, 6}`

Squares each element in the vector: `{1, 2, 3}.Map(x^2)` → `{1, 4, 9}`

Halves each element in a named vector: `{'a': 2, 'b': 4, 'c': 6}.Map(x/2)` → `{'a': 1, 'b': 2, 'c': 3}`

Adds the key to each element in a named vector: `{'a': 2, 'b': 4, 'c': 6}.Map(key + '-' + x)` → `{'a': 'a-2', 'b': 'b-4', 'c': 'c-6'}`

### Filter – Vector.Filter(Function)

Tests each element of a vector using a function and returns the elements which evaluate to true. The function may also be an expression where 'x' in the expression represents the current element.

**Examples**

`{1, 2, 3}.Filter(x >= 2)` → `{2, 3}`

Filters for positive numbers only: `{-2, 2, 4}.Filter(x > 0)` → `{2, 4}`

Selects elements divisible by 5: `{5, 10, 15}.Filter(x mod 5 == 0)` → `{5, 10, 15}`

Filters a named vector for values greater than 1: `{'a': 1, 'b': 2, 'c': 3}.Filter(x > 1)` → `{'b': 2, 'c': 3}`

Filters a named vector based on the key: `{'a': 1, 'b': 2, 'c': 3}.Filter(key = 'a')` → `{'a': 1}`

### Keys – Vector.Keys()

Returns the keys for a named vector as a vector. Any element without a key will be omitted.

**Examples**

`{'a': 1, 'b': 2, 'c': 3}.Keys()` → `{'a', 'b', 'c'}`

`{'first': 100, 'second': 200}.Keys()` → `{'first', 'second'}`

### Values – Vector.Values()

Returns the values of a vector (stripping away any keys if it is a named vector).

**Examples**

`{'a': 1, 'b': 4, 'c': 9}.Values()` → `{1, 4, 9}`

`{'height': 180, 'weight': 75}.Values()` → `{180, 75}`

### Lookup – Lookup(Value, Values Vector, Results Vector)

Finds the Value in the Values Vector and returns the corresponding item in the Results Vector. If the exact Value is not found in the Values Vector, linear interpolation of the nearby values will be used.

**Examples**

Interpolates between points for a value of 6: `Lookup(6, {5, 7}, {10, 15})` → `12.5`

Interpolates to find a result for 8: `Lookup(8, {5, 10}, {100, 200})` → `160`

Finds an exact match without needing to interpolate: `Lookup(10, {0, 5, 10}, {0, 50, 100})` → `100`

### ConverterTable – ConverterTable([Converter])

Returns the source table data for a converter primitive.

**Examples**

Returns the source table data for [My Converter]: `ConverterTable([My Converter])` → `{ { x: 0, y: 0 }, { x: 1, y: 10 }, { x: 5, y: 20 } }`

Just the input values for the converter: `ConverterTable([My Converter]){*, "x"}` → `{ 0, 1, 5 }`

Just the output values for the converter: `ConverterTable([My Converter]){*, "y"}` → `{ 0, 10, 20 }`

## General Functions

### If Then Else – IfThenElse(Test Condition, Value if True, Value if False)

Tests a condition and returns one value if the condition is true and another value if the condition is false.

**Examples**

Returns 'High' because the condition (20 > 10) is true: `IfThenElse(20 > 10, 'High', 'Low')` → `High`

Returns 100 if the current simulation time in years is greater than 5: `IfThenElse(Years() > 5, 100, 0)` → `100`

Evaluates population levels to return 'Overpopulated' or 'Sustainable': `IfThenElse([Population] > 1000, 'Overpopulated', 'Sustainable')`

Determines wealth status based on the sum of incomes: `IfThenElse(Sum([Incomes]) > 50000, 'Wealthy', 'Average')`

### Pulse – Pulse(Time, Height, Width=0, Repeat=-1)

Creates a pulse input at the specified time with the specified Height and Width. Height defaults to 1 and Width defaults to 0. Repeat is optional and will create a pulse train with the specified time if positive.

**Examples**

Generates a pulse with height 5 and width 2 years, starting at year 10: `Pulse({10 Years}, 5, 2)` → `5`

Creates a pulse of height 10 starting at year 5, repeating every 10 years: `Pulse({5 Years}, 10, 1, {10 Years})`

A pulse of height 3 and width 0.5 years starting at year 1, repeating every 2 years: `Pulse({1 Year}, 3, 0.5, {2 Years})`

An annual pulse starting immediately, with height 1 and width 1 year: `Pulse({0 Years}, 1, 1, {1 Year})`

### Step – Step(Start, Height=1)

Creates an input that is initially set to 0 and after the time of Start is set to Height. Height defaults to 1.

**Examples**

Introduces a step change to 5 after 10 years: `Step({10 Years}, 5)` → `5`

Implements a step change to 100 starting at year 2: `Step({2 Years}, 100)`

Default step to 1 starting at year 5: `Step({5 Years})`

### Ramp – Ramp(Start, Finish, Height=1)

Creates a ramp input which moves linearly from 0 to Height between the Start and Finish times. Before Start, the value is 0; after Finish, the value is Height. Height defaults to 1.

**Examples**

Linearly increases from 0 to 5 over 10 years, reaching full height at 20 years: `Ramp({10 Year}, {20 Years}, 5)` → `5`

A ramp from 0 to 100 starting immediately and completing over 5 years: `Ramp({0 Year}, {5 Years}, 100)`

Decreases from 0 to -50, starting at year 3 and ending at year 8: `Ramp({3 Years}, {8 Years}, -50)`

Gradual increase from 0 to 1, starting at year 1 through year 10: `Ramp({1 Year}, {10 Years})`

### Pause – Pause()

Pauses the simulation and allows sliders to be adjusted. 

**Examples**

Pauses simulation at year 20 to allow for adjustments: `IfThenElse(Years() = 20, Pause(), 0)`

Pauses simulation when population exceeds 500: `IfThenElse([Population] > 500, Pause(), 0)`

Direct invocation to pause simulation, typically used within a conditional statement: `Pause()`

### Stop – Stop()

Immediately terminates the simulation.

**Examples**

Stops the simulation randomly with a 1% probability: `IfThenElse(Rand() < 0.01, Stop(), 0)`

Terminates simulation if pollution exceeds a threshold: `IfThenElse([Pollution] > 100, Stop(), 0)`

Direct command to stop the simulation, typically used within a conditional statement: `Stop()`

## String Functions

### Length – String.Length()

The length of a string in characters.

**Examples**

`"Hello, world!".Length()` → `13`

An empty string has a length of 0: `"".Length()` → `0`

Counts numbers as characters: `"1234567890".Length()` → `10`

Includes spaces in the count: `"This is a test.".Length()` → `15`

### Range – String.Range(Characters)

Obtains a certain character or set of characters.

**Examples**

Extracts characters 2 through 4: `"abcdef".Range(2:4)` → `"bcd"`

Extracts the first 5 characters: `"Hello, world!".Range({1, 2, 3, 4, 5})` → `"Hello"`

Extracts disjoint characters: `"Simulate".Range({1, 3})` → `"Sm"`

### Split – String.Split(Delimiter)

Splits a string into a vector at the locations of the Delimiter.

**Examples**

Splits a comma-separated list: `"apple,banana,cherry".Split(",")` → `{"apple", "banana", "cherry"}`

Splits a date string into components: `"2024-02-22".Split("-")` → `{"2024", "02", "22"}`

Splits a space-separated string: `"one two three".Split(" ")` → `{"one", "two", "three"}`

### IndexOf – String.IndexOf(Needle)

Finds the location of the first occurrence of the needle in the string.

**Examples**

Finds the start of 'world': `"Hello, world!".IndexOf("world")` → `8`

Finds the position of 'd': `"abcdef".IndexOf("d")` → `4`

Case-sensitive search: `"Repeat, repeat, repeat".IndexOf("repeat")` → `9`

Returns 0 if not found: `"This does not contain it".IndexOf("xyz")` → `0`

### Contains – String.Contains(Needle)

Returns true if the needle is in the string. Otherwise returns false.

**Examples**

Checks if 'world' is present: `"Hello, world!".Contains("world")` → `true`

Checks if 'g' is not present: `"abcdef".Contains("g")` → `false`

Case-sensitive check: `"Case matters".Contains("case")` → `false`

Finds a substring within the string: `"Look for a substring".Contains("sub")` → `true`

### UpperCase – String.UpperCase()

Uppercases all letters in a string.

**Examples**

`"hello world".UpperCase()` → `"HELLO WORLD"`

`"Simulation".UpperCase()` → `"SIMULATION"`

Non-letter characters remain unchanged: `"123abc!".UpperCase()` → `"123ABC!"`

### LowerCase – String.LowerCase()

Lowercases all letters in a string.

**Examples**

`"HELLO WORLD".LowerCase()` → `"hello world"`

`"Simulation".LowerCase()` → `"simulation"`

Non-letter characters remain unchanged: `"123ABC!".LowerCase()` → `"123abc!"`

### Join – Vector.Join(String)

Combines the elements in a vector into a single string using the specified separator.

**Examples**

Join names with a comma and space: `{"John", "Paul", "George", "Ringo"}.Join(", ")` → `"John, Paul, George, Ringo"`

Create a date string from year, month, and day: `{2024, 02, 22}.Join("/")` → `"2024/02/22"`

Join words with a hyphen: `{"apple", "banana", "cherry"}.Join("-")` → `"apple-banana-cherry"`

### Trim – String.Trim()

Removes whitespace from both ends of a string.

**Examples**

Trim spaces around text: `"  hello world  ".Trim()` → `"hello world"`

Trim tab and newline characters as well as spaces: `"\n	  Simulation 	\n".Trim()` → `"Simulation"`

String without extra spaces is unchanged: `"NoExtraSpaces".Trim()` → `"NoExtraSpaces"`

### Parse – String.Parse()

Converts a string representation of a number to its numerical form.

**Examples**

Convert a string to an integer: `"123".Parse()` → `123`

Convert a string to a floating-point number: `"3.14159".Parse()` → `3.14159`

Convert a negative number string to its numerical form: `"-456".Parse()` → `-456`

Convert exponential notation string to a number: `"1e3".Parse()` → `1000`

## Statistical Distributions

### CDFNormal – CDFNormal(x, Mean=0, Standard Deviation=1)

Returns the value of x in the CDF of the Normal Distribution.

**Examples**

`CDFNormal(1.96)` → `0.975`

CDF at the mean of the distribution: `CDFNormal(0)` → `0.5`

Calculating the lower tail probability: `CDFNormal(-1.96)` → `0.025`

With a non-standard mean and deviation: `CDFNormal(2, 1, 2)` → `0.691`

### PDFNormal – PDFNormal(x, Mean=0, Standard Deviation=1)

Returns the value of x in the PDF of the Normal Distribution.

**Examples**

`PDFNormal(1.5, 0, 1)` → `0.13`

Density at the mean of the distribution: `PDFNormal(0)` → `0.399`

Density in the left tail of the distribution: `PDFNormal(-1, 0, 1)` → `0.242`

With a non-standard deviation: `PDFNormal(2, 0, 2)` → `0.121`

### InvNormal – InvNormal(p, Mean=0, Standard Deviation=1)

Returns the value of p in the inverse CDF of the Normal Distribution.

**Examples**

`InvNormal(0.975)` → `1.96`

Value at the median of the distribution: `InvNormal(0.5)` → `0`

Value in the left tail for 95% confidence: `InvNormal(0.025)` → `-1.96`

With a non-standard deviation: `InvNormal(0.95, 0, 2)` → `3.29`

### CDFLognormal – CDFLognormal(x, Mean=0, Standard Deviation=1)

Returns the value of x in the CDF of the Lognormal Distribution.

**Examples**

Probability of a value in a positively skewed distribution: `CDFLognormal(10, 1, 0.5)` → `0.995`

Default mean and deviation for a basic lognormal CDF calculation: `CDFLognormal(3)` → `0.864`

Adjusted mean and deviation for specific use case: `CDFLognormal(5, 2, 1)` → `0.348`

### PDFLognormal – PDFLognormal(x, Mean=0, Standard Deviation=1)

Returns the value of x in the PDF of the Lognormal Distribution.

**Examples**

Density of a value in a lognormal distribution: `PDFLognormal(10, 1, 0.5)` → `0.003`

Density with default parameters: `PDFLognormal(3)` → `0.073`

Custom mean and deviation for a specific case: `PDFLognormal(5, 2, 1)` → `0.074`

### InvLognormal – InvLognormal(p, Mean=0, Standard Deviation=1)

Returns the value of p in the inverse CDF of the Lognormal Distribution.

**Examples**

Finding a high percentile in a positively skewed distribution: `InvLognormal(0.95, 1, 0.5)` → `6.19`

Median value in a lognormal distribution: `InvLognormal(0.5)` → `1`

Low percentile for custom parameters: `InvLognormal(0.1, 2, 1)` → `2.05`

### CDFt – CDFt(x, Degrees Of Freedom)

Returns the value of x in the CDF of Student's t Distribution.

**Examples**

Probability of a t-value with 10 degrees of freedom: `CDFt(2.2, 10)` → `0.974`

CDF at the mean of the t-distribution: `CDFt(0, 30)` → `0.5`

Lower tail probability with 5 degrees of freedom: `CDFt(-1.5, 5)` → `0.097`

### PDFt – PDFt(x, Degrees Of Freedom)

Returns the value of x in the PDF of Student's t Distribution.

**Examples**

Density of a t-value with 10 degrees of freedom: `PDFt(2.2, 10)` → `0.044`

Density at the mean of the t-distribution: `PDFt(0, 30)` → `0.396`

Density in the lower tail with 5 degrees of freedom: `PDFt(-1.5, 5)` → `0.125`

### Invt – Invt(p, Degrees Of Freedom)

Returns the value of p in the inverse CDF of Student's t Distribution.

**Examples**

Critical t-value for 95% confidence with 10 degrees of freedom: `Invt(0.975, 10)` → `2.23`

Median of the t-distribution: `Invt(0.5, 30)` → `0`

Critical value in the lower tail for 95% confidence with 5 degrees of freedom: `Invt(0.025, 5)` → `-2.57`

### CDFF – CDFF(x, Degrees Of Freedom1, Degrees Of Freedom2)

Returns the value of x in the CDF of the F Distribution.

**Examples**

Calculating the CDF value for x=3.84 with 1 and 5 degrees of freedom in the numerator and denominator, respectively: `CDFF(3.84, 1, 5)` → `0.893`

Understanding the tail probability for more complex ANOVA scenarios: `CDFF(5, 10, 20)` → `0.999`

Assessing variance differences in smaller sample sizes: `CDFF(2.5, 3, 30)` → `0.921`

### PDFF – PDFF(x, Degrees Of Freedom1, Degrees Of Freedom2)

Returns the value of x in the PDF of the F Distribution.

**Examples**

Evaluating the likelihood of a variance ratio of 3 given 5 and 10 degrees of freedom in the numerator and denominator: `PDFF(3, 5, 10)` → `0.056`

Determining the density for a more extreme variance ratio: `PDFF(4.5, 2, 20)` → `0.017`

Assessing the density at the mean of the distribution: `PDFF(1, 10, 10)` → `0.615`

### InvF – InvF(p, Degrees Of Freedom1, Degrees Of Freedom2)

Returns the value of p in the inverse CDF of the F Distribution.

**Examples**

Finding the critical value for a 95% confidence level in an ANOVA test: `InvF(0.95, 5, 2)` → `19.3`

Determining a more stringent critical value for a hypothesis test: `InvF(0.99, 3, 30)` → `4.51`

Calculating critical values for two-tailed tests in research: `InvF(0.975, 2, 20)` → `4.46`

### CDFChiSquared – CDFChiSquared(x, Degrees Of Freedom)

Returns the value of x in the CDF of the Chi-Squared Distribution.

**Examples**

Calculating the CDF value for a chi-squared statistic of 10 with 5 degrees of freedom: `CDFChiSquared(10, 5)` → `0.925`

Assessing the probability for a chi-squared value in bivariate analysis: `CDFChiSquared(5.991, 2)` → `CDF value`

### PDFChiSquared – PDFChiSquared(x, Degrees Of Freedom)

Returns the value of x in the PDF of the Chi-Squared Distribution.

**Examples**

Evaluating the density for a chi-squared value of 2 with 5 degrees of freedom: `PDFChiSquared(2, 5)` → `0.138`

Understanding the likelihood of a chi-squared statistic in a smaller sample: `PDFChiSquared(7.8, 3)` → `0.023`

Analyzing the density for low chi-squared values in simple hypotheses: `PDFChiSquared(0.5, 1)` → `0.439`

### InvChiSquared – InvChiSquared(p, Degrees Of Freedom)

Returns the value of p in the inverse CDF of the Chi-Squared Distribution.

**Examples**

Identifying the critical chi-squared value for a 95% confidence level: `InvChiSquared(0.95, 3)` → `7.81`

Calculating a critical value for a higher confidence level in a simple test: `InvChiSquared(0.99, 1)` → `6.63`

Determining critical values for a two-tailed chi-squared test: `InvChiSquared(0.975, 2)` → `7.378`

### CDFExponential – CDFExponential(x, Rate)

Returns the value of x in the CDF of the Exponential Distribution.

**Examples**

Probability that the time until the next event is less than or equal to 10 units, given a rate of 0.5 events per unit time: `CDFExponential(10, 0.5)` → `0.9933`

Probability that the time until the next event is less than or equal to 5 units, with a rate of 1 event per unit time: `CDFExponential(5, 1)` → `0.9933`

Probability that the time until the next event is less than or equal to 3 units, given a rate of 2 events per unit time: `CDFExponential(3, 2)` → `0.9975`

### PDFExponential – PDFExponential(x, Rate)

Returns the value of x in the PDF of the Exponential Distribution.

**Examples**

Likelihood of time 1 unit between events, with a rate of 0.5: `PDFExponential(1, 0.5)` → `0.303`

Likelihood of time 2 units between events, with a rate of 1: `PDFExponential(2, 1)` → `0.135`

Likelihood of time 4 units between events, with a rate of 2: `PDFExponential(4, 2)` → `0.00067`

### InvExponential – InvExponential(p, Rate)

Returns the value of p in the inverse CDF of the Exponential Distribution.

**Examples**

Time until next event with 50% probability, at a rate of 1 event per unit time: `InvExponential(0.5, 1)` → `0.6931`

Time until next event with 80% probability, at a rate of 0.5 events per unit time: `InvExponential(0.8, 0.5)` → `3.2189`

Time until next event with 95% probability, at a rate of 2 events per unit time: `InvExponential(0.95, 2)` → `1.4979`

### CDFPoisson – CDFPoisson(x, Lambda)

Returns the value of x in the CDF of the Poisson Distribution.

**Examples**

Probability of observing up to 5 events when the average rate is 3 per interval: `CDFPoisson(5, 3)` → `0.916`

Probability of observing up to 10 events with an average rate of 7 per interval: `CDFPoisson(10, 7)` → `0.901`

Probability of observing up to 2 events when the average rate is 5 per interval: `CDFPoisson(2, 5)` → `0.124`

### PMFPoisson – PMFPoisson(x, Lambda)

Returns the value of x in the PMF of the Poisson Distribution.

**Examples**

Probability of observing exactly 4 events when the average rate is 2 per interval: `PMFPoisson(4, 2)` → `0.09`

Probability of observing no events when the average rate is 5 per interval: `PMFPoisson(0, 5)` → `0.0067`

Probability of observing exactly 8 events with an average rate of 3 per interval: `PMFPoisson(8, 3)` → `0.0081`

## Agent Functions

### Find All – [Agent Population].FindAll()

Returns a vector of all the agents in the agent population.

**Examples**

Retrieves all fish agents in the simulation: `[Fish].FindAll()`

Counts the total number of people agents: `[People].FindAll().Count()`

Calculates the average height of all tree agents: `Mean([Trees].FindAll().Map(x.Value([Height])))`

### Find State – [Agent Population].FindState([State])

Returns a vector of agents in the specified state.

**Examples**

Finds all students currently in the studying state: `[Students].FindState([Studying])`

Selects all cells that are in the infected state: `[Cells].FindState([Infected])`

Calculates the average height of all burned tree agents: `Mean([Trees].FindState([Burned]).Map(x.Value([Height])))`

### Find Not State – [Agent Population].FindNotState([State])

Returns a vector of agents not in the specified state.

**Examples**

Finds all patients who have not recovered: `[Patients].FindNotState([Recovered])`

Identifies all machines that are not operational: `[Machines].FindNotState([Operational])`

Selects all students who have not yet graduated: `[Students].FindNotState([Graduated])`

Calculates the average height of all trees that are not in the burned state: `Mean([Trees].FindNotState([Burned]).Map(x.Value([Height])))`

### Find Index – [Agent Population].FindIndex(Index)

Returns an agent with the specified index. Agent indexes start at 1.

**Examples**

Selects the first fish agent created in the simulation: `[Fish].FindIndex(1)`

Retrieves the most recently added person to the population: `[People].FindIndex([People].Count())`

Accesses the fifth book agent in the library simulation: `[Books].FindIndex(5)`

### Find Nearby – [Agent Population].FindNearby(Target, Distance)

Returns a vector of agents that are within the specified distance of a target agent or location.

**Examples**

Selects trees within 50 units of a polluted area: `[Trees].FindNearby(PollutedArea, 50)`

Retrieves fish within 20 units of a food source: `[Fish].FindNearby(FoodSource, 20)`

All infected people who are near the agent: `[Population].FindState([Infected]).FindNearby(Self, 25)`

### Find Nearest – [Agent Population].FindNearest(Target, Count=1)

Returns the nearest agents to the target agent or location. The number of agents returned is specified by the optional Count.

**Examples**

Finds the nearest customer to the store: `[Customers].FindNearest(Store)`

Identifies the three nearest prey to the predator: `[Prey].FindNearest(Predator, 3)`

Selects the five nearest emergency vehicles to an accident site: `[EmergencyVehicles].FindNearest(AccidentSite, 5)`

### Find Furthest – [Agent Population].FindFurthest(Target, Count=1)

Returns the agent farthest from the target agent or location. The number of agents returned is specified by the optional Count.

**Examples**

Identifies the four agents furthest from the target, useful for evacuation or resource distribution planning: `[Population].FindFurthest(Target, 4)`

Finds the retail store furthest from the mall to analyze competition or customer reach: `[RetailStores].FindFurthest(Mall)`

Selects the three fire stations furthest from a fire, potentially to remain on standby or cover other areas: `[FireStations].FindFurthest(Fire, 3)`

### Value – [Agent Population].Value([Primitive])

Returns the values of the specified primitive for each agent in the population as a vector.

**Examples**

Calculates the average GPA of all students in the University population: `[University].Value([GPA]).Mean()`

Finds the highest salary among all employees: `[Employees].Value([Salary]).Max()`

Identifies the car with the lowest mileage: `[Cars].Value([Mileage]).Min()`

### Set Value – [Agent Population].SetValue([Primitive], Value)

Sets the value of the specified primitive for each agent in the population to the given value. Can also be applied directly to an agent.

**Examples**

Updates the smoker status to non-smoker for all individuals in the University population: `[University].SetValue([Smoker], false)`

Refills the fuel tank of the car full capacity: `car.SetValue([FuelLevel], 100)`

### Location – [Agent].Location()

Returns the location of an agent as the vector {x, y}.

**Examples**

Gets the x-coordinate of the agent: `Self.Location().x`

Gets the y-coordinate of the agent: `Self.Location().y`

Calculates the distance between a predator and its prey: `Predator.Location().Distance(Prey.Location())`

### Set Location – [Agent].SetLocation(New Location)

Sets the location of the agent.

**Examples**

Moves the student to a new position on the map, simulating spatial dynamics in a campus model: `Student.SetLocation({x: 60, y: 40})`

Positions the taxi at the customer's location: `Taxi.SetLocation(Customer.Location())`

Simulates the eastward movement of a bird by 10 units: `Bird.SetLocation(Bird.location() + {x: -10, y: 0})`

### Index – [Agent].Index()

Gets the numeric index of an agent within an agent population. Indexes are sequential within a population and start at 1.

**Examples**

Obtains the agent's own index within its population, useful for self-referencing in complex interactions: `Self.Index()`

Assigns [Is Even] state values to agents based on their index: `IfThenElse(agent.Index() Mod 2 = 0, agent.SetValue([Is Even], true), agent.SetValue([Is Even],  false))`

### Distance – Distance(Location One, Location Two)

Returns the distance between two agents or locations.

**Examples**

Calculates the distance between two points: `Distance({x: 10, y: 5}, {x: 20, y: 15})`

Measures the distance from an agent to a food source: `Distance(Self.Location(), FoodSource.Location())`

Determines the distance from a patient to the hospital: `Distance(patient, hospital)`

### Move – [Agent].Move({x, y})

Moves an agent the amount specified.

**Examples**

Executes a random walk, moving the agent in a random direction by up to 1 unit in both the x and y dimensions: `Self.Move({x: Rand(-1, 1), y: Rand(-1, 1)})`

Moves the agent 5 units north, simulating straightforward linear movement: `Self.Move({x: 0, y: -5})`

Advances the car 10 units east, useful for simulating traffic flow or vehicle navigation: `Car.Move({x: 10, y: 0})`

### MoveTowards – [Agent].MoveTowards(Target, Distance)

Moves an agent towards a target agent or location by the distance specified.

**Examples**

Moves towards the point {0, 100} by 10 units: `Self.MoveTowards({0, 100}, 10)`

Moves towards the nearest food source by 5 units: `Self.MoveTowards([Food Sources].FindNearest(Self), 5)`

### Connected – [Agent].Connected()

Returns the agents connected to an agent in the network.

**Examples**

The number of connections an agent has: `Self.Connected().Length()`

`Self.Connected().Map(Self.Unconnect(x))` → `Removes all connections from the agent`

### Connect – [Agent 1].Connect([Agent 2], Weight=1)

Connects two agents in the network. The second agent can also be a vector of agents. Optionally, you can specify a connection weight which will be stored with the connection.

**Examples**

Connects an agent to the nearest agent with a weight of 5: `Self.Connect([Population].FindNearest(Self), 5)`

`Self.Connect(Self.FindNearest([Food Source]), 10)` → `Connects to the nearest food source with a weight of 10, indicating high priority.`

### Unconnect – [Agent 1].Unconnect([Agent 2])

Unconnects two agents in the network. The second agent can also be a vector of agents.

**Examples**

Removes all of an agent's connections: `Self.Unconnect(Self.Connected())`

Targeted disconnection from a particular agent: `Self.Unconnect(SpecificAgent)`

### Connection Weight – [Agent 1].ConnectionWeight([Agent 2])

Returns the connection weight between two agents.

**Examples**

Retrieves the weight of the connection to a specific agent: `Self.ConnectionWeight(agent)`

Identifies the strongest connection weight an agent has: `Max(Self.Connected().Map(Self.ConnectionWeight(x)))`

### Set Connection Weight – [Agent 1].SetConnectionWeight([Agent 2], Weight)

Sets the connection weight between two agents.

**Examples**

Sets the weight of the connection to Other agent as 10: `Self.SetConnectionWeight(Other, 10)`

Increases the connection weight with the Best Friend agent, indicating a very strong bond: `Self.SetConnectionWeight(BestBFriend, 100)`

### Population Size – [Agent Population].PopulationSize()

The total number of agents in a population.

**Examples**

Returns the total number of fish agents in the simulation: `[Fish].PopulationSize()`

Checks if the rabbit population exceeds 1000 to label it 'Overpopulated': `IfThenElse([Rabbits].PopulationSize() > 1000, 'Overpopulated', 'Stable')`

Fetches the current number of employee agents: `[Employees].PopulationSize()`

### Add – [Agent Population].Add(Base Agent=Initial Agent)

Adds a new agent to the population. If Base is set, the new agent will be a clone of Base Agent. Otherwise, the agent will be like a newly created agent at the start of the simulation.

**Examples**

Adds a new student agent with default properties to the University: `[University].Add()`

Clones the Tree agent, simulating the planting of a new tree with similar characteristics: `[Trees].Add(Tree)`

Hires 10 new employees, each a clone of the NewHire agent: `Repeat([Company].Add(NewHire), 10)`

### Remove – [Agent].Remove()

Removes an agent from the population. The agent will no longer be simulated. Can be used to "Kill" an agent.

**Examples**

Expel all the smokers from the Universit: `[University].FindState([Smoker]).Map(x.Remove())`

Removes a specific prey agent from the simulation: `prey.Remove()`

### Width – Width(Agent)

The width of the geographic region an agent is within.

**Examples**

The width of the geographic region the agent is within: `Width(Self)`

### Height – Height(Agent)

The height of the geographic region an agent is within.

**Examples**

The height of the geographic region the agent is within: `Height(Self)`

## User Input Functions

### Alert – Alert(Message)

Show an alert dialog with the message.

**Examples**

Notifies that the simulation has begun: `Alert("Simulation Started.")`

Warns when a population exceeds a predefined threshold: `Alert("Threshold exceeded for population growth.")`

### Prompt – Prompt(Message, Default='')

Prompts the user for an input and returns it. Can optionally provide a default value for the input.

**Examples**

Asks for a time scale with a default of 10: `timeScale <- Prompt("What time scale should we use?.", 10).Parse()`

Requests an initial population size, defaulting to 100: `initialPopulation <- Prompt("Initial population size:", 100).Parse()`

Requests a model name without providing a default value: `modelName <- Prompt("What is the name of your model?")`

### Confirm – Confirm(Message)

Prompts the user to confirm a statement and returns a boolean based on whether they confirmed it or not.

**Examples**

Asks the user if they want to use advanced settings: `advanced <- Confirm("Use advanced mode?")`

Asks whether to continue the simulation after a certain number of steps: `continueSimulation <- Confirm("Continue the simulation after 100 steps?")`