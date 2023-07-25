import {defer} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {AnalyticsPageType} from '@shopify/hydrogen';

import {ProductSwimlane, FeaturedCollections, Hero} from '~/components';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getHeroPlaceholder} from '~/lib/placeholders';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';

export const headers = routeHeaders;

export async function loader({params, context}) {
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  const {shop, hero} = await context.storefront.query(HOMEPAGE_SEO_QUERY, {
    variables: {handle: 'freestyle'},
  });
  const seo = seoPayload.home();

  return defer({
    shop,
    primaryHero: hero,
    // These different queries are separated to illustrate how 3rd party content
    // fetching can be optimized for both above and below the fold.
    featuredProducts: context.storefront.query(
      HOMEPAGE_FEATURED_PRODUCTS_QUERY,
      {
        variables: {
          /**
           * Country and language properties are automatically injected
           * into all queries. Passing them is unnecessary unless you
           * want to override them from the following default:
           */
          country,
          language,
        },
      },
    ),
    secondaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'backcountry',
        country,
        language,
      },
    }),
    featuredCollections: context.storefront.query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    }),
    tertiaryHero: context.storefront.query(COLLECTION_HERO_QUERY, {
      variables: {
        handle: 'winter-2022',
        country,
        language,
      },
    }),
    analytics: {
      pageType: AnalyticsPageType.home,
    },
    seo,
  });
}

export default function Homepage() {
  const {secondaryHero, tertiaryHero, featuredCollections, featuredProducts} =
    useLoaderData();

  // TODO: skeletons vs placeholders
  const skeletons = getHeroPlaceholder([{}, {}, {}]);

  return (
    <>
      <a href="/collections/freestyle">
        <section className="relative justify-end flex flex-col w-full -mt-nav h-screen">
          <div className="absolute inset-0 grid flex-grow grid-flow-col pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
            <div>
              <img
                alt=""
                decoding="async"
                height="126.2"
                loading="eager"
                sizes="(min-width: 48em) 50vw, 100vw"
                src="/proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=100 height=126 crop=center"
                srcSet="/proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=200 height=252 crop=center 200w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=400 height=505 crop=center 400w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=600 height=757 crop=center 600w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=800 height=1010 crop=center 800w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=1000 height=1262 crop=center 1000w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=1200 height=1514 crop=center 1200w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=1400 height=1767 crop=center 1400w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=1600 height=2019 crop=center 1600w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=1800 height=2272 crop=center 1800w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=2000 height=2524 crop=center 2000w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=2200 height=2776 crop=center 2200w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=2400 height=3029 crop=center 2400w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=2600 height=3281 crop=center 2600w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=2800 height=3534 crop=center 2800w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_1.webp?v=1690314293 width=3000 height=3786 crop=center 3000w"
                width="100"
                className="block object-cover w-full h-full"
                style={{width: '100%', aspectRatio: '1000/1262'}}
              />
            </div>
            <div className="hidden md:block">
              <img
                alt=""
                decoding="async"
                height="126.2"
                loading="eager"
                sizes="50vw"
                src="/proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=100 height=126 crop=center"
                srcSet="/proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=200 height=252 crop=center 200w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=400 height=505 crop=center 400w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=600 height=757 crop=center 600w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=800 height=1010 crop=center 800w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=1000 height=1262 crop=center 1000w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=1200 height=1514 crop=center 1200w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=1400 height=1767 crop=center 1400w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=1600 height=2019 crop=center 1600w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=1800 height=2272 crop=center 1800w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=2000 height=2524 crop=center 2000w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=2200 height=2776 crop=center 2200w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=2400 height=3029 crop=center 2400w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=2600 height=3281 crop=center 2600w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=2800 height=3534 crop=center 2800w, /proxy/s/files/1/0631/4727/8392/files/Hydrogen_Hero_Feature_2.webp?v=1690314303 width=3000 height=3786 crop=center 3000w"
                width="100"
                className="block object-cover w-full h-full"
                style={{width: '100%', aspectRatio: '1000/1262'}}
              />
            </div>
          </div>
          <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 bg-gradient-to-t dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast">
            <h2 className="whitespace-pre-wrap font-bold text-display max-w-md">
              All Mountain All&nbsp;Season
            </h2>
            <p className="max-w-prose-narrow whitespace-pre-wrap inherit text-lead font-medium">
              The All New Hydrogen Snowboard Exclusively From&nbsp;Shopify
            </p>
            <span className="max-w-prose whitespace-pre-wrap inherit text-lead font-medium">
              Shop Now
            </span>
          </div>
        </section>
      </a>

      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {({products}) => {
              if (!products?.nodes) return <></>;
              return (
                <ProductSwimlane
                  products={products}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {secondaryHero && (
        <Suspense fallback={<Hero {...skeletons[1]} />}>
          <Await resolve={secondaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}

      {featuredCollections && (
        <Suspense>
          <Await resolve={featuredCollections}>
            {({collections}) => {
              if (!collections?.nodes) return <></>;
              return (
                <FeaturedCollections
                  collections={collections}
                  title="Collections"
                />
              );
            }}
          </Await>
        </Suspense>
      )}

      {tertiaryHero && (
        <Suspense fallback={<Hero {...skeletons[2]} />}>
          <Await resolve={tertiaryHero}>
            {({hero}) => {
              if (!hero) return <></>;
              return <Hero {...hero} />;
            }}
          </Await>
        </Suspense>
      )}
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
`;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

const COLLECTION_HERO_QUERY = `#graphql
  query heroCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    products(first: 8) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

// @see: https://shopify.dev/api/storefront/2023-04/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
