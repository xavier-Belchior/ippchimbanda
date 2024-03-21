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
//--opening the profile of "user"
let imgProfile=document.querySelector('.img-profile')
let profileContent=document.querySelector('.form-profile')
imgProfile.addEventListener('click', ()=>{
    profileContent.classList.toggle('active')
})
//--opening the dialog of "about" and giveing one propriety in the body in the page
let modalAbout=document.querySelector('#modal-about')
let aboutContent=document.querySelector('.modal-historia')
let about=document.querySelector('.about')
let closeModal=document.querySelector('#close-modal')
modalAbout.addEventListener('click',()=>{
    aboutContent.classList.toggle('active')
    about.classList.toggle('active')
    
})
//--closing the dialog of about
closeModal.addEventListener('click', ()=>{
    aboutContent.classList.remove('active')
})
/*--open the first modal-cursor*/ 
let openModalCursos=document.querySelector('.open-modal')
let closeModalCursos=document.querySelector('.close-cursos')
let modalCursos=document.querySelector('.modal-cursos')

openModalCursos.addEventListener('click', ()=>{
    modalCursos.classList.toggle('active')
    
})
closeModalCursos.addEventListener('click', ()=>{
        modalCursos.classList.remove('active')
    })
/*--Opening modal-cursor Two*/
    let openModalCursosTwo=document.querySelector('.open-modal2')
    let closeModalCursosTwo=document.querySelector('.close-cursos2')
    let modalCursosTow=document.querySelector('.modal-cursos2')
    
    openModalCursosTwo.addEventListener('click', ()=>{
        modalCursosTow.classList.toggle('active')
        
    })
    closeModalCursosTwo.addEventListener('click', ()=>{
            modalCursosTow.classList.remove('active')
        })    
        /*--Opening modal-cursor Two*/
    let openModalCursosThree=document.querySelector('.open-modal3')
    let closeModalCursosThree=document.querySelector('.close-cursos3')
    let modalCursosThree=document.querySelector('.modal-cursos3')
    
    openModalCursosThree.addEventListener('click', ()=>{
        modalCursosThree.classList.toggle('active')
        
    })
    closeModalCursosThree.addEventListener('click', ()=>{
            modalCursosThree.classList.remove('active')
        })   

let btnEvents=document.querySelector('#btn-event')
let disableEvents=document.querySelectorAll('.card-events')
// for(var c = 0; c<disableEvents.length; c++){
//     console.log(disableEvents[c])
// }
btnEvents.addEventListener('click', ()=>{
    disableEvents.forEach(function(div){
        div.classList.toggle('active')
    })
    btnEvents.classList.add('active')
})
/*--galery*/
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