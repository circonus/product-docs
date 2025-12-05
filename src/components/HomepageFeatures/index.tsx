import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Circonus",
    link: "/circonus/getting-started/introduction",
  },
  {
    title: "IRONdb",
    link: "https://docs.apica.io/irondb",
  },
  {
    title: "CAQL",
    link: "/caql/getting-started",
  },
];

function Feature({ title, link }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div style={{ padding: 10 }}>
        <Link
          className="button button--secondary button--lg"
          to={link}
          style={{ width: "100%" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 10,
            }}
          >
            <div>{title}</div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
