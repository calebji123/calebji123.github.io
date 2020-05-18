module Data.Inventory exposing (InventoryData, Update(..), init, update)


type ToolType
    = Hands
    | Wood
    | Stone
    | Iron


type alias InventoryData =
    { knifeAmount : Int
    , toolType : ToolType
    }


init : InventoryData
init =
    { knifeAmount = 0
    , toolType = Hands
    }


type Update
    = UpdateKnifeAmount Int
    | UpdateToolType ToolType


update : InventoryData -> Update -> InventoryData
update inventoryData inventoryUpdate =
    case inventoryUpdate of
        UpdateKnifeAmount int ->
            { inventoryData | knifeAmount = inventoryData.knifeAmount + int }

        UpdateToolType toolType ->
            { inventoryData | toolType = toolType }
