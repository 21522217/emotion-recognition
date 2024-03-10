import axios from "axios";

// git bash: adb reverse tcp:3001 tcp:3001 --> fix localhost issue
export default axios.create({baseURL: "http://localhost:3001"})