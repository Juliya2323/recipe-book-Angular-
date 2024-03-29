import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipes.model";
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from "./recipes.service";

@Injectable({providedIn: 'root'})

export class RecipesResolverService implements Resolve<Recipe []> {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }

    //here we don't need subscription because resolve() will do it for us
  }
}
