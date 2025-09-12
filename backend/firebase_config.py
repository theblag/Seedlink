import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

# Initialize Firebase Admin SDK
def initialize_firebase():
    try:
        firebase_cred = os.getenv("FIREBASE_CREDENTIALS")
        if firebase_cred:
            cred_dict = json.loads(firebase_cred)
            cred = credentials.Certificate(cred_dict)
        else:
            # Development: service account JSON
            cred = credentials.Certificate("service-account-key.json")

        firebase_admin.initialize_app(cred)
        print("✅ Firebase initialized successfully")
    except Exception as e:
        print(f"❌ Firebase initialization failed: {e}")

# Initialize on import
initialize_firebase()

# Firestore client (optional)
def get_firestore_client():
    return firestore.client()
