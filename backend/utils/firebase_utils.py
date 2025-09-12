from typing import Dict, Optional
from firebase_config import get_firestore_client

# Example: storing images as Base64 in Firestore
async def save_image_base64(image_base64: str, image_id: Optional[str] = None) -> str:
    """
    Save Base64 image string in Firestore and return a unique ID
    """
    try:
        db = get_firestore_client()
        if not image_id:
            import uuid
            image_id = str(uuid.uuid4())
        doc_ref = db.collection("images").document(image_id)
        doc_ref.set({"image_base64": image_base64})
        return image_id
    except Exception as e:
        print(f"Error saving image: {e}")
        raise

async def get_image_base64(image_id: str) -> str:
    """
    Fetch Base64 image string from Firestore using the ID
    """
    try:
        db = get_firestore_client()
        doc = db.collection("images").document(image_id).get()
        if doc.exists:
            return doc.to_dict()["image_base64"]
        else:
            raise ValueError("Image not found")
    except Exception as e:
        print(f"Error fetching image: {e}")
        raise

async def delete_image_base64(image_id: str):
    """
    Delete image from Firestore
    """
    try:
        db = get_firestore_client()
        db.collection("images").document(image_id).delete()
    except Exception as e:
        print(f"Error deleting image: {e}")
