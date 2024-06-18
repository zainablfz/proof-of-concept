document.addEventListener('DOMContentLoaded', function() {
  const ingredientsContainers = document.querySelectorAll('.ingredients-container');
  const cauldron = document.getElementById('cauldron');
  const form = document.getElementById('ingredient-list');
  const toast = document.getElementById('toast');

  function showToast(message) {
    toast.textContent = message;
    toast.className = 'toast show';
    setTimeout(() => {
      toast.className = 'toast';
    }, 3000);
  }

  ingredientsContainers.forEach(container => {
    container.addEventListener('dragstart', function(event) {
      event.dataTransfer.setData('text/plain', container.id);
    });
  });

  cauldron.addEventListener('drop', function(event) {
    event.preventDefault();

    const ingredientId = event.dataTransfer.getData('text/plain');
    const ingredientContainer = document.getElementById(ingredientId);
    const ingredientValue = ingredientId.replace('ingredient-', '');

    console.log('Ingrediënt ID:', ingredientId);

    cauldron.appendChild(ingredientContainer);

    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'ingredients';
    input.value = ingredientValue;
    form.appendChild(input);

    console.log('Formulierdata:', new FormData(form));
  });

  cauldron.addEventListener('dragover', function(event) {
    event.preventDefault();
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData(form);

    const selectedIngredients = Array.from(formData.getAll('ingredients'));

    if (selectedIngredients.length < 2) {
      showToast('You need 2 or more ingredients to brew a potion.');
      return;
    }

    fetch('/brew', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    })
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => { throw new Error(text); });
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
      if (error.message === 'No matching potion found.') {
        // window.location.href = '/nasty-potion'; 
      } else {
        {
        window.location.href = '/nasty-potion'; // Redirect naar nasty potion pagina
      };
      }
    });
  });
});

class ParallaxTiltEffect {
  constructor({ element, tiltEffect }) {
    this.element = element;
    this.tiltEffect = tiltEffect;
    this.size = [300, 360];
    [this.w, this.h] = this.size;

    this.mouseOnComponent = false;

    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.defaultStates = this.defaultStates.bind(this);
    this.setProperty = this.setProperty.bind(this);
    this.init = this.init.bind(this);

    this.init();
  }

  handleMouseMove(event) {
    const { offsetX, offsetY } = event;

    let X;
    let Y;

    if (this.tiltEffect === "reverse") {
      X = ((offsetX - this.w / 2) / 3) / 3;
      Y = (-(offsetY - this.h / 2) / 3) / 3;
    } else if (this.tiltEffect === "normal") {
      X = (-(offsetX - this.w / 2) / 3) / 3;
      Y = ((offsetY - this.h / 2) / 3) / 3;
    }

    this.setProperty('--rY', X.toFixed(2));
    this.setProperty('--rX', Y.toFixed(2));

    this.setProperty('--bY', (80 - X / 4).toFixed(2) + '%');
    this.setProperty('--bX', (50 - Y / 4).toFixed(2) + '%');
  }

  handleMouseEnter() {
    this.mouseOnComponent = true;
    this.element.classList.add("potion-card--active");
  }

  handleMouseLeave() {
    this.mouseOnComponent = false;
    this.defaultStates();
  }

  defaultStates() {
    this.element.classList.remove("potion-card--active");
    this.setProperty('--rY', 0);
    this.setProperty('--rX', 0);
    this.setProperty('--bY', '80%');
    this.setProperty('--bX', '50%');
  }

  setProperty(p, v) {
    this.element.style.setProperty(p, v);
  }

  init() {
    this.element.addEventListener('mousemove', this.handleMouseMove);
    this.element.addEventListener('mouseenter', this.handleMouseEnter);
    this.element.addEventListener('mouseleave', this.handleMouseLeave);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.potion-card');
  cards.forEach(card => {
    new ParallaxTiltEffect({
      element: card,
      tiltEffect: 'reverse'
    });
  });
});



// const wrap2 = new parallaxTiltEffect({
//   element: $('.wrap--2'),
//   tiltEffect: 'normal'
// });

// const wrap3 = new parallaxTiltEffect({
//   element: $('.wrap--3'),
//   tiltEffect: 'reverse'
// });