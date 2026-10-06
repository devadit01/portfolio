import cv2
import numpy as np

img = cv2.imread('d:/projects/portfolio/public/logo.png', cv2.IMREAD_UNCHANGED)
rgb = img[:, :, :3]
alpha = img[:, :, 3]

# Create grayscale heightmap from the luminance + alpha contour distance
gray = cv2.cvtColor(rgb, cv2.COLOR_BGR2GRAY).astype(np.float32) / 255.0
alpha_f = (alpha > 40).astype(np.float32)

# Normal calculation using Sobel gradients
# Blur slightly to get smooth surface gradients
smooth = cv2.GaussianBlur(gray, (7, 7), 2.0)
sobel_x = cv2.Sobel(smooth, cv2.CV_32F, 1, 0, ksize=3)
sobel_y = cv2.Sobel(smooth, cv2.CV_32F, 0, 1, ksize=3)

# Normal components
strength = 4.0
nx = -sobel_x * strength
ny = sobel_y * strength  # inverted for OpenGL normal map convention
nz = np.ones_like(nx)

# Normalize vector
length = np.sqrt(nx**2 + ny**2 + nz**2)
length[length == 0] = 1.0
nx /= length
ny /= length
nz /= length

# Map [-1, 1] to [0, 255]
norm_r = ((nx * 0.5 + 0.5) * 255).astype(np.uint8)
norm_g = ((ny * 0.5 + 0.5) * 255).astype(np.uint8)
norm_b = ((nz * 0.5 + 0.5) * 255).astype(np.uint8)

# Mask by alpha
norm_img = np.dstack([norm_b, norm_g, norm_r, alpha])
cv2.imwrite('d:/projects/portfolio/public/logo-normal.png', norm_img)
print("Normal map created at d:/projects/portfolio/public/logo-normal.png")
