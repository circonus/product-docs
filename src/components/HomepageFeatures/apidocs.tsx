import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import "swagger-ui-react/swagger-ui.css";
import SwaggerUI from "swagger-ui-react";

export function APIDocs() {
  return <SwaggerUI url={useBaseUrl(`/yaml/openapi.yaml`)} />;
}
