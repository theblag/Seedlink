from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from datetime import datetime
import os, uuid, base64
import aiofiles

from .models import Product, CatalogueRequest, CatalogueResponse
from utils.pdf_utils import generate_pdf
from utils.firebase_utils import save_image_base64, get_image_base64, delete_image_base64
from config import BASE_DIR

router = APIRouter()

@router.post("/upload_image/")
async def upload_image_base64(image_base64: str):
    """
    Upload image as Base64 string to Firestore
    """
    try:
        image_id = await save_image_base64(image_base64)
        return JSONResponse({
            "success": True,
            "image_id": image_id,
            "message": "Image uploaded successfully"
        })
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image upload failed: {str(e)}")

@router.post("/generate_catalogue/", response_model=CatalogueResponse)
async def generate_catalogue(request: CatalogueRequest):
    """
    Generate PDF catalogue from products with Base64 images
    """
    try:
        # Replace image URLs with Base64 strings if image_id is provided
        products_with_base64 = []
        for p in request.products:
            product_dict = p.dict()
            if getattr(p, "image_base64", None):
                product_dict["image_base64"] = p.image_base64
            products_with_base64.append(product_dict)

        pdf_path = generate_pdf(
            shop_name=request.shop_name,
            location=request.location,
            products=products_with_base64,
            primary_color=request.primary_color,
            secondary_color=request.secondary_color,
            text_color=request.text_color,
            background_color=request.background_color,
            font_family=request.font_family,
            layout=request.layout
        )

        # Make sure it's saved inside /static
        static_dir = os.path.join(BASE_DIR, "static")
        os.makedirs(static_dir, exist_ok=True)

        # If generate_pdf already saved inside static, just take its basename
        pdf_filename = os.path.basename(pdf_path)
        final_path = os.path.join(static_dir, pdf_filename)

        # If the file is not already in /static, move it there
        if os.path.dirname(pdf_path) != static_dir:
            os.rename(pdf_path, final_path)

        pdf_url = f"/static/{pdf_filename}"


        return CatalogueResponse(
            pdf_url=pdf_url,
            catalogue_id=f"cat_{uuid.uuid4().hex}",
            generated_at=datetime.now()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate catalogue: {str(e)}")

@router.get("/download/{pdf_filename}")
async def download_pdf(pdf_filename: str):
    """
    Serve generated PDF
    """
    static_dir = os.path.join(BASE_DIR, "static")
    pdf_path = os.path.join(static_dir, pdf_filename)
    if not os.path.exists(pdf_path):
        raise HTTPException(status_code=404, detail="PDF not found")
    return FileResponse(pdf_path, media_type="application/pdf", filename=pdf_filename)

@router.delete("/delete_image/")
async def delete_image(image_id: str):
    """
    Delete Base64 image by ID
    """
    try:
        await delete_image_base64(image_id)
        return {"success": True, "message": "Image deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Image deletion failed: {str(e)}")
