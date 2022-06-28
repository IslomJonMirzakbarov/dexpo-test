import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { Web3ReactProvider } from "@web3-react/core";
import { QueryClientProvider } from 'react-query';
import { queryClient } from './constants/queryClients'
import AlertProvider from "./providers/AlertProvider"
import GlobalFunctionsProvider from "./providers/GlobalFunctionsProvider"
import MaterialUIProvider from "./providers/MaterialUIProvider"
import Router from "./router"
import { persistor, store } from "./store"
import "./i18next"
import { Suspense } from "react"
import { ethers } from "ethers";
import PageFallback from "./components/PageFallback"
import MergedLayout from "./layouts/MergedLayout"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const getLibrary = (provider) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000; // frequency provider is polling
  return library;
};
function App() {

  return (
    <Suspense fallback={<PageFallback />} >
      <div className="App">
        <Provider store={store}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <PersistGate persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <MaterialUIProvider>
                  <AlertProvider>
                    <GlobalFunctionsProvider />
                    <BrowserRouter>
                      <MergedLayout>
                        <Router />
                      </MergedLayout>
                    </BrowserRouter>
                  </AlertProvider>
                </MaterialUIProvider>
              </QueryClientProvider>
            </PersistGate>
          </Web3ReactProvider>
        </Provider>
      </div>
    </Suspense>
  )
}

export default App
