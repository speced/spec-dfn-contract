# Specification definitions contract

This document defines the "specification definitions contract", known herein as, "the contract".

The contract standardizes definitions (i.e., `<dfn>` or `h1`-`h6` elements) and corresponding attributes and values are marked-up.

Specifications that conform to the contract are, with the help of reference databases, able to unambiguously cross-reference each other's definitions.

## Some examples

A simple example of a definition:

```HTML
<dfn id="simple-definition" data-export="" data-dfn-type="dfn">
  I'm a simple definition
</dfn>
```

A more complex examples:

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

This document serves as the canonical source for how definitions are marked-up.

Conforming applications to this specification are primarily authoring tools that assist in generating technical specifications. However, this specification is also here to help people who wish to mark up documents manually (or simply want to understand what various attributes mean and what they do!).

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
- Bikeshed's cross-reference search.

## How to get your spec indexed

To have your specification indexed by a crawler, it MUST be registered with:

- [browser specs](https://github.com/w3c/browser-specs/) - See [criteria for inclusion](https://github.com/w3c/browser-specs/blob/master/README.md#spec-selection-criteria).
- [Shepherd](https://dev.csswg.org/projects/shepherd) - [Contact maintainer(s) directly](https://dev.csswg.org/users/3).

## The Contract

The following sections define the elements, attributes, and attribute values (along with any specific micro-syntax) that constitute the contract.

### Definitions

A <dfn>definition</dfn> is:

- a `<dfn>` element.
- a `h1`-`h6` element.

No other HTML elements are recognized as defining a term.

#### dfn

A a `dfn` definition has the following attributes:

- `id` attribute, unique to the document.

Optionally, the following attributes can be present:

- `data-dfn-type`, with one of type values.
- `data-export` or `data-noexport` (they are exclusive).
- `data-dfn-for`

### Exporting definitions (`data-export`)

Exported definitions MUST include a `data-export` attribute. The attribute's value can be missing or the empty string.

When the `data-export` attribute is present, it means that the definition can be publicly referenced by other documents.

Authors SHOULD only export definitions they intend others to use.

## Explicitly private definitions: (`data-noexport`)

A `data-noexport` attribute means a definition is intended for private use by a specification.

Note: it is considered bad practice to link to definitions marked as `data-noexport`.

### Namespacing (`data-dfn-for`)

Definitions can be "for" something.

TODO: The "null" namespace ([= / something =]).

### Types of definitions (`data-dfn-type`)

Every exported definition MUST have a `data-dfn-type`.

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

#### Permissions

#### Task Sources

#### CSS
TBW:
#### Markup Elements

- element
- element-state (a spec concept, like `<input>` being in the "password state")
- element-attr
- attr-value

### URL Schemes

TBW:
### HTTP Headers

- http-header

#### Grammars
TBW: