module Main exposing (main)

import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Random
import Random.Extra as RandExtra


type alias Model =
    { wood : Int
    , grain : Int
    , stone : Int
    }


initialModel : () -> ( Model, Cmd Msg )
initialModel _ =
    ( { wood = 0
      , grain = 0
      , stone = 0
      }
    , Cmd.none
    )


modelIterator : List (Model -> Int)
modelIterator =
    [ .wood, .grain, .stone ]


type Msg
    = GetRandItems
    | GotRandom Model


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        GetRandItems ->
            ( model, Random.generate GotRandom modelGenerator )

        GotRandom randModel ->
            ( randModel, Cmd.none )


view : Model -> Html Msg
view model =
    div []
        [ button [ onClick GetRandItems ] [ text "Random Items" ]
        , div [] <|
            List.map
                (\func -> text <| String.fromInt (func model) ++ " ")
                modelIterator
        ]


modelGenerator : Random.Generator Model
modelGenerator =
    Random.map Model (Random.int 1 10)
        |> RandExtra.andMap (Random.int 5 20)
        |> RandExtra.andMap (Random.int 10 40)


main : Program () Model Msg
main =
    Browser.element
        { init = initialModel
        , view = view
        , update = update
        , subscriptions = always Sub.none
        }
