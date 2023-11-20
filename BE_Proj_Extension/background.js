chrome.management.getAll(function (extensions) {
  console.log("Installed extensions:");
  const list = extensions.filter(
    (ex) => ex.enabled === true && ex.id !== "plnjppoifimbiaddalfngahdaacikigc"
  );
  console.log(list);
  // list.forEach((extension) => {
  //   chrome.management.setEnabled(extension.id, false, function () {
  //     console.log(`Disabled extension: ${extension.name}`);
  //   });
  // });

  const test = list?.find(
    (extension) => extension.id === "ehllkhjndgnlokhomdlhgbineffifcbj"
  );
  chrome.management.setEnabled(test?.id, false, function () {
    console.log(`Disabled extension: ${test?.name}`);
  });
});
