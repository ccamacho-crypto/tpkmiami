import { useEffect, useState } from 'react';

const STORE = 'https://tpkmiami.myshopify.com';
const PRODUCT_FEED = `${STORE}/products.json?limit=12`;

type Product = {
  handle: string;
  title: string;
  image: string | null;
  price: number | null;
  priceVaries: boolean;
  available: boolean;
};
type Catalog = { products: Product[]; currency: string | null };
type ShopState = 'loading' | 'ready' | 'empty' | 'error';

// Treat the public feed as data only. Do not render Shopify's HTML descriptions.
function parseProducts(value: unknown): Product[] {
  if (!value || typeof value !== 'object' || !('products' in value) || !Array.isArray(value.products)) {
    throw new Error('Invalid product feed');
  }
  const handles = new Set<string>();
  return value.products.slice(0, 12).flatMap((product): Product[] => {
    if (!product || typeof product.title !== 'string' || !product.title.trim() ||
        typeof product.handle !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(product.handle) ||
        handles.has(product.handle) || !Array.isArray(product.variants) || !product.variants.length) return [];
    handles.add(product.handle);
    const prices = product.variants
      .map((variant: { price?: unknown }) => typeof variant?.price === 'string' && /^\d+(\.\d+)?$/.test(variant.price) ? Number(variant.price) : NaN)
      .filter((price: number) => Number.isFinite(price) && price >= 0);
    const imageSource = product.images?.[0]?.src;
    let image: string | null = null;
    if (typeof imageSource === 'string') {
      try {
        const url = new URL(imageSource);
        if (url.protocol === 'https:' && url.hostname === 'cdn.shopify.com' && !url.username && !url.password) {
          url.searchParams.set('width', '600');
          image = url.href;
        }
      } catch { /* Missing or unsafe images use a text placeholder. */ }
    }
    return [{
      handle: product.handle,
      title: product.title.trim().slice(0, 200),
      image,
      price: prices.length === product.variants.length ? Math.min(...prices) : null,
      priceVaries: new Set(prices).size > 1,
      available: product.variants.some((variant: { available?: unknown }) => variant?.available === true),
    }];
  });
}

function ProductImage({ product }: { product: Product }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="shop-image">
      {product.image && !failed ? (
        <img src={product.image} alt={product.title} width={600} height={600}
          loading="lazy" onError={() => setFailed(true)} />
      ) : <span className="font-oswald">See product photos on Shopify</span>}
    </div>
  );
}

export default function ShopSection() {
  const [state, setState] = useState<ShopState>('loading');
  const [catalog, setCatalog] = useState<Catalog>({ products: [], currency: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    const timeout = window.setTimeout(() => controller.abort(), 10000);
    setState('loading');
    async function load() {
      try {
        // The public endpoints work cross-origin; no private key or cart mutation is needed.
        const [response, currency] = await Promise.all([
          fetch(PRODUCT_FEED, { signal: controller.signal, credentials: 'omit' }),
          fetch(`${STORE}/meta.json`, { signal: controller.signal, credentials: 'omit' })
            .then(async response => {
              if (!response.ok) return null;
              const data = await response.json();
              if (typeof data.currency !== 'string' || !/^[A-Z]{3}$/.test(data.currency)) return null;
              // Do not guess a currency if Shopify does not supply a valid one.
              new Intl.NumberFormat('en-US', { style: 'currency', currency: data.currency });
              return data.currency as string;
            }).catch(() => null),
        ]);
        if (!response.ok) throw new Error('Store unavailable');
        const products = parseProducts(await response.json());
        if (active) {
          setCatalog({ products, currency });
          setState(products.length ? 'ready' : 'empty');
        }
      } catch {
        if (active) setState('error');
      } finally {
        window.clearTimeout(timeout);
      }
    }
    void load();
    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [attempt]);

  const money = catalog.currency
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: catalog.currency })
    : null;

  return (
    <section id="shop" className="shop-section py-xxl" aria-labelledby="shop-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="shop-intro">
          <div>
            <p className="font-oswald shop-eyebrow">Official TPK Miami merch</p>
            <h2 id="shop-heading" className="font-bangers text-4xl sm:text-5xl shop-heading">Gear Up for Adventure!</h2>
            <p className="font-special-elite shop-description">Bring a little TPK to your next game night.</p>
          </div>
          <a className="shop-button shop-all font-oswald" href={`${STORE}/collections/all`}
            target="_blank" rel="noopener noreferrer">
            Shop all merch <span aria-hidden="true">↗</span><span className="sr-only"> (opens Shopify in a new tab)</span>
          </a>
        </div>

        <p className="font-oswald shop-note">Choose your size, add to cart and check out on our Shopify store. Links open in a new tab.</p>
        <div role="status" aria-live="polite" className="font-oswald shop-status">
          {state === 'loading' && 'Loading the latest merch from Shopify…'}
          {state === 'error' && 'The product preview is unavailable. You can still browse and buy directly on Shopify.'}
          {state === 'empty' && 'No products are currently available in this preview. Visit Shopify for the latest collection.'}
        </div>
        {(state === 'error' || state === 'empty') && (
          <button className="shop-button font-oswald mb-6" onClick={() => setAttempt(value => value + 1)}>Retry product preview</button>
        )}

        {state === 'ready' && (
          <>
            <div className="shop-grid">
              {catalog.products.map(product => (
                <article className="shop-card" key={product.handle}>
                  <a href={`${STORE}/products/${product.handle}`} target="_blank" rel="noopener noreferrer"
                    className="shop-product-link" aria-label={`${product.title} — view on Shopify (opens in a new tab)`}>
                    <ProductImage key={product.image} product={product} />
                    <div className="shop-card-body">
                      <h3 className="font-oswald shop-product-title">{product.title}</h3>
                      <p className="font-oswald shop-price">
                        {money && product.price !== null
                          ? `${product.priceVaries ? 'From ' : ''}${money.format(product.price)} ${catalog.currency}`
                          : 'See price on Shopify'}
                      </p>
                      <span className="shop-product-cta font-oswald">
                        {product.available ? 'Choose options' : 'View availability'} <span aria-hidden="true">↗</span>
                      </span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
            <p className="font-oswald shop-note mt-6">Product preview from Shopify. Final prices, sizes, availability, shipping and taxes are confirmed in the store.</p>
          </>
        )}
      </div>
    </section>
  );
}
