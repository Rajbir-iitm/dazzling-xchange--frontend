# Firebase Integration

This directory contains the Firebase configuration and utility functions for the web application.

## Setup

The Firebase integration is configured in `firebase.ts` file. It initializes the Firebase app and exports the Firestore database instance.

## Usage

### Storing Form Submissions

The Sales enquiry form in `SalesModal.tsx` stores submissions in the Firestore `enquiries` collection. Each submission contains:

- Full name
- Email address
- Phone number
- Company (optional)
- Message (optional)
- Creation timestamp

### Collections

- `enquiries`: Stores sales contact form submissions
- `chapters`: Stores educational content chapters 
- `promotions`: Stores promotional content

## Security

Make sure to set up Firestore security rules to protect your data.
