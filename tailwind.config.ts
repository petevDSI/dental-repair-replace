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
			fontFamily: {
				sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
				display: ['Fraunces', 'Georgia', 'serif'],
			},
			colors: {
				// Dental Strategy Institute brand: gold accent (replaces teal) and navy-tinted neutrals (replaces slate)
				teal: { 50:'#fbf5e6',100:'#f4e8c4',200:'#ecd99c',300:'#e3c876',400:'#d6b95e',500:'#c9a84c',600:'#a8872f',700:'#8a6f25',800:'#6b551c',900:'#4f2913',950:'#321a0c' },
				slate: { 50:'#f4f8fc',100:'#e8eef6',200:'#d5dfec',300:'#b6c4d8',400:'#8a9bb5',500:'#5f7391',600:'#44577a',700:'#2c3f63',800:'#1a2e50',900:'#122547',950:'#0d1f3c' },
				navy: { DEFAULT: '#0d1f3c', soft: '#2b3f61' },
				gold: { DEFAULT: '#c9a84c', deep: '#a8872f' },
				paper: '#fffdf8',
				cloud: '#f4f8fc',
				mist: '#e6f0f7',
				sand: '#fbf5e6',
				line: '#e4e9ef',
				ink: '#26303f',
				subtle: '#5d6877',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			boxShadow: {
				card: '0 10px 30px rgba(13,31,60,0.07)',
			},
			borderRadius: {
				'2xl': '1.125rem',
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
