/* eslint-disable prettier/prettier */
import Head from "next/head";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import path from "path";
import read from "fs-readdir-recursive";
import fs from "fs";
import { Swiper, SwiperSlide } from "swiper/react";
import sizeOf from "image-size";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";
import { DialogContent } from "@mui/material";
import { useRouter } from "next/router";
import amenitiesImg from "../../public/images/amenities.jpg";
import locationImg from "../../public/images/location_1.jpg";
import locationXsImg from "../../public/images/location_mobile.jpg";
import locationAdvantagesImg from "../../public/images/location_advantages.jpg";
import downloadBrochureImg from "../../public/images/download-brochure.png";
import floorPlan from "../../public/images/floor_plan.jpg";
import masterPlanImg from "../../public/images/master-plan.png";
import floorPlanImg from "../../public/images/floor-plan.png";
import mapImg from "../../public/images/map.jpg";
import allianceLogoImg from "../../public/images/alliance_logo.png";
import urbanriseLogoImg from "../../public/images/urbanrise_logo.png";
import theWorldOfJoyLogoImg from "../../public/images/logo.png";
import galleryImg1 from "../../public/images/gal_1.jpg";
import galleryImg2 from "../../public/images/gal_2.jpg";
import galleryImg3 from "../../public/images/gal_3.jpg";
import galleryImg4 from "../../public/images/gal_4.jpg";
import galleryImg5 from "../../public/images/gal_5.jpg";
import galleryImg6 from "../../public/images/gal_6.jpg";
import galleryImg7 from "../../public/images/gal_7.jpg";
import galleryImg8 from "../../public/images/gal_8.jpg";
import galleryImg9 from "../../public/images/gal_9.jpg";
import { useAddFormDataMutation } from "../reduxSlice/apiSlice";

const galleryImgList = [
  galleryImg1,
  galleryImg2,
  galleryImg3,
  galleryImg4,
  galleryImg5,
  galleryImg6,
  galleryImg7,
  galleryImg8,
  galleryImg9,
];

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

const getSource = (paths) => {
  let source = "Direct Traffic";
  if (paths.includes("lp-dsc")) {
    source = "Google-Disc";
  } else if (paths.includes("taboola")) {
    source = "Taboola";
  } else if (paths.includes("lp-text")) {
    source = "Google-Text";
  } else if (paths.includes("lp-dsp")) {
    source = "Google-Disp";
  }
  return source;
};

function Home({ lpImg, lpImgXs, lpImgSize, lpImgXsSize, pageProps }) {
  const [isVisible, setIsVisible] = useState(false);
  const [openImgSlider, setOpenImgSlider] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openConfirmContact, setOpenConfirmContact] = useState(false);
  const [openCancelContact, setOpenCancelContact] = useState(false);
  const planList = useMemo(
    () => [
      {
        iconImg: downloadBrochureImg,
        popupImg: lpImgXs[0],
        name: "Download Brochure",
        bgColor: "#444543",
      },
      {
        iconImg: masterPlanImg,
        popupImg: lpImgXs[0],
        name: "Download Master Plan",
        bgColor: "#4caf50",
      },
      {
        iconImg: floorPlanImg,
        popupImg: floorPlan,
        name: "Download Floor Plan",
        bgColor: "#ac8283",
      },
    ],
    [lpImgXs]
  );

  const [enquiryPopupProps, setEnquiryPopupProps] = useState({
    isOpen: false,
    heading: "Enquire Now",
    bgColor: "#444543",
    img: lpImgXs[0],
  });

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

    const paths = router?.asPath?.split?.("/");
    const source = getSource(paths);

    addFormData({ ...(userData || {}), source })
      .unwrap()
      .then(() => {
        enqueueSnackbar({ variant: "success", message: "Thank you !" });
        resetData();
      })
      .catch(() => {
        enqueueSnackbar({
          variant: "error",
          message: ERROR_TEXT.TOAST_SOMETHINGWENTWRONG,
        });
      });
  };

  const listenToScroll = () => {
    const heightToHideFrom = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const sliderRef = useRef();
  const sliderRefXs = useRef();

  return (
    <>
      <Head>
        <title>The World Of Joy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <Grid
        container
        style={{
          margin: 0,
          height: "100vh",
          position: "relative",
        }}
      >
        <Grid
          container
          item
          xs={12}
          sm={8}
          style={{
            background: "#F5F5F5",
            height: "100%",
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
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "none", md: "flex" },
              }}
              style={{ aspectRatio: lpImgSize.width / lpImgSize.height }}
            >
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                // onSlideChange={(swiper) => {
                //   const currIdx = swiper.activeIndex;
                // }}
                onSwiper={(sw) => {
                  sliderRef.current = sw;
                }}
                className="mySwiper"
                style={{ width: "100%" }}
              >
                {(lpImg || []).map((item, index) => (
                  <SwiperSlide key={index} style={{ width: "100%" }}>
                    <Grid
                      item
                      xs={12}
                      sx={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        fill
                        onClick={() =>
                          setEnquiryPopupProps(() => ({
                            ...enquiryPopupProps,
                            isOpen: true,
                          }))
                        }
                        src={item}
                        alt="landingPage"
                        style={{ cursor: "pointer" }}
                        sizes="100vw"
                      />
                      <Grid
                        item
                        xs={12}
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          display: {
                            xs: "none",
                            md: lpImg?.length >= 2 ? "flex" : "none",
                          },
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          onClick={() => sliderRef?.current?.slidePrev()}
                          sx={{
                            background: "none !important",
                            color: "#ffffff",
                            boxShadow: "none !important",
                            height: "70px",
                          }}
                          variant="contained"
                        >
                          <ArrowLeftIcon sx={{ fontSize: "60px",boxShadow:'0 0 20px grey' ,borderRadius:'50%'}} />
                        </Button>
                        <Button
                          onClick={() => sliderRef?.current?.slideNext()}
                          style={{
                            background: "none",
                            color: "#ffffff",
                            boxShadow: "none",
                            height: "70px",
                          }}
                          variant="contained"
                        >
                          <ArrowRightIcon sx={{ fontSize: "60px" ,boxShadow:'0 0 20px grey',borderRadius:'50%'}} />
                        </Button>
                      </Grid>
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: { xs: "flex", md: "none" },
              }}
              style={{ aspectRatio: lpImgXsSize.width / lpImgXsSize.height }}
            >
              <Swiper
                slidesPerView={1}
                spaceBetween={0}
                loop={true}
                // onSlideChange={(swiper) => {
                //   const currIdx = swiper.activeIndex;
                // }}
                onSwiper={(sw) => {
                  sliderRefXs.current = sw;
                }}
                className="mySwiper"
                style={{ width: "100%" }}
              >
                {(lpImgXs || []).map((item, index) => (
                  <SwiperSlide
                    key={index}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Grid
                      sx={{
                        width: "100%",
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      <Image
                        fill
                        onClick={() =>
                          pageProps.noXsForm
                            ? window.open(
                                `tel:${pageProps?.phoneNo || "+918750183040"}`
                              )
                            : setEnquiryPopupProps(() => ({
                                ...enquiryPopupProps,
                                isOpen: true,
                              }))
                        }
                        src={item}
                        alt="landingPage"
                        style={{ cursor: "pointer" }}
                        sizes="100vw"
                      />
                      <Grid
                        item
                        xs={12}
                        sx={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          display: {
                            xs: lpImgXs?.length >= 2 ? "flex" : "none",
                            md: "none",
                          },
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          onClick={() => sliderRefXs?.current?.slidePrev()}
                          sx={{
                            background: "none !important",
                            color: "#ffffff",
                            boxShadow: "none !important",
                            height: "70px",
                          }}
                          variant="contained"
                        >
                          <ArrowLeftIcon sx={{ fontSize: "40px",boxShadow:'0 0 20px grey',borderRadius:'50%' }} />
                        </Button>
                        <Button
                          onClick={() => sliderRefXs?.current?.slideNext()}
                          style={{
                            background: "none",
                            color: "#ffffff",
                            boxShadow: "none",
                            height: "70px",
                          }}
                          variant="contained"
                        >
                          <ArrowRightIcon sx={{ fontSize: "40px" ,boxShadow:'0 0 20px grey',borderRadius:'50%'}} />
                        </Button>
                      </Grid>
                    </Grid>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Grid>
          </Grid>
          {!pageProps?.noXsForm && (
            <Grid
              container
              item
              xs={12}
              sx={{
                background: "#3c4039",
                display: { xs: "flex", sm: "none" },
                justifyContent: "center",
                margin: "30px 0",
              }}
            >
              <Grid item xs={12}>
                <Typography
                  component="h1"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "10px 0",
                    fontSize: { xs: "28px", md: "32px" },
                    fontWeight: "bold",
                    color: "#ffffff",
                  }}
                >
                  <EmailRoundedIcon
                    sx={{
                      fontSize: 45,
                      color: "#ffffff",
                      marginRight: "20px",
                    }}
                  />{" "}
                  Enquire Now
                </Typography>
              </Grid>
              <Grid
                container
                item
                xs={12}
                style={{
                  padding: "20px",
                }}
              >
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      padding: "10px 0",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                    htmlFor="outlined-basic1"
                  >
                    Name*
                  </InputLabel>
                </Grid>
                <TextField
                  type="text"
                  id="outlined-basic1"
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
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
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
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      padding: "10px 0",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                    htmlFor="outlined-basic2"
                  >
                    Phone Number*
                  </InputLabel>
                </Grid>
                <TextField
                  type="number"
                  id="outlined-basic2"
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
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
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
                <Grid item xs={12}>
                  <InputLabel
                    style={{
                      padding: "10px 0",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#ffffff",
                    }}
                    htmlFor="outlined-basic3"
                  >
                    Email*
                  </InputLabel>
                </Grid>
                <TextField
                  type="email"
                  id="outlined-basic3"
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
                  sx={{
                    width: "100%",
                    borderRadius: "5px",
                    "& .MuiOutlinedInput-root .MuiInputBase-input": {
                      background: "#ffffff",
                      padding: "8px",
                      borderRadius: "5px",
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
                <Grid item xs={12} style={{ paddingTop: "30px" }}>
                  <LoadingButton
                    onClick={() => submitForm()}
                    loading={isLoading}
                    sx={{
                      width: "100%",
                      height: "50px",
                      background: "#FBB70F",
                      textTransform: "capitalize",
                      color: "#000000",
                      fontWeight: "bold",
                      fontSize: "14px",
                      ":hover": {
                        background: "#FBB70F",
                      },
                    }}
                    variant="contained"
                  >
                    Submit
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>
          )}
          <ProjectHighlights />
          <Amenities
            enquiryPopupProps={enquiryPopupProps}
            setEnquiryPopupProps={setEnquiryPopupProps}
            setOpenContactDialog={setOpenContactDialog}
            pageProps={pageProps}
          />
          <Gallery setOpenImgSlider={setOpenImgSlider} />
          <Location />
          {!pageProps?.noForm && (
            <Downloads
              planList={planList}
              enquiryPopupProps={enquiryPopupProps}
              setEnquiryPopupProps={setEnquiryPopupProps}
              setOpenContactDialog={setOpenContactDialog}
              pageProps={pageProps}
            />
          )}
          <Contact
            setOpenContactDialog={setOpenContactDialog}
            pageProps={pageProps}
          />
          <Footer />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: { xs: "flex", sm: "none" },
            position: "fixed",
            bottom: 0,
            width: "100%",
          }}
        >
          <Button
            onClick={() =>
              pageProps.noXsForm
                ? window.open(`tel:${pageProps?.phoneNo || "+918750183040"}`)
                : setOpenContactDialog(true)
            }
            style={{
              width: "50%",
              height: "50px",
              background: "#337ab7",
              textTransform: "capitalize",
              color: "#ffffff",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            variant="contained"
          >
            <CallRoundedIcon
              sx={{
                fontSize: 25,
                color: "#ffffff",
                marginRight: "10px",
              }}
            />{" "}
            Call Now
          </Button>
          <Button
            onClick={() =>
              pageProps.noXsForm
                ? window.open(`tel:${pageProps?.phoneNo || "+918750183040"}`)
                : setEnquiryPopupProps(() => ({
                    ...enquiryPopupProps,
                    isOpen: true,
                  }))
            }
            style={{
              width: "50%",
              height: "50px",
              background: "#ffbb00",
              textTransform: "capitalize",
              color: "#000000",
              fontWeight: "bold",
              fontSize: "14px",
            }}
            variant="contained"
          >
            <EmailRoundedIcon
              sx={{
                fontSize: 25,
                color: "#000000",
                marginRight: "10px",
              }}
            />{" "}
            Enquire Now
          </Button>
        </Grid>
        <ImageSlider
          openImgSlider={openImgSlider}
          setOpenImgSlider={setOpenImgSlider}
        />
        <Enquiry
          isVisible={isVisible}
          enquiryPopupProps={enquiryPopupProps}
          setEnquiryPopupProps={setEnquiryPopupProps}
          setOpenContactDialog={setOpenContactDialog}
          pageProps={pageProps}
        />
        <EnquiryPopup
          enquiryPopupProps={enquiryPopupProps}
          setEnquiryPopupProps={setEnquiryPopupProps}
        />
        <ContactDialog
          openContactDialog={openContactDialog}
          setOpenContactDialog={setOpenContactDialog}
          setOpenCancelContact={setOpenCancelContact}
          setOpenConfirmContact={setOpenConfirmContact}
        />
        <ConfirmContactDialog
          openConfirmContact={openConfirmContact}
          setOpenConfirmContact={setOpenConfirmContact}
          setOpenCancelContact={setOpenCancelContact}
          pageProps={pageProps}
        />
        <CancelContactDialog
          openCancelContact={openCancelContact}
          setOpenCancelContact={setOpenCancelContact}
        />
      </Grid>
    </>
  );
}
Home.propTypes = {
  lpImg: PropTypes.string.isRequired,
  lpImgXs: PropTypes.string.isRequired,
  lpImgSize: PropTypes.object.isRequired,
  lpImgXsSize: PropTypes.object.isRequired,
  pageProps: PropTypes.object,
};
Home.defaultProps = {
  pageProps: {},
};

export default Home;

function Enquiry({
  isVisible,
  enquiryPopupProps,
  setEnquiryPopupProps,
  setOpenContactDialog,
  pageProps,
}) {
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

    const paths = router?.asPath?.split?.("/");
    const source = getSource(paths);

    addFormData({ ...(userData || {}), source })
      .unwrap()
      .then(() => {
        enqueueSnackbar({ variant: "success", message: "Thank you !" });
        resetData();
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
      id="checkme"
      container
      item
      xs={4}
      sx={{
        height: "100%",
        backgroundColor:
          pageProps?.styleInfo?.sidebar?.backgroundColor || "#b13e5d",
        backgroundImage:
          pageProps?.styleInfo?.sidebar?.backgroundImage || "none",
        position: "fixed",
        right: 0,
        display: { xs: "none", sm: "flex" },
        alignContent: "flex-start",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12}>
        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            padding: "10px 0",
            fontSize: { xs: "28px", md: "32px" },
            fontWeight: "bold",
            color: "#ffffff",
          }}
        >
          Enquire Now
        </Typography>
      </Grid>
      {!pageProps?.noForm && (
        <Grid
          container
          item
          xs={11}
          md={9}
          style={{
            backgroundColor:
              pageProps?.styleInfo?.sidebarForm?.backgroundColor || "#762e2e",
            backgroundImage:
              pageProps?.styleInfo?.sidebarForm?.backgroundImage || "none",
            borderRadius: "5px",
            padding: "20px",
          }}
        >
          <Grid item xs={12}>
            <InputLabel
              style={{
                padding: "10px 0",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              htmlFor="outlined-basic1"
            >
              Name*
            </InputLabel>
          </Grid>
          <TextField
            type="text"
            id="outlined-basic1"
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
            sx={{
              width: "100%",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root .MuiInputBase-input": {
                background: "#ffffff",
                padding: "8px",
                borderRadius: "5px",
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
          <Grid item xs={12}>
            <InputLabel
              style={{
                padding: "10px 0",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              htmlFor="outlined-basic2"
            >
              Phone Number*
            </InputLabel>
          </Grid>
          <TextField
            type="number"
            id="outlined-basic2"
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
            sx={{
              width: "100%",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root .MuiInputBase-input": {
                background: "#ffffff",
                padding: "8px",
                borderRadius: "5px",
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
          <Grid item xs={12}>
            <InputLabel
              style={{
                padding: "10px 0",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#ffffff",
              }}
              htmlFor="outlined-basic3"
            >
              Email*
            </InputLabel>
          </Grid>
          <TextField
            type="email"
            id="outlined-basic3"
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
            sx={{
              width: "100%",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root .MuiInputBase-input": {
                background: "#ffffff",
                padding: "8px",
                borderRadius: "5px",
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
          <Grid item xs={12} style={{ paddingTop: "30px" }}>
            <LoadingButton
              onClick={() => submitForm()}
              loading={isLoading}
              sx={{
                width: "100%",
                height: "50px",
                background: "#FBB70F",
                textTransform: "capitalize",
                color: "#000000",
                fontWeight: "bold",
                fontSize: "14px",
                ":hover": {
                  background: "#FBB70F",
                },
              }}
              variant="contained"
            >
              Submit
            </LoadingButton>
          </Grid>
        </Grid>
      )}
      <Grid
        container
        item
        xs={12}
        style={{
          display: isVisible ? "flex" : "none",
          justifyContent: "center",
          padding: "20px",
          background: "#ffffff",
          margin: "30px 0",
        }}
      >
        <Grid
          item
          xs={6}
          md={4}
          style={{
            position: "relative",
            height: "120px",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "auto",
            }}
            src={theWorldOfJoyLogoImg}
            alt="theWorldOfJoy_logo"
            sizes="100vw"
          />
        </Grid>
        <Grid
          container
          item
          xs={11}
          md={8}
          style={{
            paddingLeft: "20px",
            alignContent: "flex-start",
          }}
        >
          <Grid item xs={12}>
            <Typography
              component="h2"
              style={{
                padding: "5px 0",
                fontSize: "24px",
                color: "#000000",
              }}
            >
              For more details
            </Typography>
          </Grid>
          {!pageProps?.noPhNo && (
            <Grid item xs={12}>
              <Typography
                onClick={() => setOpenContactDialog(true)}
                component="h2"
                sx={{
                  padding: "0 0 5px 0",
                  fontSize: { xs: "25px", md: "32px" },
                  fontWeight: "bold",
                  color: "#000000",
                  cursor: "pointer",
                }}
              >
                {pageProps.phoneNo || ""}
              </Typography>
            </Grid>
          )}
          {!pageProps?.noForm && (
            <Grid item xs={12}>
              <Button
                onClick={() =>
                  setEnquiryPopupProps({
                    ...enquiryPopupProps,
                    heading: "Download Brochure",
                    isOpen: true,
                    bgColor: "#444543",
                  })
                }
                sx={{
                  // height: "40px",
                  borderRadius: "20px",
                  background: "#0072BE",
                  textTransform: "capitalize",
                  color: "#ffffff",
                  fontWeight: "bold",
                  fontSize: "14px",
                }}
                variant="contained"
              >
                Download Brochure
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
Enquiry.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  enquiryPopupProps: PropTypes.object.isRequired,
  setEnquiryPopupProps: PropTypes.func.isRequired,
  setOpenContactDialog: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

function EnquiryPopup({ enquiryPopupProps, setEnquiryPopupProps }) {
  const closeTab = () => {
    setEnquiryPopupProps({
      ...enquiryPopupProps,
      isOpen: false,
    });
  };

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

    const paths = router?.asPath?.split?.("/");
    const source = getSource(paths);

    addFormData({ ...(userData || {}), source })
      .unwrap()
      .then(() => {
        enqueueSnackbar({ variant: "success", message: "Thank you !" });
        resetData();
      })
      .catch(() => {
        enqueueSnackbar({
          variant: "error",
          message: ERROR_TEXT.TOAST_SOMETHINGWENTWRONG,
        });
      });
  };

  return (
    <Dialog
      open={enquiryPopupProps.isOpen}
      onClose={closeTab}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".MuiDialog-paper": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          maxWidth: "md",
          "::-webkit-scrollbar": {
            display: "none",
          },
          background: enquiryPopupProps.bgColor || "#444543",
        },
      }}
    >
      <Grid
        container
        item
        xs={12}
        width="100%"
        display="flex"
        justifyContent="center"
        alignContent="flex-start"
        height="100%"
        position="relative"
      >
        <Grid
          container
          item
          xs={12}
          md={5}
          width="100%"
          display="flex"
          justifyContent="center"
          alignContent="flex-start"
          sx={{
            height: "100%",
          }}
        >
          <Grid item xs={12}>
            <Typography
              component="h1"
              sx={{
                textAlign: "center",
                padding: "10px 0",
                fontSize: { xs: "25px", sm: "32px" },
                fontWeight: "bold",
                color: "#ffffff",
              }}
            >
              {enquiryPopupProps.heading || "Enquire Now"}
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              borderRadius: "5px",
              padding: "20px",
            }}
          >
            <Grid item xs={12}>
              <InputLabel
                style={{
                  padding: "10px 0",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
                htmlFor="outlined-basic1"
              >
                Name*
              </InputLabel>
            </Grid>
            <TextField
              type="text"
              id="outlined-basic1"
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
              sx={{
                width: "100%",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root .MuiInputBase-input": {
                  background: "#ffffff",
                  padding: "8px",
                  borderRadius: "5px",
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
            <Grid item xs={12}>
              <InputLabel
                style={{
                  padding: "10px 0",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
                htmlFor="outlined-basic2"
              >
                Phone Number*
              </InputLabel>
            </Grid>
            <TextField
              type="number"
              id="outlined-basic2"
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
              sx={{
                width: "100%",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root .MuiInputBase-input": {
                  background: "#ffffff",
                  padding: "8px",
                  borderRadius: "5px",
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
            <Grid item xs={12}>
              <InputLabel
                style={{
                  padding: "10px 0",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "#ffffff",
                }}
                htmlFor="outlined-basic3"
              >
                Email*
              </InputLabel>
            </Grid>
            <TextField
              type="email"
              id="outlined-basic3"
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
              sx={{
                width: "100%",
                borderRadius: "5px",
                "& .MuiOutlinedInput-root .MuiInputBase-input": {
                  background: "#ffffff",
                  padding: "8px",
                  borderRadius: "5px",
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
            <Grid item xs={12} style={{ paddingTop: "30px" }}>
              <LoadingButton
                onClick={() => submitForm()}
                loading={isLoading}
                sx={{
                  width: "100%",
                  height: "50px",
                  background: "#FBB70F",
                  textTransform: "capitalize",
                  color: "#000000",
                  fontWeight: "bold",
                  fontSize: "14px",
                  ":hover": {
                    background: "#FBB70F",
                  },
                }}
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs={7}
          justifyContent="center"
          sx={{
            background: "pink",
            position: "relative",
            display: { xs: "none", md: "flex" },
            padding: "280px 0",
          }}
        >
          <Image
            fill
            style={{
              objectFit: "fill",
            }}
            src={enquiryPopupProps.img}
            alt="location"
          />
        </Grid>
        <CloseIcon
          onClick={closeTab}
          sx={{
            fontSize: 25,
            color: "#000000",
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />
      </Grid>
    </Dialog>
  );
}
EnquiryPopup.propTypes = {
  enquiryPopupProps: PropTypes.object.isRequired,
  setEnquiryPopupProps: PropTypes.func.isRequired,
};

function ProjectHighlights() {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#f3f3f3",
        padding: "30px 0 50px",
      }}
    >
      <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            padding: "10px 0",
            fontSize: "32px",
            width: { xs: "100%", sm: "60%", md: "32%" },
            borderBottom: "2px solid #3c3c3c",
            fontWeight: "bolder",
            letterSpacing: "6px",
            color: "#3c3c3c",
          }}
        >
          PROJECT HIGHLIGHTS
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        style={{ display: "flex", justifyContent: "center", padding: "30px 0" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", paddingLeft: { xs: "0", sm: "20px" } }}
        >
          <Box component="ul" sx={{ margin: "0 !important" }}>
            <Typography
              component="li"
              style={{
                fontSize: "16px",
                padding: "5px 0",
                color: "#333",
                listStyle: "none",
              }}
            >
              ⚫ Located at Siruseri, Asia&apos;s Largest IT Park spread over
              980 Acres
            </Typography>
            <Typography
              component="li"
              style={{
                padding: "5px 0",
                fontSize: "16px",
                color: "#333",
                listStyle: "none",
              }}
            >
              ⚫ 45,000 Sq. Ft. Cosmo Clubhouse
            </Typography>
            <Typography
              component="li"
              style={{
                fontSize: "16px",
                color: "#333",
                padding: "5px 0",
                listStyle: "none",
              }}
            >
              ⚫ 1 Acre of Large Park with Amenities for Everyone in the Family
            </Typography>
            <Typography
              component="li"
              style={{
                fontSize: "16px",
                color: "#333",
                padding: "5px 0",
                listStyle: "none",
              }}
            >
              ⚫ Strong Home Built with International Mivan Technology
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: "flex", paddingLeft: { xs: "0", sm: "20px" } }}
        >
          <Box component="ul" sx={{ margin: "0 !important" }}>
            <Typography
              component="li"
              style={{
                padding: "5px 0",
                fontSize: "16px",
                color: "#333",
                listStyle: "none",
              }}
            >
              ⚫ 75,000 Sq. Ft. of Never before Rooftop Amenities
            </Typography>
            <Typography
              component="li"
              style={{
                fontSize: "16px",
                padding: "5px 0",
                color: "#333",
                listStyle: "none",
              }}
            >
              ⚫ 12,000 Sq. Ft. Urbanrise Genius - Children&apos;s Learning Hub
            </Typography>
            <Typography
              component="li"
              style={{
                fontSize: "16px",
                color: "#333",
                padding: "5px 0",
                listStyle: "none",
              }}
            >
              ⚫ 24,000 Sq. Ft. of Never before &quot;Tower to Tower&quot;
              Amenities
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

function Amenities({ enquiryPopupProps, setEnquiryPopupProps, pageProps }) {
  return (
    <>
      <Grid
        container
        item
        xs={12}
        style={{ display: "flex", justifyContent: "center", padding: "0 15px" }}
      >
        <Grid
          item
          xs={10}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Typography
            component="h1"
            sx={{
              textAlign: "center",
              padding: "0 0 16px",
              margin: "30px 0 0 0",
              fontSize: "32px",
              width: { xs: "100%", sm: "60%", md: "32%" },
              borderBottom: "2px solid #3c3c3c",
              fontWeight: "bolder",
              letterSpacing: "6px",
              color: "#3c3c3c",
            }}
          >
            AMENITIES
          </Typography>
        </Grid>
        <Grid item xs={11} sm={10}>
          <Typography
            component="h2"
            style={{
              textAlign: "center",
              margin: "20px 0 10px",
              fontSize: "18px",
              color: "#595959",
            }}
          >
            The best in class amenities for a balanced life
          </Typography>
        </Grid>
        <Grid
          item
          xs={11}
          sm={12}
          sx={{
            padding: "0 10px",
          }}
        >
          <Image
            style={{
              width: "100%",
              height: "auto",
            }}
            src={amenitiesImg}
            alt="amenities_img"
            sizes="100vw"
          />
        </Grid>
      </Grid>
      <Grid container item xs={12}>
        <Grid
          item
          xs={12}
          sx={{
            position: "relative",
            margin: "30px 0",
            height: { xs: "300px", md: "350px" },
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Image
            fill
            alt="animated_gif"
            src="https://www.jubileeresidences.com/promos/google/aug-dsp-2020/images/book_site_visit.gif"
            sizes="100vw"
          />
          <Grid
            container
            item
            xs={12}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              top: 0,
              right: 0,
              background: "rgba(255, 193, 7, 0.32941176470588235)",
              alignContent: "flex-start",
            }}
          >
            <Grid item xs={12}>
              <Typography
                component="h1"
                style={{
                  textAlign: "center",
                  padding: "20px 0 10px 0",
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                Book a FREE Site visit
              </Typography>
            </Grid>

            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() =>
                  setEnquiryPopupProps({
                    ...enquiryPopupProps,
                    heading: "Book a Site Visit",
                    isOpen: true,
                  })
                }
                variant="contained"
                sx={{
                  background: "#9BA11E",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#000000",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  height: "40px",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                Book Now
              </Button>
              <Button
                onClick={() =>
                  pageProps.noXsForm
                    ? window.open(
                        `tel:${pageProps?.phoneNo || "+918750183040"}`
                      )
                    : setEnquiryPopupProps(() => ({
                        ...enquiryPopupProps,
                        isOpen: true,
                      }))
                }
                variant="contained"
                sx={{
                  background: "#9BA11E",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#000000",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  height: "40px",
                  display: { xs: "flex", sm: "none" },
                }}
              >
                Book Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
Amenities.propTypes = {
  enquiryPopupProps: PropTypes.object.isRequired,
  setEnquiryPopupProps: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

function Gallery({ setOpenImgSlider }) {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          component="h1"
          style={{
            textAlign: "center",
            padding: "10px 0",
            fontSize: "32px",
            width: { xs: "100%", sm: "60%", md: "32%" },
            borderBottom: "2px solid #3c3c3c",
            fontWeight: "bolder",
            letterSpacing: "6px",
            color: "#3c3c3c",
          }}
        >
          Gallery
        </Typography>
      </Grid>
      <Grid item xs={11} sm={10}>
        <Typography
          component="h2"
          style={{
            textAlign: "center",
            padding: "10px 0",
            fontSize: "18px",
            color: "#595959",
          }}
        >
          Live in the heart of Siruseri - the gateway to Chennai
        </Typography>
      </Grid>

      <Grid container item xs={12}>
        {galleryImgList.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            md={4}
            sx={{
              padding: "0 15px",
              margin: "40px 0 0",
            }}
          >
            <Image
              onClick={() => setOpenImgSlider(true)}
              style={{
                height: "auto",
                width: "100%",
                cursor: "pointer",
                padding: "5px",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
              src={item}
              alt={`gallery_img${index}`}
              sizes="100vw"
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
Gallery.propTypes = {
  setOpenImgSlider: PropTypes.func.isRequired,
};

function Location() {
  return (
    <Grid
      container
      item
      xs={12}
      style={{ display: "flex", justifyContent: "center", margin: "40px 0 0" }}
    >
      <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          component="h1"
          sx={{
            textAlign: "center",
            padding: "0 0 16px",
            fontSize: "32px",
            width: { xs: "100%", sm: "60%", md: "32%" },
            margin: "30px 0 0",
            borderBottom: "2px solid #3c3c3c",
            fontWeight: "bolder",
            letterSpacing: "6px",
            color: "#3c3c3c",
          }}
        >
          LOCATION
        </Typography>
      </Grid>
      <Grid item xs={11} sm={10}>
        <Typography
          component="h2"
          style={{
            textAlign: "center",
            padding: "10px 0",
            fontSize: "18px",
            color: "#595959",
          }}
        >
          LOCATION IS KEY TO A CONVENIENT LIFE
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        style={{ margin: "20px 15px 0", width: "100%", position: "relative" }}
      >
        <Grid
          container
          item
          xs={12}
          sx={{
            overflow: "hidden",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image
            src={locationImg}
            alt="location"
            style={{
              width: "100%",
              height: "auto",
            }}
            sizes="100vw"
          />
        </Grid>
        <Grid
          container
          item
          xs={12}
          sx={{
            overflow: "hidden",
            display: { xs: "block", md: "none" },
          }}
        >
          <Image
            src={locationXsImg}
            alt="locationXs"
            style={{
              width: "100%",
              height: "auto",
            }}
            sizes="100vw"
          />
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        style={{ margin: "30px 15px", width: "100%", position: "relative" }}
      >
        <Image
          style={{
            width: "100%",
            height: "auto",
          }}
          src={locationAdvantagesImg}
          alt="location_advantages"
          sizes="100wv"
        />
      </Grid>
    </Grid>
  );
}

function Downloads({
  enquiryPopupProps,
  setEnquiryPopupProps,
  planList,
  pageProps,
}) {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#222222",
      }}
    >
      <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
        <Typography
          component="h1"
          style={{
            textAlign: "center",
            margin: "30px 0 0",
            padding: "0 0 16px",
            fontSize: "28px",
            fontWeight: "bolder",
            letterSpacing: "6px",
            color: "#ffffff",
          }}
        >
          DOWNLOADS
        </Typography>
      </Grid>
      <Grid item xs={10}>
        <Typography
          component="p"
          style={{
            textAlign: "center",
            padding: "0",
            margin: "0 0 10px",
            color: "#ffffff",
            fontSize: "14px",
          }}
        >
          Make your dream Apartment in OMR by downloading our floor plans and
          enliven your dream home in no time!
        </Typography>
      </Grid>
      <Grid
        container
        item
        xs={12}
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "00px 0",
        }}
      >
        {planList.map((item, index) => (
          <Grid
            container
            item
            key={item.name}
            xs={10}
            md={4}
            justifyContent="center"
            sx={{
              margin: "30px 0",
            }}
          >
            <Grid
              container
              item
              justifyContent="center"
              xs={12}
              sx={{
                margin: "10px 0 30px",
              }}
            >
              <Image
                src={item.iconImg || ""}
                alt={`${item.name}_img${index}`}
                sizes="100vw"
              />
            </Grid>
            <Grid container item xs={12} justifyContent="center">
              <Button
                onClick={() =>
                  setEnquiryPopupProps({
                    ...enquiryPopupProps,
                    img: item.popupImg,
                    heading: item.name || "Enquire Now",
                    bgColor: item.bgColor || "#444543",
                    isOpen: true,
                  })
                }
                variant="contained"
                sx={{
                  background: "#9BA11E",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#000000",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  height: "40px",
                  width: "200px",
                  display: { xs: "none", sm: "flex" },
                }}
              >
                {item.name || ""}
              </Button>
              <Button
                onClick={() =>
                  pageProps.noXsForm
                    ? window.open(
                        `tel:${pageProps?.phoneNo || "+918750183040"}`
                      )
                    : setEnquiryPopupProps(() => ({
                        ...enquiryPopupProps,
                        isOpen: true,
                      }))
                }
                variant="contained"
                sx={{
                  background: "#9BA11E",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#000000",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  height: "40px",
                  width: "200px",
                  display: { xs: "flex", sm: "none" },
                }}
              >
                {item.name || ""}
              </Button>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
Downloads.propTypes = {
  enquiryPopupProps: PropTypes.object.isRequired,
  setEnquiryPopupProps: PropTypes.func.isRequired,
  planList: PropTypes.arrayOf(PropTypes.any).isRequired,
  pageProps: PropTypes.object.isRequired,
};

function Contact({ setOpenContactDialog, pageProps }) {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        padding: "50px 20px",
      }}
    >
      <Grid item xs={12} sm={7} style={{ width: "100%", overflow: "hidden" }}>
        <Box
          component="a"
          href="https://www.google.com/maps/place/Urbanrise+Revolution+One/@12.7987842,80.2205513,15z/data=!4m5!3m4!1s0x0:0xaf528dfe8d126e2d!8m2!3d12.7987842!4d80.2205513"
          target="_blank"
          width="100%"
        >
          <Image
            src={mapImg}
            alt="map"
            style={{
              width: "100%",
              height: "auto",
            }}
            sizes="100vw"
          />
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={5}
        style={{ paddingLeft: "30px", alignContent: "flex-start" }}
      >
        <Grid item xs={12}>
          <Image
            style={{
              height: "auto",
              width: "200px",
            }}
            src={theWorldOfJoyLogoImg}
            alt="theWorldOfJoy_logo"
            sizes="100vw"
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h1"
            sx={{
              padding: "10px 0",
              fontSize: { xs: "30px", md: "36px" },
              fontWeight: "bold",
            }}
          >
            THE WORLD OF JOY
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h2"
            style={{
              fontSize: "18px",
              color: "#3c3c3c",
            }}
          >
            OMR Main Road, Siruseri,
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h3"
            style={{
              fontSize: "18px",
              color: "#3c3c3c",
            }}
          >
            Chennai, Tamil Nadu 603103
          </Typography>
        </Grid>
        {!pageProps?.noPhNo && (
          <Grid item xs={12}>
            <Typography
              onClick={() =>
                pageProps.noXsForm
                  ? window.open(`tel:${pageProps?.phoneNo || "+918750183040"}`)
                  : setOpenContactDialog(true)
              }
              component="h1"
              sx={{
                display: { xs: "flex", sm: "none" },
                padding: "0 0 16px",
                margin: "30px 0",
                fontSize: { xs: "25px", md: "32px" },
                borderBottom: "2px solid #3c3c3c",
                fontWeight: "bolder",
                letterSpacing: "6px",
                color: "#3c3c3c",
                cursor: "pointer",
              }}
            >
              {pageProps?.phoneNo || ""}
            </Typography>
            <Typography
              onClick={() => setOpenContactDialog(true)}
              component="h1"
              sx={{
                display: { xs: "none", sm: "flex" },
                padding: "0 0 16px",
                margin: "30px 0",
                fontSize: { xs: "25px", md: "32px" },
                borderBottom: "2px solid #3c3c3c",
                fontWeight: "bolder",
                letterSpacing: "6px",
                color: "#3c3c3c",
                cursor: "pointer",
              }}
            >
              {pageProps?.phoneNo || ""}
            </Typography>
          </Grid>
        )}
        <Grid
          container
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "65px",
          }}
        >
          <Grid item xs={6} md={4} style={{ width: "100%" }}>
            <Grid
              item
              container
              xs={12}
              component="a"
              href="https://www.alliancein.com/"
              target="_blank"
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              <Image
                fill
                style={{
                  objectFit: "contain",
                }}
                src={allianceLogoImg}
                alt="alliance_logo"
                sizes="100vw"
              />
            </Grid>
          </Grid>
          <Grid item xs={6} md={4} style={{ width: "100%" }}>
            <Grid
              item
              container
              xs={12}
              component="a"
              href="https://www.urbanrise.in/"
              target="_blank"
              style={{
                position: "relative",
                height: "100%",
              }}
            >
              <Image
                fill
                style={{
                  objectFit: "contain",
                }}
                src={urbanriseLogoImg}
                alt="urbanrise_logo"
                sizes="100vw"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
Contact.propTypes = {
  setOpenContactDialog: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

function Footer() {
  return (
    <Grid
      container
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
        background: "#222222",
        paddingBottom: { xs: "70px", sm: "0" },
      }}
    >
      <Grid item xs={12}>
        <Typography
          component="p"
          style={{
            padding: "20px 30px",
            fontSize: "12px",
            color: "#D8A75B",
          }}
        >
          Disclaimer &quot;
          <Typography
            component="span"
            style={{
              padding: "5px 0",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#D8A75B",
            }}
          >
            &quot;I authorize Revolution One and its representatives to Call,
            SMS, Email or WhatsApp me about their products and offers. This
            consent overrides any registration for DNC / NDNC.&quot;
          </Typography>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          component="p"
          style={{
            padding: "0 30px 10px 30px",
            color: "#ffffff",
            fontSize: "14px",
          }}
        >
          © 2022 Alliance Revolution One | All Rights Reserved |
          TN/01/BUILDING/0015/2019 | www.tnrera.in
        </Typography>
      </Grid>
    </Grid>
  );
}

function ContactDialog({
  openContactDialog,
  setOpenContactDialog,
  setOpenCancelContact,
  setOpenConfirmContact,
}) {
  const handleClose = () => {
    setOpenContactDialog(false);
  };

  return (
    <div>
      <Dialog
        open={openContactDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiDialog-paper": {
            padding: { xs: "10px", sm: "30px 30px 15px" },
          },
        }}
      >
        <DialogContent
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: 0,
            paddingBottom: "20px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: { xs: "22px", sm: "24px" },
              paddingBottom: "15px",
              marginBottom: "10px",
            }}
            fontWeight={700}
          >
            Are you looking to buy a property?
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "11px",
          }}
        >
          <Button
            onClick={() => {
              handleClose();
              setOpenConfirmContact(true);
            }}
            sx={{
              background: "#ecf0f1",
              padding: "8px 15px",
              color: "#000000",
              fontWeight: "bolder",
            }}
          >
            CONFIRM
          </Button>
          <Button
            onClick={() => {
              handleClose();
              setOpenCancelContact(true);
            }}
            autoFocus
            sx={{
              background: "#ecf0f1",
              padding: "8px 15px",
              color: "#000000",
              fontWeight: "bolder",
            }}
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
ContactDialog.propTypes = {
  openContactDialog: PropTypes.bool.isRequired,
  setOpenContactDialog: PropTypes.func.isRequired,
  setOpenCancelContact: PropTypes.func.isRequired,
  setOpenConfirmContact: PropTypes.func.isRequired,
};

function ConfirmContactDialog({
  openConfirmContact,
  setOpenConfirmContact,
  setOpenCancelContact,
  pageProps,
}) {
  const handleClose = () => {
    setOpenConfirmContact(false);
  };

  return (
    <Dialog
      open={openConfirmContact}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        ".MuiDialog-paper": {
          padding: { xs: "10px", sm: "30px 30px 15px" },
        },
      }}
    >
      <DialogContent
        id="alert-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: 0,
          paddingBottom: "20px",
        }}
      >
        <Typography
          sx={{
            color: "#000000",
            fontSize: { xs: "22px", sm: "24px" },
            paddingBottom: "15px",
            marginBottom: "10px",
          }}
          fontWeight={700}
        >
          Are you interested to speak to our project expert?
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: "11px",
        }}
      >
        <Button
          onClick={() => {
            handleClose();
            window.open(`tel:${pageProps?.phoneNo || "+918750183040"}`);
          }}
          sx={{
            background: "#ecf0f1",
            padding: "8px 15px",
            color: "#000000",
            fontWeight: "bolder",
          }}
        >
          CONFIRM
        </Button>
        <Button
          onClick={() => {
            handleClose();
            setOpenCancelContact(true);
          }}
          autoFocus
          sx={{
            background: "#ecf0f1",
            padding: "8px 15px",
            color: "#000000",
            fontWeight: "bolder",
          }}
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
ConfirmContactDialog.propTypes = {
  openConfirmContact: PropTypes.bool.isRequired,
  setOpenConfirmContact: PropTypes.func.isRequired,
  setOpenCancelContact: PropTypes.func.isRequired,
  pageProps: PropTypes.object.isRequired,
};

function CancelContactDialog({ openCancelContact, setOpenCancelContact }) {
  const handleClose = () => {
    setOpenCancelContact(false);
  };

  return (
    <div>
      <Dialog
        open={openCancelContact}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiDialog-paper": {
            padding: { xs: "10px", sm: "30px 30px 15px" },
          },
        }}
      >
        <DialogContent id="alert-dialog-title">
          <Typography
            sx={{
              color: "#000000",
              paddingBottom: "15px",
              marginBottom: "10px",
            }}
          >
            Cancelled!
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "11px",
          }}
        >
          <Button
            onClick={handleClose}
            autoFocus
            sx={{
              background: "#ecf0f1",
              padding: "8px 15px",
              color: "#000000",
              fontWeight: "bolder",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
CancelContactDialog.propTypes = {
  openCancelContact: PropTypes.bool.isRequired,
  setOpenCancelContact: PropTypes.func.isRequired,
};

function ImageSlider({ openImgSlider, setOpenImgSlider }) {
  const closeTab = () => {
    setOpenImgSlider(false);
  };
  const sliderRef = useRef();

  const [currentExpIdx, setCurrentExpIdx] = useState(0);

  return (
    <Dialog
      open={openImgSlider}
      onClose={closeTab}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        height: "100vh",
        ".MuiDialog-paper": {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          background: "none",
          maxWidth: "xl",
          height: { xs: "30%", sm: "40%", md: "70%" },
          width: { xs: "100%", sm: "100%", md: "100%" },
          "::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <Grid
        container
        item
        xs={12}
        width="100%"
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ background: "#ffffff" }}
      >
        <Grid
          item
          xs={1}
          md={2}
          justifyContent="flex-start"
          alignItems="center"
          sx={{
            background: "#545454",
            height: "100%",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Button
            onClick={() => sliderRef?.current?.slidePrev()}
            disabled={currentExpIdx === 0}
            sx={{
              background: "none !important",
              color: currentExpIdx === 0 ? "grey" : "#ffffff",
              boxShadow: "none !important",
            }}
            variant="contained"
          >
            <ArrowLeftIcon sx={{ fontSize: "100px" }} />
          </Button>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={10}
          md={8}
          sx={{
            padding: { xs: "0", sm: "0 20px" },
            height: { xs: "100%", sm: "90%" },
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
          >
            {(galleryImgList || []).map((item, index) => (
              <SwiperSlide key={index}>
                <Grid
                  item
                  xs={12}
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "0.5px solid #000000",
                    position: "relative",
                  }}
                >
                  <Image fill src={item} alt="location" />
                  <Grid
                    item
                    xs={12}
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      display: { xs: "flex", sm: "none" },
                      justifyContent: "space-between",
                    }}
                  >
                    <Button
                      onClick={() => sliderRef?.current?.slidePrev()}
                      disabled={currentExpIdx === 0}
                      sx={{
                        background: "none !important",
                        color: currentExpIdx === 0 ? "grey" : "#ffffff",
                        boxShadow: "none !important",
                      }}
                      variant="contained"
                    >
                      <ArrowLeftIcon sx={{ fontSize: "70px" }} />
                    </Button>
                    <Button
                      onClick={() => sliderRef?.current?.slideNext()}
                      disabled={currentExpIdx === 8}
                      style={{
                        background: "none",
                        color: currentExpIdx === 8 ? "grey" : "#ffffff",
                        boxShadow: "none",
                      }}
                      variant="contained"
                    >
                      <ArrowRightIcon sx={{ fontSize: "70px" }} />
                    </Button>
                  </Grid>
                </Grid>
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid
          item
          xs={1}
          md={2}
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            background: "#545454",
            height: "100%",
            display: { xs: "none", sm: "flex" },
          }}
        >
          <Button
            onClick={() => sliderRef?.current?.slideNext()}
            disabled={currentExpIdx === 8}
            style={{
              background: "none",
              color: currentExpIdx === 8 ? "grey" : "#ffffff",
              boxShadow: "none",
            }}
            variant="contained"
          >
            <ArrowRightIcon sx={{ fontSize: "100px" }} />
          </Button>
        </Grid>
      </Grid>
    </Dialog>
  );
}
ImageSlider.propTypes = {
  openImgSlider: PropTypes.bool.isRequired,
  setOpenImgSlider: PropTypes.func.isRequired,
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "public", "lp-images");
  const filenames = read(postsDirectory);

  const lpDirs = [
    ...new Set(
      filenames.map((f) => f.split(path.sep).slice(0, -1).join(path.sep))
    ),
  ].filter((d) => d);

  const slugs = lpDirs.map((f) => f.split(path.sep));
  const paths = [
    { params: { slug: [] } },
    ...slugs.map((slug) => ({
      params: { slug },
    })),
  ];
  // console.log("Paths: ", JSON.stringify(paths, null, 2));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  let lpImg = [];
  let lpImg2 = [];
  let lpImgXs = [];
  let lpImgXs2 = [];
  let pageProps = [];
  params.lpImg = [];
  params.lpImgXs = [];

  if (Array.isArray(params.slug) && params.slug.length) {
    lpImg = ["lp-images", ...params.slug, "bannerImg.jpg"];
    lpImgXs = ["lp-images", ...params.slug, "bannerImg_xs.jpg"];
    lpImg2 = ["lp-images", ...params.slug, "bannerImg1.jpg"];
    lpImgXs2 = ["lp-images", ...params.slug, "bannerImg_xs1.jpg"];
    pageProps = ["lp-images", ...params.slug, "pageProps.json"];
  } else {
    lpImg = ["images", "db.jpg"];
    lpImgXs = ["images", "mb.jpg"];
    pageProps = ["pageProps.json"];
  }
  lpImg = `/${lpImg.join("/")}`;
  lpImgXs = `/${lpImgXs.join("/")}`;
  pageProps = `/${pageProps.join("/")}`;

  lpImg2 = `/${lpImg2.join("/")}`;
  lpImgXs2 = `/${lpImgXs2.join("/")}`;

  const lpImgAbsPath = path.join(process.cwd(), "public", lpImg);
  if (fs.existsSync(lpImgAbsPath)) {
    const imgDimensions = sizeOf(lpImgAbsPath);
    params.lpImgSize = imgDimensions;
    params.lpImg.push(lpImg);
  }

  const lpImg2AbsPath = path.join(process.cwd(), "public", lpImg2);
  if (fs.existsSync(lpImg2AbsPath) && lpImg2 !== "/") {
    params.lpImg.push(lpImg2);
  }

  const lpImgXsAbsPath = path.join(process.cwd(), "public", lpImgXs);
  if (fs.existsSync(lpImgXsAbsPath)) {
    const imgXsDimensions = sizeOf(lpImgXsAbsPath);
    params.lpImgXsSize = imgXsDimensions;
    params.lpImgXs.push(lpImgXs);
  }

  const lpImgXs2AbsPath = path.join(process.cwd(), "public", lpImgXs2);
  if (fs.existsSync(lpImgXs2AbsPath) && lpImgXs2 !== "/") {
    params.lpImgXs.push(lpImgXs2);
  }

  const pagePropsAbsPath = path.join(process.cwd(), "public", pageProps);
  if (fs.existsSync(pagePropsAbsPath)) {
    const pagePropsStr = fs.readFileSync(pagePropsAbsPath);
    params.pageProps = JSON.parse(pagePropsStr);
  }
  // console.log("Params: ", JSON.stringify(params, null, 2));

  return {
    props: params,
  };
};
