// HTML elems
var display = document.getElementById("display");
var codeNum = document.getElementById("codeNum");
var areaName = document.getElementById("areaName");
var filler = document.getElementById("fillerFill");
var rightArrow = document.getElementById("rightArrow");
var upArrow = document.getElementById("upArrow");
var leftArrow = document.getElementById("leftArrow");
var downArrow = document.getElementById("downArrow");
var body = document.getElementsByName("body");


// vars
var mapx;
var mapy;
var map;
// map codes: 0 -> empty, 1 -> present, 2 -> unlocked, 3 -> visited
var infoArray;
var sx;
var sy;
var place;
var ma;
var colOptLst;
var tile;
var admin = false;


//displays
//module codes: 1 -> text module, 2 -> input module, 3 -> image module
//modlette codes: text module: 1 -> title, 2 -> paragraph
//              : input module: 1 -> char input, 2 -> number choose, 3 -> colour button, 4 -> submit button, 5 -> word modulette
//completion codes: 1 -> unlock, 2 -> add module
class DTile {
    constructor(pos, state, code, title, modList) {
        this.pos = pos;
        this.state = state;
        if (admin) {
            this.state = 2;
        }
        this.code = code;
        this.title = title;
        this.modList = modList;
    }

    build() {
        map[this.pos[0]][this.pos[1]] = this.state
        infoArray[this.pos[0]][this.pos[1]] = this
    }

    updateDisplay() {
        let divider = document.createElement("div");
        divider.classList.add("dividerDiv");
        let img = document.createElement("img");
        img.src = "divider.png"
        img.classList.add("dividerImg");
        divider.appendChild(img);
        codeNum.innerHTML = this.code;
        areaName.innerHTML = this.title;
        filler.innerHTML = "";
        let first = true;
        for (let i = 0; i < this.modList.length; i++) {
            const modules = this.modList[i];
            if (modules.state == 2) {
                if (!first) {
                    display.appendChild(divider.cloneNode(true));
                } else {
                    first = false;
                }
                display.appendChild(modules.create());
            }
        }
    }




}


//modules
//text module
class TextMod {
    constructor(state, id, modletLst, loadLst = []) {
        this.name = "text";
        this.state = state;
        if (admin) {
            this.state = 2;
        }
        this.id = id;
        this.modletLst = modletLst;
        this.loadLst = loadLst;
        this.firstLoad = true;
        this.htmlElem;
    }

    create() {
        if (this.firstLoad) {
            this.firstLoad = false;
            addNew(this.loadLst);
        }
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
        if (this.state == 2 && document.getElementById(this.id)) {
            document.getElementById(this.id).remove();
        }
    }
}

//input module
class InputMod {
    constructor(state, id, modletLst, cpltList) {
        this.name = "input";
        this.state = state;
        if (admin) {
            this.state = 2;
        }
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
        addNew(this.cpltList);
        this.submitButton.complete = true;
        update();
        display.scroll({ top: 150, behavior: "smooth" });

    }

    fail() {
        document.getElementById(this.id).classList.add("shaker");
        this.submitButton.complete = false;
        let that = this;
        setTimeout(function () {
            document.getElementById(that.id).classList.remove("shaker");
        }, 500);

    }

    clear() {
        if (this.state == 2 && document.getElementById(this.id)) {
            document.getElementById(this.id).remove();
        }
    }
}

//image module
class ImgMod {
    constructor(state, id, modletLst) {
        this.name = "img";
        this.state = state;
        if (admin) {
            this.state = 2;
        }
        this.id = id;
        this.modletLst = modletLst;
        this.htmlElem;
    }

    create() {
        let out = document.createElement("div")
        out.classList.add("flexItem")
        out.classList.add("imgModule")
        out.id = this.id;
        for (let i = 0; i < this.modletLst.length; i++) {
            const item = this.modletLst[i];
            let modletHtml = item.create();
            out.appendChild(modletHtml);
        }
        return out;
    }

    clear() {
        if (this.state == 2 && document.getElementById(this.id)) {
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
        let arr = document.createElement("p");
        arr.innerHTML = ">"
        arr.classList.add("dispParaArr");
        let inDiv = document.createElement("div");
        inDiv.classList.add("dispParaDiv");
        inDiv.classList.add("flexItem");
        let inElem = document.createElement("p");
        inElem.classList.add("dispPara");
        inElem.innerHTML = this.text;
        inDiv.appendChild(arr)
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;
    }
}

//dialogue modulette
class DiaModlet {
    constructor(name, text) {
        this.name = "dia";
        this.name = this.hyphened(name);
        this.text = text;
    }

    hyphened(name) {
        let x = name;
        if (x == "Gilmore") {
            x = "Gil&shy;more";
        }
        return x;
    }

    create() {
        let main = document.createElement("div");
        main.classList.add("modulette");
        let inDiv = document.createElement("div");
        inDiv.classList.add("dispDiaDiv");
        inDiv.classList.add("flexItem");
        // let arr = document.createElement("p");
        // arr.innerHTML = ">"
        // arr.classList.add("dispParaArr");
        let inElem1 = document.createElement("p");
        inElem1.classList.add("dispDiaName");
        inElem1.innerHTML = this.name + ":";
        let inElem2 = document.createElement("p");
        inElem2.innerHTML = "\"" + this.text + "\"";
        inElem2.classList.add("dispDiaPara");
        // inDiv.appendChild(arr);
        inDiv.appendChild(inElem1);
        inDiv.appendChild(inElem2);
        main.appendChild(inDiv);

        return main;
    }
}

//character input modulette
class CharModlet {
    constructor(id, ans, val = "") {
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
        inElem.addEventListener("keydown", checkDelete);
        inElem.classList.add("charInp");
        inElem.maxLength = "2";
        inElem.autocomplete = "new-password";
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
    constructor(id, ans, plc, oneWord) {
        this.name = "word";
        this.id = id;
        this.ans = ans.toUpperCase();
        this.plc = plc;
        this.val = "";
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
        inElem.placeholder = this.plc;
        inElem.autocomplete = "new-password";
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
    constructor(id, buttonName, local) {
        this.name = "submit";
        this.id = id;
        this.buttonName = buttonName.toUpperCase();
        this.local = local;
        this.complete = false;
        if (this.buttonName == "") {
            this.buttonName = "SUBMIT";
        }

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
        if (this.complete) {
            inElem.value = this.buttonName + " ✓";
        }
        else if (this.local) {
            inElem.value = this.buttonName + " 🍃";
        } else {
            inElem.value = this.buttonName + " 🍂";
        }
        inElem.id = this.id;
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;

    }
}

//image modulette
class ImgModlet {
    constructor(url, height) {
        this.name = "imglet";
        this.url = url;
        this.height = height;
    }

    create() {
        let main = document.createElement("div");
        main.classList.add("modulette");
        let inDiv = document.createElement("div");
        inDiv.classList.add("dispImgDiv");
        inDiv.classList.add("flexItem");
        let inElem = document.createElement("img");
        inElem.classList.add("dispImg");
        inElem.src = this.url;
        inElem.style.height = this.height + "px";
        inDiv.appendChild(inElem);
        main.appendChild(inDiv);

        return main;
    }
}


//tiles
var tiles = [];
//to make tile making simpler:
var op = 2; //show/accessible on load
var hid = 1; //hidden/locked on load
function createDemoTiles() {
    let demoTiles = [
        new DTile([0, 3], op, "CODE", ma[0], [
            new TextMod(op, "textMod1", [
                new TitleModlet("Welcome to Escape World Demo"),
                new ParaModlet("An old man is seated in a ruined town. Around, talls hills peak towards the sky."),
                new DiaModlet("Old man", "Greetings weary traveller. It must have been a long journey to arrive at lands like these."),
                new DiaModlet("Old man", "I assure you, there is only a little travel left to go until paradise. Go forth, stay strong. The adventure is yours to take."),
                new ParaModlet("Newly envigored, you continue your journey. "),
                new TitleModlet("Press the arrow below to continue")
            ])]
        ),
        new DTile([1, 3], op, "ART1", ma[0], [
            new TextMod(op, "TextMod1", [
                new TitleModlet("Bridge of Drowsiness"),
                new ParaModlet("You try to cross a bridge, but a troll blocks your way. With it are two blankets and a pillow."),
                new DiaModlet("Troll", "I need sleep! ooga booga willy wonka! Give me a tasty code for me to sleep, or else no one passes this bridge!"),
            ]),
            new InputMod(op, "InputMod1", [
                new CharModlet("charInp1", "A"),
                new CharModlet("charInp2", "R"),
                new CharModlet("charInp3", "T"),
                new CharModlet("charInp4", "1"),
                new SubmitModlet("submit1", "submit", true)
            ], [[1, [2, 3]], [2, 0, 2]]
            ),
            new TextMod(hid, "textMod2", [
                new TitleModlet("The troll is satisfied. Onwards!")
            ])]
        ),
        new DTile([2, 3], hid, "AGT2", ma[1], [
            new TextMod(op, "TextMod1", [
                new TitleModlet("Trove of Tricky Trees"),
                new ParaModlet("A Group  of trees surround you, demanding that you solve their tricky little puzzle before you can pass. They tell you to remember this monologue:"),
                new DiaModlet("Trees", "HELLO traveller. i hate capitals. ottawa and washington DC? wouldn't it be nice if we could replace capitals with BLUE and YELLOW? would be much more pleasing to the eye."),
                new TitleModlet("Scroll down"),
            ]),
            new InputMod(op, "InputMod1", [
                new WordModlet("wordInp1", "HELLO", "", true),
                new ColModlet("colInp1", colOptLst, 2, 0),
                new ColModlet("colInp2", colOptLst, 4, 0),
                new SubmitModlet("submit1", "submit", true)
            ], [[1, [2, 4]]]
            )]
        ),
        new DTile([2, 4], hid, "GPR3", ma[2], [
            new TextMod(op, "textMod1", [
                new TitleModlet("A Rickety Shack"),
                new DiaModlet("Man", "HEY YOU TRAVELLER! I really need help with this puzzle! My wife says that I would not get any dinner if its not finished. Like I really need it done. Like so badly that I won't let you continue until you help me."),
                new ParaModlet("Help this man get his dinner.")
            ]),
            new InputMod(op, "inputMod1", [
                new ColModlet("colInp1", colOptLst, 1, 0),
                new ColModlet("colInp2", colOptLst, 3, 0),
                new ColModlet("colInp3", colOptLst, 0, 0),
                new CharModlet("charInp1", "3", ""),
                new SubmitModlet("submit1", "submit", true)
            ], [[1, [3, 4]]]
            )]
        ),
        new DTile([3, 4], hid, "YAY4", ma[3], [
            new TextMod(op, "textmod1", [
                new TitleModlet("Welcome to Paradise!"),
                new ParaModlet("Thank you for playing the demo! Contact me with more ideas. First story will be out soon!")
            ])
        ])
    ];

    return demoTiles;
}

// map codes: 0 -> empty, 1 -> present, 2 -> unlocked, 3 -> visited

function createStory1Tiles() {
    let story1Tiles = [
        new DTile([sy, sx], op, "ABC1", ma[0], [
            new TextMod(op, "1", [
                new TitleModlet("Before the Throne"),
                new DiaModlet("King", "Adventurer, I have called you for a mission of utmost importance. 30 thousand gold ducets are at your disposal if you can bring to me the three crystals scattered across the outskirts of the country."),
                new DiaModlet("Guard", "Go now, make haste. The future of this kingdom rests on your hands.")
            ])
        ])
        , new DTile([sy + 1, sx], op, "ABD1", ma[1], [
            new TextMod(op, "1", [
                new TitleModlet("Lonely Shack")
                , new ParaModlet("You walk up to a sole shack built by a lake. On the porch is an old grey man glaring at you.")
                , new DiaModlet("Old Man", "Oh another adventurer from the Kingdom eh? I've seen many of you return disconcerted to know I should do a thing or two to prepare you.")
                , new DiaModlet("Gilmore", "Call me Gilmore. If you can't answer my questions, I won't be letting you pass. Deal?<br>First question: What is the name of this area?")

            ])
            , new InputMod(op, "2", [
                new WordModlet("a3", "PLAINS OF ACCEPTANCE", "", false)
                , new SubmitModlet("s1", "", true)
            ], [[1, [sy + 1, sx + 1]], [2, 0, 2]])
            , new TextMod(hid, "3", [
                new DiaModlet("Gilmore", "That was an easy one. Follow me.")
            ])
        ])
        , new DTile([sy + 1, sx + 1], hid, "ABD2", ma[1], [
            new TextMod(op, "1", [
                new TitleModlet("Rocky Riverbed")
                , new ParaModlet("You follow Gilmore along a small river. It's not deep enough to be impassable. Three weeping trees surround the area where you stop")
                , new DiaModlet("Gilmore", "This is my favourite spot by the river. A nice place to ask you the second question: What is the name of this spot?")
                , new DiaModlet("Gilmore", "You know what, that's too easy. Give me the code for this spot as well.")
            ])
            , new InputMod(op, "2", [
                new WordModlet("a1", "rocky riverbed", "", false)
                , new CharModlet("c1", "A")
                , new CharModlet("c2", "B")
                , new CharModlet("c3", "D")
                , new CharModlet("c4", "2")
                , new SubmitModlet("s1", "", true)
            ], [[1, [sy + 1, sx + 2]], [2, 0, 2]])
            , new TextMod(hid, "3", [
                new DiaModlet("Gilmore", "Pay attention to those codes. Many who ask for a four digit answer are looking for one.")
            ])
            , new TextMod(hid, "4", [
                new ParaModlet("You search around the area for a piece of paper. You find it lodged into a tree root. The first two and only two words written on it are: 'GOOD JOB'.")
            ])
        ])
        , new DTile([sy + 1, sx + 2], hid, "ADD4", ma[1], [
            new TextMod(op, "1", [
                new TitleModlet("Rapid Rapids")
                , new ParaModlet("The river turns into a rapid, the water flow intermittently interrupted by large rocks.")
                , new DiaModlet("Gilmore", "I hate the rapids. Here's a riddle you may hate also: Associate Antynoms At Apt Application.")
            ])
            , new InputMod(op, "2", [
                new WordModlet("a1", "acid", "Base", false)
                , new WordModlet("a2", "add", "Subtract", false)
                , new WordModlet("a3", "apple", "Orange", false)
                , new SubmitModlet("s1", "", true)
            ], [[1, [sy + 2, sx + 2]], [1, [sy + 3, sx + 2]], [2, 0, 2]])
            , new TextMod(hid, "3", [
                new DiaModlet("Gilmore", "Good work. You are turning out to be a promising adventurer.")
            ])
        ])
        , new DTile([sy + 2, sx + 2], hid, "AGO3", ma[1], [
            new TextMod(op, "1", [
                new TitleModlet("River Bend")
                , new ParaModlet("The river bends. You follow Gilbert along the bend. There's a lot of rocks along the riverbed, some glinting stones catch your eye.")
                , new DiaModlet("Gilmore", "Sometimes there's nothing in a spot. Let us continue.")
            ])
        ])
        , new DTile([sy + 3, sx + 2], hid, "AGN3", ma[1], [
            new TextMod(op, "1", [
                new TitleModlet("Sole Campground")
                , new ParaModlet("You enter into a clearing devoid of trees, save one, lonely and proud, preserved in the center. On one side is the river, on the other is a sparse collection of trees. A campfire, recently used, also occupies the center of the clearing.")
                , new DiaModlet("Gilmore", "Good work adventurer, we're almost done. However it seems I have misplaced the paper with all my advice. It must have fell out when I was sitting in the shade of the best spot by the river. Please find it and tell me the first word on it. I will give you a hint: the content in a tile is sometimes larger than the box itself.")
            ], [[2, [sy + 1, sx + 1], 3]])
            , new InputMod(op, "2", [
                new WordModlet("a1", "good", "", false)
                , new SubmitModlet("s1", "", false)
            ], [[1, [sy + 4, sx + 2]], [2, 0, 2]])
            , new TextMod(hid, "3", [
                new DiaModlet("Gilmore", "Good Job, you passed the test. Of course I remember my advices, there's no need for that paper. Follow me.")
            ])
        ])
        , new DTile([sy + 4, sx + 2], hid, "ALL5", ma[1], [
            new TextMod(op, "1", [
                new TitleModlet("Bush")
                , new ParaModlet("Gilmore leads you to a bush. It is nothing more than a bush.")
                , new DiaModlet("Gilmore", "1. Always ask questions, the people of this land are full of useful information, you just need to uncover it.<br>2. Pay attention to the small details, however many details are completely useless.<br>3. Fall leaves require you to search past the confines of a singular spot.")
                , new DiaModlet("Gilmore", "Good luck adventurer. I pray you did not do this just for the money. The king... No, you must experience it yourself. I bid thee farewell.")
            ])
        ])
        , new DTile([sy + 4, sx + 1], op, "END4", ma[2], [
            new TextMod(op, "1", [
                new TitleModlet("END OF PART 1")
            ])
        ])

    ]

    return story1Tiles;
}





//display interactables functions
function inputChange() {
    let x = document.getElementById(this.id).value.toUpperCase();
    for (let i = 0; i < tile.modList.length; i++) {
        const element = tile.modList[i];
        if (element.name == "input") {
            for (let j = 0; j < element.inputModlets.length; j++) {
                const modulette = element.inputModlets[j];
                if (modulette.id == this.id) {
                    if (this.maxLength == 2) {
                        if (x.length > 1) {
                            x = x.substring(1)
                        }
                    }
                    modulette.val = x;
                    document.getElementById(this.id).value = x;
                    if (this.maxLength == 2) {
                        if (x.length > 0) {
                            changeFocus(this, true);
                        }
                    }
                }
            }
        }
    }
}

function checkDelete(e) {
    let x = document.getElementById(this.id).value.toUpperCase();
    if (x.length < 1) {
        if (e.which == 8 || e.which == 48) {
            changeFocus(this, false)
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
                if (good && !element.submitButton.complete) {
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

function changeFocus(that, fwd) {
    let all = document.getElementsByClassName("charInp");
    for (let i = 0; i < all.length; i++) {
        const element = all[i];
        if (element == that) {
            if (fwd) {
                if (all[i + 1]) {
                    all[i + 1].focus()
                }
            }
            if (!fwd) {
                if (all[i - 1]) {
                    all[i - 1].focus()
                }
            }
        }
    }
}

//add modules or unlock tiles
function addNew(lst) {
    for (let i = 0; i < lst.length; i++) {
        const element = lst[i];
        switch (element[0]) {
            case 1:
                unlock(element[1][0], element[1][1]);
                break;
            case 2:
                if (element[1] == 0) {
                    tile.modList[element[2]].state = 2;
                }
                else {
                    console.log(element[1][0], element[1][1], infoArray[element[1][0]][element[1][1]])
                    infoArray[element[1][0]][element[1][1]].modList[element[2]].state = 2;

                }
                break;
            default:
                break;
        }
    }
}



function clearModules() {
    for (let i = 0; i < tile.modList.length; i++) {
        const element = tile.modList[i];
        element.clear();
    }
    const x = document.getElementsByClassName("dividerDiv");
    const n = x.length
    for (let i = 0; i < n; i++) {
        const element = x[0];
        element.remove();
    }
}

//arrows
document.onkeydown = checkKey;

function checkKey(e) {
    e = e || window.event;
    if (e.keyCode == '38') {
        // up arrow
        if (!upArrow.classList.contains("disabled")) {
            clickArrow('U')
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
        if (!downArrow.classList.contains("disabled")) {
            clickArrow('D')
        }
    }
    else if (e.keyCode == '37') {
        // left arrow
        if (!leftArrow.classList.contains("disabled")) {
            clickArrow('L')
        }
    }
    else if (e.keyCode == '39') {
        // right arrow
        if (!rightArrow.classList.contains("disabled")) {
            clickArrow('R')
        }
    }
    else if (e.keyCode == '13') {
        //enter
        for (let i = 0; i < tile.modList.length; i++) {
            const element = tile.modList[i];
            if (element.name == "input") {
                if (element.submitButton.complete == false) {
                    document.getElementById(element.submitButton.id).click();

                }
            }
        }

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
    display.scroll({ top: 0 });
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
            break;
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


function startDemo() {
    display.innerHTML = "";
    mapx = 7;
    mapy = 7;
    map = Array(mapy).fill().map(() => Array(mapx).fill(0));
    infoArray = Array(mapy).fill().map(() => Array(mapx).fill(0));
    sx = 3;
    sy = 0;
    place = [sy, sx];
    ma = ["&#9968; Intro Hills &#9968;", "&#127794; Forest of Trials &#127794;", "&#9889; Thuderous Plains &#9889;", "&#9970; Hopeful Paradise &#9970;"];
    colOptLst = ["#ff0000", "#00ff00", "#0000ff", "#8f1a9c", "#f7e707"];
    tiles = createDemoTiles();
    start();
}

function startStory1() {
    display.innerHTML = "";
    mapx = 64;
    mapy = 64;
    map = Array(mapy).fill().map(() => Array(mapx).fill(0));
    infoArray = Array(mapy).fill().map(() => Array(mapx).fill(0));
    sx = 31;
    sy = 15;
    place = [sy, sx];
    ma = ["&#x1F451; The King's Court &#x1F451;", "&#127793; Plains of Acceptance &#127793;", "&#x1F6A7; Under Contruction &#x1F6A7;", "&#127794; Forest of Trials &#127794;", "&#9889; Thuderous Plains &#9889;", "&#9970; Hopeful Paradise &#9970;"];
    colOptLst = ["#ff0000", "#00ff00", "#0000ff", "#8f1a9c", "#f7e707", "#888"];
    tiles = createStory1Tiles();
    start();
}


function mainMenu() {
    areaName.innerHTML = "&#x1F30F; World of Escapades &#x1F30F;";
    codeNum.innerHTML = "&#x1F31F;";
    filler.innerHTML = "&#x1F31F;";

    let mainMenuDisplay = new TextMod(op, "1", [
        new TitleModlet("Select the story you wish to play.")
    ])

    display.appendChild(mainMenuDisplay.create())

    let main = document.createElement("div");
    main.classList.add("modulette");
    let mainDiv1 = document.createElement("div");
    mainDiv1.classList.add("menuDiv");
    mainDiv1.classList.add("flexItem");
    let button1 = document.createElement("button");
    button1.type = "button";
    button1.innerHTML = "Demo";
    button1.classList.add("menuButton");
    button1.onclick = function () { startDemo() };
    mainDiv1.appendChild(button1);

    let main2 = document.createElement("div");
    main2.classList.add("modulette");
    let mainDiv2 = document.createElement("div");
    mainDiv2.classList.add("menuDiv");
    mainDiv2.classList.add("flexItem");
    let button2 = document.createElement("button");
    button2.type = "button";
    button2.innerHTML = "Story 1";
    button2.classList.add("menuButton");
    button2.onclick = function () { startStory1() };
    mainDiv2.appendChild(button2);

    main.appendChild(mainDiv1);
    main2.appendChild(mainDiv2);

    display.appendChild(main);
    display.appendChild(main2);
}



mainMenu()
