# Architectural Patterns

## Table Data Gateway

[Table Data Gateway](https://martinfowler.com/eaaCatalog/tableDataGateway.html)

Hanno questo pattern le classi InventoryIngredientRepository, RecipeIngredientRepository, IngredientRepository, RecipeRepository.
Per adesso hanno metodi naive, ma idealmente avranno i soli metodi necessari per operare sul database.

## Active Record

[Active Record](https://martinfowler.com/eaaCatalog/activeRecord.html)

Avranno questo pattern le classi Recipe, RecipeIngredient e InventoryIngredient.


## Page Controller

[Page Controller](https://martinfowler.com/eaaCatalog/pageController.html)

Avranno questo pattern le classi InventoryEndpoint, InventoryIngredientEndpoint, RecipeEndpoint, RecipeIngredientEndpoint, RecipeListEndpoint.

