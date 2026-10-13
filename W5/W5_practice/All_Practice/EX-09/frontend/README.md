# Project Questions and Answers

### How did using useEffect() and axios help separate logic from UI?
Using `useEffect()` allowed me to isolate side effects, such as data fetching, from the main component rendering logic. This ensures that the UI remains a pure representation of the current state, while `useEffect` handles the timing and execution of API calls. `axios` further helped by abstracting the HTTP request details (like base URLs and headers) into a cleaner API, often centralized in a separate file. This separation means the UI components don't need to know the specifics of how data is retrieved or sent; they just react to the data provided to them.

### What state challenges did you face while managing form input and API response?
One major challenge was synchronizing the form's local state with the backend's expectations, especially when handling multiple input fields and validation. Managing the asynchronous nature of API responses also posed challenges, such as:
- **Loading States:** Ensuring the user sees a loading indicator while waiting for the server.
- **Error Handling:** Gracefully capturing and displaying backend errors (e.g., 400 or 500 status codes).
- **Stale Data:** Making sure the list of items refreshes immediately after a successful create, update, or delete operation to keep the UI in sync with the database.

### How does REST structure help React developers write cleaner frontend code?
RESTful APIs provide a predictable and standardized architecture. Because REST uses standard HTTP methods (GET, POST, PUT, DELETE) and logical URL structures (e.g., `/articles`, `/articles/:id`), it allows React developers to:
- **Create Consistent Service Layers:** I can build a service module that mirrors these endpoints, making the code more readable and maintainable.
- **Predictable Data Flow:** Since the API behavior is standardized, it’s easier to design state management logic that handles standard CRUD operations without reinventing the wheel for every endpoint.
- **Improved Collaboration:** Both frontend and backend developers share a common "contract" on how data should be exchanged, reducing ambiguity and bugs.


