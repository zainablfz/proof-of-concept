document.addEventListener('DOMContentLoaded', function() {
  const ingredientsContainers = document.querySelectorAll('.ingredients-container');
  const cauldron = document.getElementById('cauldron');
  const form = document.getElementById('ingredient-list');


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

    console.log('Ingredient ID:', ingredientId);

    cauldron.appendChild(ingredientContainer);

    let input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'ingredients';
    input.value = ingredientValue;
    form.appendChild(input);

    console.log('Form data:', new FormData(form));
  });

  cauldron.addEventListener('dragover', function(event) {
    event.preventDefault();
  });
});
