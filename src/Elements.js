import React, { useEffect, useState } from "react";
import "./Elements.css"
import "./index.css"
import { Link } from 'react-scroll'
import 'animate.css';

import github_logo from "./images/github.svg"
import link_logo from "./images/link.svg"
import rarrow_icon from "./images/right.svg"
import darrow_icon from "./images/down.svg"
import down_arrow_icon from "./images/arrowdown.svg"

//text
export
   function Title(props) {
   return (
      <div className="title_container">
         <div className="title_bar"></div>
         <p className="title title_size">{props.name}</p>
      </div>
   )
}

export
   function Header(props) {
   return (
      <h1 className="header header_size">{props.title}</h1>
   )
}


//navbar
function NavText(props) {
   return (
      <div className="nav_button">
         <Link activeClass="active" to={props.nav[1]} spy={true} smooth={true} offset={-100} duration={500} >
            <p className="nav_name">{props.nav[0]}</p>
         </Link>
      </div>
   )
}

function NavCircle() {
   return (
      <div className="circle_container">
         <div className="circle"></div>
      </div>
   )
}

export
   function NavBar(props) {
   return (
      <div className="navbar_container flex_row animate__animated animate__fadeIn animate__delay-1s">
         {
            props.navs.map((nav, index) => (
               <div key={index} className="flex_row align_center">
                  { (index > 0) ? <NavCircle /> : null}
                  <NavText nav={nav} />
               </div>
            ))
         }
      </div>

   )
}


export const StickyNavBar = (props) => {
   const [state, setState] = useState({
      showNav: false
   });

   useEffect(() => {
      const onScroll = e => {
         const yPos = window.pageYOffset
         if (yPos > 850) {
            if (!state.showNav){
               setState({ showNav: true })
            }
         } else {
            if (state.showNav){
               setState({ showNav: false })
            }
         }
      };

      window.addEventListener("scroll", onScroll);
      return () => {
         window.removeEventListener("scroll", onScroll);
      }
   })

   var outerClassName = "sticky_navbar_container"
   if (!state.showNav) {
      outerClassName = outerClassName + " display_none"
   }
   return (
      <div className={outerClassName}>
         <div className="sticky_background animate__animated animate__fadeIn">
            {
               props.navs.map((nav, index) => (
                  <div key={index} className="flex_row align_center">
                  { (index > 0) ? <NavCircle /> : null }
                  <NavText nav={nav} />
                  </div>
               ))
            }
         </div>
      </div>
   )

}



// For project dropdown

function GoLink(props) {
   return (
      <div className="link_out_container">
         <a href={props.link} target="_blank">
            <div className="link_in_container sixty_button button">
               <img src={link_logo} alt="link" />
            </div>
         </a>
      </div>
   )
}

function Github(props) {
   return (
      <div className="link_out_container">
         <a href={props.link} target="_blank">
            <div className="github_in_container sixty_button button">
               <img src={github_logo} alt="github" />
            </div>
         </a>
      </div>
   )
}

function RightArrow() {
   return (
      <div className="rarrow_container">
         <img src={rarrow_icon} alt="closed" />
      </div>
   )
}

function DownArrow() {
   return (
      <div className="larrow_container">
         <img src={darrow_icon} alt="opne" />
      </div>
   )
}



export
   class ProjectDropdown extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         open: false
      }
      this.project = props.project

      if (this.props.project.descShort == "") {
         this.hasDesc = false
      } else {
         this.hasDesc = true
      }
      this.changeOpenState = this.changeOpenState.bind(this)
   }

   changeOpenState() {
      this.setState(prevState => ({
         open: !prevState.open
      }))
   }

   renderArrow() {
      if (this.hasDesc) {
         if (this.state.open) {
            return <DownArrow />
         }
         return <RightArrow />
      }
      return null
   }


   render() {
      var descClassName = "project_desc_container"
      if (this.state.open) {
         if (this.hasDesc) {
            descClassName = descClassName + " active"
         }
      }
      var hasYear = ""
      if (this.project.year != "") {
         hasYear = " ~ "
      }
      return (
         <>
            <div className="dropdown_container" id={this.project.address}>
            <a><div className="read_more_container" onClick={this.changeOpenState}>
               {this.renderArrow()}
               <p className="dropdown_title sub_header_size">{this.project.title}{hasYear}{this.project.year}</p>
            </div></a>
               {this.project.link ? <GoLink link={this.project.link} /> : null }
               {this.project.githubLink ? <Github link={this.project.githubLink} /> : null }
            </div>
            <div className={descClassName}>
               <p className="desc normal_text_size">{this.project.descShort}</p>
            </div>
         </>
      )
   }
}



//for projects

export
   function FeaturedProject(props) {
   return (
      <div className="project_container">
         <Link activeClass="active" to={props.project.address} spy={true} smooth={true} offset={-100} duration={500} >
            <div className="read_more_container">
               <img src={down_arrow_icon} alt="read more" className="featured_arrow" />
               <p className="project_title sub_header_size" >{props.project.title} ~ {props.project.year}</p>
            </div>
         </Link>
         {props.project.link ? <GoLink link={props.project.link} /> : null }
         {props.project.githubLink ? <Github link={props.project.githubLink} /> : null }
      </div>
   )
}

export
   function GenerateProjects(props) {
   return (
      <div className="generate_container">
         {
            props.projectList.map((project, index) => (
               <div key={index}>
                  <ProjectDropdown project={project} />
               </div>
            ))
         }
      </div>
   )
}

export
   function ProjectCategory(props) {
   return (
      <div className="category_container">
         <p className="category_header demi_header_size">{props.category.header}</p>
         <div className="desc_container">
            <div className="for_the_bar">
               <p className="category_desc normal_text_size">{props.category.desc}</p>
               <GenerateProjects projectList={props.category.projectList} />
               <div className="project_bar" />
            </div>
         </div>
      </div>
   )
}



//blog
export
   function BlogContent(props) {
   return (
      <div className="blog_content_container">
         <p className="blog_title sub_header_size">{props.latest_blog.title} - {props.latest_blog.date}</p>
         <p className="blog_content normal_text_size">{props.latest_blog.partialContent}</p>
         <a href={props.latest_blog.link} target="_blank">
            <p className="read_more normal_text_size"><i>Read More</i></p>
         </a>
      </div>
   )
}




//margin container
export
   function MarginContainer(props) {
   return (
      <div className="margin_container">
         {/* <div className="margin_left" /> */}
         {/* <div className="content"> */}
            {props.children}
         {/* </div> */}
         {/* <div className="margin_right" /> */}
      </div>
   )
}







