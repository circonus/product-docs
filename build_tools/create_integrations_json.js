var fs = require("fs"),
  fm = require("front-matter");

const integrationsFolder = "product-docs/circonus3/integrations/library/";

const integrationsObj = [
  {
    title: "Graphite (Pickle)",
    logo: { light: "/img/library/graphite.png" },
    attributes: {
      premium: false,
      implementation: "broker",
      legacy: false,
      deprecated: false,
    },
    tags: [],
    module: "graphite_pickle",
    no_listing: true,
  },
  {
    title: "Graphite (Plain)",
    logo: { light: "/img/library/graphite.png" },
    attributes: {
      premium: false,
      implementation: "broker",
      legacy: false,
      deprecated: false,
    },
    tags: [],
    module: "graphite_plain",
    no_listing: true,
  },
  {
    title: "Graphite",
    logo: { light: "/img/library/graphite.png" },
    attributes: {
      premium: false,
      implementation: "broker",
      legacy: false,
      deprecated: false,
    },
    tags: [],
    module: "graphite_tls",
    no_listing: true,
  },
  {
    title: "StatsD UDP",
    logo: { light: "/img/library/statsd.png" },
    attributes: {
      premium: false,
      implementation: "broker",
      legacy: true,
      deprecated: false,
    },
    tags: [],
    module: "statsd",
    no_listing: true,
  },
  {
    title: "StatsD TCP",
    logo: { light: "/img/library/statsd.png" },
    attributes: {
      premium: false,
      implementation: "broker",
      legacy: true,
      deprecated: false,
    },
    tags: [],
    module: "statsd_tcp",
    no_listing: true,
  },
  {
    title: "Resmon",
    logo: { light: "/img/library/resmon.png" },
    attributes: {
      premium: false,
      implementation: "broker",
      legacy: true,
      deprecated: false,
    },
    tags: [],
    module: "resmon",
    no_listing: true,
  },
  {
    title: "MacOS/Darwin",
    attributes: {
      premium: true,
      implementation: "cua",
      legacy: false,
      deprecated: false,
    },
    tags: [],
    module: "httptrap:cua:host:darwin",
    no_listing: true,
  },
  {
    title: "FreeBSD",
    attributes: {
      premium: true,
      implementation: "cua",
      legacy: false,
      deprecated: false,
    },
    tags: [],
    module: "httptrap:cua:host:freebsd",
  },
  {
    title: "Linux",
    attributes: {
      premium: true,
      implementation: "",
      legacy: false,
      deprecated: false,
    },
    tags: [],
    module: "httptrap:cua:host:linux",
  },
  {
    title: "Windows",
    attributes: {
      premium: true,
      implementation: "",
      legacy: false,
      deprecated: false,
    },
    tags: [],
    module: "httptrap:cua:host:windows",
  },
];

const createIntegrationsJSON = function (data, fileName) {
  var content = fm(data);

  const payload = {
    name: fileName,
    title: content.attributes.title,
    content: content.body,
    logo: {
      light: content.attributes.logo_light,
      dark: content.attributes.logo_dark,
    },
    attributes: {
      premium: content.attributes.premium,
      implementation: content.attributes.implementation,
      legacy: content.attributes.legacy,
      deprecated: content.attributes.deprecated,
    },
    tags: content.attributes.tags,
    module: content.attributes.module,
  };
  integrationsObj.push(payload);
};

fs.readdirSync(integrationsFolder).forEach((file) => {
  const data = fs.readFileSync(
    `circonus3/integrations/library/${file}`,
    "utf8"
  );
  createIntegrationsJSON(data, file.split(".")[0]);
});

fs.writeFileSync(
  "static/circonus/integrations_library.json",
  JSON.stringify(integrationsObj)
);
