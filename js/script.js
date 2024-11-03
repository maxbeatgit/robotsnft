$(document).ready(function () {

	if (ScrollTrigger.isTouch !== 1) {
	
		ScrollSmoother.create({
			content: '.content', // контент, который скролится
			smooth: 1.5,
			effects: true, // чтобы работали data-speed
		})
	
		// пересчитываем высоту чтобы избежать багов при плавной прокрутке
		var container = document.querySelector('.content');
		let height;
		function setHeight() {
			height = container.clientHeight;
			document.body.style.height = height + 'px';
		}
		ScrollTrigger.addEventListener('refreshInit', setHeight);
		ScrollTrigger.addEventListener('scrollStart', setHeight);
	}


	// подсветка пунктов меню в зависимости от секции

	$('.section').each(function (index, section) {
		ScrollTrigger.create({
			trigger: section,
			start: 'top center',
			end: 'bottom center',
			// markers: true,
			onToggle: function (self) {
				var id = self.trigger.getAttribute('id');
				var link = $('.menu__link[href="#' + id + '"]');
				$('.menu__link').removeClass('menu__link_active');
				link.addClass('menu__link_active');
			}
		});
	});

	
	// липкое меню
	
	if (ScrollTrigger.isTouch !== 1) {
		// если включена плавная прокрутка (не тач устройства) фиксируем меню c помощью pin
		ScrollTrigger.create({
			trigger: '.menu',
			start: 'top top',
			endTrigger: '.footer',
			end: 'bottom bottom',
			pin: true,
			pinType: 'fixed',
			pinReparent: true,
			pinSpacing: false,
			refreshPriority: 1,
			// markers: true,
			onToggle: function(self) {
				// Проверяем состояние триггера
				if (self.isActive) {
					// Если триггер активен, добавляем класс
					$('.menu').addClass('menu_sticky');
				} else {
					// Если триггер не активен, удаляем класс
					$('.menu').removeClass('menu_sticky');
				}
			}
		});
	} else {
		// если плавная прокрутка отключена (тач устройства) фиксируем меню с помощью position:fixed
		var menuPos, mainHeight, menuHeight;

		function refreshVar() {
			mainHeight = $('.main').outerHeight(true); // определяем высоту первого экрана
			menuHeight = $('.menu').outerHeight(true); // определяем высоту меню
			menuPos = mainHeight - menuHeight; // определяем положение меню
		}
		refreshVar();
		$(window).resize(refreshVar);

		$(window).scroll(function () {
			winPos = $(window).scrollTop();
			if (winPos >= menuPos) { // при прокрутке до блока меню
				$('.menu').addClass('menu_sticky'); 
			} else {
				$('.menu').removeClass('menu_sticky');
			}
		});
	}



	// пульсация роботов

	gsap.to('.robot', {
		scale: 1.1,
		duration: 2,
		ease: 'none',
		stagger: {
			repeat: -1,
			yoyo: true
		}
	});



	// появление 12 nft

	function random(min, max) {
		return (Math.random() * (max - min)) + min;
	}

	$('.nft__item').each(function (index, element) {
		gsap.from(element, {
			opacity: 0,
			scale: 0,
			x: random(-300, 300),
			y: random(-300, 300),
			duration: 1,
			ease: 'none',
			delay: index * 0.2,
			repeat: 0,
			scrollTrigger: {
				trigger: '.nft', 
				start: 'top bottom', 
				end: 'top top', 
				scrub: 1, 
				// markers: true,
			}
		});
	});



	/* Cursor */

	window.addEventListener("mousemove", cursor);
	
	function cursor(e) {
		gsap.to('.cursor', 0, {
			x: e.clientX,
			y: e.clientY
		});
		gsap.to('.aura', 0.2, {
			x: e.clientX,
			y: e.clientY
		});
	}


	// при наведении на ссылки прячем cursor и увеличиваем aura

	let hoverElement = $('a');

	hoverElement.hover(function () {
			gsap.to('.cursor', 0.3, {
				scale: 6
			});
			gsap.to('.aura', 0.3, {
				scale: 0
			});
			$('.aura').addClass('aura_hover');
		}, function () {
			gsap.to('.cursor', 0.3, {
				scale: 1
			});
			gsap.to('.aura', 0.3, {
				scale: 1
			});
			$('.aura').removeClass('aura_hover');
		}
	);


	


	/* Menu open/close */

	function openMenu(){
		$('.burger__icon').toggleClass('burger__icon_close');
		$('.menu').toggleClass('menu_open');
		$('body').toggleClass('scroll_disable');
	}
	$('.burger').on('click', openMenu);

	function closeMenu() {
		$('.burger__icon').removeClass('burger__icon_close');
		$('.menu').removeClass('menu_open');
		$('body').removeClass('scroll_disable');
	}
	$('.menu__link').on('click', closeMenu);




	/* Smooth scroll */

	$('.scroll-link, .menu__link, .arrow').click(function () {
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top + "px"
		}, 700);
		return false;
	});



	/* Up */

	$('.up').click(function () {
		$("body,html").animate({
			scrollTop: 0
		}, 700);
		return false;
	});

	gsap.to('.up', {
		opacity: 1, 
		ease: 'none',
		scrollTrigger: {
			trigger: '.main',
			start: 'center top',
			end: '300 top', 
			scrub: true, 
			// markers: true,
		}
	})

});