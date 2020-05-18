module SharedState exposing (PopupSizes(..), SharedState, SharedStateUpdate(..), init, initDevelop, update)

{-
   a record holding information all models will need,
   and is passed around during their update calls.

   This module ONLY deals with itself. the update doesn't change urls, for example, though it can.
   The update only returns new sharedStates.
-}

import Browser.Navigation
import Data.Explore exposing (ExploreData)
import Data.Inventory exposing (InventoryData)
import Data.Resources exposing (ResourcesData)
import Monologues exposing (Monologues)
import Platform.Cmd
import Process
import Random
import Task
import WanderText exposing (WanderText, init)


type GameState
    = StartOff
    | TwoGrain
    | TenGrain


type PopupSizes
    = Small
    | Medium
    | Big


type alias SharedState =
    { windowHeight : Int
    , gameState : GameState
    , resourcesTabUnlocked : Bool
    , exploreTabUnlocked : Bool
    , inventoryTabUnlocked : Bool
    , grainAmount : Int
    , woodAmount : Int
    , stoneAmount : Int
    , farmName : String
    , canWood : Bool
    , canStone : Bool
    , isPopupActive : Bool
    , popupMessage : String
    , popupSize : PopupSizes
    , mapUnlocked : Bool
    , bruiserFound : Bool
    , resourcesData : ResourcesData
    , exploreData : ExploreData
    , inventoryData : InventoryData
    , monologues : Monologues
    , wanderText : WanderText
    }


init : Int -> SharedState
init height =
    { windowHeight = height
    , gameState = StartOff
    , resourcesTabUnlocked = False
    , exploreTabUnlocked = False
    , inventoryTabUnlocked = False
    , grainAmount = 0
    , woodAmount = 0
    , stoneAmount = 0
    , farmName = ""
    , canWood = False
    , canStone = False
    , isPopupActive = False
    , popupMessage = ""
    , popupSize = Small
    , mapUnlocked = False
    , bruiserFound = False
    , resourcesData = Data.Resources.init
    , exploreData = Data.Explore.init
    , inventoryData = Data.Inventory.init
    , monologues = Monologues.init
    , wanderText = WanderText.init
    }


initDevelop : Int -> SharedState
initDevelop height =
    { windowHeight = height
    , gameState = TenGrain
    , resourcesTabUnlocked = True
    , exploreTabUnlocked = True
    , inventoryTabUnlocked = True
    , grainAmount = 10000
    , woodAmount = 0
    , stoneAmount = 0
    , farmName = "A Lone Field"
    , canWood = False
    , canStone = False
    , isPopupActive = False
    , popupMessage = ""
    , popupSize = Small
    , mapUnlocked = True
    , bruiserFound = False
    , resourcesData = Data.Resources.init
    , exploreData = Data.Explore.init
    , inventoryData = Data.Inventory.init
    , monologues = Monologues.init
    , wanderText = WanderText.init
    }


type SharedStateUpdate
    = UpdateClickGrain Int
    | UpdateGrain Int
    | UpdateWood Int
    | UpdateStone Int
    | ResetGrain
    | ResetWood
    | ResetStone
    | CreateRandomWander
    | DoWander WanderType
    | UpdateResources Data.Resources.Update
    | UpdateExplore Data.Explore.Update
    | TogglePopup
    | NoUpdate


update : SharedState -> SharedStateUpdate -> ( SharedState, Cmd SharedStateUpdate )
update sharedState sharedStateUpdate =
    case sharedStateUpdate of
        UpdateClickGrain int ->
            ( let
                newResourcesData =
                    Data.Resources.update sharedState.resourcesData <| Data.Resources.UpdateCanClick "grain" False
              in
              { sharedState
                | resourcesData = newResourcesData
              }
            , Platform.Cmd.batch
                [ Process.sleep sharedState.resourcesData.grainDelay
                    |> Task.perform (\_ -> ResetGrain)
                , Process.sleep 0
                    |> Task.perform (\_ -> UpdateGrain int)
                ]
            )

        UpdateGrain int ->
            let
                newGrainAmount =
                    sharedState.grainAmount + int

                newGameState =
                    if newGrainAmount == 2 then
                        TwoGrain

                    else if newGrainAmount == 10 then
                        TenGrain

                    else
                        sharedState.gameState

                ( newSharedState, newSharedStateCmd ) =
                    if sharedState.grainAmount + int == 2 || sharedState.grainAmount + int == 10 then
                        update sharedState TogglePopup

                    else
                        ( sharedState, Cmd.none )
            in
            ( { newSharedState
                | grainAmount = newGrainAmount
                , gameState = newGameState
                , resourcesTabUnlocked =
                    case newGameState of
                        TwoGrain ->
                            True

                        _ ->
                            sharedState.resourcesTabUnlocked
                , farmName =
                    case newGameState of
                        TwoGrain ->
                            "A Lone Field"

                        _ ->
                            sharedState.farmName
                , exploreTabUnlocked =
                    case newGameState of
                        TenGrain ->
                            True

                        _ ->
                            sharedState.exploreTabUnlocked
              }
            , newSharedStateCmd
            )

        UpdateWood int ->
            ( { sharedState
                | woodAmount = sharedState.woodAmount + int
                , resourcesData = Data.Resources.update sharedState.resourcesData <| Data.Resources.UpdateCanClick "wood" False
              }
            , Cmd.none
            )

        UpdateStone int ->
            ( { sharedState
                | stoneAmount = sharedState.woodAmount + int
                , resourcesData = Data.Resources.update sharedState.resourcesData <| Data.Resources.UpdateCanClick "stone" False
              }
            , Cmd.none
            )

        ResetGrain ->
            ( { sharedState | resourcesData = Data.Resources.update sharedState.resourcesData (Data.Resources.UpdateCanClick "grain" True) }
            , Cmd.none
            )

        ResetWood ->
            ( { sharedState | resourcesData = Data.Resources.update sharedState.resourcesData (Data.Resources.UpdateCanClick "wood" True) }, Cmd.none )

        ResetStone ->
            ( { sharedState | resourcesData = Data.Resources.update sharedState.resourcesData (Data.Resources.UpdateCanClick "stone" True) }, Cmd.none )

        CreateRandomWander ->
            ( { sharedState | grainAmount = sharedState.grainAmount - sharedState.exploreData.wanderCost }, doWander )

        DoWander wanderState ->
            case wanderState of
                WanderAimlessly ->
                    ( { sharedState | popupMessage = sharedState.wanderText.aimless, isPopupActive = True, popupSize = Medium }, Cmd.none )

                FindEvent ->
                    case sharedState.exploreData.wanderEventCount of
                        0 ->
                            ( { sharedState
                                | popupMessage = sharedState.wanderText.foundMap
                                , exploreData = Data.Explore.update sharedState.exploreData Data.Explore.UpdateWanderAmount
                                , mapUnlocked = True
                                , isPopupActive = True
                                , popupSize = Small
                              }
                            , Cmd.none
                            )

                        1 ->
                            ( { sharedState
                                | popupMessage = sharedState.wanderText.foundBruiser
                                , exploreData = Data.Explore.update sharedState.exploreData Data.Explore.UpdateWanderAmount
                                , bruiserFound = True
                                , isPopupActive = True
                                , popupSize = Small
                              }
                            , Cmd.none
                            )

                        _ ->
                            ( { sharedState | isPopupActive = True }, Cmd.none )

                Robbed ->
                    ( { sharedState | popupMessage = sharedState.wanderText.robbed, isPopupActive = True }, Cmd.none )

        UpdateResources resourcesUpdate ->
            ( { sharedState | resourcesData = Data.Resources.update sharedState.resourcesData resourcesUpdate }, Cmd.none )

        UpdateExplore exploreUpdate ->
            ( { sharedState | exploreData = Data.Explore.update sharedState.exploreData exploreUpdate }, Cmd.none )

        TogglePopup ->
            ( { sharedState
                | isPopupActive = not sharedState.isPopupActive
                , popupMessage =
                    case sharedState.gameState of
                        TwoGrain ->
                            sharedState.monologues.twoGrain

                        TenGrain ->
                            sharedState.monologues.tenGrain

                        _ ->
                            sharedState.popupMessage
              }
            , Cmd.none
            )

        NoUpdate ->
            -- when we have to output a SharedStateUpdate but don't want to change anything
            ( sharedState, Cmd.none )


type WanderType
    = WanderAimlessly
    | FindEvent
    | Robbed


wanderRandom : Random.Generator WanderType
wanderRandom =
    Random.weighted
        ( 1, Robbed )
        [ ( 29, WanderAimlessly )
        , ( 80, FindEvent )
        ]


doWander : Cmd SharedStateUpdate
doWander =
    Random.generate DoWander wanderRandom
