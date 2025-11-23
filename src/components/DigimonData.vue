<script>
// Component responsible for displaying structured information
// about a single Digimon. All data is fed in via props, making
// the component reusable for any Digimon entry.
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
      <strong>Index:</strong> <span>{{ index }}</span>
    </div>

    <div class="data-row">
      <strong>Level:</strong> <span>{{ level }}</span>
    </div>

    <div class="data-row">
      <strong>Attribute:</strong> <span>{{ attribute }}</span>
    </div>

    <div class="data-row">
      <strong>Type:</strong> <span>{{ type }}</span>
    </div>

    <div class="data-row">
      <strong>Fields:</strong>
      <!-- Safely joins the fields array into a human-readable list -->
      <span>{{ fields?.join(', ') }}</span>
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
  background: #c8d3ea;
  padding: 1.5rem;
  border-radius: 12px;
  max-width: 30rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
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
  color: var(--color-2-dark);
  text-shadow: 1px 1px 2px #ccc;
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
