module WanderText exposing (WanderText, init)


type alias WanderText =
    { aimless : String
    , aimlessTwo : String
    , foundMap : String
    , foundBruiser : String
    , foundTools : String
    , foundWood : String
    , robbed : String
    }


init : WanderText
init =
    { aimless = """
        You set out with your grain. It isn't long until the great afternoon sun beats down on you. 
        You look around. In your excitedness to set out, you failed to realise that you've set out in the direction that you went last time!
        At this time wasted, with no reward. Knowing there is no possibility of exploring novel lands, you set to work picking up scraps along the pathside to make your trip meaningful."""
    , aimlessTwo = """
            The scorching sun beats on you as you leave the field. The hard day's work, intense heat, and sun's blinding rays make you wish for the comfort of mommy's home again. 
            To add to the luck, you stumble on a rock, which rolls you into a tree. This day is not for exploring, perhaps going back is the better option.
            Walking back, you see a crate. It looks like it has some basic supplies in it! Perhaps this day isn't too bad after all! Nope, you fall into a ditch.
            """
    , foundMap = """
        You walk straight in a direction. Mind clear and muscles aching for a little stretch. While scouring the vicinity, you notice a pile of parchment lying on the corner.
        """
    , foundBruiser = """
        Lol. Horsey do good. Good thing not glue
    """
    , foundTools = """
        Good boiiiiiii
        """
    , foundWood = """
        Harvest!!!
        """
    , robbed = "You got robbed"
    }
