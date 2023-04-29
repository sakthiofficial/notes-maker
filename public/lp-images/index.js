const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");
const url = require("url");

const URLS = [
  "https://urbanrisetheworldofjoy.com",
  "https://urbanrisetheworldofjoy.com/promos/lp-dsc/v2",
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

const processPageUrl = async (pageUrl) => {
  console.log(`Processing URL: ${pageUrl}`);
  const folder = url.parse(pageUrl).pathname.substring(1);
  if (!fs.existsSync(folder)) {
    console.log("Creating: ", folder);
    fs.mkdirSync(folder, { recursive: true }, (err) => {});
  } else {
    console.log("Skipping: ", folder);
  }

  const imgPathD = `./${folder}/bannerImg.jpg`;
  const imgPathM = `./${folder}/bannerImg_xs.jpg`;

  if (fs.existsSync(imgPathD) && fs.existsSync(imgPathM)) {
    console.log("Image already exists, skipping");
    return;
  }

  console.log("Getting URL");
  const pageHTML = await axios.get(pageUrl);
  console.log("Parsing");
  const $ = cheerio.load(pageHTML.data);

  if (!$(".hidden-sm").length || !$(".hidden-lg").length) {
    console.log("Banner not found for element");
    return;
  }

  const elementD = $(".hidden-sm").first();
  const imgSrcD = $(elementD).attr("src");
  const srcUrlD = `${pageUrl}/${imgSrcD}`;

  console.log("Downloading image from URL: ", srcUrlD);
  const imgRespD = await axios.default.get(srcUrlD, {
    responseType: "stream",
  });
  imgRespD.data.pipe(fs.createWriteStream(imgPathD));

  ///  mobile responsive images  ///

  const elementM = $(".hidden-lg").first();
  const imgSrcM = $(elementM).attr("src");
  const srcUrlM = `${pageUrl}/${imgSrcM}`;

  console.log("Downloading xs image from URL: ", srcUrlM);
  const imgRespM = await axios.default.get(srcUrlM, {
    responseType: "stream",
  });
  imgRespM.data.pipe(fs.createWriteStream(imgPathM));
};

const run = async () => {
  const promises = [];
  for (let i = 0; i < URLS.length; i += 1) {
    const pageUrl = URLS[i];
    promises.push(processPageUrl(pageUrl));
  }
  await Promise.all(promises);
};

run();
