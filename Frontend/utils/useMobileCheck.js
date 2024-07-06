import React, { useEffect, useState } from "react";

function useMobileCheck() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (window.innerWidth < 640) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	}, [window.innerWidth]);

	return isMobile;
}

export default useMobileCheck;
