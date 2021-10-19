// HTML elems
var display = document.getElementById("display");
codeNum = document.getElementById("codeNum")
areaName = document.getElementById("areaName")
rightArrow = document.getElementById("rightArrow")
upArrow = document.getElementById("upArrow")
leftArrow = document.getElementById("leftArrow")
downArrow = document.getElementById("downArrow")


// vars
var mapx = 7
var mapy = 7
var map = Array(mapy).fill().map(() => Array(mapx).fill(0))
// map codes: 0 -> empty, 1 -> present, 2 -> unlocked, 3 -> visited
var infoArray = Array(7).fill().map(() => Array(7).fill(0))
var place = [0, 3];
var mapAreas = ["&#9968; Demo Hills &#9968;", "&#127794; Forest of Trials &#127794;"];



//displays
//module codes: 1 -> text module, 2 -> input module, 3 -> image module, 4 -> any word module
//modlette codes: text module: 1 -> title, 2 -> paragraph
//              : input module: 1 -> char input, 2 -> number choose, 3 -> colour button, 4 -> submit button
//completion codes: 1 -> unlock, 2 -> add module
class DTile {
    constructor(pos, state, code, title, modList, cpltList) {
        this.pos = pos;
        this.state = state;
        this.code = code;
        this.title = title;
        this.modList = modList;
        this.cpltList = cpltList;

        this.answers = [];
        this.values = []
        for (let i = 0; i < this.modList.length; i++) {
            const element = this.modList[i];
            if (element[0] == 2) {
                for (let j = 0; j < this.modList[i][2].length; j++) {
                    const element = this.modList[i][2][j];
                    if (element[0] != 4) {
                        this.answers.push([element[1], element[2]])
                        this.values.push([element[1], ""])
                    }
                }
            }
        }
    }

    build() {
        map[this.pos[0]][this.pos[1]] = this.state
        infoArray[this.pos[0]][this.pos[1]] = this
    }

    updateDisplay() {
        codeNum.innerHTML = this.code;
        areaName.innerHTML = this.title;
        for (let i = 0; i < this.modList.length; i++) {
            const modules = this.modList[i];
            addModule(modules);
        }
    }

    complete() {
        for (let i = 0; i < this.cpltList.length; i++) {
            const element = this.cpltList[i];
            switch (element[0]) {
                case 1:
                    unlock(element[1][0], element[1][1]);
                    break;
                case 2:
                    this.modList[element[1]][1] = 0;
                    break;
                default:
                    break;
            }
        }
        update();
    }

    fail() {
        display.classList.add("shaker");
        setTimeout(function () { display.classList.remove("shaker") }, 500);
        this.clearFields();
    }

    clearFields() {
        for (let i = 0; i < this.values.length; i++) {
            const element = this.values[i];
            clearValue(element[0])
        }
    }
}
var tutorialOne = new DTile([0, 3], 2, "AYT0", mapAreas[0],
    [[1, 0, [[1, "Welcome to Escape World Demo"], [2, "Greetings weary traveller. You must have walked far to reach lands such as these. <br> Sadly I cannot offer you a resting place, looking at how overrun my home is <br> I assure you, you only have a little travel left to go until paradise<br> Go forth, stay strong, the adventure is yours to take"]]],
    [1, 0, [[1, "Press the arrow below to continue"]]]],
    []
)

var tutorialTwo = new DTile([1, 3], 2, "ART1", mapAreas[0],
    [[1, 0, [[1, "A Hungry Troll"], [2, "A troll blocks your way. He demands his precious code which he can't live without.<br>Help him find his code. He's not the brightest folk, so it shouldn't be too hard to spot."]]],
    [2, 0, [[1, "charInp1", "a"], [1, "charInp2", "r"], [1, "charInp3", "t"], [1, "charInp4", "1"], [4, "submitInp1"]]],
    [1, 1, [[2, "Congrats you found it! Wasn't so bad was it?"]]]],
    [[1, [2, 3]], [2, 2]]
)
var tutorialThree = new DTile([2, 3], 1, "AGT2", mapAreas[1],
    [[1, 0, [[1, "A work in progress"]]]])

//modules
//text module
function crtTextMod(modletLst) {
    let out = document.createElement("div")
    out.classList.add("flexItem")
    out.classList.add("textModule")
    for (let i = 0; i < modletLst.length; i++) {
        const item = modletLst[i];
        let modletHtml;
        switch (item[0]) {
            case 1:
                modletHtml = crtTitleModlet(item[1]);
                break;
            case 2:
                modletHtml = crtParaModlet(item[1]);
                break;
            default:
                modletHtml = null;
                console.log("invalid modlet code");
        }
        out.appendChild(modletHtml);
    }
    return out;
}
//input module
function crtInptMod(modletLst) {
    let out = document.createElement("div")
    out.classList.add("flexItem")
    out.classList.add("inptModule")
    for (let i = 0; i < modletLst.length; i++) {
        const item = modletLst[i];
        let modletHtml;
        switch (item[0]) {
            case 1:
                modletHtml = crtCharModlet(item[1]);
                break;
            case 4:
                modletHtml = crtSbmtModulet(item[1]);
                break;
            default:
                modletHtml = null;
                console.log("invalid modlet code");
        }
        out.appendChild(modletHtml);
    }
    return out;
}

//modulettes
//title modulette
function crtTitleModlet(text) {
    let main = document.createElement("div");
    main.classList.add("modulette");
    let inDiv = document.createElement("div");
    inDiv.classList.add("dispTitleDiv");
    inDiv.classList.add("flexItem");
    let inElem = document.createElement("p");
    inElem.classList.add("dispTitle")
    inElem.innerHTML = text;
    inDiv.appendChild(inElem);
    main.appendChild(inDiv);

    return main;
}
//paragraph modulette
function crtParaModlet(text) {
    let main = document.createElement("div");
    main.classList.add("modulette");
    let inDiv = document.createElement("div");
    inDiv.classList.add("dispParaDiv");
    inDiv.classList.add("flexItem");
    let inElem = document.createElement("p");
    inElem.classList.add("dispPara");
    inElem.innerHTML = text;
    inDiv.appendChild(inElem);
    main.appendChild(inDiv);

    return main;
}
//character input modulette
function crtCharModlet(id) {
    let main = document.createElement("div");
    main.classList.add("modulette");
    let inDiv = document.createElement("div");
    inDiv.classList.add("charInpDiv");
    inDiv.classList.add("flexItem");
    let inElem = document.createElement("input");
    inElem.type = "text";
    inElem.addEventListener("input", inputChange);
    inElem.classList.add("charInp");
    inElem.maxLength = "1";
    inElem.id = id;
    inDiv.appendChild(inElem);
    main.appendChild(inDiv);

    return main;
}
//submit button modulette
function crtSbmtModulet(id) {
    let main = document.createElement("div");
    main.classList.add("modulette");
    let inDiv = document.createElement("div");
    inDiv.classList.add("submitInpDiv");
    inDiv.classList.add("flexItem");
    let inElem = document.createElement("input");
    inElem.type = "button";
    inElem.classList.add("submitInp");
    inElem.addEventListener("click", submit);
    inElem.value = "submit";
    inElem.id = id;
    inDiv.appendChild(inElem);
    main.appendChild(inDiv);

    return main;
}

function addModule(module) {
    let htmlElem;
    switch (module[0]) {
        case 1:
            htmlElem = crtTextMod(module[2]);
            break;
        case 2:
            htmlElem = crtInptMod(module[2]);
            break;
        default:
            break;
    }
    if (module[1] == 0) {
        display.appendChild(htmlElem);
    }
}

//display interactables functions
function inputChange() {
    let tile = infoArray[place[0]][place[1]];
    let x = document.getElementById(this.id).value.toLowerCase();
    for (let i = 0; i < tile.values.length; i++) {
        const element = tile.values[i];
        if (element[0] == this.id) {
            element[1] = x;
        }
    }
}

function submit() {
    let tile = infoArray[place[0]][place[1]];
    let good = true;
    for (let i = 0; i < tile.values.length; i++) {
        const element = tile.values[i];
        if (element[1] != tile.answers[i][1]) {
            good = false;
        }
    }
    if (good) {
        tile.complete();
    } else {
        tile.fail();
    }
}

function clearValue(id) {
    let elem = document.getElementById(id);
    elem.value = "";
}


function clearModules() {
    while (display.children.length) {
        display.removeChild(display.lastChild)
    }
}


function clickArrow(dir) {
    switch (dir) {
        case 'U':
            place[0] -= 1;
            break;
        case 'R':
            place[1] += 1;
            break;
        case 'L':
            place[1] -= 1;
            break;
        case 'D':
            place[0] += 1;
            break;
        default:
            break;
    }

    if (place[0] >= mapy) {
        place[0] = mapy - 1
    } else if (place[0] < 0) {
        place[0] = 0
    }
    if (place[1] >= mapx) {
        place[1] = mapx - 1;
    } else if (place[1] < 0) {
        place[1] = 0;
    }
    update()
}

function testPlace(x, y) {
    if (x >= 0 && x < mapy) {
        if (y >= 0 && y < mapx) {
            return map[x][y]
        }
        return -1
    }
    return -1
}

function unlock(x, y) {
    if (map[x][y] == 1) {
        map[x][y] = 2;
    }
}

function changeArrowState(value, htmlElem) {
    switch (value) {
        case 0:
        case -1:
        case 1:
            htmlElem.classList.add("disabled")
            break;
        case 2:
            htmlElem.classList.remove("disabled")
    }
}

function update() {
    let x = place[0];
    let y = place[1];
    let tile = infoArray[x][y];
    clearModules();
    tile.updateDisplay();
    //lock arrows
    let upValue = testPlace(x - 1, y);
    let downValue = testPlace(x + 1, y);
    let leftValue = testPlace(x, y - 1);
    let rightValue = testPlace(x, y + 1);
    changeArrowState(upValue, upArrow);
    changeArrowState(downValue, downArrow);
    changeArrowState(rightValue, rightArrow);
    changeArrowState(leftValue, leftArrow);
}

function start() {
    tutorialOne.build()
    tutorialTwo.build()
    tutorialThree.build()
    update();
}



start()
