import mongoose from 'mongoose';
import { env } from './env.js';

interface DatabaseStatus {
  connected: boolean;
  state: 'disconnected' | 'connected' | 'connecting' | 'disconnecting' | 'unconfigured' | 'error';
  message?: string;
  lastError?: string;
}

const stateMap: Record<number, DatabaseStatus['state']> = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting',
};

let lastErrorState: string | undefined;

export async function connectDatabase(): Promise<void> {
  const uri = env.MONGODB_URI;

  if (!uri || uri.trim() === '' || uri.includes('<username>')) {
    console.warn('⚠️ MONGODB_URI is not configured or contains placeholder values. Running in unconfigured database mode.');
    return;
  }

  // Register connection lifecycle listeners once
  mongoose.connection.on('connected', () => {
    lastErrorState = undefined;
    console.log('✅ MongoDB Atlas connected successfully.');
  });

  mongoose.connection.on('error', (err) => {
    const msg = err instanceof Error ? err.message : String(err);
    lastErrorState = msg;
    // Log as a standard handled diagnostic instead of unhandled crash
    console.warn(`⚠️ MongoDB connection status notice: ${msg}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected.');
  });

  try {
    // Configure standard Mongoose options with timeouts suitable for Cloud Run & Atlas
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
      socketTimeoutMS: 30000,
      autoIndex: false,
    });
  } catch (error) {
    const errMessage = error instanceof Error ? error.message : String(error);
    lastErrorState = errMessage;
    console.warn('⚠️ MongoDB could not connect at startup. App remains fully functional in offline/degraded mode.');
    console.warn(`   Reason: ${errMessage}`);
    
    // Clean up partial connection state to prevent continuous driver reconnect/SSL retry storms
    try {
      await mongoose.disconnect();
    } catch {
      // ignore cleanup errors
    }
  }
}

export function getDatabaseStatus(): DatabaseStatus {
  const uri = env.MONGODB_URI;

  if (!uri || uri.trim() === '' || uri.includes('<username>')) {
    return {
      connected: false,
      state: 'unconfigured',
      message: 'MONGODB_URI environment variable is not configured',
    };
  }

  const rawState = mongoose.connection.readyState;
  const state = rawState === 1 ? 'connected' : (lastErrorState ? 'error' : (stateMap[rawState] || 'disconnected'));
  const connected = rawState === 1;

  let message = 'Connected to MongoDB Atlas';
  if (!connected) {
    if (lastErrorState) {
      message = lastErrorState.includes('whitelist') || lastErrorState.includes('SSL')
        ? `Connection failed: Check Atlas IP whitelist (0.0.0.0/0) and credentials`
        : `Database unavailable: ${lastErrorState}`;
    } else {
      message = `Database state: ${state}`;
    }
  }

  return {
    connected,
    state,
    message,
    lastError: lastErrorState,
  };
}

export async function disconnectDatabase(): Promise<void> {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
  } catch (err) {
    console.warn('Error during database disconnect:', err);
  }
}
