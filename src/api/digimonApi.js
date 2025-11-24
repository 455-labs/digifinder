// src/api/digimonApi.js
//
// Centralized API helper functions for fetching Digimon data.
// Keeps the API logic separate from the UI components,
// making the app easier to maintain and scale.

import axios from 'axios'

const API_BASE = 'https://digi-api.com/api/v1/digimon'

/**
 * Fetch Digimon by name OR id
 * API endpoint supports both, so a single function is enough.
 * @param {string|number} identifier - Digimon name or Digimon ID
 */
export async function fetchDigimon(identifier) {
  const url = `${API_BASE}/${identifier}`
  const res = await axios.get(url)
  return res.data
}

/**
 * Fetch the full list of Digimon and determine the minimum / maximum ID available.
 * This is required for random Digimon selection and for navigation (next/previous).
 *
 * @returns {Promise<{min: number, max: number}>}
 */
export async function fetchDigimonBounds() {
  // fetch ALL digimon using pageSize
  const res = await axios.get(`${API_BASE}?pageSize=9999`)
  const list = res.data.content

  if (!Array.isArray(list) || list.length === 0) {
    throw new Error('Failed to load Digimon index range.')
  }

  const ids = list.map((d) => d.id)

  return {
    min: Math.min(...ids),
    max: Math.max(...ids),
  }
}
