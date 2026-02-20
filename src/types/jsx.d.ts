// Minimal JSX namespace for TypeScript when using "jsx": "react-jsx"
// This file ensures the global JSX namespace is available for TS builds.

import * as React from "react";

declare global {
  namespace JSX {
    // The Element type produced by JSX expressions
    type Element = React.JSX.Element;
    // Intrinsic elements mapping (e.g., div, svg)
    interface IntrinsicElements extends React.JSX.IntrinsicElements {}
    // Allow fragments
    interface ElementClass {}
    interface ElementAttributesProperty {
      props: {};
    }
  }
}

export {};
