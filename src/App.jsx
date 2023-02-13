import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClientProvider } from 'react-query'
import { queryClient } from './constants/queryClients'
import { Toaster } from 'react-hot-toast'
import { persistor, store } from './store'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import AlertProvider from './providers/AlertProvider'
import GlobalFunctionsProvider from './providers/GlobalFunctionsProvider'
import MaterialUIProvider from './providers/MaterialUIProvider'
import Router from './router'
import Loader from './components/Loader'
import MergedLayout from './layouts/MergedLayout'
import ScrollToTop from './components/ScrollToTop'
import './i18n.js'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SEO from './components/SEO'

import 'nprogress/nprogress.css'

const toastOptions = {
  duration: 3000,
  success: {
    duration: 3000
  }
}

function App() {
  const { t } = useTranslation()

  return (
    <Suspense fallback={<Loader />}>
      <div className='App'>
        <SEO
          title={t('HOME_TITLE')}
          description={t('HOME_DESCRIPTION')}
          keywords={t('HOME_KEYWORDS')}
        />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <QueryClientProvider client={queryClient}>
              <MaterialUIProvider>
                <Toaster position='top-center' toastOptions={toastOptions} />

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
