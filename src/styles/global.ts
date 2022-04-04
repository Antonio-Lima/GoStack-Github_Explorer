import { createGlobalStyle } from "styled-components";

// import { githubBackground } from 'https://xesque.rocketseat.dev/platform/1587379725719-attachment.svg';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body { 
        background: #F0F0F5 url(https://xesque.rocketseat.dev/platform/1587379725719-attachment.svg) no-repeat 70% top;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font-size: 16px;
        font-family: Roboto, sans-serif;
    }

    #root {
        max-width: 960px;
        margin: 0 auto;
        padding: 40px 20px;
    }

    button { 
        cursor: pointer;
    }
`;