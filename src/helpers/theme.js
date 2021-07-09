
import { extendTheme } from "@chakra-ui/react";

const colors = {
	primary: { 100: "#339900" },
	secondary: {
		100: '#f8a22f',
	},
	textDarkest: { 100: '#222222' },
	textDarker: { 100: '#55555' },
	textDark: { 100: '#777777' },
	secondaryLight: { 100: 'rgba(62,62,62,.1)' },
	secondaryLighter: { 100: 'rgba(172,172,172,.1)' }

};

const customTheme = extendTheme({ colors });

export default customTheme;
