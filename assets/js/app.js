


var bookdetail;
filterSelection("UX")
function filterSelection(c) {
  fetch('assets/books.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      return response.json();
    })
    .then(json => {

      var FilteredBooks = json.filter(books => books.category === c)
      // console.log(FilteredBooks);
      var booksDiv = document.querySelector('#booksRend')
      // console.log(booksDiv)
      var BooksToShow = FilteredBooks.map((obj) => {

        return `<div class="container products" key=${obj.id}>
      <div class="d-flex justify-content-center row">
          <div class="col-md-10">
              <div class="row p-2 bg-white border rounded mt-2">
                  <div class="col-md-3 mt-1">
                  <img class="img-fluid img-responsive rounded product-image" src=${obj.image}></div>
                  <div class="col-md-6 mt-1">
                      <h5>${obj.title}</h5>
                      <p>${obj.author}</p>
                      <img src="assets/img/stars.png">
                      <p class="text-justify text-truncate para mb-0">${obj.description}</p>
                  </div>
                  <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                      <div class="d-flex flex-row align-items-center justify-content-evenly">
                          <h3 class="mr-1">$${obj.price}</h3><span class="strike-text h1">$${obj.price + 10}</span>
                      </div>
                      <h6 class="text-success">Free shipping</h6>
                      <div class="d-flex flex-column mt-4">
                      
                      <button class="btn button-secondary" type="button" onclick='showBook(
                        ${JSON.stringify(obj.image)}, 
                        ${JSON.stringify(obj.title)}, 
                        ${JSON.stringify(obj.price)}, 
                        ${JSON.stringify(obj.description)}, 
                        ${JSON.stringify(obj.author)},
                        ${JSON.stringify(obj.category)})'>Details</button>
                      <button id="addCart" class="btn button-primary mt-2 add-to-cart" type="button" data-id=${obj.id}>Add to Cart</button></div>
                  </div>
              </div>
              
          </div>
      </div>
  </div>`
      })

      booksDiv.innerHTML = BooksToShow.join("")


    })
    .catch(function () {
      this.dataError = true;
    })


}
const bookContainer = document.querySelector('#book_container');
const bodyContainer = document.querySelector('#bodyItem');
const bookBody = document.querySelector('#bookBody');

function showBook(image, title, price, description, author, category) {
  window.scroll(0, 0);
  bodyContainer.style.display = "none"
  bookContainer.style.display = "block"

  bookBody.innerHTML = `<div class="row m-5">
    <div class="col-lg-3 left-side-product-box pb-3">
        <img src=${image} class="border p-3">
    </div>
    <div class="col-lg-8">
        <div class="right-side-pro-detail border p-3 m-0">
            <div class="row products">
                <div class="col-lg-12">
                    <p class="m-0 p-0 text-dark">${title}</p>
                </div>
                
                <div class="col-lg-12">
                    <p class="m-0 p-0 price-pro">$${price}</p>
                    <hr class="p-0 m-0">
                </div>
                <div class="col-lg-12">
                    <p class="tag-section"><strong>Category : </strong><a href="#">${category}</a></p>
                </div>
                
              
                        
                       
                    </div>
                    <div class="col-lg-12 ">
                    <h5>Book Description:</h5>
                    <span>${description}</span>
                    <hr class="m-0 pt-2 mt-2">
                </div>
                </div>
            </div>
        </div>
    </div>
</div>`
}

let count = 0;
let sum = 0;
let totalSum = 0;
let cart = {};

if (localStorage.getItem("count")) {
    count = parseInt(localStorage.getItem("count"));
}

if (localStorage.getItem("sum")) {
    sum = parseInt(localStorage.getItem("sum"));
}

if (localStorage.getItem("cart")) {
    cart = JSON.parse(localStorage.getItem("cart"));
}

updateCart();
const books = document.querySelector('#courses-list');
loadEventListeners();
//Load course from localStorage if course avaible


function loadEventListeners(){
  books.addEventListener('click',add);
 
}
// let btn = books.target.classList.contains("add-to-cart");
// console.log(btn)
// btn.addEventListener("click", add);


// for (let i = 0; i < btns.length; i++) {
//     let btn = btns[i];
//     btn.addEventListener("click", add);

//     // id = btn.dataset.id;
//     // if (cart.indexOf(id) >= 0) {
//     //     btn.className = "added";
//     //     btn.textContent = "Remove";
//     // }
// }

function add(event) {
  // console.log(event)
  if (event.target.classList.contains("add-to-cart")){
    const book = event.target.parentElement.parentElement.parentElement;
    console.log(book)
    // image : course.querySelector('img').src,
    // title : course.querySelector('h4').textContent,
    // price : course.querySelector('.price span').textContent,
    // id    : course.querySelector('a').getAttribute('data-id')

    let image = book.querySelector('img').src
    let title = book.querySelector('h5').textContent;
    let price = parseInt(book.querySelector('h3').textContent.slice(1));
    let id = book.querySelector('.add-to-cart').getAttribute('data-id');
    

if (id in cart) {
    cart[id].qty++;
    cart[id].totalSum = cart[id].price * cart[id].qty;
    
} else {
    let cartItem = {
        image:image,
        title: title,
        price: price,
        qty: 1,
        totalSum:price
    };
    cart[id] = cartItem
}

    count++;
    sum += price;
    
    // console.log(cart[id].qty)

    // console.log(cart);
    
    // let index = cart.indexOf(event.target.dataset.id);
    // if (index >= 0) {
    //     cart.splice(index, 1);
    //     count--;
    //     sum -= price;
    //     event.target.className = "";
    //     event.target.textContent = "Add to cart";
    // } else {
    //     cart.push(event.target.dataset.id);
    //     count++;
    //     sum += price;
    //     event.target.className = "added";
    //     event.target.textContent = "Remove";
    // }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  window.location = '/'
  }

}

function updateCart() {
  
    document.getElementById("sum").textContent = sum;
    document.getElementById("count").textContent = count;
    localStorage.setItem("sum", sum);
    localStorage.setItem("count", count);
    localStorage.setItem('totalSum',totalSum)
    
}





function showFromStorage() {
  let tbody = document.getElementById("tbody");
  var items = JSON.parse(localStorage.getItem('cart'))
      console.log(items)
  for (let id in items) {
      let item = cart[id];
  
      let tr = document.createElement('tr')
  
      image     = document.createElement('img');
      image.src = item.image;
      image.style.width = '100px';
  
      let image_td = document.createElement('td')
      image_td = image
      tr.appendChild(image_td)
  
      let title_td = document.createElement('td')
      title_td.textContent = item.title
      tr.appendChild(title_td)
  
      let qty_td = document.createElement("td");
      qty_td.textContent = item.qty;
      tr.appendChild(qty_td);
  
      let price_td = document.createElement("td");
      price_td.textContent = item.price;
      tr.appendChild(price_td);
  
      let total_td = document.createElement("td");
      total_td.textContent = item.totalSum;
      tr.appendChild(total_td);
  
      tbody.appendChild(tr)
      
  }
};

showFromStorage()

function clearCart(){
  localStorage.clear()
  window.location = '/'
}




document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  console.log(anchor)
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

