//const shimmerEl = document.getElementsByClassName("shimmer")[0];
const section = document.getElementsByClassName("blog-column-1")[0];
const pagination = document.getElementsByClassName('pagination')[0];



//loading shimer
for (let i = 0; i < 5; i++) {
    let shimmerContent = `<div class="shimmer-item" id="${i}">
                            <div class="blog-image" style="padding: 10px;">
                                <box class="shine"></box>
                            </div>

                            <div class="blog shimmer-div" style="margin: 5px;">
                                <lines class="shine"></lines>
                                <lines class="shine"></lines>
                                <lines class="shine"></lines>
                                <photo class="shine"></photo>
                            </div>
                         </div>`

    const divEl = document.createElement("div");
    divEl.innerHTML = shimmerContent;

    //shimmer added in blog-column-1 section
    section.appendChild(divEl);
}
//shimmer loaded and end

fetch("https://dummyjson.com/products?limit=50&skip=1")
    .then(response => response.json())
    .then((data) => {

        //hiding shimmer
        if (data.products.length > 0) {
            const shimmerItems = document.querySelectorAll('.shimmer-item');
            shimmerItems.forEach((element) => {
                element.style.display = 'none';
            })
        }


        let item_list = data.products;

        let page = sessionStorage.getItem("page_num")

        let current_page = page ? parseInt(page) : 1;
        let row = 5;


        displayList(item_list, row, current_page);


        setupPaginationButton(item_list, row, current_page);
    });


//display the items per page
function displayList(items, row_per_page, page) {
    section.innerHTML = "";
    page--;
    let start = row_per_page * page;
    let end = start + row_per_page;
    let paginate_items = items.slice(start, end); 0-4

    paginate_items.map((el) => {
        let content = `  <div class="blog-image">
                                <img src="${el.images[0]}"
                                height="200px" width="210px" style="border-radius: 10px;">
                            </div>

                            <div class="blog" style="max-width: 40rem;">
                                <h3>${el.brand}</h3>
                                <h5 style="margin-top: -5px;">${el.category}</h5>
                                <p>$ ${el.price}</p>
                                <p>${el.description}</p>
                            </div>`
        let card = document.createElement("div");
        card.className = "card-container";
        card.innerHTML = content;
        section.appendChild(card);
        return

    });


}


// pagination 
function setupPaginationButton(items, row_per_page, current_page) {
    pagination.innerHTML = ""

    let page_count = Math.ceil(items.length / row_per_page);

    for (let i = 1; i <= page_count; i++) {
        let btn = document.createElement('a');
        btn.innerHTML = i;
        btn.style.cursor = 'pointer';
        btn.style.margin = '10px';

        if (current_page === i) {
            btn.classList.toggle('active');
        }

        btn.addEventListener('click', () => {
            current_page = i; // current_page = 2

            sessionStorage.setItem("page_num", current_page)

            // remove active calss
            const elements = document.querySelectorAll('.active');
            elements.forEach((element) => {
                element.classList.remove('active');
            });

            // clicked button
            if (current_page === i) {
                btn.classList.toggle('active');
            }

            displayList(items, row_per_page, current_page);
        });
        pagination.appendChild(btn);
    }
}


const accordion_element = document.getElementsByClassName("accordion");

for (let i = 0; i < accordion_element.length; i++) {
    accordion_element[i].addEventListener('click', () => {
        if (accordion_element[i].classList.contains("active")) {
            accordion_element[i].classList.remove("active")
        } else {
            accordion_element[i].classList.add("active");
        }
    });
}
$('.accordion__header').click(function (e) {
    e.preventDefault();
    var currentIsActive = $(this).hasClass('is-active');
    $(this).parent('.accordion').find('> *').removeClass('is-active');
    if (currentIsActive != 1) {
        $(this).addClass('is-active');
        $(this).next('.accordion__body').addClass('is-active');
    }
});


