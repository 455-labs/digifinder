// Reactive internationalization (i18n) store for managing the application's
// active language and associated translation dictionary.

import { reactive } from 'vue'
import fi from '@/locales/fi.json'
import en from '@/locales/en.json'

// Supported languages mapped to their translation files.
const languages = { fi, en }

// Reactive translation state.
// - lang: currently selected language code (persisted in localStorage)
// - dict: dictionary object containing translated strings for the active language
export const i18n = reactive({
  lang: localStorage.getItem('lang') || 'fi',
  dict: languages[localStorage.getItem('lang') || 'fi'],
})

/**
 * Updates the application's language and persists the choice.
 * @param {string} lang - Language code to activate.
 */
export function setLang(lang) {
  i18n.lang = lang
  i18n.dict = languages[lang]
  localStorage.setItem('lang', lang)
}
