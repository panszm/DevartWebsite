import { Injectable, Type } from '@angular/core';
import { GENERAL_CONFIG } from '../constants/general-config';
import { Dictionary } from '../lang/dictionary';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  currentDictionary: Dictionary = new GENERAL_CONFIG.defaultDictionary();

  constructor() {}

  setLanguage(dictionary: Type<Dictionary>): void {
    this.currentDictionary = new dictionary();
  }

  getCurrentLanguageShortName() {
    return this.currentDictionary.shortName;
  }
}
