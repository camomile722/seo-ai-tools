import { Global } from "@emotion/react";

const Fonts = () => (
    <Global
        styles={`
      /* Bogart-Regular */
      @font-face {
        font-family: 'Bogart-Regular';
 
        src: url('./fonts/bogart/Bogart-Regular-trial.ttf') 
      /* Biotif-Regular */
      @font-face {
        font-family: 'Biotif-Regular';
        src: url('./fonts/biotiff/Biotif-Regular.ttf;
      }
   
      `}
    />
);

export default Fonts;
