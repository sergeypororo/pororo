document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const giftBox = document.querySelector('.gift-box');
    const bomb = document.querySelector('.bomb');
    const explosion = document.getElementById('explosion');
    const dogImage = document.querySelector('.dog-image');
    const clickMe = document.querySelector('.click-me');
    const newYearText = document.querySelector('.new-year-text');
    let fireworks;

    const initFireworks = () => {
        const container = document.getElementById('fireworks-container');
        fireworks = new Fireworks.default(container, {
            autoresize: true,
            opacity: 0.5,
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 50,
            traceLength: 3,
            traceSpeed: 10,
            explosion: 5,
            intensity: 30,
            flickering: 50,
            lineStyle: 'round',
            hue: {
                min: 0,
                max: 360
            },
            delay: {
                min: 30,
                max: 60
            },
            rocketsPoint: {
                min: 50,
                max: 50
            },
            lineWidth: {
                explosion: {
                    min: 1,
                    max: 3
                },
                trace: {
                    min: 1,
                    max: 2
                }
            },
            brightness: {
                min: 50,
                max: 80
            },
            decay: {
                min: 0.015,
                max: 0.03
            },
            mouse: {
                click: false,
                move: false,
                max: 1
            }
        });
    };

    const showDogImage = () => {
        dogImage.style.display = 'block';
        anime({
            targets: '.dog-image',
            scale: [0, 1],
            rotate: '1turn',
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });
    };

    const showNewYearText = () => {
        newYearText.style.opacity = '1';
        anime({
            targets: '.new-year-text',
            scale: [0, 1],
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });
    };

    const hideDogImage = () => {
        anime({
            targets: '.dog-image',
            scale: 0,
            rotate: '-1turn',
            duration: 1000,
            easing: 'easeInElastic(1, .8)',
            complete: () => {
                dogImage.style.display = 'none';
            }
        });
    };

    const explodeGift = () => {
        // Скрываем текст "Нажми на меня"
        clickMe.style.display = 'none';

        // Открываем коробку
        anime({
            targets: '.gift-lid',
            translateY: -50,
            duration: 500,
            easing: 'easeOutExpo'
        });

        // Показываем бомбу
        bomb.style.visibility = 'visible';
        anime({
            targets: '.bomb',
            scale: [0, 1],
            duration: 500,
            delay: 500,
            easing: 'easeOutElastic(1, .8)'
        });

        // Взрываем бомбу
        setTimeout(() => {
            anime({
                targets: '#explosion',
                opacity: [0, 1],
                duration: 100,
                easing: 'linear',
                complete: () => {
                    // Скрываем подарок
                    giftBox.style.display = 'none';
                    
                    // Запускаем фейерверк
                    initFireworks();
                    fireworks.start();
                    
                    // Показываем текст "С Новым Годом!"
                    showNewYearText();
                    
                    // Показываем собаку
                    setTimeout(showDogImage, 1000);
                    
                    // Скрываем эффект взрыва
                    setTimeout(() => {
                        anime({
                            targets: '#explosion',
                            opacity: 0,
                            duration: 1000,
                            easing: 'linear'
                        });
                    }, 500);
                }
            });
        }, 1500);
    };

    const resetGift = () => {
        if (fireworks) {
            fireworks.stop();
        }
        hideDogImage();
        giftBox.style.display = 'block';
        clickMe.style.display = 'block';
        bomb.style.visibility = 'hidden';
        newYearText.style.opacity = '0';
        newYearText.style.transform = 'translate(-50%, -50%) scale(0)';
        
        anime({
            targets: ['.gift-box', '.gift-lid', '.bomb'],
            scale: 1,
            translateY: 0,
            rotate: '0turn',
            duration: 1000,
            easing: 'easeOutElastic(1, .8)'
        });
    };

    giftBox.addEventListener('click', explodeGift);

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        if (scrollPosition < windowHeight / 2) {
            resetGift();
        }
    });
});

