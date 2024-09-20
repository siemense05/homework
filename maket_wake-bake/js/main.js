(function () {

    // BURGER

    document.addEventListener('click', burgerUnit)

    function burgerUnit(e) {

        const burgerIcon = e.target.closest('.burger-icon')
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

    const btn = document.querySelector('.about__inner-modal-button')
    const modal = document.querySelector('.modal')

    btn.addEventListener('click', openModal)
    modal.addEventListener('click', closeModal)
    document.addEventListener('keydown', closeModal)


    function openModal(e) {
        e.preventDefault()  
        document.body.classList.toggle('body--opened-modal')
    }

    function closeModal(e) {
        const target = e.target

        if (target.closest('.modal__close') || target.classList.contains('modal') || target.classList.contains('button') || e.code === 'Escape'
        )
        e.preventDefault() 
            document.body.classList.remove('body--opened-modal')
    }

    //  TABS

    const tabControls = document.querySelector('.tab-controls')

    tabControls.addEventListener('click', toggleTab)

    function toggleTab(e) {
        const tabControl = e.target.closest('.tab-controls__link')

        if (!tabControl) return
        e.preventDefault()
        if (tabControl.classList.contains('tab-controls__link--active')) return


        const contentTabID = tabControl.getAttribute('href')
        const tabContent = document.querySelector(contentTabID)
        const activeControl = document.querySelector('.tab-controls__link--active')
        const shownContent = document.querySelector('.tab-content--show')

        if (activeControl) {
            activeControl.classList.remove('tab-controls__link--active')
        }
        tabControl.classList.add('tab-controls__link--active')

        if (shownContent) {
            shownContent.classList.remove('tab-content--show')
        }

        tabControl.classList.add('tab-controls__link--active')
        tabContent.classList.add('tab-content--show')

    }

    // Аккодреоны

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
    })

    // Swiper


    new Swiper('.gallery__swiper', {
        spaceBetween: 15,
        slidesPerView: 1.5,

        breakpoints: {
            451: {
                slidesPerView: 2,
                spaceBetween: 32,
            },
            901: {
                slidesPerView: 3,
            },
            1101: {
                slidesPerView: 4,
            }
        },

        pagination: {
            el: '.gallery__pagination',
            type: 'fraction',
        },

        navigation: {
            nextEl: '.gallery__next',
            prevEl: '.gallery__prev',
        },


    });

    // Swiper-testimonials

    new Swiper('.testimonials__swiper', {
        spaceBetween: 0,
        slidesPerView: 1,
        centeredSlides: true,

        navigation: {
            nextEl: '.testimonials__next',
            prevEl: '.testimonials__prev',
        },

        scrollbar: {
            el: '.testimonials-scrollbar',
        },

        breakpoints: {

            600: {
                slidesPerView: 1.1,
            },
            911: {
                slidesPerView: 1.6,
            },
            1201: {
                slidesPerView: 1.95,
            }
        },

    });

    let inputs = document.querySelectorAll('input[type="tel"]')
    let im = new Inputmask('+7 (999) 999 99-99')
    im.mask(inputs)
})()
