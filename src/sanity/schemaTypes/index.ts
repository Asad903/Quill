import { author } from "./author";
import { callout } from "./callout";
import { category } from "./category";
import { codeBlock } from "./codeBlock";
import { ctaButton } from "./ctaButton";
import { imageGallery } from "./imageGallery";
import { post } from "./post";
import { pullQuote } from "./pullQuote";
import { statComparison } from "./statComparison";
import { table } from "./table";
import { videoEmbed } from "./videoEmbed";

export const schemaTypes = [
  post,
  author,
  category,
  codeBlock,
  statComparison,
  callout,
  table,
  videoEmbed,
  imageGallery,
  pullQuote,
  ctaButton,
];
