const initialState = {
  modules: [
    {
      title: "module 1",
      countWords: 18
    },
    {
      title: "module 2",
      countWords: 54
    },
    {
      title: "module 3",
      countWords: 21
    }
  ]
}

export const moduleReducer = (state = initialState, action) => {
  switch (action.type) {
    
    default:
      return state;
  }
}