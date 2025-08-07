// Script to seed the Firestore database with initial promotions data
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

// Import centralized Firebase configuration
const { firebaseConfig } = require('../lib/firebaseConfig.ts');

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample promotions data
const promotionsData = [
  {
    title: "5% Cashback Rewards",
    description: "Earn 5% cashback on all international transfers above $500. Limited time offer.",
    image: "https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    title: "Instant Transfers",
    description: "Experience lightning-fast transfers that complete in under 60 seconds worldwide.",
    image: "https://images.pexels.com/photos/3943729/pexels-photo-3943729.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    title: "Refer & Earn $25",
    description: "Invite friends to join Dazzle Xchange and earn $25 for each successful referral.",
    image: "https://images.pexels.com/photos/3943735/pexels-photo-3943735.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    title: "Special Offer",
    description: "Enjoy exclusive deals and discounts available for a limited time only. Don't miss out!",
    image: "https://images.pexels.com/photos/164527/pexels-photo-164527.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  },
  {
    title: "Fast Customer Support",
    description: "Get 24/7 assistance from our expert team for all your transaction needs.",
    image: "https://images.pexels.com/photos/210600/pexels-photo-210600.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
  }
];

// Add promotions to Firestore
async function seedPromotions() {
  try {
    console.log('Starting to seed promotions...');
    
    for (const promo of promotionsData) {
      const docRef = await addDoc(collection(db, 'promotions'), promo);
      console.log(`Promotion added with ID: ${docRef.id}`);
    }
    
    console.log('Successfully seeded all promotions!');
  } catch (error) {
    console.error('Error seeding promotions:', error);
  }
}

// Run the seed function
seedPromotions();
