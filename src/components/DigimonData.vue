<script>
export default {
  name: 'DigimonData',

  props: {
    name: String,
    index: Number,
    level: String,
    attribute: String,
    type: String,
    fields: Array, // esim ["Nature Spirits", "Dragon’s Roar"]
  },
}
</script>

<template>
  <div class="data-card">
    <h2 class="data-title">{{ name }}</h2>

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
      <span>{{ fields?.join(', ') }}</span>
    </div>
  </div>
</template>

<style scoped>
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

.data-title {
  margin: 0;
  font-family: Consolas, monospace;
  font-size: 1.8rem;
  text-align: center;
  color: var(--color-2-dark);
  text-shadow: 1px 1px 2px #ccc;
}

.data-row {
  display: flex;
  gap: 0.5rem;
  font-size: 1.1rem;
}

.data-row strong {
  min-width: 90px;
}
</style>
