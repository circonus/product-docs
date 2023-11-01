import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

export default function APISpecDocs() {
  return (
    <div>
      <BrowserOnly>
        {() => {
          const APIDocs = require("./apidocs").APIDocs;
          return (
            <div>
              <APIDocs />
            </div>
          );
        }}
      </BrowserOnly>
    </div>
  );
}
