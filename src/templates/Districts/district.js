import React from "react";
import ClassTable from "../../components/Class_Table/ClassTable";
import "./district.css";

export default class OfferedClass extends React.Component {

  render() {
    const specificDistrict = this.props.data.allCommunityEducationDistrict.edges[0].node.fields;
    return (
      <div>
        <div id="info">
          <h1>{specificDistrict.districtName}{""}</h1>
        </div>
        <div id="offerred-classes">
        <h2>Upcoming {specificDistrict.districtName}{""} Camps</h2>
        <ClassTable
          districtClasses={this.props.data.allDistrictClasses.edges}
          searchText={specificDistrict.districtName}
        />
        </div>
      </div>
    );
  }
};

export const query = graphql`
query DistrictsQuery($slug: String!) {
  allCommunityEducationDistrict(filter: {fields: { slug: { eq: $slug } }}) {
    totalCount
    edges {
      node {
        id
        fields {
          slug,
          districtName
        }
      }
    }
  },

  tableClass: allCommunityEducationDistrictClasses(filter: {fields: { slug: { eq: $slug } }}) {
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
          link
          slug
        }
      }
    }
  },

  allDistrictClasses: allCommunityEducationDistrictClasses {
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
}
`;