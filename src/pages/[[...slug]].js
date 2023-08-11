import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Swiper, SwiperSlide } from "swiper/react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Dialog from "@mui/material/Dialog";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LoadingButton } from "@mui/lab";
import CallIcon from "@mui/icons-material/Call";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import DomainRoundedIcon from "@mui/icons-material/DomainRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import AddIcon from "@mui/icons-material/Add";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAddFormDataMutation } from "../reduxSlice/apiSlice";
import layoutData from "../layout.json";

// exterior images
import exterior from "../../public/testImages1/Exterior/Exterior.jpg";
import exterior1 from "../../public/testImages1/Exterior/Exterior 1.jpg";
import exterior2 from "../../public/testImages1/Exterior/Exterior 2.jpg";
import exterior3 from "../../public/testImages1/Exterior/Exterior 3.jpg";
import exterior4 from "../../public/testImages1/Exterior/Exterior 4.jpg";

// interior images
import interior from "../../public/testImages1/Interior/Interior.jpg";
import interior1 from "../../public/testImages1/Interior/Interior 1.jpg";
import interior2 from "../../public/testImages1/Interior/Interior 2.jpg";
import interior3 from "../../public/testImages1/Interior/Interior 3.jpg";

// rooftop images
import roofTop from "../../public/testImages1/RoofTop/Rooftop.jpg";
// import roofTop1 from "../../public/testImages1/RoofTop/Rooftop1.tif";
// import roofTop2 from "../../public/testImages1/RoofTop/Rooftop2.tif";
import roofTop3 from "../../public/testImages1/RoofTop/Rooftop3.jpg";
import roofTop4 from "../../public/testImages1/RoofTop/Rooftop 4.jpg";
import roofTop5 from "../../public/testImages1/RoofTop/Roof top 5.jpg";

// tower to tower images
import towerToTower from "../../public/testImages1/Tower_to_tower/Tower to tower.jpg";
import towerToTower1 from "../../public/testImages1/Tower_to_tower/Tower to tower 1.jpg";
import towerToTower2 from "../../public/testImages1/Tower_to_tower/Tower to tower 2.jpg";
import towerToTower3 from "../../public/testImages1/Tower_to_tower/Tower to tower 3.jpg";
import towerToTower4 from "../../public/testImages1/Tower_to_tower/Tower to tower 4.jpg";

import projectHighlightsImg from "../../public/testImages1/projectHighlightsImg.png";
import urbanriseLogo from "../../public/testImages1/urbanrise_logo.png";
import lpImgXs from "../../public/testImages1/lpImg_xs.png";
import wojLogo from "../../public/testImages1/TWOJ_logo.png";
import trisha from "../../public/testImages1/trisha.png";
import trishaXs from "../../public/testImages1/trisha_xs.png";
import locationMap from "../../public/testImages1/location_map.jpg";

// siddhaSky website logos

import partnerShipLogo from "../../public/images/siddhaLogos/partnershipLogo.png";
import sejalLogo from "../../public/images/siddhaLogos/sejalLogo.png";
import siddhaLogo from "../../public/images/siddhaLogos/siddhaLogo.png";
import sidhaSejalLogo from "../../public/images/siddhaLogos/sidhaSejalLogo.png";
import skyLogo from "../../public/images/siddhaLogos/skyLogo.png";
import dramsLogo from "../../public/images/siddhaAminites/drams.png";

import gymLogo from "../../public/images/siddhaAminites/gym.png";
import hallLogo from "../../public/images/siddhaAminites/hall.png";
import jaccussiLogo from "../../public/images/siddhaAminites/jaccussi.png";
import kidLogo from "../../public/images/siddhaAminites/kid.png";
import playingLogo from "../../public/images/siddhaAminites/playing.png";
import stepsLogo from "../../public/images/siddhaAminites/steps.png";
import swimmingLogo from "../../public/images/siddhaAminites/swimming.png";

// siddhasky website images

import contactBg from "../../public/images/contact-bg.jpg";

const EMPTY_USERDATA = {
  userName: "",
  phoneNo: "",
  email: "",
};

const EMPTY_ISDIRTY = {
  userName: false,
  email: false,
  phoneNo: false,
};

const EMPTY_ERRORMSGS = {
  userName: "",
  email: "",
  phoneNo: "",
};

export const ERROR_TEXT = {
  EMPTY_FIELD: "Cannot be empty",
  GENERIC_SOMETHINGWRONG: "Please check this field",
  EMAIL_WRONGFORMAT: "Email should be in example@email.com format",
  EMAIL_ALREADYTAKEN: "This email is already taken !",
  PHNO_10NUMS: "Should have 10 numbers",
  USERNAME_WRONGFORMAT: "Only letters with spaces in middle here",
  USERNAME_NUMCHARS: "Should be between 3 and 20 characters",
  TOAST_SOMETHINGWENTWRONG: "Something went wrong. Please try again",
};

export function checkEmailErrors(email) {
  if (!email) {
    return ERROR_TEXT.EMPTY_FIELD;
  }
  if (typeof email !== "string") {
    return ERROR_TEXT.GENERIC_SOMETHINGWRONG;
  }
  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )
  ) {
    return ERROR_TEXT.EMAIL_WRONGFORMAT;
  }

  return "";
}

export function checkPhNoErrors(phoneNo) {
  if (!phoneNo) {
    return ERROR_TEXT.EMPTY_FIELD;
  }
  if (typeof phoneNo !== "string") {
    return ERROR_TEXT.GENERIC_SOMETHINGWRONG;
  }
  if (!/^\d{10}$/.test(phoneNo)) {
    return ERROR_TEXT.PHNO_10NUMS;
  }

  return "";
}

export function checkUserNameErrors(userName) {
  if (!userName) {
    return ERROR_TEXT.EMPTY_FIELD;
  }
  if (typeof userName !== "string") {
    return ERROR_TEXT.GENERIC_SOMETHINGWRONG;
  }
  if (!/^.{3,20}$/.test(userName)) {
    return ERROR_TEXT.USERNAME_NUMCHARS;
  }
  if (!/^[a-zA-Z]+[a-zA-Z\s]{1,20}[a-zA-Z]+$/.test(userName)) {
    return ERROR_TEXT.USERNAME_WRONGFORMAT;
  }

  return "";
}

const getUtmParams = (pageQueryParams) => {
  const source = pageQueryParams?.utm_source || "Direct Traffic";
  const medium = pageQueryParams?.utm_medium;
  const campaign = pageQueryParams?.utm_campaign;
  const content = pageQueryParams?.utm_content;
  // const ad = pageQueryParams?.utm_ad;

  return {
    source,
    medium,
    campaign,
    content,
    // ad,
  };
};

export default function Home() {
  const [openEnquiry, setOpenEnquiry] = useState(false);
  return (
    <>
      <Head>
        <title>The World of Joy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid container flexDirection="column" sx={{ position: "relative" }}>
        {(layoutData || []).map((item) => {
          switch (item.type) {
            case "navBar":
              return <Navbar key={item.id} content={item} />;
            case "overview":
              return (
                <Box
                  component="section"
                  id="OVERVIEW"
                  sx={{ width: "100%", marginTop: "5rem" }}
                >
                  <BannerImg />
                  <Overview key={item.id} content={item} />
                </Box>
              );
            case "priceDetails":
              return (
                <Box
                  component="section"
                  id="CONFIGURATION"
                  sx={{ width: "100%" }}
                >
                  <PriceDetails
                    key={item.id}
                    content={item}
                    setOpenEnquiry={setOpenEnquiry}
                  />
                </Box>
              );

            case "amenities":
              return (
                <Box component="section" id="Amenities" sx={{ width: "100%" }}>
                  <Amenties key={item.id} content={item} />
                </Box>
              );
            case "gallery":
              return (
                <Box component="section" id="Gallery" sx={{ width: "100%" }}>
                  <Gallery key={item.id} content={item} />
                </Box>
              );
            case "walkthrough":
              return (
                <Box
                  component="section"
                  id="WalkthroughVideo"
                  sx={{ width: "100%" }}
                >
                  <WalkThrough key={item.id} content={item} />
                </Box>
              );
            case "location":
              return (
                <Box component="section" id="Location" sx={{ width: "100%" }}>
                  <LocationAdvantages key={item.id} content={item} />
                </Box>
              );

            case "downloads":
              return (
                <Box component="section" id="Contact" sx={{ width: "100%" }}>
                  <LandingPage key={layoutData[1].id} content={layoutData[1]} />
                </Box>
              );
            case "contactDetails":
              return <Footer />;

            default:
              return null;
          }
        })}
        <Grid container item xs={12} justifyContent="flex-end">
          <Contact setOpenEnquiry={setOpenEnquiry} />
        </Grid>
        <EnquiryFormPopup
          openEnquiry={openEnquiry}
          setOpenEnquiry={setOpenEnquiry}
        />
      </Grid>
    </>
  );
}

function Navbar({ content }) {
  const [drawerState, setDrawerState] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const scrollToView = (target) => {
    const section = document.querySelector(target?.replace(/\s/g, ""));
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <AppBar
      sx={{
        width: "100%",
        position: "fixed",
      }}
    >
      <Container
        maxWidth="100%"
        sx={{
          display: "flex",
          alignItems: "center",
          background: content?.style?.bgColor,
          padding: 0,
          boxShadow: "0 0 15px #000000",
          height: { xs: "50px", sm: "80px" },
        }}
      >
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Grid
            container
            item
            xs={3}
            sm={2}
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              height: { xs: "35px", sm: "50px" },
              overflow: "hidden",
              position: "relative",
              // marginLeft:'10px'
            }}
          >
            <Image
              src={skyLogo}
              alt="logo"
              style={{
                height: "100%",
                width: "auto",
                objectFit: "cover",
              }}
              sizes="100vw"
            />
          </Grid>
          <Grid
            container
            item
            xs={8}
            sm={7}
            sx={{ visibility: { xs: "hidden", md: "visible" } }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexGrow: "1",
                gap: "10px",
              }}
            >
              {(content?.sections || []).map((item) => (
                <Typography
                  key={item}
                  onClick={() => {
                    scrollToView(`#${item}`);
                    setSelectedSection(item);
                  }}
                  sx={{
                    fontSize: "15px",
                    color: content?.style?.textColor,

                    fontWeight: selectedSection === item ? "bold" : "none",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    borderRadius: "10px",
                  }}
                >
                  {item || ""}
                </Typography>
              ))}
            </Box>
          </Grid>
          <Grid
            container
            item
            xs={1.5}
            alignItems="center"
            paddingLeft="0"
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              position: "relative",
              width: "100%",
              height: "100px",
            }}
          >
            <Image
              fill
              src={sidhaSejalLogo}
              alt="logo"
              style={{
                height: "100%",
                objectFit: "contain",
              }}
              sizes="100vw"
            />
          </Grid>
          <Grid
            container
            item
            xs={1}
            alignItems="center"
            paddingLeft="0"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                justifyContent: "center",
                // color: "#ffffff",
              }}
            >
              <IconButton
                onClick={() => setDrawerState(!drawerState)}
                size="large"
                edge="start"
                color="#000"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <NavbarDrawer
        drawerState={drawerState}
        setDrawerState={setDrawerState}
        sectionNames={content?.sections}
      />
    </AppBar>
  );
}
Navbar.propTypes = {
  content: PropTypes.object.isRequired,
};

function NavbarDrawer({ drawerState, setDrawerState, sectionNames }) {
  const [selectedSection, setSelectedSection] = useState("");

  const scrollToView = (target) => {
    const section = document.querySelector(target?.replace(/\s/g, ""));
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <Collapse
      in={drawerState}
      sx={{
        width: "100%",
      }}
    >
      <Grid
        container
        item
        rowSpacing={5}
        padding="15px"
        sx={{
          background: "rgba(0, 0, 0, 0.9)",
          marginTop: "0",
          zIndex: "100",
        }}
      >
        {(sectionNames || [])?.map((item) => (
          <Grid
            item
            key={item}
            sm={12}
            xs={12}
            display="flex"
            justifyContent="center"
            style={{ padding: "10px" }}
          >
            <Typography
              onClick={() => {
                scrollToView(`#${item}`);
                setDrawerState(false);
                setSelectedSection(item);
              }}
              sx={{
                fontSize: 14,
                padding: "10px 20px",
                textTransform: "capitalize",
                width: "fit-content",
                background: selectedSection === item ? "#006CB5" : "none",
                color: "#fff",
                borderRadius: "10px",
                ":hover": {
                  color: "#8a7007",
                },
              }}
            >
              {item || ""}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Collapse>
  );
}
NavbarDrawer.propTypes = {
  drawerState: PropTypes.bool.isRequired,
  setDrawerState: PropTypes.func.isRequired,
};

function LandingPage({ content }) {
  const [addFormData, { isLoading }] = useAddFormDataMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [userData, setUserData] = useState(EMPTY_USERDATA);
  const [isDirty, setIsDirty] = useState({
    userName: false,
    email: false,
    phoneNo: false,
  });
  const [errorMsgs, setErrorMsgs] = useState({
    userName: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (isDirty.email) {
      setErrorMsgs((m) => ({
        ...m,
        email: checkEmailErrors(userData.email),
      }));
    }
    if (isDirty.phoneNo) {
      setErrorMsgs((m) => ({
        ...m,
        phoneNo: checkPhNoErrors(userData.phoneNo),
      }));
    }
    if (isDirty.userName) {
      setErrorMsgs((m) => ({
        ...m,
        userName: checkUserNameErrors(userData.userName),
      }));
    }
  }, [isDirty, userData]);

  const resetData = () => {
    setUserData(EMPTY_USERDATA);
    setIsDirty(EMPTY_ISDIRTY);
    setErrorMsgs(EMPTY_ERRORMSGS);
  };

  const router = useRouter();

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    const pageQueryParams = router?.query;
    const utmParams = getUtmParams(pageQueryParams);

    addFormData({ ...(userData || {}), utmParams })
      .unwrap()
      .then(() => {
        resetData();
        // window.location.href = "/thanku";
      })
      .catch(() => {
        enqueueSnackbar({
          variant: "error",
          message: ERROR_TEXT.TOAST_SOMETHINGWENTWRONG,
        });
      });
  };
  return (
    <Grid
      container
      item
      xs={content?.containerCol?.xs}
      sm={content?.containerCol?.sm}
      md={content?.containerCol?.md}
      lg={content?.containerCol?.lg}
      xl={content?.containerCol?.xl}
      sx={{}}
    >
      <Grid item xs={12} md={6} sx={{ height: "30rem" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.6214760998555!2d72.8675830742873!3d19.03639428216002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cfaf78bb0ba7%3A0x40bc1d125e65498a!2sSiddha%20Sky-%20Wadala!5e0!3m2!1sen!2sin!4v1691493333226!5m2!1sen!2sin"
          width="100%"
          height="100%"
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Grid>
      <Box
        sx={{
          width: { md: "50%", xs: "100%" },
          position: "relative",
          height: "37rem",
          background: "rgba(0, 0, 0, 0.5)", // Black overlay with decreased opacity
          backgroundBlendMode: "multiply",
          backgroundImage: `url(https://siddhasky-mumbai.com/images/contact-bg.jpg)`, // Replace with your image path
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* <Grid item xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
          <Image fill src={exterior3} alt="landingpage" sizes="100vw" />
        </Grid> */}
        {/* <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}> */}
        {/* <Image src={lpImgXs} alt="landingpageXs" sizes="100%" /> */}
        {/* </Grid> */}

        <Grid
          container
          item
          xs={content?.containerCol?.md}
          sm={content?.containerCol?.sm}
          md={content?.containerCol?.md}
          lg={content?.containerCol?.lg}
          xl={content?.containerCol?.xl}
          alignItems="center"
          sx={{
            // background: content?.style?.containerBg,

            paddingLeft: { xs: 0, sm: "50px" },
            justifyContent: { xs: "center", sm: "left" },
            position: "absolute",
            width: "100%",
          }}
        >
          <Grid
            container
            item
            xs={content?.innerContainerCol?.xs}
            sm={content?.innerContainerCol?.sm}
            md={content?.innerContainerCol?.md}
            lg={content?.innerContainerCol?.lg}
            xl={content?.innerContainerCol?.xl}
            display="flex"
            justifyContent="space-between"
            sx={{
              // background: "rgba(0, 108, 181, 0.1)",
              borderRadius: "24px",
              height: { xs: "100%", sm: "100%" },
            }}
          >
            {/* <Grid
              container
              item
              xs={content?.leftCol?.xs}
              sm={content?.leftCol?.sm}
              md={content?.leftCol?.md}
              lg={content?.leftCol?.lg}
              xl={content?.leftCol?.xl}
              sx={{
                height: "100%",
                padding: { xs: "30px 0 30px 15px", sm: "50px 30px" },
                alignContent: "flex-start",
              }}
            >
              <Grid item xs={5} sm={4}>
                <Image
                  style={{
                    width: "80%",
                    height: "auto",
                  }}
                  src={wojLogo}
                  alt="woj_logo"
                  sizes="100vw"
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  component="h1"
                  sx={{
                    padding: "30px 0 10px 0",
                    fontSize: { xs: "20px", sm: "34px" },
                    fontWeight: "bold",
                    color: "#F9B800",
                  }}
                >
                  {content?.title || ""}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: "18px", sm: "24px" },
                    color: "#ffffff",
                  }}
                >
                  {content?.description || ""}
                </Typography>
              </Grid>
              <Grid item xs={12} sx={{ paddingTop: "20px" }}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: "14px", sm: "20px" },
                    color: "#F9B800",
                  }}
                >
                  APARTMENTS:{" "}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: "14px", sm: "20px" },
                      color: "#ffffff",
                    }}
                  >
                    {content?.apartments || ""}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: "14px", sm: "20px" },
                    color: "#F9B800",
                  }}
                >
                  STATUS:{" "}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: "14px", sm: "20px" },
                      color: "#ffffff",
                    }}
                  >
                    {content?.status || ""}
                  </Typography>
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  sx={{
                    fontSize: { xs: "14px", sm: "20px" },
                    color: "#F9B800",
                  }}
                >
                  PRICE:{" "}
                  <Typography
                    component="span"
                    sx={{
                      fontSize: { xs: "14px", sm: "20px" },
                      color: "#ffffff",
                    }}
                  >
                    {content?.price || ""}
                  </Typography>
                </Typography>
              </Grid>
            </Grid> */}
            <Grid
              container
              item
              // xs={content?.formCol?.xs}
              // sm={content?.formCol?.sm}
              // md={content?.formCol?.md}
              // lg={content?.formCol?.lg}
              // xl={content?.formCol?.xl}
              xs={12}
              sx={{
                borderRadius: "20px",
                justifyContent: "center",
                alignContent: "flex-start",
                margin: "30px 30px 0 0",
                display: { xs: "flex" },
                paddingBottom: "50px",
              }}
            >
              <Grid
                item
                xs={12}
                sx={{
                  height: "10px",
                }}
              />
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  sx={{
                    padding: "30px 0 10px 0",
                    fontSize: "32px",
                    fontWeight: "bold",
                    color: "#fff",
                    textAlign: "center",
                  }}
                >
                  Contact Us
                </Typography>
                <Typography
                  component="p"
                  sx={{
                    color: "#fff",
                    textAlign: "center",
                    fontSize: "18px",
                    marginBottom: "10px",
                  }}
                >
                  Please enter your details to get in touch with us
                </Typography>
              </Grid>
              <Grid container item xs={11} justifyContent="flex-start">
                <Grid container item xs={12} style={{ margin: "5px 0" }}>
                  <Grid
                    item
                    xs={12}
                    style={{
                      margin: "10px 0 0 0",
                    }}
                  >
                    <TextField
                      type="text"
                      id="outlined-basi01"
                      value={userData.userName}
                      error={!!errorMsgs.userName}
                      helperText={errorMsgs?.userName || ""}
                      onBlur={() => {
                        setIsDirty((d) => ({
                          ...d,
                          userName: true,
                        }));
                      }}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          userName: e.target.value || "",
                        });
                      }}
                      placeholder="Name"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root .MuiInputBase-input": {
                          background: "rgba(0, 0, 0, 0.04)",
                          borderRadius: "9px",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "12px",
                        },
                        "& .css-jvam3j-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            backgroundColor: "white",
                          },
                      }}
                      InputProps={{
                        sx: {
                          height: "50px",
                        },
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} style={{ margin: "5px 0" }}>
                  <Grid item xs={12}>
                    <TextField
                      type="text"
                      id="outlined-basic02"
                      value={userData.phoneNo}
                      error={!!errorMsgs.phoneNo}
                      helperText={errorMsgs?.phoneNo || ""}
                      onBlur={() => {
                        setIsDirty((d) => ({
                          ...d,
                          phoneNo: true,
                        }));
                      }}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          phoneNo: e.target.value || "",
                        });
                      }}
                      placeholder="Phone number"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root .MuiInputBase-input": {
                          background: "rgba(0, 0, 0, 0.04)",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "12px",
                        },
                        "& .css-jvam3j-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            backgroundColor: "white",
                          },
                      }}
                      InputProps={{
                        sx: {
                          height: "50px",
                        },
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid container item xs={12} style={{ margin: "5px 0" }}>
                  <Grid item xs={12}>
                    <TextField
                      type="email"
                      id="outlined-basic03"
                      value={userData.email}
                      error={!!errorMsgs.email}
                      helperText={errorMsgs?.email || ""}
                      onBlur={() => {
                        setIsDirty((d) => ({
                          ...d,
                          email: true,
                        }));
                      }}
                      onChange={(e) => {
                        setUserData({
                          ...userData,
                          email: e.target.value || "",
                        });
                      }}
                      placeholder="Email"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-root .MuiInputBase-input": {
                          background: "rgba(0, 0, 0, 0.04)",
                        },
                        "& .MuiFormHelperText-root": {
                          fontSize: "12px",
                        },
                        "& .css-jvam3j-MuiInputBase-root-MuiOutlinedInput-root":
                          {
                            backgroundColor: "white",
                          },
                      }}
                      InputProps={{
                        sx: {
                          height: "50px",
                        },
                      }}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ paddingTop: "10px", textAlign: "center" }}
                >
                  <LoadingButton
                    onClick={() => submitForm()}
                    style={{
                      height: "50px",
                      background: "#cfe7ff",
                      textTransform: "capitalize",
                      color: "#272727",
                      fontWeight: "bold",
                      fontSize: "18px",
                    }}
                    loading={isLoading}
                    variant="contained"
                  >
                    Submit
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    component="p"
                    sx={{
                      color: "#fff",
                      textAlign: "center",
                      marginTop: "20px",
                      marginBottom: "10px",
                      lineHeight: "23px",
                    }}
                  >
                    Site Add.: Siddha, Sardar Nagar No. 4, Sion Division, Hemant
                    Manjrekar Road, Beside GTB Monorail Station, Wadala (East,
                    Mumbai, Maharashtra 400037
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      {/* <Grid
        container
        item
        xs={12}
        sx={{
          background: "rgba(0, 108, 181, 0.10)",
          borderRadius: "0 0 20px 20px",
          overflow: "hidden",
          justifyContent: "center",
          alignContent: "flex-start",
          display: { xs: "flex", sm: "none" },
        }}
      >
        <Grid
          container
          item
          xs={11}
          sx={{
            background: content?.style?.formBg,
            borderRadius: "20px",
            overflow: "hidden",
            justifyContent: "center",
            alignContent: "flex-start",
            margin: "30px 0",
            display: { xs: "flex", sm: "none" },
          }}
        >
          <Grid
            item
            xs={12}
            sx={{
              height: "20px",
              background: content?.style?.formTopColor,
            }}
          />
          <Grid item xs={11}>
            <Typography
              component="h1"
              sx={{
                padding: "30px 0 10px 0",
                fontSize: "20px",
                fontWeight: "bold",
                color: content?.style?.formTopColor,
              }}
            >
              ENQUIRE NOW
            </Typography>
          </Grid>
          <Grid container item xs={11} justifyContent="flex-start">
            <Grid container item xs={12} style={{ margin: "10px 0" }}>
              <Grid
                item
                xs={12}
                style={{
                  margin: "10px 0 0 0",
                }}
              >
                <TextField
                  type="text"
                  id="outlined-basi01"
                  value={userData.userName}
                  error={!!errorMsgs.userName}
                  helperText={errorMsgs?.userName || ""}
                  onBlur={() => {
                    setIsDirty((d) => ({
                      ...d,
                      userName: true,
                    }));
                  }}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      userName: e.target.value || "",
                    });
                  }}
                  placeholder="Name"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "rgba(0, 0, 0, 0.04)",
                      borderRadius: "9px",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} style={{ margin: "10px 0" }}>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  id="outlined-basic02"
                  value={userData.phoneNo}
                  error={!!errorMsgs.phoneNo}
                  helperText={errorMsgs?.phoneNo || ""}
                  onBlur={() => {
                    setIsDirty((d) => ({
                      ...d,
                      phoneNo: true,
                    }));
                  }}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      phoneNo: e.target.value || "",
                    });
                  }}
                  placeholder="Phone number"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "rgba(0, 0, 0, 0.04)",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item xs={12} style={{ margin: "10px 0" }}>
              <Grid item xs={12}>
                <TextField
                  type="email"
                  id="outlined-basic03"
                  value={userData.email}
                  error={!!errorMsgs.email}
                  helperText={errorMsgs?.email || ""}
                  onBlur={() => {
                    setIsDirty((d) => ({
                      ...d,
                      email: true,
                    }));
                  }}
                  onChange={(e) => {
                    setUserData({
                      ...userData,
                      email: e.target.value || "",
                    });
                  }}
                  placeholder="Email"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "rgba(0, 0, 0, 0.04)",
                    },
                    "& .MuiFormHelperText-root": {
                      fontSize: "12px",
                    },
                  }}
                  InputProps={{
                    sx: {
                      height: "40px",
                    },
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: "30px" }}>
              <LoadingButton
                onClick={() => submitForm()}
                style={{
                  width: "100%",
                  height: "50px",
                  background: "#006CB5",
                  textTransform: "capitalize",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: { xs: "14px", sm: "18px" },
                  marginBottom: "20px",
                }}
                loading={isLoading}
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
}
LandingPage.propTypes = {
  content: PropTypes.object.isRequired,
};

function Overview({ content }) {
  return (
    <Grid
      container
      item
      xs={content?.containerCol?.xs}
      sm={content?.containerCol?.sm}
      md={content?.containerCol?.md}
      lg={content?.containerCol?.lg}
      xl={content?.containerCol?.xl}
      sx={{ margin: "20px 0" }}
    >
      {/* <Grid
        container
        item
        xs={content?.imgCol?.xs}
        sm={content?.imgCol?.sm}
        md={content?.imgCol?.md}
        lg={content?.imgCol?.lg}
        xl={content?.imgCol?.xl}
        sx={{
          position: "relative",
          height: "550px",
          display: { xs: "flex", sm: "none" },
          marginBottom: "30px",
        }}
      >
        <Image
          fill
          src={exterior2}
          style={{ objectFit: "cover" }}
          alt="location map"
          sizes="100vw"
        />
      </Grid>
      <Grid
        container
        item
        xs={content?.contentCol?.xs}
        sm={content?.contentCol?.sm}
        md={content?.contentCol?.md}
        lg={content?.contentCol?.lg}
        xl={content?.contentCol?.xl}
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          container
          item
          xs={10}
          sx={{
            border: "1px solid #000",
            padding: "30px",
            borderRadius: "5px",
            height: "fit-content",
            position: "relative",
          }}
        >
          <Grid item xs={12}>
            <Typography
              component="h1"
              sx={{
                padding: "10px",
                fontSize: { xs: "14px", sm: "20px" },
                fontWeight: "bolder",
                color: "#F9B800",
              }}
            >
              {content?.title || ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "20px", sm: "36px" },
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              {content?.subTitle || ""}
            </Typography>
          </Grid>
          <Typography
            component="li"
            sx={{
              padding: "10px 0",
              fontSize: { xs: "14px", sm: "18px" },
              color: "#000",
              listStyle: "none",
              "::before": {
                content: '"♦"',
                color: "#006CB5",
                paddingRight: "20px",
              },
            }}
          >
            {content?.listItem1 || ""}
          </Typography>
          <Typography
            component="li"
            sx={{
              padding: "10px 0",
              fontSize: { xs: "14px", sm: "18px" },
              color: "#000",
              listStyle: "none",
              "::before": {
                content: '"♦"',
                color: "#006CB5",
                paddingRight: "20px",
              },
            }}
          >
            {content?.listItem2 || ""}
          </Typography>

          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "15%",
              width: "20px",
              height: "70%",
              background: "#fff",
              transform: "translate(50%,0)",
            }}
          />
        </Grid>
      </Grid>

      <Grid
        container
        item
        xs={content?.imgCol?.xs}
        sm={content?.imgCol?.sm}
        md={content?.imgCol?.md}
        lg={content?.imgCol?.lg}
        xl={content?.imgCol?.xl}
        sx={{
          position: "relative",
          height: "550px",
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Image
          fill
          src={exterior2}
          style={{ objectFit: "cover" }}
          alt="location map"
          sizes="100vw"
        />
      </Grid> */}
      <Grid item xs={12} />
    </Grid>
  );
}
Overview.propTypes = {
  content: PropTypes.object.isRequired,
};

function PriceDetails({ content, setOpenEnquiry }) {
  return (
    <>
      <About />
      <Grid
        container
        item
        xs={content?.containerCol?.xs}
        sm={content?.containerCol?.sm}
        md={content?.containerCol?.md}
        lg={content?.containerCol?.lg}
        xl={content?.containerCol?.xl}
        sx={{
          background:
            "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(/testImages1/AllianceSiruseri_Image-05.jpg), lightgray 50% / cover no-repeat",
          backgroundSize: "cover",
          padding: "50px 0",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <Typography
            component="h1"
            sx={{
              padding: "30px 0 10px 0",
              fontSize: { xs: "14px", sm: "20px" },
              fontWeight: "bolder",
              color: "#F9B800",
            }}
          >
            {content?.title || ""}
          </Typography> */}
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h1"
            sx={{
              padding: "10px 0 10px 0",
              fontSize: { xs: "14px", sm: "30px" },
              textAlign: "center",
              letterSpacing: "0",
              marginBottom: "5px",
              fontWeight: "800",
              color: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {content?.subTitle || ""}

            <Box
              sx={{
                backgroundColor: "#fff",

                height: "4px",
                width: "100px",
                marginTop: "5px",
              }}
            />
          </Typography>
        </Grid>
        <Grid container item xs={11} sm={11} sx={{ paddingTop: "50px" }}>
          <TableContainer component={Paper} sx={{ borderRadius: "14px" }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      background: "#202b60",
                      fontSize: { xs: "14px", sm: "16px" },
                      padding: "10px 0",
                      color: "#fff",
                    }}
                    align="center"
                  >
                    Type
                  </TableCell>
                  <TableCell
                    sx={{
                      background: "#202b60",
                      fontSize: { xs: "14px", sm: "16px" },
                      padding: "10px 0",
                      color: "#fff",
                    }}
                    align="center"
                  >
                    Rera Carpet Area
                  </TableCell>
                  <TableCell
                    sx={{
                      background: "#202b60",
                      fontSize: { xs: "14px", sm: "16px" },
                      padding: "10px 0",
                      color: "#fff",
                    }}
                    align="center"
                  >
                    Price
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(content?.tableData || []).map((item) => (
                  <TableRow
                    key={item?.unitType}
                    sx={{
                      "&:last-child td, &:last-child th": { borderBottom: 0 },
                    }}
                  >
                    <TableCell
                      sx={{
                        fontSize: { xs: "14px" },
                      }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {item?.unitType || ""}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: { xs: "14px" },
                      }}
                    >
                      {item?.price || ""}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => setOpenEnquiry(true)}
                        sx={{
                          color: "#000000",

                          textTransform: "none",
                          padding: "0px",
                          borderRadius: "0px",
                          fontSize: { xs: "16px" },
                          ":hover": {
                            borderBottom: "1px solid",
                          },
                        }}
                      >
                        {item?.enquire || ""}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
PriceDetails.propTypes = {
  content: PropTypes.object.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};
function About() {
  return (
    <Grid container justifyContent="center" alignContent="center" xs={12}>
      <Typography
        component="h1"
        sx={{
          padding: "10px 0 10px 0",
          fontSize: { xs: "30px", sm: "30px" },
          textAlign: "center",
          letterSpacing: "0",
          marginBottom: "5px",
          fontWeight: "800",
          color: "#1e6598",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        Siddha Sky Life.
        <Box
          sx={{
            backgroundColor: "#46467b",

            height: "4px",
            width: "100px",
            marginTop: "5px",
          }}
        />
      </Typography>
      <Typography
        component="p"
        sx={{
          lineHeight: { xs: "25px", md: "34px" },
          margin: { xs: "2rem 1rem", md: "1rem 0px" },
          padding: { xs: "0px 5px", md: "0px 4rem" },
          textAlign: "center",
        }}
      >
        Welcome to the rooftop skywalk of Siddha Sky, Wadala built 400 ft above
        the ground. Discover the privilege of infinite with over 25+ amenities
        on the rooftop, ready to entertain and rejuvenate you at any given time.
        Witness the gorgeous horizon of the cityscape while sipping your
        favorite drink in the Sky bar and feel privileged forever. Come, live
        above the ordinary. Experience these smartly designed 2 and 3 bed
        residences. Come and explore this iconic masterpiece that will fill your
        life with happiness.
      </Typography>
    </Grid>
  );
}

function ProjectHighlights({ content }) {
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      sx={{
        background: `url(/testImages1/features_bg.png)`,
        backgroundSize: "cover",
        padding: { xs: "50px 0", sm: "100px 0 30px 0" },
      }}
    >
      <Grid
        container
        item
        xs={content?.containerCol?.xs}
        sm={content?.containerCol?.sm}
        md={content?.containerCol?.md}
        lg={content?.containerCol?.lg}
        xl={content?.containerCol?.xl}
      >
        <Grid
          container
          item
          xs={content?.imgCol?.xs}
          sm={content?.imgCol?.sm}
          md={content?.imgCol?.md}
          lg={content?.imgCol?.lg}
          xl={content?.imgCol?.xl}
          sx={{
            position: "relative",
            margin: "100px 0",
            justifyContent: "flex-end",
            paddingRight: { xs: "0", sm: "100px" },
          }}
        >
          <Box
            sx={{
              background: "rgba(249, 184, 0, 0.2)",
              aspectRatio: "1/1",
              height: { xs: "245px", sm: "550px" },
              transform: "rotate(7.25deg)",
              borderRadius: "10px",
            }}
          />
          <Box
            sx={{
              background: "#F9B800",
              aspectRatio: "1/1",
              height: { xs: "245px", sm: "550px" },
              transform: "rotate(-7.25deg)",
              position: "absolute",
              top: 0,
              borderRadius: "10px",
            }}
          />
          <Box
            sx={{
              background: "#F9B800",
              aspectRatio: "1/1",
              height: { xs: "225px", sm: "530px" },
              position: "absolute",
              top: 0,
              // border: "10px solid #ffffff",
              borderRadius: "10px",
            }}
          >
            <Image
              fill
              src={projectHighlightsImg}
              style={{ objectFit: "cover" }}
              alt="landingpage"
              sizes="100vw"
            />
          </Box>
        </Grid>
        <Grid
          container
          item
          xs={content?.highlightsCol?.xs}
          sm={content?.highlightsCol?.sm}
          md={content?.highlightsCol?.md}
          lg={content?.highlightsCol?.lg}
          xl={content?.highlightsCol?.xl}
          sx={{
            alignContent: "flex-start",
          }}
        >
          <Grid item xs={12}>
            <Typography
              component="h1"
              sx={{
                padding: "30px 0 10px 0",
                fontSize: { xs: "14px", sm: "20px" },
                fontWeight: "bolder",
                color: "#F9B800",
              }}
            >
              {content?.title || ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "20px", sm: "36px" },
                fontWeight: "bold",
                color: "#000000",
              }}
            >
              {content?.subTitle || ""}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box component="ul" sx={{ listStyle: "none", padding: "0" }}>
              {(content?.highLights || [])?.map((hl) => (
                <Typography
                  key={hl}
                  component="li"
                  sx={{
                    fontSize: { xs: "14px", sm: "20px" },
                    color: "#000000",
                    paddingBottom: "40px",
                    ":before": {
                      content: '"✓"',
                      color: "#F9B800",
                      paddingRight: "10px",
                    },
                  }}
                >
                  {hl || ""}
                </Typography>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
ProjectHighlights.propTypes = {
  content: PropTypes.object.isRequired,
};
function Amenties({ content }) {
  const amentiesImg = {
    kidLogo,
    swimmingLogo,
    hallLogo,
    dramsLogo,
    playingLogo,
    gymLogo,
    stepsLogo,
    jaccussiLogo,
  };
  return (
    <Grid
      container
      item
      xs={content?.containerCol?.xs}
      sm={content?.containerCol?.sm}
      md={content?.containerCol?.md}
      lg={content?.containerCol?.lg}
      xl={content?.containerCol?.xl}
      sx={{
        padding: { xs: "50px 0", sm: "20px 0 0px 0" },
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            padding: "10px 0 10px 0",
            fontSize: { xs: "30px", sm: "30px" },

            textAlign: "center",
            letterSpacing: "0",
            marginBottom: "5px",
            fontWeight: "800",
            color: "#1e6598",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          Amenities
          <Box
            sx={{
              backgroundColor: "#46467b",

              height: "4px",
              width: "100px",
              marginTop: "5px",
            }}
          />
        </Typography>
      </Grid>

      {/* <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "20px", sm: "36px" },
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {content?.subTitle || ""}
        </Typography>
      </Grid> */}
      <Grid container item sx={{ margin: { md: "50px 4rem", xs: "10px 5px" } }}>
        <Grid container item sx={{ height: "fit-content" }}>
          {(content?.amenities || [])?.map((item) => (
            // <Grid
            //   container
            //   item
            //   key={item?.title}
            //   xs={12}
            //   sx={{ margin: { xs: "10px", sm: "40px" } }}
            // >
            //   <Grid
            //     item
            //     xs={3}
            //     sm={2}
            //     sx={{
            //       background: "#F9B800",
            //       aspectRatio: "1/1",
            //       borderRadius: { xs: "17px 5px", sm: "21px 8px" },
            //       display: "flex",
            //       justifyContent: "center",
            //       alignItems: "center",
            //       padding: { xs: "10px", sm: "20px" },
            //     }}
            //   >
            //     <Box
            //       sx={{
            //         background: `url(${item?.img})`,
            //         backgroundSize: "100% 100%",
            //         backgroundRepeat: "no-repeat",
            //         backgroundPosition: "center",
            //         width: "100%",
            //         height: "100%",
            //         // margin: "15px",
            //       }}
            //     />
            //   </Grid>
            //   <Grid
            //     container
            //     item
            //     xs={9}
            //     sm={10}
            //     sx={{ paddingLeft: { xs: "10px", sm: "20px" } }}
            //   >
            //     <Grid item xs={12}>
            //       <Typography
            //         component="h1"
            //         sx={{
            //           fontSize: { xs: "14px", sm: "20px" },
            //           fontWeight: "bold",
            //           color: "#000000",
            //         }}
            //       >
            //         {item?.title || ""}
            //       </Typography>
            //     </Grid>
            //     <Grid item xs={12} sx={{ display: { xs: "none", sm: "flex" } }}>
            //       <Typography
            //         component="h1"
            //         sx={{
            //           fontSize: "14px",
            //           color: "#000000",
            //         }}
            //       >
            //         {item?.description || ""}
            //       </Typography>
            //     </Grid>
            //   </Grid>
            // </Grid>
            <Grid
              item
              xs={6}
              md={3}
              sx={{
                padding: { xs: "20px 0px" },
                display: "flex",
                justifyContent: { xs: "space-between", md: "center" },
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  width: "100px",
                  height: "100px",

                  position: "relative",
                }}
              >
                <Image src={amentiesImg[item?.img]} fill />
              </Box>
              <Typography
                component="p"
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  lineHeight: "23px",
                  color: "#333333",
                  marginTop: "15px",
                  letterSpacing: "1px",
                  textAlign: "center",
                }}
              >
                {item?.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
        {/* <Grid
          container
          item
          xs={content?.imgCol?.xs}
          sm={content?.imgCol?.sm}
          md={content?.imgCol?.md}
          lg={content?.imgCol?.lg}
          xl={content?.imgCol?.xl}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <Image
            src={trisha}
            style={{ objectFit: "cover" }}
            alt="trisha"
            sizes="100vw"
          />
        </Grid> */}
        {/* <Grid
          container
          item
          xs={content?.contentCol?.xs}
          sm={content?.contentCol?.sm}
          md={content?.contentCol?.md}
          lg={content?.contentCol?.lg}
          xl={content?.contentCol?.xl}
          sx={{ height: "fit-content" }}
        >
          {(content?.amenities?.slice(4, 8) || [])?.map((item) => (
            <Grid
              container
              item
              key={item?.title}
              xs={12}
              sx={{ margin: { xs: "10px", sm: "40px" } }}
            >
              <Grid
                item
                xs={3}
                sm={2}
                sx={{
                  background: "#F9B800",
                  aspectRatio: "1/1",
                  borderRadius: { xs: "17px 5px", sm: "21px 8px" },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: { xs: "10px", sm: "20px" },
                }}
              >
                <Box
                  sx={{
                    background: `url(${item?.img})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Grid>
              <Grid
                container
                item
                xs={9}
                sm={10}
                sx={{ paddingLeft: { xs: "10px", sm: "20px" } }}
              >
                <Grid item xs={12}>
                  <Typography
                    component="h1"
                    sx={{
                      fontSize: { xs: "14px", sm: "20px" },
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    {item?.title || ""}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: { xs: "none", sm: "flex" } }}>
                  <Typography
                    component="h1"
                    sx={{
                      fontSize: "14px",
                      color: "#000000",
                    }}
                  >
                    {item?.description || ""}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid> */}
      </Grid>
      {/* <Grid
        container
        item
        xs={content?.imgCol?.xs}
        sm={content?.imgCol?.sm}
        md={content?.imgCol?.md}
        lg={content?.imgCol?.lg}
        xl={content?.imgCol?.xl}
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "relative",
          width: "100%",
          height: { xs: "500px", sm: "400px" },
        }}
      >
        <Image
          fill
          src={trishaXs}
          style={{ objectFit: "cover" }}
          alt="trisha"
          sizes="100vw"
        />
      </Grid> */}
      <Typography
        component="p"
        sx={{ textAlign: "center", color: "#202b60", fontSize: "19px" }}
      >
        And Many more
      </Typography>
    </Grid>
  );
}
Amenties.propTypes = {
  content: PropTypes.object.isRequired,
};

function Gallery({ content }) {
  const [selectedImgType, setSelectedImgType] = useState([0]);
  const sliderRef = useRef();

  const [currentExpIdx, setCurrentExpIdx] = useState(0);

  const [galleryImgList, setGalleryImgList] = useState([]);

  const exteriorImg = [exterior, exterior1, exterior2, exterior3, exterior4];
  const interiorImg = [interior, interior1, interior2, interior3];
  const roofTopImg = [roofTop, roofTop3, roofTop4, roofTop5];
  const towerToTowerImg = [
    towerToTower,
    towerToTower1,
    towerToTower2,
    towerToTower3,
    towerToTower4,
  ];

  useEffect(() => {
    if (selectedImgType.includes(1)) {
      setGalleryImgList(exteriorImg);
    } else if (selectedImgType.includes(2)) {
      setGalleryImgList(interiorImg);
    } else if (selectedImgType.includes(3)) {
      setGalleryImgList(towerToTowerImg);
    } else if (selectedImgType.includes(4)) {
      setGalleryImgList(roofTopImg);
    } else {
      const allImg = [
        ...exteriorImg,
        ...interiorImg,
        ...roofTopImg,
        ...towerToTowerImg,
      ];
      setGalleryImgList(allImg);
    }
  }, [selectedImgType]);
  return (
    <Grid
      container
      item
      xs={content?.containerCol?.xs}
      sm={content?.containerCol?.sm}
      md={content?.containerCol?.md}
      lg={content?.containerCol?.lg}
      xl={content?.containerCol?.xl}
      sx={{
        padding: { xs: "50px 0 100px 0", sm: "100px 0 30px 0" },
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            padding: "10px 0 10px 0",
            fontSize: { xs: "30px", sm: "30px" },

            textAlign: "center",
            letterSpacing: "0",
            marginBottom: "5px",
            fontWeight: "800",
            color: "#1e6598",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {content?.title || ""}
          <Box
            sx={{
              backgroundColor: "#46467b",

              height: "4px",
              width: "100px",
              marginTop: "5px",
            }}
          />
        </Typography>
      </Grid>

      <Grid
        container
        item
        xs={content?.tabCol?.xs}
        sm={content?.tabCol?.sm}
        md={content?.tabCol?.md}
        lg={content?.tabCol?.lg}
        xl={content?.tabCol?.xl}
        sx={{
          marginTop: "30px",

          borderRadius: "14px",
          padding: "10px 20px",
          justifyContent: { xs: "space-evenly", sm: "center" },
          alignItems: "center",
        }}
      >
        {(content?.tabNames || [])?.map((item) => (
          <Button
            key={item?.id}
            onClick={() => setSelectedImgType([item?.id])}
            sx={{
              height: { xs: "40px", sm: "2.5rem" },
              margin: { xs: "3px 0", sm: 0 },
              background: selectedImgType?.includes(item?.id)
                ? "#202b60"
                : "#fff",
              textTransform: "uppercase",
              color: selectedImgType?.includes(item?.id)
                ? "#a9dcf4"
                : "#000000",
              fontSize: { xs: "14px", sm: "18px" },
              padding: { xs: "7px 10px", sm: "10px 30px" },

              boxShadow: "0px 0px 0px 0px black",
              ":hover": {
                background: selectedImgType?.includes(item?.id)
                  ? "#202b60"
                  : "#fff",
              },
              borderRadius: "0px",
            }}
          >
            {item?.name || ""}
          </Button>
        ))}
      </Grid>
      <Grid
        container
        item
        xs={content?.sliderCol?.xs}
        sm={content?.sliderCol?.sm}
        md={content?.sliderCol?.md}
        lg={content?.sliderCol?.lg}
        xl={content?.sliderCol?.xl}
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: "30px", position: "relative" }}
      >
        <Grid
          item
          xs={1}
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            height: "100%",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Button
            onClick={() => sliderRef?.current?.slidePrev()}
            disabled={currentExpIdx === 0}
            sx={{
              background: "#fff!important",
              color: currentExpIdx === 0 ? "grey" : "#000000",
              boxShadow: "none !important",
              borderRadius: "50% !important",
              height: "80px",
              aspectRatio: "1/1",
              border: "1px solid #000000",
            }}
            variant="contained"
          >
            <ArrowBackIosRoundedIcon sx={{ fontSize: "50px" }} />
          </Button>
        </Grid>
        <Grid
          container
          item
          xs={11}
          sm={10}
          sx={{
            height: { xs: "250px", sm: "600px" },
          }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            onSlideChange={(swiper) => {
              const currIdx = swiper.activeIndex;
              setCurrentExpIdx(currIdx);
            }}
            onSwiper={(sw) => {
              sliderRef.current = sw;
            }}
            className="mySwiper"
            style={{ width: "100%", height: "100%" }}
          >
            {(galleryImgList || []).map((item, index) => (
              <SwiperSlide
                style={{ width: "100%", height: "100%" }}
                key={index}
              >
                <Grid
                  item
                  xs={12}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "20px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    fill
                    src={item}
                    // style={{ objectFit: "cover" }}
                    sizes="100vw"
                    alt="location"
                  />
                  <Grid
                    container
                    item
                    xs={12}
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      justifyContent: "space-between",
                      display: { xs: "flex", sm: "none" },
                    }}
                  >
                    <Grid
                      item
                      xs={1}
                      display="flex"
                      justifyContent="flex-start"
                      alignItems="center"
                      sx={{
                        height: "100%",
                      }}
                    >
                      <Button
                        onClick={() => sliderRef?.current?.slidePrev()}
                        disabled={currentExpIdx === 0}
                        sx={{
                          background: "#fff !important",
                          color: currentExpIdx === 0 ? "grey" : "#000000",
                          boxShadow: "none !important",
                          borderRadius: "50% !important",
                          height: "60px",
                          width: "40px",
                          border: "1px solid #000000",
                        }}
                        variant="contained"
                      >
                        <ArrowBackIosRoundedIcon sx={{ fontSize: "20px" }} />
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      sx={{
                        height: "100%",
                      }}
                    >
                      <Button
                        onClick={() => sliderRef?.current?.slideNext()}
                        disabled={currentExpIdx === galleryImgList.length - 1}
                        style={{
                          background: "#fff",
                          color:
                            currentExpIdx === galleryImgList.length - 1
                              ? "grey"
                              : "#000000",
                          boxShadow: "none",
                          height: "60px",
                          width: "40px",
                          borderRadius: "50%",
                          border: "1px solid #000000",
                        }}
                        variant="contained"
                      >
                        <ArrowForwardIosRoundedIcon sx={{ fontSize: "20px" }} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid
          item
          xs={1}
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            height: "100%",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Button
            onClick={() => sliderRef?.current?.slideNext()}
            disabled={currentExpIdx === galleryImgList.length - 1}
            style={{
              background: "#fff",
              color:
                currentExpIdx === galleryImgList.length - 1
                  ? "grey"
                  : "#000000",
              boxShadow: "none",
              height: "80px",
              borderRadius: "50%",
              aspectRatio: "1/1",
              border: "1px solid #000000",
            }}
            variant="contained"
          >
            <ArrowForwardIosRoundedIcon sx={{ fontSize: "50px" }} />
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
Gallery.propTypes = {
  content: PropTypes.object.isRequired,
};

const facilitiesList = (data) => {
  return (
    <>
      {(data || []).map((item) => (
        <Grid
          key={item}
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          padding=" 0px 15px "
          backgroundColor="#f7f7f7"
          boxShadow="0 8px 8px -6px rgba(0, 0, 0, 0.3)"
          transition="transform 0.3s ease-in-out"
        >
          <Typography
            variant="p"
            sx={{
              color: "#333333",
              fontSize: { xs: "12px", sm: "16px" },
              padding: "12px 0px",
              fontWeight: "300",
              lineHeight: "24px",
              transition: "transform 0.3s ease-in-out",
            }}
          >
            {item || ""}
          </Typography>
          {/* <Typography
            variant="p"
            sx={{
              color: "#000000",
              fontSize: { xs: "12px", sm: "18px" },
            }}
          >
            {item?.time || ""}
          </Typography> */}
        </Grid>
      ))}
    </>
  );
};

function LocationAdvantages({ content }) {
  const [isFacilitiesEnabled, setIsFacilitiesEnabled] = useState(true);
  const [isOpenedFacilities, setIsOpenedFacilities] = useState([]);

  return (
    <>
      <Grid
        container
        item
        xs={content?.containerCol?.xs}
        sm={content?.containerCol?.sm}
        md={content?.containerCol?.md}
        lg={content?.containerCol?.lg}
        xl={content?.containerCol?.xl}
        sx={{
          padding: { xs: "5px 0", sm: "10px 0 30px 0" },
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography
            component="h1"
            sx={{
              padding: "10px 0 10px 0",
              fontSize: { xs: "30px", sm: "30px" },
              textAlign: "center",
              letterSpacing: "0",
              marginBottom: "5px",
              fontWeight: "800",
              color: "#1e6598",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {content?.title || ""}
            <Box
              sx={{
                backgroundColor: "#46467b",

                height: "4px",
                width: "100px",
                marginTop: "5px",
              }}
            />
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Typography
            sx={{
              textAlign: "center",
              lineHeight: { xs: "25px", md: "34px" },
              margin: { xs: "2rem 1rem", md: "1rem 0px" },
              padding: { xs: "0px 5px", md: "0px 4rem" },
            }}
            component="p"
          >
            Wadala is emerging as the new hotspot for investment and development
            because of its location. It enjoys superb proximity to business hubs
            and infrastructural projects. The project is centrally located in
            Wadala and is surrounded by schools, commercial places, healthcare
            facilities, and entertainment centres. It is also accessible from
            business hubs like BKC, Parel, and Fort.
          </Typography>
        </Grid>
        {/* <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "20px", sm: "36px" },
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {content?.subTitle || ""}
        </Typography>
      </Grid> */}
        <Grid
          container
          item
          xs={content?.subContainerCol?.xs}
          sm={content?.subContainerCol?.sm}
          md={content?.subContainerCol?.md}
          lg={content?.subContainerCol?.lg}
          xl={content?.subContainerCol?.xl}
          sx={{
            justifyContent: "center",
            marginTop: "50px",
            alignItems: "center",
          }}
        >
          <Grid
            container
            item
            xs={content?.facilitiesCol?.xs}
            sm={content?.facilitiesCol?.sm}
            md={content?.facilitiesCol?.md}
            lg={content?.facilitiesCol?.lg}
            xl={content?.facilitiesCol?.xl}
            sx={{
              justifyContent: "center",
              height: "fit-content",
              paddingTop: { xs: "30px", sm: 0 },
            }}
          >
            {(content?.facilities || []).map((item) => (
              <Grid
                container
                key={item?.facility}
                item
                xs={12}
                sm={10}
                onClick={() => {
                  if (
                    isFacilitiesEnabled &&
                    isOpenedFacilities[0] === item?.id
                  ) {
                    setIsOpenedFacilities([]);
                  } else {
                    setIsOpenedFacilities([item?.id]);
                  }
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                  // padding: { xs: "5px 10px", sm: "5px 10px" },
                  cursor: "pointer",

                  height: "fit-content",
                  background: "#202b60",
                  marginBottom: "15px",
                }}
              >
                <Grid
                  item
                  xs={2}
                  ms={1}
                  sx={{
                    display: "flex",
                    color: "#fff",
                    fontWeight: "600",
                  }}
                  justifyContent="start"
                  alignItems="center"
                  padding="10px 0px 10px 10px"
                >
                  <AddIcon
                    sx={{
                      fontSize: {
                        xs: "24px",
                        sm: "30px",
                        transform: isOpenedFacilities?.includes(item.id)
                          ? "rotate(-45deg)"
                          : "none",
                        transition: "transform 0.3s ease-in-out",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={10} ms={11} display="flex" alignItems="center">
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#fff",

                      fontSize: { xs: "14px", sm: "16px" },
                      fontWeight: "600",
                      textTransform: "uppercase",
                    }}
                  >
                    {item?.facility || ""}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sx={{
                    display: isOpenedFacilities?.includes(item.id)
                      ? "flex"
                      : "none",
                    flexDirection: "column",
                    color: "#fff",
                    transition: "transform 0.3s ease-in-out",
                  }}
                >
                  {facilitiesList(item?.listAndTime)}
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid
            container
            item
            xs={content?.imgCol?.xs}
            sm={content?.imgCol?.sm}
            md={content?.imgCol?.md}
            lg={content?.imgCol?.lg}
            xl={content?.imgCol?.xl}
            sx={{
              justifyContent: "center",
              position: "relative",
              height: { xs: "180px", sm: "400px" },
              borderRadius: "15px",
              overflow: "hidden",
            }}
          >
            <Image
              fill
              src={locationMap}
              style={{ objectFit: "cover" }}
              alt="location map"
              sizes="100vw"
            />
          </Grid>
        </Grid>
      </Grid>
      <AboutUs />
    </>
  );
}
LocationAdvantages.propTypes = {
  content: PropTypes.object.isRequired,
};

function WalkThrough({ content }) {
  const [selectedImgType, setSelectedImgType] = useState([0]);
  const [selectedVideo, setSlectedVideo] = useState(
    "https://www.youtube.com/embed/h3JL0rrAOoo"
  );
  useEffect(() => {
    console.log(selectedImgType);

    if (selectedImgType[0] === 0) {
      setSlectedVideo("https://www.youtube.com/embed/h3JL0rrAOoo");
    } else if (selectedImgType[0] === 1) {
      setSlectedVideo("https://www.youtube.com/embed/H8Tuegqr1LQ");
    } else if (selectedImgType[0] === 2) {
      setSlectedVideo("https://www.youtube.com/embed/D6z4W1LVBEM");
    } else if (selectedImgType[0] === 3) {
      setSlectedVideo("https://www.youtube.com/embed/9oFrIOwZKU0");
    } else if (selectedImgType[0] === 4) {
      setSlectedVideo("https://www.youtube.com/embed/sWzVQqlFjVo");
    } else if (selectedImgType[0] === 5) {
      setSlectedVideo("https://www.youtube.com/embed/PfppmW7bMxU");
    } else {
      setSlectedVideo("https://www.youtube.com/embed/h3JL0rrAOoo");
    }
  }, [selectedImgType]);

  return (
    <Grid
      container
      item
      xs={content?.containerCol?.xs}
      sm={content?.containerCol?.sm}
      md={content?.containerCol?.md}
      lg={content?.containerCol?.lg}
      xl={content?.containerCol?.xl}
      sx={{
        backgroundSize: "cover",
        padding: { xs: "50px 0 100px 0", sm: "100px 0" },
        justifyContent: "center",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          component="h1"
          sx={{
            padding: "10px 0 10px 0",
            fontSize: { xs: "30px", sm: "30px" },
            textAlign: "center",
            letterSpacing: "0",
            marginBottom: "5px",
            fontWeight: "800",
            color: "#1e6598",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {content?.title || ""}
          <Box
            sx={{
              backgroundColor: "#46467b",

              height: "4px",
              width: "100px",
              marginTop: "5px",
            }}
          />
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={content?.tabCol?.xs}
        sm={content?.tabCol?.sm}
        md={content?.tabCol?.md}
        lg={content?.tabCol?.lg}
        xl={content?.tabCol?.xl}
        sx={{
          marginTop: "30px",

          borderRadius: "14px",
          padding: "10px 20px",
          justifyContent: { xs: "space-evenly", sm: "center" },
          alignItems: "center",
        }}
      >
        {(content?.tabNames || [])?.map((item) => (
          <Button
            key={item?.id}
            onClick={() => setSelectedImgType([item?.id])}
            sx={{
              height: { xs: "40px", sm: "2.5rem" },
              margin: { xs: "3px 0", sm: 0 },
              background: selectedImgType?.includes(item?.id)
                ? "#202b60"
                : "#fff",
              textTransform: "uppercase",
              color: selectedImgType?.includes(item?.id)
                ? "#a9dcf4"
                : "#000000",
              fontSize: { xs: "14px", sm: "18px" },
              padding: { xs: "7px 10px", sm: "10px 30px" },

              boxShadow: "0px 0px 0px 0px black",
              ":hover": {
                background: selectedImgType?.includes(item?.id)
                  ? "#202b60"
                  : "#fff",
              },
              borderRadius: "0px",
            }}
          >
            {item?.name || ""}
          </Button>
        ))}
      </Grid>
      <Grid
        container
        item
        xs={content?.videoCol?.xs}
        sm={content?.videoCol?.sm}
        md={content?.videoCol?.md}
        lg={content?.videoCol?.lg}
        xl={content?.videoCol?.xl}
        sx={{
          justifyContent: "center",
          marginTop: "50px",
          position: "relative",
          height: { xs: "180px", sm: "650px" },
          borderRadius: { xs: "16px", sm: "48px" },
          overflow: "hidden",
        }}
      >
        <iframe
          width="100%"
          height="100%"
          src={selectedVideo}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        />
        {/* <Image
          fill
          src={gal4}
          style={{ objectFit: "cover" }}
          alt="location map"
          sizes="100vw"
        /> */}
        {/* <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.55)",
            position: "absolute",
          }}
        >
          <Box
            sx={{
              border: "1px solid rgba(255, 255, 255, 0.7)",
              borderRadius: "50%",
            }}
          >
            <Button
              sx={{
                background: "#ffffff",
                color: "#000000",
                height: { xs: "65px", sm: "110px" },
                borderRadius: "50%",
                aspectRatio: "1/1",
                margin: { xs: "20px", sm: "34px" },
                ":hover": {
                  background: "#ffffff",
                },
              }}
              variant="contained"
            >
              <PlayArrowRoundedIcon
                sx={{ fontSize: { xs: "40px", sm: "80px" } }}
              />
            </Button>
          </Box>
        </Box> */}
      </Grid>
    </Grid>
  );
}
WalkThrough.propTypes = {
  content: PropTypes.object.isRequired,
};

function Downloads({ content, setOpenEnquiry }) {
  return <AboutUs />;
}
Downloads.propTypes = {
  content: PropTypes.object.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};
function AboutUs() {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{ backgroundColor: "#f1f1f1", padding: "50px 0px" }}
      justifyContent="center"
    >
      <Grid item xs={12}>
        <Typography
          component="h1"
          sx={{
            padding: "10px 0 10px 0",
            fontSize: { xs: "30px", sm: "30px" },

            textAlign: "center",
            letterSpacing: "0",
            marginBottom: "5px",
            fontWeight: "800",
            color: "#1e6598",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          About Us
          <Box
            sx={{
              backgroundColor: "#46467b",

              height: "4px",
              width: "100px",
              marginTop: "5px",
            }}
          />
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0px ",
          borderRight: "2px solid #46467b",
        }}
      >
        <Grid item xs={12} display="flex" justifyContent="center" height="50px">
          <Grid
            container
            item
            xs={4}
            sx={{ position: "relative", height: "50px" }}
          >
            <Image fill src={siddhaLogo} />
          </Grid>
        </Grid>
        <Typography
          component="p"
          sx={{
            lineHeight: "23px",
            padding: "25px 34px",
            textAlign: "justify",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "1px",
            color: "#333333",
          }}
        >
          Since its inception in 1986, Siddha has been crafting residential and
          commercial spaces with a difference, to make good living affordable in
          4 cities across India, namely Kolkata, Mumbai, Jaipur and Bengaluru.
          Under the leadership of Group Chairman Shri Chandra Prakash Jain and
          Group Managing Director Shri Sanjay Jain, Siddha has won 25+
          prestigious awards over the years. They have been the pioneers of
          Rooftop Skywalks in India.
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        md={5}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "50px 0px ",
        }}
      >
        <Grid item xs={12} display="flex" justifyContent="center" height="50px">
          <Grid
            container
            item
            xs={4}
            sx={{ position: "relative", height: "50px" }}
          >
            <Image fill src={sejalLogo} />
          </Grid>
        </Grid>
        <Typography
          component="p"
          sx={{
            lineHeight: "23px",
            padding: "25px 34px",
            textAlign: "justify",
            fontSize: "14px",
            fontWeight: "700",
            letterSpacing: "1px",
            color: "#333333",
          }}
        >
          Sejal Realty was formed with the sole objective of changing the
          current landscape of Indian Infrastructure by focusing on the
          redevelopment of society and SRA projects to promote the conservation
          of built and natural heritage structures in Mumbai, which needed to be
          protected, nourished and maintained. With the foresight and strong
          vision of our Chairman, Managing Director and a team of dedicated
          professionals, the Group is poised to launch many more projects, with
          its commitment to 'Excellence', 'Innovation' and 'Passion' with trust.
        </Typography>
      </Grid>
      <Grid container xs={12} justifyContent="center">
        <Grid
          container
          item
          xs={2}
          sx={{ position: "relative", height: "70px", margin: "5px 0px " }}
        >
          <Image fill src={partnerShipLogo} sx={{ objectFit: "contain" }} />
        </Grid>
      </Grid>
    </Grid>
  );
}

function ContactDetails({ content }) {
  return (
    <Grid
      container
      item
      xs={content?.containerCol?.xs}
      sm={content?.containerCol?.sm}
      md={content?.containerCol?.md}
      lg={content?.containerCol?.lg}
      xl={content?.containerCol?.xl}
      sx={{
        background: "#000000",
        padding: { xs: "20px 10px 50px 10px", sm: "50px" },
      }}
    >
      <Grid container item xs={12} justifyContent="space-between">
        <Grid container item xs={12} sm={5}>
          <Grid
            item
            xs={3}
            sx={{
              position: "relative",
              height: { xs: "60px", sm: "100px" },
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Image
              fill
              src={wojLogo}
              style={{ objectFit: "cover" }}
              alt="location map"
              sizes="100vw"
            />
          </Grid>
          <Grid
            item
            xs={9}
            sm={8}
            display="flex"
            flexDirection="column"
            alignItems="flex-end"
            sx={{ paddingRight: { xs: 0, sm: "30px" } }}
          >
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "14px", sm: "24px" },
                fontWeight: "bolder",
                color: "#ffffff",
                borderBottom: "3px solid #ffffff",
                width: "fit-content",
              }}
            >
              {content?.title || ""}
            </Typography>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "14px", sm: "20px" },
                color: "#F9B800",
                paddingTop: "20px",
              }}
            >
              {content?.companyName || ""}
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: "40px" }}>
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "14px", sm: "20px" },
                color: "#E4E4E4",
              }}
            >
              {content?.address || ""}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={3}
          justifyContent="flex-end"
          alignContent="space-between"
        >
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent="flex-end"
            sx={{ padding: { xs: "20px 0", sm: 0 } }}
          >
            <EmailRoundedIcon
              sx={{ color: "#F9B800", paddingRight: "10px", fontSize: "30px" }}
            />
            <Typography
              component="p"
              sx={{
                fontSize: { xs: "14px", sm: "20px" },
                color: "#ffffff",
              }}
            >
              {content?.email || ""}
            </Typography>
          </Grid>
          <Button
            sx={{
              background: "#F9B800",
              color: "#000000",
              borderRadius: "9px",
              textTransform: "none",
              height: "fit-content",
              padding: "10px 30px",
              fontWeight: "bolder",
              fontSize: { xs: "14px", sm: "20px" },
              ":hover": {
                background: "#F9B800",
              },
            }}
            variant="contained"
          >
            <Typography
              component="a"
              target="_blank"
              href={content?.directionBtnUrl}
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#000000",
                textDecoration: "none",
                fontWeight: "bolder",
              }}
            >
              <NearMeRoundedIcon
                sx={{ fontSize: "30px", paddingRight: "10px" }}
              />
              {content?.directionBtn || ""}
            </Typography>
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ margin: "30px 0", height: { xs: "185px", sm: "300px" } }}
      >
        <iframe
          title="location"
          src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d7780.500587181455!2d80.202401!3d12.8270962!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3a525b2c2fa92a95%3A0x7513c77caf9ef2f0!2sUrbanrise%20The%20World%20of%20Joy%20SURVEY%20NO.117%2F2%20Siruseri%2C%20Tamil%20Nadu%20603103!3m2!1d12.8270962!2d80.202401!5e0!3m2!1sen!2sin!4v1690797014899!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowfullscreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </Grid>
    </Grid>
  );
}
ContactDetails.propTypes = {
  content: PropTypes.object.isRequired,
};

function Contact({ setOpenEnquiry }) {
  const [enquiryEnabled, setEnquiryEnabled] = useState(false);
  const [addFormData, { isLoading }] = useAddFormDataMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [userData, setUserData] = useState(EMPTY_USERDATA);
  const [isDirty, setIsDirty] = useState({
    userName: false,
    email: false,
    phoneNo: false,
  });
  const [errorMsgs, setErrorMsgs] = useState({
    userName: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (isDirty.email) {
      setErrorMsgs((m) => ({
        ...m,
        email: checkEmailErrors(userData.email),
      }));
    }
    if (isDirty.phoneNo) {
      setErrorMsgs((m) => ({
        ...m,
        phoneNo: checkPhNoErrors(userData.phoneNo),
      }));
    }
    if (isDirty.userName) {
      setErrorMsgs((m) => ({
        ...m,
        userName: checkUserNameErrors(userData.userName),
      }));
    }
  }, [isDirty, userData]);

  const resetData = () => {
    setUserData(EMPTY_USERDATA);
    setIsDirty(EMPTY_ISDIRTY);
    setErrorMsgs(EMPTY_ERRORMSGS);
  };

  const router = useRouter();

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    const pageQueryParams = router?.query;
    const utmParams = getUtmParams(pageQueryParams);

    addFormData({ ...(userData || {}), utmParams })
      .unwrap()
      .then(() => {
        resetData();
        // window.location.href = "/thanku";
      })
      .catch(() => {
        enqueueSnackbar({
          variant: "error",
          message: ERROR_TEXT.TOAST_SOMETHINGWENTWRONG,
        });
      });
  };
  return (
    <Grid
      container
      item
      xs={12}
      sm={6}
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        justifyContent: { xs: "space-between", md: "flex-end" },
        alignItems: "flex-end",
        padding: "0px 10px",
      }}
    >
      <Grid
        item
        xs={6}
        width="100%"
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        <Button
          onClick={() => window.open("tel: +91 9876543210")}
          sx={{
            width: "95%",
            height: { xs: "48px", sm: "70px" },
            background: "#003152",
            color: "#ffffff",
            fontSize: { xs: "14px", sm: "16px" },
            borderWidth: "3px 3px 0 3px",
            borderStyle: "solid",
            borderColor: "#ffffff",
            borderTopLeftRadius: { xs: "17px", sm: "29px" },
            borderTopRightRadius: { xs: "17px", sm: "29px" },
            marginRight: "20px",
            padding: "6px 6px",
            ":hover": {
              background: "#003152",
            },
          }}
          variant="contained"
        >
          <CallIcon
            sx={{
              paddingLeft: { xs: "5px", sm: "10px" },
              fontSize: { xs: "20px", sm: "30px" },
              fontWeight: "bolder",
            }}
          />{" "}
          <Typography
            component="span"
            sx={{
              paddingLeft: { xs: "5px", sm: "10px" },
              fontSize: { xs: "14px", sm: "24px" },
              fontWeight: "bolder",
            }}
          >
            CALL NOW
          </Typography>
        </Button>
      </Grid>
      <Grid container item xs={6} justifyContent="center" width="100%">
        <Button
          onClick={() => setEnquiryEnabled(!enquiryEnabled)}
          sx={{
            width: "95%",
            height: { xs: "48px", sm: "70px" },
            display: { xs: "none", sm: "flex" },
            justifyContent: "space-between",
            background: "#202b60",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: { xs: "14px", sm: "24px" },
            borderTopLeftRadius: { xs: "17px", sm: "29px" },
            borderTopRightRadius: { xs: "17px", sm: "29px" },
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: { xs: "0 10px", sm: "0 30px" },
            ":hover": {
              background: "#F9B800",
            },
          }}
          variant="contained"
        >
          ENQUIRE NOW{" "}
          {enquiryEnabled ? (
            <RemoveIcon
              sx={{ fontSize: { xs: "25px", sm: "30px" }, fontWeight: "bold" }}
            />
          ) : (
            <AddIcon
              sx={{ fontSize: { xs: "25px", sm: "30px" }, fontWeight: "bold" }}
            />
          )}
        </Button>
        <Button
          onClick={() => setOpenEnquiry(true)}
          sx={{
            width: "95%",
            height: "48px",
            display: { xs: "flex", sm: "none" },
            justifyContent: "center",
            background: "#202b60",
            color: "#fff",
            fontWeight: "bolder",
            fontSize: "14px",
            borderTopLeftRadius: "17px",
            borderTopRightRadius: "17px",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            padding: "0 10px",
            ":hover": {
              background: "#F9B800",
            },
          }}
          variant="contained"
        >
          ENQUIRE NOW
        </Button>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          sx={{
            height: enquiryEnabled ? "400px" : "0px",
            transition: "height 1s ease-in-out",
            background: "#ffffff",
            margin: "0 12px",
          }}
        >
          <Grid container item justifyContent="center" xs={12}>
            <Grid
              item
              xs={10}
              style={{
                margin: "30px 0 0 0",
              }}
            >
              <TextField
                type="text"
                id="outlined-basi01"
                value={userData.userName}
                error={!!errorMsgs.userName}
                helperText={errorMsgs?.userName || ""}
                onBlur={() => {
                  setIsDirty((d) => ({
                    ...d,
                    userName: true,
                  }));
                }}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    userName: e.target.value || "",
                  });
                }}
                placeholder="Name"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root .MuiInputBase-input": {
                    background: "rgba(0, 0, 0, 0.04)",
                    borderRadius: "9px",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                  },
                }}
                InputProps={{
                  sx: {
                    height: "50px",
                  },
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent="center" xs={12}>
            <Grid
              item
              xs={10}
              style={{
                margin: "10px 0 0 0",
              }}
            >
              <TextField
                type="text"
                id="outlined-basic02"
                value={userData.phoneNo}
                error={!!errorMsgs.phoneNo}
                helperText={errorMsgs?.phoneNo || ""}
                onBlur={() => {
                  setIsDirty((d) => ({
                    ...d,
                    phoneNo: true,
                  }));
                }}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    phoneNo: e.target.value || "",
                  });
                }}
                placeholder="Phone number"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root .MuiInputBase-input": {
                    background: "rgba(0, 0, 0, 0.04)",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                  },
                }}
                InputProps={{
                  sx: {
                    height: "50px",
                  },
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent="center" xs={12}>
            <Grid
              item
              xs={10}
              style={{
                margin: "10px 0 0 0",
              }}
            >
              <TextField
                type="email"
                id="outlined-basic03"
                value={userData.email}
                error={!!errorMsgs.email}
                helperText={errorMsgs?.email || ""}
                onBlur={() => {
                  setIsDirty((d) => ({
                    ...d,
                    email: true,
                  }));
                }}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    email: e.target.value || "",
                  });
                }}
                placeholder="Email"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root .MuiInputBase-input": {
                    background: "rgba(0, 0, 0, 0.04)",
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                  },
                }}
                InputProps={{
                  sx: {
                    height: "50px",
                  },
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={10} style={{ paddingTop: "20px" }}>
            <LoadingButton
              onClick={() => submitForm()}
              style={{
                width: "100%",
                height: "50px",
                background: "#F9B800",
                textTransform: "capitalize",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "18px",
              }}
              loading={isLoading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
Contact.propTypes = {
  setOpenEnquiry: PropTypes.func.isRequired,
};
function Footer() {
  return (
    <Grid
      container
      xs={12}
      sx={{ width: "100%", backgroundColor: "#202b60", padding: "20px 0" }}
    >
      {/* Button here */}

      <Grid item xs={12} sx={{ margin: "5px 0px" }}>
        <Typography
          component="p"
          sx={{ padding: "0px 90px", color: "#fff", textAlign: "center" }}
        >
          The project has been registered via MahaRERA Registration No.:
          P51900021027 | P51900021040 | P51900021044 | P51900021031 and is
          available on the website https://maharera.mahaonline.gov.in/ under
          registered projects.
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center", margin: "5px 0px" }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#81cece",
            color: "black",
            borderRadius: "15px",
          }}
        >
          Disclaimer
        </Button>
      </Grid>
      <Grid xs={12}>
        <Typography
          component="p"
          sx={{ color: "#fff", textAlign: "center", margin: "5px 0px" }}
        >
          Copyright © Siddha 2023. All rights reserved.
        </Typography>
      </Grid>
    </Grid>
  );
}

function EnquiryFormPopup({ openEnquiry, setOpenEnquiry }) {
  const [addFormData, { isLoading }] = useAddFormDataMutation();
  const { enqueueSnackbar } = useSnackbar();

  const [userData, setUserData] = useState(EMPTY_USERDATA);
  const [isDirty, setIsDirty] = useState({
    userName: false,
    email: false,
    phoneNo: false,
  });
  const [errorMsgs, setErrorMsgs] = useState({
    userName: "",
    email: "",
    phoneNo: "",
  });

  useEffect(() => {
    if (isDirty.email) {
      setErrorMsgs((m) => ({
        ...m,
        email: checkEmailErrors(userData.email),
      }));
    }
    if (isDirty.phoneNo) {
      setErrorMsgs((m) => ({
        ...m,
        phoneNo: checkPhNoErrors(userData.phoneNo),
      }));
    }
    if (isDirty.userName) {
      setErrorMsgs((m) => ({
        ...m,
        userName: checkUserNameErrors(userData.userName),
      }));
    }
  }, [isDirty, userData]);

  const resetData = () => {
    setUserData(EMPTY_USERDATA);
    setIsDirty(EMPTY_ISDIRTY);
    setErrorMsgs(EMPTY_ERRORMSGS);
  };

  const router = useRouter();

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    const pageQueryParams = router?.query;
    const utmParams = getUtmParams(pageQueryParams);

    addFormData({ ...(userData || {}), utmParams })
      .unwrap()
      .then(() => {
        resetData();
        // window.location.href = "/thanku";
      })
      .catch(() => {
        enqueueSnackbar({
          variant: "error",
          message: ERROR_TEXT.TOAST_SOMETHINGWENTWRONG,
        });
      });
  };

  const onClose = () => {
    setOpenEnquiry(false);
  };
  return (
    <Dialog
      open={openEnquiry}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        background: "rgba(0, 0, 0, 0.88)",
        height: "100vh",
        ".MuiDialog-paper": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: { xs: "17px", sm: "24px" },
          background: "black",
          maxWidth: { xs: "md", sm: "25%" },
          height: { md: "55%", xs: "100%" },
          width: "100%",
          "::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Grid container item xs={12} width="100%">
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ height: "15%", background: "#202b60", position: "relative" }}
        >
          <Typography
            component="h1"
            sx={{
              textAlign: "center",
              width: "100%",
              color: "#fff",
              fontSize: { xs: "14px", sm: "24px" },
              padding: { xs: "0 10px", sm: "0 30px" },
              fontWeight: "bolder",
            }}
          >
            ENQUIRE NOW
          </Typography>
          <CloseRoundedIcon
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 5,
              top: 5,
              fontSize: { xs: "25px", sm: "30px" },
              fontWeight: "bold",
              cursor: "pointer",
            }}
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          justifyContent="center"
          sx={{
            height: "85%",
            transition: "height 1s ease-in-out",
            background: "#ffffff",
          }}
        >
          <Grid container item justifyContent="center" xs={12}>
            <Grid
              item
              xs={10}
              style={{
                margin: "30px 0 0 0",
              }}
            >
              <TextField
                type="text"
                id="outlined-basi01"
                value={userData.userName}
                error={!!errorMsgs.userName}
                helperText={errorMsgs?.userName || ""}
                onBlur={() => {
                  setIsDirty((d) => ({
                    ...d,
                    userName: true,
                  }));
                }}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    userName: e.target.value || "",
                  });
                }}
                placeholder="Name"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root .MuiInputBase-input": {
                    background: "rgba(0, 0, 0, 0.04)",
                    borderRadius: "9px",
                    padding: { xs: "10px", sm: "12px 10px" },
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                  },
                }}
                InputProps={{
                  sx: {
                    height: { xs: "40px", sm: "50px" },
                  },
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent="center" xs={12}>
            <Grid
              item
              xs={10}
              style={{
                margin: "10px 0 0 0",
              }}
            >
              <TextField
                type="text"
                id="outlined-basic02"
                value={userData.phoneNo}
                error={!!errorMsgs.phoneNo}
                helperText={errorMsgs?.phoneNo || ""}
                onBlur={() => {
                  setIsDirty((d) => ({
                    ...d,
                    phoneNo: true,
                  }));
                }}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    phoneNo: e.target.value || "",
                  });
                }}
                placeholder="Phone number"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root .MuiInputBase-input": {
                    background: "rgba(0, 0, 0, 0.04)",
                    padding: { xs: "10px", sm: "12px 10px" },
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                  },
                }}
                InputProps={{
                  sx: {
                    height: { xs: "40px", sm: "50px" },
                  },
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container item justifyContent="center" xs={12}>
            <Grid
              item
              xs={10}
              style={{
                margin: "10px 0 0 0",
              }}
            >
              <TextField
                type="email"
                id="outlined-basic03"
                value={userData.email}
                error={!!errorMsgs.email}
                helperText={errorMsgs?.email || ""}
                onBlur={() => {
                  setIsDirty((d) => ({
                    ...d,
                    email: true,
                  }));
                }}
                onChange={(e) => {
                  setUserData({
                    ...userData,
                    email: e.target.value || "",
                  });
                }}
                placeholder="Email"
                sx={{
                  width: "100%",
                  "& .MuiOutlinedInput-root .MuiInputBase-input": {
                    background: "rgba(0, 0, 0, 0.04)",
                    padding: { xs: "10px", sm: "12px 10px" },
                  },
                  "& .MuiFormHelperText-root": {
                    fontSize: "12px",
                  },
                }}
                InputProps={{
                  sx: {
                    height: { xs: "40px", sm: "50px" },
                  },
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs={10} style={{ paddingTop: "20px" }}>
            <LoadingButton
              onClick={() => submitForm()}
              sx={{
                width: "100%",
                height: { xs: "40px", sm: "50px" },
                background: "#202b60",
                textTransform: "capitalize",
                color: "#fff",
                fontWeight: "bold",
                fontSize: { xs: "14px", sm: "18px" },
              }}
              loading={isLoading}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Dialog>
  );
}
function BannerImg() {
  return (
    <>
      <Grid
        container
        xs={12}
        sx={{
          position: "relative",
          width: "100%",
          height: "40rem",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Image
          fill
          src="https://siddhasky-mumbai.com/images/slider/banner1.jpg"
          alt="Cover Image"
          sizes="100vw"
        />
      </Grid>
      <Grid
        container
        xs={12}
        sx={{
          position: "relative",
          width: "100%",
          height: "40rem",
          display: { xs: "flex", md: "none" },
        }}
      >
        <Image
          fill
          src="https://siddhasky-mumbai.com/images/slider/mobile1.jpg"
          alt="Cover Image"
          sizes="100vw"
        />
      </Grid>
    </>
  );
}
EnquiryFormPopup.propTypes = {
  openEnquiry: PropTypes.bool.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};
