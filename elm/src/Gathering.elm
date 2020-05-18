module Gathering exposing (..)

import Browser
import Element exposing (Element)
import SharedState exposing (SharedState, SharedStateUpdate(..))
import Task
import Time


type alias Model =
    { bruiserSpeed : Float
    , bruiserGatherAmount : Int
    }


init : Model
init =
    { bruiserSpeed = 10000
    , bruiserGatherAmount = 1
    }


type Gather
    = AddGrain Int
    | No


update : Gather -> Model -> SharedState -> ( Model, SharedStateUpdate )
update msg model sharedState =
    case msg of
        AddGrain int ->
            ( model
            , UpdateGrain int
            )

        No ->
            ( model, NoUpdate )


subscriptions : Model -> Sub Gather
subscriptions model =
    Time.every model.bruiserSpeed (\_ -> AddGrain model.bruiserGatherAmount)
