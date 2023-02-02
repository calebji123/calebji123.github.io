import React from "react";
import "./Sections.css"
import "./index.css"
import { Header, NavBar, Title, FeaturedProject, BlogContent, ProjectCategory, GenerateProjects, changeToMobile } from "./Elements";
import { Link } from "react-scroll";
import doubledown_icon from "./images/doubledown.svg"
import docs_logo from "./images/doc.svg"
import mail_logo from "./images/mail.svg"
import github_logo from "./images/github.svg"
import insta_logo from "./images/instagram.svg"
import linkedin_logo from "./images/linkedin.svg"





export
   class TitlePage extends React.Component {
   constructor(props) {
      super(props)
      this.name = props.name
      this.navNames = props.navNames
      this.address = "title_page"
   }

   render() {
      let titlePageClassName = "title_page_container";
      if (this.props.isMobile) {
         titlePageClassName = titlePageClassName + " mobile_title_page";
      } else {
         titlePageClassName = titlePageClassName + " non_mobile_title_page";
      }
      var welcome = "welcome animate__animated animate__fadeInDown " + changeToMobile("normal_text_size", this.props.isMobile)
      return (
         <div className={titlePageClassName} id={this.address}>
            <div className="middle_content">
               <Title name={this.name} />
               <div className="welcome_container">
                  <p className={welcome}>Welcome to my Website</p>
               </div>
            </div>
            {!this.props.isMobile ? <div className="nav_bar"><NavBar navs={this.navNames} /></div> : null}
            {!this.props.isMobile ? <div className="bottom_margin animate__animated animate__fadeIn animate__delay-2s">
               <div className="doubledown_container">
                  <Link activeClass="active" to={this.props.navNames[0][1]} spy={true} smooth={true} offset={-100} duration={500} >
                     <img src={doubledown_icon} alt="scroll down" />
                  </Link>
               </div>
            </div> : null}
         </div>
      )
   }
}


export
   class AboutPage extends React.Component {
   constructor(props) {
      super(props)
      this.content = props.content
      this.navName = "About"
      this.address = "about_page"
   }
   render() {
      var about_para = "about_para " + changeToMobile("normal_text_size", this.props.isMobile)
      var about_container = "about_container " + changeToMobile("padding_module", this.props.isMobile)
      return (
         <div className={about_container} id={this.address}>
            <div className="for_the_bar">
               <Header title="About Me" isMobile={this.props.isMobile}/>
               {this.props.isMobile ? <div className="about_bar mobile_horiz_bar" /> : null}
               <p className={about_para}>{this.content}</p>
               {!this.props.isMobile ? <div className="about_bar vert_bar" /> : null}
            </div>
         </div>
      )
   }
}



export
   class FeaturedPage extends React.Component {
   constructor(props) {
      super(props)
      this.featuredList = props.featuredList
      this.navName = "Featured"
      this.address = "featured_page"
   }
   render() {
      var featured_container = "featured_container " + changeToMobile("padding_module", this.props.isMobile)
      return (
         <div className={featured_container} id={this.address}>
            <Header title="Featured Projects" isMobile={this.props.isMobile}/>
            {this.props.isMobile ? <div className="featured_bar mobile_horiz_bar" /> : <div className="featured_bar horiz_bar" />}
            <div className="content">
               {
                  this.featuredList.map((featured, index) => (
                     <div key={index}>
                        <FeaturedProject project={featured} />
                     </div>
                  ))
               }
            </div>
         </div>
      )
   }
}




export
   class BlogPage extends React.Component {
   constructor(props) {
      super(props)
      this.latest_blog = props.latest_blog
      this.navName = "Blog"
      this.address = "blog_page"
   }
   render() {
      var blog_container = "blog_container " + changeToMobile("padding_module", this.props.isMobile)
      return (
         <div className={blog_container} id={this.address}>
            <div className="for_the_bar">
               <Header title="Latest Blog Post" isMobile={this.props.isMobile}/>
               {this.props.isMobile ? <div className="blog_bar mobile_horiz_bar" /> : null}
               <p className={changeToMobile("normal_text_size", this.props.isMobile)}><i>Blog currently not available</i></p>
               <BlogContent latest_blog={this.latest_blog} isMobile={this.props.isMobile}/>
               {!this.props.isMobile ? <div className="blog_bar vert_bar" /> : null}
            </div>
         </div>
      )
   }
}


export
   class ResumePage extends React.Component {
   constructor(props) {
      super(props)
      this.navName = "Resume"
      this.address = "resume_page"
   }
   render() {
      var resume_container = "resume_container " + changeToMobile("padding_module", this.props.isMobile)
      return (
         <div className={resume_container} id={this.address}>
            <div className="for_the_bar">
               <Header title="Resume" isMobile={this.props.isMobile}/>
               {this.props.isMobile ? <div className="resume_bar mobile_horiz_bar" /> : null}
               <a href="https://docs.google.com/document/d/1YHDzxbHvglepmipuAW-07f3fIEjupKLdmMx8lfvMK7g/edit?usp=sharing" target="_blank">
                  <div className="google_docs_container">
                     <div className="docs_logo_container sixty_button button">
                        <img src={docs_logo} alt="docs" />
                     </div>
                     <p className="googledocs_header sub_header_size">Google Docs</p>
                  </div>
               </a>
               {!this.props.isMobile ? <div className="resume_bar vert_bar" /> : null}
            </div>
         </div>
      )
   }
}




export
   class ProjectsPage extends React.Component {
   constructor(props) {
      super(props)
      this.categories = props.categories
      this.navName = "Projects"
      this.address = "projects_page"
   }
   render() {
      var projects_container = "projects_container " + changeToMobile("padding_module", this.props.isMobile)

      return (
         <div className={projects_container} id={this.address}>
            <Header title="Projects" isMobile={this.props.isMobile}/>
            {this.props.isMobile ? <div className="projects_bar mobile_horiz_bar" /> : <div className="projects_bar horiz_bar" />}
            <div className="content">
               {
                  this.categories.map((category, index) => (
                     <div key={index}>
                        <ProjectCategory
                           category={category}
                           isMobile={this.props.isMobile}
                        />
                     </div>
                  ))
               }
            </div>
         </div>
      )
   }
}



export
   class ArchivePage extends React.Component {
   constructor(props) {
      super(props)
      this.archiveList = props.archiveList
      this.desc = props.desc
      this.navName = "Archive"
      this.address = "archive_page"
   }
   render() {
      var archive_container = "archive_container " + changeToMobile("padding_module", this.props.isMobile)
      var archive_desc = "archive_desc " + changeToMobile("normal_text_size", this.props.isMobile)
      return (
         <div className={archive_container} id={this.address}>
            <Header title="Archive" isMobile={this.props.isMobile}/>
            {this.props.isMobile ? <div className="archive_bar mobile_horiz_bar" /> : <div className="archive_bar horiz_bar" />}
            <div className={archive_desc}>{this.desc}</div>
            <GenerateProjects projectList={this.archiveList} isMobile = {this.props.isMobile}/>
         </div>
      )
   }
}


export
   class ContactPage extends React.Component {
   constructor(props) {
      super(props)
      this.navName = "Contact"
      this.address = "contact_page"
   }
   render() {
      var info = "info " + changeToMobile("normal_text_size", this.props.isMobile)
      var contact_logo_container = "contact_logo_container button " + changeToMobile("eighty_button", this.props.isMobile)
      var contact_container = "contact_container " + changeToMobile("padding_module", this.props.isMobile)
      return (
         <div className={contact_container} id={this.address}>
            <div className="for_the_bar">
               <Header title="Contact Me" isMobile={this.props.isMobile}/>
               {this.props.isMobile ? <div className="contact_bar mobile_horiz_bar" /> : null}
               <div className="icons">
                  <div className="mail contact_section_container flex_row">
                     <a href="mailto:calebji1234@gmail.com" target="_blank">
                        <div className={contact_logo_container}>
                           <img src={mail_logo} alt="mail" />
                        </div>
                     </a>
                     <div className={info}>calebji1234@gmail.com</div>
                  </div>
                  <div className="github contact_section_container flex_row">
                     <a href="https://github.com/calebji123" target="_blank">
                        <div className={contact_logo_container}>
                           <img src={github_logo} alt="github" />
                        </div>
                     </a>
                     <div className={info}>calebji123</div>
                  </div>
                  <div className="linkedin contact_section_container flex_row">
                     <a href="https://linkedin.com/in/caleb-ji" target="_blank">
                        <div className={contact_logo_container}>
                           <img src={linkedin_logo} alt="linkedin" />
                        </div>
                     </a>
                     <div className={info}>linkedin.com/in/caleb-ji</div>
                  </div>
                  <div className="instagram contact_section_container flex_row">
                     <a href="https://www.instagram.com/calebjire47/?hl=en" target="_blank">
                        <div className={contact_logo_container}>
                           <img src={insta_logo} alt="instagram" />
                        </div>
                     </a>
                     <div className={info}>@calebjire47</div>
                  </div>
               </div>
               {!this.props.isMobile ? <div className="contact_bar vert_bar" /> : null}
            </div>
         </div>
      )
   }
}


export
   class Footer extends React.Component {
   constructor(props) {
      super(props)
   }
   render() {
      
      return (
         <div className="footer_container" id="footer">
            <p className="footer_text small_text_size"><>Website coded and designed by Caleb Ji - </>
               <a href="https://github.com/calebji123/calebji123.github.io" target="_blank">
                  <b>Github</b>
               </a>
            </p>
         </div>
      )

   }
}