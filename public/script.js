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

