import React from 'react';
import { Cookie, Feedback, Warning } from '@mui/icons-material';

export const ADVICE_ENDPOINT = '/api/advice';
export const BEERS_ENDPOINT = '/api/beers/';
export const BEER_LIST_ENDPOINT = '/api/beers';
export const DO_SHOPPING_ENDPOINT = '/api/shopping';
export const SHOPPING_ENDPOINT = '/api/shopping/';
export const INVENTORY_LIST_ENDPOINT = '/api/inventory';
export const INVENTORY_ENDPOINT = '/api/inventory/';
export const RECIPE_ENDPOINT = '/api/recipes/';
export const RECIPE_LIST_ENDPOINT = '/api/recipes';
export const RESET_ENDPOINT = '/api/reset';
export const SETTINGS_ENDPOINT = '/api/settings/';
export const SETTING_LIST_ENDPOINT = '/api/settings';

export const THEME_MANAGER_TRIGGER = "themeReload=true";
export const THEME_MANAGER_ESCAPE = "themeReload=false";
export const NAVBAR_THEME_MANAGER_TRIGGER = "navbarReload=true";
export const NAVBAR_THEME_MANAGER_ESCAPE = "navbarReload=false";
export const BACKGROUND_MANAGER_TRIGGER = "backgroundReload=true";
export const BACKGROUND_MANAGER_ESCAPE = "backgroundReload=false";

export const LAST_USED_THEME_LOCALSTORAGE_KEY = "lastUsedTheme";
export const LAST_USED_BACKGROUND_LOCALSTORAGE_KEY = "lastUsedBackground";

export const DEFAULT_THEME = "default";
export const DEFAULT_BACKGROUND = "default";

export const INGREDIENT_NAME_OPTIONS = ["acqua", "additivi", "lievito", "luppoli", "malto", "zuccheri"];

export const NOTE_TYPE_OPTIONS = ["generic", "taste", "problem"];
export const DEFAULT_NOTE_TYPE = "generic";
export const NOTE_TYPE_ICONS = {
    generic: <Feedback/>,
    taste: <Cookie/>,
    problem: <Warning/>
}