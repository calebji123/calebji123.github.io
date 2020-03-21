module Tabs.Resources exposing (..)

-- import Routes exposing (Route)

import Data.Resources
import Element exposing (Element, text)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import Process
import SharedState exposing (SharedState, SharedStateUpdate(..))
import Task



-- MODEL


type alias Model =
    {}


init : Model
init =
    {}



-- VIEW


noOutline =
    Element.htmlAttribute <| style "box-shadow" "none"


endAppend : String -> String -> String
endAppend string1 string2 =
    string2 ++ string1


view : Model -> SharedState -> Element Msg
view model sharedState =
    Element.column
        [ Element.width Element.fill ]
        [ -- Gathering buttons
          Element.row
            [ Element.spacing 30
            , Element.alignLeft
            , Font.size 15
            , Element.htmlAttribute <| style "margin-left" "25vw"
            , Element.htmlAttribute <| style "margin-top" "7vh"
            ]
            [ Input.button
                [ Border.width 1
                , Element.paddingXY 20 15
                , Border.rounded 3
                , noOutline
                , if sharedState.resourcesData.canClickGrain then
                    Element.rgb 1 1 1
                        |> Background.color

                  else
                    Element.rgb255 169 169 169
                        |> Background.color
                ]
                { onPress = Just IncreaseGrain
                , label = text "Grain"
                }
            , if sharedState.canWood then
                Input.button
                    [ Border.width 1
                    , Element.paddingXY 20 15
                    , Border.rounded 3
                    , noOutline
                    , if sharedState.resourcesData.canClickWood then
                        Element.rgb 1 1 1
                            |> Background.color

                      else
                        Element.rgb255 169 169 169
                            |> Background.color
                    ]
                    { onPress = Just IncreaseWood
                    , label = text "Wood"
                    }

              else
                Element.none
            , if sharedState.canStone then
                Input.button
                    [ Border.width 1
                    , Element.paddingXY 20 15
                    , Border.rounded 3
                    , noOutline
                    , if sharedState.resourcesData.canClickStone then
                        Element.rgb 1 1 1
                            |> Background.color

                      else
                        Element.rgb255 169 169 169
                            |> Background.color
                    ]
                    { onPress = Just IncreaseStone
                    , label = text "Stone"
                    }

              else
                Element.none
            ]

        -- Resource display
        , if sharedState.grainAmount > 0 then
            Element.column
                [ Border.width 1
                , Font.size 15
                , Element.alignRight
                , Element.htmlAttribute <| style "margin-right" "10vw"
                , Element.htmlAttribute <| style "top" "-43px"
                ]
                [ Element.paragraph
                    [ Element.paddingXY 20 15 ]
                    [ sharedState.grainAmount
                        |> String.fromInt
                        |> endAppend " grain"
                        |> text
                    ]
                , if sharedState.woodAmount > 0 then
                    Element.paragraph
                        [ Element.paddingXY 20 15 ]
                        [ sharedState.woodAmount
                            |> String.fromInt
                            |> endAppend " wood"
                            |> text
                        ]

                  else
                    Element.none
                , if sharedState.stoneAmount > 0 then
                    Element.paragraph
                        [ Element.paddingXY 20 15 ]
                        [ sharedState.woodAmount
                            |> String.fromInt
                            |> endAppend " stone"
                            |> text
                        ]

                  else
                    Element.none
                ]

          else
            Element.none
        ]



-- UPDATE


type Msg
    = IncreaseGrain
    | IncreaseWood
    | IncreaseStone
    | ResetGrain
    | ResetWood
    | ResetStone
    | NoOp


update : SharedState -> Msg -> Model -> ( Model, Cmd Msg, SharedStateUpdate )
update sharedState msg model =
    case msg of
        IncreaseGrain ->
            ( model
            , Cmd.none
            , if sharedState.resourcesData.canClickGrain then
                UpdateGrain sharedState.resourcesData.grainGetAmount

              else
                NoUpdate
            )

        IncreaseWood ->
            ( model
            , if sharedState.resourcesData.canClickWood then
                Process.sleep sharedState.resourcesData.woodDelay
                    |> Task.perform (\() -> ResetWood)

              else
                Cmd.none
            , if sharedState.resourcesData.canClickWood then
                UpdateWood sharedState.resourcesData.woodGetAmount

              else
                NoUpdate
            )

        IncreaseStone ->
            ( model
            , if sharedState.resourcesData.canClickStone then
                Process.sleep sharedState.resourcesData.stoneDelay
                    |> Task.perform (\() -> ResetStone)

              else
                Cmd.none
            , if sharedState.resourcesData.canClickStone then
                UpdateStone sharedState.resourcesData.stoneGetAmount

              else
                NoUpdate
            )

        ResetGrain ->
            ( model, Cmd.none, UpdateResources <| Data.Resources.UpdateCanClick "grain" True )

        ResetWood ->
            ( model, Cmd.none, UpdateResources <| Data.Resources.UpdateCanClick "wood" True )

        ResetStone ->
            ( model, Cmd.none, UpdateResources <| Data.Resources.UpdateCanClick "stone" True )

        NoOp ->
            ( model, Cmd.none, NoUpdate )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
