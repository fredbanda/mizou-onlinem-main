type CollectionType = {
    _id: string; // MongoDB ObjectId
    title: string;
    description: string;
    image: string;
    products: ProductType[]; // References to products
  };
  
  type ProductType = {
    _id: string; // MongoDB ObjectId
    title: string;
    description: string;
    media: string[]; // Media URLs
    category: string; // Category name
    collections: [CollectionType]; // Full collection documents
    tags: string[]; // Tags as strings
    sizes: string[]; // Sizes as strings
    colors: string[]; // Colors as strings
    price: number; // Product price
    expense: number; // Expense cost
    createdAt: Date;
    updatedAt: Date;
  };
  