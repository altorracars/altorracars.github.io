#!/usr/bin/env python3
"""
Script para convertir logos PNG a WebP
Optimiza el tamaño de las imágenes manteniendo la calidad
"""

from PIL import Image
import os
import glob

def convert_png_to_webp(input_path, output_path, quality=90):
    """
    Convierte una imagen PNG a WebP

    Args:
        input_path: Ruta del archivo PNG
        output_path: Ruta del archivo WebP de salida
        quality: Calidad de compresión (0-100, default 90)
    """
    try:
        # Abrir imagen PNG
        image = Image.open(input_path)

        # Convertir RGBA a RGB si es necesario (WebP soporta transparencia)
        if image.mode in ('RGBA', 'LA'):
            # Mantener transparencia
            image.save(output_path, 'WEBP', quality=quality, method=6)
        else:
            # Sin transparencia
            image.save(output_path, 'WEBP', quality=quality, method=6)

        # Obtener tamaños para mostrar ahorro
        original_size = os.path.getsize(input_path)
        webp_size = os.path.getsize(output_path)
        savings = ((original_size - webp_size) / original_size) * 100

        print(f"✅ {os.path.basename(input_path)} → {os.path.basename(output_path)}")
        print(f"   Tamaño original: {original_size / 1024:.2f} KB")
        print(f"   Tamaño WebP: {webp_size / 1024:.2f} KB")
        print(f"   Ahorro: {savings:.1f}%\n")

        return True

    except Exception as e:
        print(f"❌ Error al convertir {input_path}: {str(e)}")
        return False

def main():
    """Función principal"""
    # Directorio actual
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # Buscar todos los archivos PNG
    png_files = glob.glob(os.path.join(script_dir, "*.png"))

    if not png_files:
        print("⚠️  No se encontraron archivos PNG en el directorio actual")
        return

    print(f"🔄 Encontrados {len(png_files)} archivos PNG para convertir\n")

    converted = 0
    for png_file in png_files:
        # Generar nombre del archivo WebP
        webp_file = png_file.replace('.png', '.webp')

        # Convertir
        if convert_png_to_webp(png_file, webp_file, quality=90):
            converted += 1

    print(f"\n✨ Proceso completado: {converted}/{len(png_files)} archivos convertidos")

    # Mostrar lista de archivos creados
    print("\n📁 Archivos WebP creados:")
    webp_files = glob.glob(os.path.join(script_dir, "*.webp"))
    for webp_file in sorted(webp_files):
        print(f"   - {os.path.basename(webp_file)}")

if __name__ == "__main__":
    main()
