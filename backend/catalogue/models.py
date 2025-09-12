from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Product(BaseModel):
    title: str
    description: str
    tags: str
    price: str
    image_base64: str  # Base64 string
    category: Optional[str] = None

class CatalogueRequest(BaseModel):
    shop_name: str
    location: str
    products: List[Product]
    primary_color: str = "#000000"
    secondary_color: str = "#333333"
    text_color: str = "#000000"
    background_color: str = "#ffffff"
    font_family: str = "Arial, sans-serif"
    layout: str = "row"

class CatalogueResponse(BaseModel):
    pdf_url: str
    catalogue_id: str
    generated_at: datetime
