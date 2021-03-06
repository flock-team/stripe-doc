以下のコードで商品一覧を表示します。この情報は Run Payments with Stripe 拡張機能 によりCloud Firestoreに同期された Stripe の商品、価格情報に基づいています。

```tsx:components/product-list.tsx
import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';

type Price = {
  id: string;
  description: string;
  unit_amount: number;
};

type Product = {
  id: string;
  active: boolean;
  name: string;
  prices: Price[];
};

type Props = {
  user: User;
};

const ProductList = ({ user }: Props) => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const ref = collection(db, 'products');
    const q = query(ref, where('active', '==', true));
    getDocs(q).then(async (snap) => {
      const promises = snap.docs.map(async (doc) => {
        const product = {
          ...(doc.data() as Product),
          id: doc.id,
        };
        const priceRef = collection(db, doc.ref.path, 'prices');
        const priceSnap = await getDocs(priceRef);
        product.prices = priceSnap.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          } as Price;
        });

        return product as Product;
      });

      setProducts(await Promise.all(promises));
    });
  }, []);

  return (
    <div>
      {products?.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          {product.prices.map((price) => (
            <div key={price.id}>
              {price.description || '通常'} -{' '}
              {price.unit_amount.toLocaleString()}円
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
```

```tsx:pages/index.tsx
// この行を追加
{user && <ProductList user={user}></ProductList>}
```

[Run Payments with Stripe: README](https://github.com/stripe/stripe-firebase-extensions/blob/master/firestore-stripe-payments/POSTINSTALL.md#list-available-products-and-prices)