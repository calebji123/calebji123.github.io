module SharedState exposing (SharedState, SharedStateUpdate(..), init, update)

{-
   a record holding information all models will need,
   and is passed around during their update calls.

   This module ONLY deals with itself. the update doesn't change urls, for example, though it can.
   The update only returns new sharedStates.
-}

import Browser.Navigation
import Data.Explore exposing (ExploreData)
import Data.Resources exposing (ResourcesData)
import Process
import Task


type GameState
    = StartOff
    | TenGrain


type alias SharedState =
    { windowHeight : Int
    , gameState : GameState
    , resourcesTabUnlocked : Bool
    , exploreTabUnlocked : Bool
    , grainAmount : Int
    , woodAmount : Int
    , stoneAmount : Int
    , farmName : String
    , canWood : Bool
    , canStone : Bool
    , resourcesData : ResourcesData
    , exploreData : ExploreData
    }


init : Int -> SharedState
init height =
    { windowHeight = height
    , gameState = StartOff
    , resourcesTabUnlocked = True
    , exploreTabUnlocked = True
    , grainAmount = 11
    , woodAmount = 0
    , stoneAmount = 0
    , farmName = "A Lone Field"
    , canWood = False
    , canStone = False
    , resourcesData = Data.Resources.init
    , exploreData = Data.Explore.init
    }


type SharedStateUpdate
    = UpdateGrain Int
    | UpdateWood Int
    | UpdateStone Int
    | ResetGrain
    | ResetWood
    | ResetStone
    | UpdateResources Data.Resources.Update
    | UpdateExplore Data.Explore.Update
    | NoUpdate


update : SharedState -> SharedStateUpdate -> ( SharedState, Cmd SharedStateUpdate )
update sharedState sharedStateUpdate =
    case sharedStateUpdate of
        UpdateGrain int ->
            ( let
                newGrainAmount =
                    sharedState.grainAmount + int

                newResourcesData =
                    Data.Resources.update sharedState.resourcesData <| Data.Resources.UpdateCanClick "grain" False

                newGameState =
                    if newGrainAmount == 10 then
                        TenGrain

                    else
                        sharedState.gameState
              in
              { sharedState
                | grainAmount = newGrainAmount
                , resourcesData = newResourcesData
                , gameState = newGameState
                , exploreTabUnlocked =
                    case newGameState of
                        TenGrain ->
                            True

                        _ ->
                            sharedState.exploreTabUnlocked
              }
            , if sharedState.resourcesData.canClickGrain then
                Process.sleep sharedState.resourcesData.grainDelay
                    |> Debug.log "sleeping"
                    |> Task.perform (\_ -> ResetGrain)

              else
                Cmd.none
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
                |> Debug.log "pog"
            , Cmd.none
            )

        ResetWood ->
            Debug.log "Resetted!" ( { sharedState | resourcesData = Data.Resources.update sharedState.resourcesData (Data.Resources.UpdateCanClick "wood" True) }, Cmd.none )

        ResetStone ->
            ( { sharedState | resourcesData = Data.Resources.update sharedState.resourcesData (Data.Resources.UpdateCanClick "stone" True) }, Cmd.none )

        UpdateResources resourcesUpdate ->
            ( { sharedState | resourcesData = Data.Resources.update sharedState.resourcesData resourcesUpdate }, Cmd.none )

        UpdateExplore exploreUpdate ->
            ( { sharedState | exploreData = Data.Explore.update sharedState.exploreData exploreUpdate }, Cmd.none )

        NoUpdate ->
            -- when we have to output a SharedStateUpdate but don't want to change anything
            ( sharedState, Cmd.none )
