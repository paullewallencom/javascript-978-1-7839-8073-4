export default function simpleLog(data) {
  console.log('Log: ', data)
}

export function timeLog(data) {
  console.log(Date.now(), data)
}
