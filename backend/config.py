import os

# Base directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Template directory
TEMPLATE_DIR = os.path.join(BASE_DIR, "catalogue", "templates")

# Ensure template directory exists
os.makedirs(TEMPLATE_DIR, exist_ok=True)

# Firebase config (for Firestore / Realtime DB if needed)
FIREBASE_CONFIG = {
    "apiKey": os.getenv("FIREBASE_API_KEY", "your-api-key"),
    "authDomain": os.getenv("FIREBASE_AUTH_DOMAIN", "your-project.firebaseapp.com"),
    "projectId": os.getenv("FIREBASE_PROJECT_ID", "your-project-id"),
    "messagingSenderId": os.getenv("FIREBASE_SENDER_ID", "123456789"),
    "appId": os.getenv("FIREBASE_APP_ID", "your-app-id")
}
