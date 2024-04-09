
# Online Store Shopping State Management

## Description
This project is an e-commerce website built with Next.js and Zustand. It's designed to be simple to use and serve as a reference for how to manage global state in an e-commerce store. Here's what it does and how it's put together:

**Frontend: Next.js**
We use Next.js for the website's frontend. This choice gives us fast page loads, SEO-friendly pages, and a great developer experience. The site has a few main pages:

- Product Listing: Shows all available products. It's dynamic, pulling product info from the Noroff API backend.
- Product Details: Click on any product in the listing, and you'll see its details—price, descriptions, reviews, etc.
- Shopping Cart: Users can add products here and see them anytime before they check out.

**State Management: Zustand**
For keeping track of what's in the shopping cart (and other states like user sessions), I use Zustand. It's a minimalistic state manager that works well with Next.js and doesn't require a lot of boilerplate code. This makes the code cleaner and easier to maintain.

**Checkout Process**
The checkout isn't just a form. When users decide to buy what's in their cart, it moves their cart items to a "purchased" state. This means even after the cart is cleared, I can still show users what they bought on a confirmation page. This part uses a Zustand feature where we manage different pieces of our app state (like cart and purchased items) in one place.

**Highlights**
Dynamic Routing in Next.js: I show how to use Next.js to handle different product pages and navigate around the app.
State Management: You'll see a practical use of Zustand for managing app state across user sessions.
UI Components: The project includes examples of reusable Shadcn components, like product cards, buttons, and a drawer.
It's a practical example of modern web development practices, designed to be easy to understand and work with.

**Installation**
To get started, follow these steps:

Clone the repository:
```bash
git clone https://github.com/bjerkeset/online-store.git
```
Navigate to the project directory:
```bash
cd online-store
```
Install dependencies:
```bash
npm install
```

```bash
npm run dev
```
Navigate to http://localhost:3000 in your browser to view the application.

**Packages**
- Shadcn
- Zustand
- react-hook-form
  

**License**
This project is licensed under the MIT License.

**Contact**
If you have any questions about the project, please feel free to contact me on github.

