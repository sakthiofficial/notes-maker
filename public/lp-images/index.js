const fs = require("fs");
const url = require("url");
const axios = require("axios");
const puppeteer = require("puppeteer");

const URLS = [
  // "https://urbanrisetheworldofjoy.com",
  // "https://urbanrisetheworldofjoy.com/promos/lp-dsc/v2",
  "https://urbanrisetheworldofjoy.com/lp-dsc",
  "https://urbanrisetheworldofjoy.com/lp-dsc/v1",
  "https://urbanrisetheworldofjoy.com/lp-dsc/v6",
  "https://urbanrisetheworldofjoy.com/lp-dsc/3bhk-apartments-in-siruseri",
  "https://urbanrisetheworldofjoy.com/taboola/2bhk",
  "https://urbanrisetheworldofjoy.com/taboola/3bhk",
  "https://urbanrisetheworldofjoy.com/taboola/living-room",
  "https://urbanrisetheworldofjoy.com/taboola/tamil-1",
  "https://urbanrisetheworldofjoy.com/taboola/3bhk-bedroom",
  "https://urbanrisetheworldofjoy.com/taboola/2bhk-livingroom",
  "https://urbanrisetheworldofjoy.com/taboola/emi-v1",
  "https://urbanrisetheworldofjoy.com/taboola/permium-apartments-v1",
  "https://urbanrisetheworldofjoy.com/taboola/permium-apartments-v2",
  "https://urbanrisetheworldofjoy.com/taboola/new-dreams",
  "https://urbanrisetheworldofjoy.com/taboola/interior-1",
  "https://urbanrisetheworldofjoy.com/taboola/interior-2",
  "https://urbanrisetheworldofjoy.com/taboola/interior-3",
  "https://urbanrisetheworldofjoy.com/taboola/interior-4",
  "https://urbanrisetheworldofjoy.com/taboola/interior-5",
  "https://urbanrisetheworldofjoy.com/lp-text",
  "https://urbanrisetheworldofjoy.com/lp-text/v1",
  "https://urbanrisetheworldofjoy.com/lp-text/navalur",
  "https://urbanrisetheworldofjoy.com/lp-text/kelambakkam",
  "https://urbanrisetheworldofjoy.com/lp-text/sholinganallur",
  "https://urbanrisetheworldofjoy.com/lp-dsp",
  "https://urbanrisetheworldofjoy.com/lp-dsp/no-form",
  "https://urbanrisetheworldofjoy.com/lp-dsp/apartments-in-siruseri",
];

const getBgStyles = (page, selector) => {
  return page.$eval(selector, (el) => {
    const compStyles = window.getComputedStyle(el);
    const backgroundColor = compStyles.getPropertyValue("background-color");
    const backgroundImage = compStyles.getPropertyValue("background-image");
    return {
      backgroundColor,
      backgroundImage,
    };
  });
};

const downloadImages = async (page, imgPathD, imgPathM) => {
  const pageUrl = await page.url();

  const imgSrcD = await page
    .$eval(".main-container .hidden-sm", (img) => img.getAttribute("src"))
    .catch(() => "");

  if (imgSrcD && !fs.existsSync(imgPathD)) {
    console.log("Dowloading main banner image");

    const srcUrlD = `${pageUrl}${imgSrcD}`;

    console.log("Main Image URL: ", srcUrlD);
    const imgRespD = await axios.default.get(srcUrlD, {
      responseType: "stream",
    });
    imgRespD.data.pipe(fs.createWriteStream(imgPathD));
  } else {
    console.log("Skipping main banner image");
  }

  ///  Mobile Responsive Images  ///

  const imgSrcM = await page
    .$eval(".main-container .hidden-lg", (img) => img.getAttribute("src"))
    .catch(() => "");

  if (imgSrcM && !fs.existsSync(imgPathM)) {
    console.log("Dowloading mobile banner image");

    const srcUrlM = `${pageUrl}${imgSrcM}`;

    console.log("Mobile Image URL: ", srcUrlM);
    const imgRespM = await axios.default.get(srcUrlM, {
      responseType: "stream",
    });
    imgRespM.data.pipe(fs.createWriteStream(imgPathM));
  } else {
    console.log("Skipping mobile banner image");
  }
};

const extractPageProps = async (page, pagePropsPath) => {
  if (fs.existsSync(pagePropsPath)) {
    console.log(
      `Page props already exists at path: ${pagePropsPath}; Skipping`
    );
    return;
  }

  console.log("Extracting page props");

  const styleInfo = {};
  console.log("Getting sidebar color");
  try {
    const sidebar = await getBgStyles(page, ".sidebar");
    styleInfo.sidebar = sidebar;
  } catch (err) {
    console.log("Sidebar not found, skipping");
  }

  console.log("Getting sidebar form color");
  try {
    const sidebarForm = await getBgStyles(page, ".sidebar-form");
    styleInfo.sidebarForm = sidebarForm;
  } catch (err) {
    console.log("Sidebar Form not found, skipping");
  }

  console.log(styleInfo);

  const formExists = await page.$eval("form", () => true).catch(() => false);
  console.log(`No Form: ${!formExists}`);

  const pageProps = {
    styleInfo,
    noForm: !formExists,
  };

  console.log("Saving page props to file");
  fs.writeFile(pagePropsPath, JSON.stringify(pageProps), () => {});
};

const processPageUrl = async (pageUrl, browser) => {
  console.log(`Processing URL: ${pageUrl}`);
  const folder = url.parse(pageUrl).pathname.substring(1);
  if (!fs.existsSync(folder)) {
    console.log("Creating: ", folder);
    fs.mkdirSync(folder, { recursive: true }, () => {});
  } else {
    console.log("Skipping: ", folder);
  }

  const imgPathD = `./${folder}/bannerImg.jpg`;
  const imgPathM = `./${folder}/bannerImg_xs.jpg`;
  const pagePropsPath = `./${folder}/pageProps.json`;

  if (
    fs.existsSync(imgPathD) &&
    fs.existsSync(imgPathM) &&
    fs.existsSync(pagePropsPath)
  ) {
    console.log("All required files exist, skipping");
    return;
  }

  console.log("Getting URL");
  const page = await browser.newPage();
  await page.goto(pageUrl, { waitUntil: "networkidle0" });

  console.log("Extracting Page Props");
  await extractPageProps(page, pagePropsPath);

  console.log("Downloading Images");
  await downloadImages(page, imgPathD, imgPathM);

  await page.close();
};

const run = async () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

  const promises = [];
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: false,
  });
  for (let i = 0; i < URLS.length; i += 1) {
    const pageUrl = URLS[i];
    promises.push(processPageUrl(pageUrl, browser));
  }
  await Promise.all(promises);

  await browser.close();
};

// run();
