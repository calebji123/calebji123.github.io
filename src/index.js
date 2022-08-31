import React from "react";
import ReactDOM from 'react-dom';
import Children from "react";
import { MarginContainer, StickyNavBar } from './Elements';
import './index.css';
import { archiveList, categoryList, latest_blog, projectList } from './Project';
import { AboutPage, TitlePage, FeaturedPage, BlogPage, ResumePage, ProjectsPage, ArchivePage, ContactPage, Footer } from "./Sections.js"





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
						content="I’m an aspiring doctor studying at the University of Toronto for Life Sciences in my first year. I love computer science, especially making games. I started coding when I was 12 and I don’t plan on stopping. "
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


{/* <div>
				<TitlePage
					nav_names={this.nav_names}
					name="Caleb Ji"
				/>
				<MarginContainer>
					<AboutPage
						content="I’m an aspiring doctor studying at the University of Toronto for Life Sciences in my first year. I love computer science, especially making games. I started coding when I was 12 and I don’t plan on stopping. "
					/>
					<FeaturedPage
						featured1={this.projects[0]}
						featured2={this.projects[3]}
						featured3={this.projects[2]}
					/>
					<BlogPage />
					<ResumePage />
					<ProjectsPage categories={this.categories} />
					<ArchivePage
						desc="A look back at some of my early years in coding, found by digging through my files. It serves as a reminder of how far I’ve come, but also how cool my first projects were. "
						archiveList={archiveList}
					/>
				</MarginContainer>
			</div> */}

// ========================================

ReactDOM.render(
	<MainPage />,
	document.getElementById('root')
);


