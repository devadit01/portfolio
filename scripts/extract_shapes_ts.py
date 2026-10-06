import cv2
import numpy as np
import json

img = cv2.imread('d:/projects/portfolio/public/logo.png', cv2.IMREAD_UNCHANGED)
alpha = img[:, :, 3]

thresh = (alpha > 80).astype(np.uint8) * 255
blurred = cv2.GaussianBlur(thresh, (5, 5), 0)
_, thresh2 = cv2.threshold(blurred, 127, 255, cv2.THRESH_BINARY)

contours, hierarchy = cv2.findContours(thresh2, cv2.RETR_TREE, cv2.CHAIN_APPROX_TC89_KCOS)

def simplify_contour(cnt, eps=1.2):
    return cv2.approxPolyDP(cnt, eps, True)

# We want the shape to be centered at (0, 0) and scaled so max dimension is roughly 2.0 (e.g. from -1 to 1).
# Note: In SVG / image coordinates, Y goes DOWN. In Three.js, Y goes UP.
# So x_3d = (x - cx) / scale, y_3d = -(y - cy) / scale.

# Let's find overall bounding box of valid contours (area > 500)
valid_indices = []
for i, c in enumerate(contours):
    if cv2.contourArea(c) > 400:
        valid_indices.append(i)

all_pts = np.vstack([contours[i].reshape(-1, 2) for i in valid_indices])
min_x, min_y = np.min(all_pts, axis=0)
max_x, max_y = np.max(all_pts, axis=0)
width = max_x - min_x
height = max_y - min_y
cx = (min_x + max_x) / 2.0
cy = (min_y + max_y) / 2.0
scale = max(width, height) / 2.0  # so max extent is [-1, 1]

print(f"BBox: min=({min_x}, {min_y}), max=({max_x}, {max_y}), center=({cx:.1f}, {cy:.1f}), scale={scale:.1f}")

shapes_data = {
    "center": [float(cx), float(cy)],
    "scale": float(scale),
    "bbox": [float(min_x), float(min_y), float(max_x), float(max_y)],
    "main_outer": [],
    "main_hole": [],
    "top_blade": []
}

for i in valid_indices:
    c = simplify_contour(contours[i], eps=0.9)
    parent = hierarchy[0][i][3]
    area = cv2.contourArea(c)
    pts = c.reshape(-1, 2)
    # Convert to 3D normalized coordinates
    norm_pts = []
    for px, py in pts:
        nx = float((px - cx) / scale)
        ny = float(-(py - cy) / scale)
        norm_pts.append([round(nx, 4), round(ny, 4)])
    
    print(f"Contour {i}: parent={parent}, area={area:.1f}, pts={len(norm_pts)}")
    if parent == -1 and area > 100000:
        shapes_data["main_outer"] = norm_pts
    elif parent == -1 and area < 100000:
        shapes_data["top_blade"] = norm_pts
    elif parent >= 0 and area > 5000:
        shapes_data["main_hole"] = norm_pts

# Export as TypeScript file
ts_content = f"""// Auto-generated 3D contour points for Gothic 'A' Chrome Logo
export interface LogoShapeDefinition {{
  center: [number, number];
  scale: number;
  bbox: [number, number, number, number];
  mainOuter: [number, number][];
  mainHole: [number, number][];
  topBlade: [number, number][];
}}

export const LOGO_SHAPES: LogoShapeDefinition = {json.dumps({
    "center": shapes_data["center"],
    "scale": shapes_data["scale"],
    "bbox": shapes_data["bbox"],
    "mainOuter": shapes_data["main_outer"],
    "mainHole": shapes_data["main_hole"],
    "topBlade": shapes_data["top_blade"]
}, indent=2)};
"""

with open('d:/projects/portfolio/src/components/logo-3d/logo-shapes.ts', 'w') as f:
    f.write(ts_content)

print("TypeScript logo shapes saved to src/components/logo-3d/logo-shapes.ts")
