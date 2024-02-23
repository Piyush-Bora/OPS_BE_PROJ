chrome.management.getAll(function (extensions) {
	console.log("Installed extensions:");
	const list = extensions.filter(
		(ex) => ex.enabled === true && ex.id !== "nfakobhkkhjegcmldlgbdafgeebkdkbc"
	);
	console.log(list);

	// diable all extensions
	// list.forEach((extension) => {
	//   chrome.management.setEnabled(extension.id, false, function () {
	//     console.log(`Disabled extension: ${extension.name}`);
	//   });
	// });

	//disable some extensions
	const test = list?.find(
		(extension) => extension.id === "efaidnbmnnnibpcajpcglclefindmkaj"
	);
	try {
		chrome.management.setEnabled(test?.id, false, function () {
			console.log(`Disabled extension: ${test?.name}`);
		});
	} catch (e) {
		console.log(e);
	}
});
