# Sell Monkey
## About the application

This is an application similar to an application like Facebook Marketplace. This is a space where users can log in to buy items listed by other users. Or they can list items they no longer have use for online for someone else to buy.

### Landing Page

The application opens to a landing page. This is the only page a user can see until they have logged in. If a user attempts to go to a different page it redirects them back to this page.

![Sell Monkey Landing Page](/screenshots/HomePage.png)

### Logging in

This application enables users to securely log in using Auth0. This allows the user to choose between two (2) options. They can either log in with their email account, which gives auth0 access to their email, username, and any other profile information. Their other choice is to create an account using their email and password. 

### Home Page

Once the user has successfully logged in they will see this page, it shows each of the items that are currently listed for sale by all users on the site. Here they are able to use the filter functionality to filter by what category the items fall under (ie sporting goods, home decor, etc). They can also add an item they are interested in to their cart which will be stored in a database until the item is purchased.

![Sell Monkey Home Page](/screenshots/All-Items.png)

### Your Listings Page

Users can navigate to the Your listings page. On the page you are able to view all of the items that you have listed for sale, that have not been purchased. You can choose to delete the items, if this is done they will no longer show up on the home page.

![Sell Monkey Listings Page](/screenshots/YourListings.png)

When a user clicks the button "Add Item for sale" a modal pops up to requesting information from the user regarding the item they want to sell. Once they have filled out the modal's form, they press the "Add Item" button and there is an alert giving confirmation the request was successful.

![Add Item Modal](/screenshots/AddModal.png)

*To enable users to upload pictures I used AWS S3. I am currently on the free tier, this makes it so the picture size has to be very small to work. The size must be a maximum of 75KB, if it is larger than that nothing will happen*

### Cart Page

When a user navigates to the Cart Page the items the user has added to their cart are pulled from the database and displayed on the screen. The user can usee the information about the items, as well as a button to remove the item from their cart. On the right side of the screen the cart total is shown as well as a "Pay" button.

![Cart](/screenshots/Cart.png)

When clicked a modal pops up to request credit card information. After the card information is entered you will see a visual showing what type of card is being used (visa, mastercard, etc). At this point you can click the "Pay" button on the modal. At this point if the card is processed successfully, an alert will be shown saying your payment for $xx.xx was processed. If there is an issue with processing payment an alert will notify you as well.

![PayModal](/screenshots/PayModal.png)

*For card processing I implemented Stripe. This is not a fully active implementation of stripe, it is in testing at this time. This means that you are only able to use the test cards provided by Stripe. These cards can be found at https://stripe.com/docs/testing*