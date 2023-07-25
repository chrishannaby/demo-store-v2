const shopifyCdn = 'https://cdn.shopify.com/';

export async function loader({request}) {
  const {pathname, search} = new URL(request.url);
  const proxyPath = pathname.replace('/proxy/', '');
  const proxyUrl = shopifyCdn + proxyPath + search;
  console.log(request.headers);
  const proxyResponse = await fetch(proxyUrl, {
    headers: request.headers,
  });

  const data = await proxyResponse.text();

  return new Response(data, {
    status: proxyResponse.status,
    headers: new Headers(proxyResponse.headers),
  });
}
