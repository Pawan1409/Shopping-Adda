    var currentItems = [];
    var mainCat = [];
    var subCat = [];
    var cartItems = [];
    var brands = [];
    var wishlistItems = [];
    var displayModal = document.getElementById("displayItem");
    var closeModal = document.getElementsByClassName("close")[0];
    //var wishlistCount = document.getElementById("wishlistCount");
    //var cartCount = document.getElementById("cartCount");
    var wishlist=0;
    var cart=0;
    var btnContent;


    //when documents get loaded
    $(document).ready(function(){
        $("#filters").hide();
        $("#products").hide();
        $("#products-filtered").hide();
        $("#cart").hide();
        $("wishlist").hide();
        var arrCategories;
        $.getJSON("/assets/server/data.json", function (data) {
            console.log(data);
            arrCategories = data.categories;
            for(d of arrCategories){
                mainCat.push(d.text);
            }
            $('#mainMenu').renderizeMenu(arrCategories, { rootClass: "nav navbar-nav mr-auto", ulParentClass: "dropdown-menu", dropdownIcon: '<span class="caret"></span>' });
            jQuery.SmartMenus.Bootstrap.init();
        })
    })


    //Event handler for click event on Navigation Bar
    $('#mainMenu').on('click','li', function(e,item) {
        $("#filters").empty();
        $("#products div").empty();
        var itemIndex = $(this);
        var itemType=itemIndex.context.id;
        console.log(e);
    //    $("#slideshow").hide();
        if(!mainCat.includes(itemType)){
            $("#filters").show();
            $("#products").show();
            $("#cart").hide();
            $("#products-filtered").hide();
            $("#wishlist").hide();
            $("#filters").append(`
                <p>${itemType} filters</p>
            `)
            $("#products").append(`
                <div class="row" id="productImage">
                </div>
            `)
        //    document.getElementById("filters").appendChild= itemType+" filters";
        //    document.getElementById("products").appendChild= itemType+" products";
            $.getJSON("/assets/server/data.json",function(data){
                brands=[];
                for(d of data.products){
                    btnContent = " Add To Cart";
                    if(d.category==itemType){
                        currentItems.push(d);
                        if(!brands.includes(d.brand))
                        {
                            brands.push(d.brand);
                        }
                        console.log(brands);
                        for(i=0;i<cartItems.length;i++){
                            if(cartItems[i].id==d.id){
                                btnContent="Added";
                                break;
                            }
                        }
                        $("#productImage").append(`
                                <div class="column card">
                                    <img src="${d.image}" alt="${d.name}" style="width:100%">
                                    <center>
                                        <p class="price">Rs. ${d.price}</p>
                                        <p>${d.name}</p>
                                        <p>
                                            <button class="btn btn-success" onclick="addToCart(${d.id})">${btnContent}</button>
                                        </p>
                                        <p>
                                            <button class="btn btn-primary" onclick="addToWishlist(${d.id})">Add To Wishlist</button>
                                        </p>
                                        <p>
                                            <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="itemDesc(${d.id})">Click here to know more</button>
                                        </p>
                                    </center>
                                </div>
                        `);
                    }
                }
                for(brand of brands){
                    $("#filters").append(`
                        <input type="checkbox" name="brands" id="${brand}" value="${brand}">${brand}</input>
                        <br>
                        `)
                    }
            }

        )
        return false;
        }
    }
    );


    //function to update cart items count
    function updateCartCount(){
        if(cart!=0){
            $('.cart').remove();
            $('#cartCount').append(`
                <span class="badge cart">${cart}</span>
            `)
        }
        else
            $('.cart').remove();
    }


    //function to update wishlist items count
    function updateWishlistCount(){
        if(wishlist!=0){
            $('.wishlist').remove();
            $('#wishlistCount').append(`
            <span class="badge wishlist">${wishlist}</span>
        `)
        }
        else
            $('.wishlist').remove();
    }


    //function to add product in cart
    function addToCart(itemId){
        var item;
        var flag=true;
        console.log(itemId);
        for(d of currentItems){
            if(d.id == itemId){
                item=d
            }
        }
        for(d of cartItems){
            if(d.id==item.id){
                alert("Product already in cart !!!!")
                flag=false;
            }
        }
        if(flag==true){
            cartItems.push(item);
            cart++;
            console.log(cartItems);
            updateCartCount();
        }
    }

    //function to add product in wishlist
    function addToWishlist(itemId){
        var item;
        var flag=true;
        console.log(itemId);
        for(d of currentItems){
            if(d.id == itemId){
                item=d
            }
        }
        for(d of wishlistItems){
            if(d.id==item.id){
                alert("Product already in your wishlist !!!!")
                flag=false;
            }
        }
        if(flag==true){
            wishlistItems.push(item);
            wishlist++;
            console.log(wishlistItems);
            updateWishlistCount();
        }
    }

    function itemDesc(itemId){
        //$("#itemContent p").empty();
        var displayItem;
        for(d of currentItems){
            if(d.id == itemId){
                displayItem=d;
                break;
            }
        }
//        $("#item-description").append(`
//            <div id="myModal" class="modal fade" role="dialog">
//  <div class="modal-dialog">
//
//    <!-- Modal content-->
//    <div class="modal-content">
//      <div class="modal-header">
//        <button type="button" class="close" data-dismiss="modal">&times;</button>
//        <h4 class="modal-title">Modal Header</h4>
//      </div>
//      <div class="modal-body">
//        <p>Some text in the modal.</p>
//      </div>
//      <div class="modal-footer">
//        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
//      </div>
//    </div>
//
//  </div>
//</div>
//
//        `)
    }


    //function to display cart

    function showCart(){
        $("#cart").empty();
    //    $("#slideshow").hide();
        $("#filters").hide();
        $("#products").hide();
        $("#products-filtered").hide();
        $("#wishlist").hide();
        $("#cart").show();
        if(cartItems.length==0){
            $("#cart").append(`
                <p>Ooops! Your cart is empty...</p>
                <h4>Go and get some items in cart</h4>
                <button><a href="index.html">Go back to home</button>
            `)
        }
        else{
            var totalPrice=0;
            for(d of cartItems){
                totalPrice=totalPrice+d.price;
                $("#cart").append(`
                <div class="card-item col-lg-4">
                    <img src="${d.image}" alt="${d.name}" style="width:100%">
                    <center>
                        <p class="price">Rs. ${d.price}</p>
                        <p>${d.name}</p>
                        <p>
                            <button class="btn btn-danger" onclick="removeProductCart(${d.id})"><span class="glyphicon glyphicon-trash" ></span> Remove</button>
                        </p>
                    </center>
                </div>
                `)
                }
            $("#cart").append(`
                <div class="row" style="clear : both;">
                    <center>
                        <h2 class="text-info">Total Price : ${totalPrice}</h2>
                    </center>
                </div>
            `)
        }
    }

    //function to show wishlist
    function showWishlist(){
        console.log(wishlistItems)
        $("#wishlist").empty();
        $("#products-filtered").hide();
        //$("#slideshow").hide();
        $("#filters").hide();
        $("#products").hide();
        $("#cart").hide();
        $("#wishlist").show();
        if(wishlistItems.length==0){
            $("#wishlist").append(`
                <p>Ooops! Your wishlist is empty...</p>
                <h4>Go and get some items in wishlist</h4>
                <a href="index.html"><button>Go back to home</button></a>
            `)
        }
        else{
            for(d of wishlistItems){
            $("#wishlist").append(`
                <div class="col-lg-4">
                    <img src="${d.image}" alt="${d.name}" style="width:100%">
                    <center>
                        <p class="price">Rs. ${d.price}</p>
                        <p>${d.name}</p>
                        <p>
                            <button onclick="removeProductWishlist(${d.id})"><span class="glyphicon glyphicon-trash" ></span> Remove</button>
                        </p>
                    </center>
                </div>
            `)
            }
        }
    }



    //function to remove product from cart
    function removeProductCart(itemId){
        for(i=0;i<cartItems.length;i++){
            if(cartItems[i].id==itemId){
                cartItems.splice(i,1);
            }
        }
        cart--;
        console.log(cartItems);
        updateCartCount();
        showCart();
    }

    //function to remove product from wishlist
    function removeProductWishlist(itemId){
        for(i=0;i<wishlistItems.length;i++){
            if(wishlistItems[i].id==itemId){
                wishlistItems.splice(i,1);
            }
        }
        wishlist--;
        console.log(wishlistItems);
        updateWishlistCount();
        showWishlist();
    }

    // When the user scrolls the page, execute Function
    window.onscroll = function() {fixHeader()};

    // Get the header
    var header = document.getElementById("mainNavbar");
    var content= document.getElementById("mainContent");
    var filter= document.getElementById("filters");

    // Get the offset position of the navbar
    var sticky = header.offsetTop;

    // Add the sticky class to the header when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function fixHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
            content.classList.add("overlapping");
            filter.classList.add("filter");
        }
        else {
            header.classList.remove("sticky");
            content.classList.remove("overlapping");
            filter.classList.remove("filter");
        }
    }



    //$('input[type=checkbox]').change(function() {
    //    console.log("invoked")
    //    var boxes = $('input[name=brands]:checked');
    //    console.log(boxes);
    //});

    $("#filters").on('change', "input[type='checkbox']", function() {
        var boxes = $('input[name=brands]:checked');
        console.log(boxes)
        var showBrands = [];
        console.log(boxes.length);
        for(i=0;i<boxes.length;i++){
            showBrands.push(boxes[i].value);
        }
        $("#products").hide();
        $("#products-filtered div").empty();
        $("#products-filtered").show();
        $("#products-filtered").append(`
                            <div class="row" id="productImageFiltered">
                            </div>
                            `);
        for(d of currentItems){
            if(showBrands.length>0){
                if(showBrands.includes(d.brand)){
                console.log(d);
                $("#productImageFiltered").append(`
                    <div class="column card">
                        <img src="${d.image}" alt="${d.name}" style="width:100%">
                        <center>
                            <p class="price">Rs. ${d.price}</p>
                            <p>${d.name}</p>
                            <p>
                                <button class="btn btn-success" onclick="addToCart(${d.id})">${btnContent}</button>
                            </p>
                            <p>
                                <button class="btn btn-primary" onclick="addToWishlist(${d.id})">Add To Wishlist</button>
                            </p>
                            <p>
                                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="itemDesc(${d.id})">Click here to know more</button>
                            </p>
                        </center>
                    </div>
                `);
            }}
            else{
                $("#products-filtered").hide();
                $("#products").show();
            }
        }
    });


