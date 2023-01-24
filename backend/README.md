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

### GET /api/recipes?name=name

returns a json object like:

```json
["id0", "id1", "id2"]
```

### POST /api/recipes/

requires a json object like:

```json
{
  "name": "name"
}
```

put in Location header the path of created resource

### GET /api/recipes/:recipeID

### GET /api/inventory

get a json object like:

```json
[{
    "name": "nome1",
    "quantity": 17.0
}, {
    "name": "nome2",
    "quantity": 2.0
},...
]
```

### POST /api/inventory

requires a json object like:

```json
{
    "name": "nome1",
    "quantity": 17.0
}
```

### GET /api/inventory/:ingredientID

get a json object like:

```json
{
    "name": "nome1",
    "quantity": 17.0
}
```

### PUT /api/inventory/:ingredientID

requires a json object like:

```json
{
    "quantity": 17.2
}
```
get a json object like:

```json
[{
    "name": "nome1",
    "quantity": 17.2
}]
```