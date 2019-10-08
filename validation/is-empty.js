const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

//***Old way of writing this function */
// function isEmpty(value) {
//   return (
//     value === undefined ||
//     value === null ||
//     (typeof value === "object") && (Object.keys(value).length === 0) ||
//     (typeof value === "string" && value.trim().length === 0)
//   );
// }

module.exports = isEmpty;