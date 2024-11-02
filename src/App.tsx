import { ThemeProvider } from "@emotion/react";
import "./App.css";
import BenefitApplication from "./pages/BenefitApplication.page";
import theme from "./theme/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BenefitApplication />
      </ThemeProvider>
    </>
  );
}

export default App;
