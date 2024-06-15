const data = [
  {
    id: 1,
    name: "Classic Rotatable Bezel Luminous Waterproof",
    img: "https://m.media-amazon.com/images/I/61jDyMmSwtL._AC_SY535_.jpg",
    price: 14,
    cat: "Casual",
  },
  {
    id: 2,
    name: "Rolex Sea Dweller Black Dial Stainless Steel ",
    img: "https://m.media-amazon.com/images/I/61nzgAFcyPL._AC_SY695_.jpg",
    price: 74,
    cat: "luxury",
  },
  {
    id: 3,
    name: "BENYAR Mens Watches Chronograph",
    img: "https://m.media-amazon.com/images/I/81w73nn6aXL._AC_SY535_.jpg",
    price: 200,
    cat: "formal",
  },
  {
    id: 4,
    name: "  {Luxury Casual Quartz Analog Watches",
    img: "https://m.media-amazon.com/images/I/81jaqigTn2L._AC_SY575_.jpg",
    price: 44,
    cat: "sport",
  },
  {
    id: 5,
    name: "Chronograph Resin Strap Watch, 45-7102",
    img: "https://m.media-amazon.com/images/I/71j0nFQ4NqL._AC_SY741_.jpg",
    price: 144,
    cat: "Casual",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filteredProducts) => {
  productsContainer.innerHTML = filteredProducts
    .map(
      (product) =>
        `
        <div class="product">
                    <img src="${product.img}" alt="">
                    <span class="name">${product.name}</span>
                    <span class="priceText">${product.price}$</span>
        </div>
        `
    )
    .join("");
};
displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();
  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "ALL",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];
  categoriesContainer.innerHTML = categories
    .map((cat) => `<span class="cat">${cat}</span>`)
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;

    selectedCat == "ALL"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat == selectedCat));
  });
};

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setCategories();
setPrices();