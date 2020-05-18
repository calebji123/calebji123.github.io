module Tabs.Inventory exposing (..)

-- import Routes exposing (Route)

import Element exposing (Element, text)
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
        [ Element.width Element.fill
        , sharedState.windowHeight - 115 |> (*) 2 |> Element.px |> Element.height
        ]
        [ Element.row
            [ Element.height (Element.fillPortion 1) ]
            []
        , Element.row
            [ Element.width Element.fill
            , Element.height (Element.fillPortion 6)
            , Element.spacing 10
            ]
            [ Element.row
                [ Element.width (Element.fillPortion 1) ]
                []
            , Element.row
                [ Border.width 1
                , Element.width (Element.fillPortion 2)
                , Element.height Element.fill
                ]
                [ Element.paragraph
                    [ Element.alignTop
                    , Element.paddingXY 0 10
                    , Font.center
                    ]
                    [ text "Inventory:" ]
                , Element.row
                    []
                    []
                ]
            , Element.row
                [ Element.width (Element.fillPortion 1) ]
                []
            ]
        , Element.row
            [ Element.height (Element.fillPortion 1) ]
            []
        , Element.row
            [ Element.height (Element.fillPortion 7) ]
            []
        , Element.row
            [ Element.height (Element.fillPortion 1) ]
            []
        , Element.row
            [ Element.height (Element.fillPortion 6) ]
            []
        , Element.row
            [ Element.height (Element.fillPortion 2) ]
            []
        ]



-- UPDATE


type Msg
    = Wander
    | NoOp


update : SharedState -> Msg -> Model -> ( Model, Cmd Msg, SharedStateUpdate )
update sharedState msg model =
    case msg of
        Wander ->
            ( model
            , Cmd.none
            , if sharedState.grainAmount >= sharedState.exploreData.wanderCost then
                CreateRandomWander

              else
                NoUpdate
            )

        NoOp ->
            ( model, Cmd.none, NoUpdate )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
