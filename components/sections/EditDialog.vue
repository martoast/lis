<template>
  <v-edit-dialog :return-value.sync="protein">
    {{ protein }}
    <template v-slot:input>
      <v-text-field
        v-model="protein"
        :rules="[max25chars]"
        label="Edit"
        single-line
        counter
      />
    </template>
  </v-edit-dialog>
</template>

<script>
export default {
  name: "my-component",
  props: {
    protein: {
      type: String,
      default: ""
    } //... the rest of the props you want to access
  }
};
</script>
