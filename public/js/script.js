'use strict'
// scroll sections
let section = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
	section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            //active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });

        }
       

    });
	

	let header = document.querySelector('header')
	header.classList.toggle('sticky', window.scrollY > 100)

    //Animation footer on scroll
        let footer = document.querySelector('footer')

        footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);

}


let btn= document.querySelector('.bars')
let i=document.querySelector('.icon')
let header=document.querySelector('.nagation')
btn.addEventListener('click', ()=>{
    i.classList.toggle('fa-bars')
    i.classList.toggle('fa-close')
    header.classList.toggle('active')

})
/*--galery order*/
var mixer = mixitup('.portfolio-gallery');
/*----swiper*/
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 50,
    loop: true,
    grabCursor:true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });