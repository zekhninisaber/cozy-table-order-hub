
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				// New Color Palette
				'dominant': '#272727',
				'secondary': '#D4AA7D',
				'accent': '#EFD09E',
				
				// Take A Bowl Brand Colors (legacy - kept for compatibility)
				'dark-green': '#283526',
				'olive': '#697745',
				'peach-cream': '#FFEFDA',
				'mango': '#F39720',
				
				// Design System Colors (updated to use new palette)
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#272727', // dominant
				foreground: '#EFD09E', // accent
				primary: {
					DEFAULT: '#D4AA7D', // secondary
					foreground: '#272727' // dominant
				},
				secondary: {
					DEFAULT: '#D4AA7D', // secondary
					foreground: '#272727' // dominant
				},
				accent: {
					DEFAULT: '#EFD09E', // accent
					foreground: '#272727' // dominant
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: '#1e1e1e',
					foreground: '#EFD09E'
				},
				popover: {
					DEFAULT: '#1e1e1e',
					foreground: '#EFD09E'
				},
				card: {
					DEFAULT: '#1e1e1e',
					foreground: '#EFD09E'
				},
				sidebar: {
					DEFAULT: '#272727',
					foreground: '#EFD09E',
					primary: '#D4AA7D',
					'primary-foreground': '#272727',
					accent: '#EFD09E',
					'accent-foreground': '#272727',
					border: '#D4AA7D',
					ring: '#D4AA7D'
				}
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				serif: ['"Playfair Display"', 'serif'],
				display: ['"Playfair Display"', 'serif'], // alias for headings
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
