import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "@mantine/core/styles.css"
import "@mantine/dates/styles.css"
import "./index.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Provider } from "react-redux"
import { MantineProvider } from "@mantine/core"
import { store } from "./store.js"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider defaultColorScheme="dark">
          <App />
        </MantineProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
