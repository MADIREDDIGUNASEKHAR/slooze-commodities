# Apollo Client Integration Guide

This document explains how the frontend connects to the NestJS + GraphQL backend using Apollo Client.

## 🔌 Architecture Overview

```
Frontend (Next.js)
    ↓ Apollo Client
    ↓ GraphQL Queries/Mutations
    ↓
Backend (NestJS + GraphQL + Prisma)
    ↓
Database (PostgreSQL/MySQL)
```

## 📦 Apollo Client Setup

### 1. Client Configuration (`lib/apollo-client.tsx`)

The Apollo Client is configured for Next.js App Router with:
- **SSR Support**: Server-side rendering compatibility
- **HTTP Link**: Connects to GraphQL endpoint
- **Auth Headers**: Automatic JWT token injection
- **Cache Management**: Optimized caching strategy

```typescript
const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  headers: {
    authorization: `Bearer ${token}`,
  },
});
```

### 2. Provider Wrapper (`app/layout.tsx`)

The `ApolloWrapper` is added at the root level:

```typescript
<ApolloWrapper>
  <ThemeProvider>
    <AuthProvider>
      {children}
    </AuthProvider>
  </ThemeProvider>
</ApolloWrapper>
```

## 🔐 Authentication Flow

### Login Mutation

**GraphQL Query** (`lib/graphql/auth.ts`):
```graphql
mutation Login($email: String!, $password: String!) {
  login(loginInput: { email: $email, password: $password }) {
    accessToken
    user {
      id
      email
      name
      role
    }
  }
}
```

**Usage** (when connected to backend):
```typescript
const [loginMutation] = useMutation(LOGIN_MUTATION);

const { data } = await loginMutation({
  variables: { email, password }
});

// Store token
localStorage.setItem('slooze_token', data.login.accessToken);
```

### Protected Requests

All subsequent requests automatically include the auth token:

```typescript
headers: {
  authorization: `Bearer ${localStorage.getItem('slooze_token')}`
}
```

## 📦 Product Management

### Get All Products

**GraphQL Query**:
```graphql
query GetProducts($filters: ProductFilterInput) {
  products(filters: $filters) {
    id
    name
    category
    price
    quantity
    unit
    status
    supplier
    lastUpdated
  }
}
```

**Usage**:
```typescript
const { data, loading } = useQuery(GET_PRODUCTS, {
  variables: { filters: { status: 'in-stock' } }
});
```

### Create Product

**GraphQL Mutation**:
```graphql
mutation CreateProduct($input: CreateProductInput!) {
  createProduct(createProductInput: $input) {
    id
    name
    # ... other fields
  }
}
```

**Usage**:
```typescript
const [createProduct] = useMutation(CREATE_PRODUCT, {
  refetchQueries: [{ query: GET_PRODUCTS }]
});

await createProduct({
  variables: {
    input: {
      name: 'New Product',
      category: 'Beverages',
      price: 29.99,
      quantity: 100,
      unit: 'kg',
      supplier: 'Supplier Co.'
    }
  }
});
```

### Update Product

**GraphQL Mutation**:
```graphql
mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
  updateProduct(id: $id, updateProductInput: $input) {
    id
    name
    # ... updated fields
  }
}
```

### Delete Product

**GraphQL Mutation**:
```graphql
mutation DeleteProduct($id: ID!) {
  deleteProduct(id: $id) {
    success
  }
}
```

## 📊 Dashboard Queries

### Product Statistics

**GraphQL Query**:
```graphql
query GetProductStats {
  productStats {
    totalProducts
    inStock
    lowStock
    outOfStock
    totalValue
    totalQuantity
  }
}
```

### Category Statistics

**GraphQL Query**:
```graphql
query GetCategoryStats {
  categoryStats {
    name
    count
    value
  }
}
```

## 🔧 Custom Hooks

### `useProducts()` - Fetch Products

```typescript
const { products, loading, error, refetch } = useProducts({
  status: 'in-stock',
  search: 'coffee'
});
```

### `useProductStats()` - Dashboard Stats

```typescript
const { stats, loading } = useProductStats();
// Returns: totalProducts, inStock, lowStock, outOfStock, etc.
```

### `useCreateProduct()` - Create Product

```typescript
const { createProduct, loading } = useCreateProduct();

await createProduct({
  name: 'Product Name',
  category: 'Category',
  price: 19.99,
  quantity: 50,
  unit: 'kg',
  supplier: 'Supplier'
});
```

### `useUpdateProduct()` - Update Product

```typescript
const { updateProduct, loading } = useUpdateProduct();

await updateProduct('product-id', {
  quantity: 100,
  price: 24.99
});
```

## 🚀 Connecting to NestJS Backend

### Step 1: Setup Environment Variables

Create `.env.local`:
```bash
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

### Step 2: Ensure Backend is Running

```bash
# In your NestJS project
npm run start:dev
```

The backend should be accessible at: `http://localhost:4000/graphql`

### Step 3: Uncomment Apollo Client Code

In the following files, uncomment the Apollo Client imports and usage:

1. **`contexts/AuthContext.tsx`**:
   - Uncomment `useMutation` import
   - Uncomment production login implementation
   - Comment out mock implementation

2. **`lib/hooks/useProducts.ts`**:
   - Uncomment all `useQuery` and `useMutation` imports
   - Uncomment production implementations
   - Comment out mock versions

3. **Start the Frontend**:
```bash
npm run dev
```

## 🗄️ Expected NestJS Backend Schema

Your NestJS backend should implement these resolvers:

### Authentication Resolvers
- `login(loginInput: LoginInput): LoginResponse`
- `me(): User` (get current user)
- `logout(): LogoutResponse`

### Product Resolvers
- `products(filters: ProductFilterInput): [Product!]!`
- `product(id: ID!): Product`
- `createProduct(createProductInput: CreateProductInput!): Product!`
- `updateProduct(id: ID!, updateProductInput: UpdateProductInput!): Product!`
- `deleteProduct(id: ID!): DeleteResponse!`
- `productStats(): ProductStats!`
- `categoryStats(): [CategoryStats!]!`

## 🔄 Cache Management

Apollo Client automatically caches queries:

```typescript
// Optimistic updates
const [updateProduct] = useMutation(UPDATE_PRODUCT, {
  optimisticResponse: {
    updateProduct: {
      __typename: 'Product',
      id: productId,
      ...updatedFields
    }
  }
});

// Refetch after mutations
const [createProduct] = useMutation(CREATE_PRODUCT, {
  refetchQueries: [
    { query: GET_PRODUCTS },
    { query: GET_PRODUCT_STATS }
  ]
});
```

## 🐛 Debugging

### Apollo Client DevTools

Install the [Apollo Client DevTools](https://chrome.google.com/webstore/detail/apollo-client-devtools/jdkknkkbebbapilgoeccciglkfbmbnfm) browser extension to:
- Inspect queries/mutations
- View cache contents
- Monitor network requests
- Debug GraphQL errors

### Error Handling

```typescript
const { data, error } = useQuery(GET_PRODUCTS);

if (error) {
  console.error('GraphQL Error:', error.message);
  // Handle network errors, permission errors, etc.
}
```

## 📝 Current Implementation Status

### ✅ Completed
- Apollo Client setup and configuration
- GraphQL query/mutation definitions
- TypeScript types for schema
- Custom hooks pattern
- Mock data fallback

### 🔄 To Enable Production Mode
1. Set `NEXT_PUBLIC_GRAPHQL_ENDPOINT` in `.env.local`
2. Uncomment Apollo Client code in:
   - `contexts/AuthContext.tsx`
   - `lib/hooks/useProducts.ts`
3. Comment out mock implementations
4. Ensure backend is running
5. Restart dev server

## 🎯 Benefits of This Architecture

1. **Type Safety**: GraphQL + TypeScript provides end-to-end type safety
2. **Caching**: Apollo Client automatically caches and optimizes queries
3. **Real-time**: Easy to add subscriptions for live updates
4. **Developer Experience**: Excellent DevTools and error messages
5. **Scalability**: Ready for production with minimal changes

## 📚 Additional Resources

- [Apollo Client Docs](https://www.apollographql.com/docs/react/)
- [Next.js + Apollo](https://www.apollographql.com/blog/apollo-client/next-js/next-js-getting-started/)
- [GraphQL Best Practices](https://graphql.org/learn/best-practices/)
- [NestJS GraphQL](https://docs.nestjs.com/graphql/quick-start)

---

**Note**: The current implementation uses mock data to allow the frontend to run standalone. Simply uncomment the Apollo Client code and connect to your NestJS backend to enable full functionality!
