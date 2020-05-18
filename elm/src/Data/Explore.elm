module Data.Explore exposing (ExploreData, Update(..), init, update)

import Dict exposing (Dict)


type alias ExploreData =
    { wanderCost : Int
    , wanderEventCount : Int
    , gatherDict : Dict String Int
    }


init : ExploreData
init =
    { wanderCost = 15
    , wanderEventCount = 0
    , gatherDict =
        Dict.fromList
            [ ( "grain", 0 )
            , ( "stone", 0 )
            , ( "wood", 0 )
            , ( "knife", 0 )
            ]
    }


type Update
    = UpdateWanderCost Int
    | UpdateWanderAmount


update : ExploreData -> Update -> ExploreData
update exploreData exploreUpdate =
    case exploreUpdate of
        UpdateWanderCost int ->
            { exploreData | wanderCost = int }

        UpdateWanderAmount ->
            { exploreData | wanderEventCount = exploreData.wanderEventCount + 1 }
