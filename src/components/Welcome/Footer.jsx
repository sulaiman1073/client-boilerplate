import React from "react";
import strings from "../../helpers/localization";

function Footer() {
  return (
    <footer className="w-full px-4 py-8 bg-gradient-r-primary text-tertiaryText sm:px-16">
      <div className="grid grid-cols-1 gap-y-12 sm:flex sm:justify-start sm:space-x-20 sm:ml-10 sm:mt-6 my-8">
        <div className="space-y-4 text-center">
          <span className="mb-6 text-md font-bold">{strings.company}</span>
          <ul className="space-y-2 sm:text-xs text-md">
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://about.something.com/"
              >
                {strings.aboutSomething}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://medium.com/something"
              >
                {strings.blog}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://about.something.com/"
              >
                {strings.contact}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://www.saashub.com"
              >
                Status Page
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4 text-center">
          <span className="mb-4 text-md font-bold">{strings.legal}</span>
          <ul className="space-y-2  sm:text-xs text-md text-tertiaryText no-underline">
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://medium.com"
              >
                {strings.termsOfUse}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://medium.com/something"
              >
                {strings.privacyPolicy}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://medium.com/something"
              >
                {strings.copyright}
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-4 text-center">
          <span className="mb-4 text-md font-bold">{strings.community}</span>
          <ul className="space-y-2  sm:text-xs text-md">
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://discord.gg/something"
              >
                {strings.discord}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://twitter.com/something"
              >
                {strings.twitter}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://www.youtube.com/something"
              >
                {strings.youtube}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://www.facebook.com/something"
              >
                {strings.facebook}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-end text-xs mt-12">
        <p>© 2020 Something, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
