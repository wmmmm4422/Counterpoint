import { createGlobalStyle, ThemeProvider } from "styled-components";
import useResize from "utils/hooks/useResize";

import { useEffect } from "react";

import Head from "next/head";

//gtag
import Script from "next/script";
import { useRouter } from "next/router";
import { pageView } from "lib/ga";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;


    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none;
    font-family: Barlow;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, h6, p{
    margin: 0;
    padding: 0;
  }


  



  input {
    border-radius: 0;
    -webkit-appearance: none;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type=number] {
    -moz-appearance: textfield;
  }
  

  .yt-lite {
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: context-menu;
  }
  
  .yt-lite {
    transition: all 1s linear;
  }
  
  .lty-playbtn {
    background: pink;
  }


  /* Mapbox: Current Position Pin */
.mapboxgl-ctrl-top-right {
}

.mapboxgl-ctrl {
  opacity: 0 !important;
}

.mapboxgl-ctrl-geolocate {
  opacity: 0 !important;
  width: 100px !important;
  background: rgba(255, 255, 255, 0.7) !important;
}

.mapboxgl-ctrl-icon {
  opacity: 0 !important;
}

  
  
`;

function MyApp({ Component, pageProps }) {
  const [windowWidth, windowHeight] = useResize();
  const router = useRouter();
  useEffect(() => {
    //pageView
    const handleRouteChange = (url) => pageView(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      <Head>
        <title>Internetinental: Web-based Artworks around Interconnectivity</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-2D4T5PS78F" strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2D4T5PS78F');
        `}
      </Script>

      <GlobalStyle />
      <ThemeProvider theme={{ windowWidth, windowHeight }}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
