(function() {
	const STORAGE_KEY = 'extension-whale-bible-latest';
	const BTN_LATEST_CLASSNAME = 'extension-whale-bible-btn-latest';
	const LATEST_ROW_CLASSNAME = 'extension-whale-bible-latest';
	
	let latest = (() => {
		try {
			const latestRaw = localStorage.getItem(STORAGE_KEY);
			return JSON.parse(latestRaw) ?? {};
		} catch (_ignore) {
		}

		return {}
	})()

	const focusToLatest = () => {
		if(latest.url === location.href) {
			const $latest = document.querySelectorAll('#bibleContents .row')[latest.idx];
			$latest.classList.add(LATEST_ROW_CLASSNAME);
			$latest.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	}

	const $style = document.createElement('style');
	const css = `
		#bibleContents .row:hover { background-color:#aaa; color:#fff; }
		#bibleContents .row.${LATEST_ROW_CLASSNAME} { background-color:#333; color:#fff; }
		.gotoTop { display: none; }
		.${BTN_LATEST_CLASSNAME} { position: fixed; bottom: 30px; right: 30px; background-color: red; color: #fff !important; opacity: 0.3; border: 0; box-shadow: none; border-radius: 4px; cursor: pointer; z-index: 999999; }
		.${BTN_LATEST_CLASSNAME}:hover { opacity:0.7; }
	`
	$style.type = 'text/css';
	$style.appendChild(document.createTextNode(css));

	const $btnLatest = document.createElement('button');
	$btnLatest.innerHTML = '최근 봤던 곳으로';
	$btnLatest.classList.add(BTN_LATEST_CLASSNAME);
	$btnLatest.addEventListener('click', () => {
		if(latest.url !== location.href) {
			location.href = latest.url;
			return;
		}

		focusToLatest();
	});

	document.querySelectorAll('#bibleContents .row').forEach(($row, idx) => {
		$row.addEventListener('click', (event) => {
			const nextLatest = {
				url: location.href,
				idx,
			}

			localStorage.setItem(STORAGE_KEY, JSON.stringify(nextLatest));
			document.querySelector(`#bibleContents .row.${LATEST_ROW_CLASSNAME}`)?.classList.remove(LATEST_ROW_CLASSNAME);
			$row.classList.add(LATEST_ROW_CLASSNAME);

			latest = nextLatest;
		});
	});

	document.querySelector('head').appendChild($style);
	document.querySelector('body').appendChild($btnLatest);
	focusToLatest();
})();