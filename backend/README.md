# Java Backend

## API

| endpoint | method | description |
| --- | --- | --- |
| `/api/recipes?name=name` | `GET` | get list of recipe IDs, eventually filter by name |
| `/api/recipes/` | `POST` | add recipe |
| `/api/recipes/:recipeID` | `GET` | get recipe by ID |
| `/api/recipes/:recipeID` | `PUT` | update recipe details |
| `/api/recipes/:recipeID` | `DELETE` | delete recipe |
| `/api/recipes/:recipeID` | `POST` | add recipe ingredient |
| `/api/recipes/:recipeID/:ingredientID` | `GET` | get recipe ingredient by ID |
| `/api/recipes/:recipeID/:ingredientID` | `PUT` | update recipe ingredient |
| `/api/recipes/:recipeID/:ingredientID` | `DELETE` | delete recipe ingredient |
| `/api/inventory` | `GET` | get inventory ingredients |
| `/api/inventory/` | `POST` | add inventory ingredient |
| `/api/inventory/:ingredientID` | `GET` | get inventory ingredient by ID |
| `/api/inventory/:ingredientID` | `PUT` | update inventory ingredient |
| `/api/inventory/:ingredientID` | `DELETE` | delete inventory ingredient |