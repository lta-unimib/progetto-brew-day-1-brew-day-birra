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
| `/api/beer?name=name&&recipeID=recipeID` | `GET` | get list of beer IDs, eventually filter by name |
| `/api/beer/` | `POST` | execute recipe and add beer to stock |
| `/api/beer/:beerID` | `GET` | get stocked beer by ID |
| `/api/beer/:beerID` | `DELETE` | delete stocked beer |
| `/api/beer/:beerID` | `PUT` | update stocked beer details |
| `/api/beer/:beerID` | `POST` | add beer note |
| `/api/beer/:beerID/:noteID` | `GET` | get beer note by ID |
| `/api/beer/:beerID/:noteID` | `PUT` | update beer note|
| `/api/beer/:beerID/:noteID` | `DELETE` | delete beer note |

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

returns a json object like:

```json
{
  "name": "name",
  "ingredients": [{
    "name": "name",
    "quantity": "17.0"
  }]
}
```

### PUT /api/recipes/:recipeID

requires a json object like:

```json
{
  "name": "new name"
}
```

returns a json object like:

```json
{
  "name": "new name",
  "ingredients": [{
    "name": "name",
    "quantity": "17.0"
  }]
}
```

### POST /api/recipes/:recipeID

requires a json object like:

```json
{
  "name": "name",
  "quantity": "17.0"
}
```

### GET /api/recipes/:recipeID/:ingredientID

```json
{
  "name": "name",
  "quantity": "17.0"
}
```

### PUT /api/recipes/:recipeID/:ingredientID

requires a json object like:

```json
{
  "quantity": "17.0"
}
```

returns a json object like:

```json
{
  "name": "name",
  "quantity": "17.0"
}
```

### GET /api/inventory

get a json object like:

```json
[{
    "name": "nome1",
    "quantity": 17.0
}, {
    "name": "nome2",
    "quantity": 2.0
}
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

### GET /api/beer?name=name&&recipeID=recipeID

returns a json object like:

```json
["id0", "id1", "id2"]
```

### POST /api/beer/

requires a json object like:

```json
{
  "name": "name",
  "recipeID":"recipeID"
}
```

put in beerID header the path of created resource

### GET /api/beer/:beerID

returns a json object like:

```json
{
  "beerID":"beerID"
  "name": "name",
  "recipeID":"recipeID",
  "notes": [{
  	"beerID":"beerID"
      	"noteID": "noteID",
	"noteType": "noteType",
	"description":"description"
  }]
}
```

### PUT /api/beer/:beerID

requires a json object like:

```json
{
  "name": "new name"
}
```

returns a json object like:

```json
{
  "beerID":"beerID"
  "name": "new name",
  "recipeID":"recipeID",
  "notes": [{
      	"noteID": "noteID",
	"noteType": "noteType",
	"description":"description"
  }]
}
```

### POST /api/beer/:beerID

requires a json object like:

```json
{
  "description": "description",
  "noteType": "noteType"
}
```

put in noteID header the path of created resource


### GET /api/beer/:beerID/:noteID

```json
{
  "beerID":"beerID"
  "noteID": "noteID",
  "noteType": "noteType",
  "description": "description"
}
```

### PUT /api/beer/:beerID/:noteID

requires a json object like:

```json
{
  "noteType": "noteType",
  "description": "description"
}
```

returns a json object like:

```json
{
  "beerID":"beerID"
  "noteID": "noteID",
  "noteType": "noteType",
  "description": "description"
}
```
