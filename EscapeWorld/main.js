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
var mapAreas = ["&#9968; Intro Hills &#9968;", "&#127794; Forest of Trials &#127794;", "&#9889; Thuderous Plains &#9889;", "&#9970; Hopeful Paradise &#9970;"];
var colOptLst = ["#ff0000", "#00ff00", "#0000ff", "#8f1a9c", "#f7e707"]
var tile;


//displays
//module codes: 1 -> text module, 2 -> input module, 3 -> image module
//modlette codes: text module: 1 -> title, 2 -> paragraph
//              : input module: 1 -> char input, 2 -> number choose, 3 -> colour button, 4 -> submit button, 5 -> word modulette
//completion codes: 1 -> unlock, 2 -> add module
class DTile {
    constructor(pos, state, code, title, modList) {
        this.pos = pos;
        this.state = state;
        this.code = code;
        this.title = title;
        this.modList = modList;
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
            if (!modules.state) {
                display.appendChild(modules.create());
            }
        }
    }




}


//modules
//text module
class TextMod {
    constructor(state, id, modletLst) {
        this.name = "text";
        this.state = state;
        this.id = id;
        this.modletLst = modletLst;
        this.htmlElem;
    }

    create() {
        let out = document.createElement("div")
        out.classList.add("flexItem")
        out.classList.add("textModule")
        out.id = this.id;
        for (let i = 0; i < this.modletLst.length; i++) {
            const item = this.modletLst[i];
            let modletHtml = item.create();
            out.appendChild(modletHtml);
        }
        return out;
    }

    clear() {
        if (this.state == 0 && document.getElementById(this.id)) {
            document.getElementById(this.id).remove();
        }
    }
}

//input module
class InputMod {
    constructor(state, id, modletLst, cpltList) {
        this.name = "input";
        this.state = state;
        this.modletLst = modletLst;
        this.id = id;
        this.cpltList = cpltList;
        this.htmlElem;

        this.inputModlets = [];
        this.submitButton;
        for (let i = 0; i < this.modletLst.length; i++) {
            const element = this.modletLst[i];
            if (element.name != "submit") {
                this.inputModlets.push(element);
            } else {
                this.submitButton = element
            }
        }
    }

    create() {
        let out = document.createElement("div")
        out.classList.add("flexItem")
        out.classList.add("inptModule")
        out.id = this.id;
        for (let i = 0; i < this.modletLst.length; i++) {
            const item = this.modletLst[i];
            let modletHtml = item.create();
            out.appendChild(modletHtml);
        }
        return out;
    }

    complete() {
        for (let i = 0; i < this.cpltList.length; i++) {
            const element = this.cpltList[i];
            switch (element[0]) {
                case 1:
                    unlock(element[1][0], element[1][1]);
                    break;
                case 2:
                    tile.modList[element[1]].state = 0;
                    break;
                default:
                    break;
            }
        }
        this.submitButton.buttonName = "submit ✓"
        update();
    }

    fail() {
        document.getElementById(this.id).classList.add("shaker");
        let that = this;
        setTimeout(function () {
            document.getElementById(that.id).classList.remove("shaker");
        }, 500);
        this.submitButton.buttonName = "submit"
        document.getElementById(this.submitButton.id).value = this.submitButton.buttonName
    }

    clear() {
        if (this.state == 0 && document.getElementById(this.id)) {
            document.getElementById(this.id).remove();
        }
    }
}


//modulettes
//title modulette
class TitleModlet {
    constructor(text) {
        this.name = "title";
        this.text = text;
    }

    create() {
        let main = document.createElement("div");
        main.classList.add("modulette");
        let inDiv = document.createElement("div");
        inDiv.classList.add("dispTitleDiv");
        inDiv.classList.add("flexItem");
        let inElem = document.createElement("p");
        inElem.classList.add("dispTitle")
        inElem.innerHTML = this.text;
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;
    }
}

//paragraph modulette
class ParaModlet {
    constructor(text) {
        this.name = "para";
        this.text = text;
    }

    create() {
        let main = document.createElement("div");
        main.classList.add("modulette");
        let inDiv = document.createElement("div");
        inDiv.classList.add("dispParaDiv");
        inDiv.classList.add("flexItem");
        let inElem = document.createElement("p");
        inElem.classList.add("dispPara");
        inElem.innerHTML = this.text;
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;
    }
}

//character input modulette
class CharModlet {
    constructor(id, ans, val) {
        this.name = "char";
        this.id = id;
        this.ans = ans.toUpperCase();
        this.val = val.toUpperCase();
    }

    create() {
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
        inElem.id = this.id;
        inElem.value = this.val;
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;
    }

    check() {
        return this.ans == this.val;
    }
}

//word input modulette
class WordModlet {
    constructor(id, ans, val, oneWord) {
        this.name = "word";
        this.id = id;
        this.ans = ans.toUpperCase();
        this.val = val.toUpperCase();
        this.oneWord = oneWord;
    }

    create() {
        let main = document.createElement("div");
        main.classList.add("modulette");
        let inDiv = document.createElement("div");
        inDiv.classList.add("wordInpDiv");
        inDiv.classList.add("flexItem");
        let inElem = document.createElement("input");
        inElem.type = "text";
        inElem.addEventListener("input", inputChange);
        inElem.classList.add("wordInp");
        if (this.oneWord) {
            inElem.addEventListener("keypress", function () { return event.charCode != 32 });
        }
        inElem.value = this.val;
        inElem.id = this.id;
        inElem.spellcheck = false;
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;
    }
    check() {
        return this.ans == this.val;
    }
}

//colour button Modulette
class ColModlet {
    constructor(id, colLst, ansI, valI) {
        this.name = "col";
        this.id = id;
        this.colLst = colLst;
        this.ans = ansI;
        this.val = valI;
    }

    create() {
        let main = document.createElement("div");
        main.classList.add("modulette");
        let inDiv = document.createElement("div");
        inDiv.classList.add("colInpDiv");
        inDiv.classList.add("flexItem");
        let inElem = document.createElement("input");
        inElem.type = "button";
        inElem.addEventListener("click", colChange);
        inElem.classList.add("colInp");
        inElem.id = this.id;
        inElem.style.backgroundColor = this.colLst[this.val]
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;
    }

    check() {
        return this.ans == this.val;
    }
}


//submit button modulette
class SubmitModlet {
    constructor(id, buttonName) {
        this.name = "submit";
        this.id = id;
        this.buttonName = buttonName;
    }

    create() {
        let main = document.createElement("div");
        main.classList.add("modulette");
        let inDiv = document.createElement("div");
        inDiv.classList.add("submitInpDiv");
        inDiv.classList.add("flexItem");
        let inElem = document.createElement("input");
        inElem.type = "button";
        inElem.classList.add("submitInp");
        inElem.addEventListener("click", submit);
        inElem.value = this.buttonName;
        inElem.id = this.id;
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;

    }
}


//tiles
var tiles = [
    new DTile([0, 3], 2, "AYT0", mapAreas[0], [
        new TextMod(0, "textMod1", [
            new TitleModlet("Welcome to Escape World Demo"),
            new ParaModlet("Greetings weary traveller. You must have walked far to reach lands such as these. <br> Sadly I cannot offer you a resting place, looking at how overrun my home is <br> I assure you, you only have a little travel left to go until paradise<br> Go forth, stay strong, the adventure is yours to take<br>"),
            new TitleModlet("Press the arrow below to continue")
        ])]
    ),
    new DTile([1, 3], 2, "ART1", mapAreas[0], [
        new TextMod(0, "TextMod1", [
            new TitleModlet("A Blinded Troll"),
            new ParaModlet("A troll blocks your way. He demands his precious code which he can't live without. He seemed to have misplaced it, and because of the sunlight, he is too blind to see. Without his code he can't snuggle up to sleep at day<br>Help him find his code."),
        ]),
        new InputMod(0, "InputMod1", [
            new CharModlet("charInp1", "A", ""),
            new CharModlet("charInp2", "R", ""),
            new CharModlet("charInp3", "T", ""),
            new CharModlet("charInp4", "1", ""),
            new SubmitModlet("submit1", "submit")
        ], [[1, [2, 3]], [2, 2]]
        ),
        new TextMod(1, "textMod2", [
            new TitleModlet("The troll is satisfied. Onwards!")
        ])]
    ),
    new DTile([2, 3], 1, "AGT2", mapAreas[1], [
        new TextMod(0, "TextMod1", [
            new TitleModlet("Tricky Trees"),
            new ParaModlet("A Group  of trees surround you, demanding that you solve their tricky little puzzle before you can pass. They tell you to remember this monologue:"),
            new ParaModlet("HELLO traveller. capitals are worthless aren't they? wouldn't it be nice if we could replace capitals with BLUE and YELLOW? unfortunately not so!!"),
            new TitleModlet("Scroll down"),
        ]),
        new InputMod(0, "InputMod1", [
            new WordModlet("wordInp1", "HELLO", "", true),
            new ColModlet("colInp1", colOptLst, 2, 0),
            new ColModlet("colInp2", colOptLst, 4, 0),
            new SubmitModlet("submit1", "submit")
        ], [[1, [2, 4]]]
        )]
    ),
    new DTile([2, 4], 1, "GPR3", mapAreas[2], [
        new TextMod(0, "textMod1", [
            new TitleModlet("A Perculiar Conundrum"),
            new ParaModlet("HEY YOU TRAVELLER! I really need help with this puzzle! My wife says that I would not get any dinner if its not finished. Like I really need it done. Like so badly that I won't let you continue until you help me."),
            new ParaModlet("Help this man get his dinner.")
        ]),
        new InputMod(0, "inputMod1", [
            new ColModlet("colInp1", colOptLst, 1, 0),
            new ColModlet("colInp2", colOptLst, 3, 0),
            new ColModlet("colInp3", colOptLst, 0, 0),
            new CharModlet("charInp1", "3", ""),
            new SubmitModlet("submit1", "submit")
        ], [[1, [3, 4]]]
        )]
    ),
    new DTile([3, 4], 1, "YAY4", mapAreas[3], [
        new TextMod(0, "textmod1", [
            new TitleModlet("Welcome to Paradise!"),
            new ParaModlet("(AKA the end of the demo) <br>Contact me with ideas!")
        ])
    ])
]







//display interactables functions
function inputChange() {
    let x = document.getElementById(this.id).value.toUpperCase();
    for (let i = 0; i < tile.modList.length; i++) {
        const element = tile.modList[i];
        if (element.name == "input") {
            for (let j = 0; j < element.inputModlets.length; j++) {
                const modulette = element.inputModlets[j];
                if (modulette.id == this.id) {
                    modulette.val = x;
                    document.getElementById(this.id).value = x;
                    changeFocus(this);
                }
            }
        }
    }
}

function submit() {
    let good = true;
    for (let i = 0; i < tile.modList.length; i++) {
        const element = tile.modList[i];
        if (element.name == "input") {
            if (element.submitButton.id == this.id) {
                for (let j = 0; j < element.inputModlets.length; j++) {
                    const inputModulet = element.inputModlets[j];
                    if (!inputModulet.check()) {
                        good = false;
                    }
                }
                if (good) {
                    element.complete()
                } else {
                    element.fail()
                }
            }
        }
    }
}

function colChange() {
    for (let i = 0; i < tile.modList.length; i++) {
        const element = tile.modList[i];
        if (element.name == "input") {
            for (let j = 0; j < element.inputModlets.length; j++) {
                const modulette = element.inputModlets[j];
                if (modulette.id == this.id) {
                    modulette.val += 1;
                    modulette.val = modulette.val % modulette.colLst.length;
                    document.getElementById(modulette.id).style.backgroundColor = modulette.colLst[modulette.val];
                }
            }
        }
    }
}

function changeFocus(that) {
    let all = document.getElementsByClassName("charInp");
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if (element == that) {
            if (all[i + 1]) {
                all[i + 1].focus()
            }
        }
    }
}

function clearModules() {
    for (let i = 0; i < tile.modList.length; i++) {
        const element = tile.modList[i];
        element.clear();
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
    try {
        clearModules();
    } catch {
    }
    let x = place[0];
    let y = place[1];
    tile = infoArray[x][y];
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
    for (let i = 0; i < tiles.length; i++) {
        const element = tiles[i];
        element.build();

    }
    update();
}



start()
