module Main exposing (..)

import Browser
import Element exposing (Element, mouseOver, text)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Html exposing (Html)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import SharedState exposing (SharedState, SharedStateUpdate)
import Tabs.Explore as Explore
import Tabs.Resources as Resources



-- Main


main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = subscriptions
        }



-- Model


type alias Flags =
    WindowSize


type alias WindowSize =
    { width : Int
    , height : Int
    }


type alias Model =
    { currentTab : Tab
    , sharedState : SharedState
    }


type Tab
    = Resources Resources.Model
    | Explore Explore.Model


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { currentTab = Resources Resources.init
      , sharedState = SharedState.init flags.height
      }
    , Cmd.none
    )



-- Update


type Msg
    = ResourcesMsg Resources.Msg
    | ExploreMsg Explore.Msg
    | ToTab Tab
    | SharedStateUpdate SharedState.SharedStateUpdate
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( model.currentTab, msg ) of
        ( Resources resourcesModel, ResourcesMsg resourcesMsg ) ->
            Resources.update model.sharedState resourcesMsg resourcesModel
                |> updateWith Resources ResourcesMsg model

        ( currentTab, ToTab tab ) ->
            if tab == currentTab then
                ( model, Cmd.none )

            else
                ( { model | currentTab = tab }, Cmd.none )

        ( _, SharedStateUpdate ssUpdate ) ->
            let
                ( newSharedState, sharedStateMsg ) =
                    SharedState.update model.sharedState ssUpdate
            in
            ( { model | sharedState = newSharedState }, Cmd.none )

        ( _, _ ) ->
            ( model, Cmd.none )


strip : ( SharedState, Cmd SharedStateUpdate ) -> SharedState
strip ( sharedState, sharedStateUpdate ) =
    sharedState


updateWith :
    (subModel -> Tab)
    -> (subMsg -> Msg)
    -> Model
    -> ( subModel, Cmd subMsg, SharedStateUpdate )
    -> ( Model, Cmd Msg )
updateWith toTab toMsg model ( subModel, subMsg, sharedStateUpdate ) =
    let
        ( newSharedState, sharedStateMsg ) =
            SharedState.update model.sharedState sharedStateUpdate
    in
    ( { model
        | currentTab = toTab subModel
        , sharedState = newSharedState
      }
    , Cmd.batch
        [ Cmd.map toMsg subMsg
        , Cmd.map SharedStateUpdate sharedStateMsg
        ]
    )



-- Subscriptions


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



-- View


view : Model -> Html Msg
view model =
    Element.column
        [ Element.width Element.fill ]
        [ -- Title
          Element.paragraph
            [ Element.centerX
            , Element.paddingXY 0 30
            , Element.width Element.shrink
            , Font.family
                [ Font.typeface "Verdana"
                , Font.sansSerif
                ]
            , Font.size 32
            , Font.bold
            ]
            [ text model.sharedState.farmName ]
        , navbar model
        , content model
        ]
        |> Element.layout []


noOutline =
    Element.htmlAttribute <| style "box-shadow" "none"


navbar : Model -> Element Msg
navbar model =
    Element.row
        [ Element.centerX
        , Font.size 15
        ]
        [ Input.button
            [ noOutline
            , Element.paddingXY 20 5
            , mouseOver [ Element.rgb255 221 221 221 |> Background.color ]
            , Element.htmlAttribute <| style "transition" "0.3s"
            ]
            { onPress = Resources Resources.init |> ToTab |> Just
            , label = text "Resources"
            }
        , if model.sharedState.exploreTabUnlocked then
            Input.button
                [ noOutline
                , Element.paddingXY 20 5
                , mouseOver [ Element.rgb255 221 221 221 |> Background.color ]
                , Element.htmlAttribute <| style "transition" "0.3s"
                ]
                { onPress = Explore Explore.init |> ToTab |> Just
                , label = text "Explore"
                }

          else
            Element.none
        ]


content : Model -> Element Msg
content model =
    case model.currentTab of
        Resources resourcesModel ->
            Resources.view resourcesModel model.sharedState |> Element.map ResourcesMsg

        Explore exploreModel ->
            Explore.view exploreModel model.sharedState |> Element.map ExploreMsg
