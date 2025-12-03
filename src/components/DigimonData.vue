<script>
// Component responsible for displaying structured information
// about a single Digimon. All data is fed in via props, making
// the component reusable for any Digimon entry.
import { i18n } from '@/stores/translation'

export default {
  name: 'DigimonData',

  props: {
    // Each prop represents a specific Digimon attribute.
    // The parent component is responsible for providing these values.
    name: String,
    index: Number,
    level: String,
    attribute: String,
    type: String,

    // A Digimon may belong to multiple fields (e.g. groups or categories).
    // Fields are displayed as a comma-separated string.
    fields: Array, // e.g. ["Nature Spirits", "Dragon’s Roar"]
  },

  setup() {
    return { i18n }
  }
}
</script>

<template>
  <!--
    Card container for the Digimon's detailed information.
    Each property (index, level, attribute...) is displayed in its own row.
  -->
  <div class="data-card">
    <!-- Title showing the Digimon's name -->
    <h2 class="data-title">{{ name }}</h2>

    <!-- Each row shows a label on the left and a value on the right -->
    <div class="data-row">
      <strong>{{ i18n.dict.index }}</strong>
      <span>{{ index }}</span>
    </div>

    <div class="data-row">
      <strong>{{ i18n.dict.level }}</strong>
      <span>{{ level }}</span>
    </div>

    <div class="data-row">
      <strong>{{ i18n.dict.attribute }}</strong>
      <span>{{ attribute }}</span>
    </div>

    <div class="data-row">
      <strong>{{ i18n.dict.type }}</strong>
      <span>{{ type }}</span>
    </div>

    <div class="data-row">
      <strong>{{ i18n.dict.fields }}</strong>
      <span>{{ fields?.map((f) => f.field).join(', ') }}</span>
    </div>
  </div>
</template>

<style scoped>
/*
  Card container styling:
  - Light background for readability
  - Rounded corners for a modern UI look
  - Narrow max width to maintain compact info layout
*/
.data-card {
  background: var(--surface-card);
  padding: 1.5rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  width: 100%;
  margin: 1rem auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  color: var(--text-primary)
}

/*
  Title styling:
  - Monospace font for consistency with other parts of the app
  - Slight text shadow for depth
  - Centered for emphasis
*/
.data-title {
  margin: 0;
  font-family: Consolas, monospace;
  font-size: 1.8rem;
  text-align: center;
  color: var(--text-heading);
}

/*
  Each row contains a label and a value.
  Flex layout ensures proper spacing between elements.
*/
.data-row {
  display: flex;
  gap: 0.5rem;
  font-size: 1.1rem;
}

/*
  Labels have a minimum width so that values line up vertically,
  improving overall readability of the data card.
*/
.data-row strong {
  min-width: 90px;
}
</style>
