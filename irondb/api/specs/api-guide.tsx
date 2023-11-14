import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
interface DocProps {
  specURL: string;
}
export default function APISpecDocs(props: DocProps) {
  return (
    <div>
      <BrowserOnly>
        {() => {
          const APIDocs = require("./apidocs").APIDocs;
          return (
            <div>
              <APIDocs specURL={props.specURL} />
            </div>
          );
        }}
      </BrowserOnly>
    </div>
  );
}
