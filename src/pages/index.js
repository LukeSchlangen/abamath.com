import React from "react";
import ClassTable from "../components/Upcoming_Classes/ClassTable";
import ClassDescriptions from "../components/Class_Descriptions/class-descriptions";
import About from "../components/About/about";
import CodeChampionship from "../components/Code_Championship/code-championship";
import DistrictsList from "../components/Districts/district-list";
import Contact from "../components/Contact/contact";
import GirlsImg from "../images/abamath-girls-coding.jpg"
import KidsImg from "../images/abamath-robotics-team.png"
import CollageImg from "../images/abamath-collage.png"
import upcomingCampsIcon from "../images/upcoming-camps-icon.png"
import InputHints from "react-input-hints"
import "./index.css";
import Img from "gatsby-image";

<meta>We work with Community Education to teach coding, video game creation, and website design camps in the Greater Twin Cities area.</meta>

export default class Index extends React.Component {
  state = {
    searchText: '',
    humanize: Math.round(Math.random() * (200 - 30)) + 30,
  }

  componentDidMount() {
    this.interval = setInterval(this.setHumanize, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  setHumanize = () => {
    setTimeout(() => {
      this.setState({ humanize: Math.round(Math.random() * (200 - 30)) + 30 })
    }, this.state.humanize * 2 + 1200)
  }

  updateSearchText = (event) => {
    this.setState({
      searchText: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <div id="background"></div>
        <div id="body">
          <div id="upcoming">
            <img src={upcomingCampsIcon} alt="Upcoming Camps" />
            <h2>Upcoming Camps</h2>
            <InputHints
              onChange={this.updateSearchText}
              value={this.state.searchText}
              waitBeforeDeleteMs={1200}
              writeSpeedMs={this.state.humanize}
              deleteSpeedMs={this.state.humanize}
              placeholders={["Search Here", "Hopkins", "Search Here", "Coding", "Search Here", "Minnetonka", "Search Here", "Edina"]}
            />
            <div id="table">
              <ClassTable
                districtClasses={this.props.data.allCommunityEducationDistrictClasses.edges}
                searchText={this.state.searchText}
              />
            </div>
          </div>
          <img src={GirlsImg} alt="Girls Coding" />
          <Img resolutions={this.props.data.girlsImage.childImageSharp.resolutions} alt="Girls Coding" />
          <ClassDescriptions
            allOfferedClasses={this.props.data.allOfferedClasses.edges}
          />
          <CodeChampionship />
          <About />
          <img src={KidsImg} alt="Kids Coding" />
          <Img resolutions={this.props.data.kidsImage.childImageSharp.resolutions} alt="kids coding" />
          <DistrictsList
            allDistricts={this.props.data.allCommunityEducationDistrict.edges}
          />
          <Contact />
          <img src={CollageImg} alt="abamath Collage" />
          <Img resolutions={this.props.data.collageImage.childImageSharp.resolutions} alt="abamath collage" />
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query IndexQuery {
    girlsImage: file(relativePath: { eq: "images/abamath-girls-coding.jpg" }) {
      childImageSharp {
        resolutions(width: 999, height: 347) {
          ...GatsbyImageSharpResolutions
        }
      }
    },
    kidsImage: file(relativePath: { eq: "images/abamath-robotics-team.png" }) {
      childImageSharp {
        resolutions(width: 999, height: 240) {
          ...GatsbyImageSharpResolutions
        }
      }
    },
    collageImage: file(relativePath: { eq: "images/abamath-collage.png" }) {
      childImageSharp {
        resolutions(width: 999, height: 769) {
          ...GatsbyImageSharpResolutions
        }
      }
    },
    allCommunityEducationDistrict  {
      totalCount
      edges {
        node {
          id
          fields {
            districtName
            slug
          }
        }
      }
    }
    allCommunityEducationDistrictClasses {
      totalCount
      edges {
        node {
          id
          fields {
            className
            days
            grades
            startdate
            enddate
            district
            link
            time
            description
            slug
          }
        }
      }
    }
    allOfferedClasses: allCommunityEducationOfferedClasses {
      totalCount
      edges {
        node {
          id
          fields {
            slug,
            classgrades,
            classdescription,
            className,
            classshortdescription
          }
        }
      }
    }
}  
`