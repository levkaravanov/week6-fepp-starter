### What is the purpose of userSchema.statics.login in userModel.js?
 -> the purpose of userSchema.statics.login in userModel.js is to handle the login logic for the user.

### Compare User.findOne({ email }) to this.findOne({ email }). When and why do we use this instead of the model's name?
 ->  `User.findOne({ email })` directly calls the `findOne` method on the User model.  
`this.findOne({ email })` is typically used inside static methods defined on the schema (like `userSchema.statics.login`).  
Inside a static method, `this` refers to the model itself, so using `this.findOne` makes the method reusable even if the model name changes or if the schema is used to create multiple models.  
In summary, use `this.findOne` inside static methods for flexibility and reusability; use `User.findOne` outside the schema or when you need to reference a specific model.

### Why is bcrypt imported in userController.js and not in userModel.js?
-> In our current backend-v2 code, the password hashing and comparison logic (using bcrypt) is handled directly inside the controller functions in [`backend-v2/controllers/userController.js`](backend-v2/controllers/userController.js), not in the model. This is why bcrypt is imported in the controller file. In contrast, if the logic was inside static methods on the model (like in the original [`backend/models/userModel.js`](backend/models/userModel.js)), bcrypt would be imported in the model file instead.

### Discuss which approach you plan to use for your project and explain why.
-> I (Aashish) plan to use the controller for handling authentication logic because it keeps the model simple and focused only on data structure. Placing logic like password checking and hashing in the controller makes it easier to manage, test, and update authentication flows without changing the model. This separation of concerns also improves code readability and maintainability.
-> Lev: I choose the model-centric approach (keep `User.login`/`User.signup` in the model).
- Rationale: better separation of concerns, reuse, and testability; reduces duplication. Controllers remain thin and focused on HTTP concerns (status codes, payloads, JWT).

## Iteration 7 — Refactoring signupUser (Comparison and Decision)

### What we compared
There are two approaches in this starter:
- Model-centric (backend): signup validation and hashing live inside the model via `userSchema.statics.signup`; the controller only calls `User.signup(...)` and issues the JWT.
- Controller-centric (backend-v2): the model is only a schema; all validation (`validator`), uniqueness check, and password hashing (`bcrypt`) live in the controller.

### Questions answered
- Purpose of `userSchema.statics.signup`:
  - Encapsulate signup business rules in the model (validate inputs, ensure uniqueness, hash password, create user). This avoids duplication and keeps controllers thin.
- `User.create({ ... })` vs `this.create({ ... })` inside the model:
  - Inside a Mongoose static method, `this` refers to the model itself. Using `this.create` avoids hardcoding the model name, improving reuse/testing and preventing tight coupling to a particular identifier.
- Why `validator` is imported in `userController.js` (backend-v2) and not in `userModel.js`:
  - In backend-v2, validation logic is performed in the controller, so `validator` is used there. In the model-centric approach, validation happens in the model, so `validator` would be imported in the model file instead.

### Pros and cons
- Model-centric:
  - Pros: single source of truth for rules; less duplication; clearer separation of concerns; easier to unit test the model; thin controllers.
  - Cons: logic spread between controller and model files, which some find less linear to read.
- Controller-centric:
  - Pros: full request flow visible in one place; straightforward for newcomers.
  - Cons: risk of duplicating validation/hashing across multiple endpoints; controllers become fat; harder to reuse.

### Our choice for the project
We keep the model-centric approach for signup as well (use `User.signup` in the model):
- Rationale: consistent with our Iteration 6 decision, improves reuse and testability, and keeps controllers focused on HTTP-level concerns.
