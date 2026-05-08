import { demos } from '../data/demos.js';
import { DemoShell } from '../components/DemoShell.js';
export function DemoPage(slug){ return DemoShell(demos[slug] || demos.bakery); }
