import React from "react";
import CreateNewAccountForm from "../components/Forms/CreateNewAccountForm";
import Helmet from "react-helmet";
import strings from "../helpers/localization";
import DescriptionSection from "../components/Welcome/DescriptionSection";
import WelcomeVideo from "../components/Welcome/WelcomeVideo";
import Footer from "../components/Welcome/Footer";

function WelcomePage(props) {
  return (
    <div className="w-full h-full">
      <section
        className="sm:flex-row sm:py-0 sm:px-16
        // flex flex-col bg-primaryBackground justify-around items-center px-8 py-8 shadow-xl"
      >
        <WelcomeVideo />
        <div
          className="sm:w-102 sm:rounded-lg sm:shadow-xs sm:hover:shadow-channel sm:mx-4 sm:my-8 
          // w-full bg-primaryBackground px-4 py-8 my-16 duration-100"
        >
          <CreateNewAccountForm {...props} />
        </div>
      </section>
      <DescriptionSection />
      <Footer />
      <Helmet>
        <meta charSet="UFT-8" />
        <title>{strings.loginPageTitle}</title>
        <meta name="description" content={strings.loginPageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={strings.mainKeywords} />
      </Helmet>
    </div>
  );
}

export default WelcomePage;
