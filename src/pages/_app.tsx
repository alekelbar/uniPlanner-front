// pages/_app.tsx
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "@/config/theme/createEmotionCache";
import { Provider } from "react-redux";
import { store } from "@/redux";
import { LayoutComponent } from "@/components/Layout/Layout";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

// later we'll modify this to its own file
const theme = createTheme();
export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp (props: MyAppProps) {
  // If there's no emotionCache rendered by the server, use the clientSideEmotionCache
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </ThemeProvider>
      </CacheProvider>
    </Provider>
  );
}
