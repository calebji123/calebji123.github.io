module Tabs.Explore exposing (..)

-- import Routes exposing (Route)

import Browser.Navigation as Navigation
import Element exposing (Element, text)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html.Attributes exposing (style)
import SharedState exposing (SharedState, SharedStateUpdate(..))



-- MODEL


type alias Model =
    {}


init : Model
init =
    {}



-- VIEW


padding =
    { top = 2
    , right = 2
    , bottom = 2
    , left = 2
    }


noOutline =
    Element.htmlAttribute <| style "box-shadow" "none"


view : Model -> SharedState -> Element Msg
view model sharedState =
    Element.column
        [ sharedState.windowHeight - 115 |> Element.px |> Element.height
        , Element.width Element.fill
        ]
        [ -- Top Margin
          Element.row
            [ Element.height (Element.fillPortion 1) ]
            []

        --Content
        , Element.row
            [ Element.width Element.fill
            , Element.height (Element.fillPortion 9)
            , Element.spacing 20
            ]
            [ --Left Margin
              Element.column
                [ Element.width (Element.fillPortion 1) ]
                []

            -- Wander
            , Element.column
                [ Border.width 1
                , Border.rounded 3
                , Element.width (Element.fillPortion 1)
                , Element.alignTop
                , Element.height Element.fill
                ]
                [ Element.paragraph
                    [ Font.center
                    , Element.paddingXY 0 10
                    ]
                    [ text "Wander:" ]
                , Element.paragraph
                    [ Font.size 15
                    , Font.center
                    , Element.paddingEach { padding | top = 20 }
                    ]
                    [ "Cost: " ++ String.fromInt sharedState.exploreData.wanderCost ++ " grain" |> text ]
                , Input.button
                    [ noOutline
                    , Element.centerX
                    , Element.paddingEach padding
                    , Element.htmlAttribute <| style "margin-top" "50"
                    , Font.size 15
                    ]
                    { label = text "Wander!"
                    , onPress = Just NoOp
                    }
                ]

            --Map
            , Element.column
                [ Element.width (Element.fillPortion 2)
                , Element.height Element.fill
                ]
                []

            --rightMargin
            , Element.column
                [ Element.width (Element.fillPortion 1) ]
                []
            ]

        --Bottom Margin
        , Element.row
            [ Element.height (Element.fillPortion 2) ]
            []
        ]



-- UPDATE


type Msg
    = NoOp


update : SharedState -> Msg -> Model -> ( Model, Cmd Msg, SharedStateUpdate )
update sharedState msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none, NoUpdate )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
