module Data.Resources exposing (ResourcesData, Update(..), init, update)


type alias ResourcesData =
    { grainDelay : Float -- in milliseconds
    , canClickGrain : Bool
    , grainGetAmount : Int
    , woodDelay : Float
    , canClickWood : Bool
    , woodGetAmount : Int
    , stoneDelay : Float
    , canClickStone : Bool
    , stoneGetAmount : Int
    }


init : ResourcesData
init =
    { grainDelay = 2000
    , canClickGrain = True
    , grainGetAmount = 1
    , woodDelay = 3000
    , canClickWood = True
    , woodGetAmount = 1
    , stoneDelay = 4000
    , canClickStone = True
    , stoneGetAmount = 1
    }


type Update
    = UpdateCanClick String Bool
    | UpdateDelay String Float
    | UpdateGetAmount String Int
    | NoUpdate


update : ResourcesData -> Update -> ResourcesData
update resourcesData resourcesUpdate =
    case resourcesUpdate of
        UpdateCanClick resource bool ->
            if resource == "grain" then
                { resourcesData | canClickGrain = bool }

            else if resource == "wood" then
                { resourcesData | canClickWood = bool }

            else
                { resourcesData | canClickStone = bool }

        UpdateDelay resource time ->
            if resource == "grain" then
                { resourcesData | grainDelay = time }

            else if resource == "wood" then
                { resourcesData | woodDelay = time }

            else
                { resourcesData | stoneDelay = time }

        UpdateGetAmount resource amount ->
            if resource == "grain" then
                { resourcesData | grainGetAmount = amount }

            else if resource == "wood" then
                { resourcesData | woodGetAmount = amount }

            else
                { resourcesData | stoneGetAmount = amount }

        NoUpdate ->
            resourcesData
