export interface Meal {
  id: number;
  name: string;
  types: number[];
  difficulty: number;
  cookingTime: number;
  vegetarian: boolean;
  recipe: Recipe | null;
  filename: string;
  photoURL: string;
  thumbnailURL: string;
}

export interface Recipe {
  servings: number;
  ingredients: string;
  directions: string;
}

export interface Inputs extends Omit<Meal, "id" | "filename" | "photoURL" | "thumbnailURL"> {
  photoBase64?: string;
}

export const types = ["Petit-déjeuner", "Déjeuner", "Goûter", "Dîner"];
export const difficulties = ["Facile", "Moyenne", "Difficile"];
export const cookingTimes = ["0-10 minutes", "10-30 minutes", "30-60 minutes", "Plus d'une heure"];
