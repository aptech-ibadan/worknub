import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI is not defined in environment variables');
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  console.log('📡 Checking database connection...');
  
  if (cached.conn) {
    console.log('✅ Using existing database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    console.log('🔄 Attempting to connect to MongoDB...');
    console.log(`📊 Connection string: ${MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//***:***@')}`);
    
    cached.promise = mongoose.connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        console.log('✅ MongoDB connected successfully!');
        console.log(`📊 Database: ${mongooseInstance.connection.db.databaseName}`);
        console.log(`📊 Host: ${mongooseInstance.connection.host}`);
        console.log(`📊 Port: ${mongooseInstance.connection.port}`);
        console.log(`📊 Connection state: ${mongooseInstance.connection.readyState}`);
        return mongooseInstance.connection;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:');
        console.error(`   Error name: ${error.name}`);
        console.error(`   Error message: ${error.message}`);
        console.error(`   Error code: ${error.code || 'N/A'}`);
        
        if (error.name === 'MongoServerSelectionError') {
          console.error('   💡 Tip: Check your IP whitelist in MongoDB Atlas');
          console.error('   💡 Tip: Make sure your cluster is running');
        } else if (error.name === 'MongoParseError') {
          console.error('   💡 Tip: Check your connection string format');
        } else if (error.message?.includes('authentication')) {
          console.error('   💡 Tip: Check your username and password');
        } else if (error.message?.includes('ENOTFOUND')) {
          console.error('   💡 Tip: Check your internet connection');
        }
        
        cached.promise = null;
        throw error;
      });
  } else {
    console.log('⏳ Connection already in progress, waiting...');
  }

  try {
    cached.conn = await cached.promise;
    console.log('✅ Database connection established and cached');
    return cached.conn;
  } catch (e) {
    console.error('❌ Failed to establish database connection:', e.message);
    cached.promise = null;
    throw e;
  }
}

// Export connection status function
export async function getConnectionStatus() {
  try {
    if (cached.conn) {
      return {
        connected: true,
        status: 'Connected',
        readyState: cached.conn.readyState,
        dbName: cached.conn.db?.databaseName || 'Unknown',
        host: cached.conn.host || 'Unknown',
      };
    }
    return {
      connected: false,
      status: 'Not connected',
      readyState: 0,
    };
  } catch (error) {
    return {
      connected: false,
      status: 'Error',
      error: error.message,
    };
  }
}

export default dbConnect;