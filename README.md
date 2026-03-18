# Definitions Contract

This document defines the Definitions Contract for technical specifications; known herein as _the contract_.

The contract standardizes the concept of "definitions" provided by certain elements (i.e., `<dfn>` or `h1`-`h6` elements) and the corresponding attributes and values that provide necessary metadata about them.

Specifications that conform to the contract can unambiguously cross-reference each other's definitions. This is done with the aid of a reference database, which can be built by processing definitions that conform to this document.

A **definition** is composed of:
* an ID
* one or more linking texts
* a type
* optionally, one or more namespaces
* optionally, an export specifier

## Some examples

A simple example of a definition:

```HTML
<dfn id="simple-definition" data-export="" data-dfn-type="dfn">
  I'm a simple definition
</dfn>
```

A more complex example:

```HTML
<!-- Example of defining an abstract operation -->
<dfn
  id="string-parser"
  data-export=""
  data-lt="parse a string"
  data-dfn-type="abstract-op">
  string parser
</dfn>

<!-- Example of defining a WebIDL interface -->
<dfn
  data-export=""
  data-dfn-type="interface"
  id="dom-paymentrequest"
  data-dfn-for="">
  <code>PaymentRequest</code>
</dfn>
```

## Conformance

This document serves as the canonical source for how definitions are marked-up (automatically by tools or manually by spec editors).

Conforming applications to this specification are primarily authoring tools that assist in generating/writing technical specifications.
However, this specification is also here to help people who wish to mark up documents manually - or simply want to understand what various attributes mean and what they do!

Example of authoring tools (or "generators") that try to conform to this specification:

- [Bikeshed](http://github.com/speced/bikeshed)
- [ReSpec](http://github.com/w3c/respec)
- [Wattsi](https://github.com/whatwg/wattsi)

> [!NOTE]
> Users of spec-authoring tools like the above might have shorter or implicit ways to indicate some or all of the data required by the dfn contract;
> this document defines requirements on the output HTML *generated* by the tools.

Note: An accompanying test suite helps assure authoring tools conform to the contract.

## Who consumes these definitions

Aside from specifications internally cross-referencing their own terms and terms in other specifications, "crawlers" extract terms defined in specifications into structured data.

Examples of definition crawlers include:

- [Reffy](https://github.com/w3c/reffy)

Crawlers structure and categorize extracted terms into files or databases, allowing for the creation of search tools such as:

- <https://respec.org/xref>
- Bikeshed's cross-reference search (the `bikeshed refs` command)

## How to get your spec indexed

To have your specification indexed by a crawler, it needs to be registered with:

- [browser specs](https://github.com/w3c/browser-specs/) - See [criteria for inclusion](https://github.com/w3c/browser-specs/blob/master/README.md#spec-selection-criteria).

## The Contract

The following sections define the elements, attributes, and attribute values (along with any specific micro-syntax) that constitute the contract.

### Definitions

A <dfn>definition</dfn> is:

- a `<dfn>` element.
- a `h1`-`h6` element.

No other HTML elements are recognized as defining a term.

Additionally, a definition must have an `id` attribute unique to the document.

#### `dfn`-based definitions

The following attributes can be present on a `dfn`-based definitions:

- (optional) `data-dfn-type`, containing one of the recognized type values (see below). If omitted, defaults to "dfn".
- (optional) `data-lt`, containing the official text of the definition (see below). If omitted, defaults to the text content of the element.
- (optional) `data-export` or `data-noexport`, indicating whether the definition is intended to be public or document-private (see below). If omitted, defaults based on the dfn type.
- (optional) `data-dfn-for`, namespacing the value relative to some other construct (see below). If omitted, default to the empty string (indicating no namespace).

#### Heading-based definitions

Heading-based definitions are those defined using `h1`-`h6` elements.

They accept the same set of attributes as `dfn`-based definitions,
except that `data-dfn-type` and `data-lt` are required, rather than optional.
If a heading lacks either of these attributes it *does not* define a definition.

### Linking Text (`data-lt`)

A definition can provide its "linking text" via a `data-lt` attribute.
If specified, it defines a list of `|`-separated values,
all of which are linking texts for the definition.
If omitted, the (single) linking text is the element's text content.

Each linking text is normalized by trimming ASCII whitespace at the start and end,
and collapsing sequences of ASCII whitespace inside of the text to a single ASCII space.

Capitalization is preserved in linking texts, but is not semantically meaningful.

Linking texts *should* be defined in the most "neutral" form possible.
In English, for example, "swipe" is better than "swiping", "swiped", "swipes", etc.

> [!NOTE]
> Spec tools are expected to allow these sorts of conjugations in *links*
> (allowing "swiped" to link to the "swipe" definition)
> and it's easier to do if the definition is in a neutral form.

### Namespacing (`data-dfn-for`)

Definitions can be "for" something,
differentiating them from other definitions of the same type and linking text.
This is indicated via the `data-dfn-for` attribute,
which contains a `,`-separated list of values.

If omitted, the definition is in the null namespace,
same as the empty string.

#### Expected Namespaces

Namespaces are *technically* opaque, meaningless strings.
Some definition types, however, have a convention
of having the namespace refer to another definition;
for example, CSS values are namespaced to a property,
or IDL attributes are namespaced to an interface.

* "attribute", "constructor", "method", "const", "event", "serializer", "stringifier", and "iterator" definitions must define what interface they’re relative to.
* "argument" definitions must define what method or constructor they’re relative to.
* "dict-member" definitions must define what dictionary they’re relative to.
* "enum-value" definitions must define what enum they’re relative to.
* "element-attr" and "element-state" definitions must define what element they’re relative to.
* "attr-value" definitions must define what element and attribute they’re relative to.
* "descriptor" definitions must define what at-rule they’re relative to. (This happens automatically if you add a "For" line to the descdef table.)
* "value" definitions must define what property, descriptor, at-rule, type, selector, or function they’re relative to. If a value definition is relative to a descriptor, the namespace must be of the form "@foo/bar", where "@foo" is the at-rule the "bar" descriptor is relative to.
* "cddl-key", "cddl-value", and "cddl-parameter" definitions must define what CDDL type they’re relative to.

### Types of definitions (`data-dfn-type`)

Every exported definition has a "type", which is identified by the presence of a `data-dfn-type`.
When the `data-dfn-type` is missing, it is assumed to be the "dfn" type.

The valid values for `data-dfn-type` are enumerated below.

#### General Terms

* `dfn` (for defining most general "terms", and a catch-all for anything without a more specific type)
* `abstract-op` (prose algorithm name)

#### WebIDL

When exporting WebIDL definitions, the `data-dfn-type` can be one of the following, each corresponding to a concept in WebIDL:

- `argument` (of a method)
- `attribute` (of an interface)
- `callback` (legacy callback interface)
- `const` (of an interface)
- `constructor` (of an interface)
- `dict-member` (of a dictionary)
- `dictionary`
- `enum`
- `enum-value` (of an enum)
- `exception` (for new DOMException names; new exception classes must use `interface`)
- `extended-attribute` (aka syntaxes like `[Exposed]`)
- `interface`
- `iterator` (of an interface)
- `maplike` (of an interface)
- `method` (of an interface)
- `namespace`
- `serializer` (of an interface)
- `setlike` (of an interface)
- `stringifier` (of an interface)
- `typedef`

#### Events

...to be written...

#### CSS

- `property`
- `descriptor` (the things inside at-rules like @font-face)
- `value` (any value that goes inside of a property, at-rule, etc.)
- `type` (an abstract type for CSS grammars, like `<length>` or `<image>`)
- `at-rule`
- `function` (like `counter()` or `linear-gradient()`)
- `selector`

#### Markup Elements

- `element`
- `element-state` (a spec concept, like `<input>` being in the "password state")
- `element-attr`
- `attr-value`

#### URL Schemes

* `scheme`

#### HTTP Headers

- `http-header`

#### Grammars

* `grammar` (for syntax used in defining grammars, like `||` in the CSS value definition grammar)

#### CDDL Definitions

* `cddl-module` (when spec needs to define multiple CDDL modules)
* `cddl-type` (things like actual types and groups)
* `cddl-key` (member names in type or group definitions)
* `cddl-value` (values in an enumeration)
* `cddl-parameter` (generic parameter names)

#### Browser Permissions

* `permission`

### Exporting definitions (`data-export` and `data-noexport`)

Definitions can define whether they are *expected* to be referenced from other specifications or not
by specifying `data-export` or `data-noexport`.
`data-export` indicates the definition is intended for outside usage;
`data-noexport` indicates that it's intended for private usage,
and probably shouldn't be used by other specifications.

> [!NOTE]
> Spec-authoring tools will generally require additional steps to link a noexport definition,
> to ensure you *really* intend to be doing so despite it being marked as private.

These are boolean attributes. The value *should* be omitted or the empty string.
Authors must not specify both on the same element.
It's not defined what the value of the export flag is if both are specified.