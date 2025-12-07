import assert from 'assert';
import { fetchDigimon } from '../src/api/digimonApi.js';

(async () => {
  try {
    const data = await fetchDigimon(1);

    assert.ok(data.id, "Digimon should have an ID");
    assert.ok(data.name, "Digimon should have a name");
    assert.ok(data.images && data.images.length > 0);

    console.log("fetchDigimon API test passed!");
  } catch (err) {
    console.error("fetchDigimon test failed:", err);
  }
})();
