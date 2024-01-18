//toggle icon navbar
let menu = document.querySelector('#menuIcon i')
let navbar = document.querySelector('.navbar')

menu.onclick = () =>{
	menu.classList.toggle('fa-close')
	navbar.classList.toggle('active')
}


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

            //Active section for animation on scroll
            sec.classList.add('show-animate'); 
       
        }
        //if want use animation that repeats on scroll use this
        else{
        	sec.classList.remove('show-animate'); 
        }


    });
	

	let header = document.querySelector('header')
	header.classList.toggle('sticky', window.scrollY > 100)

	// remove toggle icon and navbar when click navbar links (scroll)
		
		menu.classList.remove('fa-close')
		navbar.classList.remove('active')

    //Animation footer on scroll
        let footer = document.querySelector('footer')

        footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);

}