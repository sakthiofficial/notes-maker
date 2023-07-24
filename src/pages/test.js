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
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";
import DomainRoundedIcon from "@mui/icons-material/DomainRounded";
import NearMeRoundedIcon from "@mui/icons-material/NearMeRounded";
import AddIcon from "@mui/icons-material/Add";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import RemoveIcon from "@mui/icons-material/Remove";
import { useAddFormDataMutation } from "../reduxSlice/apiSlice";
import layoutData from "../layout.json";

import urbanriseLogo from "../../public/testImages/urbanrise_logo.png";
import lpImg from "../../public/testImages/db.jpg";
import lpImgXs from "../../public/testImages/lpImg_xs.png";
import wojLogo from "../../public/testImages/TWOJ_logo.png";
import trisha from "../../public/testImages/trisha.png";
import trishaXs from "../../public/testImages/trisha_xs.png";
import locationMap from "../../public/testImages/location_map.jpg";
import gal1 from "../../public/testImages/gal1.jpg";
import gal2 from "../../public/testImages/gal2.jpg";
import gal3 from "../../public/testImages/gal3.jpg";
import gal4 from "../../public/testImages/gal4.jpg";
import gal5 from "../../public/testImages/gal5.jpg";
import gal6 from "../../public/testImages/gal6.jpg";
import gal7 from "../../public/testImages/gal7.jpg";
import gal8 from "../../public/testImages/gal8.jpg";

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
            case "landingPage":
              return <LandingPage key={item.id} content={item} />;
            case "overview":
              return (
                <Box component="section" id="Overview" sx={{ width: "100%" }}>
                  <Overview key={item.id} content={item} />
                </Box>
              );
            case "priceDetails":
              return (
                <Box
                  component="section"
                  id="PriceDetails"
                  sx={{ width: "100%" }}
                >
                  <PriceDetails key={item.id} content={item} />
                </Box>
              );

            case "projectHighlights":
              return (
                <Box
                  component="section"
                  id="ProjectHighlights"
                  sx={{ width: "100%" }}
                >
                  <ProjectHighlights key={item.id} content={item} />
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
            case "location":
              return (
                <Box
                  component="section"
                  id="LocationAdvantages"
                  sx={{ width: "100%" }}
                >
                  <LocationAdvantages key={item.id} content={item} />
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
            case "downloads":
              return (
                <Downloads
                  key={item.id}
                  content={item}
                  setOpenEnquiry={setOpenEnquiry}
                />
              );
            case "contactDetails":
              return <ContactDetails key={item.id} content={item} />;
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
          height: { xs: "50px", sm: "65px" },
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
            sm={1}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            sx={{
              height: { xs: "35px", sm: "50px" },
              overflow: "hidden",
              position: "relative",
              // marginLeft:'10px'
            }}
          >
            <Image
              src={urbanriseLogo}
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
            sm={9}
            sx={{ visibility: { xs: "hidden", md: "visible" } }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                    fontSize: "18px",
                    color: content?.style?.textColor,
                    background: selectedSection === item ? "#006CB5" : "none",
                    fontWeight: selectedSection === item ? "bold" : "none",
                    padding: "10px 20px",
                    textTransform: "capitalize",
                    cursor: "pointer",
                    borderRadius: "10px",
                    ":hover": {
                      color:
                        selectedSection === item
                          ? ""
                          : content?.style?.btnBgColor,
                    },
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
            xs={1}
            display="flex"
            alignItems="center"
            paddingLeft="0"
            sx={{
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "flex", md: "none" },
                justifyContent: "center",
                color: "#ffffff",
              }}
            >
              <IconButton
                onClick={() => setDrawerState(!drawerState)}
                size="large"
                edge="start"
                color="inherit"
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
          background: "#000000",
          marginTop: "0",
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
      sx={{
        marginTop: { xs: "50px", sm: "65px" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          position: "relative",
          height: "95vh",
        }}
      >
        <Grid item xs={12} sx={{ display: { xs: "none", sm: "block" } }}>
          <Image fill src={lpImg} alt="landingpage" sizes="100vw" />
        </Grid>
        <Grid item xs={12} sx={{ display: { xs: "block", sm: "none" } }}>
          <Image fill src={lpImgXs} alt="landingpageXs" sizes="100vw" />
        </Grid>

        <Grid
          container
          item
          xs={content?.containerCol?.xs}
          sm={content?.containerCol?.sm}
          md={content?.containerCol?.md}
          lg={content?.containerCol?.lg}
          xl={content?.containerCol?.xl}
          alignItems="center"
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: content?.style?.containerBg,
            paddingLeft: { xs: 0, sm: "50px" },
            justifyContent: { xs: "center", sm: "left" },
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
              background: "rgba(0, 108, 181, 0.1)",
              borderRadius: "24px",
              overflow: "hidden",
              height: { xs: "90%", sm: "60%" },
            }}
          >
            <Grid
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
                    fontSize: { xs: "20px", sm: "36px" },
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
                    fontSize: { xs: "18px", sm: "28px" },
                    color: "#ffffff",
                  }}
                >
                  {content?.description || ""}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={content?.formCol?.xs}
              sm={content?.formCol?.sm}
              md={content?.formCol?.md}
              lg={content?.formCol?.lg}
              xl={content?.formCol?.xl}
              sx={{
                height: "90%",
                background: content?.style?.formBg,
                borderRadius: "20px",
                overflow: "hidden",
                justifyContent: "center",
                alignContent: "flex-start",
                margin: "30px 30px 0 0",
                display: { xs: "none", sm: "flex" },
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
                    fontSize: "32px",
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
                          height: "50px",
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
                          height: "50px",
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
                          height: "50px",
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
        </Grid>
      </Box>
      <Grid
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
                      height: "50px",
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
                      height: "50px",
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
                      height: "50px",
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
      </Grid>
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
          display: { xs: "flex", sm: "none" },
          marginBottom: "30px",
        }}
      >
        <Image
          fill
          src={lpImg}
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
          src={lpImg}
          style={{ objectFit: "cover" }}
          alt="location map"
          sizes="100vw"
        />
      </Grid>
    </Grid>
  );
}
Overview.propTypes = {
  content: PropTypes.object.isRequired,
};

function PriceDetails({ content }) {
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
        background:
          "linear-gradient(0deg, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0.70) 100%), url(/testImages/db.jpg), lightgray 50% / cover no-repeat",
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
            fontSize: { xs: "20px", sm: "36px" },
            fontWeight: "bold",
            color: "#fff",
          }}
        >
          {content?.subTitle || ""}
        </Typography>
      </Grid>
      <Grid container item xs={11} sm={9} sx={{ paddingTop: "50px" }}>
        <TableContainer component={Paper} sx={{ borderRadius: "14px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    background: "#F9B800",
                    fontSize: { xs: "14px", sm: "24px" },
                    fontWeight: "bolder",
                    padding: "20px 0",
                    borderRight: "1px solid #000",
                  }}
                  align="center"
                >
                  Unit Type
                </TableCell>
                <TableCell
                  sx={{
                    background: "#F9B800",
                    fontSize: { xs: "14px", sm: "24px" },
                    fontWeight: "bolder",
                    padding: "20px 0",
                    borderRight: "1px solid #000",
                  }}
                  align="center"
                >
                  Price
                </TableCell>
                <TableCell
                  sx={{
                    background: "#F9B800",
                    fontSize: { xs: "14px", sm: "24px" },
                    fontWeight: "bolder",
                    padding: "20px 0",
                  }}
                  align="center"
                >
                  Enquire
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
                      fontSize: { xs: "14px", sm: "18px" },
                      fontWeight: "bolder",
                      borderRight: "1px solid #000",
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
                      fontSize: { xs: "14px", sm: "18px" },
                      fontWeight: "bolder",
                      borderRight: "1px solid #000",
                    }}
                  >
                    {item?.price || ""}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      sx={{
                        background: "#F9B800",
                        color: "#000000",
                        borderRadius: "9px",
                        textTransform: "none",
                        height: "fit-content",
                        padding: { xs: "10px 10px", sm: "10px 30px" },
                        fontWeight: "bolder",
                        fontSize: { xs: "14px", sm: "18px" },
                        ":hover": {
                          background: "#F9B800",
                        },
                      }}
                      variant="contained"
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
  );
}
PriceDetails.propTypes = {
  content: PropTypes.object.isRequired,
};

function ProjectHighlights({ content }) {
  return (
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      sx={{
        background: `url(/testImages/features_bg.png)`,
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
              border: "10px solid #ffffff",
              borderRadius: "10px",
            }}
          >
            <Image
              fill
              src={lpImg}
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
        background: `url(/testImages/amenities_bg.png)`,
        backgroundSize: "cover",
        padding: { xs: "50px 0", sm: "100px 0 30px 0" },
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
            padding: "30px 0 10px 0",
            fontSize: { xs: "14px", sm: "20px" },
            fontWeight: "bolder",
            color: "#F9B800",
          }}
        >
          {content?.title || ""}
        </Typography>
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
            fontSize: { xs: "20px", sm: "36px" },
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {content?.subTitle || ""}
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={content?.subContainerCol?.xs}
        sm={content?.subContainerCol?.sm}
        md={content?.contsubContainerColainerCol?.md}
        lg={content?.subContainerCol?.lg}
        xl={content?.subContainerCol?.xl}
        sx={{ marginTop: "50px" }}
      >
        <Grid
          container
          item
          xs={content?.contentCol?.xs}
          sm={content?.contentCol?.sm}
          md={content?.contentCol?.md}
          lg={content?.contentCol?.lg}
          xl={content?.contentCol?.xl}
          sx={{ height: "fit-content" }}
        >
          {(content?.amenities?.slice(0, 4) || [])?.map((item) => (
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
                  padding: { xs: "5px", sm: "10px" },
                }}
              >
                <Box
                  sx={{
                    background: `url(${item?.img})`,
                    backgroundSize: "100%",
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
        </Grid>
        <Grid
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
        </Grid>
        <Grid
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
                  padding: { xs: "5px", sm: "10px" },
                }}
              >
                <Box
                  sx={{
                    background: `url(${item?.img})`,
                    backgroundSize: "100%",
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
      </Grid>
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

  const galleryImgList = [gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8];
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
            padding: "30px 0 10px 0",
            fontSize: { xs: "14px", sm: "20px" },
            fontWeight: "bolder",
            color: "#F9B800",
          }}
        >
          {content?.title || ""}
        </Typography>
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
            fontSize: { xs: "20px", sm: "36px" },
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {content?.subTitle || ""}
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
          background: "#134465",
          borderRadius: "14px",
          padding: "10px 20px",
          justifyContent: { xs: "space-evenly", sm: "space-between" },
        }}
      >
        {(content?.tabNames || [])?.map((item) => (
          <Button
            key={item?.id}
            onClick={() => setSelectedImgType([item?.id])}
            sx={{
              height: { xs: "40px", sm: "50px" },
              margin: { xs: "3px 0", sm: 0 },
              background: selectedImgType?.includes(item?.id)
                ? "#FAB900"
                : "#185A86",
              textTransform: "capitalize",
              color: selectedImgType?.includes(item?.id)
                ? "#000000"
                : "#ffffff",
              fontSize: { xs: "14px", sm: "18px" },
              padding: { xs: "7px 10px", sm: "10px 30px" },
              borderRadius: "11px",
              ":hover": {
                background: selectedImgType?.includes(item?.id)
                  ? "#FAB900"
                  : "#185A86",
              },
            }}
            variant="contained"
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
              background: "rgba(249, 184, 0, 0.7) !important",
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
                          background: "rgba(249, 184, 0, 0.7) !important",
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
                          background: "rgba(249, 184, 0, 0.7)",
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
              background: "rgba(249, 184, 0, 0.7)",
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
          key={item?.name}
          item
          xs={12}
          display="flex"
          justifyContent="space-between"
          paddingTop="20px"
        >
          <Typography
            variant="p"
            sx={{
              color: "#000000",
              fontSize: { xs: "12px", sm: "18px" },
            }}
          >
            {item?.name || ""}
          </Typography>
          <Typography
            variant="p"
            sx={{
              color: "#000000",
              fontSize: { xs: "12px", sm: "18px" },
            }}
          >
            {item?.time || ""}
          </Typography>
        </Grid>
      ))}
    </>
  );
};

function LocationAdvantages({ content }) {
  const [isFacilitiesEnabled, setIsFacilitiesEnabled] = useState(true);
  const [isOpenedFacilities, setIsOpenedFacilities] = useState([]);

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
        background: `url(/testImages/locationAdvantages_bg.png)`,
        backgroundSize: "cover",
        padding: { xs: "50px 0", sm: "100px 0 30px 0" },
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
            padding: "30px 0 10px 0",
            fontSize: { xs: "14px", sm: "20px" },
            fontWeight: "bolder",
            color: "#F9B800",
          }}
        >
          {content?.title || ""}
        </Typography>
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
            fontSize: { xs: "20px", sm: "36px" },
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {content?.subTitle || ""}
        </Typography>
      </Grid>
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
        }}
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
            justifyContent: "center",
            position: "relative",
            height: { xs: "180px", sm: "500px" },
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
                if (isFacilitiesEnabled && isOpenedFacilities[0] === item?.id) {
                  setIsOpenedFacilities([]);
                } else {
                  setIsOpenedFacilities([item?.id]);
                }
              }}
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                borderRadius: "14px",
                padding: { xs: "5px 10px", sm: "15px 10px" },
                cursor: "pointer",
                border: "1px solid #454545",
                height: "fit-content",
                background: "#ffffff",
                marginBottom: "10px",
              }}
            >
              <Grid item xs={10} display="flex" alignItems="center">
                <Typography
                  variant="h5"
                  sx={{
                    color: "#000000",
                    fontSize: { xs: "14px", sm: "20px" },
                    fontWeight: "bold",
                  }}
                >
                  {item?.facility || ""}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  display: "flex",
                  color: "#000",
                  fontWeight: "bold",
                }}
                justifyContent="right"
                alignItems="center"
              >
                {isOpenedFacilities?.includes(item.id) ? (
                  <ExpandLessRoundedIcon
                    sx={{ fontSize: { xs: "34px", sm: "40px" } }}
                  />
                ) : (
                  <ExpandMoreRoundedIcon
                    sx={{ fontSize: { xs: "34px", sm: "40px" } }}
                  />
                )}
              </Grid>
              <Grid
                item
                xs={11}
                padding="20px 0"
                sx={{
                  display: isOpenedFacilities?.includes(item.id)
                    ? "flex"
                    : "none",
                  flexDirection: "column",
                }}
              >
                {facilitiesList(item?.listAndTime)}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
LocationAdvantages.propTypes = {
  content: PropTypes.object.isRequired,
};

function WalkThrough({ content }) {
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
        background: `url(/testImages/walkthrough_bg.png)`,
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
            padding: "30px 0 10px 0",
            fontSize: { xs: "14px", sm: "20px" },
            fontWeight: "bolder",
            color: "#F9B800",
          }}
        >
          {content?.title || ""}
        </Typography>
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
            fontSize: { xs: "20px", sm: "36px" },
            fontWeight: "bold",
            color: "#000000",
          }}
        >
          {content?.subTitle || ""}
        </Typography>
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
        <Image
          fill
          src={gal4}
          style={{ objectFit: "cover" }}
          alt="location map"
          sizes="100vw"
        />
        <Box
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
        </Box>
      </Grid>
    </Grid>
  );
}
WalkThrough.propTypes = {
  content: PropTypes.object.isRequired,
};

function Downloads({ content, setOpenEnquiry }) {
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
        background: `url(/testImages/downloads_bg.png)`,
        backgroundSize: "cover",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        item
        xs={12}
        sx={{
          width: "100%",
          height: "100%",
          background: "rgba(249, 184, 0, 0.85)",
          padding: { xs: "10px", sm: "50px" },
        }}
      >
        <Grid
          item
          xs={content?.titleCol?.xs}
          sm={content?.titleCol?.sm}
          md={content?.titleCol?.md}
          lg={content?.titleCol?.lg}
          xl={content?.titleCol?.xl}
          sx={{ borderBottom: { xs: "2px solid #000000", sm: "none" } }}
        >
          <Typography
            component="h1"
            sx={{
              fontSize: { xs: "20px", sm: "40px" },
              fontWeight: "bolder",
              color: "#000000",
              padding: { xs: "20px 0", sm: 0 },
            }}
          >
            {content?.title || ""}
          </Typography>
        </Grid>
        <Grid
          item
          xs={content?.linkContainerCol?.xs}
          sm={content?.linkContainerCol?.sm}
          md={content?.linkContainerCol?.md}
          lg={content?.linkContainerCol?.lg}
          xl={content?.linkContainerCol?.xl}
          sx={{
            borderLeft: { xs: "none", sm: "2px solid #000000" },
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={content?.linkCol?.xs}
            sm={content?.linkCol?.sm}
            md={content?.linkCol?.md}
            lg={content?.linkCol?.lg}
            xl={content?.linkCol?.xl}
            sx={{
              width: "100%",
              border: "2px solid #ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "22px",
              padding: { xs: "20px", sm: "15px" },
              background: "#000000",
              margin: { xs: "20px 0", sm: "0 30px" },
            }}
          >
            <DescriptionRoundedIcon
              sx={{ color: "#ffffff", fontSize: "40px" }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
                color: "#ffffff",
                padding: "10px 0",
              }}
            >
              Brouchure
            </Typography>
            <Typography
              component="a"
              onClick={() => setOpenEnquiry(true)}
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                color: "#F9B800",
                borderBottom: "1px solid #F9B800",
                cursor: "pointer",
              }}
            >
              Click here
            </Typography>
          </Grid>
          <Grid
            xs={content?.linkCol?.xs}
            sm={content?.linkCol?.sm}
            md={content?.linkCol?.md}
            lg={content?.linkCol?.lg}
            xl={content?.linkCol?.xl}
            sx={{
              width: "100%",
              border: "2px solid #ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "22px",
              padding: { xs: "20px", sm: "15px" },
              background: "#000000",
              margin: { xs: "20px 0", sm: "0 30px" },
            }}
          >
            <LocalOfferRoundedIcon
              sx={{ color: "#ffffff", fontSize: "40px" }}
            />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
                color: "#ffffff",
                padding: "10px 0",
              }}
            >
              Price plan
            </Typography>
            <Typography
              component="a"
              onClick={() => setOpenEnquiry(true)}
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                color: "#F9B800",
                borderBottom: "1px solid #F9B800",
                cursor: "pointer",
              }}
            >
              Click here
            </Typography>
          </Grid>{" "}
          <Grid
            xs={content?.linkCol?.xs}
            sm={content?.linkCol?.sm}
            md={content?.linkCol?.md}
            lg={content?.linkCol?.lg}
            xl={content?.linkCol?.xl}
            sx={{
              width: "100%",
              border: "2px solid #ffffff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "22px",
              padding: { xs: "20px", sm: "15px" },
              background: "#000000",
              margin: { xs: "20px 0", sm: "0 30px" },
            }}
          >
            <DomainRoundedIcon sx={{ color: "#ffffff", fontSize: "40px" }} />
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: "16px", sm: "20px" },
                color: "#ffffff",
                padding: "10px 0",
              }}
            >
              Floor plan
            </Typography>
            <Typography
              component="a"
              onClick={() => setOpenEnquiry(true)}
              sx={{
                fontSize: { xs: "14px", sm: "16px" },
                color: "#F9B800",
                borderBottom: "1px solid #F9B800",
                cursor: "pointer",
              }}
            >
              Click here
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
Downloads.propTypes = {
  content: PropTypes.object.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};

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
            <NearMeRoundedIcon
              sx={{ fontSize: "30px", paddingRight: "10px" }}
            />
            {content?.directionBtn || ""}
          </Button>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ margin: "30px 0", height: { xs: "185px", sm: "300px" } }}
      >
        <iframe
          title="sitemap"
          src={content?.mapUrl || ""}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
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
        right: { xs: 0, sm: 50 },
        width: "100%",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      <Grid item xs={6} width="100%">
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
            background: "#F9B800",
            color: "#000000",
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
            background: "#F9B800",
            color: "#000000",
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
          height: "55%",
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
          sx={{ height: "15%", background: "#F9B800", position: "relative" }}
        >
          <Typography
            component="h2"
            sx={{
              textAlign: "center",
              width: "100%",
              color: "#000000",
              fontWeight: "bolder",
              fontSize: { xs: "14px", sm: "24px" },
              padding: { xs: "0 10px", sm: "0 30px" },
            }}
            variant="contained"
          >
            ENQUIRE NOW{" "}
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
                    background: "#ffffff",
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
                    background: "#ffffff",
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
                    background: "#ffffff",
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
                background: "#F9B800",
                textTransform: "capitalize",
                color: "#000000",
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
EnquiryFormPopup.propTypes = {
  openEnquiry: PropTypes.bool.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};
