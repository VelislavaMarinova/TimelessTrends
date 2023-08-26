# Timeless Trends

This project is generated with Angular version 16.1.4. The project is about listing products by categories. Each product has a title, an image, and a short description. Users can add products to the cart, rate the products, filter products, and sort them by different options.

## Description: 
1. Header:
- whenever customer scrolls down to the page the
  header remain visible
- header has just a couple of categories. Clicking on a category there are
  loaded different set of products depending on the category selected
- When a customer opens the page, the first category is loaded by default.
2. Product counter – small section showing how many products are currently displayed in the
  product grid. (x out of y).
3. Product Grid
  - Contains a set of product tiles positioned in a grid-like structure.
  - The number of products loaded first are nine and user can click load more button to load nine more products. If there are no more porducts to load, load more button is       disabled.
  - Product card - each product  contains:
      - Image of the product
      - Name of the product
      - Short description
      - Price
      - Price discount percentage
      - Prace after discount
      - Ratings ‘stars’.
      - Add to cart button – a success alert is displayed on click
4. Sorting mechanism:
   - sort by product name: Alphabetical a-z, Alphabetical z-a
   - sort by price: Price ascending, Price descending.
5. Filtering mechanism:
  - filter by price range
  - filter by brand
    6. Details page
      - Image of the product
      - Name of the product
      - Short description
      - Price
      - Price discount percentage
      - Prace after discount
      - Ratings ‘stars’.
      - Only logged in users can add review and rate the product
      - Add to cart button –only logged in useres can click the button, a success alert is displayed on click
6. Footer


![Timeless Trends](src/assets/start-app.png)
![Timeless Trends](src/assets/page2.png) ![Timeless Trends](src/assets/start-logged-in-app.png)
![Timeless Trends](src/assets/details-page.png)

## Install dependencies: 

`npm install`

## Run project:

Run `ng serve` for a dev server. 
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Data source:
- https://github.com/VelislavaMarinova/json-server;
- run server: npm start;
- used data: https://dummyjson.com/docs/products
## TODO:
- edit and delete review;
- Profile page

