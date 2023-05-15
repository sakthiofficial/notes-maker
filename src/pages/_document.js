import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.4/jquery.min.js" />
        <link
          href="https://propstory.in/universe-chat-bot-html-template/css/worldofjoy-chatbot.css"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
