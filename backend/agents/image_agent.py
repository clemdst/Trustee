import torch
import torchvision.transforms as transforms
from torchvision.models import resnet50
import requests
from PIL import Image
from io import BytesIO
from torch.nn.functional import cosine_similarity

# Charger un modèle ResNet50 pré-entraîné (sans la couche de classification)
model = resnet50(pretrained=True)
model.eval()
feature_extractor = torch.nn.Sequential(*list(model.children())[:-1])

# Transformer d’image standard
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406],
                         std=[0.229, 0.224, 0.225])
])

def get_image_embedding(image_path):
    """
    Charge une image depuis une URL ou des données en bytes et retourne son embedding.
    """
    if isinstance(image_path, str):
        # Télécharger l'image depuis l'URL
        response = requests.get(image_path)
        
        # Vérifier que la réponse contient une image valide
        if response.status_code == 200:
            image = Image.open(BytesIO(response.content)).convert("RGB")
        else:
            raise ValueError("Erreur lors du téléchargement de l'image.")
    else:
        image = Image.open(BytesIO(image_path)).convert("RGB")

    tensor = transform(image).unsqueeze(0)  # Ajouter la dimension batch
    with torch.no_grad():
        embedding = feature_extractor(tensor).squeeze()
    return embedding

def compare_images(img, match_urls, threshold = 0.8):
    """
    Compare une image à plusieurs images et retourne les résultats de similarité.
    """
    emb1 = get_image_embedding(img)  # Extraire l'embedding de la première image
    similar = []

    for url in match_urls:
        if not any(url.lower().endswith(ext) for ext in [".jpg", ".jpeg", ".png", ".webp"]):
            print(f"⚠️ Skipping non-image URL: {url}")
            continue

        try:
            # Télécharger l'image correspondante et obtenir son embedding
            match_response = requests.get(url, timeout=5)
            emb2 = get_image_embedding(match_response.content)  # Passer les données binaires directement

            # Calculer la similarité
            similarity = cosine_similarity(emb1.unsqueeze(0), emb2.unsqueeze(0), dim=1).item()

            if similarity >= threshold:
                similar.append({
                    "url": url,
                    "similarity_score": similarity
                })

        except Exception as e:
            print(f"⚠️ Failed to compare {url}: {e}")
            continue

    return {
        "similar_count": len(similar),
        "similar_matches": similar
    }
