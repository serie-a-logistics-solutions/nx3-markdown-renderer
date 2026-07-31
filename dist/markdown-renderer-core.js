var $r = Object.defineProperty;
var Hr = (e, t, r) => t in e ? $r(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Me = (e, t, r) => Hr(e, typeof t != "symbol" ? t + "" : t, r);
/*! @license DOMPurify 3.4.12 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.12/LICENSE */
function En(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Fr(e) {
  if (Array.isArray(e)) return e;
}
function Gr(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, a, c, o, s = [], d = !0, g = !1;
    try {
      if (c = (r = r.call(e)).next, t !== 0) for (; !(d = (n = c.call(r)).done) && (s.push(n.value), s.length !== t); d = !0) ;
    } catch (u) {
      g = !0, a = u;
    } finally {
      try {
        if (!d && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (g) throw a;
      }
    }
    return s;
  }
}
function Wr() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function jr(e, t) {
  return Fr(e) || Gr(e, t) || Kr(e, t) || Wr();
}
function Kr(e, t) {
  if (e) {
    if (typeof e == "string") return En(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? En(e, t) : void 0;
  }
}
const Wn = Object.entries, Tn = Object.setPrototypeOf, qr = Object.isFrozen, Zr = Object.getPrototypeOf, Yr = Object.getOwnPropertyDescriptor;
let ie = Object.freeze, oe = Object.seal, Ve = Object.create, jn = typeof Reflect < "u" && Reflect, Xt = jn.apply, Vt = jn.construct;
ie || (ie = function(t) {
  return t;
});
oe || (oe = function(t) {
  return t;
});
Xt || (Xt = function(t, r) {
  for (var n = arguments.length, a = new Array(n > 2 ? n - 2 : 0), c = 2; c < n; c++)
    a[c - 2] = arguments[c];
  return t.apply(r, a);
});
Vt || (Vt = function(t) {
  for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
    n[a - 1] = arguments[a];
  return new t(...n);
});
const Ze = J(Array.prototype.forEach), Xr = J(Array.prototype.lastIndexOf), yn = J(Array.prototype.pop), Ye = J(Array.prototype.push), Vr = J(Array.prototype.splice), Ie = Array.isArray, st = J(String.prototype.toLowerCase), Wt = J(String.prototype.toString), Sn = J(String.prototype.match), ot = J(String.prototype.replace), An = J(String.prototype.indexOf), Qr = J(String.prototype.trim), Jr = J(Number.prototype.toString), ei = J(Boolean.prototype.toString), vn = typeof BigInt > "u" ? null : J(BigInt.prototype.toString), wn = typeof Symbol > "u" ? null : J(Symbol.prototype.toString), re = J(Object.prototype.hasOwnProperty), at = J(Object.prototype.toString), ne = J(RegExp.prototype.test), ze = ti(TypeError);
function J(e) {
  return function(t) {
    t instanceof RegExp && (t.lastIndex = 0);
    for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
      n[a - 1] = arguments[a];
    return Xt(e, t, n);
  };
}
function ti(e) {
  return function() {
    for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
      r[n] = arguments[n];
    return Vt(e, r);
  };
}
function B(e, t) {
  let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : st;
  if (Tn && Tn(e, null), !Ie(t))
    return e;
  let n = t.length;
  for (; n--; ) {
    let a = t[n];
    if (typeof a == "string") {
      const c = r(a);
      c !== a && (qr(t) || (t[n] = c), a = c);
    }
    e[a] = !0;
  }
  return e;
}
function ni(e) {
  for (let t = 0; t < e.length; t++)
    re(e, t) || (e[t] = null);
  return e;
}
function ue(e) {
  const t = Ve(null);
  for (const n of Wn(e)) {
    var r = jr(n, 2);
    const a = r[0], c = r[1];
    re(e, a) && (Ie(c) ? t[a] = ni(c) : c && typeof c == "object" && c.constructor === Object ? t[a] = ue(c) : t[a] = c);
  }
  return t;
}
function ri(e) {
  switch (typeof e) {
    case "string":
      return e;
    case "number":
      return Jr(e);
    case "boolean":
      return ei(e);
    case "bigint":
      return vn ? vn(e) : "0";
    case "symbol":
      return wn ? wn(e) : "Symbol()";
    case "undefined":
      return at(e);
    case "function":
    case "object": {
      if (e === null)
        return at(e);
      const t = e, r = ke(t, "toString");
      if (typeof r == "function") {
        const n = r(t);
        return typeof n == "string" ? n : at(n);
      }
      return at(e);
    }
    default:
      return at(e);
  }
}
function ke(e, t) {
  for (; e !== null; ) {
    const n = Yr(e, t);
    if (n) {
      if (n.get)
        return J(n.get);
      if (typeof n.value == "function")
        return J(n.value);
    }
    e = Zr(e);
  }
  function r() {
    return null;
  }
  return r;
}
function ii(e) {
  try {
    return ne(e, ""), !0;
  } catch {
    return !1;
  }
}
const Nn = ie(["a", "abbr", "acronym", "address", "area", "article", "aside", "audio", "b", "bdi", "bdo", "big", "blink", "blockquote", "body", "br", "button", "canvas", "caption", "center", "cite", "code", "col", "colgroup", "content", "data", "datalist", "dd", "decorator", "del", "details", "dfn", "dialog", "dir", "div", "dl", "dt", "element", "em", "fieldset", "figcaption", "figure", "font", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "i", "img", "input", "ins", "kbd", "label", "legend", "li", "main", "map", "mark", "marquee", "menu", "menuitem", "meter", "nav", "nobr", "ol", "optgroup", "option", "output", "p", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "search", "section", "select", "shadow", "slot", "small", "source", "spacer", "span", "strike", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "tt", "u", "ul", "var", "video", "wbr"]), jt = ie(["svg", "a", "altglyph", "altglyphdef", "altglyphitem", "animatecolor", "animatemotion", "animatetransform", "circle", "clippath", "defs", "desc", "ellipse", "enterkeyhint", "exportparts", "filter", "font", "g", "glyph", "glyphref", "hkern", "image", "inputmode", "line", "lineargradient", "marker", "mask", "metadata", "mpath", "part", "path", "pattern", "polygon", "polyline", "radialgradient", "rect", "stop", "style", "switch", "symbol", "text", "textpath", "title", "tref", "tspan", "view", "vkern"]), Kt = ie(["feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence"]), oi = ie(["animate", "color-profile", "cursor", "discard", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "foreignobject", "hatch", "hatchpath", "mesh", "meshgradient", "meshpatch", "meshrow", "missing-glyph", "script", "set", "solidcolor", "unknown", "use"]), qt = ie(["math", "menclose", "merror", "mfenced", "mfrac", "mglyph", "mi", "mlabeledtr", "mmultiscripts", "mn", "mo", "mover", "mpadded", "mphantom", "mroot", "mrow", "ms", "mspace", "msqrt", "mstyle", "msub", "msup", "msubsup", "mtable", "mtd", "mtext", "mtr", "munder", "munderover", "mprescripts"]), ai = ie(["maction", "maligngroup", "malignmark", "mlongdiv", "mscarries", "mscarry", "msgroup", "mstack", "msline", "msrow", "semantics", "annotation", "annotation-xml", "mprescripts", "none"]), On = ie(["#text"]), kn = ie(["accept", "action", "align", "alt", "autocapitalize", "autocomplete", "autopictureinpicture", "autoplay", "background", "bgcolor", "border", "capture", "cellpadding", "cellspacing", "checked", "cite", "class", "clear", "color", "cols", "colspan", "command", "commandfor", "controls", "controlslist", "coords", "crossorigin", "datetime", "decoding", "default", "dir", "disabled", "disablepictureinpicture", "disableremoteplayback", "download", "draggable", "enctype", "enterkeyhint", "exportparts", "face", "for", "headers", "height", "hidden", "high", "href", "hreflang", "id", "inert", "inputmode", "integrity", "ismap", "kind", "label", "lang", "list", "loading", "loop", "low", "max", "maxlength", "media", "method", "min", "minlength", "multiple", "muted", "name", "nonce", "noshade", "novalidate", "nowrap", "open", "optimum", "part", "pattern", "placeholder", "playsinline", "popover", "popovertarget", "popovertargetaction", "poster", "preload", "pubdate", "radiogroup", "readonly", "rel", "required", "rev", "reversed", "role", "rows", "rowspan", "spellcheck", "scope", "selected", "shape", "size", "sizes", "slot", "span", "srclang", "start", "src", "srcset", "step", "style", "summary", "tabindex", "title", "translate", "type", "usemap", "valign", "value", "width", "wrap", "xmlns"]), Zt = ie(["accent-height", "accumulate", "additive", "alignment-baseline", "amplitude", "ascent", "attributename", "attributetype", "azimuth", "basefrequency", "baseline-shift", "begin", "bias", "by", "class", "clip", "clippathunits", "clip-path", "clip-rule", "color", "color-interpolation", "color-interpolation-filters", "color-profile", "color-rendering", "cx", "cy", "d", "dx", "dy", "diffuseconstant", "direction", "display", "divisor", "dominant-baseline", "dur", "edgemode", "elevation", "end", "exponent", "fill", "fill-opacity", "fill-rule", "filter", "filterunits", "flood-color", "flood-opacity", "font-family", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-variant", "font-weight", "fx", "fy", "g1", "g2", "glyph-name", "glyphref", "gradientunits", "gradienttransform", "height", "href", "id", "image-rendering", "in", "in2", "intercept", "k", "k1", "k2", "k3", "k4", "kerning", "keypoints", "keysplines", "keytimes", "lang", "lengthadjust", "letter-spacing", "kernelmatrix", "kernelunitlength", "lighting-color", "local", "marker-end", "marker-mid", "marker-start", "markerheight", "markerunits", "markerwidth", "maskcontentunits", "maskunits", "max", "mask", "mask-type", "media", "method", "mode", "min", "name", "numoctaves", "offset", "operator", "opacity", "order", "orient", "orientation", "origin", "overflow", "paint-order", "path", "pathlength", "patterncontentunits", "patterntransform", "patternunits", "points", "preservealpha", "preserveaspectratio", "primitiveunits", "r", "rx", "ry", "radius", "refx", "refy", "repeatcount", "repeatdur", "restart", "result", "rotate", "scale", "seed", "shape-rendering", "slope", "specularconstant", "specularexponent", "spreadmethod", "startoffset", "stddeviation", "stitchtiles", "stop-color", "stop-opacity", "stroke-dasharray", "stroke-dashoffset", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke", "stroke-width", "style", "surfacescale", "systemlanguage", "tabindex", "tablevalues", "targetx", "targety", "transform", "transform-origin", "text-anchor", "text-decoration", "text-orientation", "text-rendering", "textlength", "type", "u1", "u2", "unicode", "values", "viewbox", "visibility", "version", "vert-adv-y", "vert-origin-x", "vert-origin-y", "width", "word-spacing", "wrap", "writing-mode", "xchannelselector", "ychannelselector", "x", "x1", "x2", "xmlns", "y", "y1", "y2", "z", "zoomandpan"]), Rn = ie(["accent", "accentunder", "align", "bevelled", "close", "columnalign", "columnlines", "columnspacing", "columnspan", "denomalign", "depth", "dir", "display", "displaystyle", "encoding", "fence", "frame", "height", "href", "id", "largeop", "length", "linethickness", "lquote", "lspace", "mathbackground", "mathcolor", "mathsize", "mathvariant", "maxsize", "minsize", "movablelimits", "notation", "numalign", "open", "rowalign", "rowlines", "rowspacing", "rowspan", "rspace", "rquote", "scriptlevel", "scriptminsize", "scriptsizemultiplier", "selection", "separator", "separators", "stretchy", "subscriptshift", "supscriptshift", "symmetric", "voffset", "width", "xmlns"]), St = ie(["xlink:href", "xml:id", "xlink:title", "xml:space", "xmlns:xlink"]), si = oe(/{{[\w\W]*|^[\w\W]*}}/g), ci = oe(/<%[\w\W]*|^[\w\W]*%>/g), li = oe(/\${[\w\W]*/g), di = oe(/^data-[\-\w.\u00B7-\uFFFF]+$/), ui = oe(/^aria-[\-\w]+$/), xn = oe(
  /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
  // eslint-disable-line no-useless-escape
), gi = oe(/^(?:\w+script|data):/i), pi = oe(
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g
  // eslint-disable-line no-control-regex
), fi = oe(/^html$/i), mi = oe(/^[a-z][.\w]*(-[.\w]+)+$/i), Mn = oe(/<[/\w!]/g), Ln = oe(/<[/\w]/g), hi = oe(/<\/no(script|embed|frames)/i), bi = oe(/\/>/i), fe = {
  element: 1,
  attribute: 2,
  text: 3,
  cdataSection: 4,
  entityReference: 5,
  // Deprecated
  entityNode: 6,
  // Deprecated
  processingInstruction: 7,
  comment: 8,
  document: 9,
  documentType: 10,
  documentFragment: 11,
  notation: 12
  // Deprecated
}, _i = function() {
  return typeof window > "u" ? null : window;
}, Ei = function(t, r) {
  if (typeof t != "object" || typeof t.createPolicy != "function")
    return null;
  let n = null;
  const a = "data-tt-policy-suffix";
  r && r.hasAttribute(a) && (n = r.getAttribute(a));
  const c = "dompurify" + (n ? "#" + n : "");
  try {
    return t.createPolicy(c, {
      createHTML(o) {
        return o;
      },
      createScriptURL(o) {
        return o;
      }
    });
  } catch {
    return console.warn("TrustedTypes policy " + c + " could not be created."), null;
  }
}, In = function() {
  return {
    afterSanitizeAttributes: [],
    afterSanitizeElements: [],
    afterSanitizeShadowDOM: [],
    beforeSanitizeAttributes: [],
    beforeSanitizeElements: [],
    beforeSanitizeShadowDOM: [],
    uponSanitizeAttribute: [],
    uponSanitizeElement: [],
    uponSanitizeShadowNode: []
  };
}, Le = function(t, r, n, a) {
  return re(t, r) && Ie(t[r]) ? B(a.base ? ue(a.base) : {}, t[r], a.transform) : n;
};
function Kn() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : _i();
  const t = (m) => Kn(m);
  if (t.version = "3.4.12", t.removed = [], !e || !e.document || e.document.nodeType !== fe.document || !e.Element)
    return t.isSupported = !1, t;
  let r = e.document;
  const n = r, a = n.currentScript;
  e.DocumentFragment;
  const c = e.HTMLTemplateElement, o = e.Node, s = e.Element, d = e.NodeFilter, g = e.NamedNodeMap;
  g === void 0 && (e.NamedNodeMap || e.MozNamedAttrMap), e.HTMLFormElement;
  const u = e.DOMParser, _ = e.trustedTypes, E = s.prototype, h = ke(E, "cloneNode"), x = ke(E, "remove"), M = ke(E, "nextSibling"), P = ke(E, "childNodes"), H = ke(E, "parentNode"), F = ke(E, "shadowRoot"), G = ke(E, "attributes"), L = o && o.prototype ? ke(o.prototype, "nodeType") : null, C = o && o.prototype ? ke(o.prototype, "nodeName") : null;
  if (typeof c == "function") {
    const m = r.createElement("template");
    m.content && m.content.ownerDocument && (r = m.content.ownerDocument);
  }
  let I, D = "", K, ee = !1, me = 0;
  const Re = function() {
    if (me > 0)
      throw ze('A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.');
  }, he = function(i) {
    Re(), me++;
    try {
      return I.createHTML(i);
    } finally {
      me--;
    }
  }, De = function(i) {
    Re(), me++;
    try {
      return I.createScriptURL(i);
    } finally {
      me--;
    }
  }, Ae = function() {
    return ee || (K = Ei(_, a), ee = !0), K;
  }, ve = r, f = ve.implementation, S = ve.createNodeIterator, T = ve.createDocumentFragment, R = ve.getElementsByTagName, U = n.importNode;
  let O = In();
  t.isSupported = typeof Wn == "function" && typeof H == "function" && f && f.createHTMLDocument !== void 0;
  const te = si, be = ci, le = li, _e = di, ut = ui, gt = gi, et = pi, Mt = mi;
  let pt = xn, q = null;
  const ft = B({}, [...Nn, ...jt, ...Kt, ...qt, ...On]);
  let j = null;
  const tt = B({}, [...kn, ...Zt, ...Rn, ...St]);
  let z = Object.seal(Ve(null, {
    tagNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeNameCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    allowCustomizedBuiltInElements: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: !1
    }
  })), Pe = null, Fe = null;
  const v = Object.seal(Ve(null, {
    tagCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    },
    attributeCheck: {
      writable: !0,
      configurable: !1,
      enumerable: !0,
      value: null
    }
  }));
  let nt = !0, Q = !0, W = !1, Be = !0, ae = !1, Ee = !0, Te = !1, b = !1, A = null, k = null, $ = !1, Z = !1, ge = !1, Ge = !1, mt = !0, nn = !1;
  const rn = "user-content-";
  let Lt = !0, It = !1, We = {}, we = null;
  const Ct = B({}, [
    "annotation-xml",
    "audio",
    "colgroup",
    "desc",
    "foreignobject",
    "head",
    "iframe",
    "math",
    "mi",
    "mn",
    "mo",
    "ms",
    "mtext",
    "noembed",
    "noframes",
    "noscript",
    "plaintext",
    "script",
    // <selectedcontent> mirrors the selected <option>'s subtree, cloned by
    // the UA (customizable <select>) — including any on* handlers — and the
    // engine re-mirrors synchronously whenever a removal changes which
    // option/selectedcontent is current, even inside DOMPurify's inert
    // DOMParser document. Hoisting its children on removal re-inserts a fresh
    // mirror target ahead of the walk, which the engine refills, looping
    // forever (DoS) and amplifying output. Dropping its content on removal
    // (rather than hoisting) breaks that cascade; the content is a duplicate
    // of the option, which is sanitized on its own. See campaign-3 F1/F6.
    "selectedcontent",
    "style",
    "svg",
    "template",
    "thead",
    "title",
    "video",
    "xmp"
  ]);
  let on = null;
  const an = B({}, ["audio", "video", "img", "source", "image", "track"]);
  let Dt = null;
  const sn = B({}, ["alt", "class", "for", "id", "label", "name", "pattern", "placeholder", "role", "summary", "title", "value", "style", "xmlns"]), ht = "http://www.w3.org/1998/Math/MathML", bt = "http://www.w3.org/2000/svg", Ne = "http://www.w3.org/1999/xhtml";
  let je = Ne, Pt = !1, Bt = null;
  const vr = B({}, [ht, bt, Ne], Wt), cn = ie(["mi", "mo", "mn", "ms", "mtext"]);
  let Ut = B({}, cn);
  const ln = ie(["annotation-xml"]);
  let zt = B({}, ln);
  const wr = B({}, ["title", "style", "font", "a", "script"]);
  let rt = null;
  const Nr = ["application/xhtml+xml", "text/html"], Or = "text/html";
  let Y = null, Ke = null;
  const kr = r.createElement("form"), dn = function(i) {
    return i instanceof RegExp || i instanceof Function;
  }, $t = function() {
    let i = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (Ke && Ke === i)
      return;
    (!i || typeof i != "object") && (i = {}), i = ue(i), rt = // eslint-disable-next-line unicorn/prefer-includes
    Nr.indexOf(i.PARSER_MEDIA_TYPE) === -1 ? Or : i.PARSER_MEDIA_TYPE, Y = rt === "application/xhtml+xml" ? Wt : st, q = Le(i, "ALLOWED_TAGS", ft, {
      transform: Y
    }), j = Le(i, "ALLOWED_ATTR", tt, {
      transform: Y
    }), Bt = Le(i, "ALLOWED_NAMESPACES", vr, {
      transform: Wt
    }), Dt = Le(i, "ADD_URI_SAFE_ATTR", sn, {
      transform: Y,
      base: sn
    }), on = Le(i, "ADD_DATA_URI_TAGS", an, {
      transform: Y,
      base: an
    }), we = Le(i, "FORBID_CONTENTS", Ct, {
      transform: Y
    }), Pe = Le(i, "FORBID_TAGS", ue({}), {
      transform: Y
    }), Fe = Le(i, "FORBID_ATTR", ue({}), {
      transform: Y
    }), We = re(i, "USE_PROFILES") ? i.USE_PROFILES && typeof i.USE_PROFILES == "object" ? ue(i.USE_PROFILES) : i.USE_PROFILES : !1, nt = i.ALLOW_ARIA_ATTR !== !1, Q = i.ALLOW_DATA_ATTR !== !1, W = i.ALLOW_UNKNOWN_PROTOCOLS || !1, Be = i.ALLOW_SELF_CLOSE_IN_ATTR !== !1, ae = i.SAFE_FOR_TEMPLATES || !1, Ee = i.SAFE_FOR_XML !== !1, Te = i.WHOLE_DOCUMENT || !1, Z = i.RETURN_DOM || !1, ge = i.RETURN_DOM_FRAGMENT || !1, Ge = i.RETURN_TRUSTED_TYPE || !1, $ = i.FORCE_BODY || !1, mt = i.SANITIZE_DOM !== !1, nn = i.SANITIZE_NAMED_PROPS || !1, Lt = i.KEEP_CONTENT !== !1, It = i.IN_PLACE || !1, pt = ii(i.ALLOWED_URI_REGEXP) ? i.ALLOWED_URI_REGEXP : xn, je = typeof i.NAMESPACE == "string" ? i.NAMESPACE : Ne, Ut = re(i, "MATHML_TEXT_INTEGRATION_POINTS") && i.MATHML_TEXT_INTEGRATION_POINTS && typeof i.MATHML_TEXT_INTEGRATION_POINTS == "object" ? ue(i.MATHML_TEXT_INTEGRATION_POINTS) : B({}, cn), zt = re(i, "HTML_INTEGRATION_POINTS") && i.HTML_INTEGRATION_POINTS && typeof i.HTML_INTEGRATION_POINTS == "object" ? ue(i.HTML_INTEGRATION_POINTS) : B({}, ln);
    const l = re(i, "CUSTOM_ELEMENT_HANDLING") && i.CUSTOM_ELEMENT_HANDLING && typeof i.CUSTOM_ELEMENT_HANDLING == "object" ? ue(i.CUSTOM_ELEMENT_HANDLING) : Ve(null);
    if (z = Ve(null), re(l, "tagNameCheck") && dn(l.tagNameCheck) && (z.tagNameCheck = l.tagNameCheck), re(l, "attributeNameCheck") && dn(l.attributeNameCheck) && (z.attributeNameCheck = l.attributeNameCheck), re(l, "allowCustomizedBuiltInElements") && typeof l.allowCustomizedBuiltInElements == "boolean" && (z.allowCustomizedBuiltInElements = l.allowCustomizedBuiltInElements), oe(z), ae && (Q = !1), ge && (Z = !0), We && (q = B({}, On), j = Ve(null), We.html === !0 && (B(q, Nn), B(j, kn)), We.svg === !0 && (B(q, jt), B(j, Zt), B(j, St)), We.svgFilters === !0 && (B(q, Kt), B(j, Zt), B(j, St)), We.mathMl === !0 && (B(q, qt), B(j, Rn), B(j, St))), v.tagCheck = null, v.attributeCheck = null, re(i, "ADD_TAGS") && (typeof i.ADD_TAGS == "function" ? v.tagCheck = i.ADD_TAGS : Ie(i.ADD_TAGS) && (q === ft && (q = ue(q)), B(q, i.ADD_TAGS, Y))), re(i, "ADD_ATTR") && (typeof i.ADD_ATTR == "function" ? v.attributeCheck = i.ADD_ATTR : Ie(i.ADD_ATTR) && (j === tt && (j = ue(j)), B(j, i.ADD_ATTR, Y))), re(i, "ADD_URI_SAFE_ATTR") && Ie(i.ADD_URI_SAFE_ATTR) && B(Dt, i.ADD_URI_SAFE_ATTR, Y), re(i, "FORBID_CONTENTS") && Ie(i.FORBID_CONTENTS) && (we === Ct && (we = ue(we)), B(we, i.FORBID_CONTENTS, Y)), re(i, "ADD_FORBID_CONTENTS") && Ie(i.ADD_FORBID_CONTENTS) && (we === Ct && (we = ue(we)), B(we, i.ADD_FORBID_CONTENTS, Y)), Lt && (q["#text"] = !0), Te && B(q, ["html", "head", "body"]), q.table && (B(q, ["tbody"]), delete Pe.tbody), i.TRUSTED_TYPES_POLICY) {
      if (typeof i.TRUSTED_TYPES_POLICY.createHTML != "function")
        throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
      if (typeof i.TRUSTED_TYPES_POLICY.createScriptURL != "function")
        throw ze('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
      const p = I;
      I = i.TRUSTED_TYPES_POLICY;
      try {
        D = he("");
      } catch (y) {
        throw I = p, y;
      }
    } else i.TRUSTED_TYPES_POLICY === null ? (I = void 0, D = "") : (I === void 0 && (I = Ae()), I && typeof D == "string" && (D = he("")));
    ie && ie(i), Ke = i;
  }, un = B({}, [...jt, ...Kt, ...oi]), gn = B({}, [...qt, ...ai]), Rr = function(i, l, p) {
    return l.namespaceURI === Ne ? i === "svg" : l.namespaceURI === ht ? i === "svg" && (p === "annotation-xml" || Ut[p]) : !!un[i];
  }, xr = function(i, l, p) {
    return l.namespaceURI === Ne ? i === "math" : l.namespaceURI === bt ? i === "math" && zt[p] : !!gn[i];
  }, Mr = function(i, l, p) {
    return l.namespaceURI === bt && !zt[p] || l.namespaceURI === ht && !Ut[p] ? !1 : !gn[i] && (wr[i] || !un[i]);
  }, Lr = function(i) {
    let l = H(i);
    (!l || !l.tagName) && (l = {
      namespaceURI: je,
      tagName: "template"
    });
    const p = st(i.tagName), y = st(l.tagName);
    return Bt[i.namespaceURI] ? i.namespaceURI === bt ? Rr(p, l, y) : i.namespaceURI === ht ? xr(p, l, y) : i.namespaceURI === Ne ? Mr(p, l, y) : !!(rt === "application/xhtml+xml" && Bt[i.namespaceURI]) : !1;
  }, xe = function(i) {
    Ye(t.removed, {
      element: i
    });
    try {
      H(i).removeChild(i);
    } catch {
      if (x(i), !H(i))
        throw ze("a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place");
    }
  }, _t = function(i) {
    Ht(i);
    const l = P(i);
    if (l) {
      const y = [];
      Ze(l, (w) => {
        Ye(y, w);
      }), Ze(y, (w) => {
        try {
          x(w);
        } catch {
        }
      });
    }
    const p = G(i);
    if (p)
      for (let y = p.length - 1; y >= 0; --y) {
        const w = p[y], N = w && w.name;
        if (typeof N == "string")
          try {
            i.removeAttribute(N);
          } catch {
          }
      }
  }, Ue = function(i, l) {
    try {
      Ye(t.removed, {
        attribute: l.getAttributeNode(i),
        from: l
      });
    } catch {
      Ye(t.removed, {
        attribute: null,
        from: l
      });
    }
    if (l.removeAttribute(i), i === "is")
      if (Z || ge)
        try {
          xe(l);
        } catch {
        }
      else
        try {
          l.setAttribute(i, "");
        } catch {
        }
  }, Ir = function(i) {
    const l = G(i);
    if (l)
      for (let p = l.length - 1; p >= 0; --p) {
        const y = l[p], w = y && y.name;
        if (!(typeof w != "string" || j[Y(w)]))
          try {
            i.removeAttribute(w);
          } catch {
          }
      }
  }, Ht = function(i) {
    const l = [i];
    for (; l.length > 0; ) {
      const p = l.pop();
      (L ? L(p) : p.nodeType) === fe.element && Ir(p);
      const w = P(p);
      if (w)
        for (let N = w.length - 1; N >= 0; --N)
          l.push(w[N]);
    }
  }, Cr = function(i) {
    if (!Ee)
      return;
    const l = [i];
    for (; l.length > 0; ) {
      const p = l.pop(), y = L ? L(p) : p.nodeType;
      if (y === fe.processingInstruction || y === fe.comment && ne(Ln, p.data)) {
        try {
          x(p);
        } catch {
        }
        continue;
      }
      if (y === fe.element) {
        const N = p, X = Y(C ? C(p) : p.nodeName);
        try {
          N.hasAttribute && N.hasAttribute("patchsrc") && N.removeAttribute("patchsrc"), N.hasAttribute && N.hasAttribute("for") && X !== "label" && X !== "output" && N.removeAttribute("for");
        } catch {
        }
      }
      const w = P(p);
      if (w)
        for (let N = w.length - 1; N >= 0; --N)
          l.push(w[N]);
    }
  }, pn = function(i) {
    let l = null, p = null;
    if ($)
      i = "<remove></remove>" + i;
    else {
      const N = Sn(i, /^[\r\n\t ]+/);
      p = N && N[0];
    }
    rt === "application/xhtml+xml" && je === Ne && (i = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + i + "</body></html>");
    const y = I ? he(i) : i;
    if (je === Ne)
      try {
        l = new u().parseFromString(y, rt);
      } catch {
      }
    if (!l || !l.documentElement) {
      l = f.createDocument(je, "template", null);
      try {
        l.documentElement.innerHTML = Pt ? D : y;
      } catch {
      }
    }
    const w = l.body || l.documentElement;
    return i && p && w.insertBefore(r.createTextNode(p), w.childNodes[0] || null), je === Ne ? R.call(l, Te ? "html" : "body")[0] : Te ? l.documentElement : w;
  }, fn = function(i) {
    return S.call(
      i.ownerDocument || i,
      i,
      // eslint-disable-next-line no-bitwise
      d.SHOW_ELEMENT | d.SHOW_COMMENT | d.SHOW_TEXT | d.SHOW_PROCESSING_INSTRUCTION | d.SHOW_CDATA_SECTION,
      null
    );
  }, Et = function(i) {
    return i = ot(i, te, " "), i = ot(i, be, " "), i = ot(i, le, " "), i;
  }, Ft = function(i) {
    var l;
    i.normalize();
    const p = S.call(
      i.ownerDocument || i,
      i,
      // eslint-disable-next-line no-bitwise
      d.SHOW_TEXT | d.SHOW_COMMENT | d.SHOW_CDATA_SECTION | d.SHOW_PROCESSING_INSTRUCTION,
      null
    );
    let y = p.nextNode();
    for (; y; )
      y.data = Et(y.data), y = p.nextNode();
    const w = (l = i.querySelectorAll) === null || l === void 0 ? void 0 : l.call(i, "template");
    w && Ze(w, (N) => {
      qe(N.content) && Ft(N.content);
    });
  }, Tt = function(i) {
    const l = C ? C(i) : null;
    return typeof l != "string" || Y(l) !== "form" ? !1 : typeof i.nodeName != "string" || typeof i.textContent != "string" || typeof i.removeChild != "function" || // Realm-safe NamedNodeMap detection: equality against the cached
    // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
    // makes the direct read diverge from the cached read; a clean form
    // (same-realm OR foreign-realm) has both reads pointing at the same
    // canonical NamedNodeMap.
    i.attributes !== G(i) || typeof i.removeAttribute != "function" || typeof i.setAttribute != "function" || typeof i.namespaceURI != "string" || typeof i.insertBefore != "function" || typeof i.hasChildNodes != "function" || // NodeType clobbering probe. Cached Node.prototype.nodeType getter
    // returns the integer 1 for any Element regardless of realm; direct
    // read on a clobbered form (e.g. <input name="nodeType">) returns
    // the named child element. Cheap addition — nodeType is read from
    // an internal slot, no serialization cost — and removes a residual
    // clobbering surface used by several mXSS / PI / comment branches
    // in _sanitizeElements that compare currentNode.nodeType directly.
    i.nodeType !== L(i) || // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
    // "childNodes" shadows the prototype getter. Direct reads of
    // form.childNodes from a clobbered form return the named child
    // instead of the real NodeList, so any walk that reads it directly
    // skips the form's real children. Compare the direct read to the
    // cached Node.prototype getter — when the form's named-property
    // getter intercepts the read, the two values differ and we flag
    // the form. This catches every clobbering child type (input,
    // select, etc.) regardless of whether the named child happens to
    // carry a numeric .length, which a typeof-based probe would miss
    // (e.g. HTMLSelectElement.length is a defined unsigned-long).
    i.childNodes !== P(i);
  }, qe = function(i) {
    if (!L || typeof i != "object" || i === null)
      return !1;
    try {
      return L(i) === fe.documentFragment;
    } catch {
      return !1;
    }
  }, it = function(i) {
    if (!L || typeof i != "object" || i === null)
      return !1;
    try {
      return typeof L(i) == "number";
    } catch {
      return !1;
    }
  };
  function Oe(m, i, l) {
    m.length !== 0 && Ze(m, (p) => {
      p.call(t, i, l, Ke);
    });
  }
  const Dr = function(i, l) {
    return !!(Ee && i.hasChildNodes() && !it(i.firstElementChild) && ne(Mn, i.textContent) && ne(Mn, i.innerHTML) || Ee && i.namespaceURI === Ne && l === "style" && it(i.firstElementChild) || i.nodeType === fe.processingInstruction || Ee && i.nodeType === fe.comment && ne(Ln, i.data));
  }, Pr = function(i, l) {
    if (!Pe[l] && bn(l) && (z.tagNameCheck instanceof RegExp && ne(z.tagNameCheck, l) || z.tagNameCheck instanceof Function && z.tagNameCheck(l)))
      return !1;
    if (Lt && !we[l]) {
      const p = H(i), y = P(i);
      if (y && p) {
        const w = y.length;
        for (let N = w - 1; N >= 0; --N) {
          const X = It ? y[N] : h(y[N], !0);
          p.insertBefore(X, M(i));
        }
      }
    }
    return xe(i), !0;
  }, mn = function(i, l) {
    if (Oe(O.beforeSanitizeElements, i, null), i !== l && H(i) === null)
      return !0;
    if (Tt(i))
      return xe(i), !0;
    const p = Y(C ? C(i) : i.nodeName);
    if (Oe(O.uponSanitizeElement, i, {
      tagName: p,
      allowedTags: q
    }), i !== l && H(i) === null)
      return !0;
    if (Dr(i, p))
      return xe(i), !0;
    if (Pe[p] || !(v.tagCheck instanceof Function && v.tagCheck(p)) && !q[p]) {
      const w = Pr(i, p);
      return w === !1 && Oe(O.afterSanitizeElements, i, null), w;
    }
    if ((L ? L(i) : i.nodeType) === fe.element && !Lr(i) || (p === "noscript" || p === "noembed" || p === "noframes") && ne(hi, i.innerHTML))
      return xe(i), !0;
    if (ae && i.nodeType === fe.text) {
      const w = Et(i.textContent);
      i.textContent !== w && (Ye(t.removed, {
        element: i.cloneNode()
      }), i.textContent = w);
    }
    return Oe(O.afterSanitizeElements, i, null), !1;
  }, hn = function(i, l, p) {
    if (Fe[l] || Ee && l === "patchsrc" || Ee && l === "for" && i !== "label" && i !== "output" || mt && (l === "id" || l === "name") && (p in r || p in kr))
      return !1;
    const y = j[l] || v.attributeCheck instanceof Function && v.attributeCheck(l, i);
    if (!(Q && ne(_e, l))) {
      if (!(nt && ne(ut, l))) {
        if (y) {
          if (!Dt[l]) {
            if (!ne(pt, ot(p, et, ""))) {
              if (!((l === "src" || l === "xlink:href" || l === "href") && i !== "script" && An(p, "data:") === 0 && on[i])) {
                if (!(W && !ne(gt, ot(p, et, "")))) {
                  if (p)
                    return !1;
                }
              }
            }
          }
        } else if (
          // First condition does a very basic check if a) it's basically a valid custom element tagname AND
          // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
          !(bn(i) && (z.tagNameCheck instanceof RegExp && ne(z.tagNameCheck, i) || z.tagNameCheck instanceof Function && z.tagNameCheck(i)) && (z.attributeNameCheck instanceof RegExp && ne(z.attributeNameCheck, l) || z.attributeNameCheck instanceof Function && z.attributeNameCheck(l, i)) || // Alternative, second condition checks if it's an `is`-attribute, AND
          // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
          l === "is" && z.allowCustomizedBuiltInElements && (z.tagNameCheck instanceof RegExp && ne(z.tagNameCheck, p) || z.tagNameCheck instanceof Function && z.tagNameCheck(p)))
        ) return !1;
      }
    }
    return !0;
  }, Br = B({}, ["annotation-xml", "color-profile", "font-face", "font-face-format", "font-face-name", "font-face-src", "font-face-uri", "missing-glyph"]), bn = function(i) {
    return !Br[st(i)] && ne(Mt, i);
  }, Ur = function(i, l, p, y) {
    if (I && typeof _ == "object" && typeof _.getAttributeType == "function" && !p)
      switch (_.getAttributeType(i, l)) {
        case "TrustedHTML":
          return he(y);
        case "TrustedScriptURL":
          return De(y);
      }
    return y;
  }, zr = function(i, l, p, y) {
    try {
      p ? i.setAttributeNS(p, l, y) : i.setAttribute(l, y), Tt(i) ? xe(i) : yn(t.removed);
    } catch {
      Ue(l, i);
    }
  }, _n = function(i) {
    Oe(O.beforeSanitizeAttributes, i, null);
    const l = i.attributes;
    if (!l || Tt(i))
      return;
    const p = {
      attrName: "",
      attrValue: "",
      keepAttr: !0,
      allowedAttributes: j,
      forceKeepAttr: void 0
    };
    let y = l.length;
    const w = Y(i.nodeName);
    for (; y--; ) {
      const N = l[y], X = N.name, se = N.namespaceURI, ye = N.value, pe = Y(X), Se = ye;
      let de = X === "value" ? Se : Qr(Se);
      if (p.attrName = pe, p.attrValue = de, p.keepAttr = !0, p.forceKeepAttr = void 0, Oe(O.uponSanitizeAttribute, i, p), de = p.attrValue, nn && (pe === "id" || pe === "name") && An(de, rn) !== 0 && (Ue(X, i), de = rn + de), Ee && ne(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, de)) {
        Ue(X, i);
        continue;
      }
      if (pe === "attributename" && Sn(de, "href")) {
        Ue(X, i);
        continue;
      }
      if (!p.forceKeepAttr) {
        if (!p.keepAttr) {
          Ue(X, i);
          continue;
        }
        if (!Be && ne(bi, de)) {
          Ue(X, i);
          continue;
        }
        if (ae && (de = Et(de)), !hn(w, pe, de)) {
          Ue(X, i);
          continue;
        }
        de = Ur(w, pe, se, de), de !== Se && zr(i, X, se, de);
      }
    }
    Oe(O.afterSanitizeAttributes, i, null);
  }, yt = function(i) {
    let l = null;
    const p = fn(i);
    for (Oe(O.beforeSanitizeShadowDOM, i, null); l = p.nextNode(); )
      if (Oe(O.uponSanitizeShadowNode, l, null), mn(l, i), _n(l), qe(l.content) && yt(l.content), (L ? L(l) : l.nodeType) === fe.element) {
        const w = F(l);
        qe(w) && (Gt(w), yt(w));
      }
    Oe(O.afterSanitizeShadowDOM, i, null);
  }, Gt = function(i) {
    const l = [{
      node: i,
      shadow: null
    }];
    for (; l.length > 0; ) {
      const p = l.pop();
      if (p.shadow) {
        yt(p.shadow);
        continue;
      }
      const y = p.node, N = (L ? L(y) : y.nodeType) === fe.element, X = P(y);
      if (X)
        for (let se = X.length - 1; se >= 0; --se)
          l.push({
            node: X[se],
            shadow: null
          });
      if (N) {
        const se = C ? C(y) : null;
        if (typeof se == "string" && Y(se) === "template") {
          const ye = y.content;
          qe(ye) && l.push({
            node: ye,
            shadow: null
          });
        }
      }
      if (N) {
        const se = F(y);
        qe(se) && l.push({
          node: null,
          shadow: se
        }, {
          node: se,
          shadow: null
        });
      }
    }
  };
  return t.sanitize = function(m) {
    let i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, l = null, p = null, y = null, w = null;
    if (Pt = !m, Pt && (m = "<!-->"), typeof m != "string" && !it(m) && (m = ri(m), typeof m != "string"))
      throw ze("dirty is not a string, aborting");
    if (!t.isSupported)
      return m;
    b ? (q = A, j = k) : $t(i), (O.uponSanitizeElement.length > 0 || O.uponSanitizeAttribute.length > 0) && (q = ue(q)), O.uponSanitizeAttribute.length > 0 && (j = ue(j)), t.removed = [];
    const N = It && typeof m != "string" && it(m);
    if (N) {
      Cr(m);
      const pe = C ? C(m) : m.nodeName;
      if (typeof pe == "string") {
        const Se = Y(pe);
        if (!q[Se] || Pe[Se])
          throw _t(m), ze("root node is forbidden and cannot be sanitized in-place");
      }
      if (Tt(m))
        throw _t(m), ze("root node is clobbered and cannot be sanitized in-place");
      try {
        Gt(m);
      } catch (Se) {
        throw _t(m), Se;
      }
    } else if (it(m))
      l = pn("<!---->"), p = l.ownerDocument.importNode(m, !0), p.nodeType === fe.element && p.nodeName === "BODY" || p.nodeName === "HTML" ? l = p : l.appendChild(p), Gt(p);
    else {
      if (!Z && !ae && !Te && // eslint-disable-next-line unicorn/prefer-includes
      m.indexOf("<") === -1)
        return I && Ge ? he(m) : m;
      if (l = pn(m), !l)
        return Z ? null : Ge ? D : "";
    }
    l && $ && xe(l.firstChild);
    const X = N ? m : l, se = fn(X);
    try {
      for (; y = se.nextNode(); )
        mn(y, X), _n(y), qe(y.content) && yt(y.content);
    } catch (pe) {
      throw N && (_t(m), Ze(t.removed, (Se) => {
        Se.element && Ht(Se.element);
      })), pe;
    }
    if (N)
      return Ze(t.removed, (pe) => {
        pe.element && Ht(pe.element);
      }), ae && Ft(m), m;
    if (Z) {
      if (ae && Ft(l), ge)
        for (w = T.call(l.ownerDocument); l.firstChild; )
          w.appendChild(l.firstChild);
      else
        w = l;
      return (j.shadowroot || j.shadowrootmode) && (w = U.call(n, w, !0)), w;
    }
    let ye = Te ? l.outerHTML : l.innerHTML;
    return Te && q["!doctype"] && l.ownerDocument && l.ownerDocument.doctype && l.ownerDocument.doctype.name && ne(fi, l.ownerDocument.doctype.name) && (ye = "<!DOCTYPE " + l.ownerDocument.doctype.name + `>
` + ye), ae && (ye = Et(ye)), I && Ge ? he(ye) : ye;
  }, t.setConfig = function() {
    let m = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    $t(m), b = !0, A = q, k = j;
  }, t.clearConfig = function() {
    Ke = null, b = !1, A = null, k = null, I = K, D = "";
  }, t.isValidAttribute = function(m, i, l) {
    Ke || $t({});
    const p = Y(m), y = Y(i);
    return hn(p, y, l);
  }, t.addHook = function(m, i) {
    typeof i == "function" && re(O, m) && Ye(O[m], i);
  }, t.removeHook = function(m, i) {
    if (re(O, m)) {
      if (i !== void 0) {
        const l = Xr(O[m], i);
        return l === -1 ? void 0 : Vr(O[m], l, 1)[0];
      }
      return yn(O[m]);
    }
  }, t.removeHooks = function(m) {
    re(O, m) && (O[m] = []);
  }, t.removeAllHooks = function() {
    O = In();
  }, t;
}
var Ti = Kn();
function yi(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function qn(e) {
  return e instanceof Map ? e.clear = e.delete = e.set = function() {
    throw new Error("map is read-only");
  } : e instanceof Set && (e.add = e.clear = e.delete = function() {
    throw new Error("set is read-only");
  }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((t) => {
    const r = e[t], n = typeof r;
    (n === "object" || n === "function") && !Object.isFrozen(r) && qn(r);
  }), e;
}
class Cn {
  /**
   * @param {CompiledMode} mode
   */
  constructor(t) {
    t.data === void 0 && (t.data = {}), this.data = t.data, this.isMatchIgnored = !1;
  }
  ignoreMatch() {
    this.isMatchIgnored = !0;
  }
}
function Zn(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function Ce(e, ...t) {
  const r = /* @__PURE__ */ Object.create(null);
  for (const n in e)
    r[n] = e[n];
  return t.forEach(function(n) {
    for (const a in n)
      r[a] = n[a];
  }), /** @type {T} */
  r;
}
const Si = "</span>", Dn = (e) => !!e.scope, Ai = (e, { prefix: t }) => {
  if (e.startsWith("language:"))
    return e.replace("language:", "language-");
  if (e.includes(".")) {
    const r = e.split(".");
    return [
      `${t}${r.shift()}`,
      ...r.map((n, a) => `${n}${"_".repeat(a + 1)}`)
    ].join(" ");
  }
  return `${t}${e}`;
};
class vi {
  /**
   * Creates a new HTMLRenderer
   *
   * @param {Tree} parseTree - the parse tree (must support `walk` API)
   * @param {{classPrefix: string}} options
   */
  constructor(t, r) {
    this.buffer = "", this.classPrefix = r.classPrefix, t.walk(this);
  }
  /**
   * Adds texts to the output stream
   *
   * @param {string} text */
  addText(t) {
    this.buffer += Zn(t);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(t) {
    if (!Dn(t)) return;
    const r = Ai(
      t.scope,
      { prefix: this.classPrefix }
    );
    this.span(r);
  }
  /**
   * Adds a node close to the output stream (if needed)
   *
   * @param {Node} node */
  closeNode(t) {
    Dn(t) && (this.buffer += Si);
  }
  /**
   * returns the accumulated buffer
  */
  value() {
    return this.buffer;
  }
  // helpers
  /**
   * Builds a span element
   *
   * @param {string} className */
  span(t) {
    this.buffer += `<span class="${t}">`;
  }
}
const Pn = (e = {}) => {
  const t = { children: [] };
  return Object.assign(t, e), t;
};
class Qt {
  constructor() {
    this.rootNode = Pn(), this.stack = [this.rootNode];
  }
  get top() {
    return this.stack[this.stack.length - 1];
  }
  get root() {
    return this.rootNode;
  }
  /** @param {Node} node */
  add(t) {
    this.top.children.push(t);
  }
  /** @param {string} scope */
  openNode(t) {
    const r = Pn({ scope: t });
    this.add(r), this.stack.push(r);
  }
  closeNode() {
    if (this.stack.length > 1)
      return this.stack.pop();
  }
  closeAllNodes() {
    for (; this.closeNode(); ) ;
  }
  toJSON() {
    return JSON.stringify(this.rootNode, null, 4);
  }
  /**
   * @typedef { import("./html_renderer").Renderer } Renderer
   * @param {Renderer} builder
   */
  walk(t) {
    return this.constructor._walk(t, this.rootNode);
  }
  /**
   * @param {Renderer} builder
   * @param {Node} node
   */
  static _walk(t, r) {
    return typeof r == "string" ? t.addText(r) : r.children && (t.openNode(r), r.children.forEach((n) => this._walk(t, n)), t.closeNode(r)), t;
  }
  /**
   * @param {Node} node
   */
  static _collapse(t) {
    typeof t != "string" && t.children && (t.children.every((r) => typeof r == "string") ? t.children = [t.children.join("")] : t.children.forEach((r) => {
      Qt._collapse(r);
    }));
  }
}
class wi extends Qt {
  /**
   * @param {*} options
   */
  constructor(t) {
    super(), this.options = t;
  }
  /**
   * @param {string} text
   */
  addText(t) {
    t !== "" && this.add(t);
  }
  /** @param {string} scope */
  startScope(t) {
    this.openNode(t);
  }
  endScope() {
    this.closeNode();
  }
  /**
   * @param {Emitter & {root: DataNode}} emitter
   * @param {string} name
   */
  __addSublanguage(t, r) {
    const n = t.root;
    r && (n.scope = `language:${r}`), this.add(n);
  }
  toHTML() {
    return new vi(this, this.options).value();
  }
  finalize() {
    return this.closeAllNodes(), !0;
  }
}
function ct(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function Yn(e) {
  return He("(?=", e, ")");
}
function Ni(e) {
  return He("(?:", e, ")*");
}
function Oi(e) {
  return He("(?:", e, ")?");
}
function He(...e) {
  return e.map((r) => ct(r)).join("");
}
function ki(e) {
  const t = e[e.length - 1];
  return typeof t == "object" && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {};
}
function Jt(...e) {
  return "(" + (ki(e).capture ? "" : "?:") + e.map((n) => ct(n)).join("|") + ")";
}
function Xn(e) {
  return new RegExp(e.toString() + "|").exec("").length - 1;
}
function Ri(e, t) {
  const r = e && e.exec(t);
  return r && r.index === 0;
}
const xi = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function en(e, { joinWith: t }) {
  let r = 0;
  return e.map((n) => {
    r += 1;
    const a = r;
    let c = ct(n), o = "";
    for (; c.length > 0; ) {
      const s = xi.exec(c);
      if (!s) {
        o += c;
        break;
      }
      o += c.substring(0, s.index), c = c.substring(s.index + s[0].length), s[0][0] === "\\" && s[1] ? o += "\\" + String(Number(s[1]) + a) : (o += s[0], s[0] === "(" && r++);
    }
    return o;
  }).map((n) => `(${n})`).join(t);
}
const Mi = /\b\B/, Vn = "[a-zA-Z]\\w*", tn = "[a-zA-Z_]\\w*", Qn = "\\b\\d+(\\.\\d+)?", Jn = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", er = "\\b(0b[01]+)", Li = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", Ii = (e = {}) => {
  const t = /^#![ ]*\//;
  return e.binary && (e.begin = He(
    t,
    /.*\b/,
    e.binary,
    /\b.*/
  )), Ce({
    scope: "meta",
    begin: t,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (r, n) => {
      r.index !== 0 && n.ignoreMatch();
    }
  }, e);
}, lt = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, Ci = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [lt]
}, Di = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [lt]
}, Pi = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
}, xt = function(e, t, r = {}) {
  const n = Ce(
    {
      scope: "comment",
      begin: e,
      end: t,
      contains: []
    },
    r
  );
  n.contains.push({
    scope: "doctag",
    // hack to avoid the space from being included. the space is necessary to
    // match here to prevent the plain text rule below from gobbling up doctags
    begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
    end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
    excludeBegin: !0,
    relevance: 0
  });
  const a = Jt(
    // list of common 1 and 2 letter words in English
    "I",
    "a",
    "is",
    "so",
    "us",
    "to",
    "at",
    "if",
    "in",
    "it",
    "on",
    // note: this is not an exhaustive list of contractions, just popular ones
    /[A-Za-z]+['](d|ve|re|ll|t|s|n)/,
    // contractions - can't we'd they're let's, etc
    /[A-Za-z]+[-][a-z]+/,
    // `no-way`, etc.
    /[A-Za-z][a-z]{2,}/
    // allow capitalized words at beginning of sentences
  );
  return n.contains.push(
    {
      // TODO: how to include ", (, ) without breaking grammars that use these for
      // comment delimiters?
      // begin: /[ ]+([()"]?([A-Za-z'-]{3,}|is|a|I|so|us|[tT][oO]|at|if|in|it|on)[.]?[()":]?([.][ ]|[ ]|\))){3}/
      // ---
      // this tries to find sequences of 3 english words in a row (without any
      // "programming" type syntax) this gives us a strong signal that we've
      // TRULY found a comment - vs perhaps scanning with the wrong language.
      // It's possible to find something that LOOKS like the start of the
      // comment - but then if there is no readable text - good chance it is a
      // false match and not a comment.
      //
      // for a visual example please see:
      // https://github.com/highlightjs/highlight.js/issues/2827
      begin: He(
        /[ ]+/,
        // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        "(",
        a,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
      // look for 3 words in a row
    }
  ), n;
}, Bi = xt("//", "$"), Ui = xt("/\\*", "\\*/"), zi = xt("#", "$"), $i = {
  scope: "number",
  begin: Qn,
  relevance: 0
}, Hi = {
  scope: "number",
  begin: Jn,
  relevance: 0
}, Fi = {
  scope: "number",
  begin: er,
  relevance: 0
}, Gi = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    lt,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [lt]
    }
  ]
}, Wi = {
  scope: "title",
  begin: Vn,
  relevance: 0
}, ji = {
  scope: "title",
  begin: tn,
  relevance: 0
}, Ki = {
  // excludes method names from keyword processing
  begin: "\\.\\s*" + tn,
  relevance: 0
}, qi = function(e) {
  return Object.assign(
    e,
    {
      /** @type {ModeCallback} */
      "on:begin": (t, r) => {
        r.data._beginMatch = t[1];
      },
      /** @type {ModeCallback} */
      "on:end": (t, r) => {
        r.data._beginMatch !== t[1] && r.ignoreMatch();
      }
    }
  );
};
var At = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  APOS_STRING_MODE: Ci,
  BACKSLASH_ESCAPE: lt,
  BINARY_NUMBER_MODE: Fi,
  BINARY_NUMBER_RE: er,
  COMMENT: xt,
  C_BLOCK_COMMENT_MODE: Ui,
  C_LINE_COMMENT_MODE: Bi,
  C_NUMBER_MODE: Hi,
  C_NUMBER_RE: Jn,
  END_SAME_AS_BEGIN: qi,
  HASH_COMMENT_MODE: zi,
  IDENT_RE: Vn,
  MATCH_NOTHING_RE: Mi,
  METHOD_GUARD: Ki,
  NUMBER_MODE: $i,
  NUMBER_RE: Qn,
  PHRASAL_WORDS_MODE: Pi,
  QUOTE_STRING_MODE: Di,
  REGEXP_MODE: Gi,
  RE_STARTERS_RE: Li,
  SHEBANG: Ii,
  TITLE_MODE: Wi,
  UNDERSCORE_IDENT_RE: tn,
  UNDERSCORE_TITLE_MODE: ji
});
function Zi(e, t) {
  e.input[e.index - 1] === "." && t.ignoreMatch();
}
function Yi(e, t) {
  e.className !== void 0 && (e.scope = e.className, delete e.className);
}
function Xi(e, t) {
  t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = Zi, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
}
function Vi(e, t) {
  Array.isArray(e.illegal) && (e.illegal = Jt(...e.illegal));
}
function Qi(e, t) {
  if (e.match) {
    if (e.begin || e.end) throw new Error("begin & end are not supported with match");
    e.begin = e.match, delete e.match;
  }
}
function Ji(e, t) {
  e.relevance === void 0 && (e.relevance = 1);
}
const eo = (e, t) => {
  if (!e.beforeMatch) return;
  if (e.starts) throw new Error("beforeMatch cannot be used with starts");
  const r = Object.assign({}, e);
  Object.keys(e).forEach((n) => {
    delete e[n];
  }), e.keywords = r.keywords, e.begin = He(r.beforeMatch, Yn(r.begin)), e.starts = {
    relevance: 0,
    contains: [
      Object.assign(r, { endsParent: !0 })
    ]
  }, e.relevance = 0, delete r.beforeMatch;
}, to = [
  "of",
  "and",
  "for",
  "in",
  "not",
  "or",
  "if",
  "then",
  "parent",
  // common variable name
  "list",
  // common variable name
  "value"
  // common variable name
], no = "keyword";
function tr(e, t, r = no) {
  const n = /* @__PURE__ */ Object.create(null);
  return typeof e == "string" ? a(r, e.split(" ")) : Array.isArray(e) ? a(r, e) : Object.keys(e).forEach(function(c) {
    Object.assign(
      n,
      tr(e[c], t, c)
    );
  }), n;
  function a(c, o) {
    t && (o = o.map((s) => s.toLowerCase())), o.forEach(function(s) {
      const d = s.split("|");
      n[d[0]] = [c, ro(d[0], d[1])];
    });
  }
}
function ro(e, t) {
  return t ? Number(t) : io(e) ? 0 : 1;
}
function io(e) {
  return to.includes(e.toLowerCase());
}
const Bn = {}, $e = (e) => {
  console.error(e);
}, Un = (e, ...t) => {
  console.log(`WARN: ${e}`, ...t);
}, Xe = (e, t) => {
  Bn[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), Bn[`${e}/${t}`] = !0);
}, kt = new Error();
function nr(e, t, { key: r }) {
  let n = 0;
  const a = e[r], c = {}, o = {};
  for (let s = 1; s <= t.length; s++)
    o[s + n] = a[s], c[s + n] = !0, n += Xn(t[s - 1]);
  e[r] = o, e[r]._emit = c, e[r]._multi = !0;
}
function oo(e) {
  if (Array.isArray(e.begin)) {
    if (e.skip || e.excludeBegin || e.returnBegin)
      throw $e("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), kt;
    if (typeof e.beginScope != "object" || e.beginScope === null)
      throw $e("beginScope must be object"), kt;
    nr(e, e.begin, { key: "beginScope" }), e.begin = en(e.begin, { joinWith: "" });
  }
}
function ao(e) {
  if (Array.isArray(e.end)) {
    if (e.skip || e.excludeEnd || e.returnEnd)
      throw $e("skip, excludeEnd, returnEnd not compatible with endScope: {}"), kt;
    if (typeof e.endScope != "object" || e.endScope === null)
      throw $e("endScope must be object"), kt;
    nr(e, e.end, { key: "endScope" }), e.end = en(e.end, { joinWith: "" });
  }
}
function so(e) {
  e.scope && typeof e.scope == "object" && e.scope !== null && (e.beginScope = e.scope, delete e.scope);
}
function co(e) {
  so(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), oo(e), ao(e);
}
function lo(e) {
  function t(o, s) {
    return new RegExp(
      ct(o),
      "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (s ? "g" : "")
    );
  }
  class r {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    // @ts-ignore
    addRule(s, d) {
      d.position = this.position++, this.matchIndexes[this.matchAt] = d, this.regexes.push([d, s]), this.matchAt += Xn(s) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const s = this.regexes.map((d) => d[1]);
      this.matcherRe = t(en(s, { joinWith: "|" }), !0), this.lastIndex = 0;
    }
    /** @param {string} s */
    exec(s) {
      this.matcherRe.lastIndex = this.lastIndex;
      const d = this.matcherRe.exec(s);
      if (!d)
        return null;
      const g = d.findIndex((_, E) => E > 0 && _ !== void 0), u = this.matchIndexes[g];
      return d.splice(0, g), Object.assign(d, u);
    }
  }
  class n {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    // @ts-ignore
    getMatcher(s) {
      if (this.multiRegexes[s]) return this.multiRegexes[s];
      const d = new r();
      return this.rules.slice(s).forEach(([g, u]) => d.addRule(g, u)), d.compile(), this.multiRegexes[s] = d, d;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    // @ts-ignore
    addRule(s, d) {
      this.rules.push([s, d]), d.type === "begin" && this.count++;
    }
    /** @param {string} s */
    exec(s) {
      const d = this.getMatcher(this.regexIndex);
      d.lastIndex = this.lastIndex;
      let g = d.exec(s);
      if (this.resumingScanAtSamePosition() && !(g && g.index === this.lastIndex)) {
        const u = this.getMatcher(0);
        u.lastIndex = this.lastIndex + 1, g = u.exec(s);
      }
      return g && (this.regexIndex += g.position + 1, this.regexIndex === this.count && this.considerAll()), g;
    }
  }
  function a(o) {
    const s = new n();
    return o.contains.forEach((d) => s.addRule(d.begin, { rule: d, type: "begin" })), o.terminatorEnd && s.addRule(o.terminatorEnd, { type: "end" }), o.illegal && s.addRule(o.illegal, { type: "illegal" }), s;
  }
  function c(o, s) {
    const d = (
      /** @type CompiledMode */
      o
    );
    if (o.isCompiled) return d;
    [
      Yi,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      Qi,
      co,
      eo
    ].forEach((u) => u(o, s)), e.compilerExtensions.forEach((u) => u(o, s)), o.__beforeBegin = null, [
      Xi,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      Vi,
      // default to 1 relevance if not specified
      Ji
    ].forEach((u) => u(o, s)), o.isCompiled = !0;
    let g = null;
    return typeof o.keywords == "object" && o.keywords.$pattern && (o.keywords = Object.assign({}, o.keywords), g = o.keywords.$pattern, delete o.keywords.$pattern), g = g || /\w+/, o.keywords && (o.keywords = tr(o.keywords, e.case_insensitive)), d.keywordPatternRe = t(g, !0), s && (o.begin || (o.begin = /\B|\b/), d.beginRe = t(d.begin), !o.end && !o.endsWithParent && (o.end = /\B|\b/), o.end && (d.endRe = t(d.end)), d.terminatorEnd = ct(d.end) || "", o.endsWithParent && s.terminatorEnd && (d.terminatorEnd += (o.end ? "|" : "") + s.terminatorEnd)), o.illegal && (d.illegalRe = t(
      /** @type {RegExp | string} */
      o.illegal
    )), o.contains || (o.contains = []), o.contains = [].concat(...o.contains.map(function(u) {
      return uo(u === "self" ? o : u);
    })), o.contains.forEach(function(u) {
      c(
        /** @type Mode */
        u,
        d
      );
    }), o.starts && c(o.starts, s), d.matcher = a(d), d;
  }
  if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return e.classNameAliases = Ce(e.classNameAliases || {}), c(
    /** @type Mode */
    e
  );
}
function rr(e) {
  return e ? e.endsWithParent || rr(e.starts) : !1;
}
function uo(e) {
  return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(function(t) {
    return Ce(e, { variants: null }, t);
  })), e.cachedVariants ? e.cachedVariants : rr(e) ? Ce(e, { starts: e.starts ? Ce(e.starts) : null }) : Object.isFrozen(e) ? Ce(e) : e;
}
var go = "11.11.1";
class po extends Error {
  constructor(t, r) {
    super(t), this.name = "HTMLInjectionError", this.html = r;
  }
}
const Yt = Zn, zn = Ce, $n = Symbol("nomatch"), fo = 7, ir = function(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null), n = [];
  let a = !0;
  const c = "Could not find the language '{}', did you forget to load/include a language module?", o = { disableAutodetect: !0, name: "Plain text", contains: [] };
  let s = {
    ignoreUnescapedHTML: !1,
    throwUnescapedHTML: !1,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: wi
  };
  function d(f) {
    return s.noHighlightRe.test(f);
  }
  function g(f) {
    let S = f.className + " ";
    S += f.parentNode ? f.parentNode.className : "";
    const T = s.languageDetectRe.exec(S);
    if (T) {
      const R = K(T[1]);
      return R || (Un(c.replace("{}", T[1])), Un("Falling back to no-highlight mode for this block.", f)), R ? T[1] : "no-highlight";
    }
    return S.split(/\s+/).find((R) => d(R) || K(R));
  }
  function u(f, S, T) {
    let R = "", U = "";
    typeof S == "object" ? (R = f, T = S.ignoreIllegals, U = S.language) : (Xe("10.7.0", "highlight(lang, code, ...args) has been deprecated."), Xe("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), U = f, R = S), T === void 0 && (T = !0);
    const O = {
      code: R,
      language: U
    };
    Ae("before:highlight", O);
    const te = O.result ? O.result : _(O.language, O.code, T);
    return te.code = O.code, Ae("after:highlight", te), te;
  }
  function _(f, S, T, R) {
    const U = /* @__PURE__ */ Object.create(null);
    function O(b, A) {
      return b.keywords[A];
    }
    function te() {
      if (!v.keywords) {
        Q.addText(W);
        return;
      }
      let b = 0;
      v.keywordPatternRe.lastIndex = 0;
      let A = v.keywordPatternRe.exec(W), k = "";
      for (; A; ) {
        k += W.substring(b, A.index);
        const $ = z.case_insensitive ? A[0].toLowerCase() : A[0], Z = O(v, $);
        if (Z) {
          const [ge, Ge] = Z;
          if (Q.addText(k), k = "", U[$] = (U[$] || 0) + 1, U[$] <= fo && (Be += Ge), ge.startsWith("_"))
            k += A[0];
          else {
            const mt = z.classNameAliases[ge] || ge;
            _e(A[0], mt);
          }
        } else
          k += A[0];
        b = v.keywordPatternRe.lastIndex, A = v.keywordPatternRe.exec(W);
      }
      k += W.substring(b), Q.addText(k);
    }
    function be() {
      if (W === "") return;
      let b = null;
      if (typeof v.subLanguage == "string") {
        if (!t[v.subLanguage]) {
          Q.addText(W);
          return;
        }
        b = _(v.subLanguage, W, !0, nt[v.subLanguage]), nt[v.subLanguage] = /** @type {CompiledMode} */
        b._top;
      } else
        b = h(W, v.subLanguage.length ? v.subLanguage : null);
      v.relevance > 0 && (Be += b.relevance), Q.__addSublanguage(b._emitter, b.language);
    }
    function le() {
      v.subLanguage != null ? be() : te(), W = "";
    }
    function _e(b, A) {
      b !== "" && (Q.startScope(A), Q.addText(b), Q.endScope());
    }
    function ut(b, A) {
      let k = 1;
      const $ = A.length - 1;
      for (; k <= $; ) {
        if (!b._emit[k]) {
          k++;
          continue;
        }
        const Z = z.classNameAliases[b[k]] || b[k], ge = A[k];
        Z ? _e(ge, Z) : (W = ge, te(), W = ""), k++;
      }
    }
    function gt(b, A) {
      return b.scope && typeof b.scope == "string" && Q.openNode(z.classNameAliases[b.scope] || b.scope), b.beginScope && (b.beginScope._wrap ? (_e(W, z.classNameAliases[b.beginScope._wrap] || b.beginScope._wrap), W = "") : b.beginScope._multi && (ut(b.beginScope, A), W = "")), v = Object.create(b, { parent: { value: v } }), v;
    }
    function et(b, A, k) {
      let $ = Ri(b.endRe, k);
      if ($) {
        if (b["on:end"]) {
          const Z = new Cn(b);
          b["on:end"](A, Z), Z.isMatchIgnored && ($ = !1);
        }
        if ($) {
          for (; b.endsParent && b.parent; )
            b = b.parent;
          return b;
        }
      }
      if (b.endsWithParent)
        return et(b.parent, A, k);
    }
    function Mt(b) {
      return v.matcher.regexIndex === 0 ? (W += b[0], 1) : (Te = !0, 0);
    }
    function pt(b) {
      const A = b[0], k = b.rule, $ = new Cn(k), Z = [k.__beforeBegin, k["on:begin"]];
      for (const ge of Z)
        if (ge && (ge(b, $), $.isMatchIgnored))
          return Mt(A);
      return k.skip ? W += A : (k.excludeBegin && (W += A), le(), !k.returnBegin && !k.excludeBegin && (W = A)), gt(k, b), k.returnBegin ? 0 : A.length;
    }
    function q(b) {
      const A = b[0], k = S.substring(b.index), $ = et(v, b, k);
      if (!$)
        return $n;
      const Z = v;
      v.endScope && v.endScope._wrap ? (le(), _e(A, v.endScope._wrap)) : v.endScope && v.endScope._multi ? (le(), ut(v.endScope, b)) : Z.skip ? W += A : (Z.returnEnd || Z.excludeEnd || (W += A), le(), Z.excludeEnd && (W = A));
      do
        v.scope && Q.closeNode(), !v.skip && !v.subLanguage && (Be += v.relevance), v = v.parent;
      while (v !== $.parent);
      return $.starts && gt($.starts, b), Z.returnEnd ? 0 : A.length;
    }
    function ft() {
      const b = [];
      for (let A = v; A !== z; A = A.parent)
        A.scope && b.unshift(A.scope);
      b.forEach((A) => Q.openNode(A));
    }
    let j = {};
    function tt(b, A) {
      const k = A && A[0];
      if (W += b, k == null)
        return le(), 0;
      if (j.type === "begin" && A.type === "end" && j.index === A.index && k === "") {
        if (W += S.slice(A.index, A.index + 1), !a) {
          const $ = new Error(`0 width match regex (${f})`);
          throw $.languageName = f, $.badRule = j.rule, $;
        }
        return 1;
      }
      if (j = A, A.type === "begin")
        return pt(A);
      if (A.type === "illegal" && !T) {
        const $ = new Error('Illegal lexeme "' + k + '" for mode "' + (v.scope || "<unnamed>") + '"');
        throw $.mode = v, $;
      } else if (A.type === "end") {
        const $ = q(A);
        if ($ !== $n)
          return $;
      }
      if (A.type === "illegal" && k === "")
        return W += `
`, 1;
      if (Ee > 1e5 && Ee > A.index * 3)
        throw new Error("potential infinite loop, way more iterations than matches");
      return W += k, k.length;
    }
    const z = K(f);
    if (!z)
      throw $e(c.replace("{}", f)), new Error('Unknown language: "' + f + '"');
    const Pe = lo(z);
    let Fe = "", v = R || Pe;
    const nt = {}, Q = new s.__emitter(s);
    ft();
    let W = "", Be = 0, ae = 0, Ee = 0, Te = !1;
    try {
      if (z.__emitTokens)
        z.__emitTokens(S, Q);
      else {
        for (v.matcher.considerAll(); ; ) {
          Ee++, Te ? Te = !1 : v.matcher.considerAll(), v.matcher.lastIndex = ae;
          const b = v.matcher.exec(S);
          if (!b) break;
          const A = S.substring(ae, b.index), k = tt(A, b);
          ae = b.index + k;
        }
        tt(S.substring(ae));
      }
      return Q.finalize(), Fe = Q.toHTML(), {
        language: f,
        value: Fe,
        relevance: Be,
        illegal: !1,
        _emitter: Q,
        _top: v
      };
    } catch (b) {
      if (b.message && b.message.includes("Illegal"))
        return {
          language: f,
          value: Yt(S),
          illegal: !0,
          relevance: 0,
          _illegalBy: {
            message: b.message,
            index: ae,
            context: S.slice(ae - 100, ae + 100),
            mode: b.mode,
            resultSoFar: Fe
          },
          _emitter: Q
        };
      if (a)
        return {
          language: f,
          value: Yt(S),
          illegal: !1,
          relevance: 0,
          errorRaised: b,
          _emitter: Q,
          _top: v
        };
      throw b;
    }
  }
  function E(f) {
    const S = {
      value: Yt(f),
      illegal: !1,
      relevance: 0,
      _top: o,
      _emitter: new s.__emitter(s)
    };
    return S._emitter.addText(f), S;
  }
  function h(f, S) {
    S = S || s.languages || Object.keys(t);
    const T = E(f), R = S.filter(K).filter(me).map(
      (le) => _(le, f, !1)
    );
    R.unshift(T);
    const U = R.sort((le, _e) => {
      if (le.relevance !== _e.relevance) return _e.relevance - le.relevance;
      if (le.language && _e.language) {
        if (K(le.language).supersetOf === _e.language)
          return 1;
        if (K(_e.language).supersetOf === le.language)
          return -1;
      }
      return 0;
    }), [O, te] = U, be = O;
    return be.secondBest = te, be;
  }
  function x(f, S, T) {
    const R = S && r[S] || T;
    f.classList.add("hljs"), f.classList.add(`language-${R}`);
  }
  function M(f) {
    let S = null;
    const T = g(f);
    if (d(T)) return;
    if (Ae(
      "before:highlightElement",
      { el: f, language: T }
    ), f.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", f);
      return;
    }
    if (f.children.length > 0 && (s.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(f)), s.throwUnescapedHTML))
      throw new po(
        "One of your code blocks includes unescaped HTML.",
        f.innerHTML
      );
    S = f;
    const R = S.textContent, U = T ? u(R, { language: T, ignoreIllegals: !0 }) : h(R);
    f.innerHTML = U.value, f.dataset.highlighted = "yes", x(f, T, U.language), f.result = {
      language: U.language,
      // TODO: remove with version 11.0
      re: U.relevance,
      relevance: U.relevance
    }, U.secondBest && (f.secondBest = {
      language: U.secondBest.language,
      relevance: U.secondBest.relevance
    }), Ae("after:highlightElement", { el: f, result: U, text: R });
  }
  function P(f) {
    s = zn(s, f);
  }
  const H = () => {
    L(), Xe("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function F() {
    L(), Xe("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let G = !1;
  function L() {
    function f() {
      L();
    }
    if (document.readyState === "loading") {
      G || window.addEventListener("DOMContentLoaded", f, !1), G = !0;
      return;
    }
    document.querySelectorAll(s.cssSelector).forEach(M);
  }
  function C(f, S) {
    let T = null;
    try {
      T = S(e);
    } catch (R) {
      if ($e("Language definition for '{}' could not be registered.".replace("{}", f)), a)
        $e(R);
      else
        throw R;
      T = o;
    }
    T.name || (T.name = f), t[f] = T, T.rawDefinition = S.bind(null, e), T.aliases && ee(T.aliases, { languageName: f });
  }
  function I(f) {
    delete t[f];
    for (const S of Object.keys(r))
      r[S] === f && delete r[S];
  }
  function D() {
    return Object.keys(t);
  }
  function K(f) {
    return f = (f || "").toLowerCase(), t[f] || t[r[f]];
  }
  function ee(f, { languageName: S }) {
    typeof f == "string" && (f = [f]), f.forEach((T) => {
      r[T.toLowerCase()] = S;
    });
  }
  function me(f) {
    const S = K(f);
    return S && !S.disableAutodetect;
  }
  function Re(f) {
    f["before:highlightBlock"] && !f["before:highlightElement"] && (f["before:highlightElement"] = (S) => {
      f["before:highlightBlock"](
        Object.assign({ block: S.el }, S)
      );
    }), f["after:highlightBlock"] && !f["after:highlightElement"] && (f["after:highlightElement"] = (S) => {
      f["after:highlightBlock"](
        Object.assign({ block: S.el }, S)
      );
    });
  }
  function he(f) {
    Re(f), n.push(f);
  }
  function De(f) {
    const S = n.indexOf(f);
    S !== -1 && n.splice(S, 1);
  }
  function Ae(f, S) {
    const T = f;
    n.forEach(function(R) {
      R[T] && R[T](S);
    });
  }
  function ve(f) {
    return Xe("10.7.0", "highlightBlock will be removed entirely in v12.0"), Xe("10.7.0", "Please use highlightElement now."), M(f);
  }
  Object.assign(e, {
    highlight: u,
    highlightAuto: h,
    highlightAll: L,
    highlightElement: M,
    // TODO: Remove with v12 API
    highlightBlock: ve,
    configure: P,
    initHighlighting: H,
    initHighlightingOnLoad: F,
    registerLanguage: C,
    unregisterLanguage: I,
    listLanguages: D,
    getLanguage: K,
    registerAliases: ee,
    autoDetection: me,
    inherit: zn,
    addPlugin: he,
    removePlugin: De
  }), e.debugMode = function() {
    a = !1;
  }, e.safeMode = function() {
    a = !0;
  }, e.versionString = go, e.regex = {
    concat: He,
    lookahead: Yn,
    either: Jt,
    optional: Oi,
    anyNumberOfTimes: Ni
  };
  for (const f in At)
    typeof At[f] == "object" && qn(At[f]);
  return Object.assign(e, At), e;
}, Je = ir({});
Je.newInstance = () => ir({});
var mo = Je;
Je.HighlightJS = Je;
Je.default = Je;
const V = /* @__PURE__ */ yi(mo);
function or(e) {
  const t = e.regex, r = {}, n = {
    begin: /\$\{/,
    end: /\}/,
    contains: [
      "self",
      {
        begin: /:-/,
        contains: [r]
      }
      // default values
    ]
  };
  Object.assign(r, {
    className: "variable",
    variants: [
      { begin: t.concat(
        /\$[\w\d#@][\w\d_]*/,
        // negative look-ahead tries to avoid matching patterns that are not
        // Perl at all like $ident$, @ident@, etc.
        "(?![\\w\\d])(?![$])"
      ) },
      n
    ]
  });
  const a = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, c = e.inherit(
    e.COMMENT(),
    {
      match: [
        /(^|\s)/,
        /#.*$/
      ],
      scope: {
        2: "comment"
      }
    }
  ), o = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, s = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      r,
      a
    ]
  };
  a.contains.push(s);
  const d = {
    match: /\\"/
  }, g = {
    className: "string",
    begin: /'/,
    end: /'/
  }, u = {
    match: /\\'/
  }, _ = {
    begin: /\$?\(\(/,
    end: /\)\)/,
    contains: [
      {
        begin: /\d+#[0-9a-f]+/,
        className: "number"
      },
      e.NUMBER_MODE,
      r
    ]
  }, E = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], h = e.SHEBANG({
    binary: `(${E.join("|")})`,
    relevance: 10
  }), x = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, M = [
    "if",
    "then",
    "else",
    "elif",
    "fi",
    "time",
    "for",
    "while",
    "until",
    "in",
    "do",
    "done",
    "case",
    "esac",
    "coproc",
    "function",
    "select"
  ], P = [
    "true",
    "false"
  ], H = { match: /(\/[a-z._-]+)+/ }, F = [
    "break",
    "cd",
    "continue",
    "eval",
    "exec",
    "exit",
    "export",
    "getopts",
    "hash",
    "pwd",
    "readonly",
    "return",
    "shift",
    "test",
    "times",
    "trap",
    "umask",
    "unset"
  ], G = [
    "alias",
    "bind",
    "builtin",
    "caller",
    "command",
    "declare",
    "echo",
    "enable",
    "help",
    "let",
    "local",
    "logout",
    "mapfile",
    "printf",
    "read",
    "readarray",
    "source",
    "sudo",
    "type",
    "typeset",
    "ulimit",
    "unalias"
  ], L = [
    "autoload",
    "bg",
    "bindkey",
    "bye",
    "cap",
    "chdir",
    "clone",
    "comparguments",
    "compcall",
    "compctl",
    "compdescribe",
    "compfiles",
    "compgroups",
    "compquote",
    "comptags",
    "comptry",
    "compvalues",
    "dirs",
    "disable",
    "disown",
    "echotc",
    "echoti",
    "emulate",
    "fc",
    "fg",
    "float",
    "functions",
    "getcap",
    "getln",
    "history",
    "integer",
    "jobs",
    "kill",
    "limit",
    "log",
    "noglob",
    "popd",
    "print",
    "pushd",
    "pushln",
    "rehash",
    "sched",
    "setcap",
    "setopt",
    "stat",
    "suspend",
    "ttyctl",
    "unfunction",
    "unhash",
    "unlimit",
    "unsetopt",
    "vared",
    "wait",
    "whence",
    "where",
    "which",
    "zcompile",
    "zformat",
    "zftp",
    "zle",
    "zmodload",
    "zparseopts",
    "zprof",
    "zpty",
    "zregexparse",
    "zsocket",
    "zstyle",
    "ztcp"
  ], C = [
    "chcon",
    "chgrp",
    "chown",
    "chmod",
    "cp",
    "dd",
    "df",
    "dir",
    "dircolors",
    "ln",
    "ls",
    "mkdir",
    "mkfifo",
    "mknod",
    "mktemp",
    "mv",
    "realpath",
    "rm",
    "rmdir",
    "shred",
    "sync",
    "touch",
    "truncate",
    "vdir",
    "b2sum",
    "base32",
    "base64",
    "cat",
    "cksum",
    "comm",
    "csplit",
    "cut",
    "expand",
    "fmt",
    "fold",
    "head",
    "join",
    "md5sum",
    "nl",
    "numfmt",
    "od",
    "paste",
    "ptx",
    "pr",
    "sha1sum",
    "sha224sum",
    "sha256sum",
    "sha384sum",
    "sha512sum",
    "shuf",
    "sort",
    "split",
    "sum",
    "tac",
    "tail",
    "tr",
    "tsort",
    "unexpand",
    "uniq",
    "wc",
    "arch",
    "basename",
    "chroot",
    "date",
    "dirname",
    "du",
    "echo",
    "env",
    "expr",
    "factor",
    // "false", // keyword literal already
    "groups",
    "hostid",
    "id",
    "link",
    "logname",
    "nice",
    "nohup",
    "nproc",
    "pathchk",
    "pinky",
    "printenv",
    "printf",
    "pwd",
    "readlink",
    "runcon",
    "seq",
    "sleep",
    "stat",
    "stdbuf",
    "stty",
    "tee",
    "test",
    "timeout",
    // "true", // keyword literal already
    "tty",
    "uname",
    "unlink",
    "uptime",
    "users",
    "who",
    "whoami",
    "yes"
  ];
  return {
    name: "Bash",
    aliases: [
      "sh",
      "zsh"
    ],
    keywords: {
      $pattern: /\b[a-z][a-z0-9._-]+\b/,
      keyword: M,
      literal: P,
      built_in: [
        ...F,
        ...G,
        // Shell modifiers
        "set",
        "shopt",
        ...L,
        ...C
      ]
    },
    contains: [
      h,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      x,
      _,
      c,
      o,
      H,
      s,
      d,
      g,
      u,
      r
    ]
  };
}
const ho = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), bo = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], _o = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], Eo = [
  ...bo,
  ..._o
], To = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), yo = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), So = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), Ao = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function vo(e) {
  const t = e.regex, r = ho(e), n = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, a = "and or not only", c = /@-?\w[\w]*(-\w+)*/, o = "[a-zA-Z-][a-zA-Z0-9_-]*", s = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE
  ];
  return {
    name: "CSS",
    case_insensitive: !0,
    illegal: /[=|'\$]/,
    keywords: { keyframePosition: "from to" },
    classNameAliases: {
      // for visual continuity with `tag {}` and because we
      // don't have a great class for this?
      keyframePosition: "selector-tag"
    },
    contains: [
      r.BLOCK_COMMENT,
      n,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      r.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: /#[A-Za-z0-9_-]+/,
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\." + o,
        relevance: 0
      },
      r.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + yo.join("|") + ")" },
          { begin: ":(:)?(" + So.join("|") + ")" }
        ]
      },
      // we may actually need this (12/2020)
      // { // pseudo-selector params
      //   begin: /\(/,
      //   end: /\)/,
      //   contains: [ hljs.CSS_NUMBER_MODE ]
      // },
      r.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + Ao.join("|") + ")\\b"
      },
      // attribute values
      {
        begin: /:/,
        end: /[;}{]/,
        contains: [
          r.BLOCK_COMMENT,
          r.HEXCOLOR,
          r.IMPORTANT,
          r.CSS_NUMBER_MODE,
          ...s,
          // needed to highlight these as strings and to avoid issues with
          // illegal characters that might be inside urls that would tigger the
          // languages illegal stack
          {
            begin: /(url|data-uri)\(/,
            end: /\)/,
            relevance: 0,
            // from keywords
            keywords: { built_in: "url data-uri" },
            contains: [
              ...s,
              {
                className: "string",
                // any character other than `)` as in `url()` will be the start
                // of a string, which ends with `)` (from the parent mode)
                begin: /[^)]/,
                endsWithParent: !0,
                excludeEnd: !0
              }
            ]
          },
          r.FUNCTION_DISPATCH
        ]
      },
      {
        begin: t.lookahead(/@/),
        end: "[{;]",
        relevance: 0,
        illegal: /:/,
        // break on Less variables @var: ...
        contains: [
          {
            className: "keyword",
            begin: c
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: a,
              attribute: To.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...s,
              r.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + Eo.join("|") + ")\\b"
      }
    ]
  };
}
var Qe = "[0-9](_*[0-9])*", vt = `\\.(${Qe})`, wt = "[0-9a-fA-F](_*[0-9a-fA-F])*", Hn = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${Qe})((${vt})|\\.)?|(${vt}))[eE][+-]?(${Qe})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${Qe})((${vt})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${vt})[fFdD]?\\b` },
    { begin: `\\b(${Qe})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${wt})\\.?|(${wt})?\\.(${wt}))[pP][+-]?(${Qe})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${wt})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function ar(e, t, r) {
  return r === -1 ? "" : e.replace(t, (n) => ar(e, t, r - 1));
}
function wo(e) {
  const t = e.regex, r = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", n = r + ar("(?:<" + r + "~~~(?:\\s*,\\s*" + r + "~~~)*>)?", /~~~/g, 2), d = {
    keyword: [
      "synchronized",
      "abstract",
      "private",
      "var",
      "static",
      "if",
      "const ",
      "for",
      "while",
      "strictfp",
      "finally",
      "protected",
      "import",
      "native",
      "final",
      "void",
      "enum",
      "else",
      "break",
      "transient",
      "catch",
      "instanceof",
      "volatile",
      "case",
      "assert",
      "package",
      "default",
      "public",
      "try",
      "switch",
      "continue",
      "throws",
      "protected",
      "public",
      "private",
      "module",
      "requires",
      "exports",
      "do",
      "sealed",
      "yield",
      "permits",
      "goto",
      "when"
    ],
    literal: [
      "false",
      "true",
      "null"
    ],
    type: [
      "char",
      "boolean",
      "long",
      "float",
      "int",
      "byte",
      "short",
      "double"
    ],
    built_in: [
      "super",
      "this"
    ]
  }, g = {
    className: "meta",
    begin: "@" + r,
    contains: [
      {
        begin: /\(/,
        end: /\)/,
        contains: ["self"]
        // allow nested () inside our annotation
      }
    ]
  }, u = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    keywords: d,
    relevance: 0,
    contains: [e.C_BLOCK_COMMENT_MODE],
    endsParent: !0
  };
  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: d,
    illegal: /<\/|#/,
    contains: [
      e.COMMENT(
        "/\\*\\*",
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              // eat up @'s in emails to prevent them to be recognized as doctags
              begin: /\w+@/,
              relevance: 0
            },
            {
              className: "doctag",
              begin: "@[A-Za-z]+"
            }
          ]
        }
      ),
      // relevance boost
      {
        begin: /import java\.[a-z]+\./,
        keywords: "import",
        relevance: 2
      },
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      {
        begin: /"""/,
        end: /"""/,
        className: "string",
        contains: [e.BACKSLASH_ESCAPE]
      },
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      {
        match: [
          /\b(?:class|interface|enum|extends|implements|new)/,
          /\s+/,
          r
        ],
        className: {
          1: "keyword",
          3: "title.class"
        }
      },
      {
        // Exceptions for hyphenated keywords
        match: /non-sealed/,
        scope: "keyword"
      },
      {
        begin: [
          t.concat(/(?!else)/, r),
          /\s+/,
          r,
          /\s+/,
          /=(?!=)/
        ],
        className: {
          1: "type",
          3: "variable",
          5: "operator"
        }
      },
      {
        begin: [
          /record/,
          /\s+/,
          r
        ],
        className: {
          1: "keyword",
          3: "title.class"
        },
        contains: [
          u,
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      {
        // Expression keywords prevent 'keyword Name(...)' from being
        // recognized as a function definition
        beginKeywords: "new throw return else",
        relevance: 0
      },
      {
        begin: [
          "(?:" + n + "\\s+)",
          e.UNDERSCORE_IDENT_RE,
          /\s*(?=\()/
        ],
        className: { 2: "title.function" },
        keywords: d,
        contains: [
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: d,
            relevance: 0,
            contains: [
              g,
              e.APOS_STRING_MODE,
              e.QUOTE_STRING_MODE,
              Hn,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      Hn,
      g
    ]
  };
}
const Fn = "[A-Za-z$_][0-9A-Za-z$_]*", No = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], Oo = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], sr = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], cr = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], lr = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], ko = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Ro = [].concat(
  lr,
  sr,
  cr
);
function dr(e) {
  const t = e.regex, r = (T, { after: R }) => {
    const U = "</" + T[0].slice(1);
    return T.input.indexOf(U, R) !== -1;
  }, n = Fn, a = {
    begin: "<>",
    end: "</>"
  }, c = /<[A-Za-z0-9\\._:-]+\s*\/>/, o = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (T, R) => {
      const U = T[0].length + T.index, O = T.input[U];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        O === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        O === ","
      ) {
        R.ignoreMatch();
        return;
      }
      O === ">" && (r(T, { after: U }) || R.ignoreMatch());
      let te;
      const be = T.input.substring(U);
      if (te = be.match(/^\s*=/)) {
        R.ignoreMatch();
        return;
      }
      if ((te = be.match(/^\s+extends\s+/)) && te.index === 0) {
        R.ignoreMatch();
        return;
      }
    }
  }, s = {
    $pattern: Fn,
    keyword: No,
    literal: Oo,
    built_in: Ro,
    "variable.language": ko
  }, d = "[0-9](_?[0-9])*", g = `\\.(${d})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", _ = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${g})|\\.)?|(${g}))[eE][+-]?(${d})\\b` },
      { begin: `\\b(${u})\\b((${g})\\b|\\.)?|(${g})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, E = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: s,
    contains: []
    // defined later
  }, h = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        E
      ],
      subLanguage: "xml"
    }
  }, x = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        E
      ],
      subLanguage: "css"
    }
  }, M = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        E
      ],
      subLanguage: "graphql"
    }
  }, P = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      E
    ]
  }, F = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: n + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, G = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    h,
    x,
    M,
    P,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    _
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  E.contains = G.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: s,
    contains: [
      "self"
    ].concat(G)
  });
  const L = [].concat(F, E.contains), C = L.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: s,
      contains: ["self"].concat(L)
    }
  ]), I = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: s,
    contains: C
  }, D = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          n,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(n, "(", t.concat(/\./, n), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          n
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, K = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...sr,
        ...cr
      ]
    }
  }, ee = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, me = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          n,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [I],
    illegal: /%/
  }, Re = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function he(T) {
    return t.concat("(?!", T.join("|"), ")");
  }
  const De = {
    match: t.concat(
      /\b/,
      he([
        ...lr,
        "super",
        "import"
      ].map((T) => `${T}\\s*\\(`)),
      n,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, Ae = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(n, /(?![0-9A-Za-z$_(])/)
    )),
    end: n,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ve = {
    match: [
      /get|set/,
      /\s+/,
      n,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      I
    ]
  }, f = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", S = {
    match: [
      /const|var|let/,
      /\s+/,
      n,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(f)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      I
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: s,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: C, CLASS_REFERENCE: K },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      ee,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      h,
      x,
      M,
      P,
      F,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      _,
      K,
      {
        scope: "attr",
        match: n + t.lookahead(":"),
        relevance: 0
      },
      S,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          F,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: f,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: s,
                    contains: C
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: a.begin, end: a.end },
              { match: c },
              {
                begin: o.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": o.isTrulyOpeningTag,
                end: o.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: o.begin,
                end: o.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      me,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          I,
          e.inherit(e.TITLE_MODE, { begin: n, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      Ae,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + n,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [I]
      },
      De,
      Re,
      D,
      ve,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function xo(e) {
  const t = {
    className: "attr",
    begin: /"(\\.|[^\\"\r\n])*"(?=\s*:)/,
    relevance: 1.01
  }, r = {
    match: /[{}[\],:]/,
    className: "punctuation",
    relevance: 0
  }, n = [
    "true",
    "false",
    "null"
  ], a = {
    scope: "literal",
    beginKeywords: n.join(" ")
  };
  return {
    name: "JSON",
    aliases: ["jsonc"],
    keywords: {
      literal: n
    },
    contains: [
      t,
      r,
      e.QUOTE_STRING_MODE,
      a,
      e.C_NUMBER_MODE,
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function ur(e) {
  const t = e.regex, r = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, n = {
    begin: "^[-\\*]{3,}",
    end: "$"
  }, a = {
    className: "code",
    variants: [
      // TODO: fix to allow these to work with sublanguage also
      { begin: "(`{3,})[^`](.|\\n)*?\\1`*[ ]*" },
      { begin: "(~{3,})[^~](.|\\n)*?\\1~*[ ]*" },
      // needed to allow markdown as a sublanguage to work
      {
        begin: "```",
        end: "```+[ ]*$"
      },
      {
        begin: "~~~",
        end: "~~~+[ ]*$"
      },
      { begin: "`.+?`" },
      {
        begin: "(?=^( {4}|\\t))",
        // use contains to gobble up multiple lines to allow the block to be whatever size
        // but only have a single open/close tag vs one per line
        contains: [
          {
            begin: "^( {4}|\\t)",
            end: "(\\n)$"
          }
        ],
        relevance: 0
      }
    ]
  }, c = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: !0
  }, o = {
    begin: /^\[[^\n]+\]:/,
    returnBegin: !0,
    contains: [
      {
        className: "symbol",
        begin: /\[/,
        end: /\]/,
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "link",
        begin: /:\s*/,
        end: /$/,
        excludeBegin: !0
      }
    ]
  }, s = /[A-Za-z][A-Za-z0-9+.-]*/, d = {
    variants: [
      // too much like nested array access in so many languages
      // to have any real relevance
      {
        begin: /\[.+?\]\[.*?\]/,
        relevance: 0
      },
      // popular internet URLs
      {
        begin: /\[.+?\]\(((data|javascript|mailto):|(?:http|ftp)s?:\/\/).*?\)/,
        relevance: 2
      },
      {
        begin: t.concat(/\[.+?\]\(/, s, /:\/\/.*?\)/),
        relevance: 2
      },
      // relative urls
      {
        begin: /\[.+?\]\([./?&#].*?\)/,
        relevance: 1
      },
      // whatever else, lower relevance (might not be a link at all)
      {
        begin: /\[.*?\]\(.*?\)/,
        relevance: 0
      }
    ],
    returnBegin: !0,
    contains: [
      {
        // empty strings for alt or link text
        match: /\[(?=\])/
      },
      {
        className: "string",
        relevance: 0,
        begin: "\\[",
        end: "\\]",
        excludeBegin: !0,
        returnEnd: !0
      },
      {
        className: "link",
        relevance: 0,
        begin: "\\]\\(",
        end: "\\)",
        excludeBegin: !0,
        excludeEnd: !0
      },
      {
        className: "symbol",
        relevance: 0,
        begin: "\\]\\[",
        end: "\\]",
        excludeBegin: !0,
        excludeEnd: !0
      }
    ]
  }, g = {
    className: "strong",
    contains: [],
    // defined later
    variants: [
      {
        begin: /_{2}(?!\s)/,
        end: /_{2}/
      },
      {
        begin: /\*{2}(?!\s)/,
        end: /\*{2}/
      }
    ]
  }, u = {
    className: "emphasis",
    contains: [],
    // defined later
    variants: [
      {
        begin: /\*(?![*\s])/,
        end: /\*/
      },
      {
        begin: /_(?![_\s])/,
        end: /_/,
        relevance: 0
      }
    ]
  }, _ = e.inherit(g, { contains: [] }), E = e.inherit(u, { contains: [] });
  g.contains.push(E), u.contains.push(_);
  let h = [
    r,
    d
  ];
  return [
    g,
    u,
    _,
    E
  ].forEach((H) => {
    H.contains = H.contains.concat(h);
  }), h = h.concat(g, u), {
    name: "Markdown",
    aliases: [
      "md",
      "mkdown",
      "mkd"
    ],
    contains: [
      {
        className: "section",
        variants: [
          {
            begin: "^#{1,6}",
            end: "$",
            contains: h
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              { begin: "^[=-]*$" },
              {
                begin: "^",
                end: "\\n",
                contains: h
              }
            ]
          }
        ]
      },
      r,
      c,
      g,
      u,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: h,
        end: "$"
      },
      a,
      n,
      d,
      o,
      {
        //https://spec.commonmark.org/0.31.2/#entity-references
        scope: "literal",
        match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
      }
    ]
  };
}
function gr(e) {
  return {
    name: "Plain text",
    aliases: [
      "text",
      "txt"
    ],
    disableAutodetect: !0
  };
}
const Mo = (e) => ({
  IMPORTANT: {
    scope: "meta",
    begin: "!important"
  },
  BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
  HEXCOLOR: {
    scope: "number",
    begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
  },
  FUNCTION_DISPATCH: {
    className: "built_in",
    begin: /[\w-]+(?=\()/
  },
  ATTRIBUTE_SELECTOR_MODE: {
    scope: "selector-attr",
    begin: /\[/,
    end: /\]/,
    illegal: "$",
    contains: [
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE
    ]
  },
  CSS_NUMBER_MODE: {
    scope: "number",
    begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
    relevance: 0
  },
  CSS_VARIABLE: {
    className: "attr",
    begin: /--[A-Za-z_][A-Za-z0-9_-]*/
  }
}), Lo = [
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "dd",
  "del",
  "details",
  "dfn",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "main",
  "mark",
  "menu",
  "nav",
  "object",
  "ol",
  "optgroup",
  "option",
  "p",
  "picture",
  "q",
  "quote",
  "samp",
  "section",
  "select",
  "source",
  "span",
  "strong",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "tr",
  "ul",
  "var",
  "video"
], Io = [
  "defs",
  "g",
  "marker",
  "mask",
  "pattern",
  "svg",
  "switch",
  "symbol",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feFlood",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMorphology",
  "feOffset",
  "feSpecularLighting",
  "feTile",
  "feTurbulence",
  "linearGradient",
  "radialGradient",
  "stop",
  "circle",
  "ellipse",
  "image",
  "line",
  "path",
  "polygon",
  "polyline",
  "rect",
  "text",
  "use",
  "textPath",
  "tspan",
  "foreignObject",
  "clipPath"
], Co = [
  ...Lo,
  ...Io
], Do = [
  "any-hover",
  "any-pointer",
  "aspect-ratio",
  "color",
  "color-gamut",
  "color-index",
  "device-aspect-ratio",
  "device-height",
  "device-width",
  "display-mode",
  "forced-colors",
  "grid",
  "height",
  "hover",
  "inverted-colors",
  "monochrome",
  "orientation",
  "overflow-block",
  "overflow-inline",
  "pointer",
  "prefers-color-scheme",
  "prefers-contrast",
  "prefers-reduced-motion",
  "prefers-reduced-transparency",
  "resolution",
  "scan",
  "scripting",
  "update",
  "width",
  // TODO: find a better solution?
  "min-width",
  "max-width",
  "min-height",
  "max-height"
].sort().reverse(), Po = [
  "active",
  "any-link",
  "blank",
  "checked",
  "current",
  "default",
  "defined",
  "dir",
  // dir()
  "disabled",
  "drop",
  "empty",
  "enabled",
  "first",
  "first-child",
  "first-of-type",
  "fullscreen",
  "future",
  "focus",
  "focus-visible",
  "focus-within",
  "has",
  // has()
  "host",
  // host or host()
  "host-context",
  // host-context()
  "hover",
  "indeterminate",
  "in-range",
  "invalid",
  "is",
  // is()
  "lang",
  // lang()
  "last-child",
  "last-of-type",
  "left",
  "link",
  "local-link",
  "not",
  // not()
  "nth-child",
  // nth-child()
  "nth-col",
  // nth-col()
  "nth-last-child",
  // nth-last-child()
  "nth-last-col",
  // nth-last-col()
  "nth-last-of-type",
  //nth-last-of-type()
  "nth-of-type",
  //nth-of-type()
  "only-child",
  "only-of-type",
  "optional",
  "out-of-range",
  "past",
  "placeholder-shown",
  "read-only",
  "read-write",
  "required",
  "right",
  "root",
  "scope",
  "target",
  "target-within",
  "user-invalid",
  "valid",
  "visited",
  "where"
  // where()
].sort().reverse(), Bo = [
  "after",
  "backdrop",
  "before",
  "cue",
  "cue-region",
  "first-letter",
  "first-line",
  "grammar-error",
  "marker",
  "part",
  "placeholder",
  "selection",
  "slotted",
  "spelling-error"
].sort().reverse(), Uo = [
  "accent-color",
  "align-content",
  "align-items",
  "align-self",
  "alignment-baseline",
  "all",
  "anchor-name",
  "animation",
  "animation-composition",
  "animation-delay",
  "animation-direction",
  "animation-duration",
  "animation-fill-mode",
  "animation-iteration-count",
  "animation-name",
  "animation-play-state",
  "animation-range",
  "animation-range-end",
  "animation-range-start",
  "animation-timeline",
  "animation-timing-function",
  "appearance",
  "aspect-ratio",
  "backdrop-filter",
  "backface-visibility",
  "background",
  "background-attachment",
  "background-blend-mode",
  "background-clip",
  "background-color",
  "background-image",
  "background-origin",
  "background-position",
  "background-position-x",
  "background-position-y",
  "background-repeat",
  "background-size",
  "baseline-shift",
  "block-size",
  "border",
  "border-block",
  "border-block-color",
  "border-block-end",
  "border-block-end-color",
  "border-block-end-style",
  "border-block-end-width",
  "border-block-start",
  "border-block-start-color",
  "border-block-start-style",
  "border-block-start-width",
  "border-block-style",
  "border-block-width",
  "border-bottom",
  "border-bottom-color",
  "border-bottom-left-radius",
  "border-bottom-right-radius",
  "border-bottom-style",
  "border-bottom-width",
  "border-collapse",
  "border-color",
  "border-end-end-radius",
  "border-end-start-radius",
  "border-image",
  "border-image-outset",
  "border-image-repeat",
  "border-image-slice",
  "border-image-source",
  "border-image-width",
  "border-inline",
  "border-inline-color",
  "border-inline-end",
  "border-inline-end-color",
  "border-inline-end-style",
  "border-inline-end-width",
  "border-inline-start",
  "border-inline-start-color",
  "border-inline-start-style",
  "border-inline-start-width",
  "border-inline-style",
  "border-inline-width",
  "border-left",
  "border-left-color",
  "border-left-style",
  "border-left-width",
  "border-radius",
  "border-right",
  "border-right-color",
  "border-right-style",
  "border-right-width",
  "border-spacing",
  "border-start-end-radius",
  "border-start-start-radius",
  "border-style",
  "border-top",
  "border-top-color",
  "border-top-left-radius",
  "border-top-right-radius",
  "border-top-style",
  "border-top-width",
  "border-width",
  "bottom",
  "box-align",
  "box-decoration-break",
  "box-direction",
  "box-flex",
  "box-flex-group",
  "box-lines",
  "box-ordinal-group",
  "box-orient",
  "box-pack",
  "box-shadow",
  "box-sizing",
  "break-after",
  "break-before",
  "break-inside",
  "caption-side",
  "caret-color",
  "clear",
  "clip",
  "clip-path",
  "clip-rule",
  "color",
  "color-interpolation",
  "color-interpolation-filters",
  "color-profile",
  "color-rendering",
  "color-scheme",
  "column-count",
  "column-fill",
  "column-gap",
  "column-rule",
  "column-rule-color",
  "column-rule-style",
  "column-rule-width",
  "column-span",
  "column-width",
  "columns",
  "contain",
  "contain-intrinsic-block-size",
  "contain-intrinsic-height",
  "contain-intrinsic-inline-size",
  "contain-intrinsic-size",
  "contain-intrinsic-width",
  "container",
  "container-name",
  "container-type",
  "content",
  "content-visibility",
  "counter-increment",
  "counter-reset",
  "counter-set",
  "cue",
  "cue-after",
  "cue-before",
  "cursor",
  "cx",
  "cy",
  "direction",
  "display",
  "dominant-baseline",
  "empty-cells",
  "enable-background",
  "field-sizing",
  "fill",
  "fill-opacity",
  "fill-rule",
  "filter",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-flow",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "float",
  "flood-color",
  "flood-opacity",
  "flow",
  "font",
  "font-display",
  "font-family",
  "font-feature-settings",
  "font-kerning",
  "font-language-override",
  "font-optical-sizing",
  "font-palette",
  "font-size",
  "font-size-adjust",
  "font-smooth",
  "font-smoothing",
  "font-stretch",
  "font-style",
  "font-synthesis",
  "font-synthesis-position",
  "font-synthesis-small-caps",
  "font-synthesis-style",
  "font-synthesis-weight",
  "font-variant",
  "font-variant-alternates",
  "font-variant-caps",
  "font-variant-east-asian",
  "font-variant-emoji",
  "font-variant-ligatures",
  "font-variant-numeric",
  "font-variant-position",
  "font-variation-settings",
  "font-weight",
  "forced-color-adjust",
  "gap",
  "glyph-orientation-horizontal",
  "glyph-orientation-vertical",
  "grid",
  "grid-area",
  "grid-auto-columns",
  "grid-auto-flow",
  "grid-auto-rows",
  "grid-column",
  "grid-column-end",
  "grid-column-start",
  "grid-gap",
  "grid-row",
  "grid-row-end",
  "grid-row-start",
  "grid-template",
  "grid-template-areas",
  "grid-template-columns",
  "grid-template-rows",
  "hanging-punctuation",
  "height",
  "hyphenate-character",
  "hyphenate-limit-chars",
  "hyphens",
  "icon",
  "image-orientation",
  "image-rendering",
  "image-resolution",
  "ime-mode",
  "initial-letter",
  "initial-letter-align",
  "inline-size",
  "inset",
  "inset-area",
  "inset-block",
  "inset-block-end",
  "inset-block-start",
  "inset-inline",
  "inset-inline-end",
  "inset-inline-start",
  "isolation",
  "justify-content",
  "justify-items",
  "justify-self",
  "kerning",
  "left",
  "letter-spacing",
  "lighting-color",
  "line-break",
  "line-height",
  "line-height-step",
  "list-style",
  "list-style-image",
  "list-style-position",
  "list-style-type",
  "margin",
  "margin-block",
  "margin-block-end",
  "margin-block-start",
  "margin-bottom",
  "margin-inline",
  "margin-inline-end",
  "margin-inline-start",
  "margin-left",
  "margin-right",
  "margin-top",
  "margin-trim",
  "marker",
  "marker-end",
  "marker-mid",
  "marker-start",
  "marks",
  "mask",
  "mask-border",
  "mask-border-mode",
  "mask-border-outset",
  "mask-border-repeat",
  "mask-border-slice",
  "mask-border-source",
  "mask-border-width",
  "mask-clip",
  "mask-composite",
  "mask-image",
  "mask-mode",
  "mask-origin",
  "mask-position",
  "mask-repeat",
  "mask-size",
  "mask-type",
  "masonry-auto-flow",
  "math-depth",
  "math-shift",
  "math-style",
  "max-block-size",
  "max-height",
  "max-inline-size",
  "max-width",
  "min-block-size",
  "min-height",
  "min-inline-size",
  "min-width",
  "mix-blend-mode",
  "nav-down",
  "nav-index",
  "nav-left",
  "nav-right",
  "nav-up",
  "none",
  "normal",
  "object-fit",
  "object-position",
  "offset",
  "offset-anchor",
  "offset-distance",
  "offset-path",
  "offset-position",
  "offset-rotate",
  "opacity",
  "order",
  "orphans",
  "outline",
  "outline-color",
  "outline-offset",
  "outline-style",
  "outline-width",
  "overflow",
  "overflow-anchor",
  "overflow-block",
  "overflow-clip-margin",
  "overflow-inline",
  "overflow-wrap",
  "overflow-x",
  "overflow-y",
  "overlay",
  "overscroll-behavior",
  "overscroll-behavior-block",
  "overscroll-behavior-inline",
  "overscroll-behavior-x",
  "overscroll-behavior-y",
  "padding",
  "padding-block",
  "padding-block-end",
  "padding-block-start",
  "padding-bottom",
  "padding-inline",
  "padding-inline-end",
  "padding-inline-start",
  "padding-left",
  "padding-right",
  "padding-top",
  "page",
  "page-break-after",
  "page-break-before",
  "page-break-inside",
  "paint-order",
  "pause",
  "pause-after",
  "pause-before",
  "perspective",
  "perspective-origin",
  "place-content",
  "place-items",
  "place-self",
  "pointer-events",
  "position",
  "position-anchor",
  "position-visibility",
  "print-color-adjust",
  "quotes",
  "r",
  "resize",
  "rest",
  "rest-after",
  "rest-before",
  "right",
  "rotate",
  "row-gap",
  "ruby-align",
  "ruby-position",
  "scale",
  "scroll-behavior",
  "scroll-margin",
  "scroll-margin-block",
  "scroll-margin-block-end",
  "scroll-margin-block-start",
  "scroll-margin-bottom",
  "scroll-margin-inline",
  "scroll-margin-inline-end",
  "scroll-margin-inline-start",
  "scroll-margin-left",
  "scroll-margin-right",
  "scroll-margin-top",
  "scroll-padding",
  "scroll-padding-block",
  "scroll-padding-block-end",
  "scroll-padding-block-start",
  "scroll-padding-bottom",
  "scroll-padding-inline",
  "scroll-padding-inline-end",
  "scroll-padding-inline-start",
  "scroll-padding-left",
  "scroll-padding-right",
  "scroll-padding-top",
  "scroll-snap-align",
  "scroll-snap-stop",
  "scroll-snap-type",
  "scroll-timeline",
  "scroll-timeline-axis",
  "scroll-timeline-name",
  "scrollbar-color",
  "scrollbar-gutter",
  "scrollbar-width",
  "shape-image-threshold",
  "shape-margin",
  "shape-outside",
  "shape-rendering",
  "speak",
  "speak-as",
  "src",
  // @font-face
  "stop-color",
  "stop-opacity",
  "stroke",
  "stroke-dasharray",
  "stroke-dashoffset",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-miterlimit",
  "stroke-opacity",
  "stroke-width",
  "tab-size",
  "table-layout",
  "text-align",
  "text-align-all",
  "text-align-last",
  "text-anchor",
  "text-combine-upright",
  "text-decoration",
  "text-decoration-color",
  "text-decoration-line",
  "text-decoration-skip",
  "text-decoration-skip-ink",
  "text-decoration-style",
  "text-decoration-thickness",
  "text-emphasis",
  "text-emphasis-color",
  "text-emphasis-position",
  "text-emphasis-style",
  "text-indent",
  "text-justify",
  "text-orientation",
  "text-overflow",
  "text-rendering",
  "text-shadow",
  "text-size-adjust",
  "text-transform",
  "text-underline-offset",
  "text-underline-position",
  "text-wrap",
  "text-wrap-mode",
  "text-wrap-style",
  "timeline-scope",
  "top",
  "touch-action",
  "transform",
  "transform-box",
  "transform-origin",
  "transform-style",
  "transition",
  "transition-behavior",
  "transition-delay",
  "transition-duration",
  "transition-property",
  "transition-timing-function",
  "translate",
  "unicode-bidi",
  "user-modify",
  "user-select",
  "vector-effect",
  "vertical-align",
  "view-timeline",
  "view-timeline-axis",
  "view-timeline-inset",
  "view-timeline-name",
  "view-transition-name",
  "visibility",
  "voice-balance",
  "voice-duration",
  "voice-family",
  "voice-pitch",
  "voice-range",
  "voice-rate",
  "voice-stress",
  "voice-volume",
  "white-space",
  "white-space-collapse",
  "widows",
  "width",
  "will-change",
  "word-break",
  "word-spacing",
  "word-wrap",
  "writing-mode",
  "x",
  "y",
  "z-index",
  "zoom"
].sort().reverse();
function zo(e) {
  const t = Mo(e), r = Bo, n = Po, a = "@[a-z-]+", c = "and or not only", s = {
    className: "variable",
    begin: "(\\$" + "[a-zA-Z-][a-zA-Z0-9_-]*" + ")\\b",
    relevance: 0
  };
  return {
    name: "SCSS",
    case_insensitive: !0,
    illegal: "[=/|']",
    contains: [
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE,
      // to recognize keyframe 40% etc which are outside the scope of our
      // attribute value mode
      t.CSS_NUMBER_MODE,
      {
        className: "selector-id",
        begin: "#[A-Za-z0-9_-]+",
        relevance: 0
      },
      {
        className: "selector-class",
        begin: "\\.[A-Za-z0-9_-]+",
        relevance: 0
      },
      t.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-tag",
        begin: "\\b(" + Co.join("|") + ")\\b",
        // was there, before, but why?
        relevance: 0
      },
      {
        className: "selector-pseudo",
        begin: ":(" + n.join("|") + ")"
      },
      {
        className: "selector-pseudo",
        begin: ":(:)?(" + r.join("|") + ")"
      },
      s,
      {
        // pseudo-selector params
        begin: /\(/,
        end: /\)/,
        contains: [t.CSS_NUMBER_MODE]
      },
      t.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + Uo.join("|") + ")\\b"
      },
      { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" },
      {
        begin: /:/,
        end: /[;}{]/,
        relevance: 0,
        contains: [
          t.BLOCK_COMMENT,
          s,
          t.HEXCOLOR,
          t.CSS_NUMBER_MODE,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          t.IMPORTANT,
          t.FUNCTION_DISPATCH
        ]
      },
      // matching these here allows us to treat them more like regular CSS
      // rules so everything between the {} gets regular rule highlighting,
      // which is what we want for page and font-face
      {
        begin: "@(page|font-face)",
        keywords: {
          $pattern: a,
          keyword: "@page @font-face"
        }
      },
      {
        begin: "@",
        end: "[{;]",
        returnBegin: !0,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: c,
          attribute: Do.join(" ")
        },
        contains: [
          {
            begin: a,
            className: "keyword"
          },
          {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          },
          s,
          e.QUOTE_STRING_MODE,
          e.APOS_STRING_MODE,
          t.HEXCOLOR,
          t.CSS_NUMBER_MODE
        ]
      },
      t.FUNCTION_DISPATCH
    ]
  };
}
function $o(e) {
  return {
    name: "Shell Session",
    aliases: [
      "console",
      "shellsession"
    ],
    contains: [
      {
        className: "meta.prompt",
        // We cannot add \s (spaces) in the regular expression otherwise it will be too broad and produce unexpected result.
        // For instance, in the following example, it would match "echo /path/to/home >" as a prompt:
        // echo /path/to/home > t.exe
        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
        starts: {
          end: /[^\\](?=\s*$)/,
          subLanguage: "bash"
        }
      }
    ]
  };
}
function Ho(e) {
  const t = e.regex, r = e.COMMENT("--", "$"), n = {
    scope: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ match: /''/ }]
      }
    ]
  }, a = {
    begin: /"/,
    end: /"/,
    contains: [{ match: /""/ }]
  }, c = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ], o = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ], s = [
    "bigint",
    "binary",
    "blob",
    "boolean",
    "char",
    "character",
    "clob",
    "date",
    "dec",
    "decfloat",
    "decimal",
    "float",
    "int",
    "integer",
    "interval",
    "nchar",
    "nclob",
    "national",
    "numeric",
    "real",
    "row",
    "smallint",
    "time",
    "timestamp",
    "varchar",
    "varying",
    // modifier (character varying)
    "varbinary"
  ], d = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ], g = [
    "abs",
    "acos",
    "all",
    "allocate",
    "alter",
    "and",
    "any",
    "are",
    "array",
    "array_agg",
    "array_max_cardinality",
    "as",
    "asensitive",
    "asin",
    "asymmetric",
    "at",
    "atan",
    "atomic",
    "authorization",
    "avg",
    "begin",
    "begin_frame",
    "begin_partition",
    "between",
    "bigint",
    "binary",
    "blob",
    "boolean",
    "both",
    "by",
    "call",
    "called",
    "cardinality",
    "cascaded",
    "case",
    "cast",
    "ceil",
    "ceiling",
    "char",
    "char_length",
    "character",
    "character_length",
    "check",
    "classifier",
    "clob",
    "close",
    "coalesce",
    "collate",
    "collect",
    "column",
    "commit",
    "condition",
    "connect",
    "constraint",
    "contains",
    "convert",
    "copy",
    "corr",
    "corresponding",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "create",
    "cross",
    "cube",
    "cume_dist",
    "current",
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_row",
    "current_schema",
    "current_time",
    "current_timestamp",
    "current_path",
    "current_role",
    "current_transform_group_for_type",
    "current_user",
    "cursor",
    "cycle",
    "date",
    "day",
    "deallocate",
    "dec",
    "decimal",
    "decfloat",
    "declare",
    "default",
    "define",
    "delete",
    "dense_rank",
    "deref",
    "describe",
    "deterministic",
    "disconnect",
    "distinct",
    "double",
    "drop",
    "dynamic",
    "each",
    "element",
    "else",
    "empty",
    "end",
    "end_frame",
    "end_partition",
    "end-exec",
    "equals",
    "escape",
    "every",
    "except",
    "exec",
    "execute",
    "exists",
    "exp",
    "external",
    "extract",
    "false",
    "fetch",
    "filter",
    "first_value",
    "float",
    "floor",
    "for",
    "foreign",
    "frame_row",
    "free",
    "from",
    "full",
    "function",
    "fusion",
    "get",
    "global",
    "grant",
    "group",
    "grouping",
    "groups",
    "having",
    "hold",
    "hour",
    "identity",
    "in",
    "indicator",
    "initial",
    "inner",
    "inout",
    "insensitive",
    "insert",
    "int",
    "integer",
    "intersect",
    "intersection",
    "interval",
    "into",
    "is",
    "join",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "language",
    "large",
    "last_value",
    "lateral",
    "lead",
    "leading",
    "left",
    "like",
    "like_regex",
    "listagg",
    "ln",
    "local",
    "localtime",
    "localtimestamp",
    "log",
    "log10",
    "lower",
    "match",
    "match_number",
    "match_recognize",
    "matches",
    "max",
    "member",
    "merge",
    "method",
    "min",
    "minute",
    "mod",
    "modifies",
    "module",
    "month",
    "multiset",
    "national",
    "natural",
    "nchar",
    "nclob",
    "new",
    "no",
    "none",
    "normalize",
    "not",
    "nth_value",
    "ntile",
    "null",
    "nullif",
    "numeric",
    "octet_length",
    "occurrences_regex",
    "of",
    "offset",
    "old",
    "omit",
    "on",
    "one",
    "only",
    "open",
    "or",
    "order",
    "out",
    "outer",
    "over",
    "overlaps",
    "overlay",
    "parameter",
    "partition",
    "pattern",
    "per",
    "percent",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "period",
    "portion",
    "position",
    "position_regex",
    "power",
    "precedes",
    "precision",
    "prepare",
    "primary",
    "procedure",
    "ptf",
    "range",
    "rank",
    "reads",
    "real",
    "recursive",
    "ref",
    "references",
    "referencing",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "release",
    "result",
    "return",
    "returns",
    "revoke",
    "right",
    "rollback",
    "rollup",
    "row",
    "row_number",
    "rows",
    "running",
    "savepoint",
    "scope",
    "scroll",
    "search",
    "second",
    "seek",
    "select",
    "sensitive",
    "session_user",
    "set",
    "show",
    "similar",
    "sin",
    "sinh",
    "skip",
    "smallint",
    "some",
    "specific",
    "specifictype",
    "sql",
    "sqlexception",
    "sqlstate",
    "sqlwarning",
    "sqrt",
    "start",
    "static",
    "stddev_pop",
    "stddev_samp",
    "submultiset",
    "subset",
    "substring",
    "substring_regex",
    "succeeds",
    "sum",
    "symmetric",
    "system",
    "system_time",
    "system_user",
    "table",
    "tablesample",
    "tan",
    "tanh",
    "then",
    "time",
    "timestamp",
    "timezone_hour",
    "timezone_minute",
    "to",
    "trailing",
    "translate",
    "translate_regex",
    "translation",
    "treat",
    "trigger",
    "trim",
    "trim_array",
    "true",
    "truncate",
    "uescape",
    "union",
    "unique",
    "unknown",
    "unnest",
    "update",
    "upper",
    "user",
    "using",
    "value",
    "values",
    "value_of",
    "var_pop",
    "var_samp",
    "varbinary",
    "varchar",
    "varying",
    "versioning",
    "when",
    "whenever",
    "where",
    "width_bucket",
    "window",
    "with",
    "within",
    "without",
    "year"
  ], u = [
    "abs",
    "acos",
    "array_agg",
    "asin",
    "atan",
    "avg",
    "cast",
    "ceil",
    "ceiling",
    "coalesce",
    "corr",
    "cos",
    "cosh",
    "count",
    "covar_pop",
    "covar_samp",
    "cume_dist",
    "dense_rank",
    "deref",
    "element",
    "exp",
    "extract",
    "first_value",
    "floor",
    "json_array",
    "json_arrayagg",
    "json_exists",
    "json_object",
    "json_objectagg",
    "json_query",
    "json_table",
    "json_table_primitive",
    "json_value",
    "lag",
    "last_value",
    "lead",
    "listagg",
    "ln",
    "log",
    "log10",
    "lower",
    "max",
    "min",
    "mod",
    "nth_value",
    "ntile",
    "nullif",
    "percent_rank",
    "percentile_cont",
    "percentile_disc",
    "position",
    "position_regex",
    "power",
    "rank",
    "regr_avgx",
    "regr_avgy",
    "regr_count",
    "regr_intercept",
    "regr_r2",
    "regr_slope",
    "regr_sxx",
    "regr_sxy",
    "regr_syy",
    "row_number",
    "sin",
    "sinh",
    "sqrt",
    "stddev_pop",
    "stddev_samp",
    "substring",
    "substring_regex",
    "sum",
    "tan",
    "tanh",
    "translate",
    "translate_regex",
    "treat",
    "trim",
    "trim_array",
    "unnest",
    "upper",
    "value_of",
    "var_pop",
    "var_samp",
    "width_bucket"
  ], _ = [
    "current_catalog",
    "current_date",
    "current_default_transform_group",
    "current_path",
    "current_role",
    "current_schema",
    "current_transform_group_for_type",
    "current_user",
    "session_user",
    "system_time",
    "system_user",
    "current_time",
    "localtime",
    "current_timestamp",
    "localtimestamp"
  ], E = [
    "create table",
    "insert into",
    "primary key",
    "foreign key",
    "not null",
    "alter table",
    "add constraint",
    "grouping sets",
    "on overflow",
    "character set",
    "respect nulls",
    "ignore nulls",
    "nulls first",
    "nulls last",
    "depth first",
    "breadth first"
  ], h = u, x = [
    ...g,
    ...d
  ].filter((C) => !u.includes(C)), M = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/
  }, P = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, H = {
    match: t.concat(/\b/, t.either(...h), /\s*\(/),
    relevance: 0,
    keywords: { built_in: h }
  };
  function F(C) {
    return t.concat(
      /\b/,
      t.either(...C.map((I) => I.replace(/\s+/, "\\s+"))),
      /\b/
    );
  }
  const G = {
    scope: "keyword",
    match: F(E),
    relevance: 0
  };
  function L(C, {
    exceptions: I,
    when: D
  } = {}) {
    const K = D;
    return I = I || [], C.map((ee) => ee.match(/\|\d+$/) || I.includes(ee) ? ee : K(ee) ? `${ee}|0` : ee);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: L(x, { when: (C) => C.length < 3 }),
      literal: c,
      type: s,
      built_in: _
    },
    contains: [
      {
        scope: "type",
        match: F(o)
      },
      G,
      H,
      M,
      n,
      a,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      r,
      P
    ]
  };
}
const Rt = "[A-Za-z$_][0-9A-Za-z$_]*", pr = [
  "as",
  // for exports
  "in",
  "of",
  "if",
  "for",
  "while",
  "finally",
  "var",
  "new",
  "function",
  "do",
  "return",
  "void",
  "else",
  "break",
  "catch",
  "instanceof",
  "with",
  "throw",
  "case",
  "default",
  "try",
  "switch",
  "continue",
  "typeof",
  "delete",
  "let",
  "yield",
  "const",
  "class",
  // JS handles these with a special rule
  // "get",
  // "set",
  "debugger",
  "async",
  "await",
  "static",
  "import",
  "from",
  "export",
  "extends",
  // It's reached stage 3, which is "recommended for implementation":
  "using"
], fr = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], mr = [
  // Fundamental objects
  "Object",
  "Function",
  "Boolean",
  "Symbol",
  // numbers and dates
  "Math",
  "Date",
  "Number",
  "BigInt",
  // text
  "String",
  "RegExp",
  // Indexed collections
  "Array",
  "Float32Array",
  "Float64Array",
  "Int8Array",
  "Uint8Array",
  "Uint8ClampedArray",
  "Int16Array",
  "Int32Array",
  "Uint16Array",
  "Uint32Array",
  "BigInt64Array",
  "BigUint64Array",
  // Keyed collections
  "Set",
  "Map",
  "WeakSet",
  "WeakMap",
  // Structured data
  "ArrayBuffer",
  "SharedArrayBuffer",
  "Atomics",
  "DataView",
  "JSON",
  // Control abstraction objects
  "Promise",
  "Generator",
  "GeneratorFunction",
  "AsyncFunction",
  // Reflection
  "Reflect",
  "Proxy",
  // Internationalization
  "Intl",
  // WebAssembly
  "WebAssembly"
], hr = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], br = [
  "setInterval",
  "setTimeout",
  "clearInterval",
  "clearTimeout",
  "require",
  "exports",
  "eval",
  "isFinite",
  "isNaN",
  "parseFloat",
  "parseInt",
  "decodeURI",
  "decodeURIComponent",
  "encodeURI",
  "encodeURIComponent",
  "escape",
  "unescape"
], _r = [
  "arguments",
  "this",
  "super",
  "console",
  "window",
  "document",
  "localStorage",
  "sessionStorage",
  "module",
  "global"
  // Node.js
], Er = [].concat(
  br,
  mr,
  hr
);
function Fo(e) {
  const t = e.regex, r = (T, { after: R }) => {
    const U = "</" + T[0].slice(1);
    return T.input.indexOf(U, R) !== -1;
  }, n = Rt, a = {
    begin: "<>",
    end: "</>"
  }, c = /<[A-Za-z0-9\\._:-]+\s*\/>/, o = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (T, R) => {
      const U = T[0].length + T.index, O = T.input[U];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        O === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        O === ","
      ) {
        R.ignoreMatch();
        return;
      }
      O === ">" && (r(T, { after: U }) || R.ignoreMatch());
      let te;
      const be = T.input.substring(U);
      if (te = be.match(/^\s*=/)) {
        R.ignoreMatch();
        return;
      }
      if ((te = be.match(/^\s+extends\s+/)) && te.index === 0) {
        R.ignoreMatch();
        return;
      }
    }
  }, s = {
    $pattern: Rt,
    keyword: pr,
    literal: fr,
    built_in: Er,
    "variable.language": _r
  }, d = "[0-9](_?[0-9])*", g = `\\.(${d})`, u = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", _ = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${u})((${g})|\\.)?|(${g}))[eE][+-]?(${d})\\b` },
      { begin: `\\b(${u})\\b((${g})\\b|\\.)?|(${g})\\b` },
      // DecimalBigIntegerLiteral
      { begin: "\\b(0|[1-9](_?[0-9])*)n\\b" },
      // NonDecimalIntegerLiteral
      { begin: "\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b" },
      { begin: "\\b0[bB][0-1](_?[0-1])*n?\\b" },
      { begin: "\\b0[oO][0-7](_?[0-7])*n?\\b" },
      // LegacyOctalIntegerLiteral (does not include underscore separators)
      // https://tc39.es/ecma262/#sec-additional-syntax-numeric-literals
      { begin: "\\b0[0-7]+n?\\b" }
    ],
    relevance: 0
  }, E = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: s,
    contains: []
    // defined later
  }, h = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        E
      ],
      subLanguage: "xml"
    }
  }, x = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        E
      ],
      subLanguage: "css"
    }
  }, M = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        E
      ],
      subLanguage: "graphql"
    }
  }, P = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      E
    ]
  }, F = {
    className: "comment",
    variants: [
      e.COMMENT(
        /\/\*\*(?!\/)/,
        "\\*/",
        {
          relevance: 0,
          contains: [
            {
              begin: "(?=@[A-Za-z]+)",
              relevance: 0,
              contains: [
                {
                  className: "doctag",
                  begin: "@[A-Za-z]+"
                },
                {
                  className: "type",
                  begin: "\\{",
                  end: "\\}",
                  excludeEnd: !0,
                  excludeBegin: !0,
                  relevance: 0
                },
                {
                  className: "variable",
                  begin: n + "(?=\\s*(-)|$)",
                  endsParent: !0,
                  relevance: 0
                },
                // eat spaces (not newlines) so we can find
                // types or variables
                {
                  begin: /(?=[^\n])\s/,
                  relevance: 0
                }
              ]
            }
          ]
        }
      ),
      e.C_BLOCK_COMMENT_MODE,
      e.C_LINE_COMMENT_MODE
    ]
  }, G = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    h,
    x,
    M,
    P,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    _
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  E.contains = G.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: s,
    contains: [
      "self"
    ].concat(G)
  });
  const L = [].concat(F, E.contains), C = L.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: s,
      contains: ["self"].concat(L)
    }
  ]), I = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: s,
    contains: C
  }, D = {
    variants: [
      // class Car extends vehicle
      {
        match: [
          /class/,
          /\s+/,
          n,
          /\s+/,
          /extends/,
          /\s+/,
          t.concat(n, "(", t.concat(/\./, n), ")*")
        ],
        scope: {
          1: "keyword",
          3: "title.class",
          5: "keyword",
          7: "title.class.inherited"
        }
      },
      // class Car
      {
        match: [
          /class/,
          /\s+/,
          n
        ],
        scope: {
          1: "keyword",
          3: "title.class"
        }
      }
    ]
  }, K = {
    relevance: 0,
    match: t.either(
      // Hard coded exceptions
      /\bJSON/,
      // Float32Array, OutT
      /\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,
      // CSSFactory, CSSFactoryT
      /\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,
      // FPs, FPsT
      /\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/
      // P
      // single letters are not highlighted
      // BLAH
      // this will be flagged as a UPPER_CASE_CONSTANT instead
    ),
    className: "title.class",
    keywords: {
      _: [
        // se we still get relevance credit for JS library classes
        ...mr,
        ...hr
      ]
    }
  }, ee = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, me = {
    variants: [
      {
        match: [
          /function/,
          /\s+/,
          n,
          /(?=\s*\()/
        ]
      },
      // anonymous function
      {
        match: [
          /function/,
          /\s*(?=\()/
        ]
      }
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    label: "func.def",
    contains: [I],
    illegal: /%/
  }, Re = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function he(T) {
    return t.concat("(?!", T.join("|"), ")");
  }
  const De = {
    match: t.concat(
      /\b/,
      he([
        ...br,
        "super",
        "import"
      ].map((T) => `${T}\\s*\\(`)),
      n,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, Ae = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(n, /(?![0-9A-Za-z$_(])/)
    )),
    end: n,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, ve = {
    match: [
      /get|set/,
      /\s+/,
      n,
      /(?=\()/
    ],
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      {
        // eat to avoid empty params
        begin: /\(\)/
      },
      I
    ]
  }, f = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", S = {
    match: [
      /const|var|let/,
      /\s+/,
      n,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(f)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      I
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: s,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: C, CLASS_REFERENCE: K },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      ee,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      h,
      x,
      M,
      P,
      F,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      _,
      K,
      {
        scope: "attr",
        match: n + t.lookahead(":"),
        relevance: 0
      },
      S,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          F,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: f,
            returnBegin: !0,
            end: "\\s*=>",
            contains: [
              {
                className: "params",
                variants: [
                  {
                    begin: e.UNDERSCORE_IDENT_RE,
                    relevance: 0
                  },
                  {
                    className: null,
                    begin: /\(\s*\)/,
                    skip: !0
                  },
                  {
                    begin: /(\s*)\(/,
                    end: /\)/,
                    excludeBegin: !0,
                    excludeEnd: !0,
                    keywords: s,
                    contains: C
                  }
                ]
              }
            ]
          },
          {
            // could be a comma delimited list of params to a function call
            begin: /,/,
            relevance: 0
          },
          {
            match: /\s+/,
            relevance: 0
          },
          {
            // JSX
            variants: [
              { begin: a.begin, end: a.end },
              { match: c },
              {
                begin: o.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": o.isTrulyOpeningTag,
                end: o.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: o.begin,
                end: o.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      me,
      {
        // prevent this from getting swallowed up by function
        // since they appear "function like"
        beginKeywords: "while if switch catch for"
      },
      {
        // we have to count the parens to make sure we actually have the correct
        // bounding ( ).  There could be any number of sub-expressions inside
        // also surrounded by parens.
        begin: "\\b(?!function)" + e.UNDERSCORE_IDENT_RE + "\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",
        // end parens
        returnBegin: !0,
        label: "func.def",
        contains: [
          I,
          e.inherit(e.TITLE_MODE, { begin: n, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      Ae,
      // hack: prevents detection of keywords in some circumstances
      // .keyword()
      // $keyword = x
      {
        match: "\\$" + n,
        relevance: 0
      },
      {
        match: [/\bconstructor(?=\s*\()/],
        className: { 1: "title.function" },
        contains: [I]
      },
      De,
      Re,
      D,
      ve,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function Tr(e) {
  const t = e.regex, r = Fo(e), n = Rt, a = [
    "any",
    "void",
    "number",
    "boolean",
    "string",
    "object",
    "never",
    "symbol",
    "bigint",
    "unknown"
  ], c = {
    begin: [
      /namespace/,
      /\s+/,
      e.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, o = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: a
    },
    contains: [r.exports.CLASS_REFERENCE]
  }, s = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, d = [
    "type",
    // "namespace",
    "interface",
    "public",
    "private",
    "protected",
    "implements",
    "declare",
    "abstract",
    "readonly",
    "enum",
    "override",
    "satisfies"
  ], g = {
    $pattern: Rt,
    keyword: pr.concat(d),
    literal: fr,
    built_in: Er.concat(a),
    "variable.language": _r
  }, u = {
    className: "meta",
    begin: "@" + n
  }, _ = (M, P, H) => {
    const F = M.contains.findIndex((G) => G.label === P);
    if (F === -1)
      throw new Error("can not find mode to replace");
    M.contains.splice(F, 1, H);
  };
  Object.assign(r.keywords, g), r.exports.PARAMS_CONTAINS.push(u);
  const E = r.contains.find((M) => M.scope === "attr"), h = Object.assign(
    {},
    E,
    { match: t.concat(n, t.lookahead(/\s*\?:/)) }
  );
  r.exports.PARAMS_CONTAINS.push([
    r.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    E,
    // highlight the params key
    h
    // Added for optional property assignment highlighting
  ]), r.contains = r.contains.concat([
    u,
    c,
    o,
    h
    // Added for optional property assignment highlighting
  ]), _(r, "shebang", e.SHEBANG()), _(r, "use_strict", s);
  const x = r.contains.find((M) => M.label === "func.def");
  return x.relevance = 0, Object.assign(r, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), r;
}
function yr(e) {
  const t = e.regex, r = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), n = /[\p{L}0-9._:-]+/u, a = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, c = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, o = e.inherit(c, {
    begin: /\(/,
    end: /\)/
  }), s = e.inherit(e.APOS_STRING_MODE, { className: "string" }), d = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), g = {
    endsWithParent: !0,
    illegal: /</,
    relevance: 0,
    contains: [
      {
        className: "attr",
        begin: n,
        relevance: 0
      },
      {
        begin: /=\s*/,
        relevance: 0,
        contains: [
          {
            className: "string",
            endsParent: !0,
            variants: [
              {
                begin: /"/,
                end: /"/,
                contains: [a]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [a]
              },
              { begin: /[^\s"'=<>`]+/ }
            ]
          }
        ]
      }
    ]
  };
  return {
    name: "HTML, XML",
    aliases: [
      "html",
      "xhtml",
      "rss",
      "atom",
      "xjb",
      "xsd",
      "xsl",
      "plist",
      "wsf",
      "svg"
    ],
    case_insensitive: !0,
    unicodeRegex: !0,
    contains: [
      {
        className: "meta",
        begin: /<![a-z]/,
        end: />/,
        relevance: 10,
        contains: [
          c,
          d,
          s,
          o,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  c,
                  o,
                  d,
                  s
                ]
              }
            ]
          }
        ]
      },
      e.COMMENT(
        /<!--/,
        /-->/,
        { relevance: 10 }
      ),
      {
        begin: /<!\[CDATA\[/,
        end: /\]\]>/,
        relevance: 10
      },
      a,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              d
            ]
          },
          {
            begin: /<\?[a-z][a-z0-9]+/
          }
        ]
      },
      {
        className: "tag",
        /*
        The lookahead pattern (?=...) ensures that 'begin' only matches
        '<style' as a single word, followed by a whitespace or an
        ending bracket.
        */
        begin: /<style(?=\s|>)/,
        end: />/,
        keywords: { name: "style" },
        contains: [g],
        starts: {
          end: /<\/style>/,
          returnEnd: !0,
          subLanguage: [
            "css",
            "xml"
          ]
        }
      },
      {
        className: "tag",
        // See the comment in the <style tag about the lookahead pattern
        begin: /<script(?=\s|>)/,
        end: />/,
        keywords: { name: "script" },
        contains: [g],
        starts: {
          end: /<\/script>/,
          returnEnd: !0,
          subLanguage: [
            "javascript",
            "handlebars",
            "xml"
          ]
        }
      },
      // we need this for now for jSX
      {
        className: "tag",
        begin: /<>|<\/>/
      },
      // open tag
      {
        className: "tag",
        begin: t.concat(
          /</,
          t.lookahead(t.concat(
            r,
            // <tag/>
            // <tag>
            // <tag ...
            t.either(/\/>/, />/, /\s/)
          ))
        ),
        end: /\/?>/,
        contains: [
          {
            className: "name",
            begin: r,
            relevance: 0,
            starts: g
          }
        ]
      },
      // close tag
      {
        className: "tag",
        begin: t.concat(
          /<\//,
          t.lookahead(t.concat(
            r,
            />/
          ))
        ),
        contains: [
          {
            className: "name",
            begin: r,
            relevance: 0
          },
          {
            begin: />/,
            relevance: 0,
            endsParent: !0
          }
        ]
      }
    ]
  };
}
function Sr(e) {
  const t = "true false yes no null", r = "[\\w#;/?:@&=+$,.~*'()[\\]]+", n = {
    className: "attr",
    variants: [
      // added brackets support and special char support
      { begin: /[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/ },
      {
        // double quoted keys - with brackets and special char support
        begin: /"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/
      },
      {
        // single quoted keys - with brackets and special char support
        begin: /'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/
      }
    ]
  }, a = {
    className: "template-variable",
    variants: [
      {
        // jinja templates Ansible
        begin: /\{\{/,
        end: /\}\}/
      },
      {
        // Ruby i18n
        begin: /%\{/,
        end: /\}/
      }
    ]
  }, c = {
    className: "string",
    relevance: 0,
    begin: /'/,
    end: /'/,
    contains: [
      {
        match: /''/,
        scope: "char.escape",
        relevance: 0
      }
    ]
  }, o = {
    className: "string",
    relevance: 0,
    variants: [
      {
        begin: /"/,
        end: /"/
      },
      { begin: /\S+/ }
    ],
    contains: [
      e.BACKSLASH_ESCAPE,
      a
    ]
  }, s = e.inherit(o, { variants: [
    {
      begin: /'/,
      end: /'/,
      contains: [
        {
          begin: /''/,
          relevance: 0
        }
      ]
    },
    {
      begin: /"/,
      end: /"/
    },
    { begin: /[^\s,{}[\]]+/ }
  ] }), E = {
    className: "number",
    begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
  }, h = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: t,
    relevance: 0
  }, x = {
    begin: /\{/,
    end: /\}/,
    contains: [h],
    illegal: "\\n",
    relevance: 0
  }, M = {
    begin: "\\[",
    end: "\\]",
    contains: [h],
    illegal: "\\n",
    relevance: 0
  }, P = [
    n,
    {
      className: "meta",
      begin: "^---\\s*$",
      relevance: 10
    },
    {
      // multi line string
      // Blocks start with a | or > followed by a newline
      //
      // Indentation of subsequent lines must be the same to
      // be considered part of the block
      className: "string",
      begin: "[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"
    },
    {
      // Ruby/Rails erb
      begin: "<%[%=-]?",
      end: "[%-]?%>",
      subLanguage: "ruby",
      excludeBegin: !0,
      excludeEnd: !0,
      relevance: 0
    },
    {
      // named tags
      className: "type",
      begin: "!\\w+!" + r
    },
    // https://yaml.org/spec/1.2/spec.html#id2784064
    {
      // verbatim tags
      className: "type",
      begin: "!<" + r + ">"
    },
    {
      // primary tags
      className: "type",
      begin: "!" + r
    },
    {
      // secondary tags
      className: "type",
      begin: "!!" + r
    },
    {
      // fragment id &ref
      className: "meta",
      begin: "&" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // fragment reference *ref
      className: "meta",
      begin: "\\*" + e.UNDERSCORE_IDENT_RE + "$"
    },
    {
      // array listing
      className: "bullet",
      // TODO: remove |$ hack when we have proper look-ahead support
      begin: "-(?=[ ]|$)",
      relevance: 0
    },
    e.HASH_COMMENT_MODE,
    {
      beginKeywords: t,
      keywords: { literal: t }
    },
    E,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: e.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    x,
    M,
    c,
    o
  ], H = [...P];
  return H.pop(), H.push(s), h.contains = H, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: P
  };
}
V.registerLanguage("javascript", dr);
V.registerLanguage("js", dr);
V.registerLanguage("typescript", Tr);
V.registerLanguage("ts", Tr);
V.registerLanguage("xml", yr);
V.registerLanguage("html", yr);
V.registerLanguage("json", xo);
V.registerLanguage("bash", or);
V.registerLanguage("sh", or);
V.registerLanguage("shell", $o);
V.registerLanguage("css", vo);
V.registerLanguage("scss", zo);
V.registerLanguage("markdown", ur);
V.registerLanguage("md", ur);
V.registerLanguage("java", wo);
V.registerLanguage("yaml", Sr);
V.registerLanguage("yml", Sr);
V.registerLanguage("sql", Ho);
V.registerLanguage("plaintext", gr);
V.registerLanguage("text", gr);
const dt = {
  mermaid: "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs",
  svgPanZoom: "https://cdn.jsdelivr.net/npm/svg-pan-zoom@3.6.2/+esm"
};
function Ko(e) {
  e.mermaid && (dt.mermaid = e.mermaid), e.svgPanZoom && (dt.svgPanZoom = e.svgPanZoom);
}
let Nt = null, Ot = null;
function Ar(e) {
  return import(
    /* @vite-ignore */
    /* webpackIgnore: true */
    e
  );
}
async function Go() {
  return Nt || (Nt = Ar(dt.mermaid).then((e) => (e.default.initialize({ startOnLoad: !1, theme: "default" }), e.default)).catch((e) => {
    throw Nt = null, new Error(
      `nx3-markdown-renderer: failed to load Mermaid from ${dt.mermaid}. The document contains a mermaid diagram but the external module could not be fetched. Check network / CSP (script-src, connect-src) or override the source with configureExternalLibs(). Original error: ${e instanceof Error ? e.message : String(e)}`
    );
  })), Nt;
}
async function Wo() {
  return Ot || (Ot = Ar(dt.svgPanZoom).then((e) => e.default ?? e).catch((e) => {
    throw Ot = null, e;
  })), Ot;
}
const ce = class ce {
  constructor(t = {}) {
    Me(this, "templateUlStart", '<ul style="margin: 0 !important; padding: 0 0 0 16px !important;">');
    Me(this, "mermaidResizeObservers", /* @__PURE__ */ new WeakMap());
    Me(this, "mermaidRenderCache", /* @__PURE__ */ new Map());
    Me(this, "_mermaidRenderPromises", /* @__PURE__ */ new Map());
    Me(this, "anchors");
    this.anchors = t.anchors !== void 0 ? t.anchors : !0;
  }
  updateMessageWithThinking(t, r) {
    const n = this.parseThinkingBlocks(r), a = /* @__PURE__ */ new Map();
    for (const o of Array.from(
      t.querySelectorAll(".mermaid-wrapper[data-diagram-source]")
    )) {
      const s = o.dataset.diagramSource || "";
      a.has(s) || a.set(s, []), a.get(s).push(o), o.remove();
    }
    t.innerHTML = "";
    let c = !0;
    for (const o of n)
      if (c || t.append(document.createElement("br")), c = !1, o.type === "thinking") {
        const s = this.createThinkingBlock(o.content);
        t.append(s);
      } else {
        const s = this.splitMermaidSegments(o.content);
        for (const d of s)
          switch (d.type) {
            case "mermaid": {
              const g = a.get(d.content);
              if (g && g.length > 0)
                t.append(g.shift());
              else {
                const u = document.createElement("div");
                u.className = "mermaid-wrapper", t.append(u);
                const _ = this.mermaidRenderCache.get(d.content);
                _ ? (u.dataset.diagramSource = d.content, this._buildMermaidUI(u, _)) : (u.innerHTML = `<div class="mermaid" data-diagram="${d.content.replace(/"/g, "&quot;")}"></div>`, this._ensureMermaidRendered(d.content).catch((E) => console.error("Mermaid pre-render failed:", E)));
              }
              break;
            }
            case "svg": {
              this._renderSvgSegment(t, d);
              break;
            }
            case "canvas": {
              this._renderCanvasSegment(t, d);
              break;
            }
            case "code": {
              this._renderCodeSegment(t, d);
              break;
            }
            default: {
              const g = document.createElement("div");
              g.className = "message-text", g.innerHTML = this.parseMarkdown(d.content), t.append(g);
            }
          }
      }
  }
  highlightCodeBlocks(t) {
    for (const r of Array.from(t.querySelectorAll("pre code"))) {
      delete r.dataset.highlighted;
      try {
        V.highlightElement(r);
      } catch (n) {
        console.warn("highlight.js failed for block:", n);
      }
    }
  }
  async renderMermaidDiagrams(t) {
    const r = t.querySelectorAll(".mermaid[data-diagram]");
    if (r.length !== 0)
      for (const n of Array.from(r)) {
        const a = (n.dataset.diagram || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'), c = n.closest(".mermaid-wrapper") || n.parentElement;
        try {
          const o = await this._ensureMermaidRendered(a);
          c.dataset.diagramSource = a, this._buildMermaidUI(c, o);
        } catch (o) {
          const s = o instanceof Error ? o.message : String(o);
          c.outerHTML = `<div class="mermaid-error">Mermaid error: ${s}</div>`;
        }
      }
  }
  _ensureMermaidRendered(t) {
    const r = this.mermaidRenderCache.get(t);
    if (r) return Promise.resolve(r);
    let n = this._mermaidRenderPromises.get(t);
    return n || (n = (async () => {
      const a = await Go(), c = "mermaid-" + Math.random().toString(36).slice(2, 9), { svg: o } = await a.render(c, t);
      return this.mermaidRenderCache.set(t, o), this._mermaidRenderPromises.delete(t), o;
    })(), this._mermaidRenderPromises.set(t, n)), n;
  }
  async _buildMermaidUI(t, r) {
    const n = document.createElement("div");
    n.className = "mermaid-toolbar", n.innerHTML = `
      <span class="mermaid-toolbar-title">Diagram</span>
      <button class="mermaid-btn zoom-in" title="Zoom in">Zoom +</button>
      <button class="mermaid-btn zoom-out" title="Zoom out">Zoom -</button>
      <button class="mermaid-btn zoom-reset" title="Reset">Reset</button>
      <div class="mermaid-btn-sep"></div>
      <button class="mermaid-btn download-svg" title="Download as SVG">SVG</button>
      <button class="mermaid-btn download-png" title="Download as PNG">PNG</button>`;
    const a = document.createElement("div");
    a.className = "mermaid-pan-container", a.innerHTML = r, t.innerHTML = "", t.append(n), t.append(a);
    const c = document.createElement("div");
    c.className = "mermaid-resize-handle", t.append(c), t.dataset.originalSvg = r;
    const o = a.querySelector("svg");
    if (o && (o.removeAttribute("width"), o.removeAttribute("height"), o.setAttribute("preserveAspectRatio", "xMidYMid meet"), o.style.width = "100%", o.style.height = "100%", o.style.display = "block", o.style.maxWidth = "none", !o.getAttribute("viewBox"))) {
      const d = o.getBBox?.();
      d && o.setAttribute("viewBox", `0 0 ${d.width} ${d.height}`);
    }
    let s = null;
    if (o)
      try {
        s = (await Wo())(o, {
          zoomEnabled: !0,
          panEnabled: !0,
          controlIconsEnabled: !1,
          fit: !0,
          center: !0,
          minZoom: 0.2,
          maxZoom: 10,
          zoomScaleSensitivity: 0.3
        }), this._setupMermaidAutoFit(t, a, s), this._setupResizeHandle(c, a, s);
      } catch (d) {
        console.warn("svg-pan-zoom failed to initialize:", d);
      }
    n.querySelector(".zoom-in")?.addEventListener("click", () => s?.zoomIn()), n.querySelector(".zoom-out")?.addEventListener("click", () => s?.zoomOut()), n.querySelector(".zoom-reset")?.addEventListener("click", () => {
      s?.resetZoom(), s?.center();
    }), n.querySelector(".download-svg")?.addEventListener("click", () => {
      if (!o) return;
      const d = new XMLSerializer().serializeToString(o), g = new Blob([d], { type: "image/svg+xml;charset=utf-8" }), u = URL.createObjectURL(g), _ = document.createElement("a");
      _.href = u, _.download = "diagram.svg", _.click(), URL.revokeObjectURL(u);
    }), n.querySelector(".download-png")?.addEventListener("click", () => {
      o && this._downloadSvgAsPng(o, "diagram.png");
    });
  }
  _downloadSvgAsPng(t, r) {
    const n = t.cloneNode(!0);
    n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), n.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    const a = n.getAttribute("viewBox");
    let c = 1200, o = 900;
    if (a) {
      const h = a.trim().split(/[\s,]+/);
      h.length === 4 && (c = Math.ceil(+h[2]) * 2 || 1200, o = Math.ceil(+h[3]) * 2 || 900);
    } else {
      const h = t.getBoundingClientRect();
      h.width > 0 && (c = h.width * 2, o = h.height * 2);
    }
    n.setAttribute("width", String(c)), n.setAttribute("height", String(o));
    const s = Array.from(t.querySelectorAll("style")).map((h) => h.textContent).join(`
`).replace(/@import[^;]+;/g, "").replace(/url\(['"]?https?:[^)]+['"]?\)/g, "none");
    if (s) {
      const h = document.createElementNS("http://www.w3.org/2000/svg", "style");
      h.textContent = s + `
* { font-family: Arial, sans-serif !important; }`;
      for (const x of Array.from(n.querySelectorAll("style"))) x.remove();
      n.insertBefore(h, n.firstChild);
    }
    const d = new XMLSerializer().serializeToString(n), g = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(d))), u = document.createElement("canvas");
    u.width = c, u.height = o;
    const _ = u.getContext("2d");
    if (!_) return;
    _.fillStyle = "#ffffff", _.fillRect(0, 0, c, o);
    const E = new Image();
    E.onload = () => {
      _.drawImage(E, 0, 0, c, o);
      try {
        const h = document.createElement("a");
        h.href = u.toDataURL("image/png"), h.download = r, document.body.append(h), h.click(), h.remove();
      } catch (h) {
        console.error("PNG export failed:", h);
      }
    }, E.onerror = () => console.error("Failed to rasterize SVG for PNG export."), E.src = g;
  }
  _setupMermaidAutoFit(t, r, n) {
    const a = n;
    if (!a || !r) return;
    const c = () => {
      const { width: s, height: d } = r.getBoundingClientRect();
      s <= 0 || d <= 0 || (a.resize(), a.fit(), a.center());
    };
    requestAnimationFrame(() => {
      c(), requestAnimationFrame(c);
    });
    const o = this.mermaidResizeObservers.get(t);
    if (o && o.disconnect(), typeof ResizeObserver < "u") {
      const s = new ResizeObserver(() => c());
      s.observe(r), this.mermaidResizeObservers.set(t, s);
    } else
      window.addEventListener("resize", c, { passive: !0 });
  }
  _setupResizeHandle(t, r, n) {
    const a = n;
    t.addEventListener("mousedown", (c) => {
      c.preventDefault();
      const o = c.clientY, s = r.getBoundingClientRect().height;
      t.classList.add("dragging");
      const d = (u) => {
        const _ = Math.max(100, s + (u.clientY - o));
        r.style.height = _ + "px", a && (a.resize(), a.fit(), a.center());
      }, g = () => {
        t.classList.remove("dragging"), document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", g);
      };
      document.addEventListener("mousemove", d), document.addEventListener("mouseup", g);
    });
  }
  parseMarkdown(t) {
    if (!t) return "";
    t = t.replace(/\r\n/g, `
`).replace(/\\r\\n/g, `
`).replace(/\\n/g, `
`).replace(/\\t/g, "	"), t = t.replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    const r = [];
    let n = t.replace(/^```([\w-]*)[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm, (g, u, _) => {
      const E = (u || "").trim().toLowerCase(), h = `@@MDBLOCK${r.length}@@`;
      return E === "mermaid" ? r.push(this._buildMermaidBlockHtml(_.trim())) : r.push(this._buildCodeBlockHtml(_, E)), `
${h}
`;
    });
    const a = [];
    n = this._extractRawHtml(n, a), n = n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), n = n.replace(/[ \t]{2,}\n/g, `<br>
`);
    const c = (g) => g.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""), o = {}, s = (g, u) => {
      let _ = c(u);
      return o[_] = (o[_] || 0) + 1, o[_] > 1 && (_ += "-" + (o[_] - 1)), this.anchors ? `<${g} id="${_}" class="mt-2">${u}<a class="heading-anchor" href="#${_}" aria-label="Link to this heading">#</a></${g}>` : `<${g} id="${_}" class="mt-2">${u}</${g}>`;
    };
    n = n.replace(/^###### (.*$)/gm, (g, u) => s("h6", u)), n = n.replace(/^##### (.*$)/gm, (g, u) => s("h5", u)), n = n.replace(/^#### (.*$)/gm, (g, u) => s("h4", u)), n = n.replace(/^### (.*$)/gm, (g, u) => s("h3", u)), n = n.replace(/^## (.*$)/gm, (g, u) => s("h2", u)), n = n.replace(/^# (.*$)/gm, (g, u) => s("h1", u)), n = this._processBlockLines(n), n = n.replace(/^```[\w-]*[ \t]*$/gm, "");
    const d = [];
    return n = n.replace(/`(.*?)`/g, (g, u) => {
      const _ = `@@LINKBLOCK${d.length}@@`;
      return d.push(`<code>${u}</code>`), _;
    }), n = n.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (g, u, _) => {
      const E = `@@LINKBLOCK${d.length}@@`, h = _.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'), x = u.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      return d.push(`<img src="${h}" alt="${x}" style="max-width: 100%; height: auto;" />`), E;
    }), n = n.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (g, u, _) => {
      const E = `@@LINKBLOCK${d.length}@@`, h = _.includes(":") ? "_blank" : "_self";
      return d.push(`<a href="${_}" target="${h}" rel="noopener noreferrer">${u}</a>`), E;
    }), n = n.replace(/(?<!href="|href=')(https?:\/\/[^\s<>"']+)/g, (g) => {
      const u = `@@LINKBLOCK${d.length}@@`, _ = g.includes(":") ? "_blank" : "_self";
      return d.push(`<a href="${g}" target="${_}" rel="noopener noreferrer">${g}</a>`), u;
    }), n = n.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), n = n.replace(/__(.*?)__/g, "<strong>$1</strong>"), n = n.replace(/\*(.*?)\*/g, "<em>$1</em>"), n = n.replace(/_(.*?)_/g, "<em>$1</em>"), n = this._finalizeParagraphBlocks(n), n = n.replace(/@@MDBLOCK(\d+)@@/g, (g, u) => r[Number(u)] || ""), n = n.replace(/@@LINKBLOCK(\d+)@@/g, (g, u) => d[Number(u)] || ""), n = n.replace(/@@RAWHTML(\d+)@@/g, (g, u) => this._sanitizeHtml(a[Number(u)] || "")), n;
  }
  _processBlockLines(t) {
    const r = t.split(`
`), n = [];
    let a = !1, c = [], o = !1, s = [], d = !1, g = [];
    const u = {
      NOTE: { icon: "i", class: "alert-note", title: "Note" },
      TIP: { icon: "*", class: "alert-tip", title: "Tip" },
      IMPORTANT: { icon: "!", class: "alert-important", title: "Important" },
      WARNING: { icon: "!", class: "alert-warning", title: "Warning" },
      CAUTION: { icon: "x", class: "alert-caution", title: "Caution" }
    }, _ = () => {
      if (d && g.length > 0) {
        const h = g[0].match(/^\[!(\w+)\]\s*(.*)?$/);
        if (h) {
          const x = h[1].toUpperCase(), M = u[x];
          if (M) {
            const P = [];
            h[2] && P.push(h[2]), P.push(...g.slice(1));
            const H = P.join("<br>").trim(), F = `<div class="alert ${M.class}"><div class="alert-header"><span class="alert-icon">${M.icon}</span> ${M.title}</div><div class="alert-content">${H}</div></div>`;
            n.push(F);
          } else
            n.push(`<blockquote>${g.join("<br>")}</blockquote>`);
        } else
          n.push(`<blockquote>${g.join("<br>")}</blockquote>`);
      }
      d = !1, g = [];
    };
    for (const E of r) {
      const h = E.trim();
      if (/^&gt;\s?/.test(h)) {
        o && (n.push(`${this.templateUlStart}${s.join("")}</ul>`), o = !1, s = []), a && (c.length > 0 && n.push(ce.tableStartTag + c.join("") + ce.tableEndTag), a = !1, c = []), d = !0, g.push(h.replace(/^&gt;\s?/, ""));
        continue;
      }
      if (d && _(), h.includes("|")) {
        let x = h;
        x.startsWith("|") && (x = x.slice(1)), x.endsWith("|") && (x = x.slice(0, -1));
        const M = x.split("|").map((F) => F.trim()), P = M.length > 0 && M.every((F) => /^-+$/.test(F));
        if (P || a || M.length > 1) {
          if (o && (n.push(`${this.templateUlStart}${s.join("")}</ul>`), o = !1, s = []), a || (a = !0, c = []), !P) {
            const G = c.length === 0 ? "th" : "td", L = `<tr>${M.map((C) => `<${G}>${C.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</${G}>`).join("")}</tr>`;
            c.push(L);
          }
          continue;
        }
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(h))
        o && (n.push(`${this.templateUlStart}${s.join("")}</ul>`), o = !1, s = []), a && (c.length > 0 && n.push(ce.tableStartTag + c.join("") + ce.tableEndTag), a = !1, c = []), n.push("<hr>");
      else if (/^[\s]*[-*][\s]+/.test(h) || /^[\s]*\d+\.[\s]+/.test(h)) {
        a && (c.length > 0 && n.push(ce.tableStartTag + c.join("") + ce.tableEndTag), a = !1, c = []);
        const x = h.replace(/^[\s]*[-*\d.]+[\s]+/, "");
        o || (o = !0, s = []), s.push(
          `<li style="margin: 0 !important; padding: 0 !important; line-height: 1.2 !important;">${x}</li>`
        );
      } else /^<h[1-6]>/.test(h) ? (o && (n.push(`${this.templateUlStart}${s.join("")}</ul>`), o = !1, s = []), a && (c.length > 0 && n.push(ce.tableStartTag + c.join("") + ce.tableEndTag), a = !1, c = []), n.push(h)) : (o && (n.push(`${this.templateUlStart}${s.join("")}</ul>`), o = !1, s = []), a && (c.length > 0 && n.push(ce.tableStartTag + c.join("") + ce.tableEndTag), a = !1, c = []), n.push(h || ""));
    }
    return _(), o && s.length > 0 && n.push(`${this.templateUlStart}${s.join("")}</ul>`), a && c.length > 0 && n.push(ce.tableStartTag + c.join("") + ce.tableEndTag), n.join(`
`);
  }
  splitMermaidSegments(t) {
    const r = [], n = /^```([\w-]*)[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm;
    let a = 0, c;
    for (; (c = n.exec(t)) !== null; ) {
      const d = (c[1] || "").trim().toLowerCase(), g = c[2];
      if (c.index > a) {
        const u = t.slice(a, c.index);
        u.trim() && r.push({ type: "text", content: u });
      }
      switch (d) {
        case "mermaid":
          r.push({ type: "mermaid", content: g.trim() });
          break;
        case "svg":
          r.push({ type: "svg", content: g.trim() });
          break;
        case "canvas":
          r.push({ type: "canvas", content: g.trim() });
          break;
        default:
          r.push({ type: "code", content: g, language: d });
      }
      a = c.index + c[0].length;
    }
    const o = t.slice(a);
    o.trim() && r.push({ type: "text", content: o });
    const s = [];
    for (const d of r)
      d.type === "text" ? this._splitRawSvgBlocks(d.content, s) : s.push(d);
    return s.length > 0 ? s : [{ type: "text", content: t }];
  }
  _splitRawSvgBlocks(t, r) {
    const n = /<svg\b[\s\S]*?<\/svg>/gi;
    let a = 0, c;
    for (; (c = n.exec(t)) !== null; ) {
      if (c.index > a) {
        const s = t.slice(a, c.index);
        s.trim() && r.push({ type: "text", content: s });
      }
      r.push({ type: "svg", content: c[0] }), a = c.index + c[0].length;
    }
    const o = t.slice(a);
    o.trim() && r.push({ type: "text", content: o });
  }
  _finalizeParagraphBlocks(t) {
    const r = [];
    let n = [];
    const a = () => {
      if (n.length === 0) return;
      const o = n.join(`
`).trim();
      o && r.push(`<p>${o}</p>`), n = [];
    }, c = (o) => /^(@@MDBLOCK\d+@@|@@RAWHTML\d+@@|<(h[1-6]|ul|ol|table|hr|blockquote|div|p|pre)[\s>])/i.test(o);
    for (const o of t.split(`
`)) {
      const s = o.trim();
      if (!s) {
        a();
        continue;
      }
      if (c(s)) {
        a(), r.push(s);
        continue;
      }
      n.push(s);
    }
    return a(), r.join(`
`);
  }
  _extractRawHtml(t, r) {
    t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
    const n = "address|article|aside|details|dialog|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|header|hgroup|hr|main|nav|ol|pre|section|summary|table|tbody|td|tfoot|th|thead|tr|ul", a = new RegExp(String.raw`^([ \t]*)<(${n})(\s[^>]*)?>([\s\S]*?)<\/\2>[ \t]*$`, "gmi");
    t = t.replace(a, (g) => {
      const u = `@@RAWHTML${r.length}@@`;
      return r.push(g.trim()), `
${u}
`;
    });
    const c = new RegExp(String.raw`^[ \t]*<(${n})(\s[^>]*)?\/?>[ \t]*$`, "gmi");
    t = t.replace(c, (g) => {
      const u = `@@RAWHTML${r.length}@@`;
      return r.push(g.trim()), `
${u}
`;
    });
    const o = "span|mark|kbd|sup|sub|abbr|ins|del|small|cite|dfn|time|var|samp|q|ruby|rt|rp|bdo|bdi|data|output|meter|progress", s = new RegExp(String.raw`<(${o})(\s[^>]*)?>([\s\S]*?)<\/\1>`, "gi");
    t = t.replace(s, (g) => {
      const u = `@@RAWHTML${r.length}@@`;
      return r.push(g), u;
    });
    const d = /<(br|wbr|img|input)(\s[^>]*)?\/?>/gi;
    return t = t.replace(d, (g) => {
      const u = `@@RAWHTML${r.length}@@`;
      return r.push(g), u;
    }), t = t.replace(/<!--[\s\S]*?-->/g, (g) => {
      const u = `@@RAWHTML${r.length}@@`;
      return r.push(g), u;
    }), t;
  }
  _sanitizeHtml(t) {
    return Ti.sanitize(t, {
      ALLOWED_TAGS: [
        "div",
        "p",
        "details",
        "summary",
        "figure",
        "figcaption",
        "blockquote",
        "pre",
        "hr",
        "br",
        "wbr",
        "ul",
        "ol",
        "li",
        "dl",
        "dt",
        "dd",
        "table",
        "thead",
        "tbody",
        "tfoot",
        "tr",
        "th",
        "td",
        "caption",
        "colgroup",
        "col",
        "span",
        "mark",
        "kbd",
        "sup",
        "sub",
        "abbr",
        "ins",
        "del",
        "small",
        "cite",
        "dfn",
        "time",
        "var",
        "samp",
        "q",
        "ruby",
        "rt",
        "rp",
        "bdo",
        "bdi",
        "data",
        "output",
        "meter",
        "progress",
        "img",
        "strong",
        "em",
        "b",
        "i",
        "u",
        "s",
        "code",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "section",
        "article",
        "aside",
        "header",
        "footer",
        "nav",
        "main",
        "address",
        "hgroup",
        "picture",
        "source",
        "audio",
        "video"
      ],
      ALLOWED_ATTR: [
        "class",
        "id",
        "style",
        "title",
        "lang",
        "dir",
        "align",
        "valign",
        "colspan",
        "rowspan",
        "scope",
        "headers",
        "width",
        "height",
        "alt",
        "src",
        "srcset",
        "loading",
        "open",
        "datetime",
        "value",
        "min",
        "max",
        "low",
        "high",
        "optimum",
        "start",
        "reversed",
        "type",
        "cite",
        "controls",
        "autoplay",
        "loop",
        "muted",
        "preload",
        "poster",
        "aria-label",
        "aria-describedby",
        "aria-hidden",
        "role"
      ],
      ALLOW_DATA_ATTR: !0,
      FORBID_TAGS: [
        "script",
        "iframe",
        "object",
        "embed",
        "form",
        "input",
        "textarea",
        "select",
        "button",
        "link",
        "meta",
        "style"
      ],
      FORBID_ATTR: [
        "onerror",
        "onclick",
        "onload",
        "onmouseover",
        "onfocus",
        "onblur",
        "onchange",
        "onsubmit",
        "onkeydown",
        "onkeyup",
        "onkeypress"
      ]
    });
  }
  parseThinkingBlocks(t) {
    const r = [];
    let n = 0;
    for (; n < t.length; ) {
      const a = t.indexOf("<thinking>", n);
      if (a === -1) {
        const o = t.substring(n).trim();
        o && r.push({ type: "text", content: o });
        break;
      }
      if (a > n) {
        const o = t.substring(n, a).trim();
        o && r.push({ type: "text", content: o });
      }
      const c = t.indexOf("</thinking>", a);
      if (c === -1) {
        const o = t.substring(a + 10);
        o.trim() && r.push({ type: "thinking", content: o, incomplete: !0 });
        break;
      } else {
        const o = t.substring(a + 10, c);
        r.push({ type: "thinking", content: o, incomplete: !1 }), n = c + 11;
      }
    }
    return r;
  }
  createThinkingBlock(t, r = !1) {
    const n = document.createElement("div");
    n.className = "thinking-block";
    const a = document.createElement("div");
    a.className = "thinking-header", a.innerHTML = `<span>Thinking${r ? "..." : ""}</span><span class="thinking-toggle">v</span>`;
    const c = document.createElement("div");
    return c.className = "thinking-content collapsed", c.textContent = t, a.addEventListener("click", () => {
      const o = a.querySelector(".thinking-toggle");
      c.classList.contains("expanded") ? (c.classList.remove("expanded"), c.classList.add("collapsed"), o?.classList.remove("expanded")) : (c.classList.remove("collapsed"), c.classList.add("expanded"), o?.classList.add("expanded"));
    }), n.append(a), n.append(c), n;
  }
  _escapeHtml(t) {
    return String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  _escapeAttribute(t) {
    return this._escapeHtml(t).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  _buildMermaidBlockHtml(t) {
    return `<div class="mermaid-wrapper"><div class="mermaid" data-diagram="${this._escapeAttribute(t)}"></div></div>`;
  }
  _buildCodeBlockHtml(t, r = "") {
    const n = (r || "").trim(), a = this._escapeHtml(t);
    return `<div class="code-block-wrapper"><div class="code-block-header"><span>${n || "code"}</span><button class="copy-btn" data-role="copy">Copy</button></div><pre><code class="language-${n}">${a}</code></pre></div>`;
  }
  _renderSvgSegment(t, r) {
    const n = document.createElement("div");
    n.className = "svg-wrapper";
    const a = document.createElement("div");
    a.className = "svg-render-container", a.innerHTML = r.content, n.append(a), n.dataset.originalSvg = r.content;
    const c = a.querySelector("svg");
    if (c) {
      if (!c.getAttribute("viewBox")) {
        const o = c.getAttribute("width"), s = c.getAttribute("height");
        o && s && c.setAttribute("viewBox", `0 0 ${Number.parseFloat(o)} ${Number.parseFloat(s)}`);
      }
      c.removeAttribute("width"), c.removeAttribute("height"), c.style.width = "100%", c.style.height = "auto", c.style.maxHeight = "500px";
    }
    t.append(n);
  }
  _renderCanvasSegment(t, r) {
    const n = document.createElement("div");
    n.className = "canvas-wrapper";
    const a = document.createElement("div");
    a.className = "canvas-render-container", n.append(a);
    const c = document.createElement("canvas");
    c.className = "pixel-art-canvas", a.append(c);
    try {
      const o = c.getContext("2d"), s = r.content;
      new Function("canvas", "ctx", s)(c, o);
    } catch (o) {
      const s = o instanceof Error ? o.message : String(o);
      a.innerHTML = `<div class="mermaid-error">Canvas error: ${s}</div>`, console.error("Canvas rendering error:", o);
    }
    t.append(n);
  }
  _renderCodeSegment(t, r) {
    const n = document.createElement("div");
    n.className = "code-block-wrapper";
    const a = r.language || "";
    n.innerHTML = this._buildCodeBlockHtml(r.content, a).replace(/^\s*<div class="code-block-wrapper">/, "").replace(/<\/div>\s*$/, ""), t.append(n);
    const c = n.querySelector('button[data-role="copy"]'), o = n.querySelector("pre code");
    if (c && o && c.addEventListener("click", () => {
      navigator.clipboard.writeText(o.textContent || "").then(() => {
        const s = c.textContent;
        c.textContent = "Copied", setTimeout(() => c.textContent = s, 1500);
      });
    }), o) {
      delete o.dataset.highlighted;
      try {
        V.highlightElement(o);
      } catch (s) {
        console.warn("highlight.js failed:", s);
      }
    }
  }
  postProcessMarkdownElement(t) {
    const r = t.querySelectorAll("table");
    for (const n of Array.from(r)) {
      let a = n.parentElement;
      (!a || !a.classList.contains("markdown-table-wrapper")) && (a = document.createElement("div"), a.className = "markdown-table-wrapper", a.style.position = "relative", a.style.margin = "1rem 0", n.parentNode?.insertBefore(a, n), a.append(n)), n.classList.add("markdown-table");
    }
  }
  generateTocElement(t, r = !1) {
    if (!t) return;
    const n = t.querySelectorAll("h1, h2, h3");
    if (n.length < 2) return;
    const a = [];
    let c = 0;
    for (const u of Array.from(n)) {
      const _ = Number.parseInt(u.tagName.charAt(1), 10), E = `doc-h-${c++}`, h = (u.textContent || "").trim();
      u.id = E, a.push({ level: _, text: h, id: E });
    }
    const o = a.map((u) => {
      const _ = u.level === 1 ? "toc-l1" : u.level === 2 ? "toc-l2" : "toc-l3", E = u.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<li class="${_}"><a href="#${u.id}">${E}</a></li>`;
    }).join(""), s = document.createElement("nav");
    s.className = "doc-toc" + (r ? " doc-toc-collapsed" : "");
    const d = document.createElement("span");
    d.className = "doc-toc-title", d.textContent = "Contents", d.addEventListener("click", () => {
      s.classList.toggle("doc-toc-collapsed");
    });
    const g = document.createElement("ul");
    g.innerHTML = o, s.append(d), s.append(g), t.insertBefore(s, t.firstChild);
  }
  /**
   * Wraps the content following the N-th heading (of a given level) into a
   * collapsible section with a Show more / Show less toggle button.
   *
   * The section spans from the trigger heading up to (but not including) the
   * next heading with a level less than or equal to `headingLevel`, so nested
   * subsections stay inside the collapsible region.
   */
  applyCollapse(t, r = {}) {
    if (!t) return;
    const n = Math.min(6, Math.max(1, r.headingLevel ?? 2)), a = r.fromHeadingIndex ?? 0;
    if (!a || a < 1) return;
    const c = r.showMoreLabel || "Show more", o = r.showLessLabel || "Show less";
    if (t.querySelector(".nx3-collapse-wrapper")) return;
    const s = `H${n}`, d = [];
    for (const D of Array.from(t.querySelectorAll(s)))
      D.closest(".doc-toc") || d.push(D);
    if (d.length < a) return;
    const g = d[a - 1], u = g.parentElement;
    if (!u) return;
    let _ = g;
    for (; _.parentElement && _.parentElement !== u; )
      _ = _.parentElement;
    const E = [];
    let h = _;
    for (; h; ) {
      const D = h.nextSibling;
      E.push(h), h = D;
    }
    const x = [];
    if (u !== t) {
      let D = u.nextElementSibling;
      for (; D; )
        D instanceof HTMLElement && x.push(D), D = D.nextElementSibling;
    }
    if (E.length === 0 && x.length === 0) return;
    const M = document.createElement("div");
    M.className = "nx3-collapse-wrapper nx3-collapse-collapsed";
    const P = document.createElement("div");
    P.className = "nx3-collapse-content";
    let H = 1;
    const F = (D) => {
      for (const K of D)
        if (K instanceof HTMLElement)
          for (const ee of Array.from(K.querySelectorAll(s)))
            ee !== g && H++;
    };
    F(E), F(x);
    const G = document.createElement("button");
    G.type = "button", G.className = "nx3-collapse-toggle", G.setAttribute("aria-expanded", "false");
    const L = document.createElement("span");
    L.className = "nx3-collapse-toggle-label";
    const C = document.createElement("span");
    if (C.className = "nx3-collapse-toggle-text", C.textContent = c, L.append(C), H > 1) {
      const D = document.createElement("span");
      D.className = "nx3-collapse-toggle-hint", D.textContent = `+${H - 1}`, L.append(D);
    }
    const I = document.createElement("span");
    I.className = "nx3-collapse-toggle-chevron", I.setAttribute("aria-hidden", "true"), L.append(I), G.append(L), u.insertBefore(M, _);
    for (const D of E)
      P.append(D);
    for (const D of x)
      P.append(D);
    M.append(G), M.append(P), G.addEventListener("click", () => {
      const K = !M.classList.toggle("nx3-collapse-collapsed");
      G.setAttribute("aria-expanded", String(K)), C.textContent = K ? o : c;
    });
  }
};
Me(ce, "tableStartTag", '<table class="table">'), Me(ce, "tableEndTag", "</table>");
let Gn = ce;
export {
  Gn as MarkDownRenderer,
  Ko as configureExternalLibs
};
//# sourceMappingURL=markdown-renderer-core.js.map
