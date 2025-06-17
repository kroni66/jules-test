<template>
  <div class="contact">
    <h1>Contact Us</h1>
    <p>Get in touch with us to learn more about our services or to discuss your project.</p>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="message">Message:</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const handleSubmit = () => {
  alert("Form submitted (mock)!\nName: " + form.value.name + "\nEmail: " + form.value.email + "\nMessage: " + form.value.message);
  // In a real app, you would send this data to a server
  form.value.name = "";
  form.value.email = "";
  form.value.message = "";
};
</script>

<style scoped>
.contact {
  padding: 2rem;
}
.contact form div {
  margin-bottom: 1rem;
  text-align: left;
}
.contact label {
  display: block;
  margin-bottom: 0.25rem;
}
.contact input,
.contact textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.contact button {
  background-color: #3a7d2a; /* Green from our palette */
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.contact button:hover {
  background-color: #2c5e1a; /* Darker green */
}
</style>
