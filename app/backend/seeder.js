const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample Users
const sampleUsers = [
  {
    name: 'Admin User',
    email: 'admin@estore.com',
    password: 'admin123',
    role: 'admin',
    phone: '1234567890',
    address: '123 Admin Street',
    city: 'Admin City',
    state: 'AC',
    zipCode: '12345',
    country: 'USA',
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    phone: '9876543210',
    address: '456 User Avenue',
    city: 'User City',
    state: 'UC',
    zipCode: '54321',
    country: 'USA',
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'user123',
    role: 'user',
    phone: '5555555555',
    address: '789 Customer Lane',
    city: 'Customer Town',
    state: 'CT',
    zipCode: '99999',
    country: 'USA',
  },
];

// Sample Products
const sampleProducts = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Electronics',
    stock: 50,
    image: '/images/placeholder.jpg',
    rating: 4.5,
  },
  {
    name: 'USB-C Charging Cable',
    description: 'Durable USB-C charging cable compatible with multiple devices.',
    price: 12.99,
    originalPrice: 19.99,
    category: 'Electronics',
    stock: 200,
    image: '/images/placeholder.jpg',
    rating: 4.8,
  },
  {
    name: 'Portable Power Bank',
    description: '20000mAh portable power bank with dual USB ports.',
    price: 34.99,
    originalPrice: 49.99,
    category: 'Electronics',
    stock: 75,
    image: '/images/placeholder.jpg',
    rating: 4.6,
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable and breathable 100% cotton t-shirt available in multiple colors.',
    price: 19.99,
    originalPrice: 29.99,
    category: 'Clothing',
    stock: 150,
    image: '/images/placeholder.jpg',
    rating: 4.3,
  },
  {
    name: 'Denim Jeans',
    description: 'Classic denim jeans with perfect fit and premium quality.',
    price: 59.99,
    originalPrice: 89.99,
    category: 'Clothing',
    stock: 100,
    image: '/images/placeholder.jpg',
    rating: 4.7,
  },
  {
    name: 'Winter Jacket',
    description: 'Warm and stylish winter jacket perfect for cold weather.',
    price: 149.99,
    originalPrice: 199.99,
    category: 'Clothing',
    stock: 60,
    image: '/images/placeholder.jpg',
    rating: 4.9,
  },
  {
    name: 'JavaScript: The Definitive Guide',
    description: 'Comprehensive guide to JavaScript programming language and best practices.',
    price: 39.99,
    originalPrice: 59.99,
    category: 'Books',
    stock: 40,
    image: '/images/placeholder.jpg',
    rating: 4.8,
  },
  {
    name: 'Node.js in Action',
    description: 'Learn to build scalable web applications with Node.js.',
    price: 34.99,
    originalPrice: 49.99,
    category: 'Books',
    stock: 35,
    image: '/images/placeholder.jpg',
    rating: 4.6,
  },
  {
    name: 'MongoDB: The Definitive Guide',
    description: 'Master MongoDB database design and implementation.',
    price: 44.99,
    originalPrice: 64.99,
    category: 'Books',
    stock: 30,
    image: '/images/placeholder.jpg',
    rating: 4.7,
  },
  {
    name: 'Bedding Set',
    description: '4-piece luxury bedding set with high thread count sheets.',
    price: 129.99,
    originalPrice: 179.99,
    category: 'Home',
    stock: 55,
    image: '/images/placeholder.jpg',
    rating: 4.5,
  },
  {
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe.',
    price: 79.99,
    originalPrice: 109.99,
    category: 'Home',
    stock: 45,
    image: '/images/placeholder.jpg',
    rating: 4.4,
  },
  {
    name: 'LED Desk Lamp',
    description: 'Adjustable LED desk lamp with three brightness levels.',
    price: 29.99,
    originalPrice: 44.99,
    category: 'Home',
    stock: 80,
    image: '/images/placeholder.jpg',
    rating: 4.6,
  },
  {
    name: 'Running Shoes',
    description: 'Professional running shoes with advanced cushioning technology.',
    price: 99.99,
    originalPrice: 149.99,
    category: 'Sports',
    stock: 70,
    image: '/images/placeholder.jpg',
    rating: 4.7,
  },
  {
    name: 'Yoga Mat',
    description: 'Non-slip yoga mat made from eco-friendly materials.',
    price: 24.99,
    originalPrice: 39.99,
    category: 'Sports',
    stock: 120,
    image: '/images/placeholder.jpg',
    rating: 4.5,
  },
  {
    name: 'Dumbbells Set',
    description: 'Adjustable dumbbells set from 5 to 50 pounds.',
    price: 199.99,
    originalPrice: 299.99,
    category: 'Sports',
    stock: 25,
    image: '/images/placeholder.jpg',
    rating: 4.8,
  },
];

// Seed Database
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    await Cart.deleteMany({});
    await Order.deleteMany({});

    // Seed Users
    console.log('👥 Seeding users...');
    const createdUsers = await User.insertMany(sampleUsers);
    console.log(`✅ ${createdUsers.length} users created`);

    // Seed Products
    console.log('📦 Seeding products...');
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`✅ ${createdProducts.length} products created`);

    // Seed Sample Carts for users
    console.log('🛒 Seeding sample carts...');
    const userCarts = [
      {
        userId: createdUsers[1]._id, // john@example.com
        items: [
          {
            productId: createdProducts[0]._id,
            quantity: 1,
            price: createdProducts[0].price,
          },
          {
            productId: createdProducts[3]._id,
            quantity: 2,
            price: createdProducts[3].price,
          },
        ],
        totalPrice: createdProducts[0].price + createdProducts[3].price * 2,
      },
      {
        userId: createdUsers[2]._id, // jane@example.com
        items: [
          {
            productId: createdProducts[12]._id,
            quantity: 1,
            price: createdProducts[12].price,
          },
        ],
        totalPrice: createdProducts[12].price,
      },
    ];

    const createdCarts = await Cart.insertMany(userCarts);
    console.log(`✅ ${createdCarts.length} carts created`);

    // Seed Sample Orders
    console.log('📋 Seeding sample orders...');
    const sampleOrders = [
      {
        userId: createdUsers[1]._id,
        items: [
          {
            productId: createdProducts[0]._id,
            productName: createdProducts[0].name,
            quantity: 1,
            price: createdProducts[0].price,
          },
        ],
        totalAmount: createdProducts[0].price,
        shippingAddress: {
          fullName: 'John Doe',
          phone: '9876543210',
          address: '456 User Avenue',
          city: 'User City',
          state: 'UC',
          zipCode: '54321',
          country: 'USA',
        },
        paymentMethod: 'card',
        status: 'delivered',
        paymentStatus: 'paid',
      },
      {
        userId: createdUsers[2]._id,
        items: [
          {
            productId: createdProducts[4]._id,
            productName: createdProducts[4].name,
            quantity: 1,
            price: createdProducts[4].price,
          },
          {
            productId: createdProducts[8]._id,
            productName: createdProducts[8].name,
            quantity: 1,
            price: createdProducts[8].price,
          },
        ],
        totalAmount: createdProducts[4].price + createdProducts[8].price,
        shippingAddress: {
          fullName: 'Jane Smith',
          phone: '5555555555',
          address: '789 Customer Lane',
          city: 'Customer Town',
          state: 'CT',
          zipCode: '99999',
          country: 'USA',
        },
        paymentMethod: 'cash_on_delivery',
        status: 'pending',
        paymentStatus: 'unpaid',
      },
    ];

    const createdOrders = await Order.insertMany(sampleOrders);
    console.log(`✅ ${createdOrders.length} orders created`);

    console.log('\n');
    console.log('════════════════════════════════════════');
    console.log('✅ Database seeding completed!');
    console.log('════════════════════════════════════════');
    console.log('\n📊 Summary:');
    console.log(`   • Users: ${createdUsers.length}`);
    console.log(`   • Products: ${createdProducts.length}`);
    console.log(`   • Carts: ${createdCarts.length}`);
    console.log(`   • Orders: ${createdOrders.length}`);
    console.log('\n🔑 Test Credentials:');
    console.log('   Admin:');
    console.log('      Email: admin@estore.com');
    console.log('      Password: admin123');
    console.log('   User 1:');
    console.log('      Email: john@example.com');
    console.log('      Password: user123');
    console.log('   User 2:');
    console.log('      Email: jane@example.com');
    console.log('      Password: user123');
    console.log('\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();
