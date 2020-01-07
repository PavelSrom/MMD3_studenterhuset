// custom function that adjusts our mongoDB dates
// and returns the date in standard format 'DD/MM/YYYY'

// I've created this because react-moment doesn't work :(
// regular expressions don't work either, I probably forgot how to do them

export default date => {
  const chunks = date.split('-').slice(0, 3)
  const editDay = chunks[2].slice(0, 2)

  return [editDay, chunks[1], chunks[0]].join('/')
}
