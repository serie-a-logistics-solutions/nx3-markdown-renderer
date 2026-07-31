var kt = Object.defineProperty;
var xt = (e, t, r) => t in e ? kt(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Y = (e, t, r) => xt(e, typeof t != "symbol" ? t + "" : t, r);
import { g as At, p as Ot, a as Mt, b as Rt, d as Lt, f as Ct, h as It, i as Dt, j as Bt, k as $t, l as zt, n as Pt, q as Ut, s as Ht, u as Gt, w as Ft, x as jt, I as Kt, P as Zt, e as qt, T as Wt, A as Yt, G as Xt, E as Vt, R as Qt, m as Jt, o as en, r as tn, t as nn, v as rn, W as an, C as on } from "./mermaid-Cn29Rjho.js";
function Fe(e) {
  return e instanceof Map ? e.clear = e.delete = e.set = function() {
    throw new Error("map is read-only");
  } : e instanceof Set && (e.add = e.clear = e.delete = function() {
    throw new Error("set is read-only");
  }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((t) => {
    const r = e[t], n = typeof r;
    (n === "object" || n === "function") && !Object.isFrozen(r) && Fe(r);
  }), e;
}
class Ce {
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
function je(e) {
  return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function X(e, ...t) {
  const r = /* @__PURE__ */ Object.create(null);
  for (const n in e)
    r[n] = e[n];
  return t.forEach(function(n) {
    for (const o in n)
      r[o] = n[o];
  }), /** @type {T} */
  r;
}
const sn = "</span>", Ie = (e) => !!e.scope, cn = (e, { prefix: t }) => {
  if (e.startsWith("language:"))
    return e.replace("language:", "language-");
  if (e.includes(".")) {
    const r = e.split(".");
    return [
      `${t}${r.shift()}`,
      ...r.map((n, o) => `${n}${"_".repeat(o + 1)}`)
    ].join(" ");
  }
  return `${t}${e}`;
};
class ln {
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
    this.buffer += je(t);
  }
  /**
   * Adds a node open to the output stream (if needed)
   *
   * @param {Node} node */
  openNode(t) {
    if (!Ie(t)) return;
    const r = cn(
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
    Ie(t) && (this.buffer += sn);
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
const De = (e = {}) => {
  const t = { children: [] };
  return Object.assign(t, e), t;
};
class Ne {
  constructor() {
    this.rootNode = De(), this.stack = [this.rootNode];
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
    const r = De({ scope: t });
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
      Ne._collapse(r);
    }));
  }
}
class dn extends Ne {
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
    return new ln(this, this.options).value();
  }
  finalize() {
    return this.closeAllNodes(), !0;
  }
}
function ce(e) {
  return e ? typeof e == "string" ? e : e.source : null;
}
function Ke(e) {
  return J("(?=", e, ")");
}
function gn(e) {
  return J("(?:", e, ")*");
}
function un(e) {
  return J("(?:", e, ")?");
}
function J(...e) {
  return e.map((r) => ce(r)).join("");
}
function pn(e) {
  const t = e[e.length - 1];
  return typeof t == "object" && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {};
}
function Te(...e) {
  return "(" + (pn(e).capture ? "" : "?:") + e.map((n) => ce(n)).join("|") + ")";
}
function Ze(e) {
  return new RegExp(e.toString() + "|").exec("").length - 1;
}
function bn(e, t) {
  const r = e && e.exec(t);
  return r && r.index === 0;
}
const mn = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
function ke(e, { joinWith: t }) {
  let r = 0;
  return e.map((n) => {
    r += 1;
    const o = r;
    let s = ce(n), i = "";
    for (; s.length > 0; ) {
      const a = mn.exec(s);
      if (!a) {
        i += s;
        break;
      }
      i += s.substring(0, a.index), s = s.substring(a.index + a[0].length), a[0][0] === "\\" && a[1] ? i += "\\" + String(Number(a[1]) + o) : (i += a[0], a[0] === "(" && r++);
    }
    return i;
  }).map((n) => `(${n})`).join(t);
}
const fn = /\b\B/, qe = "[a-zA-Z]\\w*", xe = "[a-zA-Z_]\\w*", We = "\\b\\d+(\\.\\d+)?", Ye = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", Xe = "\\b(0b[01]+)", hn = "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~", _n = (e = {}) => {
  const t = /^#![ ]*\//;
  return e.binary && (e.begin = J(
    t,
    /.*\b/,
    e.binary,
    /\b.*/
  )), X({
    scope: "meta",
    begin: t,
    end: /$/,
    relevance: 0,
    /** @type {ModeCallback} */
    "on:begin": (r, n) => {
      r.index !== 0 && n.ignoreMatch();
    }
  }, e);
}, le = {
  begin: "\\\\[\\s\\S]",
  relevance: 0
}, En = {
  scope: "string",
  begin: "'",
  end: "'",
  illegal: "\\n",
  contains: [le]
}, vn = {
  scope: "string",
  begin: '"',
  end: '"',
  illegal: "\\n",
  contains: [le]
}, yn = {
  begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
}, he = function(e, t, r = {}) {
  const n = X(
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
  const o = Te(
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
      begin: J(
        /[ ]+/,
        // necessary to prevent us gobbling up doctags like /* @author Bob Mcgill */
        "(",
        o,
        /[.]?[:]?([.][ ]|[ ])/,
        "){3}"
      )
      // look for 3 words in a row
    }
  ), n;
}, wn = he("//", "$"), Sn = he("/\\*", "\\*/"), Nn = he("#", "$"), Tn = {
  scope: "number",
  begin: We,
  relevance: 0
}, kn = {
  scope: "number",
  begin: Ye,
  relevance: 0
}, xn = {
  scope: "number",
  begin: Xe,
  relevance: 0
}, An = {
  scope: "regexp",
  begin: /\/(?=[^/\n]*\/)/,
  end: /\/[gimuy]*/,
  contains: [
    le,
    {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [le]
    }
  ]
}, On = {
  scope: "title",
  begin: qe,
  relevance: 0
}, Mn = {
  scope: "title",
  begin: xe,
  relevance: 0
}, Rn = {
  // excludes method names from keyword processing
  begin: "\\.\\s*" + xe,
  relevance: 0
}, Ln = function(e) {
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
var ue = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  APOS_STRING_MODE: En,
  BACKSLASH_ESCAPE: le,
  BINARY_NUMBER_MODE: xn,
  BINARY_NUMBER_RE: Xe,
  COMMENT: he,
  C_BLOCK_COMMENT_MODE: Sn,
  C_LINE_COMMENT_MODE: wn,
  C_NUMBER_MODE: kn,
  C_NUMBER_RE: Ye,
  END_SAME_AS_BEGIN: Ln,
  HASH_COMMENT_MODE: Nn,
  IDENT_RE: qe,
  MATCH_NOTHING_RE: fn,
  METHOD_GUARD: Rn,
  NUMBER_MODE: Tn,
  NUMBER_RE: We,
  PHRASAL_WORDS_MODE: yn,
  QUOTE_STRING_MODE: vn,
  REGEXP_MODE: An,
  RE_STARTERS_RE: hn,
  SHEBANG: _n,
  TITLE_MODE: On,
  UNDERSCORE_IDENT_RE: xe,
  UNDERSCORE_TITLE_MODE: Mn
});
function Cn(e, t) {
  e.input[e.index - 1] === "." && t.ignoreMatch();
}
function In(e, t) {
  e.className !== void 0 && (e.scope = e.className, delete e.className);
}
function Dn(e, t) {
  t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = Cn, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, e.relevance === void 0 && (e.relevance = 0));
}
function Bn(e, t) {
  Array.isArray(e.illegal) && (e.illegal = Te(...e.illegal));
}
function $n(e, t) {
  if (e.match) {
    if (e.begin || e.end) throw new Error("begin & end are not supported with match");
    e.begin = e.match, delete e.match;
  }
}
function zn(e, t) {
  e.relevance === void 0 && (e.relevance = 1);
}
const Pn = (e, t) => {
  if (!e.beforeMatch) return;
  if (e.starts) throw new Error("beforeMatch cannot be used with starts");
  const r = Object.assign({}, e);
  Object.keys(e).forEach((n) => {
    delete e[n];
  }), e.keywords = r.keywords, e.begin = J(r.beforeMatch, Ke(r.begin)), e.starts = {
    relevance: 0,
    contains: [
      Object.assign(r, { endsParent: !0 })
    ]
  }, e.relevance = 0, delete r.beforeMatch;
}, Un = [
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
], Hn = "keyword";
function Ve(e, t, r = Hn) {
  const n = /* @__PURE__ */ Object.create(null);
  return typeof e == "string" ? o(r, e.split(" ")) : Array.isArray(e) ? o(r, e) : Object.keys(e).forEach(function(s) {
    Object.assign(
      n,
      Ve(e[s], t, s)
    );
  }), n;
  function o(s, i) {
    t && (i = i.map((a) => a.toLowerCase())), i.forEach(function(a) {
      const c = a.split("|");
      n[c[0]] = [s, Gn(c[0], c[1])];
    });
  }
}
function Gn(e, t) {
  return t ? Number(t) : Fn(e) ? 0 : 1;
}
function Fn(e) {
  return Un.includes(e.toLowerCase());
}
const Be = {}, Q = (e) => {
  console.error(e);
}, $e = (e, ...t) => {
  console.log(`WARN: ${e}`, ...t);
}, te = (e, t) => {
  Be[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), Be[`${e}/${t}`] = !0);
}, me = new Error();
function Qe(e, t, { key: r }) {
  let n = 0;
  const o = e[r], s = {}, i = {};
  for (let a = 1; a <= t.length; a++)
    i[a + n] = o[a], s[a + n] = !0, n += Ze(t[a - 1]);
  e[r] = i, e[r]._emit = s, e[r]._multi = !0;
}
function jn(e) {
  if (Array.isArray(e.begin)) {
    if (e.skip || e.excludeBegin || e.returnBegin)
      throw Q("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), me;
    if (typeof e.beginScope != "object" || e.beginScope === null)
      throw Q("beginScope must be object"), me;
    Qe(e, e.begin, { key: "beginScope" }), e.begin = ke(e.begin, { joinWith: "" });
  }
}
function Kn(e) {
  if (Array.isArray(e.end)) {
    if (e.skip || e.excludeEnd || e.returnEnd)
      throw Q("skip, excludeEnd, returnEnd not compatible with endScope: {}"), me;
    if (typeof e.endScope != "object" || e.endScope === null)
      throw Q("endScope must be object"), me;
    Qe(e, e.end, { key: "endScope" }), e.end = ke(e.end, { joinWith: "" });
  }
}
function Zn(e) {
  e.scope && typeof e.scope == "object" && e.scope !== null && (e.beginScope = e.scope, delete e.scope);
}
function qn(e) {
  Zn(e), typeof e.beginScope == "string" && (e.beginScope = { _wrap: e.beginScope }), typeof e.endScope == "string" && (e.endScope = { _wrap: e.endScope }), jn(e), Kn(e);
}
function Wn(e) {
  function t(i, a) {
    return new RegExp(
      ce(i),
      "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (a ? "g" : "")
    );
  }
  class r {
    constructor() {
      this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
    }
    // @ts-ignore
    addRule(a, c) {
      c.position = this.position++, this.matchIndexes[this.matchAt] = c, this.regexes.push([c, a]), this.matchAt += Ze(a) + 1;
    }
    compile() {
      this.regexes.length === 0 && (this.exec = () => null);
      const a = this.regexes.map((c) => c[1]);
      this.matcherRe = t(ke(a, { joinWith: "|" }), !0), this.lastIndex = 0;
    }
    /** @param {string} s */
    exec(a) {
      this.matcherRe.lastIndex = this.lastIndex;
      const c = this.matcherRe.exec(a);
      if (!c)
        return null;
      const d = c.findIndex((b, _) => _ > 0 && b !== void 0), l = this.matchIndexes[d];
      return c.splice(0, d), Object.assign(c, l);
    }
  }
  class n {
    constructor() {
      this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
    }
    // @ts-ignore
    getMatcher(a) {
      if (this.multiRegexes[a]) return this.multiRegexes[a];
      const c = new r();
      return this.rules.slice(a).forEach(([d, l]) => c.addRule(d, l)), c.compile(), this.multiRegexes[a] = c, c;
    }
    resumingScanAtSamePosition() {
      return this.regexIndex !== 0;
    }
    considerAll() {
      this.regexIndex = 0;
    }
    // @ts-ignore
    addRule(a, c) {
      this.rules.push([a, c]), c.type === "begin" && this.count++;
    }
    /** @param {string} s */
    exec(a) {
      const c = this.getMatcher(this.regexIndex);
      c.lastIndex = this.lastIndex;
      let d = c.exec(a);
      if (this.resumingScanAtSamePosition() && !(d && d.index === this.lastIndex)) {
        const l = this.getMatcher(0);
        l.lastIndex = this.lastIndex + 1, d = l.exec(a);
      }
      return d && (this.regexIndex += d.position + 1, this.regexIndex === this.count && this.considerAll()), d;
    }
  }
  function o(i) {
    const a = new n();
    return i.contains.forEach((c) => a.addRule(c.begin, { rule: c, type: "begin" })), i.terminatorEnd && a.addRule(i.terminatorEnd, { type: "end" }), i.illegal && a.addRule(i.illegal, { type: "illegal" }), a;
  }
  function s(i, a) {
    const c = (
      /** @type CompiledMode */
      i
    );
    if (i.isCompiled) return c;
    [
      In,
      // do this early so compiler extensions generally don't have to worry about
      // the distinction between match/begin
      $n,
      qn,
      Pn
    ].forEach((l) => l(i, a)), e.compilerExtensions.forEach((l) => l(i, a)), i.__beforeBegin = null, [
      Dn,
      // do this later so compiler extensions that come earlier have access to the
      // raw array if they wanted to perhaps manipulate it, etc.
      Bn,
      // default to 1 relevance if not specified
      zn
    ].forEach((l) => l(i, a)), i.isCompiled = !0;
    let d = null;
    return typeof i.keywords == "object" && i.keywords.$pattern && (i.keywords = Object.assign({}, i.keywords), d = i.keywords.$pattern, delete i.keywords.$pattern), d = d || /\w+/, i.keywords && (i.keywords = Ve(i.keywords, e.case_insensitive)), c.keywordPatternRe = t(d, !0), a && (i.begin || (i.begin = /\B|\b/), c.beginRe = t(c.begin), !i.end && !i.endsWithParent && (i.end = /\B|\b/), i.end && (c.endRe = t(c.end)), c.terminatorEnd = ce(c.end) || "", i.endsWithParent && a.terminatorEnd && (c.terminatorEnd += (i.end ? "|" : "") + a.terminatorEnd)), i.illegal && (c.illegalRe = t(
      /** @type {RegExp | string} */
      i.illegal
    )), i.contains || (i.contains = []), i.contains = [].concat(...i.contains.map(function(l) {
      return Yn(l === "self" ? i : l);
    })), i.contains.forEach(function(l) {
      s(
        /** @type Mode */
        l,
        c
      );
    }), i.starts && s(i.starts, a), c.matcher = o(c), c;
  }
  if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self"))
    throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
  return e.classNameAliases = X(e.classNameAliases || {}), s(
    /** @type Mode */
    e
  );
}
function Je(e) {
  return e ? e.endsWithParent || Je(e.starts) : !1;
}
function Yn(e) {
  return e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map(function(t) {
    return X(e, { variants: null }, t);
  })), e.cachedVariants ? e.cachedVariants : Je(e) ? X(e, { starts: e.starts ? X(e.starts) : null }) : Object.isFrozen(e) ? X(e) : e;
}
var Xn = "11.11.1";
class Vn extends Error {
  constructor(t, r) {
    super(t), this.name = "HTMLInjectionError", this.html = r;
  }
}
const ye = je, ze = X, Pe = Symbol("nomatch"), Qn = 7, et = function(e) {
  const t = /* @__PURE__ */ Object.create(null), r = /* @__PURE__ */ Object.create(null), n = [];
  let o = !0;
  const s = "Could not find the language '{}', did you forget to load/include a language module?", i = { disableAutodetect: !0, name: "Plain text", contains: [] };
  let a = {
    ignoreUnescapedHTML: !1,
    throwUnescapedHTML: !1,
    noHighlightRe: /^(no-?highlight)$/i,
    languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
    classPrefix: "hljs-",
    cssSelector: "pre code",
    languages: null,
    // beta configuration options, subject to change, welcome to discuss
    // https://github.com/highlightjs/highlight.js/issues/1086
    __emitter: dn
  };
  function c(g) {
    return a.noHighlightRe.test(g);
  }
  function d(g) {
    let f = g.className + " ";
    f += g.parentNode ? g.parentNode.className : "";
    const m = a.languageDetectRe.exec(f);
    if (m) {
      const v = D(m[1]);
      return v || ($e(s.replace("{}", m[1])), $e("Falling back to no-highlight mode for this block.", g)), v ? m[1] : "no-highlight";
    }
    return f.split(/\s+/).find((v) => c(v) || D(v));
  }
  function l(g, f, m) {
    let v = "", N = "";
    typeof f == "object" ? (v = g, m = f.ignoreIllegals, N = f.language) : (te("10.7.0", "highlight(lang, code, ...args) has been deprecated."), te("10.7.0", `Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`), N = g, v = f), m === void 0 && (m = !0);
    const $ = {
      code: v,
      language: N
    };
    W("before:highlight", $);
    const P = $.result ? $.result : b($.language, $.code, m);
    return P.code = $.code, W("after:highlight", P), P;
  }
  function b(g, f, m, v) {
    const N = /* @__PURE__ */ Object.create(null);
    function $(p, h) {
      return p.keywords[h];
    }
    function P() {
      if (!E.keywords) {
        z.addText(M);
        return;
      }
      let p = 0;
      E.keywordPatternRe.lastIndex = 0;
      let h = E.keywordPatternRe.exec(M), w = "";
      for (; h; ) {
        w += M.substring(p, h.index);
        const x = Z.case_insensitive ? h[0].toLowerCase() : h[0], U = $(E, x);
        if (U) {
          const [q, Nt] = U;
          if (z.addText(w), w = "", N[x] = (N[x] || 0) + 1, N[x] <= Qn && (ge += Nt), q.startsWith("_"))
            w += h[0];
          else {
            const Tt = Z.classNameAliases[q] || q;
            K(h[0], Tt);
          }
        } else
          w += h[0];
        p = E.keywordPatternRe.lastIndex, h = E.keywordPatternRe.exec(M);
      }
      w += M.substring(p), z.addText(w);
    }
    function j() {
      if (M === "") return;
      let p = null;
      if (typeof E.subLanguage == "string") {
        if (!t[E.subLanguage]) {
          z.addText(M);
          return;
        }
        p = b(E.subLanguage, M, !0, Le[E.subLanguage]), Le[E.subLanguage] = /** @type {CompiledMode} */
        p._top;
      } else
        p = u(M, E.subLanguage.length ? E.subLanguage : null);
      E.relevance > 0 && (ge += p.relevance), z.__addSublanguage(p._emitter, p.language);
    }
    function F() {
      E.subLanguage != null ? j() : P(), M = "";
    }
    function K(p, h) {
      p !== "" && (z.startScope(h), z.addText(p), z.endScope());
    }
    function Ae(p, h) {
      let w = 1;
      const x = h.length - 1;
      for (; w <= x; ) {
        if (!p._emit[w]) {
          w++;
          continue;
        }
        const U = Z.classNameAliases[p[w]] || p[w], q = h[w];
        U ? K(q, U) : (M = q, P(), M = ""), w++;
      }
    }
    function Oe(p, h) {
      return p.scope && typeof p.scope == "string" && z.openNode(Z.classNameAliases[p.scope] || p.scope), p.beginScope && (p.beginScope._wrap ? (K(M, Z.classNameAliases[p.beginScope._wrap] || p.beginScope._wrap), M = "") : p.beginScope._multi && (Ae(p.beginScope, h), M = "")), E = Object.create(p, { parent: { value: E } }), E;
    }
    function Me(p, h, w) {
      let x = bn(p.endRe, w);
      if (x) {
        if (p["on:end"]) {
          const U = new Ce(p);
          p["on:end"](h, U), U.isMatchIgnored && (x = !1);
        }
        if (x) {
          for (; p.endsParent && p.parent; )
            p = p.parent;
          return p;
        }
      }
      if (p.endsWithParent)
        return Me(p.parent, h, w);
    }
    function Et(p) {
      return E.matcher.regexIndex === 0 ? (M += p[0], 1) : (ve = !0, 0);
    }
    function vt(p) {
      const h = p[0], w = p.rule, x = new Ce(w), U = [w.__beforeBegin, w["on:begin"]];
      for (const q of U)
        if (q && (q(p, x), x.isMatchIgnored))
          return Et(h);
      return w.skip ? M += h : (w.excludeBegin && (M += h), F(), !w.returnBegin && !w.excludeBegin && (M = h)), Oe(w, p), w.returnBegin ? 0 : h.length;
    }
    function yt(p) {
      const h = p[0], w = f.substring(p.index), x = Me(E, p, w);
      if (!x)
        return Pe;
      const U = E;
      E.endScope && E.endScope._wrap ? (F(), K(h, E.endScope._wrap)) : E.endScope && E.endScope._multi ? (F(), Ae(E.endScope, p)) : U.skip ? M += h : (U.returnEnd || U.excludeEnd || (M += h), F(), U.excludeEnd && (M = h));
      do
        E.scope && z.closeNode(), !E.skip && !E.subLanguage && (ge += E.relevance), E = E.parent;
      while (E !== x.parent);
      return x.starts && Oe(x.starts, p), U.returnEnd ? 0 : h.length;
    }
    function wt() {
      const p = [];
      for (let h = E; h !== Z; h = h.parent)
        h.scope && p.unshift(h.scope);
      p.forEach((h) => z.openNode(h));
    }
    let de = {};
    function Re(p, h) {
      const w = h && h[0];
      if (M += p, w == null)
        return F(), 0;
      if (de.type === "begin" && h.type === "end" && de.index === h.index && w === "") {
        if (M += f.slice(h.index, h.index + 1), !o) {
          const x = new Error(`0 width match regex (${g})`);
          throw x.languageName = g, x.badRule = de.rule, x;
        }
        return 1;
      }
      if (de = h, h.type === "begin")
        return vt(h);
      if (h.type === "illegal" && !m) {
        const x = new Error('Illegal lexeme "' + w + '" for mode "' + (E.scope || "<unnamed>") + '"');
        throw x.mode = E, x;
      } else if (h.type === "end") {
        const x = yt(h);
        if (x !== Pe)
          return x;
      }
      if (h.type === "illegal" && w === "")
        return M += `
`, 1;
      if (Ee > 1e5 && Ee > h.index * 3)
        throw new Error("potential infinite loop, way more iterations than matches");
      return M += w, w.length;
    }
    const Z = D(g);
    if (!Z)
      throw Q(s.replace("{}", g)), new Error('Unknown language: "' + g + '"');
    const St = Wn(Z);
    let _e = "", E = v || St;
    const Le = {}, z = new a.__emitter(a);
    wt();
    let M = "", ge = 0, V = 0, Ee = 0, ve = !1;
    try {
      if (Z.__emitTokens)
        Z.__emitTokens(f, z);
      else {
        for (E.matcher.considerAll(); ; ) {
          Ee++, ve ? ve = !1 : E.matcher.considerAll(), E.matcher.lastIndex = V;
          const p = E.matcher.exec(f);
          if (!p) break;
          const h = f.substring(V, p.index), w = Re(h, p);
          V = p.index + w;
        }
        Re(f.substring(V));
      }
      return z.finalize(), _e = z.toHTML(), {
        language: g,
        value: _e,
        relevance: ge,
        illegal: !1,
        _emitter: z,
        _top: E
      };
    } catch (p) {
      if (p.message && p.message.includes("Illegal"))
        return {
          language: g,
          value: ye(f),
          illegal: !0,
          relevance: 0,
          _illegalBy: {
            message: p.message,
            index: V,
            context: f.slice(V - 100, V + 100),
            mode: p.mode,
            resultSoFar: _e
          },
          _emitter: z
        };
      if (o)
        return {
          language: g,
          value: ye(f),
          illegal: !1,
          relevance: 0,
          errorRaised: p,
          _emitter: z,
          _top: E
        };
      throw p;
    }
  }
  function _(g) {
    const f = {
      value: ye(g),
      illegal: !1,
      relevance: 0,
      _top: i,
      _emitter: new a.__emitter(a)
    };
    return f._emitter.addText(g), f;
  }
  function u(g, f) {
    f = f || a.languages || Object.keys(t);
    const m = _(g), v = f.filter(D).filter(ee).map(
      (F) => b(F, g, !1)
    );
    v.unshift(m);
    const N = v.sort((F, K) => {
      if (F.relevance !== K.relevance) return K.relevance - F.relevance;
      if (F.language && K.language) {
        if (D(F.language).supersetOf === K.language)
          return 1;
        if (D(K.language).supersetOf === F.language)
          return -1;
      }
      return 0;
    }), [$, P] = N, j = $;
    return j.secondBest = P, j;
  }
  function S(g, f, m) {
    const v = f && r[f] || m;
    g.classList.add("hljs"), g.classList.add(`language-${v}`);
  }
  function y(g) {
    let f = null;
    const m = d(g);
    if (c(m)) return;
    if (W(
      "before:highlightElement",
      { el: g, language: m }
    ), g.dataset.highlighted) {
      console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.", g);
      return;
    }
    if (g.children.length > 0 && (a.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(g)), a.throwUnescapedHTML))
      throw new Vn(
        "One of your code blocks includes unescaped HTML.",
        g.innerHTML
      );
    f = g;
    const v = f.textContent, N = m ? l(v, { language: m, ignoreIllegals: !0 }) : u(v);
    g.innerHTML = N.value, g.dataset.highlighted = "yes", S(g, m, N.language), g.result = {
      language: N.language,
      // TODO: remove with version 11.0
      re: N.relevance,
      relevance: N.relevance
    }, N.secondBest && (g.secondBest = {
      language: N.secondBest.language,
      relevance: N.secondBest.relevance
    }), W("after:highlightElement", { el: g, result: N, text: v });
  }
  function T(g) {
    a = ze(a, g);
  }
  const L = () => {
    I(), te("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
  };
  function A() {
    I(), te("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
  }
  let R = !1;
  function I() {
    function g() {
      I();
    }
    if (document.readyState === "loading") {
      R || window.addEventListener("DOMContentLoaded", g, !1), R = !0;
      return;
    }
    document.querySelectorAll(a.cssSelector).forEach(y);
  }
  function O(g, f) {
    let m = null;
    try {
      m = f(e);
    } catch (v) {
      if (Q("Language definition for '{}' could not be registered.".replace("{}", g)), o)
        Q(v);
      else
        throw v;
      m = i;
    }
    m.name || (m.name = g), t[g] = m, m.rawDefinition = f.bind(null, e), m.aliases && G(m.aliases, { languageName: g });
  }
  function C(g) {
    delete t[g];
    for (const f of Object.keys(r))
      r[f] === g && delete r[f];
  }
  function k() {
    return Object.keys(t);
  }
  function D(g) {
    return g = (g || "").toLowerCase(), t[g] || t[r[g]];
  }
  function G(g, { languageName: f }) {
    typeof g == "string" && (g = [g]), g.forEach((m) => {
      r[m.toLowerCase()] = f;
    });
  }
  function ee(g) {
    const f = D(g);
    return f && !f.disableAutodetect;
  }
  function ie(g) {
    g["before:highlightBlock"] && !g["before:highlightElement"] && (g["before:highlightElement"] = (f) => {
      g["before:highlightBlock"](
        Object.assign({ block: f.el }, f)
      );
    }), g["after:highlightBlock"] && !g["after:highlightElement"] && (g["after:highlightElement"] = (f) => {
      g["after:highlightBlock"](
        Object.assign({ block: f.el }, f)
      );
    });
  }
  function ae(g) {
    ie(g), n.push(g);
  }
  function oe(g) {
    const f = n.indexOf(g);
    f !== -1 && n.splice(f, 1);
  }
  function W(g, f) {
    const m = g;
    n.forEach(function(v) {
      v[m] && v[m](f);
    });
  }
  function se(g) {
    return te("10.7.0", "highlightBlock will be removed entirely in v12.0"), te("10.7.0", "Please use highlightElement now."), y(g);
  }
  Object.assign(e, {
    highlight: l,
    highlightAuto: u,
    highlightAll: I,
    highlightElement: y,
    // TODO: Remove with v12 API
    highlightBlock: se,
    configure: T,
    initHighlighting: L,
    initHighlightingOnLoad: A,
    registerLanguage: O,
    unregisterLanguage: C,
    listLanguages: k,
    getLanguage: D,
    registerAliases: G,
    autoDetection: ee,
    inherit: ze,
    addPlugin: ae,
    removePlugin: oe
  }), e.debugMode = function() {
    o = !1;
  }, e.safeMode = function() {
    o = !0;
  }, e.versionString = Xn, e.regex = {
    concat: J,
    lookahead: Ke,
    either: Te,
    optional: un,
    anyNumberOfTimes: gn
  };
  for (const g in ue)
    typeof ue[g] == "object" && Fe(ue[g]);
  return Object.assign(e, ue), e;
}, re = et({});
re.newInstance = () => et({});
var Jn = re;
re.HighlightJS = re;
re.default = re;
const B = /* @__PURE__ */ At(Jn);
function tt(e) {
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
  const o = {
    className: "subst",
    begin: /\$\(/,
    end: /\)/,
    contains: [e.BACKSLASH_ESCAPE]
  }, s = e.inherit(
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
  ), i = {
    begin: /<<-?\s*(?=\w+)/,
    starts: { contains: [
      e.END_SAME_AS_BEGIN({
        begin: /(\w+)/,
        end: /(\w+)/,
        className: "string"
      })
    ] }
  }, a = {
    className: "string",
    begin: /"/,
    end: /"/,
    contains: [
      e.BACKSLASH_ESCAPE,
      r,
      o
    ]
  };
  o.contains.push(a);
  const c = {
    match: /\\"/
  }, d = {
    className: "string",
    begin: /'/,
    end: /'/
  }, l = {
    match: /\\'/
  }, b = {
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
  }, _ = [
    "fish",
    "bash",
    "zsh",
    "sh",
    "csh",
    "ksh",
    "tcsh",
    "dash",
    "scsh"
  ], u = e.SHEBANG({
    binary: `(${_.join("|")})`,
    relevance: 10
  }), S = {
    className: "function",
    begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
    returnBegin: !0,
    contains: [e.inherit(e.TITLE_MODE, { begin: /\w[\w\d_]*/ })],
    relevance: 0
  }, y = [
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
  ], T = [
    "true",
    "false"
  ], L = { match: /(\/[a-z._-]+)+/ }, A = [
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
  ], R = [
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
  ], I = [
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
  ], O = [
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
      keyword: y,
      literal: T,
      built_in: [
        ...A,
        ...R,
        // Shell modifiers
        "set",
        "shopt",
        ...I,
        ...O
      ]
    },
    contains: [
      u,
      // to catch known shells and boost relevancy
      e.SHEBANG(),
      // to catch unknown shells but still highlight the shebang
      S,
      b,
      s,
      i,
      L,
      a,
      c,
      d,
      l,
      r
    ]
  };
}
const er = (e) => ({
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
}), tr = [
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
], nr = [
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
], rr = [
  ...tr,
  ...nr
], ir = [
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
].sort().reverse(), ar = [
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
].sort().reverse(), or = [
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
].sort().reverse(), sr = [
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
function cr(e) {
  const t = e.regex, r = er(e), n = { begin: /-(webkit|moz|ms|o)-(?=[a-z])/ }, o = "and or not only", s = /@-?\w[\w]*(-\w+)*/, i = "[a-zA-Z-][a-zA-Z0-9_-]*", a = [
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
        begin: "\\." + i,
        relevance: 0
      },
      r.ATTRIBUTE_SELECTOR_MODE,
      {
        className: "selector-pseudo",
        variants: [
          { begin: ":(" + ar.join("|") + ")" },
          { begin: ":(:)?(" + or.join("|") + ")" }
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
        begin: "\\b(" + sr.join("|") + ")\\b"
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
          ...a,
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
              ...a,
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
            begin: s
          },
          {
            begin: /\s/,
            endsWithParent: !0,
            excludeEnd: !0,
            relevance: 0,
            keywords: {
              $pattern: /[a-z-]+/,
              keyword: o,
              attribute: ir.join(" ")
            },
            contains: [
              {
                begin: /[a-z-]+(?=:)/,
                className: "attribute"
              },
              ...a,
              r.CSS_NUMBER_MODE
            ]
          }
        ]
      },
      {
        className: "selector-tag",
        begin: "\\b(" + rr.join("|") + ")\\b"
      }
    ]
  };
}
var ne = "[0-9](_*[0-9])*", pe = `\\.(${ne})`, be = "[0-9a-fA-F](_*[0-9a-fA-F])*", Ue = {
  className: "number",
  variants: [
    // DecimalFloatingPointLiteral
    // including ExponentPart
    { begin: `(\\b(${ne})((${pe})|\\.)?|(${pe}))[eE][+-]?(${ne})[fFdD]?\\b` },
    // excluding ExponentPart
    { begin: `\\b(${ne})((${pe})[fFdD]?\\b|\\.([fFdD]\\b)?)` },
    { begin: `(${pe})[fFdD]?\\b` },
    { begin: `\\b(${ne})[fFdD]\\b` },
    // HexadecimalFloatingPointLiteral
    { begin: `\\b0[xX]((${be})\\.?|(${be})?\\.(${be}))[pP][+-]?(${ne})[fFdD]?\\b` },
    // DecimalIntegerLiteral
    { begin: "\\b(0|[1-9](_*[0-9])*)[lL]?\\b" },
    // HexIntegerLiteral
    { begin: `\\b0[xX](${be})[lL]?\\b` },
    // OctalIntegerLiteral
    { begin: "\\b0(_*[0-7])*[lL]?\\b" },
    // BinaryIntegerLiteral
    { begin: "\\b0[bB][01](_*[01])*[lL]?\\b" }
  ],
  relevance: 0
};
function nt(e, t, r) {
  return r === -1 ? "" : e.replace(t, (n) => nt(e, t, r - 1));
}
function lr(e) {
  const t = e.regex, r = "[À-ʸa-zA-Z_$][À-ʸa-zA-Z_$0-9]*", n = r + nt("(?:<" + r + "~~~(?:\\s*,\\s*" + r + "~~~)*>)?", /~~~/g, 2), c = {
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
  }, d = {
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
  }, l = {
    className: "params",
    begin: /\(/,
    end: /\)/,
    keywords: c,
    relevance: 0,
    contains: [e.C_BLOCK_COMMENT_MODE],
    endsParent: !0
  };
  return {
    name: "Java",
    aliases: ["jsp"],
    keywords: c,
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
          l,
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
        keywords: c,
        contains: [
          {
            className: "params",
            begin: /\(/,
            end: /\)/,
            keywords: c,
            relevance: 0,
            contains: [
              d,
              e.APOS_STRING_MODE,
              e.QUOTE_STRING_MODE,
              Ue,
              e.C_BLOCK_COMMENT_MODE
            ]
          },
          e.C_LINE_COMMENT_MODE,
          e.C_BLOCK_COMMENT_MODE
        ]
      },
      Ue,
      d
    ]
  };
}
const He = "[A-Za-z$_][0-9A-Za-z$_]*", dr = [
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
], gr = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], rt = [
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
], it = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], at = [
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
], ur = [
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
], pr = [].concat(
  at,
  rt,
  it
);
function ot(e) {
  const t = e.regex, r = (m, { after: v }) => {
    const N = "</" + m[0].slice(1);
    return m.input.indexOf(N, v) !== -1;
  }, n = He, o = {
    begin: "<>",
    end: "</>"
  }, s = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (m, v) => {
      const N = m[0].length + m.index, $ = m.input[N];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        $ === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        $ === ","
      ) {
        v.ignoreMatch();
        return;
      }
      $ === ">" && (r(m, { after: N }) || v.ignoreMatch());
      let P;
      const j = m.input.substring(N);
      if (P = j.match(/^\s*=/)) {
        v.ignoreMatch();
        return;
      }
      if ((P = j.match(/^\s+extends\s+/)) && P.index === 0) {
        v.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: He,
    keyword: dr,
    literal: gr,
    built_in: pr,
    "variable.language": ur
  }, c = "[0-9](_?[0-9])*", d = `\\.(${c})`, l = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", b = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${l})((${d})|\\.)?|(${d}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${l})\\b((${d})\\b|\\.)?|(${d})\\b` },
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
  }, _ = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, u = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "xml"
    }
  }, S = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "css"
    }
  }, y = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "graphql"
    }
  }, T = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      _
    ]
  }, A = {
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
  }, R = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    u,
    S,
    y,
    T,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    b
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  _.contains = R.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(R)
  });
  const I = [].concat(A, _.contains), O = I.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(I)
    }
  ]), C = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: O
  }, k = {
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
  }, D = {
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
        ...rt,
        ...it
      ]
    }
  }, G = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, ee = {
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
    contains: [C],
    illegal: /%/
  }, ie = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function ae(m) {
    return t.concat("(?!", m.join("|"), ")");
  }
  const oe = {
    match: t.concat(
      /\b/,
      ae([
        ...at,
        "super",
        "import"
      ].map((m) => `${m}\\s*\\(`)),
      n,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, W = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(n, /(?![0-9A-Za-z$_(])/)
    )),
    end: n,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, se = {
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
      C
    ]
  }, g = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", f = {
    match: [
      /const|var|let/,
      /\s+/,
      n,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(g)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      C
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: O, CLASS_REFERENCE: D },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      G,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      u,
      S,
      y,
      T,
      A,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      b,
      D,
      {
        scope: "attr",
        match: n + t.lookahead(":"),
        relevance: 0
      },
      f,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          A,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: g,
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
                    keywords: a,
                    contains: O
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
              { begin: o.begin, end: o.end },
              { match: s },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      ee,
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
          C,
          e.inherit(e.TITLE_MODE, { begin: n, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      W,
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
        contains: [C]
      },
      oe,
      ie,
      k,
      se,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function br(e) {
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
  ], o = {
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
      o,
      e.C_NUMBER_MODE,
      e.C_LINE_COMMENT_MODE,
      e.C_BLOCK_COMMENT_MODE
    ],
    illegal: "\\S"
  };
}
function st(e) {
  const t = e.regex, r = {
    begin: /<\/?[A-Za-z_]/,
    end: ">",
    subLanguage: "xml",
    relevance: 0
  }, n = {
    begin: "^[-\\*]{3,}",
    end: "$"
  }, o = {
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
  }, s = {
    className: "bullet",
    begin: "^[ 	]*([*+-]|(\\d+\\.))(?=\\s+)",
    end: "\\s+",
    excludeEnd: !0
  }, i = {
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
  }, a = /[A-Za-z][A-Za-z0-9+.-]*/, c = {
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
        begin: t.concat(/\[.+?\]\(/, a, /:\/\/.*?\)/),
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
  }, d = {
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
  }, l = {
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
  }, b = e.inherit(d, { contains: [] }), _ = e.inherit(l, { contains: [] });
  d.contains.push(_), l.contains.push(b);
  let u = [
    r,
    c
  ];
  return [
    d,
    l,
    b,
    _
  ].forEach((L) => {
    L.contains = L.contains.concat(u);
  }), u = u.concat(d, l), {
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
            contains: u
          },
          {
            begin: "(?=^.+?\\n[=-]{2,}$)",
            contains: [
              { begin: "^[=-]*$" },
              {
                begin: "^",
                end: "\\n",
                contains: u
              }
            ]
          }
        ]
      },
      r,
      s,
      d,
      l,
      {
        className: "quote",
        begin: "^>\\s+",
        contains: u,
        end: "$"
      },
      o,
      n,
      c,
      i,
      {
        //https://spec.commonmark.org/0.31.2/#entity-references
        scope: "literal",
        match: /&([a-zA-Z0-9]+|#[0-9]{1,7}|#[Xx][0-9a-fA-F]{1,6});/
      }
    ]
  };
}
function ct(e) {
  return {
    name: "Plain text",
    aliases: [
      "text",
      "txt"
    ],
    disableAutodetect: !0
  };
}
const mr = (e) => ({
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
}), fr = [
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
], hr = [
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
], _r = [
  ...fr,
  ...hr
], Er = [
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
].sort().reverse(), vr = [
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
].sort().reverse(), yr = [
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
].sort().reverse(), wr = [
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
function Sr(e) {
  const t = mr(e), r = yr, n = vr, o = "@[a-z-]+", s = "and or not only", a = {
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
        begin: "\\b(" + _r.join("|") + ")\\b",
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
      a,
      {
        // pseudo-selector params
        begin: /\(/,
        end: /\)/,
        contains: [t.CSS_NUMBER_MODE]
      },
      t.CSS_VARIABLE,
      {
        className: "attribute",
        begin: "\\b(" + wr.join("|") + ")\\b"
      },
      { begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b" },
      {
        begin: /:/,
        end: /[;}{]/,
        relevance: 0,
        contains: [
          t.BLOCK_COMMENT,
          a,
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
          $pattern: o,
          keyword: "@page @font-face"
        }
      },
      {
        begin: "@",
        end: "[{;]",
        returnBegin: !0,
        keywords: {
          $pattern: /[a-z-]+/,
          keyword: s,
          attribute: Er.join(" ")
        },
        contains: [
          {
            begin: o,
            className: "keyword"
          },
          {
            begin: /[a-z-]+(?=:)/,
            className: "attribute"
          },
          a,
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
function Nr(e) {
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
function Tr(e) {
  const t = e.regex, r = e.COMMENT("--", "$"), n = {
    scope: "string",
    variants: [
      {
        begin: /'/,
        end: /'/,
        contains: [{ match: /''/ }]
      }
    ]
  }, o = {
    begin: /"/,
    end: /"/,
    contains: [{ match: /""/ }]
  }, s = [
    "true",
    "false",
    // Not sure it's correct to call NULL literal, and clauses like IS [NOT] NULL look strange that way.
    // "null",
    "unknown"
  ], i = [
    "double precision",
    "large object",
    "with timezone",
    "without timezone"
  ], a = [
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
  ], c = [
    "add",
    "asc",
    "collation",
    "desc",
    "final",
    "first",
    "last",
    "view"
  ], d = [
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
  ], l = [
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
  ], b = [
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
  ], _ = [
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
  ], u = l, S = [
    ...d,
    ...c
  ].filter((O) => !l.includes(O)), y = {
    scope: "variable",
    match: /@[a-z0-9][a-z0-9_]*/
  }, T = {
    scope: "operator",
    match: /[-+*/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?/,
    relevance: 0
  }, L = {
    match: t.concat(/\b/, t.either(...u), /\s*\(/),
    relevance: 0,
    keywords: { built_in: u }
  };
  function A(O) {
    return t.concat(
      /\b/,
      t.either(...O.map((C) => C.replace(/\s+/, "\\s+"))),
      /\b/
    );
  }
  const R = {
    scope: "keyword",
    match: A(_),
    relevance: 0
  };
  function I(O, {
    exceptions: C,
    when: k
  } = {}) {
    const D = k;
    return C = C || [], O.map((G) => G.match(/\|\d+$/) || C.includes(G) ? G : D(G) ? `${G}|0` : G);
  }
  return {
    name: "SQL",
    case_insensitive: !0,
    // does not include {} or HTML tags `</`
    illegal: /[{}]|<\//,
    keywords: {
      $pattern: /\b[\w\.]+/,
      keyword: I(S, { when: (O) => O.length < 3 }),
      literal: s,
      type: a,
      built_in: b
    },
    contains: [
      {
        scope: "type",
        match: A(i)
      },
      R,
      L,
      y,
      n,
      o,
      e.C_NUMBER_MODE,
      e.C_BLOCK_COMMENT_MODE,
      r,
      T
    ]
  };
}
const fe = "[A-Za-z$_][0-9A-Za-z$_]*", lt = [
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
], dt = [
  "true",
  "false",
  "null",
  "undefined",
  "NaN",
  "Infinity"
], gt = [
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
], ut = [
  "Error",
  "EvalError",
  "InternalError",
  "RangeError",
  "ReferenceError",
  "SyntaxError",
  "TypeError",
  "URIError"
], pt = [
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
], bt = [
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
], mt = [].concat(
  pt,
  gt,
  ut
);
function kr(e) {
  const t = e.regex, r = (m, { after: v }) => {
    const N = "</" + m[0].slice(1);
    return m.input.indexOf(N, v) !== -1;
  }, n = fe, o = {
    begin: "<>",
    end: "</>"
  }, s = /<[A-Za-z0-9\\._:-]+\s*\/>/, i = {
    begin: /<[A-Za-z0-9\\._:-]+/,
    end: /\/[A-Za-z0-9\\._:-]+>|\/>/,
    /**
     * @param {RegExpMatchArray} match
     * @param {CallbackResponse} response
     */
    isTrulyOpeningTag: (m, v) => {
      const N = m[0].length + m.index, $ = m.input[N];
      if (
        // HTML should not include another raw `<` inside a tag
        // nested type?
        // `<Array<Array<number>>`, etc.
        $ === "<" || // the , gives away that this is not HTML
        // `<T, A extends keyof T, V>`
        $ === ","
      ) {
        v.ignoreMatch();
        return;
      }
      $ === ">" && (r(m, { after: N }) || v.ignoreMatch());
      let P;
      const j = m.input.substring(N);
      if (P = j.match(/^\s*=/)) {
        v.ignoreMatch();
        return;
      }
      if ((P = j.match(/^\s+extends\s+/)) && P.index === 0) {
        v.ignoreMatch();
        return;
      }
    }
  }, a = {
    $pattern: fe,
    keyword: lt,
    literal: dt,
    built_in: mt,
    "variable.language": bt
  }, c = "[0-9](_?[0-9])*", d = `\\.(${c})`, l = "0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*", b = {
    className: "number",
    variants: [
      // DecimalLiteral
      { begin: `(\\b(${l})((${d})|\\.)?|(${d}))[eE][+-]?(${c})\\b` },
      { begin: `\\b(${l})\\b((${d})\\b|\\.)?|(${d})\\b` },
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
  }, _ = {
    className: "subst",
    begin: "\\$\\{",
    end: "\\}",
    keywords: a,
    contains: []
    // defined later
  }, u = {
    begin: ".?html`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "xml"
    }
  }, S = {
    begin: ".?css`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "css"
    }
  }, y = {
    begin: ".?gql`",
    end: "",
    starts: {
      end: "`",
      returnEnd: !1,
      contains: [
        e.BACKSLASH_ESCAPE,
        _
      ],
      subLanguage: "graphql"
    }
  }, T = {
    className: "string",
    begin: "`",
    end: "`",
    contains: [
      e.BACKSLASH_ESCAPE,
      _
    ]
  }, A = {
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
  }, R = [
    e.APOS_STRING_MODE,
    e.QUOTE_STRING_MODE,
    u,
    S,
    y,
    T,
    // Skip numbers when they are part of a variable name
    { match: /\$\d+/ },
    b
    // This is intentional:
    // See https://github.com/highlightjs/highlight.js/issues/3288
    // hljs.REGEXP_MODE
  ];
  _.contains = R.concat({
    // we need to pair up {} inside our subst to prevent
    // it from ending too early by matching another }
    begin: /\{/,
    end: /\}/,
    keywords: a,
    contains: [
      "self"
    ].concat(R)
  });
  const I = [].concat(A, _.contains), O = I.concat([
    // eat recursive parens in sub expressions
    {
      begin: /(\s*)\(/,
      end: /\)/,
      keywords: a,
      contains: ["self"].concat(I)
    }
  ]), C = {
    className: "params",
    // convert this to negative lookbehind in v12
    begin: /(\s*)\(/,
    // to match the parms with
    end: /\)/,
    excludeBegin: !0,
    excludeEnd: !0,
    keywords: a,
    contains: O
  }, k = {
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
  }, D = {
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
        ...gt,
        ...ut
      ]
    }
  }, G = {
    label: "use_strict",
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use (strict|asm)['"]/
  }, ee = {
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
    contains: [C],
    illegal: /%/
  }, ie = {
    relevance: 0,
    match: /\b[A-Z][A-Z_0-9]+\b/,
    className: "variable.constant"
  };
  function ae(m) {
    return t.concat("(?!", m.join("|"), ")");
  }
  const oe = {
    match: t.concat(
      /\b/,
      ae([
        ...pt,
        "super",
        "import"
      ].map((m) => `${m}\\s*\\(`)),
      n,
      t.lookahead(/\s*\(/)
    ),
    className: "title.function",
    relevance: 0
  }, W = {
    begin: t.concat(/\./, t.lookahead(
      t.concat(n, /(?![0-9A-Za-z$_(])/)
    )),
    end: n,
    excludeBegin: !0,
    keywords: "prototype",
    className: "property",
    relevance: 0
  }, se = {
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
      C
    ]
  }, g = "(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|" + e.UNDERSCORE_IDENT_RE + ")\\s*=>", f = {
    match: [
      /const|var|let/,
      /\s+/,
      n,
      /\s*/,
      /=\s*/,
      /(async\s*)?/,
      // async is optional
      t.lookahead(g)
    ],
    keywords: "async",
    className: {
      1: "keyword",
      3: "title.function"
    },
    contains: [
      C
    ]
  };
  return {
    name: "JavaScript",
    aliases: ["js", "jsx", "mjs", "cjs"],
    keywords: a,
    // this will be extended by TypeScript
    exports: { PARAMS_CONTAINS: O, CLASS_REFERENCE: D },
    illegal: /#(?![$_A-z])/,
    contains: [
      e.SHEBANG({
        label: "shebang",
        binary: "node",
        relevance: 5
      }),
      G,
      e.APOS_STRING_MODE,
      e.QUOTE_STRING_MODE,
      u,
      S,
      y,
      T,
      A,
      // Skip numbers when they are part of a variable name
      { match: /\$\d+/ },
      b,
      D,
      {
        scope: "attr",
        match: n + t.lookahead(":"),
        relevance: 0
      },
      f,
      {
        // "value" container
        begin: "(" + e.RE_STARTERS_RE + "|\\b(case|return|throw)\\b)\\s*",
        keywords: "return throw case",
        relevance: 0,
        contains: [
          A,
          e.REGEXP_MODE,
          {
            className: "function",
            // we have to count the parens to make sure we actually have the
            // correct bounding ( ) before the =>.  There could be any number of
            // sub-expressions inside also surrounded by parens.
            begin: g,
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
                    keywords: a,
                    contains: O
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
              { begin: o.begin, end: o.end },
              { match: s },
              {
                begin: i.begin,
                // we carefully check the opening tag to see if it truly
                // is a tag and not a false positive
                "on:begin": i.isTrulyOpeningTag,
                end: i.end
              }
            ],
            subLanguage: "xml",
            contains: [
              {
                begin: i.begin,
                end: i.end,
                skip: !0,
                contains: ["self"]
              }
            ]
          }
        ]
      },
      ee,
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
          C,
          e.inherit(e.TITLE_MODE, { begin: n, className: "title.function" })
        ]
      },
      // catch ... so it won't trigger the property rule below
      {
        match: /\.\.\./,
        relevance: 0
      },
      W,
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
        contains: [C]
      },
      oe,
      ie,
      k,
      se,
      {
        match: /\$[(.]/
        // relevance booster for a pattern common to JS libs: `$(something)` and `$.something`
      }
    ]
  };
}
function ft(e) {
  const t = e.regex, r = kr(e), n = fe, o = [
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
  ], s = {
    begin: [
      /namespace/,
      /\s+/,
      e.IDENT_RE
    ],
    beginScope: {
      1: "keyword",
      3: "title.class"
    }
  }, i = {
    beginKeywords: "interface",
    end: /\{/,
    excludeEnd: !0,
    keywords: {
      keyword: "interface extends",
      built_in: o
    },
    contains: [r.exports.CLASS_REFERENCE]
  }, a = {
    className: "meta",
    relevance: 10,
    begin: /^\s*['"]use strict['"]/
  }, c = [
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
  ], d = {
    $pattern: fe,
    keyword: lt.concat(c),
    literal: dt,
    built_in: mt.concat(o),
    "variable.language": bt
  }, l = {
    className: "meta",
    begin: "@" + n
  }, b = (y, T, L) => {
    const A = y.contains.findIndex((R) => R.label === T);
    if (A === -1)
      throw new Error("can not find mode to replace");
    y.contains.splice(A, 1, L);
  };
  Object.assign(r.keywords, d), r.exports.PARAMS_CONTAINS.push(l);
  const _ = r.contains.find((y) => y.scope === "attr"), u = Object.assign(
    {},
    _,
    { match: t.concat(n, t.lookahead(/\s*\?:/)) }
  );
  r.exports.PARAMS_CONTAINS.push([
    r.exports.CLASS_REFERENCE,
    // class reference for highlighting the params types
    _,
    // highlight the params key
    u
    // Added for optional property assignment highlighting
  ]), r.contains = r.contains.concat([
    l,
    s,
    i,
    u
    // Added for optional property assignment highlighting
  ]), b(r, "shebang", e.SHEBANG()), b(r, "use_strict", a);
  const S = r.contains.find((y) => y.label === "func.def");
  return S.relevance = 0, Object.assign(r, {
    name: "TypeScript",
    aliases: [
      "ts",
      "tsx",
      "mts",
      "cts"
    ]
  }), r;
}
function ht(e) {
  const t = e.regex, r = t.concat(/[\p{L}_]/u, t.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), n = /[\p{L}0-9._:-]+/u, o = {
    className: "symbol",
    begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
  }, s = {
    begin: /\s/,
    contains: [
      {
        className: "keyword",
        begin: /#?[a-z_][a-z1-9_-]+/,
        illegal: /\n/
      }
    ]
  }, i = e.inherit(s, {
    begin: /\(/,
    end: /\)/
  }), a = e.inherit(e.APOS_STRING_MODE, { className: "string" }), c = e.inherit(e.QUOTE_STRING_MODE, { className: "string" }), d = {
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
                contains: [o]
              },
              {
                begin: /'/,
                end: /'/,
                contains: [o]
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
          s,
          c,
          a,
          i,
          {
            begin: /\[/,
            end: /\]/,
            contains: [
              {
                className: "meta",
                begin: /<![a-z]/,
                end: />/,
                contains: [
                  s,
                  i,
                  c,
                  a
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
      o,
      // xml processing instructions
      {
        className: "meta",
        end: /\?>/,
        variants: [
          {
            begin: /<\?xml/,
            relevance: 10,
            contains: [
              c
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
        contains: [d],
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
        contains: [d],
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
            starts: d
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
function _t(e) {
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
  }, o = {
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
  }, s = {
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
  }, i = {
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
      o
    ]
  }, a = e.inherit(i, { variants: [
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
  ] }), _ = {
    className: "number",
    begin: "\\b" + "[0-9]{4}(-[0-9][0-9]){0,2}" + "([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?" + "(\\.[0-9]*)?" + "([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?" + "\\b"
  }, u = {
    end: ",",
    endsWithParent: !0,
    excludeEnd: !0,
    keywords: t,
    relevance: 0
  }, S = {
    begin: /\{/,
    end: /\}/,
    contains: [u],
    illegal: "\\n",
    relevance: 0
  }, y = {
    begin: "\\[",
    end: "\\]",
    contains: [u],
    illegal: "\\n",
    relevance: 0
  }, T = [
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
    _,
    // numbers are any valid C-style number that
    // sit isolated from other words
    {
      className: "number",
      begin: e.C_NUMBER_RE + "\\b",
      relevance: 0
    },
    S,
    y,
    s,
    i
  ], L = [...T];
  return L.pop(), L.push(a), u.contains = L, {
    name: "YAML",
    case_insensitive: !0,
    aliases: ["yml"],
    contains: T
  };
}
B.registerLanguage("javascript", ot);
B.registerLanguage("js", ot);
B.registerLanguage("typescript", ft);
B.registerLanguage("ts", ft);
B.registerLanguage("xml", ht);
B.registerLanguage("html", ht);
B.registerLanguage("json", br);
B.registerLanguage("bash", tt);
B.registerLanguage("sh", tt);
B.registerLanguage("shell", Nr);
B.registerLanguage("css", cr);
B.registerLanguage("scss", Sr);
B.registerLanguage("markdown", st);
B.registerLanguage("md", st);
B.registerLanguage("java", lr);
B.registerLanguage("yaml", _t);
B.registerLanguage("yml", _t);
B.registerLanguage("sql", Tr);
B.registerLanguage("plaintext", ct);
B.registerLanguage("text", ct);
let we = null, Se = null;
async function xr() {
  return we || (we = import("./mermaid-Cn29Rjho.js").then((e) => e.y).then((e) => (e.default.initialize({ startOnLoad: !1, theme: "default" }), e.default))), we;
}
async function Ar() {
  return Se || (Se = import("./svg-pan-zoom-rM8FtPcq.js").then((e) => e.s).then((e) => {
    const t = e;
    return t.default ?? t;
  })), Se;
}
const H = class H {
  constructor(t = {}) {
    Y(this, "templateUlStart", '<ul style="margin: 0 !important; padding: 0 0 0 16px !important;">');
    Y(this, "mermaidResizeObservers", /* @__PURE__ */ new WeakMap());
    Y(this, "mermaidRenderCache", /* @__PURE__ */ new Map());
    Y(this, "_mermaidRenderPromises", /* @__PURE__ */ new Map());
    Y(this, "anchors");
    this.anchors = t.anchors !== void 0 ? t.anchors : !0;
  }
  updateMessageWithThinking(t, r) {
    const n = this.parseThinkingBlocks(r), o = /* @__PURE__ */ new Map();
    for (const i of Array.from(
      t.querySelectorAll(".mermaid-wrapper[data-diagram-source]")
    )) {
      const a = i.dataset.diagramSource || "";
      o.has(a) || o.set(a, []), o.get(a).push(i), i.remove();
    }
    t.innerHTML = "";
    let s = !0;
    for (const i of n)
      if (s || t.append(document.createElement("br")), s = !1, i.type === "thinking") {
        const a = this.createThinkingBlock(i.content);
        t.append(a);
      } else {
        const a = this.splitMermaidSegments(i.content);
        for (const c of a)
          switch (c.type) {
            case "mermaid": {
              const d = o.get(c.content);
              if (d && d.length > 0)
                t.append(d.shift());
              else {
                const l = document.createElement("div");
                l.className = "mermaid-wrapper", t.append(l);
                const b = this.mermaidRenderCache.get(c.content);
                b ? (l.dataset.diagramSource = c.content, this._buildMermaidUI(l, b)) : (l.innerHTML = `<div class="mermaid" data-diagram="${c.content.replace(/"/g, "&quot;")}"></div>`, this._ensureMermaidRendered(c.content).catch((_) => console.error("Mermaid pre-render failed:", _)));
              }
              break;
            }
            case "svg": {
              this._renderSvgSegment(t, c);
              break;
            }
            case "canvas": {
              this._renderCanvasSegment(t, c);
              break;
            }
            case "code": {
              this._renderCodeSegment(t, c);
              break;
            }
            default: {
              const d = document.createElement("div");
              d.className = "message-text", d.innerHTML = this.parseMarkdown(c.content), t.append(d);
            }
          }
      }
  }
  highlightCodeBlocks(t) {
    for (const r of Array.from(t.querySelectorAll("pre code"))) {
      delete r.dataset.highlighted;
      try {
        B.highlightElement(r);
      } catch (n) {
        console.warn("highlight.js failed for block:", n);
      }
    }
  }
  async renderMermaidDiagrams(t) {
    const r = t.querySelectorAll(".mermaid[data-diagram]");
    if (r.length !== 0)
      for (const n of Array.from(r)) {
        const o = (n.dataset.diagram || "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'), s = n.closest(".mermaid-wrapper") || n.parentElement;
        try {
          const i = await this._ensureMermaidRendered(o);
          s.dataset.diagramSource = o, this._buildMermaidUI(s, i);
        } catch (i) {
          const a = i instanceof Error ? i.message : String(i);
          s.outerHTML = `<div class="mermaid-error">Mermaid error: ${a}</div>`;
        }
      }
  }
  _ensureMermaidRendered(t) {
    const r = this.mermaidRenderCache.get(t);
    if (r) return Promise.resolve(r);
    let n = this._mermaidRenderPromises.get(t);
    return n || (n = (async () => {
      const o = await xr(), s = "mermaid-" + Math.random().toString(36).slice(2, 9), { svg: i } = await o.render(s, t);
      return this.mermaidRenderCache.set(t, i), this._mermaidRenderPromises.delete(t), i;
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
    const o = document.createElement("div");
    o.className = "mermaid-pan-container", o.innerHTML = r, t.innerHTML = "", t.append(n), t.append(o);
    const s = document.createElement("div");
    s.className = "mermaid-resize-handle", t.append(s), t.dataset.originalSvg = r;
    const i = o.querySelector("svg");
    if (i && (i.removeAttribute("width"), i.removeAttribute("height"), i.setAttribute("preserveAspectRatio", "xMidYMid meet"), i.style.width = "100%", i.style.height = "100%", i.style.display = "block", i.style.maxWidth = "none", !i.getAttribute("viewBox"))) {
      const c = i.getBBox?.();
      c && i.setAttribute("viewBox", `0 0 ${c.width} ${c.height}`);
    }
    let a = null;
    if (i)
      try {
        a = (await Ar())(i, {
          zoomEnabled: !0,
          panEnabled: !0,
          controlIconsEnabled: !1,
          fit: !0,
          center: !0,
          minZoom: 0.2,
          maxZoom: 10,
          zoomScaleSensitivity: 0.3
        }), this._setupMermaidAutoFit(t, o, a), this._setupResizeHandle(s, o, a);
      } catch (c) {
        console.warn("svg-pan-zoom failed to initialize:", c);
      }
    n.querySelector(".zoom-in")?.addEventListener("click", () => a?.zoomIn()), n.querySelector(".zoom-out")?.addEventListener("click", () => a?.zoomOut()), n.querySelector(".zoom-reset")?.addEventListener("click", () => {
      a?.resetZoom(), a?.center();
    }), n.querySelector(".download-svg")?.addEventListener("click", () => {
      if (!i) return;
      const c = new XMLSerializer().serializeToString(i), d = new Blob([c], { type: "image/svg+xml;charset=utf-8" }), l = URL.createObjectURL(d), b = document.createElement("a");
      b.href = l, b.download = "diagram.svg", b.click(), URL.revokeObjectURL(l);
    }), n.querySelector(".download-png")?.addEventListener("click", () => {
      i && this._downloadSvgAsPng(i, "diagram.png");
    });
  }
  _downloadSvgAsPng(t, r) {
    const n = t.cloneNode(!0);
    n.setAttribute("xmlns", "http://www.w3.org/2000/svg"), n.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
    const o = n.getAttribute("viewBox");
    let s = 1200, i = 900;
    if (o) {
      const u = o.trim().split(/[\s,]+/);
      u.length === 4 && (s = Math.ceil(+u[2]) * 2 || 1200, i = Math.ceil(+u[3]) * 2 || 900);
    } else {
      const u = t.getBoundingClientRect();
      u.width > 0 && (s = u.width * 2, i = u.height * 2);
    }
    n.setAttribute("width", String(s)), n.setAttribute("height", String(i));
    const a = Array.from(t.querySelectorAll("style")).map((u) => u.textContent).join(`
`).replace(/@import[^;]+;/g, "").replace(/url\(['"]?https?:[^)]+['"]?\)/g, "none");
    if (a) {
      const u = document.createElementNS("http://www.w3.org/2000/svg", "style");
      u.textContent = a + `
* { font-family: Arial, sans-serif !important; }`;
      for (const S of Array.from(n.querySelectorAll("style"))) S.remove();
      n.insertBefore(u, n.firstChild);
    }
    const c = new XMLSerializer().serializeToString(n), d = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(c))), l = document.createElement("canvas");
    l.width = s, l.height = i;
    const b = l.getContext("2d");
    if (!b) return;
    b.fillStyle = "#ffffff", b.fillRect(0, 0, s, i);
    const _ = new Image();
    _.onload = () => {
      b.drawImage(_, 0, 0, s, i);
      try {
        const u = document.createElement("a");
        u.href = l.toDataURL("image/png"), u.download = r, document.body.append(u), u.click(), u.remove();
      } catch (u) {
        console.error("PNG export failed:", u);
      }
    }, _.onerror = () => console.error("Failed to rasterize SVG for PNG export."), _.src = d;
  }
  _setupMermaidAutoFit(t, r, n) {
    const o = n;
    if (!o || !r) return;
    const s = () => {
      const { width: a, height: c } = r.getBoundingClientRect();
      a <= 0 || c <= 0 || (o.resize(), o.fit(), o.center());
    };
    requestAnimationFrame(() => {
      s(), requestAnimationFrame(s);
    });
    const i = this.mermaidResizeObservers.get(t);
    if (i && i.disconnect(), typeof ResizeObserver < "u") {
      const a = new ResizeObserver(() => s());
      a.observe(r), this.mermaidResizeObservers.set(t, a);
    } else
      window.addEventListener("resize", s, { passive: !0 });
  }
  _setupResizeHandle(t, r, n) {
    const o = n;
    t.addEventListener("mousedown", (s) => {
      s.preventDefault();
      const i = s.clientY, a = r.getBoundingClientRect().height;
      t.classList.add("dragging");
      const c = (l) => {
        const b = Math.max(100, a + (l.clientY - i));
        r.style.height = b + "px", o && (o.resize(), o.fit(), o.center());
      }, d = () => {
        t.classList.remove("dragging"), document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", d);
      };
      document.addEventListener("mousemove", c), document.addEventListener("mouseup", d);
    });
  }
  parseMarkdown(t) {
    if (!t) return "";
    t = t.replace(/\r\n/g, `
`).replace(/\\r\\n/g, `
`).replace(/\\n/g, `
`).replace(/\\t/g, "	"), t = t.replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    const r = [];
    let n = t.replace(/^```([\w-]*)[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm, (d, l, b) => {
      const _ = (l || "").trim().toLowerCase(), u = `@@MDBLOCK${r.length}@@`;
      return _ === "mermaid" ? r.push(this._buildMermaidBlockHtml(b.trim())) : r.push(this._buildCodeBlockHtml(b, _)), `
${u}
`;
    });
    const o = [];
    n = this._extractRawHtml(n, o), n = n.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"), n = n.replace(/[ \t]{2,}\n/g, `<br>
`);
    const s = (d) => d.toLowerCase().replace(/<[^>]*>/g, "").replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, ""), i = {}, a = (d, l) => {
      let b = s(l);
      return i[b] = (i[b] || 0) + 1, i[b] > 1 && (b += "-" + (i[b] - 1)), this.anchors ? `<${d} id="${b}" class="mt-2">${l}<a class="heading-anchor" href="#${b}" aria-label="Link to this heading">#</a></${d}>` : `<${d} id="${b}" class="mt-2">${l}</${d}>`;
    };
    n = n.replace(/^###### (.*$)/gm, (d, l) => a("h6", l)), n = n.replace(/^##### (.*$)/gm, (d, l) => a("h5", l)), n = n.replace(/^#### (.*$)/gm, (d, l) => a("h4", l)), n = n.replace(/^### (.*$)/gm, (d, l) => a("h3", l)), n = n.replace(/^## (.*$)/gm, (d, l) => a("h2", l)), n = n.replace(/^# (.*$)/gm, (d, l) => a("h1", l)), n = this._processBlockLines(n), n = n.replace(/^```[\w-]*[ \t]*$/gm, "");
    const c = [];
    return n = n.replace(/`(.*?)`/g, (d, l) => {
      const b = `@@LINKBLOCK${c.length}@@`;
      return c.push(`<code>${l}</code>`), b;
    }), n = n.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (d, l, b) => {
      const _ = `@@LINKBLOCK${c.length}@@`, u = b.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"'), S = l.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      return c.push(`<img src="${u}" alt="${S}" style="max-width: 100%; height: auto;" />`), _;
    }), n = n.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (d, l, b) => {
      const _ = `@@LINKBLOCK${c.length}@@`, u = b.includes(":") ? "_blank" : "_self";
      return c.push(`<a href="${b}" target="${u}" rel="noopener noreferrer">${l}</a>`), _;
    }), n = n.replace(/(?<!href="|href=')(https?:\/\/[^\s<>"']+)/g, (d) => {
      const l = `@@LINKBLOCK${c.length}@@`, b = d.includes(":") ? "_blank" : "_self";
      return c.push(`<a href="${d}" target="${b}" rel="noopener noreferrer">${d}</a>`), l;
    }), n = n.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), n = n.replace(/__(.*?)__/g, "<strong>$1</strong>"), n = n.replace(/\*(.*?)\*/g, "<em>$1</em>"), n = n.replace(/_(.*?)_/g, "<em>$1</em>"), n = this._finalizeParagraphBlocks(n), n = n.replace(/@@MDBLOCK(\d+)@@/g, (d, l) => r[Number(l)] || ""), n = n.replace(/@@LINKBLOCK(\d+)@@/g, (d, l) => c[Number(l)] || ""), n = n.replace(/@@RAWHTML(\d+)@@/g, (d, l) => this._sanitizeHtml(o[Number(l)] || "")), n;
  }
  _processBlockLines(t) {
    const r = t.split(`
`), n = [];
    let o = !1, s = [], i = !1, a = [], c = !1, d = [];
    const l = {
      NOTE: { icon: "i", class: "alert-note", title: "Note" },
      TIP: { icon: "*", class: "alert-tip", title: "Tip" },
      IMPORTANT: { icon: "!", class: "alert-important", title: "Important" },
      WARNING: { icon: "!", class: "alert-warning", title: "Warning" },
      CAUTION: { icon: "x", class: "alert-caution", title: "Caution" }
    }, b = () => {
      if (c && d.length > 0) {
        const u = d[0].match(/^\[!(\w+)\]\s*(.*)?$/);
        if (u) {
          const S = u[1].toUpperCase(), y = l[S];
          if (y) {
            const T = [];
            u[2] && T.push(u[2]), T.push(...d.slice(1));
            const L = T.join("<br>").trim(), A = `<div class="alert ${y.class}"><div class="alert-header"><span class="alert-icon">${y.icon}</span> ${y.title}</div><div class="alert-content">${L}</div></div>`;
            n.push(A);
          } else
            n.push(`<blockquote>${d.join("<br>")}</blockquote>`);
        } else
          n.push(`<blockquote>${d.join("<br>")}</blockquote>`);
      }
      c = !1, d = [];
    };
    for (const _ of r) {
      const u = _.trim();
      if (/^&gt;\s?/.test(u)) {
        i && (n.push(`${this.templateUlStart}${a.join("")}</ul>`), i = !1, a = []), o && (s.length > 0 && n.push(H.tableStartTag + s.join("") + H.tableEndTag), o = !1, s = []), c = !0, d.push(u.replace(/^&gt;\s?/, ""));
        continue;
      }
      if (c && b(), u.includes("|")) {
        let S = u;
        S.startsWith("|") && (S = S.slice(1)), S.endsWith("|") && (S = S.slice(0, -1));
        const y = S.split("|").map((A) => A.trim()), T = y.length > 0 && y.every((A) => /^-+$/.test(A));
        if (T || o || y.length > 1) {
          if (i && (n.push(`${this.templateUlStart}${a.join("")}</ul>`), i = !1, a = []), o || (o = !0, s = []), !T) {
            const R = s.length === 0 ? "th" : "td", I = `<tr>${y.map((O) => `<${R}>${O.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}</${R}>`).join("")}</tr>`;
            s.push(I);
          }
          continue;
        }
      }
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(u))
        i && (n.push(`${this.templateUlStart}${a.join("")}</ul>`), i = !1, a = []), o && (s.length > 0 && n.push(H.tableStartTag + s.join("") + H.tableEndTag), o = !1, s = []), n.push("<hr>");
      else if (/^[\s]*[-*][\s]+/.test(u) || /^[\s]*\d+\.[\s]+/.test(u)) {
        o && (s.length > 0 && n.push(H.tableStartTag + s.join("") + H.tableEndTag), o = !1, s = []);
        const S = u.replace(/^[\s]*[-*\d.]+[\s]+/, "");
        i || (i = !0, a = []), a.push(
          `<li style="margin: 0 !important; padding: 0 !important; line-height: 1.2 !important;">${S}</li>`
        );
      } else /^<h[1-6]>/.test(u) ? (i && (n.push(`${this.templateUlStart}${a.join("")}</ul>`), i = !1, a = []), o && (s.length > 0 && n.push(H.tableStartTag + s.join("") + H.tableEndTag), o = !1, s = []), n.push(u)) : (i && (n.push(`${this.templateUlStart}${a.join("")}</ul>`), i = !1, a = []), o && (s.length > 0 && n.push(H.tableStartTag + s.join("") + H.tableEndTag), o = !1, s = []), n.push(u || ""));
    }
    return b(), i && a.length > 0 && n.push(`${this.templateUlStart}${a.join("")}</ul>`), o && s.length > 0 && n.push(H.tableStartTag + s.join("") + H.tableEndTag), n.join(`
`);
  }
  splitMermaidSegments(t) {
    const r = [], n = /^```([\w-]*)[ \t]*\r?\n([\s\S]*?)^```[ \t]*\r?$/gm;
    let o = 0, s;
    for (; (s = n.exec(t)) !== null; ) {
      const c = (s[1] || "").trim().toLowerCase(), d = s[2];
      if (s.index > o) {
        const l = t.slice(o, s.index);
        l.trim() && r.push({ type: "text", content: l });
      }
      switch (c) {
        case "mermaid":
          r.push({ type: "mermaid", content: d.trim() });
          break;
        case "svg":
          r.push({ type: "svg", content: d.trim() });
          break;
        case "canvas":
          r.push({ type: "canvas", content: d.trim() });
          break;
        default:
          r.push({ type: "code", content: d, language: c });
      }
      o = s.index + s[0].length;
    }
    const i = t.slice(o);
    i.trim() && r.push({ type: "text", content: i });
    const a = [];
    for (const c of r)
      c.type === "text" ? this._splitRawSvgBlocks(c.content, a) : a.push(c);
    return a.length > 0 ? a : [{ type: "text", content: t }];
  }
  _splitRawSvgBlocks(t, r) {
    const n = /<svg\b[\s\S]*?<\/svg>/gi;
    let o = 0, s;
    for (; (s = n.exec(t)) !== null; ) {
      if (s.index > o) {
        const a = t.slice(o, s.index);
        a.trim() && r.push({ type: "text", content: a });
      }
      r.push({ type: "svg", content: s[0] }), o = s.index + s[0].length;
    }
    const i = t.slice(o);
    i.trim() && r.push({ type: "text", content: i });
  }
  _finalizeParagraphBlocks(t) {
    const r = [];
    let n = [];
    const o = () => {
      if (n.length === 0) return;
      const i = n.join(`
`).trim();
      i && r.push(`<p>${i}</p>`), n = [];
    }, s = (i) => /^(@@MDBLOCK\d+@@|@@RAWHTML\d+@@|<(h[1-6]|ul|ol|table|hr|blockquote|div|p|pre)[\s>])/i.test(i);
    for (const i of t.split(`
`)) {
      const a = i.trim();
      if (!a) {
        o();
        continue;
      }
      if (s(a)) {
        o(), r.push(a);
        continue;
      }
      n.push(a);
    }
    return o(), r.join(`
`);
  }
  _extractRawHtml(t, r) {
    t = t.replace(/\r\n/g, `
`).replace(/\r/g, `
`);
    const n = "address|article|aside|details|dialog|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|header|hgroup|hr|main|nav|ol|pre|section|summary|table|tbody|td|tfoot|th|thead|tr|ul", o = new RegExp(String.raw`^([ \t]*)<(${n})(\s[^>]*)?>([\s\S]*?)<\/\2>[ \t]*$`, "gmi");
    t = t.replace(o, (d) => {
      const l = `@@RAWHTML${r.length}@@`;
      return r.push(d.trim()), `
${l}
`;
    });
    const s = new RegExp(String.raw`^[ \t]*<(${n})(\s[^>]*)?\/?>[ \t]*$`, "gmi");
    t = t.replace(s, (d) => {
      const l = `@@RAWHTML${r.length}@@`;
      return r.push(d.trim()), `
${l}
`;
    });
    const i = "span|mark|kbd|sup|sub|abbr|ins|del|small|cite|dfn|time|var|samp|q|ruby|rt|rp|bdo|bdi|data|output|meter|progress", a = new RegExp(String.raw`<(${i})(\s[^>]*)?>([\s\S]*?)<\/\1>`, "gi");
    t = t.replace(a, (d) => {
      const l = `@@RAWHTML${r.length}@@`;
      return r.push(d), l;
    });
    const c = /<(br|wbr|img|input)(\s[^>]*)?\/?>/gi;
    return t = t.replace(c, (d) => {
      const l = `@@RAWHTML${r.length}@@`;
      return r.push(d), l;
    }), t = t.replace(/<!--[\s\S]*?-->/g, (d) => {
      const l = `@@RAWHTML${r.length}@@`;
      return r.push(d), l;
    }), t;
  }
  _sanitizeHtml(t) {
    return Ot.sanitize(t, {
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
      const o = t.indexOf("<thinking>", n);
      if (o === -1) {
        const i = t.substring(n).trim();
        i && r.push({ type: "text", content: i });
        break;
      }
      if (o > n) {
        const i = t.substring(n, o).trim();
        i && r.push({ type: "text", content: i });
      }
      const s = t.indexOf("</thinking>", o);
      if (s === -1) {
        const i = t.substring(o + 10);
        i.trim() && r.push({ type: "thinking", content: i, incomplete: !0 });
        break;
      } else {
        const i = t.substring(o + 10, s);
        r.push({ type: "thinking", content: i, incomplete: !1 }), n = s + 11;
      }
    }
    return r;
  }
  createThinkingBlock(t, r = !1) {
    const n = document.createElement("div");
    n.className = "thinking-block";
    const o = document.createElement("div");
    o.className = "thinking-header", o.innerHTML = `<span>Thinking${r ? "..." : ""}</span><span class="thinking-toggle">v</span>`;
    const s = document.createElement("div");
    return s.className = "thinking-content collapsed", s.textContent = t, o.addEventListener("click", () => {
      const i = o.querySelector(".thinking-toggle");
      s.classList.contains("expanded") ? (s.classList.remove("expanded"), s.classList.add("collapsed"), i?.classList.remove("expanded")) : (s.classList.remove("collapsed"), s.classList.add("expanded"), i?.classList.add("expanded"));
    }), n.append(o), n.append(s), n;
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
    const n = (r || "").trim(), o = this._escapeHtml(t);
    return `<div class="code-block-wrapper"><div class="code-block-header"><span>${n || "code"}</span><button class="copy-btn" data-role="copy">Copy</button></div><pre><code class="language-${n}">${o}</code></pre></div>`;
  }
  _renderSvgSegment(t, r) {
    const n = document.createElement("div");
    n.className = "svg-wrapper";
    const o = document.createElement("div");
    o.className = "svg-render-container", o.innerHTML = r.content, n.append(o), n.dataset.originalSvg = r.content;
    const s = o.querySelector("svg");
    if (s) {
      if (!s.getAttribute("viewBox")) {
        const i = s.getAttribute("width"), a = s.getAttribute("height");
        i && a && s.setAttribute("viewBox", `0 0 ${Number.parseFloat(i)} ${Number.parseFloat(a)}`);
      }
      s.removeAttribute("width"), s.removeAttribute("height"), s.style.width = "100%", s.style.height = "auto", s.style.maxHeight = "500px";
    }
    t.append(n);
  }
  _renderCanvasSegment(t, r) {
    const n = document.createElement("div");
    n.className = "canvas-wrapper";
    const o = document.createElement("div");
    o.className = "canvas-render-container", n.append(o);
    const s = document.createElement("canvas");
    s.className = "pixel-art-canvas", o.append(s);
    try {
      const i = s.getContext("2d"), a = r.content;
      new Function("canvas", "ctx", a)(s, i);
    } catch (i) {
      const a = i instanceof Error ? i.message : String(i);
      o.innerHTML = `<div class="mermaid-error">Canvas error: ${a}</div>`, console.error("Canvas rendering error:", i);
    }
    t.append(n);
  }
  _renderCodeSegment(t, r) {
    const n = document.createElement("div");
    n.className = "code-block-wrapper";
    const o = r.language || "";
    n.innerHTML = this._buildCodeBlockHtml(r.content, o).replace(/^\s*<div class="code-block-wrapper">/, "").replace(/<\/div>\s*$/, ""), t.append(n);
    const s = n.querySelector('button[data-role="copy"]'), i = n.querySelector("pre code");
    if (s && i && s.addEventListener("click", () => {
      navigator.clipboard.writeText(i.textContent || "").then(() => {
        const a = s.textContent;
        s.textContent = "Copied", setTimeout(() => s.textContent = a, 1500);
      });
    }), i) {
      delete i.dataset.highlighted;
      try {
        B.highlightElement(i);
      } catch (a) {
        console.warn("highlight.js failed:", a);
      }
    }
  }
  postProcessMarkdownElement(t) {
    const r = t.querySelectorAll("table");
    for (const n of Array.from(r)) {
      let o = n.parentElement;
      (!o || !o.classList.contains("markdown-table-wrapper")) && (o = document.createElement("div"), o.className = "markdown-table-wrapper", o.style.position = "relative", o.style.margin = "1rem 0", n.parentNode?.insertBefore(o, n), o.append(n)), n.classList.add("markdown-table");
    }
  }
  generateTocElement(t, r = !1) {
    if (!t) return;
    const n = t.querySelectorAll("h1, h2, h3");
    if (n.length < 2) return;
    const o = [];
    let s = 0;
    for (const l of Array.from(n)) {
      const b = Number.parseInt(l.tagName.charAt(1), 10), _ = `doc-h-${s++}`, u = (l.textContent || "").trim();
      l.id = _, o.push({ level: b, text: u, id: _ });
    }
    const i = o.map((l) => {
      const b = l.level === 1 ? "toc-l1" : l.level === 2 ? "toc-l2" : "toc-l3", _ = l.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      return `<li class="${b}"><a href="#${l.id}">${_}</a></li>`;
    }).join(""), a = document.createElement("nav");
    a.className = "doc-toc" + (r ? " doc-toc-collapsed" : "");
    const c = document.createElement("span");
    c.className = "doc-toc-title", c.textContent = "Contents", c.addEventListener("click", () => {
      a.classList.toggle("doc-toc-collapsed");
    });
    const d = document.createElement("ul");
    d.innerHTML = i, a.append(c), a.append(d), t.insertBefore(a, t.firstChild);
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
    const n = Math.min(6, Math.max(1, r.headingLevel ?? 2)), o = r.fromHeadingIndex ?? 0;
    if (!o || o < 1) return;
    const s = r.showMoreLabel || "Show more", i = r.showLessLabel || "Show less";
    if (t.querySelector(".nx3-collapse-wrapper")) return;
    const a = `H${n}`, c = [];
    for (const k of Array.from(t.querySelectorAll(a)))
      k.closest(".doc-toc") || c.push(k);
    if (c.length < o) return;
    const d = c[o - 1], l = d.parentElement;
    if (!l) return;
    let b = d;
    for (; b.parentElement && b.parentElement !== l; )
      b = b.parentElement;
    const _ = [];
    let u = b;
    for (; u; ) {
      const k = u.nextSibling;
      _.push(u), u = k;
    }
    const S = [];
    if (l !== t) {
      let k = l.nextElementSibling;
      for (; k; )
        k instanceof HTMLElement && S.push(k), k = k.nextElementSibling;
    }
    if (_.length === 0 && S.length === 0) return;
    const y = document.createElement("div");
    y.className = "nx3-collapse-wrapper nx3-collapse-collapsed";
    const T = document.createElement("div");
    T.className = "nx3-collapse-content";
    let L = 1;
    const A = (k) => {
      for (const D of k)
        if (D instanceof HTMLElement)
          for (const G of Array.from(D.querySelectorAll(a)))
            G !== d && L++;
    };
    A(_), A(S);
    const R = document.createElement("button");
    R.type = "button", R.className = "nx3-collapse-toggle", R.setAttribute("aria-expanded", "false");
    const I = document.createElement("span");
    I.className = "nx3-collapse-toggle-label";
    const O = document.createElement("span");
    if (O.className = "nx3-collapse-toggle-text", O.textContent = s, I.append(O), L > 1) {
      const k = document.createElement("span");
      k.className = "nx3-collapse-toggle-hint", k.textContent = `+${L - 1}`, I.append(k);
    }
    const C = document.createElement("span");
    C.className = "nx3-collapse-toggle-chevron", C.setAttribute("aria-hidden", "true"), I.append(C), R.append(I), l.insertBefore(y, b);
    for (const k of _)
      T.append(k);
    for (const k of S)
      T.append(k);
    y.append(R), y.append(T), R.addEventListener("click", () => {
      const D = !y.classList.toggle("nx3-collapse-collapsed");
      R.setAttribute("aria-expanded", String(D)), O.textContent = D ? i : s;
    });
  }
};
Y(H, "tableStartTag", '<table class="table">'), Y(H, "tableEndTag", "</table>");
let Ge = H;
const Rr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  InfoModule: Kt,
  createInfoServices: Mt
}, Symbol.toStringTag, { value: "Module" })), Lr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PacketModule: Zt,
  createPacketServices: Rt
}, Symbol.toStringTag, { value: "Module" })), Cr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  PieModule: qt,
  createPieServices: Lt
}, Symbol.toStringTag, { value: "Module" })), Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TreeViewModule: Wt,
  createTreeViewServices: Ct
}, Symbol.toStringTag, { value: "Module" })), Dr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArchitectureModule: Yt,
  createArchitectureServices: It
}, Symbol.toStringTag, { value: "Module" })), Br = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  GitGraphModule: Xt,
  createGitGraphServices: Dt
}, Symbol.toStringTag, { value: "Module" })), $r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  EventModelingModule: Vt,
  createEventModelingServices: Bt
}, Symbol.toStringTag, { value: "Module" })), zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RadarModule: Qt,
  createRadarServices: $t
}, Symbol.toStringTag, { value: "Module" })), Pr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadModule: Jt,
  createRailroadServices: zt
}, Symbol.toStringTag, { value: "Module" })), Ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadEbnfModule: en,
  createRailroadEbnfServices: Pt
}, Symbol.toStringTag, { value: "Module" })), Hr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadAbnfModule: tn,
  createRailroadAbnfServices: Ut
}, Symbol.toStringTag, { value: "Module" })), Gr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  RailroadPegModule: nn,
  createRailroadPegServices: Ht
}, Symbol.toStringTag, { value: "Module" })), Fr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TreemapModule: rn,
  createTreemapServices: Gt
}, Symbol.toStringTag, { value: "Module" })), jr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  WardleyModule: an,
  createWardleyServices: Ft
}, Symbol.toStringTag, { value: "Module" })), Kr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CynefinModule: on,
  createCynefinServices: jt
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ge as M,
  Cr as a,
  Dr as b,
  Pr as c,
  Ur as d,
  $r as e,
  Hr as f,
  Br as g,
  Gr as h,
  Rr as i,
  Fr as j,
  Kr as k,
  Lr as p,
  zr as r,
  Ir as t,
  jr as w
};
//# sourceMappingURL=cynefin-VYW2F7L2-kBmvLOUj.js.map
