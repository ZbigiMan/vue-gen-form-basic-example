module.exports = {
  mode: 'jit',
  important: true,
  content: [
      './index.html', 
      './src/**/*.{vue,js,ts,jsx,tsx}',
      'node_modules/vue-gen-form/dist/*.js',
    ],
  theme: {
    extend: {}
  },
  plugins: []
}
