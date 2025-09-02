import { MarkdocLink } from "@/app/components/MarkdocLink";
import Markdoc, { Tag } from "@markdoc/markdoc";
import React from "react";
import MarkdocHeading from "../components/MarkdocHeading";
import { MarkdocBlockquote } from "../components/MarkdocBlockquote";
import { MarkdocParagraph } from "../components/MarkdocParagraph";
import ResourceReference from "../components/ResourceReference";
import { Config } from "@markdoc/markdoc";
import ContactLinks from "../components/ContactLinks";
import PagesIndex from "../components/PagesIndex";
import Section from "../components/Section";
import MarkdocQuote from "../components/MarkdocQuote";

const linkConfig = {
  render: "Link",
  attributes: {
    href: { type: String, required: true },
    title: { type: String, required: true },
  },
};

export const markdocConfig: Config = {
  tags: {
    heading: {
      render: "Heading",
      attributes: {
        level: { type: Number, required: false },
        id: { type: String, required: false },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        return new Tag("Heading", attributes, children);
      },
    },
    resource: {
      render: "ResourceReference",
      attributes: {
        title: { type: String, required: true },
        url: { type: String, required: false },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);

        return new Tag("ResourceReference", {
          ...attributes,
          description: children,
        });
      },
    },
    "contact-links": {
      render: "ContactLinks",
    },
    "pages-index": {
      render: "PagesIndex",
      attributes: {
        path: { type: String, required: true },
      },
    },
    link: linkConfig,
    section: {
      render: "Section",
    },
    quote: {
      render: "Quote",
      attributes: {
        author: { type: String, required: false },
        url: { type: String, required: false },
        myThoughts: { type: String, required: false },
      },
      transform(node, config) {
        const attributes = node.transformAttributes(config);
        const children = node.transformChildren(config);
        return new Tag("Quote", attributes, children);
      },
    },
  },
  nodes: {
    heading: {
      render: "Heading",
      attributes: {
        level: { type: Number, required: true },
        id: { type: String, required: false },
      },
    },
    link: linkConfig,
    paragraph: {
      render: "Paragraph",
    },
    blockquote: {
      render: "Blockquote",
    },
  },
} as const;

export function renderMarkdocToReact(content: string): React.ReactNode {
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast, markdocConfig);
  return Markdoc.renderers.react(transformed, React, {
    components: {
      Heading: MarkdocHeading,
      ResourceReference: ResourceReference,
      Link: MarkdocLink,
      Paragraph: MarkdocParagraph,
      Blockquote: MarkdocBlockquote,
      ContactLinks: ContactLinks,
      PagesIndex: PagesIndex,
      Section: Section,
      Quote: MarkdocQuote,
    },
  });
}
