import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import SmoothScroll from "../SmoothScroll";

createRoot(document.getElementById("root")).render(
	<SmoothScroll>
		<App />
	</SmoothScroll>
);
