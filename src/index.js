import React from "react";
import ReactDOM from 'react-dom';
import Children from "react";
import { MarginContainer, StickyNavBar } from './Elements';
import './index.css';
import { archiveList, categoryList, latest_blog, projectList } from './Project';
import { AboutPage, TitlePage, FeaturedPage, BlogPage, ResumePage, ProjectsPage, ArchivePage, ContactPage, Footer } from "./Sections.js"



document.title = "Caleb's Website"
document.querySelector('meta[name="description"]').setAttribute("content", "Caleb's website, built with React.js");

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
		this.state = {
			showNav: false
		}
	}

	componentDidMount() {
		window.addEventListener("scroll", this.onScroll);
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll);
	}

	onScroll = e => {
		const yPos = window.pageYOffset
		if (yPos > 850) {
			this.setState({ showNav: true })
		} else {
			this.setState({ showNav: false })
		}
	};

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


	render() {
		return (
			<div>
				<TitlePage
					navNames={this.navNames}
					name="Caleb Ji"
					index="1"
				/>
				<StickyNavBar
					showNav={this.state.showNav}
					navs={this.navNames}
				/>
				<MarginContainer>
					<AboutPage
						content="I am currently a student at the University of Toronto studying first year life sciences, thinking about applying into med school. I have been coding since I was 12, and I don't plan on stopping. I am currently focused on web development, particularly game development through javascript. I have recently also started learning functional programming through languages such as Elm and Idris."
					/>
					<FeaturedPage
						featuredList={this.featuredList}
					/>
					<BlogPage
						latest_blog={this.latest_blog}
					/>
					<ProjectsPage categories={this.categories} />
					<ResumePage />
					<ArchivePage
						desc="A look back at some of my early years in coding, found by digging through my files. It serves as a reminder of how far I’ve come, but also how cool my first projects were. "
						archiveList={archiveList}
					/>
					<ContactPage />
					<Footer />
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


