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
                href="https://about.popitalk.com/"
              >
                {strings.aboutPopitalk}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://medium.com/popitalk"
              >
                {strings.blog}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://about.popitalk.com/"
              >
                {strings.contact}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://www.saashub.com/popitalk-status"
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
                href="https://medium.com/popitalk/end-user-license-agreement-and-terms-of-service-dc8a25c0f5d2?source=friends_link&sk=2150df3f6e097d60599c30a5d3e8942a"
              >
                {strings.termsOfUse}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://medium.com/popitalk/privacy-policy-ab89684edca6?source=friends_link&sk=555c056e49c784af16481f96f8dcbfe3"
              >
                {strings.privacyPolicy}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://medium.com/popitalk/copyright-policy-872f41dd7856?sk=38c4ab2d90555ed5ee6fe85373e06584"
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
                href="https://discord.gg/hdFfgg7"
              >
                {strings.discord}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://twitter.com/PopitalkT"
              >
                {strings.twitter}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://www.youtube.com/channel/UCJSjPolz6SiYKvVxFmK-Z1A"
              >
                {strings.youtube}
              </a>
            </li>
            <li>
              <a
                className="text-tertiaryText no-underline"
                href="https://www.facebook.com/popitalk"
              >
                {strings.facebook}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-end text-xs mt-12">
        <p>© 2020 Popitalk, Inc. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
