# Definitions Contract

This document defines the Definitions Contract for technical specifications; known herein as _the contract_.

The contract standardizes the concept of "definitions" provided by certain elements (i.e., `<dfn>` or `h1`-`h6` elements) and the corresponding attributes and values that provide necessary metadata about them.

Specifications that conform to the contract can unambiguously cross-reference each other's definitions. This is done with the aid of a reference database, which can be built by processing definitions that conform to this document.

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

- [Bikeshed](http://github.com/tabatkins/bikeshed)
- [ReSpec](http://github.com/w3c/respec)
- [Wattsi](https://github.com/whatwg/wattsi)

Note: An accompanying test suite helps assure authoring tools conform to the contract.

## Who consumes these definitions

Aside from specifications internally cross-referencing their own terms and terms in other specifications, "crawlers" extract terms defined in specifications into structured data.

Examples of definition crawlers include:

- [Shepherd](https://dev.csswg.org/projects/shepherd)
- [Reffy](https://github.com/w3c/reffy)

Crawlers structure and categorize extracted terms into files or databases, allowing for the creation of search tools such as:

- <https://respec.org/xref>
- Bikeshed's cross-reference search (the `bikeshed refs` command)

## How to get your spec indexed

To have your specification indexed by a crawler, it needs to be registered with:

- [browser specs](https://github.com/w3c/browser-specs/) - See [criteria for inclusion](https://github.com/w3c/browser-specs/blob/master/README.md#spec-selection-criteria).
- [Shepherd](https://dev.csswg.org/projects/shepherd) - [Contact maintainer(s) directly](https://dev.csswg.org/users/3).

## The Contract

The following sections define the elements, attributes, and attribute values (along with any specific micro-syntax) that constitute the contract.

### Definitions

A <dfn>definition</dfn> is:

- a `<dfn>` element.
- a `h1`-`h6` element.

No other HTML elements are recognized as defining a term.

Additionally, a definition must have an `id` attribute unique to the document.

#### dfn

Optionally, the following attributes can be present on a `dfn`-based definitions:

- `data-dfn-type`, containing one of the recognized type values (see below).
- `data-export` or `data-noexport`, indicating whether the definition is intended to be public or document-private (see below)
- `data-dfn-for`, namespacing the value relative to some other construct (see below)

### Heading-based definitions

Heading-based definitions are those defined using `h1`-`h6` elements.

...to be written...

### Exporting definitions (`data-export`)

Exported definitions MUST include a `data-export` attribute. The attribute's value can be missing or the empty string.

When the `data-export` attribute is present, it means that the definition can be publicly referenced by other documents.

Authors SHOULD only export definitions they intend others to use.

## Explicitly private definitions: (`data-noexport`)

A `data-noexport` attribute means a definition is intended for private use by a specification.

**Note:** It is considered bad practice to link to definitions marked as `data-noexport` from another specification.

### Namespacing (`data-dfn-for`)

Definitions can be "for" something.

TODO: The "null" namespace ([= / something =]).

### Types of definitions (`data-dfn-type`)

Every exported definition has a "type", which is identified by the presence of a `data-dfn-type`.

When the `data-dfn-type` is missing, it is assumed to be the "dfn" type.

#### WebIDL

When exporting WebIDL definitions, the `data-dfn-type` can be one of the following, each corresponding to a concept in WebIDL:

- argument (of a method)
- attribute
- callback
- const
- constructor
- dict-member
- dictionary
- enum
- enum-value
- exception (SHOULD only be used to define terms in the WebIDL specification)
- extended-attribute
- interface
- iterator
- maplike
- method
- namespace
- serializer
- setlike
- stringifier
- typedef

#### Events

...to be written...

#### CSS

- property
- descriptor (the things inside at-rules like @font-face)
- value (any value that goes inside of a property, at-rule, etc.)
- type (an abstract type for CSS grammars, like `<length>` or `<image>`)
- at-rule
- function (like counter() or linear-gradient())
- selector

#### Markup Elements

- element
- element-state (a spec concept, like `<input>` being in the "password state")
- element-attr
- attr-value

#### URL Schemes

...to be written...

#### HTTP Headers

- http-header

#### Grammars

...to be written...
