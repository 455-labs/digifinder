// src/api/digimonApi.js
// ---------------------------------------------------------
// This file contains centralized helper functions for interacting
// with the Digimon API. It keeps all API-related logic separate
// from UI components, improving maintainability and testability.
//
// The API is accessed using Axios and provides:
//
// - fetchDigimon(identifier):
//     Fetches a Digimon by its ID or name.
//
// - fetchDigimonBounds():
//     Retrieves all Digimon entries, determines the minimum and
//     maximum ID values, and returns them. This supports
//     navigation (next/previous) and random selection features.
// ---------------------------------------------------------

import axios from 'axios'

const API_BASE = 'https://digi-api.com/api/v1/digimon'

/**
 * Fetch a Digimon by its numeric ID or by name.
 * The underlying API supports both, so this helper
 * consolidates the logic into a single function.
 *
 * @param {string|number} identifier - Digimon name or numeric ID.
 * @returns {Promise<Object>} API response containing Digimon data.
 */
export async function fetchDigimon(identifier) {
  const url = `${API_BASE}/${identifier}`
  const res = await axios.get(url)
  return res.data
}

/**
 * Fetch the complete Digimon list and compute the minimum and
 * maximum available Digimon IDs. This information is used for:
 * - random Digimon selection
 * - next/previous navigation
 *
 * @returns {Promise<{min: number, max: number}>} An object containing
 *          the smallest and largest Digimon IDs found in the dataset.
 */
export async function fetchDigimonBounds() {
  // Request all Digimon entries by using a very large page size.
  const res = await axios.get(`${API_BASE}?pageSize=9999`)
  const list = res.data.content

  // Validate that the API returned a non-empty list.
  if (!Array.isArray(list) || list.length === 0) {
    throw new Error('Failed to load Digimon index range.')
  }

  // Extract IDs and compute boundaries.
  const ids = list.map((d) => d.id)

  return {
    min: Math.min(...ids),
    max: Math.max(...ids),
  }
}
