import "globals";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import GlobalStyle from "./globalStyle";

function reactInit(): void {
    const rootElement = document.getElementById("root");

    if (!rootElement) {
        console.error("No element with id 'app' found in the DOM.");
        return;
    }

    const root = createRoot(rootElement);
    root.render(
        <>
            <GlobalStyle />
            <RouterProvider router={router} />
        </>,
    );
}

reactInit();
