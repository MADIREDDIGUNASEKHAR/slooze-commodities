import { gql } from '@apollo/client';

// Get All Products Query
export const GET_PRODUCTS = gql`
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
`;

// Get Single Product Query
export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
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
`;

// Create Product Mutation
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(createProductInput: $input) {
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
`;

// Update Product Mutation
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, updateProductInput: $input) {
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
`;

// Delete Product Mutation
export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      success
    }
  }
`;

// Get Product Statistics Query (for Dashboard)
export const GET_PRODUCT_STATS = gql`
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
`;

// Get Category Statistics Query (for Dashboard)
export const GET_CATEGORY_STATS = gql`
  query GetCategoryStats {
    categoryStats {
      name
      count
      value
    }
  }
`;
