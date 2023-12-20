import axios from "axios";

// git bash: adb reverse tcp:8000 tcp:8000 --> fix localhost issue
export default axios.create({baseURL: "http://localhost:8000"})