import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmModalProvider, ErrorModalProvider, ErrorRedirectModalProvider, SuccessModalProvider, SuccessRedirectModalProvider } from './context/ModalContext.tsx'
import { SelectUserProvider, UserProvider, UsersProvider } from './context/UserContext.tsx'
import { LoggedProvider } from './context/LoggedContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <LoggedProvider>
    <UserProvider>
      <UsersProvider>
        <SelectUserProvider>
          <SuccessRedirectModalProvider>
      <ErrorRedirectModalProvider>
        <SuccessModalProvider>
          <ErrorModalProvider>
            <ConfirmModalProvider>
              <App />
            </ConfirmModalProvider>
          </ErrorModalProvider>
        </SuccessModalProvider>
      </ErrorRedirectModalProvider>
    </SuccessRedirectModalProvider>
        </SelectUserProvider>
      </UsersProvider>
    </UserProvider>
    </LoggedProvider>
    </BrowserRouter>
  </StrictMode>,
)
