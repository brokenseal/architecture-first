# architecture-first
A first attempt to find the best architecture layout for a frontend application

# What defines a good architecture?
The quest to the best structure for a frontend application, or for any
application for that matters, is not easy and I strongly believe it's not a
fit-for-all solution. That said, I find it is still important to define one,
if for anything, at least to stay away from the spaghetti-code.

I believe this is a quest into the unknown with only a couple of clear points:

- separation of concerns
- tests first
- favor immutability over mutating objects
- favor pure functions over impure ones

# Separation of concncerns
The goal of separating concerns is to:

- make it easier to reason about particular code components or parts of the code base
- make it easier to test code
- reduce the number of bugs

Separation of concerns is a very broad topic and often is achieved in different way, depending how close to the code
you look, how you cut your code into components that do one thing and one thing only, plus it's importanto to consider
responsibilities as a whole: presentation logic, application logic, networking, etc.

For this round, we will try to show, in a very obvious way, how the architecture of our code will look like, by
creating folders depending on this design:

- presentation layer: this is where user interaction happens
- application logic layer: this is where objects interaction happens and data is manipulated
    - use cases: this is what better represent what brings business value, the core reason why software is written, it is therefore important to make it obvious at the architecture level as well
- data layer
    - state management
    - persistency
- networking layer
- orchestration: last but not least, it is important to define a place in the code that is responsible to maintain communications between the other layers, the glue of the architecture; in this case we will try base our communications on a simple bus implementation

As mentioned before, it is important to set the tone of the architecture by designing how to cut responsibilities and at
what level.
