/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    const mapNumber = (X,A,B,C,D) => (X-A)*(D-C)/(B-A)+C;
    // from http://www.quirksmode.org/js/events_properties.html#position
	const getMousePos = (e) => {
        let posx = 0;
        let posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
            posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
        return { x : posx, y : posy }
    }
    // Generate a random float.
    const getRandomFloat = (min, max) => (Math.random() * (max - min) + min).toFixed(2);

    /**
     * One class per effect. 
     * Lots of code is repeated, so that single effects can be easily used. 
     */
    // Effect 10
    class HoverImgFx10 {
        constructor(el) {
            this.DOM = {el: el};
            
            this.DOM.reveal = document.createElement('div');
            this.DOM.reveal.className = 'hover-reveal';
            this.DOM.reveal.innerHTML = `<div class="hover-reveal__deco"></div><div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
            this.DOM.el.appendChild(this.DOM.reveal);
            this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
            this.DOM.revealInner.style.overflow = 'hidden';
            this.DOM.revealDeco = this.DOM.reveal.querySelector('.hover-reveal__deco');
            this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
            charming(this.DOM.el);
            this.DOM.letters = [...this.DOM.el.querySelectorAll('span')];
            this.initEvents();
        }
        initEvents() {
            this.positionElement = (ev) => {
                const mousePos = getMousePos(ev);
                const docScrolls = {
                    left : document.body.scrollLeft + document.documentElement.scrollLeft, 
                    top : document.body.scrollTop + document.documentElement.scrollTop
                };
                this.DOM.reveal.style.top = `${mousePos.y+10-docScrolls.top}px`;
                this.DOM.reveal.style.left = `${mousePos.x+10-docScrolls.left}px`;
            };
            this.mouseenterFn = (ev) => {
                this.positionElement(ev);
                this.showImage();
                // this.animateLetters();
            };
            this.mousemoveFn = ev => requestAnimationFrame(() => {
                this.positionElement(ev);
            });
            this.mouseleaveFn = () => {
                this.hideImage();
            };
            
            this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
            this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
            this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
        }
        showImage() {
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealDeco);

            this.tl = new TimelineMax({
                onStart: () => {
                    this.DOM.reveal.style.opacity = 1;
                    TweenMax.set(this.DOM.el, {zIndex: 1000});
                }
            })
            .set(this.DOM.revealInner, {opacity: 0})
            .add('begin')
            .add(new TweenMax(this.DOM.revealDeco, 0.5, {
                ease: Expo.easeOut,
                startAt: {scale: 0, opacity: 1, rotation: -10},
                scale: 1.6,
                rotation: 0
            }), 'begin')
            .add(new TweenMax(this.DOM.revealDeco, 0.3, {
                ease: Sine.easeOut,
                opacity: 0
            }), 'begin+=0.2')
            .add(new TweenMax(this.DOM.revealInner, 0.6, {
                ease: Expo.easeOut,
                startAt: {scale: 0, opacity: 0, rotation: 10},
                scale: 1,
                opacity: 1,
                rotation: 0
            }), 'begin+=0.2');
        }
        hideImage() {
            TweenMax.killTweensOf(this.DOM.revealInner);
            TweenMax.killTweensOf(this.DOM.revealDeco);

            this.tl = new TimelineMax({
                onStart: () => {
                    TweenMax.set(this.DOM.el, {zIndex: 999});
                },
                onComplete: () => {
                    TweenMax.set(this.DOM.el, {zIndex: ''});
                    TweenMax.set(this.DOM.reveal, {opacity: 0});
                }
            })
            .add('begin')
            .add(new TweenMax([this.DOM.revealDeco, this.DOM.revealInner], 0.2, {
                ease: Expo.easeOut,
                opacity: 0,
                scale: 0.9
            }), 'begin')
        }
        // animateLetters() {
        //     TweenMax.killTweensOf(this.DOM.letters);
        //     TweenMax.set(this.DOM.letters, {opacity: 0});
        //     TweenMax.staggerTo(this.DOM.letters, 0.1, {
        //         ease: Expo.easeOut,
        //         opacity: 1
        //     }, 0.04);
        // }
    }
    [...document.querySelectorAll('[data-fx="10"] > a, a[data-fx="10"]')].forEach(link => new HoverImgFx10(link));
    

    // Demo purspose only: Preload all the images in the page..
    const contentel = document.querySelector('.content');
    [...document.querySelectorAll('.block__title, .block__link, .content__text-link')].forEach((el) => {
        const imgsArr = el.dataset.img.split(',');
        for (let i = 0, len = imgsArr.length; i <= len-1; ++i ) {
            const imgel = document.createElement('img');
            imgel.style.visibility = 'hidden';
            imgel.style.width = 0;
            imgel.src = imgsArr[i];
            imgel.className = 'preload';
            contentel.appendChild(imgel);
        }
    });
    imagesLoaded(document.querySelectorAll('.preload'), () => document.body.classList.remove('loading'));
}
