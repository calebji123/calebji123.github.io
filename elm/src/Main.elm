module Main exposing (..)

import Browser
import Element exposing (Element, mouseOver, text)
import Element.Background as Background
import Element.Border as Border
import Element.Font as Font
import Element.Input as Input
import Gathering
import Html exposing (Html)
import Html.Attributes exposing (style)
import Html.Events exposing (onClick)
import SharedState exposing (PopupSizes(..), SharedState, SharedStateUpdate)
import Tabs.Explore as Explore
import Tabs.Inventory as Inventory
import Tabs.Resources as Resources
import Task



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
    , gatheringModel : Gathering.Model
    }


type Tab
    = Resources Resources.Model
    | Explore Explore.Model
    | Inventory Inventory.Model


init : Flags -> ( Model, Cmd Msg )
init flags =
    ( { currentTab = Resources Resources.init
      , sharedState = SharedState.initDevelop flags.height
      , gatheringModel = Gathering.init
      }
    , Cmd.none
    )



-- Update


type Msg
    = ResourcesMsg Resources.Msg
    | ExploreMsg Explore.Msg
    | InventoryMsg Inventory.Msg
    | GatheringMsg Gathering.Gather
    | ToTab Tab
    | SharedStateUpdate SharedState.SharedStateUpdate
    | NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case ( model.currentTab, msg ) of
        ( Resources resourcesModel, ResourcesMsg resourcesMsg ) ->
            Resources.update model.sharedState resourcesMsg resourcesModel
                |> updateWith Resources ResourcesMsg model

        ( Explore exploreModel, ExploreMsg exploreMsg ) ->
            Explore.update model.sharedState exploreMsg exploreModel
                |> updateWith Explore ExploreMsg model

        ( Inventory inventoryModel, InventoryMsg inventoryMsg ) ->
            Inventory.update model.sharedState inventoryMsg inventoryModel
                |> updateWith Inventory InventoryMsg model

        ( _, GatheringMsg gatheringMsg ) ->
            let
                ( newGatheringModel, ssUpdate ) =
                    Gathering.update gatheringMsg model.gatheringModel model.sharedState

                ( newModel, ssCmd ) =
                    update (SharedStateUpdate ssUpdate) model
            in
            ( { newModel
                | gatheringModel = newGatheringModel
              }
            , ssCmd
            )

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
    if model.sharedState.bruiserFound then
        Gathering.subscriptions model.gatheringModel
            |> Sub.map GatheringMsg

    else
        Sub.none



-- View


view : Model -> Html Msg
view model =
    Html.div []
        [ Html.div []
            [ Element.column
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
            , if model.sharedState.isPopupActive then
                popup model

              else
                Html.div [] []
            ]
        , Html.div
            [ style "position" "fixed"
            , style "bottom" "0"
            , style "left" "2px"
            ]
            [ Html.text "version : 0.0.3"
            ]
        ]


noOutline =
    Element.htmlAttribute <| style "box-shadow" "none"


navbar : Model -> Element Msg
navbar model =
    Element.row
        [ Element.centerX
        , Font.size 15
        ]
        [ if model.sharedState.resourcesTabUnlocked then
            Input.button
                [ noOutline
                , Element.paddingXY 20 5
                , mouseOver [ Element.rgb255 221 221 221 |> Background.color ]
                , Element.htmlAttribute <| style "transition" "0.3s"
                ]
                { onPress = Resources Resources.init |> ToTab |> Just
                , label = text "Resources"
                }

          else
            Element.none
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
        , if model.sharedState.inventoryTabUnlocked then
            Input.button
                [ noOutline
                , Element.paddingXY 20 5
                , mouseOver [ Element.rgb255 221 221 221 |> Background.color ]
                , Element.htmlAttribute <| style "transition" "0.3s"
                ]
                { onPress = Inventory Inventory.init |> ToTab |> Just
                , label = text "Inventory"
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

        Inventory inventoryModel ->
            Inventory.view inventoryModel model.sharedState |> Element.map InventoryMsg



-- popupSize : Model -> Attribute msg
-- popupSize model =
--     if model.sharedState.popupSize == Small then


popup : Model -> Html Msg
popup model =
    let
        ( widthPercent, centeredPercent ) =
            if model.sharedState.popupSize == Small then
                ( "40%", "30%" )

            else if model.sharedState.popupSize == Medium then
                ( "50%", "25%" )

            else
                ( "60%", "20%" )
    in
    Html.div
        [ style "position" "absolute"
        , style "margin" "auto"
        , style "border" "2px solid black"
        , style "background-color" "white"
        , style "width" widthPercent
        , style "height" widthPercent
        , style "top" centeredPercent
        , style "left" centeredPercent
        ]
        [ Html.header
            [ style "width" "100%"
            ]
            [ Html.button
                [ Html.Events.onClick (SharedStateUpdate SharedState.TogglePopup)
                , style "position" "absolute"
                , style "right" "0"
                , style "margin" "5px"
                , style "margin-top" "0px"
                , style "border" "none"
                , style "outline" "none"
                ]
                [ Html.text "x" ]
            , Html.section
                [ style "position" "absolute"
                , style "top" "50%"
                , style "left" "50%"

                --, style "-ms-transform" "translate(-50%, -50%)"
                , style "transform" "translate(-50%, -50%)"
                ]
                [ Html.text model.sharedState.popupMessage
                , Html.hr
                    []
                    []
                , Html.text "You Got:"
                ]
            ]
        ]
