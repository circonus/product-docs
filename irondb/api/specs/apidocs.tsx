import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

interface DocProps {
  specURL: string;
}

export function APIDocs(props: DocProps) {
  return <SwaggerUI url={useBaseUrl(props.specURL)} />;
}
