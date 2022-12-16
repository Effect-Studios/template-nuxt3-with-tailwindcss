export default function() {
  const state = reactive({
    count: 0
  })

  function increment() {
    state.count++
  }

  return { 
    state,
    increment 
  }
}
