function disableExtensions() {
	chrome.management.getAll((extensions) => {
		const list = extensions.filter(
			(ex) => ex.enabled === true && ex.id !== chrome.runtime.id
		);

		list.forEach((extension) => {
			chrome.management.setEnabled(extension.id, false, () => {
				console.log(`Disabled extension: ${extension.name}`);
			});
		});
	});
}

disableExtensions();
