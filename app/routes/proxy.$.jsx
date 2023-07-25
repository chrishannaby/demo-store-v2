const shopifyCdn = 'https://cdn.shopify.com/';

export async function loader({request}) {
  const {pathname, search} = new URL(request.url);
  const proxyPath = pathname.replace('/proxy/', '');
  const proxyUrl = shopifyCdn + proxyPath + search;
  const proxyResponse = await fetch(proxyUrl, {
    headers: request.headers,
  });

  return new Response(proxyResponse.body, {
    status: proxyResponse.status,
    headers: new Headers(proxyResponse.headers),
  });
}
