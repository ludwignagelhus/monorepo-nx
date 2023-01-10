# State machine flow

player action
-> update state
-> check if

# Edge cases:

Should have tests for these.

## Sitting out:

players can sit out during a hand.

## Leaving table

What happens to cards, seats...
Will a player leaving the table be immediately visable to other players at the table?
How to handle state updates if want to hide that a player in a hand left, while the hand is ongoing?
Ie. hide the fact that they left, until it is their turn in the hand.
