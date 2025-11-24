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
