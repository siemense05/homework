(function () {

    //SWIPERS

    const headerSwiper = new Swiper('.header__swiper', {
        slidesPerView: 1,
        loop: true,
        direction: "vertical",


        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },

        pagination: {
            el: '.header__pagination',
            dynamicBullets: true,
            clickable: true,
        },

    });

    const staticSwiper = new Swiper('.trip__swiper-static', {
        slidesPerView: 1.8,
        grabCursor: true,
        loop: true,
        nested: true,

        pagination: {
            el: '.trips__pagination',
            dynamicBullets: true,
            clickable: true,
        },

        breakpoints: {
            1251: {
                slidesPerView: 1.8,
            },
            901: {
                slidesPerView: 1.2,
            },
            751: {
                slidesPerView: 2.3,
            }
        },
    })

    const switchSwiper = new Swiper('.trip__swiper-switch', {
        slidesPerView: 1.8,
        grabCursor: true,
        loop: true,
        nested: true,

        on: {
            resize: function () {
                this.changeLanguageDirection(getDirection());
            },
        },
        pagination: {
            el: '.trips__pagination',
            dynamicBullets: true,
            clickable: true,
        },
        breakpoints: {
            1251: {
                slidesPerView: 1.8,
            },
            901: {
                slidesPerView: 1.5,
            },
            751: {
                slidesPerView: 2.3,
            }
        },


    })

    function getDirection() {
        return window.innerWidth <= 900 ? 'ltr' : 'rtl';
    }


    const gallerySwiper = new Swiper('.gallery__swiper', {
        slidesPerView: 1.2,
        spaceBetween: 0,
        grabCursor: true,
        centeredSlides: true,
        loop: true,

        pagination: {
            el: '.gallery__pagination',
            dynamicBullets: true,
            clickable: true,
        },
        breakpoints: {
            1251: {
                slidesPerView: 3.3,
                spaceBetween: 25,
            },
            901: {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            701: {
                slidesPerView: 2.5,
            },
            501: {
                slidesPerView: 2,
            }
        }
    });

    // ACCORDION

    const accordionLists = document.querySelectorAll('.accordion-list');

    accordionLists.forEach(el => {

        el.addEventListener('click', (e) => {

            const accordionList = e.currentTarget
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

            const accordionControl = e.target.closest('.accordion-list__control')
            if (!accordionControl) return
            const accordionItem = accordionControl.parentElement;
            const accordionContent = accordionControl.nextElementSibling;

            if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
                accordionOpenedItem.classList.remove('accordion-list__item--opened');
                accordionOpenedContent.style.maxHeight = null;
            }

            accordionItem.classList.toggle('accordion-list__item--opened');

            if (accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }

        })
    });

    // BURGER

    document.addEventListener('click', burgerInit)

    function burgerInit(e) {

        const burgerIcon = e.target.closest('.burger__icon')
        const burgerNavLink = e.target.closest('.nav__link')
        const footNav = e.target.closest('.footer__nav-item')


        if (!burgerIcon && !burgerNavLink) return
        if (footNav) return
        if (document.documentElement.clientWidth > 900) return

        if (!document.body.classList.contains('body--opened-burger')) {
            document.body.classList.add('body--opened-burger')
        } else {
            document.body.classList.remove('body--opened-burger')
        }
    }

    // MODAL

    const btns = document.querySelectorAll('.modal-open__button');
    const modal = document.querySelector('.modal');
    const input = document.querySelector('.modal__input');

    modal.addEventListener('click', closeModal);
    document.addEventListener('keydown', closeModal);

    btns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal(e) {
        e.preventDefault()
        document.body.classList.toggle('body--opened-modal')
        setTimeout(() => {
            input.focus();
        }, 1000)
    };

    function closeModal(e) {
        const target = e.target

        if (target.closest('.modal__close') || target.classList.contains('modal') || e.code === 'Escape') {
            document.body.classList.remove('body--opened-modal')
        }
    };

})();


// Функция для загрузки карты
function loadYaMap() {
    // Проверяем, загружалась ли карта ранее
    if (window.yaMapLoaded) return;

    // Скрипт для загрузки Яндекс.Карт
    var script = document.createElement('script');
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=fdaf0168-d321-49ed-832e-3cd81229343a";
    script.onload = function() {
        // Инициализация карты
        ymaps.ready(init);
        window.yaMapLoaded = true; // Помечаем карту как загруженную
    };
    // Добавляем скрипт в конец документа
    document.body.appendChild(script);
}

// Функция для загрузки карты
    function loadYaMap() {
        // Проверяем, загружалась ли карта ранее
        if (window.yaMapLoaded) return;

        // Скрипт для загрузки Яндекс.Карт
        var script = document.createElement('script');
        script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";
        script.onload = function() {
            // Инициализация карты
            ymaps.ready(init);
            window.yaMapLoaded = true; // Помечаем карту как загруженную
        };
        // Добавляем скрипт в конец документа
        document.body.appendChild(script);
    }

    // Функция инициализации карты
    function init() {
        var myMap = new ymaps.Map("map", {
            center: [44.5610757298697, 38.07711077282939],
        zoom: 17,
        });
    }

    // Обработчик событий прокрутки
    window.onscroll = function() {
        var mapDiv = document.getElementById('map');
        var rect = mapDiv.getBoundingClientRect();
        // Проверяем, попадает ли карта в область видимости
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
            mapDiv.style.display = 'block'; // Показываем карту
            loadYaMap(); // Загружаем карту
            window.onscroll = null; // Убираем обработчик после загрузки
        }
    };
