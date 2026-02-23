/**
 * CRITICAL PERFORMANCE FIXES
 * Run this after DOM loads to fix major performance issues
 */

(function() {
    'use strict';

    // Fix 1: Share video source between elements (saves 1MB+ download)
    function fixDuplicateVideo() {
        const sourceVideo = document.getElementById('sourceVideo');
        const backgroundVideo = document.getElementById('backgroundVideo');
        
        if (sourceVideo && backgroundVideo) {
            // Share the same video source
            backgroundVideo.src = sourceVideo.src;
            backgroundVideo.style.display = 'block';
            backgroundVideo.style.width = '100%';
            backgroundVideo.style.height = '100%';
            backgroundVideo.style.objectFit = 'cover';
            
            // Sync playback when source video loads
            sourceVideo.addEventListener('loadeddata', () => {
                backgroundVideo.play();
                console.log('✓ Shared video source - saved 1MB+ bandwidth');
            }, { once: true });
            
            // Keep videos in sync
            sourceVideo.addEventListener('play', () => backgroundVideo.play());
            sourceVideo.addEventListener('pause', () => backgroundVideo.pause());
        }
    }

    // Fix 2: Add lazy loading to all images
    function addLazyLoading() {
        const images = document.querySelectorAll('img:not([loading])');
        let count = 0;
        
        images.forEach((img, index) => {
            // Skip first 3 images (above fold)
            if (index > 2) {
                img.setAttribute('loading', 'lazy');
                count++;
            }
        });
        
        console.log(`✓ Added lazy loading to ${count} images`);
    }

    // Fix 3: Defer non-critical videos
    function deferVideos() {
        const videos = document.querySelectorAll('video[autoplay]');
        const criticalVideos = ['sourceVideo']; // Keep hero video
        
        videos.forEach(video => {
            if (!criticalVideos.includes(video.id)) {
                // Remove autoplay, add it back when in viewport
                video.removeAttribute('autoplay');
                video.pause();
                
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play();
                            observer.unobserve(video);
                        }
                    });
                }, { rootMargin: '50px' });
                
                observer.observe(video);
            }
        });
        
        console.log('✓ Deferred non-critical video loading');
    }

    // Fix 4: Preload critical resources
    function addResourceHints() {
        const head = document.head;
        
        // Preconnect to CDN
        if (!document.querySelector('link[rel="preconnect"][href*="upcdn.io"]')) {
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = 'https://upcdn.io';
            preconnect.crossOrigin = 'anonymous';
            head.insertBefore(preconnect, head.firstChild);
            
            const dnsPrefetch = document.createElement('link');
            dnsPrefetch.rel = 'dns-prefetch';
            dnsPrefetch.href = 'https://upcdn.io';
            head.insertBefore(dnsPrefetch, head.firstChild);
            
            console.log('✓ Added CDN preconnect');
        }
    }

    // Fix 5: Optimize background images
    function optimizeBackgrounds() {
        const elements = document.querySelectorAll('[style*="background"]');
        
        elements.forEach(el => {
            const style = el.getAttribute('style');
            if (style && style.includes('url(') && !style.includes('will-change')) {
                el.style.willChange = 'auto';
            }
        });
        
        console.log('✓ Optimized background images');
    }

    // Fix 6: Add image decode async
    function addImageDecode() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            if (!img.hasAttribute('decoding')) {
                img.setAttribute('decoding', 'async');
            }
        });
        
        console.log('✓ Added async image decoding');
    }

    // Run all fixes
    function applyAllFixes() {
        console.log('🚀 Applying critical performance fixes...');
        
        // Add resource hints immediately
        addResourceHints();
        
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                fixDuplicateVideo();
                addLazyLoading();
                addImageDecode();
                optimizeBackgrounds();
                
                // Defer videos after initial render
                setTimeout(deferVideos, 100);
            });
        } else {
            fixDuplicateVideo();
            addLazyLoading();
            addImageDecode();
            optimizeBackgrounds();
            setTimeout(deferVideos, 100);
        }
        
        console.log('✅ Performance fixes applied!');
    }

    // Execute
    applyAllFixes();
})();
