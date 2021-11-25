var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// <stdin>
__export(exports, {
  assets: () => import_assets.default,
  entry: () => entry,
  routes: () => routes
});

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React = __toModule(require("react"));

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
var import_server = __toModule(require("react-dom/server"));
var import_remix = __toModule(require("remix"));
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  const markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route-module:/home/pedro/Documents/portfolio/ilher.dev/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  loader: () => loader
});
var React2 = __toModule(require("react"));
var import_remix5 = __toModule(require("remix"));

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-4WAQPF6E.css";

// app/styles/app.css
var app_default = "/build/_assets/app-YQPDREUM.css";

// app/styles/no-script.css
var no_script_default = "/build/_assets/no-script-3BRMBVAP.css";

// app/components/navbar.tsx
var import_clsx2 = __toModule(require("clsx"));
var import_fa = __toModule(require("react-icons/fa"));

// app/providers/theme-provider.tsx
var import_react = __toModule(require("react"));
var import_remix2 = __toModule(require("remix"));
var ThemeContext = (0, import_react.createContext)(void 0);
var ThemeProvider = ({
  initialTheme,
  children
}) => {
  const [theme, setTheme] = (0, import_react.useState)(initialTheme);
  const changeTheme = (0, import_react.useCallback)((nextTheme) => setTheme(nextTheme), []);
  const themeFetcher = (0, import_remix2.useFetcher)();
  const themeFetcherRef = (0, import_react.useRef)(themeFetcher);
  (0, import_react.useEffect)(() => {
    themeFetcherRef.current = themeFetcher;
  }, [themeFetcher]);
  const firstMount = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (!firstMount.current) {
      firstMount.current = true;
      return;
    }
    if (!theme)
      return;
    themeFetcherRef.current.submit({ theme }, { action: "actions/theme", method: "post" });
  }, [theme]);
  return /* @__PURE__ */ React.createElement(ThemeContext.Provider, {
    value: { theme, changeTheme }
  }, children);
};
var useTheme = () => {
  const context = (0, import_react.useContext)(ThemeContext);
  if (!context)
    throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

// app/components/anchor.tsx
var import_remix3 = __toModule(require("remix"));
var import_clsx = __toModule(require("clsx"));
var Anchor = ({
  href,
  className,
  children,
  underline = true,
  external = false
}) => {
  if (external)
    return /* @__PURE__ */ React.createElement("a", {
      href,
      className: (0, import_clsx.default)(className, { "hover:underline": underline })
    }, children);
  return /* @__PURE__ */ React.createElement(import_remix3.Link, {
    to: href,
    className: (0, import_clsx.default)(className, { "hover:underline": underline })
  }, children);
};
var anchor_default = Anchor;

// app/components/navbar.tsx
var ThemeChanger = () => {
  const { theme, changeTheme } = useTheme();
  return /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: () => {
      changeTheme(theme === "dark" ? "light" : "dark");
    },
    className: "inline-flex items-center justify-center h-14 focus:outline-none overflow-hidden transition"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative w-8 h-8"
  }, /* @__PURE__ */ React.createElement("span", {
    className: (0, import_clsx2.default)("absolute inset-0 text-black dark:text-white transform transition duration-500 flex justify-center items-center", {
      "opacity-0": theme === "light",
      "opacity-1": theme === "dark"
    })
  }, /* @__PURE__ */ React.createElement(import_fa.FaMoon, {
    size: 28
  })), /* @__PURE__ */ React.createElement("span", {
    className: (0, import_clsx2.default)("absolute inset-0 text-black dark:text-white transform transition duration-500 flex justify-center items-center", {
      "opacity-0": theme === "dark",
      "opacity-1": theme === "light"
    })
  }, /* @__PURE__ */ React.createElement(import_fa.FaSun, {
    size: 28
  }))));
};
var Navbar = () => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "px-5vw py-4 lg:py-12"
  }, /* @__PURE__ */ React.createElement("nav", {
    className: "text-black dark:text-white max-w-8xl flex justify-between items-center mx-auto"
  }, /* @__PURE__ */ React.createElement(anchor_default, {
    href: "/",
    underline: true,
    className: "dark:text-white text-2xl lg:text-4xl font-bold"
  }, "Pedro Reis"), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "noscript-hidden"
  }, /* @__PURE__ */ React.createElement(ThemeChanger, null)), /* @__PURE__ */ React.createElement("span", {
    className: "hidden ml-6 lg:block"
  }, /* @__PURE__ */ React.createElement(anchor_default, {
    external: true,
    underline: false,
    href: "mailto:pedro@ilher.dev",
    className: "no-underline bg-accent text-white hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white px-6 py-2 rounded-full text-md transition-colors"
  }, "Let's chat")))));
};

// app/components/layout.tsx
var Layout = ({ children }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: "min-h-full"
  }, /* @__PURE__ */ React.createElement(Navbar, null), children);
};

// app/sessions/theme.server.ts
var import_remix4 = __toModule(require("remix"));
var themeStorage = (0, import_remix4.createCookieSessionStorage)({
  cookie: {
    name: "@ilher/theme",
    secure: true,
    secrets: ["le_secret"],
    sameSite: "lax",
    path: "/",
    expires: new Date("2088-10-18"),
    httpOnly: true
  }
});
var getThemeSession = async (request) => {
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme() {
      const themeValue = session.get("theme");
      return themeValue === "dark" || themeValue === "light" ? themeValue : "dark";
    },
    setTheme(theme) {
      session.set("theme", theme);
    },
    commit() {
      return themeStorage.commitSession(session);
    }
  };
};

// route-module:/home/pedro/Documents/portfolio/ilher.dev/app/root.tsx
var links = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap"
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap"
    },
    { rel: "stylesheet", href: tailwind_default },
    { rel: "stylesheet", href: app_default }
  ];
};
var loader = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  return {
    theme: themeSession.getTheme()
  };
};
function App() {
  const data = (0, import_remix5.useLoaderData)();
  return /* @__PURE__ */ React2.createElement(ThemeProvider, {
    initialTheme: data.theme
  }, /* @__PURE__ */ React2.createElement(Document, null, /* @__PURE__ */ React2.createElement(Layout, null, /* @__PURE__ */ React2.createElement(import_remix5.Outlet, null))));
}
function Document({
  children,
  title
}) {
  const { theme } = useTheme();
  return /* @__PURE__ */ React2.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React2.createElement("head", null, /* @__PURE__ */ React2.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React2.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), title ? /* @__PURE__ */ React2.createElement("title", null, title) : null, /* @__PURE__ */ React2.createElement(import_remix5.Meta, null), /* @__PURE__ */ React2.createElement("link", {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: ""
  }), /* @__PURE__ */ React2.createElement(import_remix5.Links, null), /* @__PURE__ */ React2.createElement("noscript", null, /* @__PURE__ */ React2.createElement("link", {
    rel: "stylesheet",
    href: no_script_default
  }))), /* @__PURE__ */ React2.createElement("body", {
    className: theme
  }, children, /* @__PURE__ */ React2.createElement(RouteChangeAnnouncement, null), /* @__PURE__ */ React2.createElement(import_remix5.ScrollRestoration, null), /* @__PURE__ */ React2.createElement(import_remix5.Scripts, null), process.env.NODE_ENV === "development" && /* @__PURE__ */ React2.createElement(import_remix5.LiveReload, null)));
}
function CatchBoundary() {
  const caught = (0, import_remix5.useCatch)();
  let message;
  switch (caught.status) {
    case 401:
      message = /* @__PURE__ */ React2.createElement("p", null, "Oops! Looks like you tried to visit a page that you do not have access to.");
      break;
    case 404:
      message = /* @__PURE__ */ React2.createElement("p", null, "Oops! Looks like you tried to visit a page that does not exist.");
      break;
    default:
      throw new Error(caught.data || caught.statusText);
  }
  return /* @__PURE__ */ React2.createElement(Document, {
    title: `${caught.status} ${caught.statusText}`
  }, /* @__PURE__ */ React2.createElement("h1", null, caught.status, ": ", caught.statusText), message);
}
function ErrorBoundary({ error }) {
  console.error(error);
  return /* @__PURE__ */ React2.createElement(Document, {
    title: "Error!"
  }, /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement("h1", null, "There was an error"), /* @__PURE__ */ React2.createElement("p", null, error.message), /* @__PURE__ */ React2.createElement("hr", null), /* @__PURE__ */ React2.createElement("p", null, "Hey, developer, you should replace this with what you want your users to see.")));
}
var RouteChangeAnnouncement = React2.memo(() => {
  const [hydrated, setHydrated] = React2.useState(false);
  const [innerHtml, setInnerHtml] = React2.useState("");
  const location = (0, import_remix5.useLocation)();
  React2.useEffect(() => {
    setHydrated(true);
  }, []);
  const firstRenderRef = React2.useRef(true);
  React2.useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    const pageTitle = location.pathname === "/" ? "Home page" : document.title;
    setInnerHtml(`Navigated to ${pageTitle}`);
  }, [location.pathname]);
  if (!hydrated) {
    return null;
  }
  return /* @__PURE__ */ React2.createElement("div", {
    "aria-live": "assertive",
    "aria-atomic": true,
    id: "route-change-region",
    style: {
      border: "0",
      clipPath: "inset(100%)",
      clip: "rect(0 0 0 0)",
      height: "1px",
      margin: "-1px",
      overflow: "hidden",
      padding: "0",
      position: "absolute",
      width: "1px",
      whiteSpace: "nowrap",
      wordWrap: "normal"
    }
  }, innerHtml);
});

// route-module:/home/pedro/Documents/portfolio/ilher.dev/app/routes/actions/theme.tsx
var theme_exports = {};
__export(theme_exports, {
  action: () => action
});
var import_remix6 = __toModule(require("remix"));
var isTheme = (value) => {
  return typeof value === "string" && (value === "dark" || value === "light");
};
var action = async ({ request }) => {
  const themeSession = await getThemeSession(request);
  const requestText = await request.text();
  const selectedTheme = new URLSearchParams(requestText).get("theme");
  if (!isTheme(selectedTheme)) {
    return (0, import_remix6.json)({
      success: false,
      message: `${selectedTheme} is not a valid theme.`
    });
  }
  themeSession.setTheme(selectedTheme);
  return (0, import_remix6.json)({ success: true, message: `${selectedTheme} theme is now set!` }, { headers: { "Set-Cookie": await themeSession.commit() } });
};

// route-module:/home/pedro/Documents/portfolio/ilher.dev/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => routes_default
});
var Index = () => {
  return /* @__PURE__ */ React.createElement("div", null, "index");
};
var routes_default = Index;

// <stdin>
var import_assets = __toModule(require("./assets.json"));
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/actions/theme": {
    id: "routes/actions/theme",
    parentId: "root",
    path: "actions/theme",
    index: void 0,
    caseSensitive: void 0,
    module: theme_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=/build/index.js.map
