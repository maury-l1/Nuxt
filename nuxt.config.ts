// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  //css:["tailwindcss","@nuxt/ui"],
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-auth-utils"],
  runtimeConfig: {
    oauth: {
      // provider in lowercase (github, google, etc.)
      // Deixem clientId i clientSecret a cadena buida, pero d'on vindran els valors de les variables d'entorn?
      // dins la nostra conta de github
      github: {
        clientId: "",
        clientSecret: ""
      }
    }
  }
});
