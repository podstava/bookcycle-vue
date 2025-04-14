<script setup>
const config = useRuntimeConfig();
const form = ref(null);
const result = ref(null);
const formData = reactive({
  name: '',
  email: '',
  message: ''
});
const isSubmitting = ref(false);
const submitStatus = ref(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.value.checkValidity()) {
    form.value.classList.add("was-validated");
    return;
  }
  
  isSubmitting.value = true;
  submitStatus.value = "Sending...";
  
  const json = JSON.stringify({
    name: formData.name,
    email: formData.email,
    message: formData.message,
    access_key: config.public.web3FormsKey || 'YOUR_ACCESS_KEY_HERE'
  });

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    
    const responseData = await response.json();
    
    if (response.status === 200) {
      submitStatus.value = responseData.message;
      formData.name = '';
      formData.email = '';
      formData.message = '';
      form.value.classList.remove("was-validated");
    } else {
      console.log(response);
      submitStatus.value = responseData.message || "Something went wrong!";
    }
  } catch (error) {
    console.error(error);
    submitStatus.value = "Something went wrong!";
  } finally {
    isSubmitting.value = false;
    setTimeout(() => {
      submitStatus.value = null;
    }, 5000);
  }
};
</script>

<template>
  <!-- To make this contact form work, add WEB3FORMS_KEY to your .env file -->
  <form
    ref="form"
    @submit="handleSubmit"
    class="needs-validation"
    novalidate
  >
    <input
      type="checkbox"
      class="hidden"
      style="display: none"
      name="botcheck"
    />
    <div class="mb-5">
      <input
        v-model="formData.name"
        type="text"
        placeholder="Full Name"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
      />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Please provide your full name.
      </div>
    </div>
    <div class="mb-5">
      <label for="email_address" class="sr-only">Email Address</label
      ><input
        id="email_address"
        v-model="formData.email"
        type="email"
        placeholder="Email Address"
        required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
      />
      <div class="empty-feedback text-red-400 text-sm mt-1">
        Please provide your email address.
      </div>
      <div class="invalid-feedback text-red-400 text-sm mt-1">
        Please provide a valid email address.
      </div>
    </div>
    <div class="mb-3">
      <textarea
        v-model="formData.message"
        required
        placeholder="Your Message"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-800 rounded-md outline-none h-36 focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100"
      ></textarea>
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Please enter your message.
      </div>
    </div>
    <LandingButton type="submit" size="lg" block :disabled="isSubmitting">
      {{ isSubmitting ? 'Sending...' : 'Send Message' }}
    </LandingButton>
    <div v-if="submitStatus" class="mt-3 text-center" :class="{'text-green-500': submitStatus === 'Success'}">
      {{ submitStatus }}
    </div>
  </form>
</template>

<style>
.invalid-feedback,
.empty-feedback {
  display: none;
}

.was-validated :placeholder-shown:invalid ~ .empty-feedback {
  display: block;
}

.was-validated :not(:placeholder-shown):invalid ~ .invalid-feedback {
  display: block;
}

.is-invalid,
.was-validated :invalid {
  border-color: #dc3545;
}
</style>
