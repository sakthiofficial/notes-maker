import Head from "next/head";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import path from "path";
import read from "fs-readdir-recursive";
import { Swiper, SwiperSlide } from "swiper/react";
import sizeOf from "image-size";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import { useAddFormDataMutation } from "@/reduxSlice/apiSlice";
import { LoadingButton } from "@mui/lab";
import { useSnackbar } from "notistack";

import aminities_img from "../../public/images/aminities.webp";
import location from "../../public/images/location_1.webp";
import locationXs from "../../public/images/location_mobile.webp";
import location_advantages from "../../public/images/location_advantages.webp";
import download_brochure from "../../public/images/download-brochure.png";
import master_plan from "../../public/images/master-plan.png";
import floor_plan from "../../public/images/floor-plan.png";
import map from "../../public/images/map.webp";
import alliance_logo from "../../public/images/alliance_logo.png";
import urbanrise_logo from "../../public/images/urbanrise_logo.webp";
import theWorldOfJoy_logo from "../../public/images/logo.webp";
import floor_plan_bg from "../../public/images/floor_plans.webp";
import gallery_img1 from "../../public/images/gal_1.webp";
import gallery_img2 from "../../public/images/gal_2.webp";
import gallery_img3 from "../../public/images/gal_3.webp";
import gallery_img4 from "../../public/images/gal_4.webp";
import gallery_img5 from "../../public/images/gal_5.webp";
import gallery_img6 from "../../public/images/gal_6.webp";
import gallery_img7 from "../../public/images/gal_7.webp";
import gallery_img8 from "../../public/images/gal_8.webp";
import gallery_img9 from "../../public/images/gal_9.webp";

const galleryImgList = [
  gallery_img1,
  gallery_img2,
  gallery_img3,
  gallery_img4,
  gallery_img5,
  gallery_img6,
  gallery_img7,
  gallery_img8,
  gallery_img9,
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

const planList = [
  {
    img: download_brochure,
    name: "Download Brochure",
    bgColor: "#444543",
  },
  {
    img: master_plan,
    name: "Download Master Plan",
    bgColor: "#4caf50",
  },
  {
    img: floor_plan,
    name: "Download Floor Plan",
    bgColor: "#ac8283",
  },
];

const Home = ({ lpImg, lpImgXs, lpImgSize }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [openImgSlider, setOpenImgSlider] = useState(false);
  const [openContactDialog, setOpenContactDialog] = useState(false);
  const [openConfirmContact, setOpenConfirmContact] = useState(false);
  const [openCancelContact, setOpenCancelContact] = useState(false);

  const [openEnquiry, setOpenEnquiry] = useState({
    isOpen: false,
    heading: "Enquire Now",
    bgColor: "#444543",
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

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    addFormData(userData)
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

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHideFrom) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <>
      <Head>
        <title>The World Of Joy</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
            container
            item
            xs={12}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Grid item xs={12}>
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  height: lpImgSize.height,
                  position: "relative",
                  display: { xs: "none", md: "block" },
                }}
              >
                <Image
                  onClick={() =>
                    setOpenEnquiry({
                      ...openEnquiry,
                      isOpen: true,
                    })
                  }
                  fill
                  unoptimized={true}
                  src={lpImg}
                  alt="landingPage"
                  style={{ cursor: "pointer" }}
                />
              </Box>
              <Box
                sx={{
                  width: "100%",
                  overflow: "hidden",
                  height: "50vh",
                  position: "relative",
                  display: { xs: "block", md: "none" },
                }}
              >
                <Image
                  fill
                  onClick={() =>
                    setOpenEnquiry({
                      ...openEnquiry,
                      isOpen: true,
                    })
                  }
                  unoptimized={true}
                  src={lpImgXs}
                  alt="landingPage"
                  style={{ cursor: "pointer" }}
                />
              </Box>
            </Grid>
            <Grid
              container
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
          </Grid>
          <ProjectHighlights />
          <Amenities
            openEnquiry={openEnquiry}
            setOpenEnquiry={setOpenEnquiry}
          />
          <Gallery setOpenImgSlider={setOpenImgSlider} />
          <Location />
          <Downloads
            openEnquiry={openEnquiry}
            setOpenEnquiry={setOpenEnquiry}
          />
          <Contact setOpenContactDialog={setOpenContactDialog} />
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
            onClick={() => setOpenContactDialog(true)}
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
              setOpenEnquiry({
                ...openEnquiry,
                isOpen: true,
              })
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
          openEnquiry={openEnquiry}
          setOpenEnquiry={setOpenEnquiry}
          setOpenContactDialog={setOpenContactDialog}
        />
        <EnquiryPopup
          openEnquiry={openEnquiry}
          setOpenEnquiry={setOpenEnquiry}
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
        />
        <CancelContactDialog
          openCancelContact={openCancelContact}
          setOpenCancelContact={setOpenCancelContact}
        />
      </Grid>
    </>
  );
};

export default Home;

const Enquiry = ({
  isVisible,
  openEnquiry,
  setOpenEnquiry,
  setOpenContactDialog,
}) => {
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

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    addFormData(userData)
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
      container
      xs={4}
      sx={{
        height: "100%",
        background: "#b13e5d",
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
      <Grid
        container
        item
        xs={11}
        md={9}
        style={{ background: "#762e2e", borderRadius: "5px", padding: "20px" }}
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
        <Grid item xs={6} md={4}>
          <Box
            style={{
              overflow: "hidden",
              position: "relative",
              height: "120px",
            }}
          >
            <Image
              fill
              style={{
                objectFit: "contain",
              }}
              unoptimized={true}
              src={theWorldOfJoy_logo}
              alt="theWorldOfJoy_logo"
            />
          </Box>
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
              +91 8750183040
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              onClick={() =>
                setOpenEnquiry({
                  ...openEnquiry,
                  heading: "Download Brochure",
                  isOpen: true,
                  bgColor: "#444543",
                })
              }
              sx={{
                width: { xs: "100%", md: "50%" },
                height: "40px",
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
        </Grid>
      </Grid>
    </Grid>
  );
};
Enquiry.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  openEnquiry: PropTypes.object.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};

const EnquiryPopup = ({ openEnquiry, setOpenEnquiry }) => {
  const closeTab = () => {
    setOpenEnquiry({
      ...openEnquiry,
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

  const submitForm = () => {
    if (errorMsgs?.userName || errorMsgs?.email || errorMsgs?.phoneNo) {
      return;
    }

    addFormData(userData)
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
      open={openEnquiry.isOpen}
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
          background: "black",
          maxWidth: { xs: "md", sm: "sm", md: "lg" },
          height: { xs: "50%", sm: "40%", md: "70%" },
          width: { xs: "100%", sm: "60%", md: "100%" },
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
          sx={{ background: openEnquiry.bgColor || "#444543", height: "100%" }}
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
              {openEnquiry.heading || "Enquire Now"}
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
          width="100%"
          justifyContent="center"
          sx={{
            background: "pink",
            position: "relative",
            display: { xs: "none", md: "flex" },
          }}
        >
          <Image
            fill
            // style={{
            //   objectFit: "cover",
            // }}
            unoptimized={true}
            src="https://www.urbanrisetheworldofjoy.com/lp-dsc/v1/images/mb.jpg"
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
};
EnquiryPopup.propTypes = {
  openEnquiry: PropTypes.object.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};

const ProjectHighlights = () => {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
        background: "#f3f3f3",
        padding: "20px 0",
        margin: "50px 0",
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
};

const Amenities = ({ openEnquiry, setOpenEnquiry }) => {
  return (
    <Grid
      container
      item
      xs={12}
      style={{ display: "flex", justifyContent: "center" }}
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
          AMENITIES
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
          The best in class amenities for a balanced life
        </Typography>
      </Grid>
      <Grid
        item
        xs={11}
        sm={12}
        sx={{
          width: "100%",
          height: { xs: "380px", sm: "550px", md: "700px" },
          padding: "0 10px",
          position: "relative",
        }}
      >
        <Image
          fill
          // style={{
          //   objectFit: "contain",
          // }}
          unoptimized={true}
          src={aminities_img}
          alt="aminities_img"
        />
      </Grid>
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
          alt="animated_gif"
          fill
          unoptimized={true}
          src="https://www.jubileeresidences.com/promos/google/aug-dsp-2020/images/book_site_visit.gif"
        />
        <Grid
          container
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
                setOpenEnquiry({
                  ...openEnquiry,
                  heading: "Book a Site Visit",
                  isOpen: true,
                })
              }
              variant="contained"
              style={{
                background: "#9BA11E",
                borderRadius: "20px",
                fontSize: "14px",
                color: "#000000",
                textTransform: "capitalize",
                fontWeight: "bold",
                height: "40px",
              }}
            >
              Book Now
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
Amenities.propTypes = {
  openEnquiry: PropTypes.object.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};

const Gallery = ({ setOpenImgSlider }) => {
  return (
    <Grid
      container
      item
      xs={12}
      style={{
        display: "flex",
        justifyContent: "center",
        marginBottom: "50px",
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
            sx={{ padding: "15px", height: "300px" }}
          >
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "5px",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  height: "100%",
                }}
              >
                <Image
                  onClick={() => setOpenImgSlider(true)}
                  fill
                  style={{
                    objectFit: "cover",
                  }}
                  unoptimized={true}
                  src={item}
                  alt={`gallery_img${index}`}
                />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

const Location = () => {
  return (
    <Grid
      container
      item
      xs={12}
      style={{ display: "flex", justifyContent: "center" }}
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
        style={{ margin: "20px 15px", width: "100%", position: "relative" }}
      >
        <Box
          sx={{
            overflow: "hidden",
            height: "700px",
            display: { xs: "none", md: "block" },
          }}
        >
          <Image fill unoptimized={true} src={location} alt="location" />
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            height: { xs: "500px", sm: "700px" },
            display: { xs: "block", md: "none" },
          }}
        >
          <Image fill unoptimized={true} src={locationXs} alt="locationXs" />
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={12}
        style={{ margin: "20px 15px", width: "100%", position: "relative" }}
      >
        <Box
          sx={{
            overflow: "hidden",
            height: { xs: "230px", sm: "350px", md: "700px" },
          }}
        >
          <Image
            fill
            unoptimized={true}
            src={location_advantages}
            alt="location_advantages"
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const Downloads = ({ openEnquiry, setOpenEnquiry }) => {
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
            padding: "10px 0",
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
            padding: "10px 0",
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
          padding: "20px 0",
        }}
      >
        {planList.map((item, index) => (
          <Grid
            container
            item
            key={item.name}
            xs={10}
            md={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              sx={{
                width: "100%",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Box
                style={{
                  overflow: "hidden",
                  position: "relative",
                  aspectRatio: "1/1",
                  height: "160px",
                }}
              >
                <Image
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  unoptimized={true}
                  src={item.img || ""}
                  alt={`${item.name}_img${index}`}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={() =>
                  setOpenEnquiry({
                    ...openEnquiry,
                    heading: item.name || "Enquire Now",
                    bgColor: item.bgColor || "#444543",
                    isOpen: true,
                  })
                }
                variant="contained"
                style={{
                  background: "#9BA11E",
                  borderRadius: "20px",
                  fontSize: "14px",
                  color: "#000000",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                  height: "40px",
                  width: "200px",
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
};
Downloads.propTypes = {
  openEnquiry: PropTypes.object.isRequired,
  setOpenEnquiry: PropTypes.func.isRequired,
};

const Contact = ({ setOpenContactDialog }) => {
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
        >
          <Box
            sx={{
              overflow: "hidden",
              position: "relative",
              height: { xs: "275px", md: "550px" },
            }}
          >
            <Image fill unoptimized={true} src={map} alt="map" />
          </Box>
        </Box>
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={5}
        style={{ paddingLeft: "30px", alignContent: "flex-start" }}
      >
        <Grid item xs={12} md={5} style={{ width: "100%", overflow: "hidden" }}>
          <Box
            style={{
              overflow: "hidden",
              position: "relative",
              height: "120px",
            }}
          >
            <Image
              fill
              style={{
                objectFit: "contain",
              }}
              unoptimized={true}
              src={theWorldOfJoy_logo}
              alt="theWorldOfJoy_logo"
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography
            component="h1"
            sx={{
              padding: "10px 0",
              fontSize: { xs: "30px", md: "40px" },
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
        <Grid item xs={12}>
          <Typography
            onClick={() => setOpenContactDialog(true)}
            component="h1"
            sx={{
              padding: "20px 0",
              fontSize: { xs: "25px", md: "32px" },
              borderBottom: "2px solid #3c3c3c",
              fontWeight: "bolder",
              letterSpacing: "6px",
              color: "#3c3c3c",
              cursor: "pointer",
            }}
          >
            +91 8750183040
          </Typography>
        </Grid>
        <Grid
          container
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "20px",
          }}
        >
          <Grid item xs={6} md={4} style={{ width: "100%" }}>
            <Box
              component="a"
              href="https://www.alliancein.com/"
              target="_blank"
            >
              <Box
                style={{
                  overflow: "hidden",
                  position: "relative",
                  height: "70px",
                }}
              >
                <Image
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  unoptimized={true}
                  src={alliance_logo}
                  alt="alliance_logo"
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} style={{ width: "100%" }}>
            <Box component="a" href="https://www.urbanrise.in/" target="_blank">
              <Box
                style={{
                  overflow: "hidden",
                  position: "relative",
                  height: "70px",
                }}
              >
                <Image
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  unoptimized={true}
                  src={urbanrise_logo}
                  alt="urbanrise_logo"
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const Footer = () => {
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
};

const ContactDialog = ({
  openContactDialog,
  setOpenContactDialog,
  setOpenCancelContact,
  setOpenConfirmContact,
}) => {
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
            padding: { xs: "10px", sm: "30px" },
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            fontSize: { xs: "22px", sm: "28px" },
            color: "#000000",
            display: "flex",
            justifyContent: "center",
            paddingBottom: "50px",
          }}
        >
          Are you looking to buy a property?
        </DialogTitle>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
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
};

const ConfirmContactDialog = ({
  openConfirmContact,
  setOpenConfirmContact,
  setOpenCancelContact,
}) => {
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
          padding: { xs: "10px", sm: "30px" },
        },
      }}
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{
          fontSize: { xs: "22px", sm: "28px" },
          color: "#000000",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "50px",
        }}
      >
        Are you intrested to speak to our project expert?
      </DialogTitle>
      <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleClose}
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
};

const CancelContactDialog = ({ openCancelContact, setOpenCancelContact }) => {
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
            padding: { xs: "10px", sm: "30px" },
            width: "400px",
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: "22px", color: "#000000" }}
        >
          Cancelled!
        </DialogTitle>
        <DialogActions>
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
};

const ImageSlider = ({ openImgSlider, setOpenImgSlider }) => {
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
                  <Image fill unoptimized={true} src={item} alt="location" />
                  <Grid
                    item
                    xs={12}
                    sx={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      display: "flex",
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
};

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), "public", "lp-images");
  const filenames = read(postsDirectory);

  const slugs = filenames.map((f) => f.split(path.sep).slice(0, -1)) || [];
  const paths = [
    { params: { slug: [] } },
    ...slugs.map((slug) => ({
      params: { slug },
    })),
  ];
  // console.log("Paths: ", JSON.stringify(paths));

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }) => {
  if (Array.isArray(params.slug) && params.slug.length) {
    params.lpImg = ["lp-images", ...params.slug, "bannerImg.jpg"];
    params.lpImgXs = ["lp-images", ...params.slug, "bannerImg_xs.jpg"];
  } else {
    params.lpImg = ["images", "db.webp"];
    params.lpImgXs = ["images", "mb.webp"];
  }
  params.lpImg = `/${params.lpImg.join("/")}`;
  params.lpImgXs = `/${params.lpImgXs.join("/")}`;
  console.log("Params: ", params);

  const lpImgAbsPath = path.join(process.cwd(), "public", params.lpImg);
  const imgDimensions = sizeOf(lpImgAbsPath);

  const lpImgXsAbsPath = path.join(process.cwd(), "public", params.lpImgXs);
  const imgXsDimensions = sizeOf(lpImgXsAbsPath);

  params.lpImgSize = imgDimensions;
  params.lpImgXsSize = imgXsDimensions;

  return {
    props: params,
  };
};
