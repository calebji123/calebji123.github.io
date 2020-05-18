module Monologues exposing (Monologues, init)


type alias Monologues =
    { twoGrain : String
    , tenGrain : String
    }


init : Monologues
init =
    { twoGrain = """
        You find yourself alone in a ripe wheat field. By instinct you harvest the crop. 
        Looking down you see your four hooves in action as your stubby, rounded body swings from side to side. 
        You're a pig, and you've forgotten everything, except one thing, your name. You're Bonaparte, the pig, and no adversary will ever cut you down!!
        You continue harvesting.
        """
    , tenGrain = """
        You've been working long hours now, and a lump of tasty grain is beginning to grow. You look out into the horizon with lust. 
        Your paws are itching to stomp into the unknowns, but you are cautious. There is no guarantee of food, and your short legs can only go so fast. 
        Best to take it slow
    """
    }
