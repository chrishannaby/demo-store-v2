const shopifyCdn = 'https://cdn.shopify.com/';

export async function loader({request}) {
  const {pathname, search} = new URL(request.url);
  const proxyPath = pathname.replace('/proxy/', '');
  const proxyUrl = shopifyCdn + proxyPath + search;
  console.log('proxyUrl', proxyUrl);
  const customHeaders = new Headers({
    'X-Shopify-Client-IP': request.headers.get('X-Shopify-Client-IP') || '',
    'X-Shopify-Client-IP-Sig':
      request.headers.get('X-Shopify-Client-IP-Sig') || '',
    'User-Agent': 'Hydrogen',
  });

  const proxyResponse = await fetch(proxyUrl, {
    headers: customHeaders,
  });

  const data = await proxyResponse.text();

  return new Response(data, {
    status: proxyResponse.status,
    headers: new Headers(proxyResponse.headers),
  });
}
