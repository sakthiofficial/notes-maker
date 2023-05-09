export default {
  appEnv: process.env.NEXT_PUBLIC_APPENV,
  buildNo: process.env.NEXT_PUBLIC_BUILDID,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  lsqConfig: {
    apiUrl: process.env.LSQ_APIURL,
    accessKey: process.env.LSQ_ACCESSKEY,
    secretKey: process.env.LSQ_SECRET,
  },
  gtm: {
    gtmId: process.env.NEXT_PUBLIC_GTM_GTMID,
    auth: process.env.NEXT_PUBLIC_AUTH,
    preview: process.env.NEXT_PUBLIC_PREVIEW,
  },
};
