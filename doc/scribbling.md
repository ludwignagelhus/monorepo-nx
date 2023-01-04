# Random thoughts etc

Writing tests at higher level is harder than writing more specific tests.

The higher level things require smaller level things.
Difficult to keep all things in head at the same time.

# List of libs and modules providing equivalents of ramda functions

https://samhh.github.io/fp-ts-std/ramda (most complete)
https://grossbart.github.io/fp-ts/recipes/ramda

# Moving to fp-ts from ramda and similar libraries

Missing some things from ramda...

- prop
- equals: fp-ts-equals does not work the same way... takes and Eq object
- gt, lt
- assoc: fp-ts-ramda/assoc and spectacles/upsert don't work the same way...

any other?
Thinking about two possibilites:

1. keep ramda as a dependency along with fp-ts
2. add library fp-ts-ramda which implements some of the functions from ramda.
   Try 2 first, and then move back to ramda if I miss more functions not present in fp-ts-ramda.

Found some libs which cover some of missing functions:
prop -> spectacles-ts/get
equals -> [missing]
