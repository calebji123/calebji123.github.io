import React from "react";
import ReactDOM from 'react-dom';
import { MarginContainer, StickyNavBar } from './Elements';
import './index.css';
import { archiveList, categoryList, latest_blog, projectList } from './Project';
import { AboutPage, TitlePage, FeaturedPage, BlogPage, ResumePage, ProjectsPage, ArchivePage, ContactPage, Footer } from "./Sections.js"
import Canvas from './Canvas/Canvas'

document.title = "Caleb's Website"
document.querySelector('meta[name="description"]').setAttribute("content", "Caleb's website, built with React.js");

window.mobileCheck = function() {
	let check = false;
	(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
	return check;
 };


class MainPage extends React.Component {
	constructor(props) {
		super(props)
		this.projects = projectList
		this.categories = categoryList
		this.featuredList = this.findFeatured(this.projects)
		this.archiveList = archiveList
		this.latest_blog = latest_blog
		this.magnified = 2
		this.navNames = [["About", "about_page"], ["Featured", "featured_page"], ["Blog", "blog_page"], ["Projects", "projects_page"], ["Resume", "resume_page"], ["Archive", "archive_page"], ["Contact", "contact_page"]]
		this.maxWidth = 768;
		this.state = {
			isMobile: false
		}
	}


	findFeatured(projects) {
		var outputList = []
		for (let i = 0; i < projects.length; i++) {
			const project = projects[i];
			if (project.featured) {
				outputList.push(project)
			}
		}
		return outputList
	}

	handleWindowSizeChange = () =>  {
		if (window.innerWidth <= 768) {
			if (!this.state.isMobile) {
				this.setState({isMobile: true})
			}
		} else {
			if (this.state.isMobile) {
				this.setState({isMobile: false})
			}
		}
	}

	componentDidMount() {
		this.handleWindowSizeChange()
		window.addEventListener('resize', this.handleWindowSizeChange.bind(this));
	}

	componentWillUnmount () {
		window.removeEventListener('resize', this.handleWindowSizeChange.bind(this));
	}

	render() {
		console.log(this.state.isMobile)
		return (
			<div>
				{(!this.state.isMobile) ? <div className="canvas_container">
					<Canvas 
						width	= "800"
						height = "800"
					/>
				</div> : null}
				<TitlePage
					navNames={this.navNames}
					name="Caleb Ji"
					isMobile = {this.state.isMobile}
				/>
				{(!this.state.isMobile) ? <StickyNavBar
					showNav={this.state.showNav}
					navs={this.navNames}
				/> : null}
				
				<MarginContainer>
					<AboutPage
						content="I am currently a student at the University of Toronto studying first year life sciences, thinking about applying into med school. I have been coding since I was 12, and I don't plan on stopping. I am currently focused on web development, particularly game development through javascript. I have recently also started learning functional programming through languages such as Elm and Idris."
						isMobile = {this.state.isMobile}
					/>

					{!this.state.isMobile ? <FeaturedPage
						featuredList={this.featuredList}
						isMobile = {this.state.isMobile}
					/> : null}
					<BlogPage
						latest_blog={this.latest_blog}
						isMobile = {this.state.isMobile}
					/>
					<ProjectsPage 
						categories={this.categories} 
						isMobile = {this.state.isMobile}
					/>
					<ResumePage 
						isMobile = {this.state.isMobile}
					/>
					<ArchivePage
						desc="A look back at some of my early years in coding, found by digging through my files. It serves as a reminder of how far I’ve come, but also how cool my first projects were. "
						archiveList={archiveList}
						isMobile = {this.state.isMobile}
					/>
					<ContactPage 
						isMobile = {this.state.isMobile}
					/>
					<Footer 
						isMobile = {this.state.isMobile}
					/>
				</MarginContainer>
			</div>
		)
	}
}

// ========================================

ReactDOM.render(
	<MainPage />,
	document.getElementById('root')
);


