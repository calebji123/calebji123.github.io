
//Class to store all information related to a project
class Project {
   constructor(infoRecord) {
      this.infoRecord = infoRecord
      this.title = infoRecord.title
      //string of png or jpg found in same folder
      this.icon = "images/" + infoRecord.icon //outdated
      this.status = infoRecord.status //outdated
      this.descShort = infoRecord.descShort
      this.descLong = infoRecord.descLong //outdated
      this.year = infoRecord.year
      this.langList = infoRecord.langList //List String : eg ["Python", "Java"]
      this.link = infoRecord.link
      this.githubLink = infoRecord.githubLink
      this.toolList = infoRecord.toolList //List String : eg ["React"] //outdated
      this.featured = infoRecord.featured
      this.updateDesc = infoRecord.updateDesc
      this.address = infoRecord.address
      this.toAddress = "#" + this.address //outdated
   }
}

class Category {
   constructor(infoRecord) {
      this.header = infoRecord.header
      this.desc = infoRecord.desc
      this.projectList = infoRecord.projectList
   }
}

// Project declaration

const AnimalFarm = new Project({
   title: "Animal Farm",
   icon: "pig.png",
   status: "Completed",
   descShort: "A simple clicker text-based game created on the web. 5 years in the making",
   descLong: "",
   year: "2021",
   langList: ["HTML", "CSS", "Javascript"],
   toolList: [""],
   link: "https://calebji.com/AnimalFarm",
   githubLink: "https://github.com/calebji123/AnimalFarm",
   featured: true,
   updateDesc: "Version 0.70 released, with it is finally a way to finish the game.",
   address: "animal_farm_project"
})

const FroggerTwo = new Project({
   title: "Frogger 2.0",
   icon: "frog.png",
   status: "Demo",
   descShort: "A frogger remake game made in processing and converted to javascript to play on webapp.",
   descLong: "",
   year: "2020",
   langList: ["Processing.js"],
   toolList: [""],
   link: "https://calebji.com/FroggerTwo",
   githubLink: "https://github.com/calebji123/FroggerTwo",
   featured: false,
   updateDesc: "",
   address: "frogger_two_project"
})

const Banana = new Project({
   title: "Banana",
   icon: "banana.png",
   status: "Banana",
   descShort: "Banana",
   descLong: "Banana",
   year: "2020",
   langList: ["HTML", "CSS", "Javascript"],
   toolList: [""],
   link: "https://calebji.com/Banana",
   githubLink: "https://github.com/calebji123/Banana",
   featured: false,
   updateDesc: "",
   address: "banana_project"
})

const EscapeWorld = new Project({
   title: "Escape World",
   icon: "cave.png",
   status: "Demo",
   descShort: "Escape Room Esq, fantasy roleplay game all coded by vanilla javascript",
   descLong: "",
   year: "2021",
   langList: ["HTML", "CSS", "Javascript"],
   toolList: [""],
   link: "https://calebji.com/EscapeWorld",
   githubLink: "https://github.com/calebji123/EscapeWorld",
   featured: true,
   updateDesc: "First part of story 1 implemented. Contact me for ideas!",
   address: "escape_world_project"
})

const WordleInIdris = new Project({
   title: "Wordle In Idris",
   icon: "",
   status: "Completed",
   descShort: "The internet sensation game now on your terminal, low quality and very hard to download.",
   descLong: "",
   year: "2022",
   langList: ["Idris"],
   toolList: [""],
   link: "",
   githubLink: "https://github.com/calebji123/WordleInIdris",
   featured: true,
   updateDesc: "Random word selection and infinite replayability implemented.",
   address: "wordle_project"
})

const AnimalFarmRework = new Project({
   title: "Animal Farm Rework",
   icon: "",
   status: "Demo",
   descShort: "",
   descLong: "",
   year: "2020",
   langList: [""],
   toolList: [""],
   link: "",
   githubLink: "",
   featured: false,
   updateDesc: "",
   address: "animal_farm_rework_project"
})

const FirstWebsite = new Project({
   title: "First Website",
   icon: "",
   status: "Archived",
   descShort: "My first website! Hopefully you think that this website is better...",
   descLong: "",
   year: "2019",
   langList: [""],
   toolList: [""],
   link: "https://calebji.com/First-Website",
   githubLink: "https://github.com/calebji123/First-Website",
   featured: false,
   updateDesc: "",
   address: "first_website_project"
})

const FirstAnimalFarm = new Project({
   title: "First Animal Farm",
   icon: "",
   status: "Archived",
   descShort: "The first complete version of Animal Farm that I could find. Experience the lack of features! Also experience how little I changed in 4 years.",
   descLong: "",
   year: "2018",
   langList: [""],
   toolList: [""],
   link: "https://calebji.com/AnimalFarm-Archive",
   githubLink: "https://github.com/calebji123/AnimalFarm-Archive",
   featured: false,
   updateDesc: "",
   address: "first_animal_farm_project"
})

const ScienceProject = new Project({
   title: "Science Project",
   icon: "",
   status: "Archived",
   descShort: "Science in Grade 9 was wild. If only I could be there again. Humphead Wrasse protection!",
   descLong: "",
   year: "2018",
   langList: [""],
   toolList: [""],
   link: "https://calebji.com/humpheadwrasse",
   githubLink: "https://github.com/calebji123/humpheadwrasse",
   featured: false,
   updateDesc: "",
   address: "science_project"
})

const CodeWars = new Project({
   title: "CodeWars Badge",
   icon: "",
   status: "",
   descShort: "",
   descLong: "",
   year: "",
   langList: [""],
   toolList: [""],
   link: "",
   githubLink: "",
   featured: false,
   updateDesc: "",
   address: "codewars_badge"
})

const iNFiniTe = new Project({
   title: "iNFiniTe",
   icon: "",
   status: "",
   descShort: "Deso + NFT = win! But actually it feels like a giant scam. I did this hackathon with Frank and Catherine. Check out their githubs in the repository.",
   descLong: "",
   year: "2022",
   langList: [""],
   toolList: [""],
   link: "",
   githubLink: "https://github.com/catherinek07/herohack",
   featured: false,
   updateDesc: "desodesodesodesodeso",
   address: "iNFiniTe project"
})

const Banana2 = new Project({
   title: "Banana2",
   icon: "",
   status: "",
   descShort: "2 hours of work = banana2",
   descLong: "",
   year: "2022",
   langList: [""],
   toolList: [""],
   link: "https://calebji.com/Banana2",
   githubLink: "https://github.com/calebji123/Banana2",
   featured: true,
   updateDesc: "",
   address: "Banana2 project"
})

export
   const projectList = [AnimalFarm, FroggerTwo, Banana, EscapeWorld, WordleInIdris, iNFiniTe, Banana2]

export
   const archiveList = [FirstWebsite, FirstAnimalFarm, ScienceProject]


const Idris = new Category({
   header: "Idris",
   desc: "Idris is a functional program with dependent types. Though not fully developed yet, the concept provides a lot of promise.",
   projectList: [WordleInIdris]
})

const Web = new Category({
   header: "Javascript, HTML, and CSS",
   desc: "These three languages combined are my goto method for coding a web app. Currently also my goto method for coding a game.",
   projectList: [AnimalFarm, EscapeWorld, Banana, Banana2]
})

const Python = new Category({
   header: "Python",
   desc: "I use Python for competition programming and for automating tasks.",
   projectList: [CodeWars]
})

const Elm = new Category({
   header: "Elm",
   desc: "Elm is another functional programming language. This naturally ports to Javascript, allowing for easy DOM integration. ",
   projectList: [AnimalFarmRework]
})

const Processing = new Category({
   header: "Processing",
   desc: "Processing was taught to me in school. The process of making games is really tedious on Processing. There is a reason I don’t use it anymore!",
   projectList: [FroggerTwo]
})

const Hackathon = new Category({
   header: "Hackathon",
   desc: "I like hackathons",
   projectList: [iNFiniTe]
})

export
   const categoryList = [Idris, Web, Processing, Hackathon]





class Blog {
   constructor(infoRecord) {
      this.title = infoRecord.title
      this.date = infoRecord.date
      this.partialContent = infoRecord.partialContent
      this.link = infoRecord.link
   }
}


export
   const latest_blog = {
      title: "Wordle In Idris",
      date: "25.08.22",
      partialContent: "Wordle in Idris is a project to demonstrate the power of type-constrained states for game logic. It is based on an example in chapter 14.3 of the book \"Type Driven Development in Idris\" by Edwin Brady. It follows the basic idea of the game wordle, as popularized by the New York Times, but with significantly fewer features.",
      link: "https://github.com/calebji123/WordleInIdris"
   }