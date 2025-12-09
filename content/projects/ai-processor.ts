export const ai_processor = `
---
id: ai-processor
title: AI Image Processor
shortDescription: A mobile app that uses on-device ML for real-time image manipulation and style transfer.
image: https://picsum.photos/800/600?random=1
projectUrl: https://example.com/ai-app
qrCodeUrl: https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://example.com/ai-app
hasDetail: true
tags: [AI, Mobile, React Native]
date: 2023-10-15
---
# AI Image Processor

This project leverages advanced machine learning models to process images in real-time directly on the user's device, ensuring privacy and speed.

![System Architecture](https://picsum.photos/800/400?random=101)

## Key Features
- **Real-time Edge Detection**: Optimized for mobile devices using WebGL acceleration.
- **Style Transfer**: Apply artistic styles (Van Gogh, Picasso) to your photos in milliseconds.
- **Offline First**: No internet connection required for core processing.

## Technical Stack
Built with **React Native** for the UI and **TensorFlow Lite** for the model execution. We custom-wrote native modules in C++ for critical performance paths.

> "The goal was to make AI accessible to everyone, right in their pocket."
`;