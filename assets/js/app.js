



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

        return `<div class="container">
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
                      <button class="btn button-secondary " type="button" onclick="JavaScript:window.location.hash = '#1'">Details</button>
                      <button class="btn button-primary mt-2" type="button" data-id=${obj.id}>Add to Cart</button></div>
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

// Show filtered elements
function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

// Hide elements that are not selected
function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}