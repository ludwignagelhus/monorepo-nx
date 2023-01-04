# Using fp-ts

todo

# Introduction

Collection of examples and articles about often-done things in fp-ts.

# Option

Advantages of `fp-ts/option` compared to javascript's `undefined` and optional chanining (`?.`).

## O.Chain vs O.Map

todo

## TODO: Changing types of functions

```typescript
const f = (A) => Option<B>;
// to this
const ff = (A) => B;
// and back again
const f = (A) => Option<B>;
```

# Transitioning from ramda

Some functions from ramda do not have a 1-1 fp-ts counterpart; some of the popualar ones
being `assoc`, `prop`, `reduceWhile`, number comparison predicates(`gt` etc.), and `equals`.
groupBy and sortBy too?

# Gotchas

Some things don't work the way one might expect them to.
todo

# Differences from Haskell, Purescript, and Scala

todo
