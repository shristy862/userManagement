import { openDB } from 'idb';

const DB_NAME = 'admin-dashboard-db';
const DB_VERSION = 2; // Increment version to trigger an upgrade
const USER_STORE = 'userStore';
const COMPANY_STORE = 'companyStore'; // New store for company data

// Initialize the IndexedDB
export const initDB = async () => {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      if (oldVersion < 1) {
        db.createObjectStore(USER_STORE, { keyPath: 'id', autoIncrement: true });
      }
      if (oldVersion < 2) {
        // Create a new store for company data with an index on the email field
        const companyStore = db.createObjectStore(COMPANY_STORE, { keyPath: 'companyId' });
        companyStore.createIndex('email', 'email'); // Index for quick lookup by email
      }
    },
  });
  return db;
};
  

// Store user information
export const storeUserInfo = async (userInfo) => {
  const db = await initDB();
  const tx = db.transaction(USER_STORE, 'readwrite');
  const store = tx.objectStore(USER_STORE);
  await store.put({ id: 1, ...userInfo }); // Ensure the email is included here
  await tx.done;
  console.log('User information stored:', userInfo);
};

// Retrieve user information
export const getUserInfo = async () => {
  try {
    const db = await initDB();
    const tx = db.transaction(USER_STORE, 'readonly');
    const store = tx.objectStore(USER_STORE);
    const userInfo = await store.get(1);

    console.log('User Info from IndexedDB:', userInfo); // Extra logging
    return userInfo;
  } catch (error) {
    console.error('Error retrieving user info:', error);
    return null; // Return null or handle the error appropriately
  }
};

// Store company information
export const storeCompanyDetails = async (companyDetails) => {
  try {
    const db = await initDB();
    const tx = db.transaction(COMPANY_STORE, 'readwrite');
    const store = tx.objectStore(COMPANY_STORE);

    // Store company details, including user's email
    await store.put(companyDetails);

    console.log('Company details stored:', companyDetails);
    await tx.done;
    return companyDetails;
  } catch (error) {
    console.error('Error storing company details:', error);
    throw error;
  }
};

// Retrieve company details by user's email
export const getCompanyDetailsByEmail = async (email) => {
  try {
    const db = await initDB();
    const tx = db.transaction(COMPANY_STORE, 'readonly');
    const store = tx.objectStore(COMPANY_STORE);
    const index = store.index('email'); // Use the email index to find company data
    const companyDetails = await index.get(email);

    console.log('Retrieved company details by email:', companyDetails);
    return companyDetails;
  } catch (error) {
    console.error('Error retrieving company details by email:', error);
    return null;
  }
};
