# PhysFields

**See the Unseen from Single-view Videos**

<p align="center">
  <a href="https://daijun10086.github.io/PhysFields/">
    <img src="https://img.shields.io/badge/Project_Page-PhysFields-2563eb?style=for-the-badge" alt="Project Page">
  </a>
  <a href="./static/pdfs/paper.pdf">
    <img src="https://img.shields.io/badge/Paper-PDF-dc2626?style=for-the-badge" alt="Paper">
  </a>
  <a href="https://drive.google.com/file/d/1uL0nvQV1bc6cDp0pOed61He0wjQj3nJa/view?usp=sharing">
    <img src="https://img.shields.io/badge/Video-Google_Drive-16a34a?style=for-the-badge" alt="Video">
  </a>
</p>

<p align="center">
  <img src="./static/images/teaser.png" alt="PhysFields teaser" width="100%">
</p>

## About

A unified end-to-end differentiable framework that simultaneously recovers **force fields** and **material fields** from a single video. We combine a 3D Gaussian Splatting reconstruction of the first frame with a differentiable Material Point Method simulator, with material parameters initialized by a Vision-Language Model. The whole pipeline is optimized directly from the input video using only pixel-level reconstruction losses (MSE + SSIM) — no proxy supervision required.

By **Jun Dai** and **Sheng Zhao** — Machine Vision Course Project, Tsinghua University.

## Visit the Project Page

<p align="center">
  <a href="https://daijun10086.github.io/PhysFields/">
    <img src="./project_qr_with_logo.png" alt="QR code linking to the PhysFields project page" width="220">
  </a>
</p>

<p align="center">
  Scan the QR code, or click <a href="https://daijun10086.github.io/PhysFields/"><strong>here</strong></a> to open the project page.
</p>

## Repository Contents

This repository hosts the source of the project page deployed via GitHub Pages. It contains:

- `index.html` — the project page
- `static/css/` — page styles
- `static/images/` — teaser, pipeline figure, and result figures
- `static/pdfs/` — the paper PDF
- `static/ppt/` — presentation slide decks

The source code of the method itself is maintained separately.
