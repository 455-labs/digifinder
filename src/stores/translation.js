import { reactive } from 'vue'
import fi from '@/locales/fi.json'
import en from '@/locales/en.json'

const languages = { fi, en }

export const i18n = reactive({
  lang: localStorage.getItem('lang') || 'fi',
  dict: languages[localStorage.getItem('lang') || 'fi'],
})

export function setLang(lang) {
  i18n.lang = lang
  i18n.dict = languages[lang]
  localStorage.setItem('lang', lang)
}
