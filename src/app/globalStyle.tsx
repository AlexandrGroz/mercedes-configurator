import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root {
    /*Project colors*/
    --LIGHT_100: #ffffff;
    --LIGHT_50: #fafafa;
    --LIGHT_25: #e9e9eb;
    --LIGHT_0: #575757;

    --DARK_100: #202020;

    --SUCCESS_100: #77b39c;
    --SUCCESS_50: #a8d9c6;

    --WARNING_100: #dea06a;
    --WARNING_50: #f9d1af;

    --ERROR_100: #ff7878;
    --ERROR_50: #fdb5b5;

    --SHADOW_100:#d0d0d0;
    --SHADOW_25:#e6e1e1;

    --STANDARD_FONT: var(--DARK_100);
  }

  /**Base**/
  body, html{
    margin: 0;
    padding: 0;
    width: 100%;
    font-size: 16px;
    font-family: "Manrope", serif;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    color: var(--STANDARD_FONT);
    background: var(--LIGHT_25);
    
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    /*Media*/
    /*90%*/
    @media (min-width: 2000px) {
      font-size: 26px;
    }

    /*110%*/
    @media (min-width: 1800px) {
    }
    
    /*125%*/
    @media (min-width: 1600px) {
      font-size: 24px;
    }

    /*150%*/
    @media (min-width: 1400px) {
    }

    /*175%*/
    @media (min-width: 1200px) {
      font-size: 22px;
    }

    /*200%*/
    @media (min-width: 1000px) {
    }

    /**Phone**/
    /*250%*/
    @media (min-width: 900px) {
      font-size: 20px;
    }

    /*300%*/
    @media (min-width: 700px) {
    }

    /*400%*/
    @media (min-width: 600px) {
      font-size: 18px;
    }

    /*500%*/
    @media (max-width: 400px) {
    }
  }

  *:focus {
    outline: none;
  }

  a{
    text-decoration: none;
    color: var(--STANDARD_FONT)
  }

  /*Scrollbar*/
  ::-webkit-scrollbar {
    width: 0.3rem;
  }

  ::-webkit-scrollbar-track {
    opacity: 0;
    background: var(--LIGHT_25);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1rem;
    background: var(--DARK_100);
  }
`;

export default GlobalStyle;
