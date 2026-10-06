import cv2
import numpy as np

img = cv2.imread('d:/projects/portfolio/public/logo.png', cv2.IMREAD_UNCHANGED)
alpha = img[:, :, 3]

# Threshold and clean
thresh = (alpha > 80).astype(np.uint8) * 255
blurred = cv2.GaussianBlur(thresh, (5, 5), 0)
_, thresh2 = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)

contours, hierarchy = cv2.findContours(thresh2, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

def simplify_contour(cnt, eps=1.2):
    # Epsilon approximation for smoother curves and fewer polygons
    return cv2.approxPolyDP(cnt, eps, True)

print("Found contours:", len(contours))

# Filter
filtered = []
for i, c in enumerate(contours):
    area = cv2.contourArea(c)
    if area > 400:
        simplified = simplify_contour(c, eps=1.0)
        parent = hierarchy[0][i][3]
        filtered.append((i, area, parent, simplified))
        print(f"Kept contour {i}: area={area:.1f}, parent={parent}, points={len(simplified)}")

with open('d:/projects/portfolio/public/logo.svg', 'w') as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">\n')
    for idx, area, parent, c in filtered:
        pts = c.reshape(-1, 2)
        d = f"M {pts[0][0]} {pts[0][1]}"
        for p in pts[1:]:
            d += f" L {p[0]} {p[1]}"
        d += " Z"
        color = "#ffffff" if parent >= 0 else "#0a0a0c"
        stroke = "#e2e8f0" if parent >= 0 else "#94a3b8"
        f.write(f'  <path id="path_{idx}" d="{d}" fill="{color}" stroke="{stroke}" stroke-width="2" fill-rule="evenodd" />\n')
    f.write('</svg>\n')

print("SVG generated successfully at d:/projects/portfolio/public/logo.svg")
