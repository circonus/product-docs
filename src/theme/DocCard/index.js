/**
 * Swizzled from @docusaurus/theme-classic (v3) DocCard.
 *
 * Circonus customization: a sidebar item may set `customProps.image` to a file
 * in /static/img/library/ to use that image as the card icon.
 */
import React from 'react';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/DocCard/Layout';

function getFallbackEmojiIcon(item) {
  if (item.type === 'category') {
    return '🗃';
  }
  return isInternalUrl(item.href) ? '📄️' : '🔗';
}
function getIconTitleProps(item) {
  const extracted = extractLeadingEmoji(item.label);
  const emoji = extracted.emoji ?? getFallbackEmojiIcon(item);
  return {
    icon: emoji,
    title: extracted.rest.trim(),
  };
}
function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  // Unexpected: categories that don't have a link have been filtered upfront
  if (!href) {
    return null;
  }
  return (
    <Layout
      item={item}
      className={item.className}
      href={href}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      {...getIconTitleProps(item)}
    />
  );
}
function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  const image = item.customProps?.image;
  const imageUrl = useBaseUrl(`/img/library/${image ?? ''}`);
  const iconTitleProps = getIconTitleProps(item);
  if (image) {
    iconTitleProps.icon = <img height={50} src={imageUrl} alt="" />;
  }
  return (
    <Layout
      item={item}
      className={item.className}
      href={item.href}
      description={item.description ?? doc?.description}
      {...iconTitleProps}
    />
  );
}
export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
