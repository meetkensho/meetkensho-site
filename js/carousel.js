const elements = {
  holder: null,
  text: null,
  image: null,
  nameHolder: null,
  bioHolder: null,
  previous: null,
  next: null,
  dots_holder: null,
}

const state = {
  currentIdx: 0,
}

function appendTestimonial(idx) {
  if (!testimonials[idx]) return
  const { holder, text, image, nameHolder, bioHolder } = elements
  const { content, imagePath, name, bio } = testimonials[idx]
  holder.style.animationPlayState = 'running'
  setTimeout(() => {
    text.innerHTML = content
    image.setAttribute('src', imagePath)
    nameHolder.innerHTML = name
    bioHolder.innerHTML = bio
  }, 1000)
  setTimeout(() => {
    holder.style.animationPlayState = 'paused'
  })

}

function switchIdx(e) {
  const newIdx = parseInt(e.currentTarget.dataset.idx)
  if (newIdx > testimonials.length - 1 || newIdx < 0) return
  state.currentIdx = newIdx
  appendTestimonial(state.currentIdx)
  generateCarouselDots()
  setArrows()
}

function generateCarouselDots() {
  elements.dots_holder.innerHTML = ''
  testimonials.forEach((testimonial, i) => {
    const newElement = document.createElement('img')
    if (i === state.currentIdx) {
      newElement.setAttribute('src', './img/oval-active.png')
    } else {
      newElement.setAttribute('src', './img/oval-inactive.png')
    }
    newElement.dataset.idx = i
    newElement.addEventListener('click', switchIdx)
    elements.dots_holder.appendChild(newElement)
  })
}

function setArrows() {
  [elements.previous, elements.next].forEach(element => {
    element.dataset.idx = element.classList.contains('next')
      ? (state.currentIdx + 1).toString()
      : (state.currentIdx - 1).toString()
    element.addEventListener('click', switchIdx)
  })
}

function init() {
  elements.holder = document.querySelector('.testimonial-holder')
  elements.text = document.querySelector('.testimonial-text')
  elements.image = document.querySelector('.testimonial-person .image img')
  elements.nameHolder = document.querySelector('.testimonial-person .bio .name')
  elements.bioHolder = document.querySelector('.bio .about')
  elements.previous = document.querySelector('.previous')
  elements.next = document.querySelector('.next')
  elements.dots_holder = document.querySelector('.carousel-dots')
  generateCarouselDots()
  setArrows()
}

document.addEventListener('DOMContentLoaded', init)