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