import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import url from "url/url";
import axios from "axios";
// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

function ProfilesList({ title, shadow, idProfileUser }) {
  const [driversDispachers, setDriversDispachers] = useState([])
  const getAllDataPosts = () => {
    axios.get(`${url}api/shop/get-all-tycoon-shops/${idProfileUser}`)
      .then((response) => {
        console.log('Data HoTel Guests')
        console.log(response.data.data);
        setDriversDispachers(response.data.data)
      })
      .catch(error => console.error(`Error:${error}`));
  }
  useEffect(() => {
    getAllDataPosts();
    console.log("props.Drivershs")
    console.log(idProfileUser)

  }, []);

  return (
    <Card sx={{ height: "100%", boxShadow: !shadow && "none" }}>
      <MDBox pt={2} px={2}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={6} md={6}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          {title}
          {/* Title */}
        </MDTypography>
          </Grid>
          <Grid item xs={6} md={6}>
         
          
          </Grid>
          </Grid>
     
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {driversDispachers.slice(0,5).map((row) => (
            <MDBox  component="li" display="flex" alignItems="center" py={1} mb={1}>
              <MDBox mr={2}>
                <MDAvatar src={`${url}${row.img}`} alt="something here" shadow="md" />

              </MDBox>
              <MDBox display="flex" flexDirection="column" alignItems="flex-start" justifyContent="center">
                <MDTypography variant="button" fontWeight="medium">
                {row.name}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {row.created_at}
                </MDTypography>
              </MDBox>
              
            </MDBox>
         ))}

        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default props for the ProfilesList
ProfilesList.defaultProps = {
  shadow: true,
};

// Typechecking props for the ProfilesList
ProfilesList.propTypes = {
  title: PropTypes.string.isRequired,
  // profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  shadow: PropTypes.bool,
};

export default ProfilesList;
