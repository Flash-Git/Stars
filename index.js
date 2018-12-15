//Initial Ratings
const ratings = {
  first: 4.7,
  second: 3.4,
  third: 2.3,
  fourth: 3.6
}

const starsTotal = 5;

//Run getRatings when DOM loads
document.addEventListener('DOMContentLoaded', getRatings);

//Form Elements
const productSelect = document.getElementById('product-select');
const ratingControl = document.getElementById('rating-control');

//Init product
let product;

//Product select change
productSelect.addEventListener('change', (e) => {
  product = e.target.value;
  //Enable rating control
  ratingControl.disabled = false;
  ratingControl.value = ratings[product];
});

//Rating control change
["blur", "keyup"].forEach(event => ratingControl.addEventListener(event, (e) => {
  e.preventDefault();
  if(event==="keyup"&&e.keyCode !== 13){
    return;
  }

  const rating = e.target.value;

  //Check bounds
  if(rating > 5 || rating < 0){
    alert('Please rate 0 - 5');
    return;
  }

  //Change rating
  ratings[product] = rating;

  getRatings();
}));

function getRatings() {
  for (let rating in ratings){
    //Get percentage
    const starPercentage = (ratings[rating] / starsTotal) * 100;

    //Round to nearest 10
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`;

    //Set width of stars-inner to percentage
    document.querySelector(`.${rating} .stars-inner`).style.width = starPercentageRounded;

    //Add number rating
    document.querySelector(`.${rating} .number-rating`).innerHTML = ratings[rating];
  }
}