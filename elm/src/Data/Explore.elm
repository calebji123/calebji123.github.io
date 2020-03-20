module Data.Explore exposing (ExploreData, Update(..), init, update)


type alias ExploreData =
    { wanderCost : Int
    }


init : ExploreData
init =
    { wanderCost = 10
    }


type Update
    = UpdateWanderCost Int


update : ExploreData -> Update -> ExploreData
update exploreData exploreUpdate =
    case exploreUpdate of
        UpdateWanderCost int ->
            { exploreData | wanderCost = int }
