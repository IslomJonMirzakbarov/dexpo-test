import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { QueryClientProvider } from 'react-query';
import { queryClient } from './constants/queryClients'
import AlertProvider from "./providers/AlertProvider"
import GlobalFunctionsProvider from "./providers/GlobalFunctionsProvider"
import MaterialUIProvider from "./providers/MaterialUIProvider"
import Router from "./router"
import { persistor, store } from "./store"
import "./i18next"
import { Suspense } from "react"
import PageFallback from "./components/PageFallback"
import MergedLayout from "./layouts/MergedLayout"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Suspense fallback={<PageFallback />} >
      <div className="App">
        <Provider store={store}>
            <PersistGate persistor={persistor}>
              <QueryClientProvider client={queryClient}>
                <MaterialUIProvider>
                  <AlertProvider>
                    <GlobalFunctionsProvider />
                    <BrowserRouter>
                      <MergedLayout>
                        <ScrollToTop>
                          <Router />
                        </ScrollToTop>
                      </MergedLayout>
                    </BrowserRouter>
                  </AlertProvider>
                </MaterialUIProvider>
              </QueryClientProvider>
            </PersistGate>
        </Provider>
      </div>
    </Suspense>
  )
}

export default App
