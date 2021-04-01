const update = document.querySelector("#update-button");
update.addEventListener("click", (_) => {
  console.log("click");
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Darth Vadar",
      quote: "I find your lack of faith disturbing.",
    }),
  });
});
//   }).then((req, res) => {
//     quotesCollection
//       .findOneAndUpdate(
//         { name: "Yoda" },
//         {
//           $set: {
//             name: req.body.name,
//             quote: req.body.quote,
//           },
//         },
//         {
//           upsert: true,
//         }
//       )
//       .then((result) => {
//         /* ... */
//       })
//       .catch((error) => console.error(error));
//   });
