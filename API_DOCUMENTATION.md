Endpoints Overview

Users
GET /users - Retrieve all users.
GET /users/:id - Retrieve a specific user by ID.
POST /users - Create a new user.
PUT /users/:id - Update a user by ID.
DELETE /users/:id - Delete a user by ID.

Plants
GET /plants - Retrieve all plants.
GET /plants/:id - Retrieve a specific plant by ID.
POST /plants - Create a new plant.
PUT /plants/:id - Update a plant by ID.
DELETE /plants/:id - Delete a plant by ID.

UserPlants
GET /userPlants/users/:userId - Retrieve all plants associated with a specific user.
POST /userPlants/users/:userId/plants - Associate a plant with a user.
PUT /userPlants/users/:userId/plants/:plantId - Update a user-plant association.
DELETE /userPlants/users/:userId/plants/:plantId - Delete a user-plant association.
